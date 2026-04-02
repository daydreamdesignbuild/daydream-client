(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var PORTAL_URL   = 'https://daydreamdesignandbuild.com/app/';
  var CONSULT_URL  = 'https://calendar.app.google/ZjpMu7tf98SSMhMX7';
  var REVISION_URL = 'https://calendar.app.google/eBvdjy8mdvgMtRHB6';

  // ── FIX 4: XSS sanitization ──────────────────────────────────────
  function s(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── FIX 3: File validation ────────────────────────────────────────
  var ALLOWED_EXTS = ['jpg','jpeg','png','webp','heic','gif','pdf','mp4','mov','avi','mkv','dwg','dxf','txt','doc','docx'];
  var MAX_FILE_MB  = 5120; // 5GB — covers drone video and large site plans
  function validateFile(file) {
    if (file.size > MAX_FILE_MB * 1024 * 1024) return '"' + file.name + '" is too large (max 5GB)';
    var ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) return '"' + file.name + '" — file type not allowed (' + ext + ')';
    return null;
  }
  function safeName(name) { return name.replace(/[^a-zA-Z0-9._\-]/g, '_'); }

  // Design & Permit Phase Timeline
  // Design & Permit Phase Timeline — per spec
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
    { value: 'final_deliverables',           label: 'Final Deliverables' }
  ];

  // Construction Phase Timeline
  var CONSTRUCTION_TIMELINE = [
    { value: 'not_started',            label: 'Not Started' },
    { value: 'pre_site_visit',         label: 'Pre Site Visit' },
    { value: 'erosion_control',        label: 'Erosion Control / BMP Installed' },
    { value: 'construction_scheduled', label: 'Construction Start Date Scheduled' },
    { value: 'completion_30',          label: '30% Completion' },
    { value: 'completion_60',          label: '60% Completion' },
    { value: 'completion_90',          label: '90% Completion' },
    { value: 'final_walk_through',     label: 'Final Walk Through' },
    { value: 'project_complete',       label: '100% Project Complete' }
  ];

  var CONTRACT_LABELS = {
    'not_sent':   { label: 'Not Yet Sent',              color: '#8a8680' },
    'sent':       { label: 'Sent — Awaiting Signature', color: '#eeb24a' },
    'signed':     { label: 'Signed ✓',                  color: '#6a9e7a' }
  };

  var PAYMENT_LABELS = {
    'not_sent':         { label: 'Invoice Not Yet Sent',           color: '#8a8680' },
    'invoice_sent':     { label: 'Invoice Sent — Awaiting Payment', color: '#eeb24a' },
    'deposit_paid':     { label: 'Deposit Paid — Balance Due',     color: '#5a8e9e' },
    'partially_paid':   { label: 'Partially Paid',                 color: '#7a9e8a' },
    'payment_complete': { label: 'Payment Complete ✓',             color: '#6a9e7a' }
  };

  var PROJECT_TYPE_LABELS = {
    'full_yard': 'Full Yard', 'front_yard': 'Front Yard', 'backyard': 'Backyard',
    'outdoor_living': 'Outdoor Living', 'landscape_construction': 'Landscape Construction',
    'pool_and_spa': 'Pool & Spa', 'custom': 'Custom / Other'
  };

  var CHECKLIST_ITEMS = [
    { key: 'goals',       label: 'Project Goals & Must-Have Features',        desc: 'Tell us the main purpose of the space and any non-negotiable features.', type: 'note', noteKey: 'goals' },
    { key: 'inspo',       label: 'Inspiration Photos or Boards',              desc: 'Upload your Pinterest boards, AI images, Google saves or any reference images.', type: 'upload', category: 'inspo' },
    { key: 'photos',      label: 'Detailed Site Photos & Walkthrough Video',  desc: 'Show the entire project area with straight-on shots of the house.', type: 'upload', category: 'photos' },
    { key: 'survey',      label: 'Property Survey / Site Plat',               desc: 'Crucial for accuracy. Should show topography, property lines and trees.', type: 'upload', category: 'survey' },
    { key: 'bylaws',      label: 'HOA Bylaws & Neighborhood Covenants',       desc: 'All construction rules and regulations.', type: 'upload', category: 'houseplans' },
    { key: 'houseplans',  label: 'Existing House Architectural Plans',        desc: 'If available.', type: 'upload', category: 'houseplans' }
  ];

  function getStageIndex(value) { var i = TIMELINE.findIndex(function(t) { return t.value === value; }); return i === -1 ? 0 : i; }

  // ── FONTS ─────────────────────────────────────────────────────────
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap';
  document.head.appendChild(font);

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
    '#dd-portal .dd-btn { width: 100%; background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: Jost, sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; padding: 16px; cursor: pointer; transition: background 0.3s, color 0.3s; margin-top: 8px; }',
    '#dd-portal .dd-btn:hover { background: var(--gold); color: var(--bg); }',
    '#dd-portal .dd-btn:disabled { opacity: 0.4; cursor: not-allowed; }',
    '#dd-portal .dd-msg { font-size: 11px; text-align: center; padding: 10px; margin-top: 12px; display: none; letter-spacing: 0.05em; line-height: 1.8; }',
    '#dd-portal .dd-msg.visible { display: block; }',
    '#dd-portal .dd-msg.success { color: var(--success); }',
    '#dd-portal .dd-msg.error { color: var(--error); }',
    '#dd-portal .dd-project-selector { display: none; min-height: 100vh; flex-direction: column; }',
    '#dd-portal .dd-project-selector.visible { display: flex; }',
    '#dd-portal .dd-selector-nav { background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 64px; }',
    '#dd-portal .dd-selector-logo { font-family: "Cormorant Garamond", serif; font-size: 22px; font-weight: 400; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; }',
    '#dd-portal .dd-selector-content { flex: 1; padding: 48px 32px; max-width: 800px; width: 100%; margin: 0 auto; }',
    '#dd-portal .dd-selector-title { font-family: "Cormorant Garamond", serif; font-size: 32px; font-weight: 300; color: var(--text); margin-bottom: 6px; }',
    '#dd-portal .dd-selector-sub { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; margin-bottom: 40px; }',
    '#dd-portal .dd-project-cards { display: flex; flex-direction: column; gap: 12px; }',
    '#dd-portal .dd-project-card { background: var(--surface); border: 1px solid var(--border); padding: 24px 28px; cursor: pointer; transition: border-color 0.2s, background 0.2s; display: flex; align-items: center; justify-content: space-between; gap: 20px; }',
    '#dd-portal .dd-project-card:hover { border-color: var(--gold); background: var(--gold-dim); }',
    '#dd-portal .dd-project-card-info { flex: 1; }',
    '#dd-portal .dd-project-card-name { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 400; color: var(--gold); margin-bottom: 4px; }',
    '#dd-portal .dd-project-card-address { font-size: 11px; color: var(--muted); margin-bottom: 8px; }',
    '#dd-portal .dd-project-card-meta { display: flex; gap: 16px; flex-wrap: wrap; }',
    '#dd-portal .dd-project-card-tag { font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--border); padding: 3px 8px; }',
    '#dd-portal .dd-project-card-arrow { font-size: 18px; color: var(--gold); opacity: 0.5; }',
    '#dd-portal .dd-project-card:hover .dd-project-card-arrow { opacity: 1; }',
    '#dd-portal .dd-dashboard { display: none; min-height: 100vh; flex-direction: column; }',
    '#dd-portal .dd-dashboard.visible { display: flex; }',
    '#dd-portal .dd-nav { background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 64px; position: sticky; top: 0; z-index: 100; }',
    '#dd-portal .dd-nav-left { display: flex; align-items: center; gap: 16px; min-width: 0; }',
    '#dd-portal .dd-nav-logo { font-family: "Cormorant Garamond", serif; font-size: 22px; font-weight: 400; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; }',
    '#dd-portal .dd-nav-project-name { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); padding: 4px 12px; border: 1px solid var(--border); display: none; }',
    '#dd-portal .dd-nav-project-name.visible { display: block; }',
    '#dd-portal .dd-nav-right { display: flex; align-items: center; gap: 16px; }',
    '#dd-portal .dd-nav-user { font-size: 11px; color: var(--muted); }',
    '#dd-portal .dd-nav-back { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); cursor: pointer; background: none; border: 1px solid var(--gold); padding: 6px 14px; transition: background 0.2s, color 0.2s; display: none; }',
    '#dd-portal .dd-nav-back:hover { background: var(--gold); color: var(--bg); }',
    '#dd-portal .dd-nav-back.visible { display: block; }',
    '#dd-portal .dd-nav-logout { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); cursor: pointer; background: none; border: none; transition: color 0.2s; }',
    '#dd-portal .dd-nav-logout:hover { color: var(--gold); }',
    '#dd-portal .dd-tabs { background: var(--surface); border-bottom: 1px solid var(--border); display: flex; overflow-x: auto; padding: 0 32px; }',
    '#dd-portal .dd-tab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 16px 20px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; white-space: nowrap; background: none; border-left: none; border-right: none; border-top: none; }',
    '#dd-portal .dd-tab:hover { color: var(--text); }',
    '#dd-portal .dd-tab.active { color: var(--gold); border-bottom-color: var(--gold); }',
    '#dd-portal .dd-tab-badge { display: inline-block; background: var(--gold); color: var(--bg); font-size: 8px; padding: 1px 5px; border-radius: 8px; margin-left: 4px; vertical-align: middle; }',
    '#dd-portal .dd-msg-dot { display: inline-block; background: var(--gold); color: var(--bg); font-size: 8px; font-family: Jost, sans-serif; padding: 1px 5px; border-radius: 8px; margin-left: 4px; vertical-align: middle; min-width: 16px; text-align: center; }',
    '#dd-portal .dd-content { flex: 1; padding: 40px 32px; max-width: 900px; width: 100%; margin: 0 auto; }',
    '#dd-portal .dd-section-title { font-family: "Cormorant Garamond", serif; font-size: 26px; font-weight: 300; color: var(--text); margin-bottom: 6px; }',
    '#dd-portal .dd-section-sub { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; margin-bottom: 32px; }',
    '#dd-portal .dd-welcome-card { border: 1px solid var(--gold); background: var(--gold-dim); padding: 32px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }',
    '#dd-portal .dd-welcome-text h3 { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 400; color: var(--gold); margin-bottom: 8px; }',
    '#dd-portal .dd-welcome-text p { font-size: 12px; color: var(--muted); line-height: 1.8; max-width: 400px; }',
    '#dd-portal .dd-cal-btn { display: inline-block; background: var(--gold); color: var(--bg); text-decoration: none; font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px 28px; font-weight: 500; white-space: nowrap; transition: opacity 0.2s; border: 1px solid var(--gold); cursor: pointer; font-family: Jost, sans-serif; }',
    '#dd-portal .dd-cal-btn:hover { opacity: 0.85; }',
    '#dd-portal .dd-cal-btn.outline { background: transparent; color: var(--gold); }',
    '#dd-portal .dd-cal-btn.outline:hover { background: var(--gold); color: var(--bg); }',
    '#dd-portal .dd-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 32px; }',
    '#dd-portal .dd-card { background: var(--surface); padding: 24px; }',
    '#dd-portal .dd-card-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }',
    '#dd-portal .dd-card-value { font-family: "Cormorant Garamond", serif; font-size: 20px; color: var(--gold); font-weight: 400; }',
    '#dd-portal .dd-card-sub { font-size: 11px; color: var(--muted); margin-top: 4px; }',
    '#dd-portal .dd-status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 32px; }',
    '#dd-portal .dd-status-card { background: var(--surface); padding: 20px 24px; }',
    '#dd-portal .dd-status-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }',
    '#dd-portal .dd-status-badge { font-size: 11px; letter-spacing: 0.08em; padding: 6px 12px; display: inline-block; border: 1px solid; }',
    '#dd-portal .dd-services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1px; background: var(--border); }',
    '#dd-portal .dd-service-tile { background: var(--surface); padding: 20px; display: flex; flex-direction: column; gap: 10px; }',
    '#dd-portal .dd-service-tile-name { font-size: 12px; color: var(--text); font-weight: 400; line-height: 1.4; flex: 1; }',
    '#dd-portal .dd-service-tile-status { display: flex; align-items: center; gap: 6px; }',
    '#dd-portal .dd-service-tile-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }',
    '#dd-portal .dd-service-tile-label { font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }',
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
    '#dd-portal .dd-checklist { border: 1px solid var(--border); background: var(--surface); margin-bottom: 32px; }',
    '#dd-portal .dd-checklist-header { padding: 16px 24px; border-bottom: 1px solid var(--border); background: var(--surface-2); display: flex; align-items: center; justify-content: space-between; }',
    '#dd-portal .dd-checklist-title { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); }',
    '#dd-portal .dd-checklist-progress { font-size: 11px; color: var(--muted); }',
    '#dd-portal .dd-checklist-progress span { color: var(--gold); }',
    '#dd-portal .dd-checklist-item { border-bottom: 1px solid var(--border); overflow: hidden; }',
    '#dd-portal .dd-checklist-item:last-child { border-bottom: none; }',
    '#dd-portal .dd-checklist-row { display: flex; align-items: flex-start; gap: 16px; padding: 18px 24px; cursor: pointer; transition: background 0.2s; }',
    '#dd-portal .dd-checklist-row:hover { background: var(--gold-dim); }',
    '#dd-portal .dd-check-circle { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all 0.2s; }',
    '#dd-portal .dd-check-circle.done { border-color: var(--success); background: var(--success); }',
    '#dd-portal .dd-check-circle.done::after { content: "✓"; font-size: 11px; color: white; font-weight: 600; }',
    '#dd-portal .dd-check-info { flex: 1; }',
    '#dd-portal .dd-check-label { font-size: 13px; color: var(--text); margin-bottom: 3px; font-weight: 400; }',
    '#dd-portal .dd-check-label.done { text-decoration: line-through; color: var(--muted); }',
    '#dd-portal .dd-check-desc { font-size: 11px; color: var(--muted); line-height: 1.6; }',
    '#dd-portal .dd-check-tag { font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; padding: 3px 8px; border: 1px solid var(--border); color: var(--muted); margin-top: 6px; display: inline-block; }',
    '#dd-portal .dd-note-area { padding: 0 24px 20px; display: none; }',
    '#dd-portal .dd-note-area.visible { display: block; }',
    '#dd-portal .dd-note-textarea { width: 100%; background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 14px 16px; resize: vertical; min-height: 100px; outline: none; transition: border-color 0.2s; line-height: 1.7; }',
    '#dd-portal .dd-note-textarea:focus { border-color: var(--gold); }',
    '#dd-portal .dd-note-textarea::placeholder { color: var(--muted); }',
    '#dd-portal .dd-note-save { margin-top: 8px; background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; padding: 10px 24px; cursor: pointer; transition: opacity 0.2s; }',
    '#dd-portal .dd-note-save:hover { opacity: 0.85; }',
    '#dd-portal .dd-checklist-complete { text-align: center; padding: 24px; background: var(--gold-dim); border-top: 1px solid var(--gold); display: none; }',
    '#dd-portal .dd-checklist-complete.visible { display: block; }',
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
    '#dd-portal .dd-msg-del-btn { background: none; border: none; color: var(--muted); font-size: 10px; cursor: pointer; padding: 0 4px; line-height: 1; transition: color 0.2s; vertical-align: middle; }',
    '#dd-portal .dd-msg-del-btn:hover { color: var(--error); }',
    '#dd-portal .dd-message.theirs .dd-message-bubble { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); }',
    '#dd-portal .dd-message-meta { font-size: 9px; color: var(--muted); letter-spacing: 0.1em; }',
    '#dd-portal .dd-message.mine .dd-message-meta { text-align: right; }',
    '#dd-portal .dd-msg-del-btn { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 11px; padding: 0 4px; opacity: 0; transition: opacity 0.2s, color 0.2s; vertical-align: middle; }',
    '#dd-portal .dd-message:hover .dd-msg-del-btn { opacity: 1; }',
    '#dd-portal .dd-msg-del-btn:hover { color: var(--error); }',
    '#dd-portal .dd-msg-del-btn { background: none; border: none; color: var(--muted); font-size: 10px; cursor: pointer; padding: 0 4px; line-height: 1; transition: color 0.2s; vertical-align: middle; opacity: 0.6; }',
    '#dd-portal .dd-msg-del-btn:hover { color: var(--error); opacity: 1; }',
    '#dd-portal .dd-msg-del-btn { background: none; border: none; color: var(--muted); font-size: 10px; cursor: pointer; padding: 0 4px; line-height: 1; transition: color 0.2s; vertical-align: middle; }',
    '#dd-portal .dd-msg-del-btn:hover { color: var(--error); }',
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
    '#dd-portal .dd-create-project { display: none; min-height: 100vh; flex-direction: column; background: var(--bg); }',
    '#dd-portal .dd-create-project.visible { display: flex; }',
    '#dd-portal .dd-create-project-body { flex: 1; padding: 40px 32px; max-width: 860px; width: 100%; margin: 0 auto; }',
    '#dd-portal .dd-create-section { margin-bottom: 32px; }',
    '#dd-portal .dd-create-section-title { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }',
    '#dd-portal .dd-create-section-sub { font-size: 11px; color: var(--muted); margin-bottom: 16px; }',
    '#dd-portal .dd-create-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }',
    '#dd-portal .dd-create-field { display: flex; flex-direction: column; gap: 6px; }',
    '#dd-portal .dd-create-full { grid-column: 1 / -1; }',
    '#dd-portal .dd-create-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); }',
    '#dd-portal .dd-create-input { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; font-weight: 300; padding: 12px 14px; outline: none; width: 100%; transition: border-color 0.2s; appearance: none; }',
    '#dd-portal .dd-create-input:focus { border-color: var(--gold); }',
    '#dd-portal .dd-create-input::placeholder { color: var(--muted); }',
    '#dd-portal .dd-create-textarea { resize: vertical; min-height: 120px; line-height: 1.7; }',
    '#dd-portal .dd-create-msg { font-size: 12px; min-height: 20px; margin-bottom: 12px; }',
    '@keyframes ddFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 600px) {',
    '  #dd-portal .dd-upload-grid { grid-template-columns: 1fr; }',
    '  #dd-portal .dd-nav { padding: 0 16px; height: 56px; }',
    '  #dd-portal .dd-nav-user { display: none; }',
    '  #dd-portal #ddRefreshBtn { display: none; }',
    '  #dd-portal .dd-nav-project-name { display: none !important; }',
    '  #dd-portal .dd-tabs { padding: 0 8px; }',
    '  #dd-portal .dd-content { padding: 24px 16px; }',
    '  #dd-portal .dd-welcome-card { flex-direction: column; }',
    '  #dd-portal .dd-drive-item { flex-direction: column; align-items: flex-start; }',
    '  #dd-portal .dd-status-grid { grid-template-columns: 1fr; }',
    '  #dd-portal .dd-selector-content { padding: 24px 16px; }',
    '  #dd-portal .dd-project-card { flex-direction: column; align-items: flex-start; }',
    '  #dd-portal .dd-create-grid { grid-template-columns: 1fr; }',
    '  #dd-portal .dd-create-project-body { padding: 24px 16px; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-portal');
  if (!wrap) return;

  wrap.innerHTML = [
    '<div id="ddLoading" class="dd-loading">Loading your portal...</div>',

    // LOGIN
    '<div id="ddLoginWrap" class="dd-login-wrap">',
    '  <div class="dd-login-card">',
    '    <div class="dd-login-header"><div class="dd-login-logo">Daydream</div><div class="dd-login-sub">Design + Build &mdash; Atlanta, Georgia</div></div>',
    '    <div class="dd-login-body">',
    '      <div class="dd-login-title">Access Your Portal</div>',
    '      <div class="dd-login-desc">Enter your email address and we will send you a secure one-click link to sign in.</div>',
    '      <div class="dd-input-wrap"><label class="dd-input-label">Email Address</label><input class="dd-input" type="email" id="ddLoginEmail" placeholder="youremail@email.com" /></div>',
    '      <button class="dd-btn" id="ddLoginBtn">Send Login Link</button>',
    '      <div class="dd-msg" id="ddLoginMsg"></div>',
    '    </div>',
    '  </div>',
    '</div>',

    // PROJECT SELECTOR
    '<div id="ddProjectSelector" class="dd-project-selector">',
    '  <nav class="dd-selector-nav">',
    '    <div class="dd-selector-logo">Daydream</div>',
    '    <button class="dd-nav-logout" id="ddSelectorLogout">Sign Out</button>',
    '  </nav>',
    '  <div class="dd-selector-content">',
    '    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">',
    '      <div class="dd-selector-title" id="ddSelectorTitle" style="margin-bottom:0">Your Projects</div>',
    '      <button class="dd-cal-btn" id="ddSelectorNewProjectBtn" onclick="window._showCreateProject()" style="font-size:9px;padding:12px 20px;display:none">+ New Project</button>',
    '    </div>',
    '    <div class="dd-selector-sub" id="ddSelectorSub">Select a project to view its portal</div>',
    '    <div class="dd-project-cards" id="ddProjectCards"></div>',
    '  </div>',
    '</div>',

    // DASHBOARD
    '<div id="ddDashboard" class="dd-dashboard">',
    '  <nav class="dd-nav">',
    '    <div class="dd-nav-left">',
    '      <div class="dd-nav-logo">Daydream</div>',
    '      <div class="dd-nav-project-name" id="ddNavProjectName"></div>',
    '    </div>',
    '    <div class="dd-nav-right">',
    '      <span class="dd-nav-user" id="ddNavUser"></span>',
    '      <button class="dd-nav-logout" id="ddRefreshBtn" title="Refresh project data" style="border:1px solid var(--border);padding:6px 12px;font-size:9px">&#8635; Refresh</button>',
    '      <button class="dd-nav-back" id="ddNavBack">&#8592; All Projects</button>',
    '      <button class="dd-nav-logout" id="ddLogoutBtn">Sign Out</button>',
    '    </div>',
    '  </nav>',
    '  <div class="dd-tabs">',
    '    <button class="dd-tab active" data-tab="overview">Overview</button>',
    '    <button class="dd-tab" data-tab="checklist">Checklist</button>',
    '    <button class="dd-tab" data-tab="uploads">Documents</button>',
    '    <button class="dd-tab" data-tab="messages">Messages</button>',

    '    <button class="dd-tab" data-tab="schedule">Schedule</button>',
    '    <button class="dd-tab" data-tab="drive">Project Files</button>',
    '  </div>',
    '  <div class="dd-content">',

    // OVERVIEW
    '    <div class="dd-tab-content active" id="tab-overview">',
    '      <div class="dd-section-title" id="ddProjectTitle">Your Project</div>',
    '      <div class="dd-section-sub" id="ddProjectAddress">Welcome to your Daydream client portal</div>',
    '      <div class="dd-welcome-card">',
    '        <div class="dd-welcome-text"><h3>Book Your Discovery Call</h3><p>Schedule a consultation with our design team to discuss your vision, timeline and investment.</p></div>',
    '        <div style="display:flex;flex-direction:column;gap:8px">',
    '          <a href="' + CONSULT_URL + '" target="_blank" class="dd-cal-btn">Book Consultation</a>',
    '          <button class="dd-cal-btn outline" id="ddDashNewProjectBtn" onclick="window._showCreateProject()" style="font-size:9px;padding:12px 20px;display:none">+ New Project</button>',
    '        </div>',
    '      </div>',
    '      <div class="dd-cards">',
    '        <div class="dd-card"><div class="dd-card-label">Project Status</div><div class="dd-card-value" id="ddStatus">New Inquiry</div></div>',
    '        <div class="dd-card"><div class="dd-card-label">Project Type</div><div class="dd-card-value" id="ddProjectType" style="font-size:14px">—</div></div>',
    '        <div class="dd-card"><div class="dd-card-label">Member Since</div><div class="dd-card-value" id="ddSince" style="font-size:14px">—</div></div>',
    '      </div>',
    '      <div id="ddContactCard" style="display:none;margin-bottom:32px">',
    '        <div style="border:1px solid var(--border)">',
    '          <div style="padding:16px 24px;border-bottom:1px solid var(--border);background:var(--surface-2);font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold)">Contact Info</div>',
    '          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border)">',
    '            <div style="background:var(--surface);padding:16px 24px"><div style="font-size:8px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Name</div><div style="font-size:13px;color:var(--text)" id="ddContactName">—</div></div>',
    '            <div style="background:var(--surface);padding:16px 24px"><div style="font-size:8px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Email</div><div style="font-size:13px;color:var(--text)" id="ddContactEmail">—</div></div>',
    '            <div style="background:var(--surface);padding:16px 24px"><div style="font-size:8px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Phone</div><div style="font-size:13px;color:var(--text)" id="ddContactPhone">—</div></div>',
    '            <div style="background:var(--surface);padding:16px 24px"><div style="font-size:8px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-bottom:6px">Address</div><div style="font-size:13px;color:var(--text)" id="ddContactAddress">—</div></div>',
    '          </div>',
    '        </div>',
    '      </div>',
    '      <div class="dd-status-grid">',
    '        <div class="dd-status-card"><div class="dd-status-label">Contract Status</div><div id="ddContractStatus"><span class="dd-status-badge" style="color:#8a8680;border-color:#8a8680;background:#8a868018">Not Yet Sent</span></div></div>',
    '        <div class="dd-status-card"><div class="dd-status-label">Payment Status</div><div id="ddPaymentStatus"><span class="dd-status-badge" style="color:#8a8680;border-color:#8a8680;background:#8a868018">Invoice Not Yet Sent</span></div></div>',
    '      </div>',
    '      <div id="ddProjectGoals" style="display:none;margin-bottom:32px">',
    '        <div style="border:1px solid var(--border);">',
    '          <div style="padding:16px 24px;border-bottom:1px solid var(--border);background:var(--surface-2);font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold)">Project Goals &amp; Notes</div>',
    '          <div id="ddProjectGoalsText" style="padding:20px 24px;font-size:13px;line-height:1.9;color:var(--text);white-space:pre-wrap"></div>',
    '        </div>',
    '      </div>',
    '      <div id="ddServicesCard" style="display:none;margin-bottom:32px">',
    '        <div style="border:1px solid var(--border);">',
    '          <div style="padding:16px 24px;border-bottom:1px solid var(--border);background:var(--surface-2);font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold)">Services</div>',
    '          <div id="ddServicesList"></div>',
    '        </div>',
    '      </div>',
    '      <div class="dd-timeline" id="ddDesignTimeline">',
    '        <div class="dd-timeline-header">Design &amp; Permit Phase</div>',
    '        <div id="ddTimeline"></div>',
    '      </div>',
    '      <div id="ddConstructionTimeline" style="margin-top:24px;display:none">',
    '        <div style="font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--success);margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--success)">Construction Phase</div>',
    '        <div class="dd-timeline" style="margin-bottom:0">',
    '          <div id="ddConstructionTimelineItems"></div>',
    '        </div>',
    '      </div>',
    '    </div>',

    // CHECKLIST
    '    <div class="dd-tab-content" id="tab-checklist">',
    '      <div class="dd-section-title">Getting Started</div>',
    '      <div class="dd-section-sub">Complete these items to help us get started on your project.</div>',
    '      <div class="dd-checklist" id="ddChecklist">',
    '        <div class="dd-checklist-header"><div class="dd-checklist-title">Onboarding Checklist</div><div class="dd-checklist-progress"><span id="ddCheckCount">0</span> of ' + CHECKLIST_ITEMS.length + ' complete</div></div>',
    '        <div id="ddChecklistItems"></div>',
    '        <div class="dd-checklist-complete" id="ddChecklistComplete"><p>&#10003; &nbsp; All items complete — thank you! Our team will be in touch shortly.</p></div>',
    '      </div>',
    '    </div>',

    // UPLOADS
    '    <div class="dd-tab-content" id="tab-uploads">',
    '      <div class="dd-section-title">Documents</div>',
    '      <div class="dd-section-sub">Upload your project documents below. Videos up to 5GB supported.</div>',
    '      <div class="dd-upload-grid">',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Survey</div><div class="dd-upload-card-desc">Boundary lines, trees, topography, setbacks</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple data-category="survey" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-survey"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Photos</div><div class="dd-upload-card-desc">Upload here — view in Job Site Photos tab</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".jpg,.jpeg,.png,.heic,.webp" data-category="photos" class="dd-file-input" id="clientSitePhotoInput" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-photos"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Videos</div><div class="dd-upload-card-desc">Walkthrough or drone footage</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".mp4,.mov,.avi,.mkv" data-category="videos" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-videos"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Inspiration</div><div class="dd-upload-card-desc">Pinterest boards, AI images, reference photos</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".jpg,.jpeg,.png,.pdf,.webp" data-category="inspo" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-inspo"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">House Plans & HOA Bylaws</div><div class="dd-upload-card-desc">Architectural plans, drawings, HOA rules</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.png" data-category="houseplans" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-houseplans"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Plans</div><div class="dd-upload-card-desc">Existing site plans and layouts</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.png" data-category="siteplans" class="dd-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click to upload</div></div><div class="dd-upload-status" id="status-siteplans"></div></div></div>',
    '      </div>',
    '    </div>',

    // MESSAGES
    '    <div class="dd-tab-content" id="tab-site-photos">',
    '      <div class="dd-section-title">Job Site Photos</div>',
    '      <div class="dd-section-sub">Photos from your project site, grouped by visit date.</div>',
    '      <div id="ddSitePhotosList"><div class="dd-empty">Loading photos...</div></div>',
    '    </div>',

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
    '        <div class="dd-card"><div class="dd-card-label">Discovery Consultation</div><div class="dd-card-sub" style="color:var(--muted);margin-bottom:16px">Initial project discussion</div><a href="' + CONSULT_URL + '" target="_blank" class="dd-cal-btn" style="font-size:9px">Book Consultation</a></div>',
    '        <div class="dd-card"><div class="dd-card-label">Design Revision Meeting</div><div class="dd-card-sub" style="color:var(--muted);margin-bottom:16px">Review and discuss design changes</div><a href="' + REVISION_URL + '" target="_blank" class="dd-cal-btn outline" style="font-size:9px">Book Revision Call</a></div>',
    '      </div>',
    '    </div>',

    // PROJECT FILES
    '    <div class="dd-tab-content" id="tab-drive">',
    '      <div class="dd-section-title">Project Files</div>',
    '      <div class="dd-section-sub">Access your shared project folders</div>',
    '      <div id="ddDriveList"></div>',
    '    </div>',

    '  </div>',
    '</div>',

    // CREATE PROJECT PANEL
    '<div id="ddCreateProject" class="dd-create-project">',
    '  <nav class="dd-nav">',
    '    <div class="dd-nav-left"><div class="dd-nav-logo">Daydream</div></div>',
    '    <div class="dd-nav-right"><button class="dd-nav-logout" onclick="window._hideCreateProject()">&#8592; Back to Projects</button></div>',
    '  </nav>',
    '  <div class="dd-create-project-body">',
    '    <div class="dd-section-title">Create New Project</div>',
    '    <div class="dd-section-sub">Fill in the details below. Required fields are marked *.</div>',

    '    <div class="dd-create-section">',
    '      <div class="dd-create-section-title">Project Details</div>',
    '      <div class="dd-create-grid">',

    '        <div class="dd-create-field dd-create-full">',
    '          <div class="dd-create-label">Project Address *</div>',
    '          <input class="dd-create-input" id="cpAddress" type="text" placeholder="123 Main St, Atlanta GA" />',
    '        </div>',

    '        <div class="dd-create-field dd-create-full">',
    '          <div class="dd-create-label">Client Name *</div>',
    '          <input class="dd-create-input" id="cpClientName" type="text" placeholder="Full name on the project" />',
    '        </div>',

    '        <div class="dd-create-field">',
    '          <div class="dd-create-label">Project Name *</div>',
    '          <input class="dd-create-input" id="cpName" type="text" placeholder="e.g. Backyard Renovation" />',
    '        </div>',

    '        <div class="dd-create-field">',
    '          <div class="dd-create-label">Project Type</div>',
    '          <select class="dd-create-input" id="cpType">',
    '            <option value="">Select type...</option>',
    '            <option value="full_yard">Full Yard</option>',
    '            <option value="front_yard">Front Yard</option>',
    '            <option value="backyard">Backyard</option>',
    '            <option value="outdoor_living">Outdoor Living</option>',
    '            <option value="landscape_construction">Landscape Construction</option>',
    '            <option value="pool_and_spa">Pool &amp; Spa</option>',
    '            <option value="custom">Custom / Other</option>',
    '          </select>',
    '        </div>',

    '        <div class="dd-create-field dd-create-full">',
    '          <div class="dd-create-label">Anything Else We Need to Know?</div>',
    '          <textarea class="dd-create-input dd-create-textarea" id="cpAnything" style="min-height:80px" placeholder="Any constraints, HOA rules, access details, or important context..."></textarea>',
    '        </div>',

    '        <div class="dd-create-field dd-create-full">',
    '          <div class="dd-create-label">Goals and Notes</div>',
    '          <textarea class="dd-create-input dd-create-textarea" id="cpGoals" placeholder="Project goals, must-have features, vision, and priorities..."></textarea>',
    '        </div>',

    '        <div class="dd-create-field dd-create-full">',
    '          <div class="dd-create-label">What Level of Investment Are You Preparing for This Project? *</div>',
    '          <input class="dd-create-input" id="cpBudget" type="text" placeholder="e.g. $75,000 or $100k–$150k" />',
    '        </div>',

    '      </div>',
    '    </div>',

    '    <div class="dd-create-section">',
    '      <div class="dd-create-section-title">File Uploads <span style="font-size:9px;color:var(--muted);letter-spacing:0.1em;text-transform:none;font-weight:300">— Optional</span></div>',
    '      <div class="dd-create-section-sub">You can upload more files after the project is created. Videos up to 5GB supported.</div>',
    '      <div class="dd-upload-grid">',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Survey</div><div class="dd-upload-card-desc">Boundary, topography, setbacks</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple data-category="survey" class="dd-cp-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click</div></div><div class="dd-upload-status" id="cp-status-survey"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Site Photos & Videos</div><div class="dd-upload-card-desc">Current site conditions</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".jpg,.jpeg,.png,.mp4,.mov,.heic" data-category="photos" class="dd-cp-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click</div></div><div class="dd-upload-status" id="cp-status-photos"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Existing Plans</div><div class="dd-upload-card-desc">Architectural drawings, house plans</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.png" data-category="houseplans" class="dd-cp-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click</div></div><div class="dd-upload-status" id="cp-status-houseplans"></div></div></div>',
    '        <div class="dd-upload-card"><div class="dd-upload-card-header"><div class="dd-upload-card-title">Inspiration</div><div class="dd-upload-card-desc">Pinterest, AI images, references</div></div><div class="dd-upload-card-body"><div class="dd-drop-zone"><input type="file" multiple accept=".jpg,.jpeg,.png,.pdf,.webp" data-category="inspo" class="dd-cp-file-input" /><div class="dd-drop-icon">&#8679;</div><div class="dd-drop-text">Drop files or click</div></div><div class="dd-upload-status" id="cp-status-inspo"></div></div></div>',
    '      </div>',
    '    </div>',

    '    <div id="cpSuccessMsg" style="display:none;background:var(--gold-dim);border:1px solid var(--gold);padding:24px;text-align:center;margin-bottom:24px">',
    '      <div style="font-size:20px;color:var(--gold);margin-bottom:8px">&#10003; Project Created Successfully!</div>',
    '      <div style="font-size:13px;color:var(--muted)">Your project has been saved. Redirecting to your project list...</div>',
    '    </div>',
    '    <div class="dd-create-msg" id="cpMsg"></div>',
    '    <button class="dd-btn" id="cpSubmit" onclick="window._submitCreateProject()">Create Project</button>',
    '    <div style="height:60px"></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var currentUser    = null;
  var currentClient  = null;
  var allClientProjects = [];
  var currentProject = null;
  var isContractor   = false;
  var checklistState = {};
  var notesState     = {};

  // ── HELPERS ───────────────────────────────────────────────────────
  function hideLoading() { var el = document.getElementById('ddLoading'); if (el) el.style.display = 'none'; }
  function showLogin()   { hideLoading(); document.getElementById('ddLoginWrap').classList.add('visible'); }

  function showProjectSelector() {
    hideLoading();
    document.getElementById('ddLoginWrap').classList.remove('visible');
    document.getElementById('ddDashboard').classList.remove('visible');
    document.getElementById('ddCreateProject').classList.remove('visible');
    document.getElementById('ddProjectSelector').classList.add('visible');
    // Only show New Project button for contractors
    var selectorBtn = document.getElementById('ddSelectorNewProjectBtn');
    if (selectorBtn) selectorBtn.style.display = isContractor ? 'block' : 'none';
  }

  function showDashboard() {
    hideLoading();
    document.getElementById('ddLoginWrap').classList.remove('visible');
    document.getElementById('ddProjectSelector').classList.remove('visible');
    document.getElementById('ddCreateProject').classList.remove('visible');
    document.getElementById('ddDashboard').classList.add('visible');
    // Start live WebSocket subscriptions
    startRealtime();
    var backBtn = document.getElementById('ddNavBack');
    if (isContractor && backBtn) backBtn.classList.add('visible');
    // Only show New Project button for contractors
    var dashBtn = document.getElementById('ddDashNewProjectBtn');
    if (dashBtn) dashBtn.style.display = isContractor ? 'block' : 'none';
    var navUser = document.getElementById('ddNavUser');
    if (navUser) navUser.textContent = currentClient ? (currentClient.full_name || currentUser.email) : currentUser.email;
    var navProject = document.getElementById('ddNavProjectName');
    if (navProject && isContractor && allClientProjects.length > 1) {
      navProject.textContent = currentClient ? (currentClient.full_name || '') : '';
      navProject.classList.add('visible');
    }
  }

  function showMsg(el, text, type) { el.textContent = text; el.className = 'dd-msg visible ' + (type || ''); }
  function formatDate(str) { if (!str) return '—'; return new Date(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); }
  function serviceLabel(key) { return key || '—'; }

  function apiFetch(path, options) {
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SUPABASE_KEY;
    opts.headers['Authorization'] = 'Bearer ' + (currentUser ? currentUser.access_token : SUPABASE_KEY);
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SUPABASE_URL + path, opts);
  }

  // ── RENDER ────────────────────────────────────────────────────────
  function renderTimeline(clientStage, constructionStage) {
    // Design & Permit timeline
    var currentIdx = getStageIndex(clientStage || 'inquiry_submitted');
    document.getElementById('ddTimeline').innerHTML = TIMELINE.map(function(stage, idx) {
      var isDone = idx < currentIdx, isActive = idx === currentIdx;
      var dotClass = isDone ? 'done' : (isActive ? 'active' : '');
      var labelClass = (isDone || isActive) ? '' : 'muted';
      var badge = isActive ? '<div class="dd-timeline-badge">In Progress</div>' : (isDone ? '<div class="dd-timeline-badge" style="border-color:var(--success);color:var(--success)">Complete</div>' : '');
      return '<div class="dd-timeline-item"><div class="dd-timeline-dot ' + dotClass + '"></div><div class="dd-timeline-label ' + labelClass + '">' + s(stage.label) + '</div>' + badge + '</div>';
    }).join('');

    // Construction timeline — only show if construction has started
    var conTimeline = document.getElementById('ddConstructionTimeline');
    var conItems = document.getElementById('ddConstructionTimelineItems');
    if (!conTimeline || !conItems) return;
    if (constructionStage && constructionStage !== 'not_started') {
      conTimeline.style.display = 'block';
      var conIdx = CONSTRUCTION_TIMELINE.findIndex(function(t) { return t.value === constructionStage; });
      if (conIdx === -1) conIdx = 0;
      conItems.innerHTML = CONSTRUCTION_TIMELINE.map(function(stage, idx) {
        var isDone = idx < conIdx, isActive = idx === conIdx;
        var dotClass = isDone ? 'done' : (isActive ? 'active' : '');
        var labelClass = (isDone || isActive) ? '' : 'muted';
        var badge = isActive ? '<div class="dd-timeline-badge" style="border-color:var(--success);color:var(--success)">In Progress</div>' : (isDone ? '<div class="dd-timeline-badge" style="border-color:var(--success);color:var(--success)">Complete</div>' : '');
        return '<div class="dd-timeline-item"><div class="dd-timeline-dot ' + (isDone ? 'done' : (isActive ? 'active' : '')) + '" style="' + (isDone || isActive ? 'background:var(--success)' : '') + '"></div><div class="dd-timeline-label ' + labelClass + '">' + s(stage.label) + '</div>' + badge + '</div>';
      }).join('');
    } else {
      conTimeline.style.display = 'none';
    }
  }

  function renderStatusBadges(client) {
    var ck = (client && client.contract_status) || 'not_sent';
    var pk = (client && client.payment_status) || 'not_sent';
    var contract = CONTRACT_LABELS[ck] || CONTRACT_LABELS['not_sent'];
    var payment  = PAYMENT_LABELS[pk] || PAYMENT_LABELS['not_sent'];
    document.getElementById('ddContractStatus').innerHTML = '<span class="dd-status-badge" style="color:' + contract.color + ';border-color:' + contract.color + ';background:' + contract.color + '18">' + s(contract.label) + '</span>';
    document.getElementById('ddPaymentStatus').innerHTML  = '<span class="dd-status-badge" style="color:' + payment.color + ';border-color:' + payment.color + ';background:' + payment.color + '18">' + s(payment.label) + '</span>';
  }

  function renderDriveLinks(client) {
    var container = document.getElementById('ddDriveList');
    var links = [
      { key: 'drive_design_link',       label: 'Design Folder',       sub: 'Base maps, 3D models, renders and design deliverables' },
      { key: 'drive_permit_link',        label: 'Permit Folder',        sub: 'Permit plans, structural documents and approvals' },
      { key: 'drive_construction_link',  label: 'Construction Folder',  sub: 'Construction documents and site data' }
    ].filter(function(l) { return client && client[l.key]; });
    if (!links.length) { container.innerHTML = '<div class="dd-drive-empty">Your project files will appear here once your project is active.</div>'; return; }
    container.innerHTML = '<div class="dd-drive-list">' + links.map(function(l) {
      return '<div class="dd-drive-item"><div class="dd-drive-item-info"><div class="dd-drive-item-name">' + s(l.label) + '</div><div class="dd-drive-item-sub">' + s(l.sub) + '</div></div><a href="' + s(client[l.key]) + '" target="_blank" class="dd-drive-link">Open Folder</a></div>';
    }).join('') + '</div>';
  }

  function renderServices(services) {
    var card = document.getElementById('ddServicesCard');
    var list = document.getElementById('ddServicesList');
    if (!card || !list) return;
    if (!services || !services.length) { card.style.display = 'none'; return; }
    card.style.display = 'block';
    var STATUS_COLORS = { 'pending': '#8a8680', 'in_progress': '#eeb24a', 'complete': '#6a9e7a' };
    var STATUS_LABELS = { 'pending': 'Pending', 'in_progress': 'In Progress', 'complete': 'Complete' };
    list.innerHTML = '<div class="dd-services-grid">' + services.map(function(sv) {
      var color = STATUS_COLORS[sv.status] || '#8a8680';
      return '<div class="dd-service-tile"><div class="dd-service-tile-name">' + s(sv.service_name) + '</div><div class="dd-service-tile-status"><div class="dd-service-tile-dot" style="background:' + color + '"></div><div class="dd-service-tile-label" style="color:' + color + '">' + s(STATUS_LABELS[sv.status] || sv.status) + '</div></div></div>';
    }).join('') + '</div>';
  }

  function renderChecklist() {
    var container = document.getElementById('ddChecklistItems');
    var doneCount = 0;
    container.innerHTML = CHECKLIST_ITEMS.map(function(item) {
      var isDone = checklistState[item.key] === true;
      if (isDone) doneCount++;
      var noteContent = s(notesState[item.key] || '');
      var noteArea = item.type === 'note'
        ? '<div class="dd-note-area" id="note-area-' + item.key + '"><textarea class="dd-note-textarea" id="note-' + item.key + '" placeholder="Share your project goals...">' + noteContent + '</textarea><button class="dd-note-save" onclick="window._saveNote(\'' + item.key + '\')">Save</button></div>'
        : '';
      return '<div class="dd-checklist-item"><div class="dd-checklist-row" onclick="window._toggleCheckItem(\'' + item.key + '\')"><div class="dd-check-circle' + (isDone ? ' done' : '') + '" id="check-circle-' + item.key + '"></div><div class="dd-check-info"><div class="dd-check-label' + (isDone ? ' done' : '') + '" id="check-label-' + item.key + '">' + s(item.label) + '</div><div class="dd-check-desc">' + s(item.desc) + '</div>' + (item.type === 'upload' ? '<div class="dd-check-tag">Upload in Documents tab</div>' : '<div class="dd-check-tag">Fill in below</div>') + '</div></div>' + noteArea + '</div>';
    }).join('');
    document.getElementById('ddCheckCount').textContent = doneCount;
    if (doneCount === CHECKLIST_ITEMS.length) document.getElementById('ddChecklistComplete').classList.add('visible');
    else document.getElementById('ddChecklistComplete').classList.remove('visible');
    CHECKLIST_ITEMS.forEach(function(item) {
      if (item.type === 'note') { var area = document.getElementById('note-area-' + item.key); if (area) area.classList.add('visible'); }
    });
    var remaining = CHECKLIST_ITEMS.length - doneCount;
    var tab = document.querySelector('[data-tab="checklist"]');
    if (tab) { var badge = tab.querySelector('.dd-tab-badge'); if (remaining > 0) { if (!badge) { badge = document.createElement('span'); badge.className = 'dd-tab-badge'; tab.appendChild(badge); } badge.textContent = remaining; } else if (badge) badge.remove(); }
  }

  // ── PROJECT SELECTOR ──────────────────────────────────────────────
  async function loadContractorProjects() {
    try {
      // FIX: case-insensitive email lookup
      var res = await apiFetch('/rest/v1/clients?email=ilike.' + encodeURIComponent(currentUser.email.toLowerCase()) + '&order=created_at.desc');
      var clients = await res.json() || [];
      allClientProjects = clients;

      if (!allClientProjects.length) {
        document.getElementById('ddProjectCards').innerHTML = '<div class="dd-empty" style="padding:40px 0">No active projects yet. Your Daydream team will set these up for you.</div>';
        showProjectSelector(); return;
      }

      // Also load from projects table
      var allProjects = [];
      for (var i = 0; i < allClientProjects.length; i++) {
        try {
          var pRes = await apiFetch('/rest/v1/projects?client_id=eq.' + allClientProjects[i].id + '&order=created_at.desc');
          var projs = await pRes.json() || [];
          projs.forEach(function(p) { p._clientRecord = allClientProjects[i]; p._isProjectRecord = true; allProjects.push(p); });
        } catch(e) { console.error('Load projects for client:', e); }
      }

      if (allClientProjects.length === 1 && !isContractor && !allProjects.length) {
        await loadProjectDashboard(allClientProjects[0]); return;
      }

      var name = allClientProjects[0].full_name || currentUser.email;
      var company = allClientProjects[0].company_name;
      document.getElementById('ddSelectorTitle').textContent = company ? company : name + '\'s Projects';
      document.getElementById('ddSelectorSub').textContent = 'Select a project to view its full portal';

      var cards = '';
      allProjects.forEach(function(p) {
        var typeLabel = PROJECT_TYPE_LABELS[p.project_type] || p.project_type || '—';
        cards += '<div class="dd-project-card" onclick="window._selectProjectRecord(\'' + p.id + '\')">'
          + '<div class="dd-project-card-info"><div class="dd-project-card-name">' + s(p.project_name || 'Project') + '</div>'
          + (p.project_address ? '<div class="dd-project-card-address">&#128205; ' + s(p.project_address) + '</div>' : '')
          + '<div class="dd-project-card-meta"><div class="dd-project-card-tag">' + s(typeLabel) + '</div>' + (p.status ? '<div class="dd-project-card-tag">' + s(p.status) + '</div>' : '') + '</div></div>'
          + '<div class="dd-project-card-arrow">&#8594;</div></div>';
      });
      allClientProjects.forEach(function(c) {
        var address = [c.street, c.city, c.state].filter(Boolean).join(', ') || '';
        cards += '<div class="dd-project-card" onclick="window._selectProject(\'' + c.id + '\')">'
          + '<div class="dd-project-card-info"><div class="dd-project-card-name">' + s(c.full_name || 'Project') + '</div>'
          + (address ? '<div class="dd-project-card-address">&#128205; ' + s(address) + '</div>' : '')
          + '<div class="dd-project-card-meta"><div class="dd-project-card-tag">' + s(serviceLabel(c.project_type)) + '</div>' + (c.investment ? '<div class="dd-project-card-tag">' + s(c.investment) + '</div>' : '') + '</div></div>'
          + '<div class="dd-project-card-arrow">&#8594;</div></div>';
      });

      document.getElementById('ddProjectCards').innerHTML = cards || '<div class="dd-empty" style="padding:40px 0">No projects found.</div>';
      showProjectSelector();
    } catch(e) { console.error('loadContractorProjects:', e); showLogin(); }
  }

  window._selectProject = async function(clientId) {
    var client = allClientProjects.find(function(c) { return c.id === clientId; });
    if (!client) return;
    await loadProjectDashboard(client);
  };

  window._selectProjectRecord = async function(projectId) {
    try {
      var res = await fetch(SUPABASE_URL + '/rest/v1/projects?id=eq.' + projectId + '&select=*,clients(*)', {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + (currentUser.access_token || SUPABASE_KEY) }
      });
      var data = await res.json() || [];
      if (data[0]) {
        var proj = data[0];
        var client = proj.clients;
        var merged = Object.assign({}, client, {
          full_name: proj.project_name || client.full_name,
          street: proj.project_address || client.street,
          project_type_category: proj.project_type,
          drive_design_link: proj.drive_design_link || client.drive_design_link,
          drive_permit_link: proj.drive_permit_link || client.drive_permit_link,
          drive_construction_link: proj.drive_construction_link || client.drive_construction_link,
          _projectId: proj.id
        });
        currentProject = proj;
        await loadProjectDashboard(merged);
      }
    } catch(e) { console.error('_selectProjectRecord:', e); }
  };

  document.getElementById('ddNavBack').addEventListener('click', function() {
    stopRealtime(); // Stop subscriptions for this project before switching
    document.querySelectorAll('#dd-portal .dd-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('#dd-portal .dd-tab-content').forEach(function(c) { c.classList.remove('active'); });
    document.querySelector('[data-tab="overview"]').classList.add('active');
    document.getElementById('tab-overview').classList.add('active');
    document.getElementById('ddDashboard').classList.remove('visible');
    showProjectSelector();
  });

  // ── LOAD PROJECT DASHBOARD ────────────────────────────────────────
  async function loadProjectDashboard(client) {
    currentClient = client;
    try {
      // Always fetch fresh data to reflect admin changes
      var freshRes = await apiFetch('/rest/v1/clients?id=eq.' + client.id);
      var freshData = await freshRes.json() || [];
      if (freshData[0]) {
        // Preserve project-specific overrides from projects table (name, address, drive links)
        client = Object.assign({}, freshData[0], {
          _projectId: client._projectId,
          _projectGoals: client._projectGoals,
          // Always use fresh construction_stage from database
          construction_stage: freshData[0].construction_stage || client.construction_stage,
          // Keep project-table values if they were set
          full_name: client._projectId ? client.full_name : (freshData[0].full_name || client.full_name),
          street: client._projectId ? client.street : (freshData[0].street || client.street),
          drive_design_link: client._projectId ? (client.drive_design_link || freshData[0].drive_design_link) : freshData[0].drive_design_link,
          drive_permit_link: client._projectId ? (client.drive_permit_link || freshData[0].drive_permit_link) : freshData[0].drive_permit_link,
          drive_construction_link: client._projectId ? (client.drive_construction_link || freshData[0].drive_construction_link) : freshData[0].drive_construction_link
        });
        currentClient = client;
        var idx = allClientProjects.findIndex(function(c) { return c.id === client.id; });
        if (idx > -1) allClientProjects[idx] = client;
      }
    } catch(e) { console.error('Fresh client fetch:', e); }

    try {
      var title = document.getElementById('ddProjectTitle');
      var addrEl = document.getElementById('ddProjectAddress');
      if (title) title.textContent = client.full_name || 'Your Project';
      if (addrEl) { var addr = [client.street, client.city, client.state].filter(Boolean).join(', '); addrEl.textContent = addr || 'Welcome to your Daydream client portal'; }
      // Map raw DB pipeline key to human-readable label
      var PIPELINE_LABELS = {
        'client_inquiry_made': 'New Inquiry', 'client_qualified': 'Qualified',
        'discovery_call_booked': 'Discovery Call Booked', 'discovery_call_completed': 'Discovery Call Complete',
        'design_proposal_drafting': 'Proposal Drafting', 'design_proposal_presented': 'Proposal Presented',
        'design_proposal_accepted': 'Proposal Accepted', 'site_consultation_scheduled': 'Site Consultation Scheduled',
        'site_consultation_completed': 'Site Consultation Complete', 'design_phase_started': 'Design Phase Started',
        'base_map_complete': 'Base Map Complete', 'base_map_discussion_call': 'Base Map Discussion',
        'base_map_approved': 'Base Map Approved', '3d_model_completed': '3D Model Complete',
        '3d_model_discussion_call': '3D Model Discussion', '3d_model_approved': '3D Model Approved',
        'visualizations_started': 'Visualizations Started', 'visualizations_completed': 'Visualizations Complete',
        'visualizations_approved': 'Visualizations Approved',
        'construction_document_phase_started': 'Construction Documents Started',
        'construction_document_phase_complete': 'Construction Documents Complete',
        'permit_plans_submitted': 'Permit Plans Submitted', 'permit_plan_revisions': 'Permit Plan Revisions',
        'permit_plans_approved': 'Permit Plans Approved', 'construction_started': 'Construction Started',
        'construction_finished': 'Construction Finished', 'site_photos_to_be_made': 'Site Photos Pending',
        'site_photos_finished': 'Site Photos Complete', 'project_complete': 'Project Complete'
      };
      var statusEl = document.getElementById('ddStatus');
      if (statusEl) statusEl.textContent = PIPELINE_LABELS[client.status] || client.status || 'New Inquiry';
      document.getElementById('ddSince').textContent = formatDate(client.created_at);
      // Populate contact info card
      var contactCard = document.getElementById('ddContactCard');
      var cName  = document.getElementById('ddContactName');
      var cEmail = document.getElementById('ddContactEmail');
      var cPhone = document.getElementById('ddContactPhone');
      var cAddr  = document.getElementById('ddContactAddress');
      if (contactCard && (client.full_name || client.email || client.phone)) {
        if (cName)  cName.textContent  = client.full_name || '—';
        if (cEmail) cEmail.textContent = client.email     || '—';
        if (cPhone) cPhone.textContent = client.phone     || '—';
        if (cAddr)  cAddr.textContent  = [client.street, client.city, client.state, client.zip].filter(Boolean).join(', ') || '—';
        contactCard.style.display = 'block';
      }
      var ptEl = document.getElementById('ddProjectType');
      if (ptEl) ptEl.textContent = PROJECT_TYPE_LABELS[client.project_type_category] || client.project_type_category || '—';
      renderTimeline(client.client_stage || 'inquiry_submitted', client.construction_stage);
      renderStatusBadges(client);
      renderDriveLinks(client);
      // Show project goals/description if set
      var goalsCard = document.getElementById('ddProjectGoals');
      var goalsText = document.getElementById('ddProjectGoalsText');
      var projectDesc = (currentProject && currentProject.description) || client._projectGoals || '';
      if (goalsCard && goalsText) {
        if (projectDesc) {
          goalsText.textContent = projectDesc;
          goalsCard.style.display = 'block';
        } else {
          goalsCard.style.display = 'none';
        }
      }
      try {
        var svcRes = await apiFetch('/rest/v1/client_services?client_id=eq.' + client.id + '&order=created_at.asc');
        renderServices(await svcRes.json() || []);
      } catch(e) { console.error('Load services:', e); }
      await loadChecklistData();
      var projRes = await apiFetch('/rest/v1/projects?client_id=eq.' + client.id + '&limit=1');
      var projData = await projRes.json() || [];
      if (projData[0]) currentProject = projData[0];
      loadMessages();
      showDashboard();
    } catch(e) { console.error('loadProjectDashboard:', e); }
  }

  async function loadChecklistData() {
    if (!currentClient) return;
    try {
      var [checkRes, noteRes] = await Promise.all([
        apiFetch('/rest/v1/checklist_items?client_id=eq.' + currentClient.id),
        apiFetch('/rest/v1/client_notes?client_id=eq.' + currentClient.id)
      ]);
      var checks = await checkRes.json() || [];
      var notes  = await noteRes.json() || [];
      checklistState = {}; notesState = {};
      checks.forEach(function(c) { checklistState[c.item_key] = c.completed; });
      notes.forEach(function(n)  { notesState[n.note_key] = n.content; });
      renderChecklist();
    } catch(e) { renderChecklist(); }
  }

  async function loadMessages() {
    try {
      var url = '/rest/v1/messages?client_id=eq.' + (currentClient ? currentClient.id : '') + '&order=created_at.asc';
      var res = await apiFetch(url);
      var msgs = await res.json() || [];
      var list = document.getElementById('ddMessagesList');
      if (!msgs.length) { list.innerHTML = '<div class="dd-empty">No messages yet. Send us a message below.</div>'; return; }
      list.innerHTML = msgs.map(function(m) {
        var isMe = m.sender !== 'daydream_team';
        var deleteBtn = isMe ? '<button onclick="window._deleteMessage(\'' + m.id + '\')" class="dd-msg-del-btn" title="Delete this message">&#10005;</button>' : '';
        return '<div class="dd-message ' + (isMe ? 'mine' : 'theirs') + '" id="msg-' + m.id + '">'
          + '<div class="dd-message-bubble">' + s(m.content) + (isMe ? '<span style="margin-left:8px">' + deleteBtn + '</span>' : '') + '</div>'
          + '<div class="dd-message-meta">' + (isMe ? 'You' : 'Daydream Team') + ' &middot; ' + formatDate(m.created_at) + '</div>'
          + '</div>';
      }).join('');
      list.scrollTop = list.scrollHeight;
      var lastRead = 0;
      try { lastRead = parseInt(sessionStorage.getItem('dd_msgs_last_read') || '0'); } catch(e) {}
      var unread = msgs.filter(function(m) { return m.sender === 'daydream_team' && new Date(m.created_at).getTime() > lastRead; }).length;
      var tab = document.querySelector('[data-tab="messages"]');
      if (tab) { var dot = tab.querySelector('.dd-msg-dot'); if (unread > 0) { if (!dot) { dot = document.createElement('span'); dot.className = 'dd-msg-dot'; tab.appendChild(dot); } dot.textContent = unread; } else if (dot) dot.remove(); }
    } catch(e) { console.error('loadMessages:', e); }
  }

  // ── TOKEN HANDLING ─────────────────────────────────────────────────
  async function tryTokenFromUrl() {
    // Check both hash fragment (#access_token=) and query params (?access_token=)
    // Supabase delivers the token in the hash after verifying the magic link
    var hash   = window.location.hash   || '';
    var search = window.location.search || '';
    var hashParams  = new URLSearchParams(hash.replace('#', ''));
    var queryParams = new URLSearchParams(search.replace('?', ''));
    var accessToken = hashParams.get('access_token') || queryParams.get('access_token');

    // Also handle Supabase PKCE flow — token_hash in query params
    var tokenHash = queryParams.get('token_hash') || queryParams.get('token');
    var tokenType = queryParams.get('type');

    // If we have a token_hash (confirmation flow), exchange it for a session
    if (tokenHash && tokenType) {
      try {
        var verifyRes = await fetch(SUPABASE_URL + '/auth/v1/verify', {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ token_hash: tokenHash, type: tokenType })
        });
        var verifyData = await verifyRes.json();
        if (verifyData.access_token) {
          accessToken = verifyData.access_token;
        }
      } catch(e) { console.error('tryTokenFromUrl verify:', e); }
    }

    if (accessToken && accessToken.length > 20) {
      try {
        var res = await fetch(SUPABASE_URL + '/auth/v1/user', {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + accessToken }
        });
        var user = await res.json();
        if (user && user.email) {
          currentUser = { access_token: accessToken, email: user.email, id: user.id };
          try { sessionStorage.setItem('dd_token', accessToken); } catch(e) {}
          // Clean URL — remove token params
          history.replaceState(null, '', window.location.pathname);
          return true;
        }
      } catch(e) { console.error('tryTokenFromUrl:', e); }
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

  // ── INIT ──────────────────────────────────────────────────────────
  async function init() {
    var fromUrl = await tryTokenFromUrl();
    if (!fromUrl) { var fromSession = await tryTokenFromSession(); if (!fromSession) { showLogin(); return; } }
    var res = await apiFetch('/rest/v1/clients?email=ilike.' + encodeURIComponent(currentUser.email.toLowerCase()) + '&order=created_at.desc');
    var clients = await res.json() || [];
    allClientProjects = clients;
    if (!allClientProjects.length) { showLogin(); return; }
    // Only treat as contractor if explicitly flagged — don't assume multiple records = contractor
    isContractor = allClientProjects.some(function(c) { return c.is_contractor; });
    if (isContractor || allClientProjects.length > 1) await loadContractorProjects();
    else await loadProjectDashboard(allClientProjects[0]);
  }
  init();

  // ── LOGIN ─────────────────────────────────────────────────────────
  document.getElementById('ddLoginBtn').addEventListener('click', async function() {
    var email = document.getElementById('ddLoginEmail').value.trim();
    var msg = document.getElementById('ddLoginMsg');
    if (!email) { showMsg(msg, 'Please enter your email address.', 'error'); return; }
    this.disabled = true; this.textContent = 'Sending...';
    try {
      var res = await fetch(SUPABASE_URL + '/auth/v1/magiclink?redirect_to=' + encodeURIComponent(PORTAL_URL), {
        method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });
      showMsg(msg, res.ok ? 'Login link sent! Check your inbox and click the link to access your portal.' : 'Something went wrong. Please try again.', res.ok ? 'success' : 'error');
    } catch(e) { showMsg(msg, 'Something went wrong. Please try again.', 'error'); }
    this.disabled = false; this.textContent = 'Send Login Link';
  });
  document.getElementById('ddLoginEmail').addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('ddLoginBtn').click(); });

  // ── LOGOUT ────────────────────────────────────────────────────────
  // ── CLIENT SITE PHOTOS — Load and display grouped by date ─────────
  async function loadClientSitePhotos() {
    var container = document.getElementById('ddSitePhotosList');
    if (!container || !currentClient) return;
    container.innerHTML = '<div class="dd-empty">Loading photos...</div>';
    try {
      // Load ALL photos for this client (uploaded by client AND admin)
      var res = await apiFetch('/rest/v1/documents?client_id=eq.' + currentClient.id + '&photo_category=eq.site_photos&order=visit_date.desc,created_at.desc');
      var photos = await res.json() || [];

      if (!photos.length) {
        container.innerHTML = '<div class="dd-empty" style="padding:48px 0">No site photos yet.<br><span style="font-size:10px;color:var(--muted)">Upload photos in the Documents tab or ask your Daydream team.</span></div>';
        return;
      }

      // Group by visit date
      var groups = {};
      photos.forEach(function(p) {
        var d = p.visit_date || p.created_at.split('T')[0];
        if (!groups[d]) groups[d] = [];
        groups[d].push(p);
      });

      container.innerHTML = Object.keys(groups).sort(function(a,b) { return b.localeCompare(a); }).map(function(date) {
        var datePhotos = groups[date];
        var d = new Date(date + 'T12:00:00');
        var dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        var notes = datePhotos[0].photo_notes || '';
        var uploadedBy = datePhotos[0].uploaded_by === 'daydream_team' ? 'Daydream Team' : 'You';
        return '<div style="margin-bottom:24px">'
          + '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:2px solid var(--gold);margin-bottom:12px">'
          + '  <div><div style="font-family:Cormorant Garamond,serif;font-size:18px;color:var(--gold)">' + dateStr + '</div>'
          + '  <div style="font-size:10px;color:var(--muted);margin-top:2px">' + datePhotos.length + ' photo(s) · Uploaded by ' + s(uploadedBy) + '</div></div>'
          + '</div>'
          + (notes ? '<div style="font-size:12px;color:var(--muted);padding:10px 14px;background:var(--surface);border-left:2px solid var(--gold);margin-bottom:12px;line-height:1.7">' + s(notes) + '</div>' : '')
          + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">'
          + datePhotos.map(function(p) {
              var url = 'https://wboqkfqibztjmdwrwsch.supabase.co/storage/v1/object/public/client-documents/' + p.file_url;
              return '<div style="position:relative;aspect-ratio:1;overflow:hidden;background:var(--surface-2);border:1px solid var(--border);cursor:pointer" onclick="window.open(\'' + url + '\',\'_blank\')">'
                + '<img src="' + url + '" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.innerHTML=\'<div style=\\"display:flex;align-items:center;justify-content:center;height:100%;font-size:10px;color:var(--muted)\\">No preview</div>\'" />'
                + '</div>';
            }).join('')
          + '</div></div>';
      }).join('');
    } catch(e) {
      container.innerHTML = '<div class="dd-empty">Error loading photos. Please refresh.</div>';
      console.error('loadClientSitePhotos:', e);
    }
  }

  function doLogout() {
    stopRealtime(); // Clean up WebSocket connections
    try { sessionStorage.removeItem('dd_token'); } catch(e) {}
    currentUser = null; currentClient = null; currentProject = null; isContractor = false;
    document.getElementById('ddDashboard').classList.remove('visible');
    document.getElementById('ddProjectSelector').classList.remove('visible');
    document.getElementById('ddCreateProject').classList.remove('visible');
    showLogin();
  }
  document.getElementById('ddLogoutBtn').addEventListener('click', doLogout);
  document.getElementById('ddRefreshBtn').addEventListener('click', async function() {
    if (!currentClient) return;
    var btn = this;
    btn.textContent = '⟳ Refreshing...'; btn.disabled = true;
    await loadProjectDashboard(currentClient);
    btn.textContent = '⟳ Refresh'; btn.disabled = false;
  });
  document.getElementById('ddSelectorLogout').addEventListener('click', doLogout);

  // ── TABS ──────────────────────────────────────────────────────────
  document.querySelectorAll('#dd-portal .dd-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-portal .dd-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-portal .dd-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');

      if (tab.dataset.tab === 'messages') {
        try { sessionStorage.setItem('dd_msgs_last_read', Date.now().toString()); } catch(e) {}
        var dot = tab.querySelector('.dd-msg-dot'); if (dot) dot.remove();
      }
    });
  });

  // ── CHECKLIST ─────────────────────────────────────────────────────
  // ── RESUMABLE UPLOAD (TUS) for files > 6MB ───────────────────────
  // Uses Supabase's TUS endpoint — survives network interruptions
  async function uploadResumable(file, path, token) {
    var CHUNK_SIZE = 6 * 1024 * 1024; // 6MB chunks
    var endpoint = SUPABASE_URL + '/storage/v1/upload/resumable';
    // Step 1: Create upload session
    var createRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/offset+octet-stream',
        'Upload-Length': file.size,
        'Upload-Metadata': 'bucketName ' + btoa('client-documents') + ',objectName ' + btoa(path) + ',contentType ' + btoa(file.type || 'application/octet-stream'),
        'Tus-Resumable': '1.0.0'
      }
    });
    if (!createRes.ok && createRes.status !== 201) {
      console.error('TUS create failed:', createRes.status, await createRes.text());
      return false;
    }
    var uploadUrl = createRes.headers.get('Location');
    if (!uploadUrl) { console.error('No TUS upload URL returned'); return false; }
    // Make absolute if relative
    if (uploadUrl.startsWith('/')) uploadUrl = SUPABASE_URL + uploadUrl;
    // Step 2: Upload in chunks
    var offset = 0;
    while (offset < file.size) {
      var chunk = file.slice(offset, offset + CHUNK_SIZE);
      var patchRes = await fetch(uploadUrl, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/offset+octet-stream',
          'Upload-Offset': offset,
          'Tus-Resumable': '1.0.0'
        },
        body: chunk
      });
      if (!patchRes.ok) { console.error('TUS chunk failed at offset', offset, patchRes.status); return false; }
      offset += CHUNK_SIZE;
    }
    return true;
  }

  window._toggleCheckItem = async function(key) {
    var item = CHECKLIST_ITEMS.find(function(i) { return i.key === key; });
    if (!item || !currentClient) return;
    if (item.type === 'note') { var area = document.getElementById('note-area-' + key); if (area) { area.classList.toggle('visible'); return; } }
    var newState = !checklistState[key];
    checklistState[key] = newState;
    try {
      var existing = await apiFetch('/rest/v1/checklist_items?client_id=eq.' + currentClient.id + '&item_key=eq.' + key);
      var data = await existing.json() || [];
      if (data.length > 0) {
        await apiFetch('/rest/v1/checklist_items?client_id=eq.' + currentClient.id + '&item_key=eq.' + key, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ completed: newState, completed_at: newState ? new Date().toISOString() : null }) });
      } else {
        await apiFetch('/rest/v1/checklist_items', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: currentClient.id, item_key: key, completed: newState, completed_at: newState ? new Date().toISOString() : null }) });
      }
    } catch(e) { console.error('_toggleCheckItem:', e); }
    renderChecklist();
  };

  window._saveNote = async function(key) {
    if (!currentClient) return;
    var textarea = document.getElementById('note-' + key);
    var content = textarea ? textarea.value.trim() : '';
    notesState[key] = content;
    if (content && !checklistState[key]) checklistState[key] = true;
    try {
      var existing = await apiFetch('/rest/v1/client_notes?client_id=eq.' + currentClient.id + '&note_key=eq.' + key);
      var data = await existing.json() || [];
      if (data.length > 0) {
        await apiFetch('/rest/v1/client_notes?client_id=eq.' + currentClient.id + '&note_key=eq.' + key, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ content: content, updated_at: new Date().toISOString() }) });
      } else {
        await apiFetch('/rest/v1/client_notes', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: currentClient.id, note_key: key, content: content }) });
      }
      var saveBtn = document.querySelector('#note-area-' + key + ' .dd-note-save');
      if (saveBtn) { saveBtn.textContent = 'Saved!'; saveBtn.style.background = 'var(--success)'; setTimeout(function() { if(saveBtn){saveBtn.textContent='Save'; saveBtn.style.background='var(--gold)';} }, 2000); }
      renderChecklist();
      var ta = document.getElementById('note-' + key); if (ta) ta.value = content;
      var area = document.getElementById('note-area-' + key); if (area) area.classList.add('visible');
    } catch(e) { console.error('_saveNote:', e); }
  };

  // ── FILE UPLOADS — FIX 3: Validation + FIX 7: Parallel uploads ───
  document.querySelectorAll('#dd-portal .dd-file-input').forEach(function(input) {
    input.addEventListener('change', async function() {
      var files = Array.from(this.files);
      var category = this.dataset.category;
      var statusEl = document.getElementById('status-' + category);
      if (!files.length || !currentUser) return;
      // Validate all files first
      for (var vi = 0; vi < files.length; vi++) {
        var err = validateFile(files[vi]);
        if (err) { statusEl.textContent = err; statusEl.style.color = 'var(--error)'; return; }
      }
      statusEl.textContent = 'Uploading ' + files.length + ' file(s)...';
      statusEl.style.color = 'var(--muted)';
      var clientName = (currentClient && currentClient.full_name) ? currentClient.full_name : currentUser.email;

      // Parallel uploads — resumable TUS for large files, standard for small
      var SIX_MB = 6 * 1024 * 1024;
      var uploaded = 0;
      var total = files.length;

      var uploadResults = await Promise.all(files.map(async function(file) {
        var path = clientName + '/' + category + '/' + Date.now() + '_' + safeName(file.name);
        var token = currentUser.access_token || SUPABASE_KEY;
        try {
          var ok = false;
          if (file.size > SIX_MB) {
            // ── Resumable TUS upload for videos and large files ──
            ok = await uploadResumable(file, path, token);
          } else {
            // ── Standard upload for small files ──
            var res = await fetch(SUPABASE_URL + '/storage/v1/object/client-documents/' + path, {
              method: 'POST',
              headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + token, 'Content-Type': file.type },
              body: file
            });
            ok = res.ok;
          }
          if (ok) {
            await apiFetch('/rest/v1/documents', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_id: currentProject ? currentProject.id : null, client_id: currentClient ? currentClient.id : null, file_name: file.name, file_url: path, uploaded_by: currentUser.email, photo_category: category === 'photos' ? 'site_photos' : null, visit_date: category === 'photos' ? new Date().toISOString().split('T')[0] : null }) });
            // Auto-complete checklist item
            var checkItem = CHECKLIST_ITEMS.find(function(ci) { return ci.category === category; });
            if (checkItem && currentClient && !checklistState[checkItem.key]) {
              checklistState[checkItem.key] = true;
              apiFetch('/rest/v1/checklist_items', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: currentClient.id, item_key: checkItem.key, completed: true, completed_at: new Date().toISOString() }) }).catch(function() {
                return apiFetch('/rest/v1/checklist_items?client_id=eq.' + currentClient.id + '&item_key=eq.' + checkItem.key, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ completed: true, completed_at: new Date().toISOString() }) });
              });
              renderChecklist();
            }
          }
          return ok;
        } catch(e) { console.error('Upload error:', file.name, e); return false; }
      }));

      uploaded = uploadResults.filter(Boolean).length;
      statusEl.textContent = uploaded === total ? uploaded + ' file(s) uploaded successfully' : uploaded + ' of ' + total + ' uploaded';
      statusEl.style.color = uploaded === total ? 'var(--success)' : 'var(--error)';
    });
  });

  // ── MESSAGES ──────────────────────────────────────────────────────
  window._deleteMessage = async function(id) {
    if (!confirm('Delete this message?')) return;
    try {
      var res = await apiFetch('/rest/v1/messages?id=eq.' + id, { method: 'DELETE' });
      if (res.ok) {
        var el = document.getElementById('msg-' + id);
        if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(function() { if(el.parentNode) el.remove(); }, 300); }
      } else { console.error('Delete message error:', await res.text()); }
    } catch(e) { console.error('_deleteMessage:', e); }
  };

  window._deleteMessage = async function(id) {
    if (!confirm('Delete this message?')) return;
    try {
      var res = await apiFetch('/rest/v1/messages?id=eq.' + id, { method: 'DELETE' });
      if (res.ok) {
        var el = document.getElementById('msg-' + id);
        if (el) el.remove();
      } else { console.error('Delete message error:', await res.text()); }
    } catch(e) { console.error('_deleteMessage:', e); }
  };

  document.getElementById('ddSendBtn').addEventListener('click', async function() {
    var input = document.getElementById('ddMessageInput');
    var content = input.value.trim();
    if (!content || !currentUser) return;
    input.value = '';
    try {
      await apiFetch('/rest/v1/messages', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_id: currentProject ? currentProject.id : null, client_id: currentClient ? currentClient.id : null, sender: currentUser.email, content: content, is_read: false }) });
      await loadMessages();
    } catch(e) { console.error('Send message:', e); }
  });
  document.getElementById('ddMessageInput').addEventListener('keydown', function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.getElementById('ddSendBtn').click(); } });

  // ── SUPABASE REALTIME — Live updates without refresh ─────────────
  var realtimeChannels = [];

  function startRealtime() {
    // Clean up any existing subscriptions first
    stopRealtime();
    if (!currentClient) return;

    // ── 1. LIVE MESSAGES ─────────────────────────────────────────
    // Fires instantly when admin sends a reply
    var msgChannel = new WebSocket(
      'wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU&vsn=1.0.0'
    );

    msgChannel.onopen = function() {
      // Join the messages channel filtered to this client
      msgChannel.send(JSON.stringify({
        topic: 'realtime:public:messages:client_id=eq.' + currentClient.id,
        event: 'phx_join',
        payload: {},
        ref: '1'
      }));
    };

    msgChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        // New message inserted
        if (data.event === 'INSERT' || data.payload && data.payload.data) {
          loadMessages();
          // Flash the messages tab if not active
          var msgTab = document.querySelector('[data-tab="messages"]');
          var activeTab = document.querySelector('#dd-portal .dd-tab.active');
          if (msgTab && activeTab && activeTab.dataset.tab !== 'messages') {
            var dot = msgTab.querySelector('.dd-msg-dot');
            if (!dot) { dot = document.createElement('span'); dot.className = 'dd-msg-dot'; msgTab.appendChild(dot); }
            dot.textContent = '●';
          }
        }
      } catch(e) {}
    };

    msgChannel.onerror = function(e) { console.error('Realtime messages error:', e); };
    realtimeChannels.push(msgChannel);

    // ── 2. LIVE CLIENT STATUS (contract, payment, pipeline) ───────
    // Fires when admin updates any field on the client record
    var clientChannel = new WebSocket(
      'wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU&vsn=1.0.0'
    );

    clientChannel.onopen = function() {
      clientChannel.send(JSON.stringify({
        topic: 'realtime:public:clients:id=eq.' + currentClient.id,
        event: 'phx_join',
        payload: {},
        ref: '2'
      }));
    };

    clientChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'UPDATE' && data.payload && data.payload.record) {
          var updated = data.payload.record;
          // Merge into currentClient
          currentClient = Object.assign({}, currentClient, updated);
          // Re-render status badges live
          renderStatusBadges(currentClient);
          renderTimeline(currentClient.client_stage || 'inquiry_submitted', currentClient.construction_stage);
          // Update pipeline status card
          var PIPELINE_LABELS = {
            'client_inquiry_made': 'New Inquiry', 'client_qualified': 'Qualified',
            'discovery_call_booked': 'Discovery Call Booked', 'discovery_call_completed': 'Discovery Call Complete',
            'design_proposal_drafting': 'Proposal Drafting', 'design_proposal_presented': 'Proposal Presented',
            'design_proposal_accepted': 'Proposal Accepted', 'site_consultation_scheduled': 'Site Consultation Scheduled',
            'site_consultation_completed': 'Site Consultation Complete', 'design_phase_started': 'Design Phase Started',
            'base_map_complete': 'Base Map Complete', 'base_map_approved': 'Base Map Approved',
            '3d_model_completed': '3D Model Complete', '3d_model_approved': '3D Model Approved',
            'visualizations_completed': 'Visualizations Complete', 'visualizations_approved': 'Visualizations Approved',
            'construction_document_phase_complete': 'Construction Documents Complete',
            'permit_plans_submitted': 'Permit Plans Submitted', 'permit_plans_approved': 'Permit Plans Approved',
            'construction_started': 'Construction Started', 'construction_finished': 'Construction Finished',
            'project_complete': 'Project Complete'
          };
          var statusEl = document.getElementById('ddStatus');
          if (statusEl) statusEl.textContent = PIPELINE_LABELS[updated.status] || updated.status || 'New Inquiry';
          // Update project type
          var ptEl = document.getElementById('ddProjectType');
          if (ptEl && updated.project_type_category) ptEl.textContent = PROJECT_TYPE_LABELS[updated.project_type_category] || updated.project_type_category;
          // Show a subtle toast notification
          showRealtimeToast('Your project has been updated');
        }
      } catch(e) { console.error('Realtime client update:', e); }
    };

    clientChannel.onerror = function(e) { console.error('Realtime client error:', e); };
    realtimeChannels.push(clientChannel);
  }

  function stopRealtime() {
    realtimeChannels.forEach(function(ch) {
      try { ch.close(); } catch(e) {}
    });
    realtimeChannels = [];
  }

  // ── TOAST NOTIFICATION ────────────────────────────────────────
  function showRealtimeToast(message) {
    var existing = document.getElementById('ddRealtimeToast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.id = 'ddRealtimeToast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--gold);color:var(--bg);font-family:Jost,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 20px;z-index:9999;animation:ddFadeUp 0.3s ease both;box-shadow:0 4px 20px rgba(0,0,0,0.4)';
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3000);
  }

  // ── CREATE PROJECT PANEL ──────────────────────────────────────────
  window._showCreateProject = function() {
    var panel = document.getElementById('ddCreateProject');
    if (panel) panel.classList.add('visible');
    document.getElementById('ddProjectSelector').classList.remove('visible');
    document.getElementById('ddDashboard').classList.remove('visible');
    // Pre-fill client name if we know it
    var nameInput = document.getElementById('cpClientName');
    if (nameInput && currentClient && currentClient.full_name && !nameInput.value) {
      nameInput.value = currentClient.full_name;
    }
  };

  window._hideCreateProject = function() {
    var panel = document.getElementById('ddCreateProject');
    if (panel) panel.classList.remove('visible');
    // Reset all unified form fields
    ['cpAddress','cpClientName','cpName','cpAnything','cpGoals'].forEach(function(id) {
      var el = document.getElementById(id); if (el) el.value = '';
    });
    ['cpType','cpBudget'].forEach(function(id) {
      var el = document.getElementById(id); if (el) el.value = '';
    });
    var msg  = document.getElementById('cpMsg');       if (msg)  msg.textContent = '';
    var succ = document.getElementById('cpSuccessMsg'); if (succ) succ.style.display = 'none';
    var btn  = document.getElementById('cpSubmit');    if (btn) { btn.textContent = 'Create Project'; btn.disabled = false; btn.style.background = ''; }

    if (allClientProjects.length > 1 || isContractor) showProjectSelector();
    else if (currentClient) showDashboard();
    else showLogin();
  };

  window._submitCreateProject = async function() {
    var address    = document.getElementById('cpAddress').value.trim();
    var clientName = (document.getElementById('cpClientName') || {}).value ? document.getElementById('cpClientName').value.trim() : '';
    var name       = document.getElementById('cpName').value.trim();
    var type       = document.getElementById('cpType').value;
    var anything   = (document.getElementById('cpAnything') || {}).value ? document.getElementById('cpAnything').value.trim() : '';
    var goals      = document.getElementById('cpGoals').value.trim();
    var budget     = document.getElementById('cpBudget').value;
    var msg = document.getElementById('cpMsg');
    var btn = document.getElementById('cpSubmit');

    // Unified validation — same required fields as admin
    if (!address)    { msg.textContent = 'Project address is required.';           msg.style.color = 'var(--error)'; document.getElementById('cpAddress').focus(); return; }
    if (!clientName) { msg.textContent = 'Client name is required.';               msg.style.color = 'var(--error)'; document.getElementById('cpClientName').focus(); return; }
    if (!name)       { msg.textContent = 'Project name is required.';              msg.style.color = 'var(--error)'; document.getElementById('cpName').focus(); return; }
    if (!budget)     { msg.textContent = 'Please enter your investment / budget level.';     msg.style.color = 'var(--error)'; document.getElementById('cpBudget').focus(); return; }

    if (!currentClient && !allClientProjects.length) { msg.textContent = 'No client account found.'; msg.style.color = 'var(--error)'; return; }
    var clientId = (currentClient || allClientProjects[0]).id;
    btn.textContent = 'Creating Project...'; btn.disabled = true; msg.textContent = '';

    var description = [goals, anything ? 'Additional notes: ' + anything : ''].filter(Boolean).join('\n\n');

    try {
      var res = await apiFetch('/rest/v1/projects', {
        method: 'POST', headers: { 'Prefer': 'return=representation' },
        body: JSON.stringify({
          client_id: clientId,
          project_name: name,
          project_type: type || null,
          project_address: address || null,
          description: description || null,
          status: 'active'
        })
      });
      // Save investment level on client record
      if (budget) {
        apiFetch('/rest/v1/clients?id=eq.' + clientId, {
          method: 'PATCH',
          headers: { 'Prefer': 'return=minimal' },
          body: JSON.stringify({ investment: budget })
        }).catch(function(e) { console.error('investment patch:', e); });
      }
      if (res.ok) {
        var projData = await res.json() || [];
        var newProjectId = projData[0] ? projData[0].id : null;
        // Files uploaded via Documents tab after project creation
        var succ = document.getElementById('cpSuccessMsg'); if (succ) succ.style.display = 'block';
        btn.textContent = 'Project Created!'; btn.style.background = 'var(--success)';
        setTimeout(function() { window._hideCreateProject(); loadContractorProjects(); }, 2000);
      } else {
        var errText = await res.text();
        console.error('Create project error:', errText);
        msg.textContent = 'Error creating project. Please try again.'; msg.style.color = 'var(--error)';
        btn.textContent = 'Create Project'; btn.disabled = false; btn.style.background = '';
      }
    } catch(e) {
      console.error('_submitCreateProject:', e);
      msg.textContent = 'Something went wrong.'; msg.style.color = 'var(--error)';
      btn.textContent = 'Create Project'; btn.disabled = false; btn.style.background = '';
    }
  };

})();
