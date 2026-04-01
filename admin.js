(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var ADMIN_PASSWORD = 'Daydream2026!';

  var PIPELINE_STAGES = [
    { value: 'client_inquiry_made',                  label: 'Client Inquiry Made',                  color: '#8a8680' },
    { value: 'client_qualified',                      label: 'Client Qualified',                      color: '#eeb24a' },
    { value: 'discovery_call_booked',                 label: 'Discovery Call Booked',                 color: '#eeb24a' },
    { value: 'discovery_call_completed',              label: 'Discovery Call Completed',              color: '#eeb24a' },
    { value: 'design_proposal_drafting',              label: 'Design Proposal Drafting',              color: '#7a9e8a' },
    { value: 'design_proposal_presented',             label: 'Design Proposal Presented',             color: '#7a9e8a' },
    { value: 'design_proposal_accepted',              label: 'Design Proposal Accepted',              color: '#6a9e7a' },
    { value: 'site_consultation_scheduled',           label: 'Site Consultation Scheduled',           color: '#7a9e8a' },
    { value: 'site_consultation_completed',           label: 'Site Consultation Completed',           color: '#6a9e7a' },
    { value: 'design_phase_started',                  label: 'Design Phase Started',                  color: '#5a8e9e' },
    { value: 'base_map_complete',                     label: 'Base Map Complete',                     color: '#5a8e9e' },
    { value: 'base_map_discussion_call',              label: 'Base Map Discussion Call',              color: '#5a8e9e' },
    { value: 'base_map_approved',                     label: 'Base Map Approved',                     color: '#4a7e8e' },
    { value: '3d_model_completed',                    label: '3D Model Completed',                    color: '#5a7e9e' },
    { value: '3d_model_discussion_call',              label: '3D Model Discussion Call',              color: '#5a7e9e' },
    { value: '3d_model_approved',                     label: '3D Model Approved',                     color: '#4a6e8e' },
    { value: 'visualizations_started',                label: 'Visualizations Started',                color: '#7a6e9e' },
    { value: 'visualizations_completed',              label: 'Visualizations Completed',              color: '#7a6e9e' },
    { value: 'visualizations_approved',               label: 'Visualizations Approved',               color: '#6a5e8e' },
    { value: 'construction_document_phase_started',   label: 'Construction Document Phase Started',   color: '#9e7a5a' },
    { value: 'construction_document_phase_complete',  label: 'Construction Document Phase Complete',  color: '#8e6a4a' },
    { value: 'permit_plans_submitted',                label: 'Permit Plans Submitted',                color: '#9e6a5a' },
    { value: 'permit_plan_revisions',                 label: 'Permit Plan Revisions',                 color: '#c07a6a' },
    { value: 'permit_plans_approved',                 label: 'Permit Plans Approved',                 color: '#6a9e7a' },
    { value: 'construction_started',                  label: 'Construction Started',                  color: '#eeb24a' },
    { value: 'construction_finished',                 label: 'Construction Finished',                 color: '#6a9e7a' },
    { value: 'site_photos_to_be_made',                label: 'Site Photos To Be Made',                color: '#8a8680' },
    { value: 'site_photos_finished',                  label: 'Site Photos Finished',                  color: '#6a9e7a' },
    { value: 'project_complete',                      label: 'Project Complete',                      color: '#eeb24a' }
  ];

  var CLIENT_STAGES = [
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

  var CONTRACT_STAGES = [
    { value: 'not_sent',   label: 'Not Yet Sent',               color: '#8a8680' },
    { value: 'sent',       label: 'Sent — Awaiting Signature',  color: '#eeb24a' },
    { value: 'signed',     label: 'Signed ✓',                   color: '#6a9e7a' }
  ];

  var PAYMENT_STAGES = [
    { value: 'not_sent',          label: 'Invoice Not Yet Sent',           color: '#8a8680' },
    { value: 'invoice_sent',      label: 'Invoice Sent — Awaiting Payment', color: '#eeb24a' },
    { value: 'deposit_paid',      label: 'Deposit Paid — Balance Due',     color: '#5a8e9e' },
    { value: 'partially_paid',    label: 'Partially Paid',                 color: '#7a9e8a' },
    { value: 'payment_complete',  label: 'Payment Complete ✓',             color: '#6a9e7a' }
  ];

  var CHECKLIST_LABELS = {
    'goals':      'Project Goals & Must-Have Features',
    'inspo':      'Inspiration Photos or Boards',
    'photos':     'Site Photos & Walkthrough Video',
    'survey':     'Property Survey / Site Plat',
    'bylaws':     'HOA Bylaws & Neighborhood Covenants',
    'houseplans': 'Existing House Architectural Plans'
  };

  function getPipelineStage(value) {
    return PIPELINE_STAGES.find(function(s) { return s.value === value; }) || { value: value, label: value || 'New Inquiry', color: '#8a8680' };
  }

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap';
  document.head.appendChild(font);

  var style = document.createElement('style');
  style.textContent = [
    '#dd-admin * { box-sizing: border-box; margin: 0; padding: 0; }',
    '#dd-admin { --bg: #0d0d0b; --surface: #131310; --surface-2: #181815; --border: #252520; --text: #f0ebe0; --muted: #8a8680; --gold: #eeb24a; --gold-dim: rgba(238,178,74,0.08); --error: #c07a6a; --success: #6a9e7a; font-family: Jost, sans-serif; font-weight: 300; background: var(--bg); color: var(--text); min-height: 100vh; width: 100%; }',
    '#dd-admin .da-login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; animation: daFade 0.7s ease both; }',
    '#dd-admin .da-login-card { width: 100%; max-width: 400px; border: 1px solid var(--border); background: var(--surface); }',
    '#dd-admin .da-login-header { background: var(--bg); border-bottom: 3px solid var(--gold); padding: 28px 32px; text-align: center; }',
    '#dd-admin .da-login-logo { font-family: "Cormorant Garamond", serif; font-size: 26px; font-weight: 400; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 4px; }',
    '#dd-admin .da-login-sub { font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted); }',
    '#dd-admin .da-login-body { padding: 28px 32px; }',
    '#dd-admin .da-input-wrap { border: 1px solid var(--border); background: var(--surface-2); margin-bottom: 12px; transition: border-color 0.2s; }',
    '#dd-admin .da-input-wrap:focus-within { border-color: var(--gold); }',
    '#dd-admin .da-input-wrap:focus-within::after { content: ""; display: block; height: 2px; background: var(--gold); }',
    '#dd-admin .da-input-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); padding: 10px 14px 3px; display: block; }',
    '#dd-admin .da-input { width: 100%; background: transparent; border: none; outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 3px 14px 10px; }',
    '#dd-admin .da-btn { width: 100%; background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: Jost, sans-serif; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px; cursor: pointer; transition: background 0.3s, color 0.3s; margin-top: 8px; }',
    '#dd-admin .da-btn:hover { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-error-msg { font-size: 11px; color: var(--error); text-align: center; margin-top: 10px; display: none; }',
    '#dd-admin .da-error-msg.visible { display: block; }',
    '#dd-admin .da-dashboard { display: none; min-height: 100vh; flex-direction: column; }',
    '#dd-admin .da-dashboard.visible { display: flex; }',
    '#dd-admin .da-nav { background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 100; }',
    '#dd-admin .da-nav-logo { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 400; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; }',
    '#dd-admin .da-nav-badge { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--bg); background: var(--gold); padding: 3px 8px; margin-left: 12px; }',
    '#dd-admin .da-nav-logout { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); cursor: pointer; background: none; border: none; transition: color 0.2s; }',
    '#dd-admin .da-nav-logout:hover { color: var(--gold); }',
    '#dd-admin .da-stats { display: flex; gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-stat { background: var(--surface); padding: 16px 24px; flex: 1; }',
    '#dd-admin .da-stat-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }',
    '#dd-admin .da-stat-value { font-family: "Cormorant Garamond", serif; font-size: 28px; color: var(--gold); font-weight: 400; }',
    '#dd-admin .da-tabs { background: var(--surface); border-bottom: 1px solid var(--border); display: flex; padding: 0 32px; overflow-x: auto; }',
    '#dd-admin .da-tab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 14px 20px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; background: none; border-left: none; border-right: none; border-top: none; white-space: nowrap; }',
    '#dd-admin .da-tab:hover { color: var(--text); }',
    '#dd-admin .da-tab.active { color: var(--gold); border-bottom-color: var(--gold); }',
    '#dd-admin .da-tab-content { display: none; flex: 1; }',
    '#dd-admin .da-tab-content.active { display: block; }',
    '#dd-admin .da-toolbar { padding: 20px 32px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; border-bottom: 1px solid var(--border); background: var(--surface); }',
    '#dd-admin .da-search { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 16px; outline: none; flex: 1; min-width: 200px; transition: border-color 0.2s; }',
    '#dd-admin .da-search:focus { border-color: var(--gold); }',
    '#dd-admin .da-search::placeholder { color: var(--muted); }',
    '#dd-admin .da-filter { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 10px 16px; outline: none; cursor: pointer; appearance: none; min-width: 200px; }',
    '#dd-admin .da-count { font-size: 11px; color: var(--muted); letter-spacing: 0.1em; white-space: nowrap; }',
    '#dd-admin .da-cards-wrap { padding: 24px 32px; display: flex; flex-direction: column; gap: 12px; }',
    '#dd-admin .da-client-card { background: var(--surface); border: 1px solid var(--border); transition: border-color 0.2s; }',
    '#dd-admin .da-client-card:hover { border-color: var(--gold); }',
    '#dd-admin .da-card-top { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; gap: 16px; cursor: pointer; }',
    '#dd-admin .da-card-left { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }',
    '#dd-admin .da-card-avatar { width: 36px; height: 36px; background: var(--gold-dim); border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center; font-family: "Cormorant Garamond", serif; font-size: 16px; color: var(--gold); flex-shrink: 0; }',
    '#dd-admin .da-card-name { font-size: 14px; color: var(--text); font-weight: 400; margin-bottom: 2px; }',
    '#dd-admin .da-card-sub { font-size: 10px; color: var(--muted); }',
    '#dd-admin .da-card-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; flex-wrap: wrap; justify-content: flex-end; }',
    '#dd-admin .da-card-investment { font-size: 13px; color: var(--gold); font-family: "Cormorant Garamond", serif; }',
    '#dd-admin .da-card-date { font-size: 10px; color: var(--muted); }',
    '#dd-admin .da-stage-pill { font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border: 1px solid; white-space: nowrap; }',
    '#dd-admin .da-expand-icon { font-size: 10px; color: var(--muted); transition: transform 0.2s; }',
    '#dd-admin .da-expand-icon.open { transform: rotate(180deg); }',
    '#dd-admin .da-card-details { display: none; border-top: 1px solid var(--border); }',
    '#dd-admin .da-card-details.visible { display: block; }',
    '#dd-admin .da-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }',
    '#dd-admin .da-detail-item { background: var(--surface-2); padding: 12px 20px; }',
    '#dd-admin .da-detail-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }',
    '#dd-admin .da-detail-value { font-size: 12px; color: var(--text); }',
    '#dd-admin .da-card-actions { padding: 16px 20px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }',
    '#dd-admin .da-action-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }',
    '#dd-admin .da-action-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); width: 140px; flex-shrink: 0; }',
    '#dd-admin .da-select { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 8px 12px; outline: none; cursor: pointer; appearance: none; flex: 1; min-width: 160px; transition: border-color 0.2s; }',
    '#dd-admin .da-select:focus { border-color: var(--gold); }',
    '#dd-admin .da-text-input { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 8px 12px; outline: none; flex: 1; min-width: 160px; transition: border-color 0.2s; }',
    '#dd-admin .da-text-input:focus { border-color: var(--gold); }',
    '#dd-admin .da-text-input::placeholder { color: var(--muted); }',
    '#dd-admin .da-update-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; padding: 9px 20px; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }',
    '#dd-admin .da-update-btn:hover { opacity: 0.85; }',
    '#dd-admin .da-email-link { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid var(--gold); padding: 8px 14px; white-space: nowrap; transition: background 0.2s, color 0.2s; }',
    '#dd-admin .da-email-link:hover { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-section-divider { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); padding: 12px 0 6px; border-top: 1px solid var(--border); margin-top: 4px; }',

    // Checklist tab
    '#dd-admin .da-checklist-wrap { padding: 24px 32px; }',
    '#dd-admin .da-checklist-search { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 16px; outline: none; width: 300px; margin-bottom: 20px; transition: border-color 0.2s; }',
    '#dd-admin .da-checklist-search:focus { border-color: var(--gold); }',
    '#dd-admin .da-checklist-search::placeholder { color: var(--muted); }',
    '#dd-admin .da-client-checklist { background: var(--surface); border: 1px solid var(--border); margin-bottom: 16px; }',
    '#dd-admin .da-client-checklist-header { padding: 14px 20px; border-bottom: 1px solid var(--border); background: var(--surface-2); display: flex; align-items: center; justify-content: space-between; cursor: pointer; }',
    '#dd-admin .da-client-checklist-name { font-size: 13px; color: var(--text); font-weight: 400; }',
    '#dd-admin .da-client-checklist-progress { font-size: 11px; color: var(--muted); }',
    '#dd-admin .da-client-checklist-progress span { color: var(--gold); }',
    '#dd-admin .da-client-checklist-body { display: none; }',
    '#dd-admin .da-client-checklist-body.visible { display: block; }',
    '#dd-admin .da-check-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 20px; border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-check-row:last-child { border-bottom: none; }',
    '#dd-admin .da-check-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); flex-shrink: 0; margin-top: 4px; }',
    '#dd-admin .da-check-dot.done { background: var(--success); }',
    '#dd-admin .da-check-row-label { font-size: 12px; color: var(--text); margin-bottom: 3px; }',
    '#dd-admin .da-check-row-note { font-size: 11px; color: var(--muted); line-height: 1.6; margin-top: 4px; background: var(--surface-2); padding: 8px 12px; border-left: 2px solid var(--gold); }',

    // Messages
    '#dd-admin .da-messages-wrap { padding: 24px 32px; }',
    '#dd-admin .da-msg-card { background: var(--surface); border: 1px solid var(--border); padding: 16px 20px; margin-bottom: 12px; transition: border-color 0.2s; }',
    '#dd-admin .da-msg-card:hover { border-color: var(--gold); }',
    '#dd-admin .da-msg-card.unread { border-left: 3px solid var(--gold); }',
    '#dd-admin .da-msg-client { font-size: 13px; color: var(--text); font-weight: 400; margin-bottom: 4px; }',
    '#dd-admin .da-msg-preview { font-size: 11px; color: var(--muted); margin-bottom: 6px; }',
    '#dd-admin .da-msg-meta { font-size: 9px; color: var(--muted); }',
    '#dd-admin .da-msg-thread { display: none; border-top: 1px solid var(--border); margin-top: 12px; padding-top: 12px; }',
    '#dd-admin .da-msg-thread.visible { display: block; }',
    '#dd-admin .da-msg-bubble { padding: 10px 14px; margin-bottom: 8px; font-size: 12px; line-height: 1.7; max-width: 80%; }',
    '#dd-admin .da-msg-bubble.client { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); }',
    '#dd-admin .da-msg-bubble.team { background: var(--gold-dim); border: 1px solid var(--gold); color: var(--text); margin-left: auto; }',
    '#dd-admin .da-msg-reply { display: flex; margin-top: 12px; border-top: 1px solid var(--border); padding-top: 12px; }',
    '#dd-admin .da-msg-reply textarea { flex: 1; background: var(--surface-2); border: 1px solid var(--border); outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 10px 14px; resize: none; height: 48px; transition: border-color 0.2s; }',
    '#dd-admin .da-msg-reply textarea:focus { border-color: var(--gold); }',
    '#dd-admin .da-msg-reply textarea::placeholder { color: var(--muted); }',
    '#dd-admin .da-reply-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; padding: 0 20px; cursor: pointer; }',
    '#dd-admin .da-empty { text-align: center; padding: 60px 24px; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; }',
    '#dd-admin .da-section-title { font-family: "Cormorant Garamond", serif; font-size: 24px; font-weight: 300; color: var(--text); margin-bottom: 20px; }',
    '@keyframes daFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 700px) { #dd-admin .da-stats { flex-direction: column; } #dd-admin .da-nav { padding: 0 16px; } #dd-admin .da-toolbar { padding: 16px; } #dd-admin .da-cards-wrap { padding: 16px; } #dd-admin .da-details-grid { grid-template-columns: 1fr; } #dd-admin .da-messages-wrap, #dd-admin .da-checklist-wrap { padding: 16px; } }'
  ].join('\n');
  document.head.appendChild(style);

  var wrap = document.getElementById('dd-admin');
  if (!wrap) return;

  var filterOptions = '<option value="">All Pipeline Stages</option>' + PIPELINE_STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

  wrap.innerHTML = [
    '<div id="daLoginWrap" class="da-login-wrap">',
    '  <div class="da-login-card">',
    '    <div class="da-login-header"><div class="da-login-logo">Daydream</div><div class="da-login-sub">Admin Dashboard</div></div>',
    '    <div class="da-login-body">',
    '      <div class="da-input-wrap"><label class="da-input-label">Password</label><input class="da-input" type="password" id="daPassword" placeholder="Enter admin password" /></div>',
    '      <button class="da-btn" id="daLoginBtn">Sign In</button>',
    '      <div class="da-error-msg" id="daLoginError">Incorrect password. Please try again.</div>',
    '    </div>',
    '  </div>',
    '</div>',
    '<div id="daDashboard" class="da-dashboard">',
    '  <nav class="da-nav"><div style="display:flex;align-items:center"><div class="da-nav-logo">Daydream</div><div class="da-nav-badge">Admin</div></div><button class="da-nav-logout" id="daLogoutBtn">Sign Out</button></nav>',
    '  <div class="da-stats">',
    '    <div class="da-stat"><div class="da-stat-label">Total Leads</div><div class="da-stat-value" id="daStatTotal">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Active Projects</div><div class="da-stat-value" id="daStatActive">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Completed</div><div class="da-stat-value" id="daStatComplete">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">New This Month</div><div class="da-stat-value" id="daStatMonth">—</div></div>',
    '  </div>',
    '  <div class="da-tabs">',
    '    <button class="da-tab active" data-tab="clients">Clients</button>',
    '    <button class="da-tab" data-tab="checklist">Onboarding</button>',
    '    <button class="da-tab" data-tab="messages">Messages</button>',
    '  </div>',
    '  <div class="da-tab-content active" id="tab-clients">',
    '    <div class="da-toolbar"><input class="da-search" type="text" id="daSearch" placeholder="Search by name, email or phone..." /><select class="da-filter" id="daFilter">' + filterOptions + '</select><div class="da-count" id="daCount"></div></div>',
    '    <div class="da-cards-wrap" id="daCardsWrap"></div>',
    '  </div>',
    '  <div class="da-tab-content" id="tab-checklist">',
    '    <div class="da-checklist-wrap">',
    '      <div class="da-section-title">Client Onboarding</div>',
    '      <input class="da-checklist-search" type="text" id="daCheckSearch" placeholder="Search clients..." />',
    '      <div id="daChecklistWrap"></div>',
    '    </div>',
    '  </div>',
    '  <div class="da-tab-content" id="tab-messages">',
    '    <div class="da-messages-wrap"><div class="da-section-title">Client Messages</div><div id="daMsgList"></div></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  var allClients = [];
  var allMessages = [];
  var allChecklists = {};
  var allNotes = {};

  function apiFetch(path, options) {
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SUPABASE_KEY;
    opts.headers['Authorization'] = 'Bearer ' + SUPABASE_KEY;
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SUPABASE_URL + path, opts);
  }
  function formatDate(str) { if (!str) return '—'; return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  function serviceLabel(key) {
    var map = { '2d_concept': '2D Concept Phase', '3d_concept': '3D Concept Phase', '2d_3d_concept': '2D + 3D Concept Phase', 'permit_plan': 'Permit Plan Phase', '2d_3d_permit': '2D + 3D + Permit Plan' };
    return map[key] || key || '—';
  }
  function initials(name) { if (!name) return '?'; var p = name.trim().split(' '); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  function formatInvestment(inv) { if (!inv) return ''; var n = (inv || '').replace(/[^0-9.]/g, ''); return n && !isNaN(n) ? '$' + Number(n).toLocaleString() : inv; }

  document.querySelectorAll('#dd-admin .da-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
      if (tab.dataset.tab === 'messages') loadMessages();
      if (tab.dataset.tab === 'checklist') loadAllChecklists();
    });
  });

  document.getElementById('daLoginBtn').addEventListener('click', function() {
    if (document.getElementById('daPassword').value === ADMIN_PASSWORD) {
      try { sessionStorage.setItem('dd_admin', '1'); } catch(e) {}
      document.getElementById('daLoginWrap').style.display = 'none';
      document.getElementById('daDashboard').classList.add('visible');
      loadClients();
    } else { document.getElementById('daLoginError').classList.add('visible'); }
  });
  document.getElementById('daPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('daLoginBtn').click(); });
  document.getElementById('daLogoutBtn').addEventListener('click', function() {
    try { sessionStorage.removeItem('dd_admin'); } catch(e) {}
    document.getElementById('daDashboard').classList.remove('visible');
    document.getElementById('daLoginWrap').style.display = 'flex';
  });
  try { if (sessionStorage.getItem('dd_admin') === '1') { document.getElementById('daLoginWrap').style.display = 'none'; document.getElementById('daDashboard').classList.add('visible'); loadClients(); } } catch(e) {}

  async function loadClients() {
    try {
      var res = await apiFetch('/rest/v1/clients?order=created_at.desc');
      allClients = await res.json();
      updateStats();
      renderCards(allClients);
    } catch(e) {}
  }

  function updateStats() {
    document.getElementById('daStatTotal').textContent = allClients.length;
    var active = allClients.filter(function(c) { return c.status && c.status !== 'client_inquiry_made' && c.status !== 'new_lead' && c.status !== 'project_complete'; }).length;
    var complete = allClients.filter(function(c) { return c.status === 'project_complete'; }).length;
    var now = new Date();
    var month = allClients.filter(function(c) { var d = new Date(c.created_at); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length;
    document.getElementById('daStatActive').textContent = active;
    document.getElementById('daStatComplete').textContent = complete;
    document.getElementById('daStatMonth').textContent = month;
  }

  function renderCards(clients) {
    var container = document.getElementById('daCardsWrap');
    document.getElementById('daCount').textContent = clients.length + ' client' + (clients.length !== 1 ? 's' : '');
    if (!clients.length) { container.innerHTML = '<div class="da-empty">No clients found</div>'; return; }

    container.innerHTML = clients.map(function(c) {
      var stage = getPipelineStage(c.status || 'client_inquiry_made');
      var inv = formatInvestment(c.investment || '');
      var pOpts = PIPELINE_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.status === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');
      var cOpts = CLIENT_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.client_stage === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');
      var contractOpts = CONTRACT_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.contract_status === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');
      var paymentOpts = PAYMENT_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.payment_status === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');

      return '<div class="da-client-card" id="card-' + c.id + '">'
        + '<div class="da-card-top" onclick="window._toggleCard(\'' + c.id + '\')">'
        + '  <div class="da-card-left"><div class="da-card-avatar">' + initials(c.full_name) + '</div>'
        + '  <div><div class="da-card-name">' + (c.full_name || 'Unknown') + '</div><div class="da-card-sub">' + (c.email || '') + (c.phone ? ' &middot; ' + c.phone : '') + '</div></div></div>'
        + '  <div class="da-card-right">'
        + '    <div class="da-stage-pill" style="color:' + stage.color + ';border-color:' + stage.color + ';background:' + stage.color + '18">' + stage.label + '</div>'
        + '    <div class="da-card-investment">' + inv + '</div>'
        + '    <div class="da-card-date">' + formatDate(c.created_at) + '</div>'
        + '    <div class="da-expand-icon" id="exp-' + c.id + '">&#9660;</div>'
        + '  </div>'
        + '</div>'
        + '<div class="da-card-details" id="det-' + c.id + '">'
        + '  <div class="da-details-grid">'
        + '    <div class="da-detail-item"><div class="da-detail-label">Service</div><div class="da-detail-value">' + serviceLabel(c.project_type) + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Investment</div><div class="da-detail-value">' + (inv || '—') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Address</div><div class="da-detail-value">' + [c.street, c.city, c.state, c.zip].filter(Boolean).join(', ') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Referral</div><div class="da-detail-value">' + (c.referral || '—') + '</div></div>'
        + '    <div class="da-detail-item" style="grid-column:1/-1"><div class="da-detail-label">Notes</div><div class="da-detail-value">' + (c.notes || '—') + '</div></div>'
        + '  </div>'
        + '  <div class="da-card-actions">'
        + '    <div class="da-section-divider">Internal Pipeline</div>'
        + '    <div class="da-action-row"><select class="da-select" id="psel-' + c.id + '">' + pOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'status\', \'psel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Client Timeline</div>'
        + '    <div class="da-action-row"><select class="da-select" id="csel-' + c.id + '">' + cOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_stage\', \'csel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Contract &amp; Payment</div>'
        + '    <div class="da-action-row"><div class="da-action-label">Contract</div><select class="da-select" id="contractsel-' + c.id + '">' + contractOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'contract_status\', \'contractsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Payment</div><select class="da-select" id="paymentsel-' + c.id + '">' + paymentOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'payment_status\', \'paymentsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Client Drive Links</div>'
        + '    <div class="da-action-row"><div class="da-action-label">Design Folder</div><input class="da-text-input" id="dlink-design-' + c.id + '" type="text" placeholder="Paste Google Drive link..." value="' + (c.drive_design_link || '') + '" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Permit Folder</div><input class="da-text-input" id="dlink-permit-' + c.id + '" type="text" placeholder="Paste Google Drive link..." value="' + (c.drive_permit_link || '') + '" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Construction</div><input class="da-text-input" id="dlink-construction-' + c.id + '" type="text" placeholder="Paste Google Drive link..." value="' + (c.drive_construction_link || '') + '" /></div>'
        + '    <div class="da-action-row"><button class="da-update-btn" onclick="window._updateDriveLinks(\'' + c.id + '\')">Save Drive Links</button></div>'
        + '    <div class="da-action-row" style="margin-top:4px"><a class="da-email-link" href="mailto:' + (c.email || '') + '">Email Client</a></div>'
        + '  </div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  window._toggleCard = function(id) {
    var det = document.getElementById('det-' + id);
    var exp = document.getElementById('exp-' + id);
    if (det.classList.contains('visible')) { det.classList.remove('visible'); exp.classList.remove('open'); }
    else { det.classList.add('visible'); exp.classList.add('open'); }
  };

  window._updateField = async function(id, field, selectId) {
    var val = document.getElementById(selectId).value;
    try {
      var body = {}; body[field] = val;
      await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify(body) });
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c[field] = val;
      if (field === 'status') {
        var stage = getPipelineStage(val);
        var card = document.getElementById('card-' + id);
        if (card) { var pill = card.querySelector('.da-stage-pill'); if (pill) { pill.textContent = stage.label; pill.style.color = stage.color; pill.style.borderColor = stage.color; pill.style.background = stage.color + '18'; } }
        updateStats();
      }
      flashSaved(selectId);
    } catch(e) {}
  };

  window._updateDriveLinks = async function(id) {
    var design = document.getElementById('dlink-design-' + id).value.trim();
    var permit = document.getElementById('dlink-permit-' + id).value.trim();
    var construction = document.getElementById('dlink-construction-' + id).value.trim();
    try {
      await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ drive_design_link: design || null, drive_permit_link: permit || null, drive_construction_link: construction || null }) });
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) { c.drive_design_link = design; c.drive_permit_link = permit; c.drive_construction_link = construction; }
      var card = document.getElementById('card-' + id);
      if (card) { var btn = card.querySelector('[onclick*="_updateDriveLinks"]'); if (btn) { btn.textContent = 'Saved!'; btn.style.background = 'var(--success)'; setTimeout(function() { btn.textContent = 'Save Drive Links'; btn.style.background = 'var(--gold)'; }, 2000); } }
    } catch(e) {}
  };

  function flashSaved(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var btn = sel.nextElementSibling;
    if (!btn || btn.tagName !== 'BUTTON') return;
    var orig = btn.textContent;
    btn.textContent = 'Saved!'; btn.style.background = 'var(--success)';
    setTimeout(function() { if (btn) { btn.textContent = orig; btn.style.background = 'var(--gold)'; } }, 2000);
  }

  function applyFilters() {
    var q = document.getElementById('daSearch').value.toLowerCase();
    var stage = document.getElementById('daFilter').value;
    renderCards(allClients.filter(function(c) {
      var mq = !q || (c.full_name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q) || (c.phone || '').toLowerCase().includes(q);
      var ms = !stage || c.status === stage || (!c.status && stage === 'client_inquiry_made');
      return mq && ms;
    }));
  }
  document.getElementById('daSearch').addEventListener('input', applyFilters);
  document.getElementById('daFilter').addEventListener('change', applyFilters);

  // ── CHECKLIST TAB ─────────────────────────────────────────────────
  async function loadAllChecklists() {
    try {
      var [checkRes, noteRes] = await Promise.all([
        apiFetch('/rest/v1/checklist_items?select=*'),
        apiFetch('/rest/v1/client_notes?select=*')
      ]);
      var checks = await checkRes.json();
      var notes = await noteRes.json();
      allChecklists = {};
      allNotes = {};
      if (checks) checks.forEach(function(c) {
        if (!allChecklists[c.client_id]) allChecklists[c.client_id] = {};
        allChecklists[c.client_id][c.item_key] = c.completed;
      });
      if (notes) notes.forEach(function(n) {
        if (!allNotes[n.client_id]) allNotes[n.client_id] = {};
        allNotes[n.client_id][n.note_key] = n.content;
      });
      renderChecklistTab(allClients);
    } catch(e) {}
  }

  function renderChecklistTab(clients) {
    var container = document.getElementById('daChecklistWrap');
    if (!clients.length) { container.innerHTML = '<div class="da-empty">No clients yet</div>'; return; }

    var CHECKLIST_KEYS = ['goals', 'inspo', 'photos', 'survey', 'bylaws', 'houseplans'];

    container.innerHTML = clients.map(function(c) {
      var clientChecks = allChecklists[c.id] || {};
      var clientNotes = allNotes[c.id] || {};
      var doneCount = CHECKLIST_KEYS.filter(function(k) { return clientChecks[k]; }).length;

      var items = CHECKLIST_KEYS.map(function(key) {
        var done = clientChecks[key] === true;
        var note = clientNotes[key] || '';
        return '<div class="da-check-row">'
          + '<div class="da-check-dot' + (done ? ' done' : '') + '"></div>'
          + '<div style="flex:1">'
          + '  <div class="da-check-row-label">' + (CHECKLIST_LABELS[key] || key) + (done ? ' <span style="color:var(--success);font-size:10px">✓</span>' : '') + '</div>'
          + (note ? '<div class="da-check-row-note">' + note + '</div>' : '')
          + '</div>'
          + '</div>';
      }).join('');

      return '<div class="da-client-checklist">'
        + '<div class="da-client-checklist-header" onclick="window._toggleClientChecklist(\'' + c.id + '\')">'
        + '  <div class="da-client-checklist-name">' + (c.full_name || 'Unknown') + ' <span style="font-size:10px;color:var(--muted);">' + (c.email || '') + '</span></div>'
        + '  <div class="da-client-checklist-progress"><span>' + doneCount + '</span> / ' + CHECKLIST_KEYS.length + ' complete</div>'
        + '</div>'
        + '<div class="da-client-checklist-body" id="client-checklist-' + c.id + '">' + items + '</div>'
        + '</div>';
    }).join('');
  }

  window._toggleClientChecklist = function(id) {
    var body = document.getElementById('client-checklist-' + id);
    if (body) body.classList.toggle('visible');
  };

  document.getElementById('daCheckSearch').addEventListener('input', function() {
    var q = this.value.toLowerCase();
    var filtered = allClients.filter(function(c) { return (c.full_name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q); });
    renderChecklistTab(filtered);
  });

  // ── MESSAGES ─────────────────────────────────────────────────────
  async function loadMessages() {
    try {
      var res = await apiFetch('/rest/v1/messages?order=created_at.asc&limit=200');
      allMessages = await res.json();
      renderMessages();
    } catch(e) {}
  }

  function renderMessages() {
    var container = document.getElementById('daMsgList');
    if (!allMessages || !allMessages.length) { container.innerHTML = '<div class="da-empty">No messages yet</div>'; return; }
    var groups = {};
    allMessages.forEach(function(m) {
      var key = m.client_id || m.sender || 'unknown';
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    container.innerHTML = Object.keys(groups).map(function(key) {
      var msgs = groups[key];
      var latest = msgs[msgs.length - 1];
      var client = allClients.find(function(c) { return c.id === key || c.email === msgs[0].sender; });
      var name = client ? client.full_name : (msgs[0].sender || 'Unknown');
      var clientId = client ? client.id : key;
      var hasUnread = msgs.some(function(m) { return !m.is_read && m.sender !== 'daydream_team'; });
      var threadHtml = msgs.map(function(m) {
        var isTeam = m.sender === 'daydream_team';
        return '<div style="display:flex;flex-direction:column;margin-bottom:8px;align-items:' + (isTeam ? 'flex-end' : 'flex-start') + '"><div class="da-msg-bubble ' + (isTeam ? 'team' : 'client') + '">' + m.content + '</div><div style="font-size:9px;color:var(--muted);margin-top:2px' + (isTeam ? ';text-align:right' : '') + '">' + (isTeam ? 'Daydream Team' : name) + ' &middot; ' + formatDate(m.created_at) + '</div></div>';
      }).join('');
      return '<div class="da-msg-card' + (hasUnread ? ' unread' : '') + '"><div style="cursor:pointer" onclick="window._toggleThread(\'' + clientId + '\')"><div class="da-msg-client">' + name + '</div><div class="da-msg-preview">' + (latest.content || '').substring(0, 100) + '</div><div class="da-msg-meta">' + msgs.length + ' message(s) &middot; ' + formatDate(latest.created_at) + '</div></div><div class="da-msg-thread" id="thread-' + clientId + '"><div style="max-height:300px;overflow-y:auto;padding:8px 0">' + threadHtml + '</div><div class="da-msg-reply"><textarea id="reply-' + clientId + '" placeholder="Type your reply..."></textarea><button class="da-reply-btn" onclick="window._sendReply(\'' + clientId + '\', \'' + (msgs[0].project_id || '') + '\')">Send</button></div></div></div>';
    }).join('');
  }

  window._toggleThread = function(id) { var t = document.getElementById('thread-' + id); if (t) t.classList.toggle('visible'); };

  window._sendReply = async function(clientId, projectId) {
    var textarea = document.getElementById('reply-' + clientId);
    var content = textarea ? textarea.value.trim() : '';
    if (!content) return;
    try {
      await apiFetch('/rest/v1/messages', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_id: projectId || null, client_id: clientId || null, sender: 'daydream_team', content: content, is_read: true }) });
      textarea.value = '';
      await loadMessages();
    } catch(e) {}
  };

})();
