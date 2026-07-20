/*
  dd-outreach.js
  Outreach Control — review/approve queue for cold outreach drafts.

  Usage: on a WordPress page, add a Code/HTML block containing:

    <div id="dd-outreach-app"></div>
    <script src="https://cdn.jsdelivr.net/gh/daydreamdesignbuild/daydream-client@main/dd-outreach.js"></script>

  Self-contained: injects its own styles and markup into #dd-outreach-app,
  loads supabase-js from CDN if not already present on the page.
*/
(function () {
  const MOUNT_ID = "dd-outreach-app";
  const SUPABASE_URL = "https://wboqkfqibztjmdwrwsch.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU";
  const ADMIN_EMAIL = "daydreamdesignandbuild@gmail.com";

  function injectStyles() {
    if (document.getElementById("dd-outreach-styles")) return;
    const style = document.createElement("style");
    style.id = "dd-outreach-styles";
    style.textContent = `
      #${MOUNT_ID} {
        --dd-bronze: #9e7b50;
        --dd-bronze-light: #c4a07a;
        --dd-charcoal: #28231e;
        --dd-stone: #8a7d73;
        --dd-off-white: #faf8f5;
        --dd-cream: #ede8df;
        --dd-warm-white: #f7f3ed;
        --dd-rule: #ddd7ce;
        font-family: 'Jost', sans-serif;
        font-size: 15px;
        color: var(--dd-charcoal);
        background: var(--dd-off-white);
        display: block;
        min-height: 85vh;
        padding-bottom: 60px;
      }
      #${MOUNT_ID} * { box-sizing: border-box; }
      #${MOUNT_ID} h1, #${MOUNT_ID} h2, #${MOUNT_ID} h3 {
        font-family: 'Cormorant Garamond', serif; font-weight: 600; margin: 0;
      }
      #${MOUNT_ID} .dd-outreach-login {
        max-width: 360px; margin: 60px auto; padding: 40px; background: white; border: 1px solid var(--dd-rule);
      }
      #${MOUNT_ID} .dd-outreach-login h2 { margin-bottom: 20px; }
      #${MOUNT_ID} .dd-outreach-login input {
        width: 100%; padding: 10px 12px; margin-bottom: 12px; border: 1px solid var(--dd-rule);
        font-family: 'Jost', sans-serif; font-size: 14px;
      }
      #${MOUNT_ID} button {
        font-family: 'Jost', sans-serif; font-weight: 500; cursor: pointer; border: none;
        padding: 9px 18px; font-size: 13px; letter-spacing: 0.02em; transition: opacity 0.15s;
      }
      #${MOUNT_ID} button:hover { opacity: 0.85; }
      #${MOUNT_ID} button:disabled { opacity: 0.4; cursor: not-allowed; }
      #${MOUNT_ID} .dd-btn-primary { background: var(--dd-bronze); color: white; }
      #${MOUNT_ID} .dd-btn-outline { background: transparent; color: var(--dd-charcoal); border: 1px solid var(--dd-rule); }
      #${MOUNT_ID} .dd-btn-danger { background: transparent; color: #a14b3f; border: 1px solid #a14b3f22; }
      #${MOUNT_ID} .dd-btn-danger:hover { background: #a14b3f11; }
      #${MOUNT_ID} .dd-outreach-header {
        background: var(--dd-charcoal); color: var(--dd-warm-white); padding: 20px 28px;
        display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 28px;
      }
      #${MOUNT_ID} .dd-outreach-header h1 { font-size: 24px; color: var(--dd-warm-white); }
      #${MOUNT_ID} .dd-outreach-header .dd-sub {
        color: var(--dd-bronze-light); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;
      }
      #${MOUNT_ID} .dd-outreach-main { max-width: 940px; margin: 0 auto; padding: 0 20px 40px; }
      #${MOUNT_ID} nav.dd-tabs { display: flex; gap: 4px; margin-bottom: 24px; border-bottom: 1px solid var(--dd-rule); }
      #${MOUNT_ID} nav.dd-tabs button {
        background: none; color: var(--dd-stone); padding: 12px 18px; border-bottom: 2px solid transparent; font-size: 14px;
      }
      #${MOUNT_ID} nav.dd-tabs button.dd-active { color: var(--dd-charcoal); border-bottom-color: var(--dd-bronze); }
      #${MOUNT_ID} .dd-count {
        display: inline-block; background: var(--dd-cream); color: var(--dd-charcoal);
        border-radius: 10px; padding: 1px 8px; font-size: 11px; margin-left: 6px;
      }
      #${MOUNT_ID} .dd-card { background: white; border: 1px solid var(--dd-rule); padding: 20px 22px; margin-bottom: 14px; }
      #${MOUNT_ID} .dd-card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
      #${MOUNT_ID} .dd-card-head .dd-name { font-size: 18px; font-family: 'Cormorant Garamond', serif; font-weight: 600; }
      #${MOUNT_ID} .dd-card-head .dd-meta { color: var(--dd-stone); font-size: 13px; margin-top: 2px; }
      #${MOUNT_ID} .dd-tags { display: flex; gap: 6px; flex-wrap: wrap; margin: 8px 0; }
      #${MOUNT_ID} .dd-tag {
        background: var(--dd-cream); color: var(--dd-charcoal); font-size: 11px;
        padding: 3px 9px; letter-spacing: 0.02em; text-transform: uppercase;
      }
      #${MOUNT_ID} .dd-tag.dd-funnel { background: var(--dd-bronze); color: white; }
      #${MOUNT_ID} .dd-actions { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
      #${MOUNT_ID} .dd-empty { color: var(--dd-stone); text-align: center; padding: 60px 0; font-size: 15px; }
      #${MOUNT_ID} label.dd-field-label {
        display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em;
        color: var(--dd-stone); margin: 12px 0 4px;
      }
      #${MOUNT_ID} input.dd-subject-edit, #${MOUNT_ID} select.dd-subject-edit, #${MOUNT_ID} textarea.dd-body-edit {
        width: 100%; border: 1px solid var(--dd-rule); padding: 10px; font-family: 'Jost', sans-serif;
        font-size: 14px; background: var(--dd-warm-white);
      }
      #${MOUNT_ID} textarea.dd-body-edit { min-height: 140px; resize: vertical; line-height: 1.5; }
      #${MOUNT_ID} .dd-step-badge { color: var(--dd-bronze); font-size: 12px; font-weight: 500; }
      #dd-outreach-toast {
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        background: var(--dd-charcoal, #28231e); color: white; padding: 10px 20px; font-size: 13px;
        opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 9999;
      }
      #dd-outreach-toast.dd-show { opacity: 1; }
    `;
    document.head.appendChild(style);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(s);
    });
  }

  function ensureFonts() {
    if (document.getElementById("dd-outreach-fonts")) return;
    const link = document.createElement("link");
    link.id = "dd-outreach-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }

  async function init() {
    const mount = document.getElementById(MOUNT_ID);
    if (!mount) return; // not on this page

    try {
      injectStyles();
      ensureFonts();

      if (!window.supabase) {
        await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
      }
      await mountApp(mount);
    } catch (err) {
      mount.innerHTML = `<div style="padding:40px; text-align:center; color:#a14b3f; font-family:sans-serif;">
        Outreach Control failed to load: ${err.message || err}
      </div>`;
      console.error("dd-outreach init failed:", err);
    }
  }

  async function mountApp(mount) {
    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    mount.innerHTML = `
      <div id="dd-outreach-login" class="dd-outreach-login">
        <h2>Outreach Control</h2>
        <input type="password" id="dd-login-password" placeholder="Password" autocomplete="off">
        <button class="dd-btn-primary" style="width:100%" id="dd-login-btn">Sign in</button>
        <div id="dd-login-error" style="color:#a14b3f; font-size:13px; margin-top:10px;"></div>
      </div>
      <div id="dd-outreach-shell" style="display:none;">
        <header class="dd-outreach-header">
          <h1>Outreach Control</h1>
          <div class="dd-sub">Daydream / Stone Atelier</div>
        </header>
        <main class="dd-outreach-main">
          <nav class="dd-tabs">
            <button class="dd-active" data-tab="new">Needs Assignment <span class="dd-count" id="dd-count-new">0</span></button>
            <button data-tab="review">Pending Review <span class="dd-count" id="dd-count-review">0</span></button>
            <button data-tab="active">Active Funnels <span class="dd-count" id="dd-count-active">0</span></button>
          </nav>
          <div id="dd-tab-new" class="dd-tab-panel"></div>
          <div id="dd-tab-review" class="dd-tab-panel" style="display:none;"></div>
          <div id="dd-tab-active" class="dd-tab-panel" style="display:none;"></div>
        </main>
      </div>
    `;

    // Scoped lookup - only ever finds elements inside OUR container, immune to
    // any duplicate ID elsewhere on the WordPress page (a real risk on a live site).
    const $ = (id) => mount.querySelector("#" + id);

    if (!document.getElementById("dd-outreach-toast")) {
      const toast = document.createElement("div");
      toast.id = "dd-outreach-toast";
      document.body.appendChild(toast);
    }

    function toast(msg) {
      const t = document.getElementById("dd-outreach-toast");
      t.textContent = msg;
      t.classList.add("dd-show");
      setTimeout(() => t.classList.remove("dd-show"), 2200);
    }

    function showTab(tab) {
      mount.querySelectorAll("nav.dd-tabs button").forEach((b) => b.classList.toggle("dd-active", b.dataset.tab === tab));
      mount.querySelectorAll(".dd-tab-panel").forEach((p) => (p.style.display = "none"));
      $("dd-tab-" + tab).style.display = "block";
    }
    mount.querySelectorAll("nav.dd-tabs button").forEach((b) => {
      b.addEventListener("click", () => showTab(b.dataset.tab));
    });

    async function loadAll() {
      await Promise.all([loadNewLeads(), loadPendingReview(), loadActiveFunnels()]);
    }

    async function requestDraft(leadId, mode, sendFrom) {
      const { data: sessionData } = await sb.auth.getSession();
      const token = sessionData.session.access_token;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-draft-for-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lead_id: leadId, mode, send_from: sendFrom }),
      });
      if (!res.ok) {
        toast("Could not generate draft — check the edge function logs");
        return false;
      }
      return true;
    }

    async function loadNewLeads() {
      const { data: leads } = await sb
        .from("cold_outreach_leads")
        .select("*")
        .eq("outreach_mode", "none")
        .order("created_at", { ascending: false });

      $("dd-count-new").textContent = leads?.length ?? 0;
      const container = $("dd-tab-new");

      if (!leads || leads.length === 0) {
        container.innerHTML = `<div class="dd-empty">No unassigned leads. New contacts you import will show up here — nothing sends until you choose single or funnel.</div>`;
        return;
      }

      container.innerHTML = leads
        .map(
          (l) => `
        <div class="dd-card">
          <div class="dd-card-head">
            <div>
              <div class="dd-name">${l.first_name ?? ""} ${l.last_name ?? ""}</div>
              <div class="dd-meta">${l.company ?? ""}${l.title ? " · " + l.title : ""}${l.location ? " · " + l.location : ""}</div>
              <div class="dd-meta">${l.email}</div>
            </div>
          </div>
          <div class="dd-tags">${(l.events || []).map((e) => `<span class="dd-tag">${e}</span>`).join("")}</div>
          <label class="dd-field-label">Send from</label>
          <select class="dd-subject-edit" id="dd-sendfrom-${l.id}" style="width:auto; padding:8px 10px;">
            <option value="start@daydreamdesignandbuild.com">start@daydreamdesignandbuild.com (general / design-build)</option>
            <option value="stonestudio@daydreamdesignandbuild.com">stonestudio@daydreamdesignandbuild.com (Stone Atelier)</option>
          </select>
          <div class="dd-actions">
            <button class="dd-btn-primary" data-action="single" data-id="${l.id}">Send One-Time Email</button>
            <button class="dd-btn-outline" data-action="funnel" data-id="${l.id}">Start Funnel</button>
            <button class="dd-btn-outline" data-action="skip" data-id="${l.id}">Skip / Ignore</button>
          </div>
        </div>
      `
        )
        .join("");

      container.querySelectorAll("[data-action='single'], [data-action='funnel']").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const leadId = btn.dataset.id;
          const mode = btn.dataset.action;
          btn.disabled = true;
          btn.textContent = "Generating draft...";
          const sendFrom = $(`dd-sendfrom-${leadId}`).value;
          const ok = await requestDraft(leadId, mode, sendFrom);
          if (ok) {
            toast(mode === "single" ? "Draft ready for review" : "Funnel started — first draft ready for review");
            loadAll();
          } else {
            btn.disabled = false;
          }
        });
      });

      container.querySelectorAll("[data-action='skip']").forEach((btn) => {
        btn.addEventListener("click", async () => {
          btn.disabled = true;
          await sb.from("cold_outreach_leads").update({ outreach_mode: "skipped" }).eq("id", btn.dataset.id);
          toast("Lead skipped");
          loadNewLeads();
        });
      });
    }

    async function loadPendingReview() {
      const { data: drafts } = await sb
        .from("outreach_drafts")
        .select("*, cold_outreach_leads(id, first_name, last_name, company, title, email, events, outreach_mode)")
        .eq("status", "pending_review")
        .order("created_at", { ascending: true });

      $("dd-count-review").textContent = drafts?.length ?? 0;
      const container = $("dd-tab-review");

      if (!drafts || drafts.length === 0) {
        container.innerHTML = `<div class="dd-empty">Nothing waiting on you right now.</div>`;
        return;
      }

      container.innerHTML = drafts
        .map((d) => {
          const lead = d.cold_outreach_leads;
          return `
        <div class="dd-card">
          <div class="dd-card-head">
            <div>
              <div class="dd-name">${lead.first_name ?? ""} ${lead.last_name ?? ""}</div>
              <div class="dd-meta">${lead.company ?? ""}${lead.title ? " · " + lead.title : ""} · ${lead.email}</div>
            </div>
            <div>${d.funnel_step ? `<span class="dd-tag dd-funnel">Funnel · Step ${d.funnel_step}</span>` : `<span class="dd-tag">One-time</span>`}</div>
          </div>
          <label class="dd-field-label">Subject</label>
          <input class="dd-subject-edit" id="dd-subject-${d.id}" value="${(d.subject || "").replace(/"/g, "&quot;")}">
          <label class="dd-field-label">Body</label>
          <textarea class="dd-body-edit" id="dd-body-${d.id}">${d.body || ""}</textarea>
          <div class="dd-actions">
            <button class="dd-btn-primary" data-action="approve" data-id="${d.id}">Approve to Send</button>
            <button class="dd-btn-danger" data-action="reject" data-id="${d.id}">Reject</button>
          </div>
        </div>
      `;
        })
        .join("");

      container.querySelectorAll("[data-action='approve']").forEach((btn) => {
        btn.addEventListener("click", async () => {
          btn.disabled = true;
          const draftId = btn.dataset.id;
          const subject = $(`dd-subject-${draftId}`).value;
          const body = $(`dd-body-${draftId}`).value;
          await sb
            .from("outreach_drafts")
            .update({ subject, body, status: "approved", approved_at: new Date().toISOString(), edited: true })
            .eq("id", draftId);
          toast("Approved — will send in the next scheduled batch");
          loadAll();
        });
      });

      container.querySelectorAll("[data-action='reject']").forEach((btn) => {
        btn.addEventListener("click", async () => {
          btn.disabled = true;
          await sb.from("outreach_drafts").update({ status: "rejected" }).eq("id", btn.dataset.id);
          toast("Draft rejected");
          loadAll();
        });
      });
    }

    async function loadActiveFunnels() {
      const { data: leads } = await sb
        .from("cold_outreach_leads")
        .select("*")
        .eq("outreach_mode", "funnel")
        .eq("funnel_status", "active")
        .order("next_step_due_at", { ascending: true });

      $("dd-count-active").textContent = leads?.length ?? 0;
      const container = $("dd-tab-active");

      if (!leads || leads.length === 0) {
        container.innerHTML = `<div class="dd-empty">No active funnels right now.</div>`;
        return;
      }

      container.innerHTML = leads
        .map(
          (l) => `
        <div class="dd-card">
          <div class="dd-card-head">
            <div>
              <div class="dd-name">${l.first_name ?? ""} ${l.last_name ?? ""}</div>
              <div class="dd-meta">${l.company ?? ""} · ${l.email}</div>
              <div class="dd-step-badge">Step ${l.funnel_step} sent · next due ${l.next_step_due_at ? new Date(l.next_step_due_at).toLocaleDateString() : "—"}</div>
            </div>
          </div>
          <div class="dd-actions">
            <button class="dd-btn-danger" data-action="respond" data-id="${l.id}">Mark as Responded — Stop Funnel</button>
          </div>
        </div>
      `
        )
        .join("");

      container.querySelectorAll("[data-action='respond']").forEach((btn) => {
        btn.addEventListener("click", async () => {
          btn.disabled = true;
          const leadId = btn.dataset.id;
          await sb.from("cold_outreach_leads").update({ funnel_status: "stopped_response", next_step_due_at: null }).eq("id", leadId);
          await sb.from("outreach_drafts").update({ status: "rejected" }).eq("lead_id", leadId).eq("status", "pending_review");
          toast("Funnel stopped — no further emails will go to this lead");
          loadAll();
        });
      });
    }

    $("dd-login-btn").addEventListener("click", async () => {
      const password = $("dd-login-password").value;

      // Temporary debug line - safe to leave in, never logs the actual password
      console.log("[dd-outreach] attempting login | password length:", password.length);

      const { error } = await sb.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
      if (error) {
        $("dd-login-error").textContent = error.message;
        console.error("[dd-outreach] login failed:", error);
        return;
      }
      $("dd-outreach-login").style.display = "none";
      $("dd-outreach-shell").style.display = "block";
      loadAll();
    });

    const { data: sessionData } = await sb.auth.getSession();
    if (sessionData.session) {
      $("dd-outreach-login").style.display = "none";
      $("dd-outreach-shell").style.display = "block";
      loadAll();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
