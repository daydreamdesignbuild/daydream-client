import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL    = "https://wboqkfqibztjmdwrwsch.supabase.co";
const PORTAL_URL      = "https://daydreamdesignandbuild.com/app/";
const RESEND_API_KEY  = Deno.env.get("RESEND_API_KEY") ?? "";

serve(async (req) => {
  try {
    const body   = await req.json();
    const client = body.record;

    if (!client?.email) {
      return new Response(JSON.stringify({ error: "No client data" }), { status: 400 });
    }

    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(SUPABASE_URL, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const firstName = (client.full_name || "").split(" ")[0] || "there";

    // ── STEP 1: Create auth user (pre-confirmed, no confirmation email) ──
    const { error: createErr } = await supabase.auth.admin.createUser({
      email:         client.email,
      email_confirm: true,
      user_metadata: { full_name: client.full_name || "" }
    });
    if (createErr && !createErr.message.includes("already been registered")) {
      console.log("createUser note:", createErr.message);
    }

    // ── STEP 2: Generate magic link ──────────────────────────────
    let magicLink = PORTAL_URL;
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type:    "magiclink",
      email:   client.email,
      options: { redirectTo: PORTAL_URL }
    });

    if (linkError) {
      console.error("Generate link error:", linkError.message);
    } else if (linkData?.properties?.action_link) {
      // Use action_link directly — do NOT route through auth-redirect
      // auth-redirect strips the #access_token hash on redirect, breaking login
      magicLink = linkData.properties.action_link;
      console.log("Magic link generated for:", client.email);
    }

    const serviceName = client.project_type || "Not specified";

    // ── STEP 3: Send branded welcome email via Resend ────────────
    const clientHtml = `<!DOCTYPE html>
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
            <p style="font-family:Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1a1a18;margin:0 0 20px;line-height:1.4">Hello, ${firstName}</p>
            <p style="font-size:14px;color:#4a4a48;line-height:1.9;margin:0 0 12px">Thank you for reaching out to Daydream Design and Build. Your private client portal has been set up and is ready for you right now.</p>
            <p style="font-size:14px;color:#4a4a48;line-height:1.9;margin:0 0 32px">Click the button below to sign in directly — <strong style="color:#1a1a18">no password needed.</strong> The link is secure and works immediately.</p>
            <div style="text-align:center;margin:36px 0">
              <a href="${magicLink}" style="display:inline-block;background:#eeb24a;color:#0d0d0b;text-decoration:none;font-family:Georgia,serif;font-size:11px;font-weight:700;letter-spacing:0.4em;text-transform:uppercase;padding:18px 48px">Access Your Portal</a>
            </div>
            <div style="background:#faf8f4;border-left:3px solid #eeb24a;padding:20px 24px;margin:32px 0">
              <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#eeb24a;margin:0 0 12px;font-weight:700">Inside your portal</p>
              <p style="font-size:13px;color:#4a4a48;line-height:2;margin:0">Track your project timeline &nbsp;&middot;&nbsp; Upload documents &nbsp;&middot;&nbsp; Message our team directly &nbsp;&middot;&nbsp; View your shared project files &nbsp;&middot;&nbsp; Schedule calls</p>
            </div>
            <p style="font-size:11px;color:#8a8680;text-align:center;line-height:1.8;margin:32px 0 8px">If the button above does not work, copy and paste this link into your browser:</p>
            <p style="font-size:10px;color:#8a8680;text-align:center;line-height:1.8;word-break:break-all;margin:0 0 32px">${magicLink}</p>
            <p style="font-size:11px;color:#8a8680;text-align:center;line-height:1.8;margin:0">This link expires in 24 hours. After that, visit <strong style="color:#eeb24a">daydreamdesignandbuild.com/app</strong> and enter your email for a new link.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0b;border-top:1px solid #252520;padding:24px 40px;text-align:center">
            <p style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#eeb24a;margin:0">Daydream Design and Build &nbsp;&middot;&nbsp; Atlanta, Georgia</p>
            <p style="font-size:9px;color:#5a5a55;margin:8px 0 0;letter-spacing:0.1em">start@daydreamdesignandbuild.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const emailRes  = await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: { "Authorization": "Bearer " + RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from:    "Daydream Design + Build <hello@daydreamdesignandbuild.com>",
        to:      [client.email],
        subject: "Your Daydream Client Portal Is Ready",
        html:    clientHtml
      })
    });

    const emailData = await emailRes.json();
    console.log("Client email result:", JSON.stringify(emailData));

    // ── STEP 4: Send internal Slack notification ──────────────────
    const slackUrl = "https://hooks.slack.com/services/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";
    await fetch(slackUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🌿 *New Daydream Lead*\n*Name:* ${client.full_name || "Unknown"}\n*Email:* ${client.email}\n*Phone:* ${client.phone || "—"}\n*Service:* ${serviceName}\n*Investment:* ${client.investment || "—"}\n*Referral:* ${client.referral || "—"}`
      })
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, email_sent: emailRes.ok }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("send-email error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
