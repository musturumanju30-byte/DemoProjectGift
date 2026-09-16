import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize server-side Supabase client with secret key if available, or anon key
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://obgckcchtqipqbgvhrat.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_FGaTAqhf9jt2LVMp24PscQ_FeMoSCyl";

const supabaseServer = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/orders
 * Supports:
 * 1. Logged-in user lookup: ?userId=... or ?email=...
 * 2. Guest lookup: ?orderNumber=CP-XXXXX&phone=9848012345 (BOTH required for security!)
 * 3. Single order lookup with authenticated context: ?orderNumber=CP-XXXXX&userId=...
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const orderNumber = searchParams.get("orderNumber");
    const phone = searchParams.get("phone");

    // 1. Guest order tracking (Requirement 5: Order ID + Phone MUST match together)
    if (orderNumber && !userId && !email) {
      if (!phone || phone.trim().length < 10) {
        return NextResponse.json(
          {
            error:
              "For privacy and security, please enter both your Order ID and the 10-digit mobile number used during checkout.",
          },
          { status: 400 }
        );
      }

      const cleanPhone = phone.trim().replace(/\D/g, "");
      const cleanOrderNumber = orderNumber.trim().toUpperCase();

      const { data, error } = await supabaseServer
        .from("orders")
        .select("*")
        .ilike("order_number", cleanOrderNumber);

      if (error) {
        return NextResponse.json(
          { error: "Order not found — please check your Order ID and mobile number." },
          { status: 404 }
        );
      }

      // Verify phone matches
      const matching = (data || []).filter(ord => {
        const orderPhone = (ord.customer_phone || "").replace(/\D/g, "");
        return orderPhone === cleanPhone || orderPhone.endsWith(cleanPhone) || cleanPhone.endsWith(orderPhone);
      });

      if (matching.length === 0) {
        return NextResponse.json(
          { error: "Order not found — please check your Order ID and mobile number." },
          { status: 404 }
        );
      }

      return NextResponse.json({ order: formatDbOrder(matching[0]) });
    }

    // 2. Logged-in customer tracking / My Orders
    if (userId || email) {
      let query = supabaseServer.from("orders").select("*");

      if (userId && email) {
        query = query.or(`user_id.eq.${userId},customer_email.ilike.${email}`);
      } else if (userId) {
        query = query.eq("user_id", userId);
      } else if (email) {
        query = query.ilike("customer_email", email.trim().toLowerCase());
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        return NextResponse.json({ orders: [], dbError: error.message }, { status: 200 });
      }

      const orders = (data || []).map(formatDbOrder).filter((o): o is NonNullable<typeof o> => o !== null);

      // If specific order was requested by authenticated user
      if (orderNumber) {
        const single = orders.find(
          o => o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase()
        );
        if (!single) {
          return NextResponse.json(
            { error: "Order not found — this order is not associated with your account." },
            { status: 404 }
          );
        }
        return NextResponse.json({ order: single });
      }

      return NextResponse.json({ orders });
    }

    // Default: Return all orders for admin
    const { data, error } = await supabaseServer
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ orders: [], dbError: error.message }, { status: 200 });
    }

    return NextResponse.json({ orders: (data || []).map(formatDbOrder) });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * POST /api/orders
 * Saves a new order into the Supabase database
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const dbPayload = {
      id: body.id,
      order_number: body.orderNumber,
      user_id: body.userId || null,
      customer_name: body.customerName,
      customer_email: (body.customerEmail || "").toLowerCase(),
      customer_phone: body.customerPhone,
      shipping_address: body.shippingAddress,
      delivery_date: body.deliveryDate,
      delivery_slot: body.deliverySlot,
      delivery_type: body.deliveryType,
      items: body.items,
      subtotal: body.subtotal,
      discount_amount: body.discountAmount || 0,
      coupon_code: body.couponCode || null,
      delivery_fee: body.deliveryFee || 0,
      total_amount: body.totalAmount,
      payment_method: body.paymentMethod,
      payment_status: body.paymentStatus || "paid",
      order_status: body.orderStatus || "placed",
      tracking_history: body.trackingHistory || [],
      special_instructions: body.specialInstructions || null,
      created_at: body.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from("orders")
      .upsert(dbPayload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.warn("Could not insert order into Supabase database:", error.message);
      return NextResponse.json(
        { success: false, dbError: error.message, order: body },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, order: formatDbOrder(data) });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * PATCH /api/orders
 * Updates order status from the admin panel
 */
export async function PATCH(req: NextRequest) {
  try {
    const { orderId, orderNumber, status, note } = await req.json();

    if (!status || (!orderId && !orderNumber)) {
      return NextResponse.json(
        { error: "orderId/orderNumber and status are required" },
        { status: 400 }
      );
    }

    // 1. Fetch current order to update tracking history
    let query = supabaseServer.from("orders").select("*");
    if (orderId) query = query.eq("id", orderId);
    else if (orderNumber) query = query.eq("order_number", orderNumber);

    const { data: existing, error: fetchErr } = await query.maybeSingle();

    if (fetchErr || !existing) {
      return NextResponse.json(
        { error: fetchErr ? fetchErr.message : "Order not found in database" },
        { status: 404 }
      );
    }

    const statusOrder = ["placed", "processing", "shipped", "out_for_delivery", "delivered"];
    const targetIdx = statusOrder.indexOf(status);

    const existingHistory = Array.isArray(existing.tracking_history)
      ? existing.tracking_history
      : [];

    const updatedHistory = existingHistory.map((step: any) => {
      const stepIdx = statusOrder.indexOf(step.status);
      const isPastOrCurrent = targetIdx >= 0 && stepIdx >= 0 && stepIdx <= targetIdx;

      if (step.status === status) {
        return {
          ...step,
          completed: true,
          timestamp:
            "Updated at " +
            new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          description: note || step.description,
        };
      } else if (isPastOrCurrent) {
        return {
          ...step,
          completed: true,
        };
      }
      return step;
    });

    const { data: updated, error: updateErr } = await supabaseServer
      .from("orders")
      .update({
        order_status: status,
        tracking_history: updatedHistory,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: formatDbOrder(updated) });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update order status";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Convert DB snake_case to frontend camelCase Order
function formatDbOrder(dbRecord: any) {
  if (!dbRecord) return null;
  return {
    id: dbRecord.id,
    orderNumber: dbRecord.order_number,
    userId: dbRecord.user_id,
    createdAt: dbRecord.created_at,
    customerName: dbRecord.customer_name,
    customerEmail: dbRecord.customer_email,
    customerPhone: dbRecord.customer_phone,
    shippingAddress: dbRecord.shipping_address,
    deliveryDate: dbRecord.delivery_date,
    deliverySlot: dbRecord.delivery_slot,
    deliveryType: dbRecord.delivery_type,
    items: dbRecord.items || [],
    subtotal: Number(dbRecord.subtotal),
    discountAmount: Number(dbRecord.discount_amount || 0),
    couponCode: dbRecord.coupon_code,
    deliveryFee: Number(dbRecord.delivery_fee || 0),
    totalAmount: Number(dbRecord.total_amount),
    paymentMethod: dbRecord.payment_method,
    paymentStatus: dbRecord.payment_status,
    orderStatus: dbRecord.order_status,
    trackingHistory: dbRecord.tracking_history || [],
    specialInstructions: dbRecord.special_instructions,
  };
}
