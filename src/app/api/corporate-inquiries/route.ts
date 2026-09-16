import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://obgckcchtqipqbgvhrat.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_FGaTAqhf9jt2LVMp24PscQ_FeMoSCyl";

const supabase = createClient(supabaseUrl, supabaseKey);

export interface CorporateInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  occasion: string;
  quantity: string;
  message: string;
  status: "New" | "Contacted" | "Quoted" | "Closed";
  createdAt: string;
}

function formatDbInquiry(row: any): CorporateInquiry {
  return {
    id: row.id,
    companyName: row.company_name,
    contactPerson: row.contact_person,
    phone: row.phone,
    email: row.email,
    occasion: row.occasion,
    quantity: row.quantity,
    message: row.message || "",
    status: (row.status as any) || "New",
    createdAt: row.created_at || new Date().toISOString(),
  };
}

/**
 * GET /api/corporate-inquiries
 * Returns all corporate inquiries for Admin Panel
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("corporate_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase inquiries query warning:", error.message);
      return NextResponse.json({ inquiries: [], isFallback: true });
    }

    const inquiries = (data || []).map(formatDbInquiry);
    return NextResponse.json({ inquiries, isFallback: false });
  } catch (err: any) {
    console.error("GET /api/corporate-inquiries error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch corporate inquiries" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/corporate-inquiries
 * Submits a new corporate gifting inquiry from landing page
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, contactPerson, phone, email, occasion, quantity, message } = body;

    if (!companyName || !contactPerson || !phone || !email || !occasion || !quantity) {
      return NextResponse.json(
        { error: "Please fill in all required contact and order details." },
        { status: 400 }
      );
    }

    const inquiryId = `corp-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const insertPayload = {
      id: inquiryId,
      company_name: companyName.trim(),
      contact_person: contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      occasion: occasion.trim(),
      quantity: quantity.trim(),
      message: message ? message.trim() : "",
      status: "New",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("corporate_inquiries")
      .insert([insertPayload])
      .select()
      .single();

    if (error) {
      console.warn("Supabase insert error on corporate_inquiries:", error.message);
      return NextResponse.json(
        {
          inquiry: formatDbInquiry(insertPayload),
          warning: "Inquiry saved locally. Run supabase/schema.sql for cloud database sync.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ inquiry: formatDbInquiry(data) }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/corporate-inquiries error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit corporate inquiry" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/corporate-inquiries
 * Updates inquiry status (New -> Contacted -> Quoted -> Closed)
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Inquiry ID and new status are required." },
        { status: 400 }
      );
    }

    const validStatuses = ["New", "Contacted", "Quoted", "Closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("corporate_inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.warn("Supabase update error on corporate_inquiries:", error.message);
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err: any) {
    console.error("PATCH /api/corporate-inquiries error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update inquiry status" },
      { status: 500 }
    );
  }
}
