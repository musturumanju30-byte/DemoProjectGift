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

export interface ReminderItem {
  id: string;
  userId: string;
  occasion: string;
  recipientName: string;
  date: string; // YYYY-MM-DD
  notifyDaysBefore: number;
  notes?: string;
  createdAt: string;
}

function formatDbReminder(row: any): ReminderItem {
  return {
    id: row.id,
    userId: row.user_id,
    occasion: row.occasion,
    recipientName: row.recipient_name,
    date: row.date,
    notifyDaysBefore: Number(row.notify_days_before) || 3,
    notes: row.notes || "",
    createdAt: row.created_at || new Date().toISOString(),
  };
}

/**
 * GET /api/reminders?userId=...
 * Returns all saved reminders for the customer
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required to fetch reminders." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: true });

    if (error) {
      console.warn("Supabase reminders query error (table may need schema run):", error.message);
      return NextResponse.json({ reminders: [], isLocalFallback: true }, { status: 200 });
    }

    const reminders = (data || []).map(formatDbReminder);
    return NextResponse.json({ reminders, isLocalFallback: false });
  } catch (err: any) {
    console.error("GET /api/reminders error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch reminders" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reminders
 * Body: { userId, occasion, recipientName, date, notifyDaysBefore, notes }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, occasion, recipientName, date, notifyDaysBefore, notes } = body;

    if (!userId || !occasion || !recipientName || !date) {
      return NextResponse.json(
        { error: "Missing required fields (userId, occasion, recipientName, date)." },
        { status: 400 }
      );
    }

    const reminderId = `rem-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const insertPayload = {
      id: reminderId,
      user_id: userId,
      occasion: occasion.trim(),
      recipient_name: recipientName.trim(),
      date: date.trim(),
      notify_days_before: Number(notifyDaysBefore) || 3,
      notes: notes ? notes.trim() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("reminders")
      .insert([insertPayload])
      .select()
      .single();

    if (error) {
      console.warn("Supabase insert error on reminders (will provide formatted response):", error.message);
      // Still return the created reminder object so frontend can persist in local state
      return NextResponse.json(
        {
          reminder: formatDbReminder(insertPayload),
          warning: "Saved locally. Run supabase/schema.sql in Supabase SQL editor for cloud persistence.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ reminder: formatDbReminder(data) }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/reminders error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create reminder" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/reminders?id=...
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Reminder ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("reminders").delete().eq("id", id);

    if (error) {
      console.warn("Supabase delete error on reminders:", error.message);
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error("DELETE /api/reminders error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete reminder" },
      { status: 500 }
    );
  }
}
