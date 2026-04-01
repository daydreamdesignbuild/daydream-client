(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var ADMIN_PASSWORD = 'Daydream2026!';

  var STAGES = [
    'client_inquiry_made',
    'client_qualified',
    'discovery_call_booked',
    'discovery_call_completed',
    'design_proposal_drafting',
    'design_proposal_presented',
    'design_proposal_accepted',
    'site_consultation_scheduled',
    'site_consultation_completed',
    'design_phase_started',
    'base_map_complete',
    'base_map_discussion_call',
    'base_map_approved',
    '3d_model_completed',
    '3d_model_discussion_call',
    '3d_model_approved',
    'visualizations_started',
    'visualizations_completed',
    'visualizations_approved',
    'construction_document_phase_started',
    'construction_document_phase_complete',
    'permit_plans_submitted',
    'permit_plan_revisions',
    'permit_plans_approved',
    'construction_started',
    'construction_finished',
    'site_photos_to_be_made',
    'site_photos_finished',
    'project_complete'
  ];

  var STAGE_LABELS = {
    'client_inquiry_made': 'Client Inquiry Made',
    'client_qualified': 'Client Qualified',
    'discovery_call_booked': 'Discovery Call Booked',
    'discovery_call_completed': 'Discovery Call Completed',
    'design_proposal_drafting': 'Design Proposal Drafting',
    'design_proposal_presented': 'Design Proposal Presented',
    'design_proposal_accepted': 'Design Proposal Accepted',
    'site_consultation_scheduled': 'Site Consultation Scheduled',
    'site_consultation_completed': 'Site Consultation Completed',
    'design_phase_started': 'Design Phase Started',
    'base_map_complete': 'Base Map Complete',
    'base_map_discussion_call': 'Base Map Discussion Call',
    'base_map_approved': 'Base Map Approved',
    '3d_model_completed': '3D Model Completed',
    '3d_model_discussion_call': '3D Model Discussion Call',
    '3d_model_approved': '3D Model Approved',
    'visualizations_started': 'Visualizations Started',
    'visualizations_completed': 'Visualizations Completed',
    'visualizations_approved': 'Visualizations Approved',
    'construction_document_phase_started': 'Construction Document Phase Started',
    'construction_document_phase_complete': 'Construction Document Phase Complete',
    'permit_plans_submitted': 'Permit Plans Submitted',
    'permit_plan_revisions': 'Permit Plan Revisions',
    'permit_plans_approved': 'Permit Plans Approved',
    'construction_started': 'Construction Started',
    'construction_finished': 'Construction Finished',
    'site_photos_to_be_made': 'Site Photos To Be Made',
    'site_photos_finished': 'Site Photos Finished',
    'project_complete': 'Project Complete'
  };

  var STAGE_COLORS = {
    'client_inquiry_made': '#8a8680',
    'client_qualified': '#eeb24a',
    'discovery_call_booked': '#eeb24a',
    'discovery_call_completed': '#eeb24a',
    'design_proposal_drafting': '#7a9e8a',
    'design_proposal_presented': '#7a9e8a',
    'design_proposal_accepted': '#6a9e7a',
    'site_consultation_scheduled': '#7a9e8a',
    'site_consultation_completed': '#6a9e7a',
    'design_phase_started': '#5a8e9e',
    'base_map_complete': '#5a8e9e',
    'base_map_discussion_call': '#5a8e9e',
    'base_map_approved': '#4a7e8e',
    '3d_model_completed': '#5a7e9e',
    '3d_model_discussion_call': '#5a7e9e',
    '3d_model_approved': '#4a6e8e',
    'visualizations_started': '#7a6e9e',
    'visualizations_completed': '#7a6e9e',
    'visualizations_approved': '#6a5e8e',
    'construction_document_phase_started': '#9e7a5a',
    'construction_document_phase_complete': '#8e6a4a',
    'permit_plans_submitted': '#9e6a5a',
    'permit_plan_revisions': '#c07a6a',
    'permit_plans_approved': '#6a9e7a',
    'construction_started': '#eeb24a',
    'construction_finished': '#6a9e7a',
    'site_photos_to_be_made': '#8a8680',
    'site_photos_finished': '#6a9e7a',
    'project_complete': '#eeb24a'
  };

  // ── FONTS ─────────────────────────────────────────────────────────
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap';
  document.head.appendChild(font);

  // ── STYLES ────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#dd-admin * { box-sizing: border-box; margin: 0; padding: 0; }',
    '#dd-admin { --bg: #0d0d0b; --surface: #131310; --surface-2: #181815; --border: #252520; --text: #f0ebe0; --muted: #8a8680; --gold: #eeb24a; --gold-dim: rgba(238,178,74,0.08); --error: #c07a6a; --success: #6a9e7a; font-family: Jost, sans-serif; font-weight: 300; background: var(--bg); color: var(--text); min-height: 100vh; width: 100%; }',

    // Login
    '#dd-admin .da-login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }',
    '#dd-admin .da-login-card { width: 100%; max-width: 400px; border: 1px solid var(--border); background: var(--surface); }',
    '#dd-admin .da-login-header { background: var(--bg); border-bottom: 3px solid var(--gold); padding: 28px 32px; text-align: center; }',
    '#dd-admin .da-login-logo { font-family: "Cormorant Garamond", serif; font-size: 26px; font-weight: 400; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 4px; }',
    '#dd-admin .da-login-sub { font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--muted); }',
    '#dd-admin .da-login-body { padding: 28px 32px; }',
    '#dd-admin .da-input-wrap { border: 1px solid var(--border); background: var(--surface-2); margin-bottom: 12px; transition: border-color 0.2s; }',
    '#dd-admin .da-input-wrap:focus-within { border-color: var(--gold); }',
    '#dd-admin .da-input-wrap:focus-within::after { content: ""; display: block; height: 2px; background: var(--gold); }',
    '#dd-admin .da-input-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); padding: 10px 14px 3px; display: block; }',
    '#dd-admin .da-input { width: 100%; background: transparent; border: none; outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 13px; font-weight: 300; padding: 3px 14px 10px; }',
    '#dd-admin .da-btn { width: 100%; background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: Jost, sans-serif; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px; cursor: pointer; transition: background 0.3s, color 0.3s; margin-top: 8px; }',
    '#dd-admin .da-btn:hover { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-error { font-size: 11px; color: var(--error); text-align: center; margin-top: 10px; display: none; }',
    '#dd-admin .da-error.visible { display: block; }',

    // Dashboard
    '#dd-admin .da-dashboard { display: none; min-height: 100vh; flex-direction: column; }',
    '#dd-admin .da-dashboard.visible { display: flex; }',

    // Nav
    '#dd-admin .da-nav { background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 200; }',
    '#dd-admin .da-nav-left { display: flex; align-items: center; gap: 20px; }',
    '#dd-admin .da-nav-logo { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 400; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; }',
    '#dd-admin .da-nav-badge { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--bg); background: var(--gold); padding: 3px 8px; }',
    '#dd-admin .da-nav-right { display: flex; align-items: center; gap: 16px; }',
    '#dd-admin .da-nav-btn { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); cursor: pointer; background: none; border: none; transition: color 0.2s; }',
    '#dd-admin .da-nav-btn:hover { color: var(--gold); }',
    '#dd-admin .da-nav-btn.active { color: var(--gold); }',

    // Tabs
    '#dd-admin .da-tabs { background: var(--surface); border-bottom: 1px solid var(--border); display: flex; padding: 0 24px; }',
    '#dd-admin .da-tab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 14px 18px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; background: none; border-left: none; border-right: none; border-top: none; white-space: nowrap; }',
    '#dd-admin .da-tab:hover { color: var(--text); }',
    '#dd-admin .da-tab.active { color: var(--gold); border-bottom-color: var(--gold); }',

    // Tab content
    '#dd-admin .da-tab-content { display: none; flex: 1; }',
    '#dd-admin .da-tab-content.active { display: block; }',

    // Stats bar
    '#dd-admin .da-stats { display: flex; gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-stat { background: var(--surface); padding: 16px 24px; flex: 1; }',
    '#dd-admin .da-stat-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }',
    '#dd-admin .da-stat-value { font-family: "Cormorant Garamond", serif; font-size: 24px; color: var(--gold); font-weight: 400; }',

    // Kanban
    '#dd-admin .da-kanban { display: flex; gap: 0; overflow-x: auto; padding: 20px; flex: 1; align-items: flex-start; }',
    '#dd-admin .da-kanban::-webkit-scrollbar { height: 6px; }',
    '#dd-admin .da-kanban::-webkit-scrollbar-track { background: var(--bg); }',
    '#dd-admin .da-kanban::-webkit-scrollbar-thumb { background: var(--border); }',
    '#dd-admin .da-column { min-width: 220px; max-width: 220px; background: var(--surface); border: 1px solid var(--border); margin-right: 12px; flex-shrink: 0; }',
    '#dd-admin .da-column-header { padding: 12px 14px; border-bottom: 1px solid var(--border); background: var(--surface-2); display: flex; align-items: center; justify-content: space-between; }',
    '#dd-admin .da-column-title { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text); }',
    '#dd-admin .da-column-count { font-size: 10px; color: var(--muted); background: var(--bg); padding: 2px 7px; border-radius: 10px; }',
    '#dd-admin .da-column-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }',
    '#dd-admin .da-cards-list { padding: 10px; min-height: 60px; }',
    '#dd-admin .da-card { background: var(--bg); border: 1px solid var(--border); padding: 12px; margin-bottom: 8px; cursor: grab; transition: border-color 0.2s, transform 0.1s; }',
    '#dd-admin .da-card:hover { border-color: var(--gold); }',
    '#dd-admin .da-card.dragging { opacity: 0.5; transform: rotate(2deg); cursor: grabbing; }',
    '#dd-admin .da-card-name { font-size: 12px; color: var(--text); margin-bottom: 4px; font-weight: 400; }',
    '#dd-admin .da-card-service { font-size: 9px; color: var(--muted); letter-spacing: 0.05em; margin-bottom: 6px; }',
    '#dd-admin .da-card-meta { display: flex; align-items: center; justify-content: space-between; }',
    '#dd-admin .da-card-date { font-size: 9px; color: var(--muted); }',
    '#dd-admin .da-card-investment { font-size: 9px; color: var(--gold); }',
    '#dd-admin .da-column.drag-over { border-color: var(--gold); background: var(--gold-dim); }',

    // Clients list
    '#dd-admin .da-clients-wrap { padding: 24px; }',
    '#dd-admin .da-clients-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }',
    '#dd-admin .da-section-title { font-family: "Cormorant Garamond", serif; font-size: 24px; font-weight: 300; color: var(--text); }',
    '#dd-admin .da-search { background: var(--surface); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 16px; outline: none; width: 240px; transition: border-color 0.2s; }',
    '#dd-admin .da-search:focus { border-color: var(--gold); }',
    '#dd-admin .da-search::placeholder { color: var(--muted); }',
    '#dd-admin .da-table { width: 100%; border-collapse: collapse; background: var(--surface); border: 1px solid var(--border); }',
    '#dd-admin .da-table th { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--border); background: var(--surface-2); }',
    '#dd-admin .da-table td { font-size: 12px; color: var(--text); padding: 12px 16px; border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-table tr:last-child td { border-bottom: none; }',
    '#dd-admin .da-table tr:hover td { background: var(--gold-dim); }',
    '#dd-admin .da-status-badge { font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; padding: 3px 8px; border-radius: 0; display: inline-block; }',

    // Client detail modal
    '#dd-admin .da-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 300; display: none; align-items: center; justify-content: center; padding: 20px; }',
    '#dd-admin .da-modal-overlay.visible { display: flex; }',
    '#dd-admin .da-modal { background: var(--surface); border: 1px solid var(--border); width: 100%; max-width: 600px; max-height: 80vh; overflow-y: auto; }',
    '#dd-admin .da-modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--surface-2); position: sticky; top: 0; }',
    '#dd-admin .da-modal-title { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 300; color: var(--gold); }',
    '#dd-admin .da-modal-close { background: none; border: none; color: var(--muted); font-size: 18px; cursor: pointer; transition: color 0.2s; }',
    '#dd-admin .da-modal-close:hover { color: var(--text); }',
    '#dd-admin .da-modal-body { padding: 24px; }',
    '#dd-admin .da-modal-row { display: flex; gap: 0; margin-bottom: 1px; }',
    '#dd-admin .da-modal-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 10px 14px; background: var(--surface-2); width: 140px; flex-shrink: 0; }',
    '#dd-admin .da-modal-value { font-size: 12px; color: var(--text); padding: 10px 14px; background: var(--bg); flex: 1; }',
    '#dd-admin .da-modal-section { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin: 20px 0 8px; }',
    '#dd-admin .da-stage-select { width: 100%; background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 10px 14px; outline: none; cursor: pointer; margin-top: 16px; appearance: none; }',
    '#dd-admin .da-stage-select:focus { border-color: var(--gold); }',
    '#dd-admin .da-save-btn { width: 100%; background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px; cursor: pointer; margin-top: 12px; transition: opacity 0.2s; }',
    '#dd-admin .da-save-btn:hover { opacity: 0.85; }',

    // Messages
    '#dd-admin .da-messages-wrap { padding: 24px; }',
    '#dd-admin .da-msg-list { display: flex; flex-direction: column; gap: 12px; }',
    '#dd-admin .da-msg-card { background: var(--surface); border: 1px solid var(--border); padding: 16px 20px; cursor: pointer; transition: border-color 0.2s; }',
    '#dd-admin .da-msg-card:hover { border-color: var(--gold); }',
    '#dd-admin .da-msg-card.unread { border-left: 3px solid var(--gold); }',
    '#dd-admin .da-msg-client { font-size: 13px; color: var(--text); font-weight: 400; margin-bottom: 4px; }',
    '#dd-admin .da-msg-preview { font-size: 11px; color: var(--muted); }',
    '#dd-admin .da-msg-time { font-size: 9px; color: var(--muted); margin-top: 6px; }',

    '@keyframes daFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '#dd-admin .da-login-wrap { animation: daFadeUp 0.7s ease both; }',
    '@media (max-width: 600px) { #dd-admin .da-stats { flex-direction: column; } #dd-admin .da-nav { padding: 0 16px; } }'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-admin');
  if (!wrap) return;

  wrap.innerHTML = [
    // LOGIN
    '<div id="daLoginWrap" class="da-login-wrap">',
    '  <div class="da-login-card">',
    '    <div class="da-login-header">',
    '      <div class="da-login-logo">Daydream</div>',
    '      <div class="da-login-sub">Admin Dashboard</div>',
    '    </div>',
    '    <div class="da-login-body">',
    '      <div class="da-input-wrap"><label class="da-input-label">Password</label><input class="da-input" type="password" id="daPassword" placeholder="Enter admin password" /></div>',
    '      <button class="da-btn" id="daLoginBtn">Sign In</button>',
    '      <div class="da-error" id="daLoginError">Incorrect password. Please try again.</div>',
    '    </div>',
    '  </div>',
    '</div>',

    // DASHBOARD
    '<div id="daDashboard" class="da-dashboard">',
    '  <nav class="da-nav">',
    '    <div class="da-nav-left">',
    '      <div class="da-nav-logo">Daydream</div>',
    '      <div class="da-nav-badge">Admin</div>',
    '    </div>',
    '    <div class="da-nav-right">',
    '      <button class="da-nav-btn" id="daLogoutBtn">Sign Out</button>',
    '    </div>',
    '  </nav>',
    '  <div class="da-tabs">',
    '    <button class="da-tab active" data-tab="pipeline">Pipeline</button>',
    '    <button class="da-tab" data-tab="clients">Clients</button>',
    '    <button class="da-tab" data-tab="messages">Messages</button>',
    '  </div>',

    // Stats
    '  <div class="da-stats">',
    '    <div class="da-stat"><div class="da-stat-label">Total Leads</div><div class="da-stat-value" id="daStatTotal">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Active Projects</div><div class="da-stat-value" id="daStatActive">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Completed</div><div class="da-stat-value" id="daStatComplete">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">New This Month</div><div class="da-stat-value" id="daStatMonth">—</div></div>',
    '  </div>',

    // PIPELINE TAB
    '  <div class="da-tab-content active" id="tab-pipeline">',
    '    <div class="da-kanban" id="daKanban"></div>',
    '  </div>',

    // CLIENTS TAB
    '  <div class="da-tab-content" id="tab-clients">',
    '    <div class="da-clients-wrap">',
    '      <div class="da-clients-header">',
    '        <div class="da-section-title">All Clients</div>',
    '        <input class="da-search" type="text" id="daSearch" placeholder="Search clients..." />',
    '      </div>',
    '      <table class="da-table">',
    '        <thead><tr>',
    '          <th>Name</th><th>Email</th><th>Service</th><th>Investment</th><th>Status</th><th>Date</th>',
    '        </tr></thead>',
    '        <tbody id="daClientsTable"></tbody>',
    '      </table>',
    '    </div>',
    '  </div>',

    // MESSAGES TAB
    '  <div class="da-tab-content" id="tab-messages">',
    '    <div class="da-messages-wrap">',
    '      <div class="da-section-title" style="margin-bottom:20px">Client Messages</div>',
    '      <div class="da-msg-list" id="daMsgList"></div>',
    '    </div>',
    '  </div>',

    '</div>',

    // CLIENT MODAL
    '<div class="da-modal-overlay" id="daModal">',
    '  <div class="da-modal">',
    '    <div class="da-modal-header">',
    '      <div class="da-modal-title" id="daModalTitle">Client Details</div>',
    '      <button class="da-modal-close" id="daModalClose">&times;</button>',
    '    </div>',
    '    <div class="da-modal-body" id="daModalBody"></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var clients = [];
  var draggedCard = null;
  var draggedClientId = null;

  // ── HELPERS ───────────────────────────────────────────────────────
  function apiFetch(path, options) {
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SUPABASE_KEY;
    opts.headers['Authorization'] = 'Bearer ' + SUPABASE_KEY;
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SUPABASE_URL + path, opts);
  }

  function formatDate(str) {
    if (!str) return '—';
    return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function serviceLabel(key) {
    var map = { '2d_concept': '2D Concept', '3d_concept': '3D Concept', '2d_3d_concept': '2D + 3D Concept', 'permit_plan': 'Permit Plan', '2d_3d_permit': '2D + 3D + Permit' };
    return map[key] || key || '—';
  }

  function getStageLabel(status) {
    return STAGE_LABELS[status] || status || 'New Inquiry';
  }

  // ── LOGIN ─────────────────────────────────────────────────────────
  document.getElementById('daLoginBtn').addEventListener('click', function() {
    var pwd = document.getElementById('daPassword').value;
    var err = document.getElementById('daLoginError');
    if (pwd === ADMIN_PASSWORD) {
      try { sessionStorage.setItem('dd_admin', '1'); } catch(e) {}
      document.getElementById('daLoginWrap').style.display = 'none';
      document.getElementById('daDashboard').classList.add('visible');
      loadAll();
    } else {
      err.classList.add('visible');
    }
  });

  document.getElementById('daPassword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('daLoginBtn').click();
  });

  document.getElementById('daLogoutBtn').addEventListener('click', function() {
    try { sessionStorage.removeItem('dd_admin'); } catch(e) {}
    document.getElementById('daDashboard').classList.remove('visible');
    document.getElementById('daLoginWrap').style.display = 'flex';
  });

  // Auto login if session exists
  try {
    if (sessionStorage.getItem('dd_admin') === '1') {
      document.getElementById('daLoginWrap').style.display = 'none';
      document.getElementById('daDashboard').classList.add('visible');
      loadAll();
    }
  } catch(e) {}

  // ── TABS ──────────────────────────────────────────────────────────
  document.querySelectorAll('#dd-admin .da-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ── LOAD ALL DATA ─────────────────────────────────────────────────
  async function loadAll() {
    try {
      var res = await apiFetch('/rest/v1/clients?order=created_at.desc');
      clients = await res.json();
      updateStats();
      renderKanban();
      renderClientsTable(clients);
      loadMessages();
    } catch(e) { console.error('Load error:', e); }
  }

  function updateStats() {
    document.getElementById('daStatTotal').textContent = clients.length;
    var active = clients.filter(function(c) { return c.status && c.status !== 'new_lead' && c.status !== 'project_complete'; }).length;
    var complete = clients.filter(function(c) { return c.status === 'project_complete'; }).length;
    var thisMonth = clients.filter(function(c) {
      var d = new Date(c.created_at);
      var now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    document.getElementById('daStatActive').textContent = active;
    document.getElementById('daStatComplete').textContent = complete;
    document.getElementById('daStatMonth').textContent = thisMonth;
  }

  // ── KANBAN ────────────────────────────────────────────────────────
  function renderKanban() {
    var board = document.getElementById('daKanban');
    board.innerHTML = '';

    STAGES.forEach(function(stage) {
      var stageClients = clients.filter(function(c) {
        if (stage === 'client_inquiry_made') return !c.status || c.status === 'new_lead' || c.status === 'client_inquiry_made';
        return c.status === stage;
      });

      var color = STAGE_COLORS[stage] || '#8a8680';
      var col = document.createElement('div');
      col.className = 'da-column';
      col.dataset.stage = stage;

      var cardsHtml = stageClients.map(function(c) {
        return '<div class="da-card" draggable="true" data-id="' + c.id + '">'
          + '<div class="da-card-name">' + (c.full_name || 'Unknown') + '</div>'
          + '<div class="da-card-service">' + serviceLabel(c.project_type) + '</div>'
          + '<div class="da-card-meta">'
          + '<div class="da-card-date">' + formatDate(c.created_at) + '</div>'
          + '<div class="da-card-investment">' + (c.investment ? '$' + c.investment.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '') + '</div>'
          + '</div>'
          + '</div>';
      }).join('');

      col.innerHTML = '<div class="da-column-header">'
        + '<div style="display:flex;align-items:center;gap:8px"><div class="da-column-dot" style="background:' + color + '"></div><div class="da-column-title">' + STAGE_LABELS[stage] + '</div></div>'
        + '<div class="da-column-count">' + stageClients.length + '</div>'
        + '</div>'
        + '<div class="da-cards-list" data-stage="' + stage + '">' + cardsHtml + '</div>';

      board.appendChild(col);

      // Drag events on cards
      col.querySelectorAll('.da-card').forEach(function(card) {
        card.addEventListener('dragstart', function(e) {
          draggedCard = card;
          draggedClientId = card.dataset.id;
          card.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });
        card.addEventListener('dragend', function() {
          card.classList.remove('dragging');
          draggedCard = null;
        });
        card.addEventListener('click', function() {
          openClientModal(card.dataset.id);
        });
      });

      // Drop events on columns
      col.addEventListener('dragover', function(e) {
        e.preventDefault();
        col.classList.add('drag-over');
      });
      col.addEventListener('dragleave', function() {
        col.classList.remove('drag-over');
      });
      col.addEventListener('drop', async function(e) {
        e.preventDefault();
        col.classList.remove('drag-over');
        if (!draggedClientId) return;
        var newStage = stage;
        try {
          await apiFetch('/rest/v1/clients?id=eq.' + draggedClientId, {
            method: 'PATCH',
            headers: { 'Prefer': 'return=minimal' },
            body: JSON.stringify({ status: newStage })
          });
          var c = clients.find(function(x) { return x.id === draggedClientId; });
          if (c) c.status = newStage;
          renderKanban();
          updateStats();
        } catch(err) { console.error('Update error:', err); }
      });
    });
  }

  // ── CLIENTS TABLE ─────────────────────────────────────────────────
  function renderClientsTable(data) {
    var tbody = document.getElementById('daClientsTable');
    if (!data || !data.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:32px">No clients yet</td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function(c) {
      var color = STAGE_COLORS[c.status] || '#8a8680';
      return '<tr style="cursor:pointer" onclick="document.getElementById(\'daModal\').dataset.clientId=\'' + c.id + '\'; window._openClientModal(\'' + c.id + '\')">'
        + '<td>' + (c.full_name || '—') + '</td>'
        + '<td>' + (c.email || '—') + '</td>'
        + '<td>' + serviceLabel(c.project_type) + '</td>'
        + '<td>' + (c.investment || '—') + '</td>'
        + '<td><span class="da-status-badge" style="background:' + color + '22;color:' + color + ';border:1px solid ' + color + '">' + getStageLabel(c.status) + '</span></td>'
        + '<td>' + formatDate(c.created_at) + '</td>'
        + '</tr>';
    }).join('');
  }

  window._openClientModal = function(id) { openClientModal(id); };

  // Search
  document.getElementById('daSearch').addEventListener('input', function() {
    var q = this.value.toLowerCase();
    var filtered = clients.filter(function(c) {
      return (c.full_name || '').toLowerCase().includes(q)
        || (c.email || '').toLowerCase().includes(q)
        || (c.phone || '').toLowerCase().includes(q);
    });
    renderClientsTable(filtered);
  });

  // ── CLIENT MODAL ──────────────────────────────────────────────────
  function openClientModal(id) {
    var c = clients.find(function(x) { return x.id === id; });
    if (!c) return;

    document.getElementById('daModalTitle').textContent = c.full_name || 'Client Details';

    var stageOptions = STAGES.map(function(s) {
      return '<option value="' + s + '"' + (c.status === s ? ' selected' : '') + '>' + STAGE_LABELS[s] + '</option>';
    }).join('');

    document.getElementById('daModalBody').innerHTML = [
      '<div class="da-modal-section">Contact Information</div>',
      '<div class="da-modal-row"><div class="da-modal-label">Full Name</div><div class="da-modal-value">' + (c.full_name || '—') + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Email</div><div class="da-modal-value">' + (c.email || '—') + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Phone</div><div class="da-modal-value">' + (c.phone || '—') + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Address</div><div class="da-modal-value">' + [c.street, c.city, c.state, c.zip].filter(Boolean).join(', ') + '</div></div>',
      '<div class="da-modal-section">Project Details</div>',
      '<div class="da-modal-row"><div class="da-modal-label">Service</div><div class="da-modal-value">' + serviceLabel(c.project_type) + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Investment</div><div class="da-modal-value">' + (c.investment || '—') + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Referral</div><div class="da-modal-value">' + (c.referral || '—') + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Notes</div><div class="da-modal-value">' + (c.notes || '—') + '</div></div>',
      '<div class="da-modal-row"><div class="da-modal-label">Date</div><div class="da-modal-value">' + formatDate(c.created_at) + '</div></div>',
      '<div class="da-modal-section">Pipeline Stage</div>',
      '<select class="da-stage-select" id="daStageSelect">' + stageOptions + '</select>',
      '<button class="da-save-btn" id="daSaveStage">Update Stage</button>'
    ].join('');

    document.getElementById('daSaveStage').addEventListener('click', async function() {
      var newStage = document.getElementById('daStageSelect').value;
      try {
        await apiFetch('/rest/v1/clients?id=eq.' + id, {
          method: 'PATCH',
          headers: { 'Prefer': 'return=minimal' },
          body: JSON.stringify({ status: newStage })
        });
        var client = clients.find(function(x) { return x.id === id; });
        if (client) client.status = newStage;
        renderKanban();
        renderClientsTable(clients);
        updateStats();
        this.textContent = 'Saved!';
        setTimeout(function() {
          var btn = document.getElementById('daSaveStage');
          if (btn) btn.textContent = 'Update Stage';
        }, 2000);
      } catch(err) { console.error('Save error:', err); }
    });

    document.getElementById('daModal').classList.add('visible');
  }

  document.getElementById('daModalClose').addEventListener('click', function() {
    document.getElementById('daModal').classList.remove('visible');
  });

  document.getElementById('daModal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('visible');
  });

  // ── MESSAGES ──────────────────────────────────────────────────────
  async function loadMessages() {
    try {
      var res = await apiFetch('/rest/v1/messages?order=created_at.desc&limit=50');
      var msgs = await res.json();
      var list = document.getElementById('daMsgList');
      if (!msgs || !msgs.length) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted);font-size:12px">No messages yet</div>';
        return;
      }
      // Group by project
      var grouped = {};
      msgs.forEach(function(m) {
        if (!grouped[m.project_id]) grouped[m.project_id] = [];
        grouped[m.project_id].push(m);
      });
      list.innerHTML = Object.keys(grouped).map(function(pid) {
        var projectMsgs = grouped[pid];
        var latest = projectMsgs[0];
        var unread = projectMsgs.some(function(m) { return !m.is_read; });
        return '<div class="da-msg-card' + (unread ? ' unread' : '') + '">'
          + '<div class="da-msg-client">' + (latest.sender || 'Client') + '</div>'
          + '<div class="da-msg-preview">' + (latest.content || '').substring(0, 80) + '...</div>'
          + '<div class="da-msg-time">' + formatDate(latest.created_at) + ' &middot; ' + projectMsgs.length + ' message(s)</div>'
          + '</div>';
      }).join('');
    } catch(e) { console.error('Messages error:', e); }
  }

})();
