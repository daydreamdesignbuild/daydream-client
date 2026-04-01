(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var ADMIN_PASSWORD = 'Daydream2026!';

  // Internal pipeline stages
  var PIPELINE_STAGES = [
    { value: 'client_inquiry_made',                   label: 'Client Inquiry Made' },
    { value: 'client_qualified',                       label: 'Client Qualified' },
    { value: 'discovery_call_booked',                  label: 'Discovery Call Booked' },
    { value: 'discovery_call_completed',               label: 'Discovery Call Completed' },
    { value: 'design_proposal_drafting',               label: 'Design Proposal Drafting' },
    { value: 'design_proposal_presented',              label: 'Design Proposal Presented' },
    { value: 'design_proposal_accepted',               label: 'Design Proposal Accepted' },
    { value: 'site_consultation_scheduled',            label: 'Site Consultation Scheduled' },
    { value: 'site_consultation_completed',            label: 'Site Consultation Completed' },
    { value: 'design_phase_started',                   label: 'Design Phase Started' },
    { value: 'base_map_complete',                      label: 'Base Map Complete' },
    { value: 'base_map_discussion_call',               label: 'Base Map Discussion Call' },
    { value: 'base_map_approved',                      label: 'Base Map Approved' },
    { value: '3d_model_completed',                     label: '3D Model Completed' },
    { value: '3d_model_discussion_call',               label: '3D Model Discussion Call' },
    { value: '3d_model_approved',                      label: '3D Model Approved' },
    { value: 'visualizations_started',                 label: 'Visualizations Started' },
    { value: 'visualizations_completed',               label: 'Visualizations Completed' },
    { value: 'visualizations_approved',                label: 'Visualizations Approved' },
    { value: 'construction_document_phase_started',    label: 'Construction Document Phase Started' },
    { value: 'construction_document_phase_complete',   label: 'Construction Document Phase Complete' },
    { value: 'permit_plans_submitted',                 label: 'Permit Plans Submitted' },
    { value: 'permit_plan_revisions',                  label: 'Permit Plan Revisions' },
    { value: 'permit_plans_approved',                  label: 'Permit Plans Approved' },
    { value: 'construction_started',                   label: 'Construction Started' },
    { value: 'construction_finished',                  label: 'Construction Finished' },
    { value: 'site_photos_to_be_made',                 label: 'Site Photos To Be Made' },
    { value: 'site_photos_finished',                   label: 'Site Photos Finished' },
    { value: 'project_complete',                       label: 'Project Complete' }
  ];

  var PIPELINE_COLORS = {
    'client_inquiry_made': '#8a8680', 'client_qualified': '#eeb24a',
    'discovery_call_booked': '#eeb24a', 'discovery_call_completed': '#eeb24a',
    'design_proposal_drafting': '#7a9e8a', 'design_proposal_presented': '#7a9e8a',
    'design_proposal_accepted': '#6a9e7a', 'site_consultation_scheduled': '#7a9e8a',
    'site_consultation_completed': '#6a9e7a', 'design_phase_started': '#5a8e9e',
    'base_map_complete': '#5a8e9e', 'base_map_discussion_call': '#5a8e9e',
    'base_map_approved': '#4a7e8e', '3d_model_completed': '#5a7e9e',
    '3d_model_discussion_call': '#5a7e9e', '3d_model_approved': '#4a6e8e',
    'visualizations_started': '#7a6e9e', 'visualizations_completed': '#7a6e9e',
    'visualizations_approved': '#6a5e8e', 'construction_document_phase_started': '#9e7a5a',
    'construction_document_phase_complete': '#8e6a4a', 'permit_plans_submitted': '#9e6a5a',
    'permit_plan_revisions': '#c07a6a', 'permit_plans_approved': '#6a9e7a',
    'construction_started': '#eeb24a', 'construction_finished': '#6a9e7a',
    'site_photos_to_be_made': '#8a8680', 'site_photos_finished': '#6a9e7a',
    'project_complete': '#eeb24a'
  };

  // Client-facing timeline stages
  var CLIENT_STAGES = [
    { value: 'inquiry_submitted',             label: 'Inquiry Submitted' },
    { value: 'discovery_call',                label: 'Discovery Call' },
    { value: 'design_proposal',               label: 'Design Proposal' },
    { value: 'contract_signed',               label: 'Contract Signed' },
    { value: 'concept_design_phase',          label: 'Concept Design Phase' },
    { value: 'design_review_revisions',       label: 'Design Review & Revisions' },
    { value: 'construction_document_phase',   label: 'Construction Document Phase' },
    { value: 'permit_submittal',              label: 'Permit Submittal' },
    { value: 'permit_design_revisions',       label: 'Permit Design Revisions' },
    { value: 'permit_approved',               label: 'Permit Approved' },
    { value: 'final_deliverables',            label: 'Final Deliverables' },
    { value: 'construction_start_scheduled',  label: 'Construction Start Date Scheduled' },
    { value: '50_percent_completion',         label: '50% Completion' },
    { value: '90_percent_completion',         label: '90% Completion' },
    { value: 'final_walk_through',            label: 'Final Walk Through' },
    { value: 'project_complete',              label: 'Project Complete' }
  ];

  function getPipelineColor(value) {
    return PIPELINE_COLORS[value] || '#8a8680';
  }

  function getPipelineLabel(value) {
    var s = PIPELINE_STAGES.find(function(x) { return x.value === value; });
    return s ? s.label : (value || 'New Inquiry');
  }

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
    '#dd-admin .da-toolbar { padding: 20px 32px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; border-bottom: 1px solid var(--border); background: var(--surface); }',
    '#dd-admin .da-search { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 16px; outline: none; flex: 1; min-width: 200px; transition: border-color 0.2s; }',
    '#dd-admin .da-search:focus { border-color: var(--gold); }',
    '#dd-admin .da-search::placeholder { color: var(--muted); }',
    '#dd-admin .da-filter { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 10px 16px; outline: none; cursor: pointer; appearance: none; min-width: 200px; }',
    '#dd-admin .da-filter:focus { border-color: var(--gold); }',
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
    '#dd-admin .da-card-actions { padding: 16px 20px; border-top: 1px solid var(--border); }',
    '#dd-admin .da-actions-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }',
    '#dd-admin .da-actions-row:last-child { margin-bottom: 0; }',
    '#dd-admin .da-action-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); width: 130px; flex-shrink: 0; }',
    '#dd-admin .da-select { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 8px 12px; outline: none; cursor: pointer; appearance: none; flex: 1; min-width: 160px; transition: border-color 0.2s; }',
    '#dd-admin .da-select:focus { border-color: var(--gold); }',
    '#dd-admin .da-update-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; padding: 9px 20px; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }',
    '#dd-admin .da-update-btn:hover { opacity: 0.85; }',
    '#dd-admin .da-email-link { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid var(--gold); padding: 8px 14px; white-space: nowrap; transition: background 0.2s, color 0.2s; }',
    '#dd-admin .da-email-link:hover { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-empty { text-align: center; padding: 60px 24px; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; }',
    '@keyframes daFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 700px) { #dd-admin .da-stats { flex-direction: column; } #dd-admin .da-nav { padding: 0 16px; } #dd-admin .da-toolbar { padding: 16px; } #dd-admin .da-cards-wrap { padding: 16px; } #dd-admin .da-details-grid { grid-template-columns: 1fr; } #dd-admin .da-card-right { gap: 6px; } }'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-admin');
  if (!wrap) return;

  var pipelineOptions = PIPELINE_STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

  var clientStageOptions = CLIENT_STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

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
    '  <nav class="da-nav">',
    '    <div style="display:flex;align-items:center"><div class="da-nav-logo">Daydream</div><div class="da-nav-badge">Admin</div></div>',
    '    <button class="da-nav-logout" id="daLogoutBtn">Sign Out</button>',
    '  </nav>',
    '  <div class="da-stats">',
    '    <div class="da-stat"><div class="da-stat-label">Total Leads</div><div class="da-stat-value" id="daStatTotal">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Active Projects</div><div class="da-stat-value" id="daStatActive">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Completed</div><div class="da-stat-value" id="daStatComplete">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">New This Month</div><div class="da-stat-value" id="daStatMonth">—</div></div>',
    '  </div>',
    '  <div class="da-toolbar">',
    '    <input class="da-search" type="text" id="daSearch" placeholder="Search by name, email or phone..." />',
    '    <select class="da-filter" id="daFilter">' + filterOptions + '</select>',
    '    <div class="da-count" id="daCount"></div>',
    '  </div>',
    '  <div class="da-cards-wrap" id="daCardsWrap"></div>',
    '</div>'
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var allClients = [];

  // ── HELPERS ───────────────────────────────────────────────────────
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
  function formatInvestment(inv) { if (!inv) return ''; var n = inv.replace(/[^0-9.]/g, ''); return n && !isNaN(n) ? '$' + Number(n).toLocaleString() : inv; }

  // ── LOGIN ─────────────────────────────────────────────────────────
  document.getElementById('daLoginBtn').addEventListener('click', function() {
    if (document.getElementById('daPassword').value === ADMIN_PASSWORD) {
      try { sessionStorage.setItem('dd_admin', '1'); } catch(e) {}
      document.getElementById('daLoginWrap').style.display = 'none';
      document.getElementById('daDashboard').classList.add('visible');
      loadClients();
    } else {
      document.getElementById('daLoginError').classList.add('visible');
    }
  });
  document.getElementById('daPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('daLoginBtn').click(); });
  document.getElementById('daLogoutBtn').addEventListener('click', function() {
    try { sessionStorage.removeItem('dd_admin'); } catch(e) {}
    document.getElementById('daDashboard').classList.remove('visible');
    document.getElementById('daLoginWrap').style.display = 'flex';
  });
  try { if (sessionStorage.getItem('dd_admin') === '1') { document.getElementById('daLoginWrap').style.display = 'none'; document.getElementById('daDashboard').classList.add('visible'); loadClients(); } } catch(e) {}

  // ── LOAD DATA ─────────────────────────────────────────────────────
  async function loadClients() {
    try {
      var res = await apiFetch('/rest/v1/clients?order=created_at.desc');
      allClients = await res.json();
      updateStats();
      renderCards(allClients);
    } catch(e) { console.error('Load error:', e); }
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

  // ── RENDER CARDS ──────────────────────────────────────────────────
  function renderCards(clients) {
    var container = document.getElementById('daCardsWrap');
    document.getElementById('daCount').textContent = clients.length + ' client' + (clients.length !== 1 ? 's' : '');
    if (!clients.length) { container.innerHTML = '<div class="da-empty">No clients found</div>'; return; }

    container.innerHTML = clients.map(function(c) {
      var color = getPipelineColor(c.status || 'client_inquiry_made');
      var pipelineLabel = getPipelineLabel(c.status || 'client_inquiry_made');
      var inv = formatInvestment(c.investment);

      var pOpts = PIPELINE_STAGES.map(function(s) {
        return '<option value="' + s.value + '"' + (c.status === s.value ? ' selected' : '') + '>' + s.label + '</option>';
      }).join('');

      var cOpts = CLIENT_STAGES.map(function(s) {
        return '<option value="' + s.value + '"' + (c.client_stage === s.value ? ' selected' : '') + '>' + s.label + '</option>';
      }).join('');

      return '<div class="da-client-card" id="card-' + c.id + '">'
        + '<div class="da-card-top" onclick="window._toggleAdminCard(\'' + c.id + '\')">'
        + '  <div class="da-card-left">'
        + '    <div class="da-card-avatar">' + initials(c.full_name) + '</div>'
        + '    <div><div class="da-card-name">' + (c.full_name || 'Unknown') + '</div><div class="da-card-sub">' + (c.email || '') + (c.phone ? ' &middot; ' + c.phone : '') + '</div></div>'
        + '  </div>'
        + '  <div class="da-card-right">'
        + '    <div class="da-stage-pill" style="color:' + color + ';border-color:' + color + ';background:' + color + '18">' + pipelineLabel + '</div>'
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
        + '    <div class="da-actions-row">'
        + '      <div class="da-action-label">Internal Pipeline</div>'
        + '      <select class="da-select" id="psel-' + c.id + '">' + pOpts + '</select>'
        + '      <button class="da-update-btn" onclick="window._updatePipeline(\'' + c.id + '\')">Update</button>'
        + '    </div>'
        + '    <div class="da-actions-row">'
        + '      <div class="da-action-label">Client Timeline</div>'
        + '      <select class="da-select" id="csel-' + c.id + '">' + cOpts + '</select>'
        + '      <button class="da-update-btn" onclick="window._updateClientStage(\'' + c.id + '\')">Update</button>'
        + '    </div>'
        + '    <div class="da-actions-row">'
        + '      <a class="da-email-link" href="mailto:' + (c.email || '') + '">Email Client</a>'
        + '    </div>'
        + '  </div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // ── TOGGLE CARD ───────────────────────────────────────────────────
  window._toggleAdminCard = function(id) {
    var det = document.getElementById('det-' + id);
    var exp = document.getElementById('exp-' + id);
    if (det.classList.contains('visible')) { det.classList.remove('visible'); exp.classList.remove('open'); }
    else { det.classList.add('visible'); exp.classList.add('open'); }
  };

  // ── UPDATE PIPELINE ───────────────────────────────────────────────
  window._updatePipeline = async function(id) {
    var val = document.getElementById('psel-' + id).value;
    try {
      await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ status: val }) });
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c.status = val;
      var card = document.getElementById('card-' + id);
      if (card) {
        var pill = card.querySelector('.da-stage-pill');
        var color = getPipelineColor(val);
        if (pill) { pill.textContent = getPipelineLabel(val); pill.style.color = color; pill.style.borderColor = color; pill.style.background = color + '18'; }
      }
      updateStats();
      flashBtn(id, 'psel-');
    } catch(e) {}
  };

  // ── UPDATE CLIENT STAGE ───────────────────────────────────────────
  window._updateClientStage = async function(id) {
    var val = document.getElementById('csel-' + id).value;
    try {
      await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_stage: val }) });
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c.client_stage = val;
      flashBtn(id, 'csel-');
    } catch(e) {}
  };

  function flashBtn(id, prefix) {
    var sel = document.getElementById(prefix + id);
    if (!sel) return;
    var btn = sel.nextElementSibling;
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = 'Saved!';
    btn.style.background = 'var(--success)';
    setTimeout(function() { btn.textContent = orig; btn.style.background = 'var(--gold)'; }, 2000);
  }

  // ── SEARCH & FILTER ───────────────────────────────────────────────
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

})();
