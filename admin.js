(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var ADMIN_PASSWORD = 'Daydream2026!';

  var STAGES = [
    { value: 'client_inquiry_made',                   label: 'Client Inquiry Made',                   color: '#8a8680' },
    { value: 'client_qualified',                       label: 'Client Qualified',                       color: '#eeb24a' },
    { value: 'discovery_call_booked',                  label: 'Discovery Call Booked',                  color: '#eeb24a' },
    { value: 'discovery_call_completed',               label: 'Discovery Call Completed',               color: '#eeb24a' },
    { value: 'design_proposal_drafting',               label: 'Design Proposal Drafting',               color: '#7a9e8a' },
    { value: 'design_proposal_presented',              label: 'Design Proposal Presented',              color: '#7a9e8a' },
    { value: 'design_proposal_accepted',               label: 'Design Proposal Accepted',               color: '#6a9e7a' },
    { value: 'site_consultation_scheduled',            label: 'Site Consultation Scheduled',            color: '#7a9e8a' },
    { value: 'site_consultation_completed',            label: 'Site Consultation Completed',            color: '#6a9e7a' },
    { value: 'design_phase_started',                   label: 'Design Phase Started',                   color: '#5a8e9e' },
    { value: 'base_map_complete',                      label: 'Base Map Complete',                      color: '#5a8e9e' },
    { value: 'base_map_discussion_call',               label: 'Base Map Discussion Call',               color: '#5a8e9e' },
    { value: 'base_map_approved',                      label: 'Base Map Approved',                      color: '#4a7e8e' },
    { value: '3d_model_completed',                     label: '3D Model Completed',                     color: '#5a7e9e' },
    { value: '3d_model_discussion_call',               label: '3D Model Discussion Call',               color: '#5a7e9e' },
    { value: '3d_model_approved',                      label: '3D Model Approved',                      color: '#4a6e8e' },
    { value: 'visualizations_started',                 label: 'Visualizations Started',                 color: '#7a6e9e' },
    { value: 'visualizations_completed',               label: 'Visualizations Completed',               color: '#7a6e9e' },
    { value: 'visualizations_approved',                label: 'Visualizations Approved',                color: '#6a5e8e' },
    { value: 'construction_document_phase_started',    label: 'Construction Document Phase Started',    color: '#9e7a5a' },
    { value: 'construction_document_phase_complete',   label: 'Construction Document Phase Complete',   color: '#8e6a4a' },
    { value: 'permit_plans_submitted',                 label: 'Permit Plans Submitted',                 color: '#9e6a5a' },
    { value: 'permit_plan_revisions',                  label: 'Permit Plan Revisions',                  color: '#c07a6a' },
    { value: 'permit_plans_approved',                  label: 'Permit Plans Approved',                  color: '#6a9e7a' },
    { value: 'construction_started',                   label: 'Construction Started',                   color: '#eeb24a' },
    { value: 'construction_finished',                  label: 'Construction Finished',                  color: '#6a9e7a' },
    { value: 'site_photos_to_be_made',                 label: 'Site Photos To Be Made',                 color: '#8a8680' },
    { value: 'site_photos_finished',                   label: 'Site Photos Finished',                   color: '#6a9e7a' },
    { value: 'project_complete',                       label: 'Project Complete',                       color: '#eeb24a' }
  ];

  function getStage(value) {
    return STAGES.find(function(s) { return s.value === value; }) || { value: value, label: value || 'New Inquiry', color: '#8a8680' };
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

    // Login
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

    // Dashboard
    '#dd-admin .da-dashboard { display: none; min-height: 100vh; flex-direction: column; }',
    '#dd-admin .da-dashboard.visible { display: flex; }',

    // Nav
    '#dd-admin .da-nav { background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 100; }',
    '#dd-admin .da-nav-logo { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 400; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; }',
    '#dd-admin .da-nav-badge { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--bg); background: var(--gold); padding: 3px 8px; margin-left: 12px; }',
    '#dd-admin .da-nav-right { display: flex; align-items: center; gap: 16px; }',
    '#dd-admin .da-nav-logout { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); cursor: pointer; background: none; border: none; transition: color 0.2s; }',
    '#dd-admin .da-nav-logout:hover { color: var(--gold); }',

    // Stats
    '#dd-admin .da-stats { display: flex; gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-stat { background: var(--surface); padding: 16px 24px; flex: 1; }',
    '#dd-admin .da-stat-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }',
    '#dd-admin .da-stat-value { font-family: "Cormorant Garamond", serif; font-size: 28px; color: var(--gold); font-weight: 400; }',

    // Toolbar
    '#dd-admin .da-toolbar { padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-bottom: 1px solid var(--border); background: var(--surface); }',
    '#dd-admin .da-search { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 16px; outline: none; width: 260px; transition: border-color 0.2s; }',
    '#dd-admin .da-search:focus { border-color: var(--gold); }',
    '#dd-admin .da-search::placeholder { color: var(--muted); }',
    '#dd-admin .da-filter { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 10px 16px; outline: none; cursor: pointer; appearance: none; min-width: 200px; }',
    '#dd-admin .da-filter:focus { border-color: var(--gold); }',
    '#dd-admin .da-count { font-size: 11px; color: var(--muted); letter-spacing: 0.1em; }',

    // Cards list
    '#dd-admin .da-cards-wrap { padding: 24px 32px; display: flex; flex-direction: column; gap: 12px; }',

    // Client card
    '#dd-admin .da-client-card { background: var(--surface); border: 1px solid var(--border); transition: border-color 0.2s; }',
    '#dd-admin .da-client-card:hover { border-color: var(--gold); }',
    '#dd-admin .da-card-top { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; gap: 16px; cursor: pointer; }',
    '#dd-admin .da-card-left { display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0; }',
    '#dd-admin .da-card-avatar { width: 36px; height: 36px; background: var(--gold-dim); border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center; font-family: "Cormorant Garamond", serif; font-size: 16px; color: var(--gold); flex-shrink: 0; }',
    '#dd-admin .da-card-info { min-width: 0; }',
    '#dd-admin .da-card-name { font-size: 14px; color: var(--text); font-weight: 400; margin-bottom: 2px; }',
    '#dd-admin .da-card-sub { font-size: 10px; color: var(--muted); letter-spacing: 0.05em; }',
    '#dd-admin .da-card-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }',
    '#dd-admin .da-card-investment { font-size: 13px; color: var(--gold); font-family: "Cormorant Garamond", serif; }',
    '#dd-admin .da-card-date { font-size: 10px; color: var(--muted); }',
    '#dd-admin .da-stage-pill { font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border: 1px solid; white-space: nowrap; }',
    '#dd-admin .da-card-expand { font-size: 10px; color: var(--muted); transition: transform 0.2s; }',
    '#dd-admin .da-card-expand.open { transform: rotate(180deg); }',

    // Expanded details
    '#dd-admin .da-card-details { display: none; border-top: 1px solid var(--border); }',
    '#dd-admin .da-card-details.visible { display: block; }',
    '#dd-admin .da-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }',
    '#dd-admin .da-detail-item { background: var(--surface-2); padding: 12px 20px; }',
    '#dd-admin .da-detail-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }',
    '#dd-admin .da-detail-value { font-size: 12px; color: var(--text); }',
    '#dd-admin .da-card-actions { padding: 16px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }',
    '#dd-admin .da-stage-select { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 8px 12px; outline: none; cursor: pointer; appearance: none; flex: 1; min-width: 200px; transition: border-color 0.2s; }',
    '#dd-admin .da-stage-select:focus { border-color: var(--gold); }',
    '#dd-admin .da-update-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; padding: 10px 24px; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }',
    '#dd-admin .da-update-btn:hover { opacity: 0.85; }',
    '#dd-admin .da-portal-link { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid var(--gold); padding: 9px 16px; white-space: nowrap; transition: background 0.2s, color 0.2s; }',
    '#dd-admin .da-portal-link:hover { background: var(--gold); color: var(--bg); }',

    // Empty state
    '#dd-admin .da-empty { text-align: center; padding: 60px 24px; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; }',

    '@keyframes daFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 700px) {',
    '  #dd-admin .da-stats { flex-direction: column; }',
    '  #dd-admin .da-nav { padding: 0 16px; }',
    '  #dd-admin .da-toolbar { padding: 16px; }',
    '  #dd-admin .da-cards-wrap { padding: 16px; }',
    '  #dd-admin .da-details-grid { grid-template-columns: 1fr; }',
    '  #dd-admin .da-card-right { flex-direction: column; align-items: flex-end; gap: 6px; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-admin');
  if (!wrap) return;

  var stageOptions = STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

  var filterOptions = '<option value="">All Stages</option>' + STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

  wrap.innerHTML = [
    // LOGIN
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

    // DASHBOARD
    '<div id="daDashboard" class="da-dashboard">',
    '  <nav class="da-nav">',
    '    <div style="display:flex;align-items:center">',
    '      <div class="da-nav-logo">Daydream</div>',
    '      <div class="da-nav-badge">Admin</div>',
    '    </div>',
    '    <div class="da-nav-right">',
    '      <button class="da-nav-logout" id="daLogoutBtn">Sign Out</button>',
    '    </div>',
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

  function formatDate(str) {
    if (!str) return '—';
    return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function serviceLabel(key) {
    var map = { '2d_concept': '2D Concept Phase', '3d_concept': '3D Concept Phase', '2d_3d_concept': '2D + 3D Concept Phase', 'permit_plan': 'Permit Plan Phase', '2d_3d_permit': '2D + 3D + Permit Plan' };
    return map[key] || key || '—';
  }

  function initials(name) {
    if (!name) return '?';
    var parts = name.trim().split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  // ── LOGIN ─────────────────────────────────────────────────────────
  document.getElementById('daLoginBtn').addEventListener('click', function() {
    var pwd = document.getElementById('daPassword').value;
    if (pwd === ADMIN_PASSWORD) {
      try { sessionStorage.setItem('dd_admin', '1'); } catch(e) {}
      document.getElementById('daLoginWrap').style.display = 'none';
      document.getElementById('daDashboard').classList.add('visible');
      loadClients();
    } else {
      document.getElementById('daLoginError').classList.add('visible');
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

  try {
    if (sessionStorage.getItem('dd_admin') === '1') {
      document.getElementById('daLoginWrap').style.display = 'none';
      document.getElementById('daDashboard').classList.add('visible');
      loadClients();
    }
  } catch(e) {}

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
    var active = allClients.filter(function(c) {
      return c.status && c.status !== 'client_inquiry_made' && c.status !== 'new_lead' && c.status !== 'project_complete';
    }).length;
    var complete = allClients.filter(function(c) { return c.status === 'project_complete'; }).length;
    var now = new Date();
    var thisMonth = allClients.filter(function(c) {
      var d = new Date(c.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    document.getElementById('daStatActive').textContent = active;
    document.getElementById('daStatComplete').textContent = complete;
    document.getElementById('daStatMonth').textContent = thisMonth;
  }

  // ── RENDER CARDS ──────────────────────────────────────────────────
  function renderCards(clients) {
    var wrap = document.getElementById('daCardsWrap');
    document.getElementById('daCount').textContent = clients.length + ' client' + (clients.length !== 1 ? 's' : '');

    if (!clients.length) {
      wrap.innerHTML = '<div class="da-empty">No clients found</div>';
      return;
    }

    wrap.innerHTML = clients.map(function(c) {
      var stage = getStage(c.status || 'client_inquiry_made');
      var inv = c.investment ? c.investment.replace(/[^0-9.]/g, '') : '';
      if (inv && !isNaN(inv)) inv = '$' + Number(inv).toLocaleString();
      else inv = c.investment || '';

      var opts = STAGES.map(function(s) {
        return '<option value="' + s.value + '"' + (stage.value === s.value ? ' selected' : '') + '>' + s.label + '</option>';
      }).join('');

      return '<div class="da-client-card" id="card-' + c.id + '">'
        + '<div class="da-card-top" onclick="window._toggleCard(\'' + c.id + '\')">'
        + '  <div class="da-card-left">'
        + '    <div class="da-card-avatar">' + initials(c.full_name) + '</div>'
        + '    <div class="da-card-info">'
        + '      <div class="da-card-name">' + (c.full_name || 'Unknown') + '</div>'
        + '      <div class="da-card-sub">' + (c.email || '') + (c.phone ? ' &middot; ' + c.phone : '') + '</div>'
        + '    </div>'
        + '  </div>'
        + '  <div class="da-card-right">'
        + '    <div class="da-stage-pill" style="color:' + stage.color + ';border-color:' + stage.color + ';background:' + stage.color + '18">' + stage.label + '</div>'
        + '    <div class="da-card-investment">' + inv + '</div>'
        + '    <div class="da-card-date">' + formatDate(c.created_at) + '</div>'
        + '    <div class="da-card-expand" id="expand-' + c.id + '">&#9660;</div>'
        + '  </div>'
        + '</div>'
        + '<div class="da-card-details" id="details-' + c.id + '">'
        + '  <div class="da-details-grid">'
        + '    <div class="da-detail-item"><div class="da-detail-label">Service</div><div class="da-detail-value">' + serviceLabel(c.project_type) + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Investment</div><div class="da-detail-value">' + (inv || '—') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Address</div><div class="da-detail-value">' + [c.street, c.city, c.state, c.zip].filter(Boolean).join(', ') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Referral</div><div class="da-detail-value">' + (c.referral || '—') + '</div></div>'
        + '    <div class="da-detail-item" style="grid-column:1/-1"><div class="da-detail-label">Notes</div><div class="da-detail-value">' + (c.notes || '—') + '</div></div>'
        + '  </div>'
        + '  <div class="da-card-actions">'
        + '    <select class="da-stage-select" id="select-' + c.id + '">' + opts + '</select>'
        + '    <button class="da-update-btn" onclick="window._updateStage(\'' + c.id + '\')">Update Stage</button>'
        + '    <a class="da-portal-link" href="mailto:' + (c.email || '') + '">Email Client</a>'
        + '  </div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // ── TOGGLE CARD ───────────────────────────────────────────────────
  window._toggleCard = function(id) {
    var details = document.getElementById('details-' + id);
    var expand = document.getElementById('expand-' + id);
    if (details.classList.contains('visible')) {
      details.classList.remove('visible');
      expand.classList.remove('open');
    } else {
      details.classList.add('visible');
      expand.classList.add('open');
    }
  };

  // ── UPDATE STAGE ──────────────────────────────────────────────────
  window._updateStage = async function(id) {
    var select = document.getElementById('select-' + id);
    var newStage = select.value;
    try {
      await apiFetch('/rest/v1/clients?id=eq.' + id, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ status: newStage })
      });
      var client = allClients.find(function(c) { return c.id === id; });
      if (client) client.status = newStage;

      // Update the pill color
      var stage = getStage(newStage);
      var card = document.getElementById('card-' + id);
      if (card) {
        var pill = card.querySelector('.da-stage-pill');
        if (pill) {
          pill.textContent = stage.label;
          pill.style.color = stage.color;
          pill.style.borderColor = stage.color;
          pill.style.background = stage.color + '18';
        }
      }

      updateStats();

      var btn = card ? card.querySelector('.da-update-btn') : null;
      if (btn) {
        btn.textContent = 'Saved!';
        btn.style.background = 'var(--success)';
        setTimeout(function() {
          if (btn) { btn.textContent = 'Update Stage'; btn.style.background = 'var(--gold)'; }
        }, 2000);
      }
    } catch(e) { console.error('Update error:', e); }
  };

  // ── SEARCH & FILTER ───────────────────────────────────────────────
  function applyFilters() {
    var q = document.getElementById('daSearch').value.toLowerCase();
    var stage = document.getElementById('daFilter').value;
    var filtered = allClients.filter(function(c) {
      var matchQ = !q
        || (c.full_name || '').toLowerCase().includes(q)
        || (c.email || '').toLowerCase().includes(q)
        || (c.phone || '').toLowerCase().includes(q);
      var matchStage = !stage || c.status === stage || (!c.status && stage === 'client_inquiry_made');
      return matchQ && matchStage;
    });
    renderCards(filtered);
  }

  document.getElementById('daSearch').addEventListener('input', applyFilters);
  document.getElementById('daFilter').addEventListener('change', applyFilters);

})();
