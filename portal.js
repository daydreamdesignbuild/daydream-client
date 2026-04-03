import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL   = "https://wboqkfqibztjmdwrwsch.supabase.co";
const PORTAL_URL     = "https://daydreamdesignandbuild.com/app/";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let email = "", full_name = "";
    try {
      const text = await req.text();
      if (text) {
        const body = JSON.parse(text);
        email     = (body.email || "").toLowerCase().trim();
        full_name = body.full_name || "";
      }
    } catch(e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(SUPABASE_URL, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // ── STEP 1: Generate a simple memorable password ────────────
    const words = ["Daydream","Design","Build","Stone","Atlanta","Project","Dream","Outdoor","Garden","Living"];
    const word  = words[Math.floor(Math.random() * words.length)];
    const nums  = String(Math.floor(1000 + Math.random() * 9000));
    const tempPassword = word + nums;

    // ── STEP 2: Create auth user with password (or update if exists) ──
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const userExists = existingUser?.users?.some((u: any) => u.email === email);

    if (userExists) {
      // Update password for existing user
      const { data: userData } = await supabase.auth.admin.listUsers();
      const user = userData?.users?.find((u: any) => u.email === email);
      if (user) {
        await supabase.auth.admin.updateUserById(user.id, { password: tempPassword });
        console.log("Password updated for existing user:", email);
      }
    } else {
      const { error: createError } = await supabase.auth.admin.createUser({
        email,
        password:      tempPassword,
        email_confirm: true,
        user_metadata: { full_name }
      });
      if (createError) console.log("createUser note:", createError.message);
    }
    console.log("Auth user ready for:", email);

    // ── STEP 3: Send branded welcome email with credentials ────────
    const firstName = (full_name || "").split(" ")[0] || "there";

    const emailRes = await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: { "Authorization": "Bearer " + RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from:    "Daydream Design + Build <start@daydreamdesignandbuild.com>",
        to:      [email],
        subject: "Your Daydream Client Portal Is Ready",
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <tr>
          <td style="background:#0d0d0b;border-bottom:3px solid #eeb24a;padding:36px 40px;text-align:center">
            <div style="font-family:Georgia,serif;font-size:30px;font-weight:400;letter-spacing:0.2em;color:#eeb24a;text-transform:uppercase">Daydream</div>
            <div style="font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:#8a8680;margin-top:6px">Design + Build &nbsp;&middot;&nbsp; Atlanta, Georgia</div>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:48px 40px">
            <p style="font-family:Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1a1a18;margin:0 0 20px">Hello, ${firstName}</p>
            <p style="font-size:14px;color:#4a4a48;line-height:1.9;margin:0 0 12px">Your Daydream client portal has been set up and is ready for you right now.</p>
            <p style="font-size:14px;color:#4a4a48;line-height:1.9;margin:0 0 32px">Click the button below to sign in directly — <strong style="color:#1a1a18">no password needed.</strong></p>
            <div style="text-align:center;margin:36px 0">
              <a href="${magicLinkUrl}" style="display:inline-block;background:#eeb24a;color:#0d0d0b;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;padding:18px 48px">Access Your Portal</a>
            </div>
            <p style="font-size:11px;color:#8a8680;text-align:center;line-height:1.8;margin:32px 0 8px">If the button does not work, copy and paste this link:</p>
            <p style="font-size:10px;color:#8a8680;text-align:center;word-break:break-all;margin:0 0 32px">${magicLinkUrl}</p>
            <p style="font-size:11px;color:#8a8680;text-align:center;line-height:1.8;margin:0">Link expires in 24 hours. After that visit <strong style="color:#eeb24a">daydreamdesignandbuild.com/app</strong> to get a new one.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0b;padding:24px 40px;text-align:center">
            <p style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#eeb24a;margin:0">Daydream Design and Build &nbsp;&middot;&nbsp; Atlanta, Georgia</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
      })
    });

    const emailData = await emailRes.json();
    console.log("invite-client email result:", JSON.stringify(emailData));

    return new Response(JSON.stringify({ success: true, email_sent: emailRes.ok }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("invite-client error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
