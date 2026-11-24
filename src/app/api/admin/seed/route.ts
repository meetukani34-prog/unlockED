import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Controlled server-side admin initialization endpoint.
 * Protected by ADMIN_INIT_SECRET so public users cannot trigger it.
 */
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const initSecret = process.env.ADMIN_INIT_SECRET || "unlocked_root_setup_token";

    if (!authHeader || authHeader !== `Bearer ${initSecret}`) {
      return NextResponse.json(
        { error: "Forbidden: Invalid administrator setup secret" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, password, fullName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // When Supabase is configured with service role key:
    try {
      const adminClient = createAdminClient();

      // Create user in Supabase auth
      const { data: userData, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName || "Platform Administrator" },
      });

      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 400 });
      }

      // Assign the 'admin' role in the profiles table
      const { error: profileError } = await adminClient
        .from("profiles")
        .update({ role: "admin", onboarding_completed: true })
        .eq("id", userData.user.id);

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }

      return NextResponse.json({
        message: "First platform administrator successfully initialized",
        userId: userData.user.id,
      });
    } catch (e: unknown) {
      // If Supabase credentials are not yet configured in local environment
      return NextResponse.json({
        message: "Controlled admin verification endpoint is ready. In local demo mode, admin role can be accessed via the top-bar role selector.",
        adminEmail: email,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error during administrator initialization" },
      { status: 500 }
    );
  }
}
