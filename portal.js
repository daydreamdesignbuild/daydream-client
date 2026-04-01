(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var PORTAL_URL   = 'https://daydreamdesignandbuild.com/app/';
  var CONSULT_URL  = 'https://calendar.app.google/ZjpMu7tf98SSMhMX7';
  var REVISION_URL = 'https://calendar.app.google/eBvdjy8mdvgMtRHB6';

  var TIMELINE = [
    { value: 'inquiry_submitted',            label: 'Inquiry Submitted' },
    { value: 'discovery_call',               label: 'Discovery Call' },
    { value: 'design_proposal',              label: 'Design Proposal' },
    { value: 'contract_signed',              label: 'Contract Signed' },
    { value: 'concept_design_phase',         label: 'Concept Design Phase' },
    { value: 'design_review_revisions',      label: 'Design Review & Revisions' },
    { value: 'construction_document_phase',  label: 'Construction Document Phase' },
    { value: 'permit_submittal',             label: 'Permit Submittal' },
    { value: 'permit_design_revisions',      label: 'Permit Design Revisions' },
    { value: 'permit_approved',              label: 'Permit Approved' },
    { value: 'final_deliverables',           label: 'Final Deliverables' },
    { value: 'construction_start_scheduled', label: 'Construction Start Date Scheduled' },
    { value: '50_percent_completion',        label: '50% Completion' },
    { value: '90_percent_completion',        label: '90% Completion' },
    { value: 'final_walk_through',           label: 'Final Walk Through' },
    { value: 'project_complete',             label: 'Project Complete' }
  ];

  var CONTRACT_LABELS = {
    'not_sent':          { label: 'Not Yet Sent',              color: '#8a8680' },
    'sent':              { label: 'Sent — Awaiting Signature', color: '#eeb24a' },
    'signed':            { label: 'Signed ✓',                  color: '#6a9e7a' }
  };

  var PAYMENT_LABELS = {
    'not_sent':          { label: 'Invoice Not Yet Sent',      color: '#8a8680' },
    'invoice_sent':      { label: 'Invoice Sent — Awaiting Payment', color: '#eeb24a' },
    'deposit_paid':      { label: 'Deposit Paid — Balance Due', color: '#5a8e9e' },
    'partially_paid':    { label: 'Partially Paid',            color: '#7a9e8a' },
    'payment_complete':  { label: 'Payment Complete ✓',        color: '#6a9e7a' }
  };

  function getStageIndex(value) {
    var idx = TIMELINE.findIndex(function(s) { return s.value === value; });
    return idx === -1 ? 0 : idx;
  }

  // ── PWA: Register Service Worker ──────────────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function(err) {
        console.log('SW registration failed:', err);
      });
    });
  }

  // ── FONTS ─────────────────────────────────────────────────────────
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap';
  document.head.appendChild(font);

  // ── PWA MANIFEST LINK ─────────────────────────────────────────────
  var manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = 'https://daydreamdesignbuild.github.io/daydream-client/manifest.json';
  document.head.appendChild(manifestLink);

  // ── META TAGS FOR PWA ─────────────────────────────────────────────
  var metaTheme = document.createElement('meta');
  metaTheme.name = 'theme-color';
  metaTheme.content = '#eeb24a';
  document.head.appendChild(metaTheme);

  var metaApple = document.createElement('meta');
  metaApple.name = 'apple-mobile-web-app-capable';
  metaApple.content = 'yes';
  document.head.appendChild(metaApple);

  var metaAppleStatus = document.createElement('meta');
  metaAppleStatus.name = 'apple-mobile-web-app-status-bar-style';
  metaAppleStatus.content = 'black-translucent';
  document.head.appendChild(metaAppleStatus);

  var metaAppleTitle = document.createElement('meta');
  metaAppleTitle.name = 'apple-mobile-web-app-title';
  metaAppleTitle.content = 'Daydream';
  document.head.appendChild(metaAppleTitle);

  var metaViewport = document.querySelector('meta[name="viewport"]');
  if (!metaViewport) {
    metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(metaViewport);
  }

  // ── STYLES ────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#dd-portal * { box-sizing: border-box; margin: 0; padding: 0; }',
    '#dd-portal { --bg: #0d0d0b; --surface: #131310; --surface-2: #181815; --border: #252520; --text: #f0ebe0; --muted: #8a8680; --gold: #eeb24a; --gold-dim: rgba(238,178,74,0.08); --error: #c07a6a; --success: #6a9e7a; font-family: Jost, sans-serif; font-weight: 300; background: var(--bg); color: var(--text); min-height: 100vh; width: 100%; }',
    '#dd-portal .dd-loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); }',
    '#dd-portal .dd-login-wrap { min-height: 100vh; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; }',
    '#dd-portal .dd-login-wrap.visible { display: flex; animation: ddFadeUp 0.8s ease both; }',
    '#dd-portal .dd-login-card { width: 100%; max-width: 440px; border: 1px solid var(--border); background: var(--surface); }',
    '#dd-portal .dd-login-header { background: var(--bg); border-bottom: 3px solid var(--gold); padding: 36px 40px; text-align: center; }',
    '#dd-portal .dd-login-logo { font-family: "Cormorant Garamond", serif; font-size: 32px; font-weight: 400; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 6px; }',
    '#dd-portal .dd-login-sub { font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted); }',
    '#dd-portal .dd-login-body { padding: 36px 40px; }',
    '#dd-portal .dd-login-title { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 300; font-style: italic; color: var(--text); margin-bottom: 8px; }',
    '#dd-portal .dd-login-desc { font-size: 12px; color: var(--muted); line-height: 1.8; margin-bottom: 28px; }',
    '#dd-portal .dd-input-wrap { border: 1px solid var(--border); background: var(--surface-2); margin-bottom: 16px; transition: border-color 0.2s; }',
    '#dd-portal .dd-input-wrap:focus-within { border-color: var(--gold); background: var(--gold-dim); }',
    '#dd-portal .dd-input-wrap:focus-within::after { content: ""; display: block; height: 2px; background: var(--gold); }',
    '#dd-portal .dd-input-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); padding: 12px 16px 4px; display: block; }',
    '#dd-portal .dd-input-wrap:focus-within .dd-input-label { color: var(--gold); }',
    '#dd-portal .dd-input { width: 100%; background: transparent; border: none; outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 14px; font-weight: 300; padding: 4px 16px 12px; }',
    '#dd-portal .dd-input:-webkit-autofill { -webkit-box-shadow: 0 0 0 60px #131310 inset !important; -webkit-text-fill-color: #f0ebe0 !important; }',
    '#dd-portal .dd-btn { width: 100%; background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: Jost, sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; padding: 16px; cursor: pointer; transition: background 0.3s, color 0.3s; margin-top: 8px; }',
    '#dd-portal .dd-btn:hover { background: var(--gold); color: var(--bg); }',
    '#dd-portal .dd-btn:disabled { opacity: 0.4; cursor: not-allowed; }',
    '#dd-portal .dd-msg { font-size: 11px; text-align: center; padding: 10px; margin-top: 12px; display: none; letter-spacing: 0.05em; line-height: 1.8; }',
    '#dd-portal .dd-msg.visible { display: block; }',
    '#dd-portal .dd-msg.success { color: var(--success); }',
    '#dd-portal .dd-msg.error { color: var(--error); }',

    // PWA install banner
    '#dd-portal .dd-install-banner { background: var(--surface); border-bottom: 1px solid var(--gold); padding: 12px 24px; display: none; align-items: center; justify-content: space-between; gap: 16px; }',
    '#dd-portal .dd-install-banner.visible { display: flex; }',
    '#dd-portal .dd-install-text { font-size: 11px; color: var(--text); letter-spacing: 0.05em; }',
    '#dd-portal .dd-install-text span { color: var(--gold); }',
    '#dd-portal .dd-install-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; padding: 8px 16px; cursor: pointer; white-space: nowrap; }',
    '#dd-portal .dd-install-dismiss { background: none; border: none; color: var(--muted); font-size: 16px; cursor: pointer; padding: 0 4px; }',

    '#dd-portal .dd-dashboard { display: none; min-height: 100vh; flex-direction: column; }',
    '#dd-portal .dd-dashboard.visible { display: flex; }',
    '#dd-portal .dd-nav { background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 64px; position: sticky; top: 0; z-index: 100; }',
    '#dd-portal .dd-nav-logo { font-family: "Cormorant Garamond", serif; font-size: 22px; font-weight: 400; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; }',
    '#dd-portal .dd-nav-right { display: flex; align-items: center; gap: 24px; }',
    '#dd-portal .dd-nav-user { font-size: 11px; color: var(--muted); }',
    '#dd-portal .dd-nav-logout { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); cursor: pointer; background: none; border: none; transition: color 0.2s; }',
    '#dd-portal .dd-nav-logout:hover { color: var(--gold); }',
    '#dd-portal .dd-tabs { background: var(--surface); border-bottom: 1px solid var(--border); display: flex; overflow-x: auto; padding: 0 32px; }',
    '#dd-portal .dd-tab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 16px 20px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; white-space: nowrap; background: none; border-left: none; border-right: none; border-top: none; }',
    '#dd-portal .dd-tab:hover { color: var(--text); }',
    '#dd-portal .dd-tab.active { color: var(--gold); border-bottom-color: var(--gold); }',
    '#dd-portal .dd-content { flex: 1; padding: 40px 32px; max-width: 900px; width: 100%; margin: 0 auto; }',
    '#dd-portal .dd-section-title { font-family: "Cormorant Garamond", serif; font-size: 26px; font-weight: 300; color: var(--text); margin-bottom: 6px; }',
    '#dd-portal .dd-section-sub { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; margin-bottom: 32px; }',
    '#dd-portal .dd-welcome-card { border: 1px solid var(--gold); background: var(--gold-dim); padding: 32px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }',
    '#dd-portal .dd-welcome-text h3 { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 400; color: var(--gold); margin-bottom: 8px; }',
    '#dd-portal .dd-welcome-text p { font-size: 12px; color: var(--muted); line-height: 1.8; max-width: 400px; }',
    '#dd-portal .dd-cal-btn { display: inline-block; background: var(--gold); color: var(--bg); text-decoration: none; font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px 28px; font-weight: 500; white-space: nowrap; transition: opacity 0.2s; }',
    '#dd-portal .dd-cal-btn:hover { opacity: 0.85; }',
    '#dd-portal .dd-cal-btn.outline { background: transparent; border: 1px solid var(--gold); color: var(--gold); }',
    '#dd-portal .dd-cal-btn.outline:hover { background: var(--gold); color: var(--bg); }',
    '#dd-portal .dd-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 32px; }',
    '#dd-portal .dd-card { background: var(--surface); padding: 24px; }',
    '#dd-portal .dd-card-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }',
    '#dd-portal .dd-card-value { font-family: "Cormorant Garamond", serif; font-size: 20px; color: var(--gold); font-weight: 400; }',

    // Status badges
    '#dd-portal .dd-status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 32px; }',
    '#dd-portal .dd-status-card { background: var(--surface); padding: 20px 24px; }',
    '#dd-portal .dd-status-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }',
    '#dd-portal .dd-status-badge { font-size: 11px; letter-spacing: 0.08em; padding: 6px 12px; display: inline-block; border: 1px solid; font-weight: 400; }',

    '#dd-portal .dd-timeline { border: 1px solid var(--border); background: var(--surface); margin-bottom: 32px; }',
    '#dd-portal .dd-timeline-header { padding: 16px 24px; border-bottom: 1px solid var(--border); font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); background: var(--surface-2); }',
    '#dd-portal .dd-timeline-item { display: flex; align-items: center; gap: 16px; padding: 14px 24px; border-bottom: 1px solid var(--border); }',
    '#dd-portal .dd-timeline-item:last-child { border-bottom: none; }',
    '#dd-portal .dd-timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); flex-shrink: 0; }',
    '#dd-portal .dd-timeline-dot.done { background: var(--gold); }',
    '#dd-portal .dd-timeline-dot.active { background: var(--gold); box-shadow: 0 0 0 3px var(--gold-dim); }',
    '#dd-portal .dd-timeline-label { font-size: 12px; color: var(--text); letter-spacing: 0.05em; }',
    '#dd-portal .dd-timeline-label.muted { color: var(--muted); }',
    '#dd-portal .dd-timeline-badge { margin-left: auto; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px; border: 1px solid var(--gold); color: var(--gold); }',
    '#dd-portal .dd-upload-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }',
    '#dd-portal .dd-upload-card { border: 1px solid var(--border); background: var(--surface); overflow: hidden; }',
    '#dd-portal .dd-upload-card-header { padding: 14px 20px; border-bottom: 1px solid var(--border); background: var(--surface-2); }',
    '#dd-portal .dd-upload-card-title { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 3px; }',
    '#dd-portal .dd-upload-card-desc { font-size: 10px; color: var(--muted); }',
    '#dd-portal .dd-upload-card-body { padding: 20px; }',
    '#dd-portal .dd-drop-zone { border: 1px dashed var(--border); padding: 24px; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; position: relative; }',
    '#dd-portal .dd-drop-zone:hover { border-color: var(--gold); background: var(--gold-dim); }',
    '#dd-portal .dd-drop-zone input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }',
    '#dd-portal .dd-drop-icon { font-size: 20px; color: var(--gold); margin-bottom: 8px; }',
    '#dd-portal .dd-drop-text { font-size: 11px; color: var(--muted); }',
    '#dd-portal .dd-upload-status { font-size: 10px; color: var(--success); margin-top: 8px; text-align: center; min-height: 16px; }',
    '#dd-portal .dd-messages-wrap { border: 1px solid var(--border); background: var(--surface); display: flex; flex-direction: column; height: 500px; }',
    '#dd-portal .dd-messages-header { padding: 14px 24px; border-bottom: 1px solid var(--border); background: var(--surface-2); font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); }',
    '#dd-portal .dd-messages-list { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }',
    '#dd-portal .dd-message { display: flex; flex-direction: column; gap: 4px; max-width: 75%; }',
    '#dd-portal .dd-message.mine { align-self: flex-end; }',
    '#dd-portal .dd-message.theirs { align-self: flex-start; }',
    '#dd-portal .dd-message-bubble { padding: 12px 16px; font-size: 13px; line-height: 1.7; }',
    '#dd-portal .dd-message.mine .dd-message-bubble { background: var(--gold-dim); border: 1px solid var(--gold); color: var(--text); }',
    '#dd-portal .dd-message.theirs .dd-message-bubble { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); }',
    '#dd-portal .dd-message-meta { font-size: 9px; color: var(--muted); letter-spacing: 0.1em; }',
    '#dd-portal .dd-message.mine .dd-message-meta { text-align: right; }',
    '#dd-portal .dd-messages-input { border-top: 1px solid var(--border); display: flex; }',
    '#dd-portal .dd-messages-input textarea { flex: 1; background: var(--surface-2); border: none; outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 13px; font-weight: 300; padding: 16px 20px; resize: none; height: 56px; }',
    '#dd-portal .dd-messages-input textarea::placeholder { color: var(--muted); }',
    '#dd-portal .dd-send-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; padding: 0 24px; cursor: pointer; transition: opacity 0.2s; }',
    '#dd-portal .dd-send-btn:hover { opacity: 0.85; }',
    '#dd-portal .dd-drive-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); }',
    '#dd-portal .dd-drive-item { background: var(--surface); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }',
    '#dd-portal .dd-drive-item-info { flex: 1; }',
    '#dd-portal .dd-drive-item-name { font-size: 14px; color: var(--text); margin-bottom: 3px; }',
    '#dd-portal .dd-drive-item-sub { font-size: 10px; color: var(--muted); }',
    '#dd-portal .dd-drive-link { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid var(--gold); padding: 10px 20px; white-space: nowrap; transition: background 0.2s, color 0.2s; }',
    '#dd-portal .dd-drive-link:hover { background: var(--gold); color: var(--bg); }',
    '#dd-portal .dd-drive-empty { text-align: center; padding: 48px 24px; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; border: 1px solid var(--border); background: var(--surface); }',
    '#dd-portal .dd-tab-content { display: none; }',
    '#dd-portal .dd-tab-content.active { display: block; }',
    '#dd-portal .dd-empty { text-align: center; padding: 48px 24px; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; }',
    '@keyframes ddFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 600px) {',
    '  #dd-portal .dd-upload-grid { grid-template-columns: 1fr; }',
    '  #dd-portal .dd-nav { padding: 0 16px; height: 56px; }',
    '  #dd-portal .dd-tabs { padding: 0 16px; }',
    '  #dd-portal .dd-content { padding: 24px 16px; }',
    '  #dd-portal .dd-welcome-card { flex-direction: column; }',
    '  #dd-portal .dd-drive-item { flex-direction: column; align-items: flex-start; }',
    '  #dd-portal .dd-status-grid { grid-template-columns: 1fr; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-portal');
  if (!wrap) return;

  wrap.innerHTML = [
    '<div id="ddLoading" class="dd-loading">Loading your portal...</div>',
    '<div id="ddLoginWrap" class="dd-login-wrap">',
    '  <div class="dd-login-card">',
    '    <div class="dd-login-header"><div class="dd-login-logo">Daydream</div><div class="dd-login-sub">Design + Build &mdash; Atlanta, Georgia</div></div>',
    '    <div class="dd-login-body">',
    '      <div class="dd-login-title">Access Your Portal</div>',
    '      <div class="dd-login-desc">Enter your email address and we will send you a secure one-click link to sign in to your project portal.</div>',
    '      <div class="dd-input-wrap"><label class="dd-input-label">Email Address</label><input class="dd-input" type="email" id="ddLoginEmail" placeholder="youremail@email.com" /></div>',
    '      <button class="dd-btn" id="ddLoginBtn">Send Login Link</button>',
    '      <div class="dd-msg" id="ddLoginMsg"></div>',
    '    </div>',
    '  </div>',
    '</div>',
    '<div id="ddDashboard" class="dd-dashboard">',
    '  <div class="dd-install-banner" id="ddInstallBanner">',
    '    <div class="dd-install-text">Add <span>Daydream Portal</span> to your home screen for quick access</div>',
    '    <button class="dd-install-btn" id="ddInstallBtn">Install App</button>',
    '    <button class="dd-install-dismiss" id="ddInstallDismiss">&times;</button>',
    '  </div>',
    '  <nav class="dd-nav"><div class="dd-nav-logo">Daydream</div><div class="dd-nav-right"><span class="dd-nav-user" id="ddNavUser"></span><button class="dd-nav-logout" id="ddLogoutBtn">Sign Out</button></div></nav>',
    '  <div class="dd-tabs">',
    '    <button class="dd-tab active" data-tab="overview">Overview</button>',
    '    <button class="dd-tab" data-tab="uploads">Documents</button>',
    '    <button class="dd-tab" data-tab="messages">Messages</button>',
    '    <button class="dd-tab" data-tab="schedule">Schedule</button>',
    '    <button class="dd-tab" data-tab="drive">Project Files</button>',
    '  </div>',
    '  <div class="dd-content">',

    // OVERVIEW
    '    <div class="dd-tab-content active" id="tab-overview">',
    '      <div class="dd-section-title">Your Project</div>',
    '      <div class="dd-section-sub">Welcome to your Daydream client portal</div>',
    '      <div class="dd-welcome-card"><div class="dd-welcome-text"><h3>Book Your Discovery Call</h3><p>Schedule a consultation with our design team to discuss your vision, timeline and investment in detail.</p></div><a href="' + CONSULT_URL + '" target="_blank" class="dd-cal-btn">Book Consultation</a></div>',
    '      <div class="dd-cards">',
    '        <div class="dd-card"><div class="dd-card-label">Project Status</div><div class="dd-card-value" id="ddStatus">New Inquiry</div></div>',
    '        <div class="dd-card"><div class="dd-card-label">Service</div><div class="dd-card-value" id="ddService" style="font-size:14px">—</div></div>',
    '        <div class="dd-card"><div class="dd-card-label">Member Since</div><div class="dd-card-value" id="ddSince" style="font-size:14px">—</div></div>',
    '      </div>',

    // Contract & Payment Status
    '      <div class="dd-status-grid">',
    '        <div class="dd-status-card">',
    '          <div class="dd-status-label">Contract Status</div>',
    '          <div id="ddContractStatus"><span class="dd-status-badge" style="color:#8a8680;border-color:#8a8680;background:#8a868018">Not Yet Sent</span></div>',
    '        </div>',
    '        <div class="dd-status-card">',
    '          <div class="dd-status-label">Payment Status</div>',
    '          <div id="ddPaymentStatus"><span class="dd-status-badge" style="color:#8a8680;border-color:#8a8680;background:#8a868018">Invoice Not Yet Sent</span></div>',
    '        </div>',
    '      </div>',

    '      <div class="dd-timeline"><div class="dd-timeline-header">Project Timeline</div><div id="ddTimeline"></div></div>',
    '    </div>',

    // UPLOADS
    '    <div class="dd-tab-content" id="tab-uploads">',
    '      <div class="dd-section-title">Document Uploads</div>',
    '      <div class="dd-section-sub">Upload your project documents below. Files are automatically organised into your project folder.</div>',
    '      <div class="dd-upload-grid">',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Survey</div><div class="dd-upload-card-desc">Boundary lines, trees, topography, setbacks</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple data-category="survey" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-survey"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Photos</div><div class="dd-upload-card-desc">Existing site photographs</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".jpg,.jpeg,.png,.heic,.webp" data-category="photos" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-photos"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Videos</div><div class="dd-upload-card-desc">Walkthrough or drone footage</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".mp4,.mov,.avi,.mkv" data-category="videos" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-videos"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Inspiration</div><div class="dd-upload-card-desc">Pinterest boards, AI concepts, reference images</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".jpg,.jpeg,.png,.pdf,.webp" data-category="inspo" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-inspo"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">House Plans</div><div class="dd-upload-card-desc">Architectural plans and drawings</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.png" data-category="houseplans" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-houseplans"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Plans</div><div class="dd-upload-card-desc">Existing site plans and layouts</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.png" data-category="siteplans" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-siteplans"></div></div></div>',
    '      </div>',
    '    </div>',

    // MESSAGES
    '    <div class="dd-tab-content" id="tab-messages">',
    '      <div class="dd-section-title">Messages</div>',
    '      <div class="dd-section-sub">Communicate directly with the Daydream team</div>',
    '      <div class="dd-messages-wrap">',
    '        <div class="dd-messages-header">Project Messages</div>',
    '        <div class="dd-messages-list" id="ddMessagesList"><div class="dd-empty">No messages yet. Send us a message below.</div></div>',
    '        <div class="dd-messages-input"><textarea id="ddMessageInput" placeholder="Type your message..."></textarea><button class="dd-send-btn" id="ddSendBtn">Send</button></div>',
    '      </div>',
    '    </div>',

    // SCHEDULE
    '    <div class="dd-tab-content" id="tab-schedule">',
    '      <div class="dd-section-title">Schedule a Meeting</div>',
    '      <div class="dd-section-sub">Book time with the Daydream team</div>',
    '      <div class="dd-cards">',
    '        <div class="dd-card"><div class="dd-card-label">Discovery Consultation</div><div class="dd-card-sub" style="color:var(--muted);margin-bottom:16px">Initial project discussion and vision alignment</div><a href="' + CONSULT_URL + '" target="_blank" class="dd-cal-btn" style="font-size:9px">Book Consultation</a></div>',
    '        <div class="dd-card"><div class="dd-card-label">Design Revision Meeting</div><div class="dd-card-sub" style="color:var(--muted);margin-bottom:16px">Review designs and discuss feedback and changes</div><a href="' + REVISION_URL + '" target="_blank" class="dd-cal-btn outline" style="font-size:9px">Book Revision Call</a></div>',
    '      </div>',
    '    </div>',

    // DRIVE
    '    <div class="dd-tab-content" id="tab-drive">',
    '      <div class="dd-section-title">Project Files</div>',
    '      <div class="dd-section-sub">Access your shared project folders below</div>',
    '      <div id="ddDriveList"></div>',
    '    </div>',

    '  </div>',
    '</div>'
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var currentUser = null;
  var currentClient = null;
  var currentProject = null;
  var deferredInstallPrompt = null;

  // ── PWA INSTALL PROMPT ────────────────────────────────────────────
  // Android - catches beforeinstallprompt
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallBanner();
  });

  // iOS Safari - show banner manually since beforeinstallprompt doesn't fire
  function isIos() {
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }
  function isInStandaloneMode() {
    return window.navigator.standalone === true;
  }
  function showInstallBanner() {
    var banner = document.getElementById('ddInstallBanner');
    var dismissed = false;
    try { dismissed = sessionStorage.getItem('dd_install_dismissed'); } catch(e) {}
    if (banner && !dismissed) banner.classList.add('visible');
  }
  function checkIosInstall() {
    if (isIos() && !isInStandaloneMode()) {
      var btn = document.getElementById('ddInstallBtn');
      if (btn) {
        btn.textContent = 'How to Install';
        btn.onclick = function() {
          alert('To install: tap the Share button at the bottom of Safari, then tap "Add to Home Screen"');
          document.getElementById('ddInstallBanner').classList.remove('visible');
        };
      }
      showInstallBanner();
    }
  }

  document.getElementById('ddInstallBtn').addEventListener('click', function() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(function() {
        deferredInstallPrompt = null;
        document.getElementById('ddInstallBanner').classList.remove('visible');
      });
    }
  });

  document.getElementById('ddInstallDismiss').addEventListener('click', function() {
    document.getElementById('ddInstallBanner').classList.remove('visible');
    try { sessionStorage.setItem('dd_install_dismissed', '1'); } catch(e) {}
  });

  // ── HELPERS ───────────────────────────────────────────────────────
  function hideLoading() { var el = document.getElementById('ddLoading'); if (el) el.style.display = 'none'; }
  function showLogin() { hideLoading(); document.getElementById('ddLoginWrap').classList.add('visible'); }
  function showDashboard() {
    hideLoading();
    document.getElementById('ddLoginWrap').classList.remove('visible');
    document.getElementById('ddDashboard').classList.add('visible');
    if (currentUser) { var navName = (currentClient && currentClient.full_name) ? currentClient.full_name : currentUser.email; document.getElementById('ddNavUser').textContent = navName; }
    if (deferredInstallPrompt) showInstallBanner(); else checkIosInstall();
  }
  function showMsg(el, text, type) { el.textContent = text; el.className = 'dd-msg visible ' + (type || ''); }
  function formatDate(str) { if (!str) return '—'; return new Date(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); }
  function serviceLabel(key) {
    var map = { '2d_concept': '2D Concept', '3d_concept': '3D Concept', '2d_3d_concept': '2D + 3D Concept', 'permit_plan': 'Permit Plan', '2d_3d_permit': '2D + 3D + Permit' };
    return map[key] || key || '—';
  }
  function apiFetch(path, options) {
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SUPABASE_KEY;
    opts.headers['Authorization'] = 'Bearer ' + (currentUser ? currentUser.access_token : SUPABASE_KEY);
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SUPABASE_URL + path, opts);
  }

  // ── RENDER TIMELINE ───────────────────────────────────────────────
  function renderTimeline(clientStage) {
    var currentIdx = getStageIndex(clientStage || 'inquiry_submitted');
    document.getElementById('ddTimeline').innerHTML = TIMELINE.map(function(stage, idx) {
      var isDone = idx < currentIdx;
      var isActive = idx === currentIdx;
      var dotClass = isDone ? 'done' : (isActive ? 'active' : '');
      var labelClass = (isDone || isActive) ? '' : 'muted';
      var badge = isActive ? '<div class="dd-timeline-badge">In Progress</div>' : (isDone ? '<div class="dd-timeline-badge" style="border-color:var(--success);color:var(--success)">Complete</div>' : '');
      return '<div class="dd-timeline-item"><div class="dd-timeline-dot ' + dotClass + '"></div><div class="dd-timeline-label ' + labelClass + '">' + stage.label + '</div>' + badge + '</div>';
    }).join('');
  }

  // ── RENDER STATUS BADGES ──────────────────────────────────────────
  function renderStatusBadges(client) {
    var contractKey = (client && client.contract_status) || 'not_sent';
    var paymentKey = (client && client.payment_status) || 'not_sent';
    var contract = CONTRACT_LABELS[contractKey] || CONTRACT_LABELS['not_sent'];
    var payment = PAYMENT_LABELS[paymentKey] || PAYMENT_LABELS['not_sent'];

    document.getElementById('ddContractStatus').innerHTML =
      '<span class="dd-status-badge" style="color:' + contract.color + ';border-color:' + contract.color + ';background:' + contract.color + '18">' + contract.label + '</span>';

    document.getElementById('ddPaymentStatus').innerHTML =
      '<span class="dd-status-badge" style="color:' + payment.color + ';border-color:' + payment.color + ';background:' + payment.color + '18">' + payment.label + '</span>';
  }

  // ── RENDER DRIVE LINKS ────────────────────────────────────────────
  function renderDriveLinks(client) {
    var container = document.getElementById('ddDriveList');
    var links = [
      { key: 'drive_design_link',       label: 'Design Folder',       sub: 'Base maps, 3D models, renders and design deliverables' },
      { key: 'drive_permit_link',        label: 'Permit Folder',        sub: 'Permit plans, structural documents and approvals' },
      { key: 'drive_construction_link',  label: 'Construction Folder',  sub: 'Construction documents and site data' }
    ].filter(function(l) { return client && client[l.key]; });

    if (!links.length) {
      container.innerHTML = '<div class="dd-drive-empty">Your project files will appear here once your project is active. We will notify you when files are ready to view.</div>';
      return;
    }

    container.innerHTML = '<div class="dd-drive-list">' + links.map(function(l) {
      return '<div class="dd-drive-item"><div class="dd-drive-item-info"><div class="dd-drive-item-name">' + l.label + '</div><div class="dd-drive-item-sub">' + l.sub + '</div></div><a href="' + client[l.key] + '" target="_blank" class="dd-drive-link">Open Folder</a></div>';
    }).join('') + '</div>';
  }

  // ── TOKEN HANDLING ─────────────────────────────────────────────────
  async function tryTokenFromUrl() {
    var hash = window.location.hash;
    if (!hash) return false;
    var params = new URLSearchParams(hash.replace('#', ''));
    var accessToken = params.get('access_token');
    if (accessToken && accessToken.length > 100) {
      try {
        var res = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + accessToken } });
        var user = await res.json();
        if (user && user.email) {
          currentUser = { access_token: accessToken, email: user.email, id: user.id };
          try { sessionStorage.setItem('dd_token', accessToken); } catch(e) {}
          history.replaceState(null, '', window.location.pathname);
          return true;
        }
      } catch(e) {}
      return false;
    }
    var otpToken = params.get('token');
    var type = params.get('type');
    if (otpToken && type === 'magiclink') {
      try {
        history.replaceState(null, '', window.location.pathname);
        var verifyRes = await fetch(SUPABASE_URL + '/auth/v1/verify', {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: otpToken, type: 'magiclink' })
        });
        var verifyData = await verifyRes.json();
        if (verifyData.access_token) {
          currentUser = { access_token: verifyData.access_token, email: verifyData.user.email, id: verifyData.user.id };
          try { sessionStorage.setItem('dd_token', verifyData.access_token); } catch(e) {}
          return true;
        }
      } catch(e) {}
    }
    return false;
  }

  async function tryTokenFromSession() {
    var token = null;
    try { token = sessionStorage.getItem('dd_token'); } catch(e) {}
    if (!token) return false;
    try {
      var res = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + token } });
      var user = await res.json();
      if (user && user.email) { currentUser = { access_token: token, email: user.email, id: user.id }; return true; }
    } catch(e) {}
    try { sessionStorage.removeItem('dd_token'); } catch(e) {}
    return false;
  }

  // ── LOAD DATA ─────────────────────────────────────────────────────
  async function loadClientData() {
    try {
      var res = await apiFetch('/rest/v1/clients?email=eq.' + encodeURIComponent(currentUser.email) + '&limit=1');
      var data = await res.json();
      if (data && data[0]) {
        currentClient = data[0];
        document.getElementById('ddStatus').textContent = currentClient.status || 'New Inquiry';
        document.getElementById('ddService').textContent = serviceLabel(currentClient.project_type);
        document.getElementById('ddSince').textContent = formatDate(currentClient.created_at);
        renderTimeline(currentClient.client_stage || 'inquiry_submitted');
        renderStatusBadges(currentClient);
        renderDriveLinks(currentClient);
      } else {
        renderTimeline('inquiry_submitted');
        renderStatusBadges(null);
        renderDriveLinks(null);
      }
      var projRes = await apiFetch('/rest/v1/projects?client_id=eq.' + (currentClient ? currentClient.id : 'none') + '&limit=1');
      var projData = await projRes.json();
      if (projData && projData[0]) currentProject = projData[0];
      loadMessages();
    } catch(e) { console.error('Load data error:', e); }
  }

  async function loadMessages() {
    try {
      var url = currentClient
        ? '/rest/v1/messages?client_id=eq.' + currentClient.id + '&order=created_at.asc'
        : '/rest/v1/messages?sender=eq.' + encodeURIComponent(currentUser.email) + '&order=created_at.asc';
      var res = await apiFetch(url);
      var msgs = await res.json();
      var list = document.getElementById('ddMessagesList');
      if (!msgs || !msgs.length) { list.innerHTML = '<div class="dd-empty">No messages yet. Send us a message below.</div>'; return; }
      list.innerHTML = msgs.map(function(m) {
        var isMe = m.sender !== 'daydream_team';
        return '<div class="dd-message ' + (isMe ? 'mine' : 'theirs') + '"><div class="dd-message-bubble">' + m.content + '</div><div class="dd-message-meta">' + (isMe ? 'You' : 'Daydream Team') + ' &middot; ' + formatDate(m.created_at) + '</div></div>';
      }).join('');
      list.scrollTop = list.scrollHeight;
    } catch(e) {}
  }

  // ── INIT ──────────────────────────────────────────────────────────
  async function init() {
    var fromUrl = await tryTokenFromUrl();
    if (fromUrl) { await loadClientData(); showDashboard(); return; }
    var fromSession = await tryTokenFromSession();
    if (fromSession) { await loadClientData(); showDashboard(); return; }
    showLogin();
  }

  init();

  // ── LOGIN ─────────────────────────────────────────────────────────
  document.getElementById('ddLoginBtn').addEventListener('click', async function() {
    var email = document.getElementById('ddLoginEmail').value.trim();
    var msg = document.getElementById('ddLoginMsg');
    if (!email) { showMsg(msg, 'Please enter your email address.', 'error'); return; }
    this.disabled = true;
    this.textContent = 'Sending...';
    try {
      var res = await fetch(SUPABASE_URL + '/auth/v1/magiclink?redirect_to=' + encodeURIComponent(PORTAL_URL), {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });
      showMsg(msg, res.ok ? 'Login link sent! Check your inbox and click the link to access your portal.' : 'Something went wrong. Please try again.', res.ok ? 'success' : 'error');
    } catch(e) { showMsg(msg, 'Something went wrong. Please try again.', 'error'); }
    this.disabled = false;
    this.textContent = 'Send Login Link';
  });

  document.getElementById('ddLoginEmail').addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('ddLoginBtn').click(); });

  // ── LOGOUT ────────────────────────────────────────────────────────
  document.getElementById('ddLogoutBtn').addEventListener('click', function() {
    try { sessionStorage.removeItem('dd_token'); } catch(e) {}
    currentUser = null; currentClient = null; currentProject = null;
    document.getElementById('ddDashboard').classList.remove('visible');
    showLogin();
  });

  // ── TABS ──────────────────────────────────────────────────────────
  document.querySelectorAll('#dd-portal .dd-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-portal .dd-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-portal .dd-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ── FILE UPLOADS ──────────────────────────────────────────────────
  document.querySelectorAll('#dd-portal .dd-file-input').forEach(function(input) {
    input.addEventListener('change', async function() {
      var files = Array.from(this.files);
      var category = this.dataset.category;
      var statusEl = document.getElementById('status-' + category);
      if (!files.length || !currentUser) return;
      statusEl.textContent = 'Uploading ' + files.length + ' file(s)...';
      statusEl.style.color = 'var(--muted)';
      var clientName = (currentClient && currentClient.full_name) ? currentClient.full_name : currentUser.email;
      var uploaded = 0;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var path = clientName + '/' + category + '/' + Date.now() + '_' + file.name;
        try {
          var res = await fetch(SUPABASE_URL + '/storage/v1/object/client-documents/' + path, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + currentUser.access_token, 'Content-Type': file.type },
            body: file
          });
          if (res.ok) {
            uploaded++;
            await apiFetch('/rest/v1/documents', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_id: currentProject ? currentProject.id : null, file_name: file.name, file_url: path, uploaded_by: currentUser.email }) });
          }
        } catch(e) {}
      }
      statusEl.textContent = uploaded === files.length ? uploaded + ' file(s) uploaded successfully' : uploaded + ' of ' + files.length + ' uploaded';
      statusEl.style.color = uploaded === files.length ? 'var(--success)' : 'var(--error)';
    });
  });

  // ── MESSAGES ──────────────────────────────────────────────────────
  document.getElementById('ddSendBtn').addEventListener('click', async function() {
    var input = document.getElementById('ddMessageInput');
    var content = input.value.trim();
    if (!content || !currentUser) return;
    input.value = '';
    try {
      await apiFetch('/rest/v1/messages', {
        method: 'POST',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ project_id: currentProject ? currentProject.id : null, client_id: currentClient ? currentClient.id : null, sender: currentUser.email, content: content, is_read: false })
      });
      await loadMessages();
    } catch(e) {}
  });

  document.getElementById('ddMessageInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.getElementById('ddSendBtn').click(); }
  });

})();
