const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface EnrollmentNotification {
  type: "enrollment";
  user_name: string;
  email: string;
  phone: string;
  course_name?: string;
  message?: string;
}

interface LeadNotification {
  type: "lead";
  name: string;
  email: string;
  phone: string;
  course_interest?: string;
  message?: string;
}

type Notification = EnrollmentNotification | LeadNotification;

export async function notifyAdmin(payload: Notification): Promise<void> {
  if (!SUPABASE_URL || !SERVICE_KEY) return;

  try {
    await fetch(`${SUPABASE_URL}/functions/v1/notify-admin`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("[notifyAdmin]", err);
  }
}
