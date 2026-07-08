(function () {
  if (window.__ddSubportalInit) return;
  window.__ddSubportalInit = true;
  console.log('[dd-subportal] build 2026-07-08-A');

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';

  var currentUser = null;
  var currentSub  = null;

  // Document types shown in the portal. required drives the checklist flags.
  var DOC_TYPES = [
    { key: 'w9',                      label: 'W-9 Form',                    desc: 'Current W-9 for tax reporting.',                                   required: true },
    { key: 'general_liability',       label: 'General Liability Insurance', desc: 'COI with Daydream Design and Build as additional insured.',        required: true, insurance: true },
    { key: 'workers_comp',            label: "Workers' Compensation",       desc: 'Coverage for your crew, or a valid exemption certificate.',        required: true, insurance: true },
    { key: 'subcontractor_agreement', label: 'Subcontractor Agreement',     desc: 'Signed agreement defining the working relationship.',              required: true },
    { key: 'business_license',        label: 'Business / Contractor License', desc: 'License with number and expiration where applicable.',           required: false, insurance: true },
    { key: 'professional_liability',  label: 'Professional Liability',      desc: 'If your trade involves design or professional judgment.',          required: false, insurance: true },
    { key: 'auto',                    label: 'Commercial Auto Insurance',   desc: 'If your crew drives to job sites.',                                required: false, insurance: true },
    { key: 'bond',                    label: 'Bond',                        desc: 'Surety or license bond, if you carry one.',                        required: false },
    { key: 'other',                   label: 'Other Documents',             desc: 'Certifications, references, or anything else.',                    required: false }
  ];

  // ── FONTS ─────────────────────────────────────────────────────────
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap';
  document.head.appendChild(font);

  // ── STYLES ────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#dd-subportal * { box-sizing: border-box; margin: 0; padding: 0; }',
    '#dd-subportal { --bg:#ede8df; --surface:#faf8f5; --surface-2:#f7f3ed; --border:#ddd7ce; --text:#28231e; --muted:#8a7d73; --gold:#9e7b50; --gold-light:#c4a07a; --gold-dim:rgba(158,123,80,0.10); --error:#c07a6a; --success:#6a9e7a; font-family:Jost,sans-serif; font-weight:300; background:var(--bg); color:var(--text); width:100%; }',

    // Loading + login
    '#dd-subportal .dd-loading { min-height:60vh; display:flex; align-items:center; justify-content:center; }',
    '#dd-subportal .dd-loading.hidden { display:none; }',
    '#dd-subportal .dd-spinner { width:32px; height:32px; border:2px solid var(--border); border-top-color:var(--gold); border-radius:50%; animation:ddSpin 0.7s linear infinite; }',
    '@keyframes ddSpin { to { transform:rotate(360deg); } }',

    '#dd-subportal .dd-login { display:none; min-height:60vh; align-items:center; justify-content:center; padding:48px 20px; }',
    '#dd-subportal .dd-login.visible { display:flex; }',
    '#dd-subportal .dd-login-card { width:100%; max-width:420px; border:1px solid var(--border); background:var(--surface); }',
    '#dd-subportal .dd-login-head { background:var(--bg); border-bottom:3px solid var(--gold); padding:30px; text-align:center; }',
    '#dd-subportal .dd-login-logo { font-family:"Cormorant Garamond",serif; font-size:26px; font-weight:400; letter-spacing:0.2em; color:var(--gold); text-transform:uppercase; }',
    '#dd-subportal .dd-login-sub { font-size:8px; letter-spacing:0.4em; text-transform:uppercase; color:var(--muted); margin-top:6px; }',
    '#dd-subportal .dd-login-body { padding:30px; }',
    '#dd-subportal .dd-login-title { font-family:"Cormorant Garamond",serif; font-size:19px; font-style:italic; font-weight:300; margin-bottom:8px; }',
    '#dd-subportal .dd-login-text { font-size:13px; color:var(--muted); line-height:1.7; margin-bottom:20px; }',
    '#dd-subportal .dd-input-wrap { border:1px solid var(--border); background:var(--surface-2); margin-bottom:14px; }',
    '#dd-subportal .dd-input-wrap:focus-within { border-color:var(--gold); }',
    '#dd-subportal .dd-input-label { font-size:8px; letter-spacing:0.35em; text-transform:uppercase; color:var(--muted); padding:10px 14px 3px; display:block; }',
    '#dd-subportal .dd-input { width:100%; background:transparent; border:none; outline:none; color:var(--text); font-family:Jost,sans-serif; font-size:14px; padding:3px 14px 11px; }',
    '#dd-subportal .dd-btn { width:100%; background:transparent; border:1px solid var(--gold); color:var(--gold); font-family:Jost,sans-serif; font-size:10px; letter-spacing:0.4em; text-transform:uppercase; padding:14px; cursor:pointer; transition:background 0.3s,color 0.3s; }',
    '#dd-subportal .dd-btn:hover { background:var(--gold); color:var(--bg); }',
    '#dd-subportal .dd-btn:disabled { opacity:0.4; cursor:not-allowed; }',
    '#dd-subportal .dd-login-msg { font-size:12px; text-align:center; margin-top:12px; min-height:18px; }',
    '#dd-subportal .dd-login-msg.error { color:var(--error); }',
    '#dd-subportal .dd-login-msg.success { color:var(--success); }',

    // Dashboard
    '#dd-subportal .dd-dash { display:none; }',
    '#dd-subportal .dd-dash.visible { display:block; }',
    '#dd-subportal .dd-dash-inner { max-width:860px; margin:0 auto; padding:40px 24px 64px; }',

    // Header block
    '#dd-subportal .dd-head { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; flex-wrap:wrap; margin-bottom:8px; }',
    '#dd-subportal .dd-company { font-family:"Cormorant Garamond",serif; font-size:clamp(26px,4vw,38px); font-weight:300; color:var(--text); line-height:1.1; }',
    '#dd-subportal .dd-trade { font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); margin-top:6px; }',
    '#dd-subportal .dd-signout { font-size:9px; letter-spacing:0.28em; text-transform:uppercase; color:var(--muted); background:none; border:1px solid var(--border); padding:9px 16px; cursor:pointer; transition:color 0.2s,border-color 0.2s; }',
    '#dd-subportal .dd-signout:hover { color:var(--gold); border-color:var(--gold); }',

    // Status banner
    '#dd-subportal .dd-status-banner { border:1px solid var(--border); background:var(--surface); padding:20px 24px; margin:24px 0 32px; display:flex; align-items:center; gap:16px; }',
    '#dd-subportal .dd-status-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }',
    '#dd-subportal .dd-status-text { font-size:13px; line-height:1.6; }',
    '#dd-subportal .dd-status-text strong { font-weight:500; }',
    '#dd-subportal .dd-status-sub { font-size:12px; color:var(--muted); margin-top:2px; }',

    // Section title
    '#dd-subportal .dd-sec-title { font-size:9px; letter-spacing:0.32em; text-transform:uppercase; color:var(--gold); margin:0 0 4px; }',
    '#dd-subportal .dd-sec-desc { font-size:13px; color:var(--muted); line-height:1.7; margin-bottom:20px; }',

    // Document cards
    '#dd-subportal .dd-docs { display:flex; flex-direction:column; gap:12px; }',
    '#dd-subportal .dd-doc { border:1px solid var(--border); background:var(--surface); transition:border-color 0.2s; }',
    '#dd-subportal .dd-doc:hover { border-color:var(--gold-light); }',
    '#dd-subportal .dd-doc-top { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 20px; flex-wrap:wrap; }',
    '#dd-subportal .dd-doc-info { flex:1; min-width:200px; }',
    '#dd-subportal .dd-doc-name { font-size:14px; font-weight:400; color:var(--text); margin-bottom:3px; }',
    '#dd-subportal .dd-doc-name .dd-req-tag { font-size:8px; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); border:1px solid var(--gold); padding:2px 7px; margin-left:8px; vertical-align:middle; }',
    '#dd-subportal .dd-doc-name .dd-opt-tag { font-size:8px; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); border:1px solid var(--border); padding:2px 7px; margin-left:8px; vertical-align:middle; }',
    '#dd-subportal .dd-doc-desc { font-size:12px; color:var(--muted); line-height:1.6; }',
    '#dd-subportal .dd-doc-actions { display:flex; align-items:center; gap:10px; flex-shrink:0; }',
    '#dd-subportal .dd-doc-status { font-size:9px; letter-spacing:0.16em; text-transform:uppercase; padding:5px 11px; border:1px solid; white-space:nowrap; }',
    '#dd-subportal .dd-upload-btn { font-size:9px; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold); background:none; border:1px solid var(--gold); padding:9px 16px; cursor:pointer; transition:background 0.2s,color 0.2s; position:relative; overflow:hidden; }',
    '#dd-subportal .dd-upload-btn:hover { background:var(--gold); color:var(--bg); }',
    '#dd-subportal .dd-upload-btn input { position:absolute; inset:0; opacity:0; cursor:pointer; }',
    '#dd-subportal .dd-doc-files { border-top:1px solid var(--border); padding:0 20px; }',
    '#dd-subportal .dd-doc-file { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 0; border-bottom:1px solid var(--border); font-size:12px; }',
    '#dd-subportal .dd-doc-file:last-child { border-bottom:none; }',
    '#dd-subportal .dd-doc-file-name { color:var(--text); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }',
    '#dd-subportal .dd-doc-file-meta { color:var(--muted); font-size:11px; flex-shrink:0; }',
    '#dd-subportal .dd-uploading { font-size:11px; color:var(--gold); padding:10px 0; }',

    // Expiration input
    '#dd-subportal .dd-exp-row { display:flex; align-items:center; gap:8px; padding:0 20px 16px; }',
    '#dd-subportal .dd-exp-label { font-size:10px; letter-spacing:0.1em; color:var(--muted); text-transform:uppercase; }',
    '#dd-subportal .dd-exp-input { background:var(--surface-2); border:1px solid var(--border); color:var(--text); font-family:Jost,sans-serif; font-size:12px; padding:6px 10px; outline:none; }',
    '#dd-subportal .dd-exp-input:focus { border-color:var(--gold); }',

    // Messages
    '#dd-subportal .dd-msg-section { margin-top:44px; border-top:1px solid var(--border); padding-top:36px; }',
    '#dd-subportal .dd-msg-log { border:1px solid var(--border); background:var(--surface); max-height:280px; overflow-y:auto; margin-bottom:12px; }',
    '#dd-subportal .dd-msg-empty { padding:24px; text-align:center; font-size:12px; color:var(--muted); }',
    '#dd-subportal .dd-msg { padding:12px 16px; border-bottom:1px solid var(--border); }',
    '#dd-subportal .dd-msg:last-child { border-bottom:none; }',
    '#dd-subportal .dd-msg-from { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:5px; }',
    '#dd-subportal .dd-msg-from.them { color:var(--muted); }',
    '#dd-subportal .dd-msg-body { font-size:13px; line-height:1.7; color:var(--text); white-space:pre-wrap; }',
    '#dd-subportal .dd-msg-compose { display:flex; gap:10px; }',
    '#dd-subportal .dd-msg-compose textarea { flex:1; background:var(--surface-2); border:1px solid var(--border); outline:none; color:var(--text); font-family:Jost,sans-serif; font-size:13px; padding:12px 14px; resize:vertical; min-height:52px; }',
    '#dd-subportal .dd-msg-compose textarea:focus { border-color:var(--gold); }',
    '#dd-subportal .dd-msg-send { background:var(--gold); border:none; color:var(--bg); font-family:Jost,sans-serif; font-size:9px; letter-spacing:0.28em; text-transform:uppercase; padding:0 22px; cursor:pointer; }',
    '#dd-subportal .dd-msg-send:hover { opacity:0.88; }',

    // Toast
    '#dd-subportal .dd-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--gold); color:var(--bg); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; padding:12px 22px; z-index:99999; animation:ddSpin 0s; }',

    '@media (max-width:640px) {',
    '  #dd-subportal .dd-dash-inner { padding:24px 16px 48px; }',
    '  #dd-subportal .dd-doc-top { flex-direction:column; align-items:flex-start; }',
    '  #dd-subportal .dd-doc-actions { width:100%; }',
    '  #dd-subportal .dd-upload-btn { flex:1; text-align:center; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML SHELL ─────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-subportal');
  if (!wrap) return;

  wrap.innerHTML = [
    '<div class="dd-loading" id="spLoading"><div class="dd-spinner"></div></div>',

    '<div class="dd-login" id="spLogin">',
    '  <div class="dd-login-card">',
    '    <div class="dd-login-head"><div class="dd-login-logo">Daydream</div><div class="dd-login-sub">Partner Portal</div></div>',
    '    <div class="dd-login-body">',
    '      <div class="dd-login-title">Partner Sign In</div>',
    '      <div class="dd-login-text">Enter the email you signed up with and we will send you a secure sign-in link.</div>',
    '      <div class="dd-input-wrap"><label class="dd-input-label">Email Address</label><input class="dd-input" type="email" id="spEmail" placeholder="you@company.com" /></div>',
    '      <button class="dd-btn" id="spLoginBtn">Send Sign-In Link</button>',
    '      <div class="dd-login-msg" id="spLoginMsg"></div>',
    '    </div>',
    '  </div>',
    '</div>',

    '<div class="dd-dash" id="spDash">',
    '  <div class="dd-dash-inner">',
    '    <div class="dd-head">',
    '      <div><div class="dd-company" id="spCompany">Your Company</div><div class="dd-trade" id="spTrade"></div></div>',
    '      <button class="dd-signout" id="spSignout">Sign Out</button>',
    '    </div>',
    '    <div class="dd-status-banner" id="spStatusBanner">',
    '      <div class="dd-status-dot" id="spStatusDot"></div>',
    '      <div><div class="dd-status-text" id="spStatusText"></div><div class="dd-status-sub" id="spStatusSub"></div></div>',
    '    </div>',
    '    <div class="dd-sec-title">Required Documents</div>',
    '    <div class="dd-sec-desc">Upload each document below when you are ready. We will review each one and reach out if anything needs updating. Insurance certificates should include an expiration date.</div>',
    '    <div class="dd-docs" id="spDocs"></div>',

    '    <div class="dd-msg-section">',
    '      <div class="dd-sec-title">Messages</div>',
    '      <div class="dd-sec-desc">Questions about a document or your status? Send us a note here.</div>',
    '      <div class="dd-msg-log" id="spMsgLog"><div class="dd-msg-empty">No messages yet.</div></div>',
    '      <div class="dd-msg-compose"><textarea id="spMsgInput" placeholder="Type your message..."></textarea><button class="dd-msg-send" id="spMsgSend">Send</button></div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── HEADER OFFSET (measure site #ddNav, same fix as client portal) ──
  function spHeaderOffset() {
    var el = document.getElementById('dd-subportal');
    if (!el) return;
    var nav = document.getElementById('ddNav');
    var h = nav ? Math.ceil(nav.getBoundingClientRect().bottom) : 80;
    if (!h || h < 80) h = 80;
    el.style.paddingTop = h + 'px';
  }
  spHeaderOffset();
  window.addEventListener('resize', spHeaderOffset, { passive: true });
  window.addEventListener('load', spHeaderOffset, { passive: true });
  setTimeout(spHeaderOffset, 400);

  // ── HELPERS ────────────────────────────────────────────────────────
  function s(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }
  function fmtDate(str) {
    if (!str) return '';
    try { return new Date(str).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }); } catch(e) { return ''; }
  }
  function toast(msg) {
    var t = document.getElementById('spToast');
    if (t) t.remove();
    t = document.createElement('div');
    t.id = 'spToast'; t.className = 'dd-toast'; t.textContent = msg;
    document.getElementById('dd-subportal').appendChild(t);
    setTimeout(function(){ if (t.parentNode) t.remove(); }, 3500);
  }
  function apiFetch(path, options) {
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SUPABASE_KEY;
    opts.headers['Authorization'] = 'Bearer ' + (currentUser ? currentUser.access_token : SUPABASE_KEY);
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SUPABASE_URL + path, opts);
  }

  function showLoading() { document.getElementById('spLoading').classList.remove('hidden'); }
  function hideLoading() { document.getElementById('spLoading').classList.add('hidden'); }
  function showLogin() {
    hideLoading();
    try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch(e) { window.scrollTo(0,0); }
    document.getElementById('spLogin').classList.add('visible');
    document.getElementById('spDash').classList.remove('visible');
  }
  function showDash() {
    hideLoading();
    try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch(e) { window.scrollTo(0,0); }
    document.getElementById('spLogin').classList.remove('visible');
    document.getElementById('spDash').classList.add('visible');
    spHeaderOffset();
  }

  // ── LOGIN (magic link request) ─────────────────────────────────────
  document.getElementById('spLoginBtn').addEventListener('click', async function() {
    var email = (document.getElementById('spEmail').value || '').trim().toLowerCase();
    var msg = document.getElementById('spLoginMsg');
    if (!email) { msg.textContent = 'Please enter your email.'; msg.className = 'dd-login-msg error'; return; }
    this.disabled = true; this.textContent = 'Sending...'; msg.textContent = '';
    try {
      // Look up the sub to personalize the invite
      var subRes = await fetch(SUPABASE_URL + '/rest/v1/subcontractors?contact_email=ilike.' + encodeURIComponent(email) + '&select=company_legal_name,contact_name&limit=1', {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      });
      var subs = await subRes.json() || [];
      var company = subs[0] ? subs[0].company_legal_name : null;
      var contact = subs[0] ? subs[0].contact_name : null;

      var res = await fetch(SUPABASE_URL + '/functions/v1/invite-subcontractor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY },
        body: JSON.stringify({ email: email, company: company, contact_name: contact })
      });
      if (res.ok) {
        msg.textContent = 'Check your email for your secure sign-in link.'; msg.className = 'dd-login-msg success';
      } else {
        msg.textContent = 'We could not find that email. Please use the address you signed up with.'; msg.className = 'dd-login-msg error';
      }
    } catch(e) {
      msg.textContent = 'Something went wrong. Please try again.'; msg.className = 'dd-login-msg error';
    }
    this.disabled = false; this.textContent = 'Send Sign-In Link';
  });
  document.getElementById('spEmail').addEventListener('keydown', function(e){ if (e.key === 'Enter') document.getElementById('spLoginBtn').click(); });

  document.getElementById('spSignout').addEventListener('click', function() {
    try { localStorage.removeItem('dd_sub_token'); sessionStorage.removeItem('dd_sub_token'); } catch(e) {}
    currentUser = null; currentSub = null;
    showLogin();
  });

  // ── TOKEN HANDLING ─────────────────────────────────────────────────
  async function tryTokenFromUrl() {
    var hash = window.location.hash || '';
    var search = window.location.search || '';
    var hashParams = new URLSearchParams(hash.replace('#',''));
    var queryParams = new URLSearchParams(search.replace('?',''));
    var accessToken = hashParams.get('access_token') || queryParams.get('access_token');
    var tokenHash = queryParams.get('token_hash') || queryParams.get('token');
    var tokenType = queryParams.get('type');

    if (tokenHash && tokenType) {
      try {
        var vRes = await fetch(SUPABASE_URL + '/auth/v1/verify', {
          method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ token_hash: tokenHash, type: tokenType })
        });
        var vData = await vRes.json();
        if (vData.access_token) accessToken = vData.access_token;
      } catch(e) { console.error('verify:', e); }
    }
    if (accessToken && accessToken.length > 20) {
      try {
        var res = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + accessToken } });
        var user = await res.json();
        if (user && user.email) {
          currentUser = { access_token: accessToken, email: user.email, id: user.id };
          try { localStorage.setItem('dd_sub_token', accessToken); sessionStorage.setItem('dd_sub_token', accessToken); } catch(e) {}
          history.replaceState(null, '', window.location.pathname);
          return true;
        }
      } catch(e) { console.error('tryTokenFromUrl:', e); }
    }
    return false;
  }

  async function tryTokenFromSession() {
    var token = null;
    try { token = localStorage.getItem('dd_sub_token') || sessionStorage.getItem('dd_sub_token'); } catch(e) {}
    if (!token) return false;
    try {
      var res = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + token } });
      var user = await res.json();
      if (user && user.email) { currentUser = { access_token: token, email: user.email, id: user.id }; return true; }
    } catch(e) {}
    try { localStorage.removeItem('dd_sub_token'); sessionStorage.removeItem('dd_sub_token'); } catch(e) {}
    return false;
  }

  // ── LOAD SUBCONTRACTOR ─────────────────────────────────────────────
  async function loadSub() {
    var res = await apiFetch('/rest/v1/subcontractors?contact_email=ilike.' + encodeURIComponent(currentUser.email.toLowerCase()) + '&order=created_at.desc&limit=1');
    var subs = await res.json() || [];
    if (!subs.length) {
      // try auth_email match
      var res2 = await apiFetch('/rest/v1/subcontractors?auth_email=ilike.' + encodeURIComponent(currentUser.email.toLowerCase()) + '&order=created_at.desc&limit=1');
      subs = await res2.json() || [];
    }
    if (!subs.length) { showLogin(); return; }
    currentSub = subs[0];
    renderDash();
    loadDocuments();
    loadMessages();
  }

  function renderStatus() {
    var dot = document.getElementById('spStatusDot');
    var txt = document.getElementById('spStatusText');
    var sub = document.getElementById('spStatusSub');
    var cs = currentSub.compliance_status || 'incomplete';
    var map = {
      incomplete:      { c:'#9e7b50', t:'Documents Needed', s:'Upload your required documents below to complete your partner file.' },
      pending_review:  { c:'#5a8e9e', t:'Under Review',      s:'We have received your documents and are reviewing them. We will reach out if anything is needed.' },
      compliant:       { c:'#6a9e7a', t:'Compliant',         s:'Your file is complete and up to date. You are on our active partner list.' },
      expired:         { c:'#c07a6a', t:'Action Needed',     s:'One or more of your documents has expired. Please upload a current version.' }
    };
    var m = map[cs] || map.incomplete;
    dot.style.background = m.c;
    txt.innerHTML = '<strong>' + m.t + '</strong>';
    sub.textContent = m.s;
  }

  function renderDash() {
    document.getElementById('spCompany').textContent = currentSub.dba_name || currentSub.company_legal_name || 'Your Company';
    document.getElementById('spTrade').textContent = currentSub.primary_trade || '';
    renderStatus();
    showDash();
  }

  // ── DOCUMENTS ──────────────────────────────────────────────────────
  var subDocs = [];
  async function loadDocuments() {
    try {
      var res = await apiFetch('/rest/v1/subcontractor_documents?subcontractor_id=eq.' + currentSub.id + '&order=created_at.desc');
      subDocs = await res.json() || [];
    } catch(e) { subDocs = []; }
    renderDocs();
  }

  function docsForType(key) { return subDocs.filter(function(d){ return d.doc_type === key; }); }

  function renderDocs() {
    var container = document.getElementById('spDocs');
    container.innerHTML = DOC_TYPES.map(function(dt) {
      var files = docsForType(dt.key);
      var latest = files[0];
      var statusInfo = getDocStatus(dt, files);
      var filesHtml = files.length ? '<div class="dd-doc-files">' + files.map(function(f) {
        return '<div class="dd-doc-file"><span class="dd-doc-file-name">' + s(f.file_name || 'Document') + '</span><span class="dd-doc-file-meta">' + fmtDate(f.created_at) + (f.expiration_date ? ' &middot; exp ' + fmtDate(f.expiration_date) : '') + '</span></div>';
      }).join('') + '</div>' : '';
      var expHtml = (dt.insurance && latest) ? '<div class="dd-exp-row"><span class="dd-exp-label">Expiration</span><input type="date" class="dd-exp-input" value="' + s(latest.expiration_date || '') + '" onchange="window._spSetExp(\'' + latest.id + '\', this.value)" /></div>' : '';
      return '<div class="dd-doc">'
        + '<div class="dd-doc-top">'
        + '  <div class="dd-doc-info"><div class="dd-doc-name">' + s(dt.label) + (dt.required ? '<span class="dd-req-tag">Required</span>' : '<span class="dd-opt-tag">If Applicable</span>') + '</div><div class="dd-doc-desc">' + s(dt.desc) + '</div></div>'
        + '  <div class="dd-doc-actions">'
        + '    <span class="dd-doc-status" style="color:' + statusInfo.color + ';border-color:' + statusInfo.color + ';background:' + statusInfo.color + '14">' + statusInfo.label + '</span>'
        + '    <label class="dd-upload-btn">' + (files.length ? 'Replace' : 'Upload') + '<input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onchange="window._spUpload(\'' + dt.key + '\', this)" /></label>'
        + '  </div>'
        + '</div>'
        + '<div class="dd-uploading" id="sp-uploading-' + dt.key + '" style="display:none;padding-left:20px">Uploading...</div>'
        + expHtml
        + filesHtml
        + '</div>';
    }).join('');
  }

  function getDocStatus(dt, files) {
    if (!files.length) return dt.required ? { label:'Needed', color:'#9e7b50' } : { label:'Optional', color:'#8a7d73' };
    var latest = files[0];
    if (latest.status === 'approved') {
      if (latest.expiration_date && new Date(latest.expiration_date) < new Date()) return { label:'Expired', color:'#c07a6a' };
      return { label:'Approved', color:'#6a9e7a' };
    }
    if (latest.status === 'rejected') return { label:'Needs Update', color:'#c07a6a' };
    return { label:'Submitted', color:'#5a8e9e' };
  }

  var SIX_MB = 6 * 1024 * 1024;

  window._spUpload = async function(docType, input) {
    var file = input.files && input.files[0];
    if (!file || !currentSub) return;
    var statusEl = document.getElementById('sp-uploading-' + docType);
    if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = 'Uploading ' + file.name + '...'; }
    var safeName = file.name.replace(/[^a-zA-Z0-9._\-]/g, '_');
    var path = currentSub.id + '/' + docType + '/' + Date.now() + '_' + safeName;
    try {
      var ok = false;
      if (file.size > SIX_MB) {
        ok = await uploadResumable(file, path);
      } else {
        var upRes = await fetch(SUPABASE_URL + '/storage/v1/object/subcontractor-documents/' + path, {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + currentUser.access_token, 'Content-Type': file.type || 'application/octet-stream' },
          body: file
        });
        ok = upRes.ok;
      }
      if (!ok) throw new Error('upload failed');

      // Record the document row (triggers Drive routing edge function)
      var dtDef = DOC_TYPES.find(function(d){ return d.key === docType; }) || {};
      await apiFetch('/rest/v1/subcontractor_documents', {
        method: 'POST', headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          subcontractor_id: currentSub.id,
          doc_type: docType,
          doc_label: dtDef.label || docType,
          file_name: file.name,
          file_url: path,
          uploaded_by: 'subcontractor',
          status: 'submitted'
        })
      });

      // Bump compliance to pending_review on first upload
      if (currentSub.compliance_status === 'incomplete') {
        await apiFetch('/rest/v1/subcontractors?id=eq.' + currentSub.id, {
          method: 'PATCH', headers: { 'Prefer': 'return=minimal' },
          body: JSON.stringify({ compliance_status: 'pending_review' })
        });
        currentSub.compliance_status = 'pending_review';
        renderStatus();
      }

      if (statusEl) statusEl.style.display = 'none';
      toast('Uploaded ' + (dtDef.label || 'document'));
      await loadDocuments();
    } catch(e) {
      console.error('upload:', e);
      if (statusEl) { statusEl.textContent = 'Upload failed. Please try again.'; }
    }
    input.value = '';
  };

  async function uploadResumable(file, path) {
    var CHUNK = 6 * 1024 * 1024;
    try {
      var createRes = await fetch(SUPABASE_URL + '/storage/v1/upload/resumable', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + currentUser.access_token,
          'Content-Type': 'application/offset+octet-stream',
          'Upload-Length': file.size,
          'Upload-Metadata': 'bucketName ' + btoa('subcontractor-documents') + ',objectName ' + btoa(path) + ',contentType ' + btoa(file.type || 'application/octet-stream'),
          'Tus-Resumable': '1.0.0'
        }
      });
      if (!createRes.ok && createRes.status !== 201) return false;
      var uploadUrl = createRes.headers.get('Location');
      if (!uploadUrl) return false;
      if (uploadUrl.startsWith('/')) uploadUrl = SUPABASE_URL + uploadUrl;
      var offset = 0;
      while (offset < file.size) {
        var chunk = file.slice(offset, offset + CHUNK);
        var patchRes = await fetch(uploadUrl, {
          method: 'PATCH',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + currentUser.access_token, 'Content-Type': 'application/offset+octet-stream', 'Upload-Offset': offset, 'Tus-Resumable': '1.0.0' },
          body: chunk
        });
        if (!patchRes.ok) return false;
        offset += CHUNK;
      }
      return true;
    } catch(e) { return false; }
  }

  window._spSetExp = async function(docId, val) {
    try {
      await apiFetch('/rest/v1/subcontractor_documents?id=eq.' + docId, {
        method: 'PATCH', headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ expiration_date: val || null })
      });
      toast('Expiration saved');
      loadDocuments();
    } catch(e) { console.error('setExp:', e); }
  };

  // ── MESSAGES ───────────────────────────────────────────────────────
  async function loadMessages() {
    try {
      var res = await apiFetch('/rest/v1/subcontractor_messages?subcontractor_id=eq.' + currentSub.id + '&order=created_at.asc');
      var msgs = await res.json() || [];
      var log = document.getElementById('spMsgLog');
      if (!msgs.length) { log.innerHTML = '<div class="dd-msg-empty">No messages yet.</div>'; return; }
      log.innerHTML = msgs.map(function(m) {
        var isTeam = m.sender === 'daydream_team';
        return '<div class="dd-msg"><div class="dd-msg-from ' + (isTeam ? '' : 'them') + '">' + (isTeam ? 'Daydream Team' : 'You') + ' &middot; ' + fmtDate(m.created_at) + '</div><div class="dd-msg-body">' + s(m.content) + '</div></div>';
      }).join('');
      log.scrollTop = log.scrollHeight;
    } catch(e) { console.error('loadMessages:', e); }
  }

  document.getElementById('spMsgSend').addEventListener('click', async function() {
    var input = document.getElementById('spMsgInput');
    var content = (input.value || '').trim();
    if (!content || !currentSub) return;
    try {
      await apiFetch('/rest/v1/subcontractor_messages', {
        method: 'POST', headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ subcontractor_id: currentSub.id, sender: currentUser.email, content: content, is_read: false })
      });
      input.value = '';
      loadMessages();
    } catch(e) { console.error('send msg:', e); }
  });

  // ── INIT ───────────────────────────────────────────────────────────
  async function init() {
    showLoading();
    var fromUrl = await tryTokenFromUrl();
    if (!fromUrl) {
      var fromSession = await tryTokenFromSession();
      if (!fromSession) { showLogin(); return; }
    }
    await loadSub();
  }
  init();

})();
