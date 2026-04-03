(function() {

  // ── Google Fonts ──────────────────────────────────────────────────
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400&display=swap';
  document.head.appendChild(font);

  // ── Styles ────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#dd-form-wrap * { box-sizing: border-box; margin: 0; padding: 0; }',
    '#dd-form-wrap {',
    '  --surface: #131310; --surface-2: #181815; --border: #252520;',
    '  --text: #f0ebe0; --muted: #8a8680; --gold: #eeb24a;',
    '  --gold-dim: rgba(238,178,74,0.07); --error: #c07a6a;',
    '  font-family: Jost, sans-serif; font-weight: 300;',
    '  color: var(--text); width: 100%; max-width: 660px; margin: 0 auto; padding: 48px 0; background: #0d0d0b !important;',
    '}',

    /* Header */
    '#dd-form-wrap header { text-align: center; margin-bottom: 48px; animation: ddFadeUp 0.9s ease both; background: #0d0d0b; padding: 32px 24px; }',
    '#dd-form-wrap .dd-logo { font-family: "Cormorant Garamond", serif; font-weight: 400; font-size: clamp(28px,5vw,40px); letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; line-height: 1; margin-bottom: 8px; }',
    '#dd-form-wrap .dd-logo-sub { font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase; color: var(--muted); margin-bottom: 22px; }',
    '#dd-form-wrap .dd-rule { display: flex; align-items: center; gap: 16px; justify-content: center; margin-bottom: 18px; }',
    '#dd-form-wrap .dd-rule span { display: block; height: 1px; width: 60px; background: linear-gradient(90deg, transparent, #252520); }',
    '#dd-form-wrap .dd-rule span:last-child { background: linear-gradient(90deg, #252520, transparent); }',
    '#dd-form-wrap .dd-diamond { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }',
    '#dd-form-wrap .dd-subtitle { font-family: "Cormorant Garamond", serif; font-size: clamp(14px,2.5vw,17px); font-style: italic; font-weight: 300; color: var(--muted); letter-spacing: 0.04em; line-height: 1.5; }',

    /* Form */
    '#dd-form-wrap form { display: flex; flex-direction: column; border: 1px solid var(--border); background: var(--surface); animation: ddFadeUp 0.7s 0.2s ease both; opacity: 0; animation-fill-mode: both; }',
    '#dd-form-wrap .dd-section { font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); padding: 16px 24px 10px; border-bottom: 1px solid var(--border); background: var(--surface-2); opacity: 0.8; }',
    '#dd-form-wrap .dd-row { display: grid; grid-template-columns: 1fr 1fr; }',
    '#dd-form-wrap .dd-row-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; }',

    /* Fields */
    '#dd-form-wrap .dd-field { position: relative; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--surface); transition: background 0.25s; }',
    '#dd-form-wrap .dd-row .dd-field:last-child, #dd-form-wrap .dd-row-3 .dd-field:last-child, #dd-form-wrap .dd-field.dd-full { border-right: none; }',
    '#dd-form-wrap .dd-field:focus-within { background: var(--gold-dim); z-index: 2; }',
    '#dd-form-wrap .dd-field:focus-within::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); }',
    '#dd-form-wrap .dd-field label { display: block; font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); padding: 16px 24px 5px; transition: color 0.2s; font-family: Jost, sans-serif; }',
    '#dd-form-wrap .dd-field:focus-within label { color: var(--gold); }',

    /* Inputs - force dark bg on everything including autofill */
    '#dd-form-wrap .dd-field input,',
    '#dd-form-wrap .dd-field select,',
    '#dd-form-wrap .dd-field textarea {',
    '  width: 100%; background: #131310 !important; border: none !important; outline: none;',
    '  color: #f0ebe0 !important; font-family: Jost, sans-serif; font-weight: 300; font-size: 14px;',
    '  padding: 2px 24px 16px; letter-spacing: 0.03em; appearance: none; -webkit-appearance: none;',
    '  box-shadow: none !important;',
    '}',

    /* Autofill override */
    '#dd-form-wrap .dd-field input:-webkit-autofill,',
    '#dd-form-wrap .dd-field input:-webkit-autofill:hover,',
    '#dd-form-wrap .dd-field input:-webkit-autofill:focus,',
    '#dd-form-wrap .dd-field input:-webkit-autofill:active {',
    '  -webkit-box-shadow: 0 0 0 60px #131310 inset !important;',
    '  -webkit-text-fill-color: #f0ebe0 !important;',
    '  caret-color: #f0ebe0;',
    '  transition: background-color 5000s ease-in-out 0s;',
    '}',

    /* Select specific */
    '#dd-form-wrap .dd-field select { cursor: pointer; padding-right: 44px; }',
    '#dd-form-wrap .dd-field select:focus { background: #131310 !important; color: #f0ebe0 !important; }',
    '#dd-form-wrap .dd-field select option { background: #131310 !important; color: #f0ebe0 !important; }',

    '#dd-form-wrap .dd-field:focus-within { background: var(--gold-dim) !important; }',
    '#dd-form-wrap .dd-field:focus-within input,',
    '#dd-form-wrap .dd-field:focus-within select,',
    '#dd-form-wrap .dd-field:focus-within textarea { background: transparent !important; }',

    '#dd-form-wrap .dd-arrow { position: absolute; right: 20px; top: 50%; transform: translateY(4px); pointer-events: none; color: var(--muted); font-size: 9px; }',
    '#dd-form-wrap .dd-field textarea { resize: none; min-height: 120px; line-height: 1.75; }',
    '#dd-form-wrap .dd-field input::placeholder, #dd-form-wrap .dd-field textarea::placeholder { color: #5a5a54; }',

    /* Submit */
    '#dd-form-wrap .dd-submit-wrap { padding: 28px 24px; display: flex; flex-direction: column; align-items: center; gap: 14px; background: var(--surface-2); border-top: 1px solid var(--border); }',
    '#dd-form-wrap .dd-radio-group { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }',
    '#dd-form-wrap .dd-radio-label { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text); cursor: pointer; }',
    '#dd-form-wrap .dd-radio-label input { accent-color: var(--gold); width: 16px; height: 16px; }',
    '#dd-form-wrap button[type="submit"] { width: 100%; max-width: 300px; background: transparent; border: 1px solid var(--gold) !important; color: var(--gold); font-family: Jost, sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.45em; text-transform: uppercase; padding: 18px 40px; cursor: pointer; transition: background 0.3s, color 0.3s, box-shadow 0.3s; }',
    '#dd-form-wrap button[type="submit"]:hover { background: var(--gold) !important; color: #0d0d0b !important; box-shadow: 0 0 30px rgba(238,178,74,0.15); }',
    '#dd-form-wrap button[type="submit"]:disabled { opacity: 0.35; cursor: not-allowed; }',
    '#dd-form-wrap button[type="submit"].loading .btn-text { display: none; }',
    '#dd-form-wrap button[type="submit"].loading .btn-loading { display: inline; }',
    '#dd-form-wrap input[type="checkbox"] { accent-color: var(--gold); }',
    '#dd-form-wrap .btn-loading { display: none; }',
    '#dd-form-wrap .dd-privacy { font-size: 9px; letter-spacing: 0.2em; color: var(--muted); text-align: center; text-transform: uppercase; }',

    /* Error / Success */
    '#dd-form-wrap .dd-error { font-size: 11px; color: var(--error); text-align: center; letter-spacing: 0.1em; display: none; }',
    '#dd-form-wrap .dd-error.visible { display: block; }',
    '#dd-form-wrap .dd-success { display: none; text-align: center; padding: 80px 20px; animation: ddFadeUp 0.7s ease both; background: #0d0d0b !important; min-height: 500px; width: 100%; box-sizing: border-box; }',  
    '#dd-form-wrap .dd-success.visible { display: block; }',
    '#dd-form-wrap .dd-success-diamond { display: inline-block; width: 10px; height: 10px; background: var(--gold); transform: rotate(45deg); margin-bottom: 28px; }',
    '#dd-form-wrap .dd-success h2 { font-family: "Cormorant Garamond", serif; font-size: 30px; font-weight: 300; font-style: italic; color: var(--gold); margin-bottom: 14px; }',
    '#dd-form-wrap .dd-success p { font-size: 13px; color: var(--muted); line-height: 2; letter-spacing: 0.08em; }',

    '@keyframes ddFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 540px) {',
    '  #dd-form-wrap .dd-row { grid-template-columns: 1fr; }',
    '  #dd-form-wrap .dd-row-3 { grid-template-columns: 1fr; }',
    '  #dd-form-wrap .dd-field { border-right: none; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-form-wrap');
  if (!wrap) return;

  wrap.innerHTML = [
    '<header>',
    '  <div class="dd-logo">Daydream</div>',
    '  <div class="dd-logo-sub">Design &amp; Build \u2014 Atlanta, Georgia</div>',
    '  <div class="dd-rule"><span></span><div class="dd-diamond"></div><span></span></div>',
    '  <div class="dd-subtitle">High-End Outdoor Projects Built on Clarity and Truth</div>',
    '</header>',

    '<div class="dd-success" id="ddSuccess" style="background:#0d0d0b !important">',
    '  <div class="dd-success-diamond"></div>',
    '  <h2>Thank you.</h2>',
    '  <p>Your inquiry has been received.<br/>We\u2019ll be in touch shortly<br/>to discuss your project.</p>',
    '</div>',

    '<form id="ddForm">',

    '  <div class="dd-section">Personal Information</div>',
    '  <div class="dd-row">',
    '    <div class="dd-field"><label>First Name</label><input type="text" id="ddFirstName" placeholder="Jane" required /></div>',
    '    <div class="dd-field"><label>Last Name</label><input type="text" id="ddLastName" placeholder="Smith" required /></div>',
    '  </div>',
    '  <div class="dd-row">',
    '    <div class="dd-field"><label>Email Address</label><input type="email" id="ddEmail" placeholder="youremail@email.com" required /></div>',
    '    <div class="dd-field"><label>Phone Number</label><input type="tel" id="ddPhone" placeholder="+1 (404) 000-0000" /></div>',
    '  </div>',
    '  <div class="dd-row">',
    '  </div>',

    '  <div class="dd-row">',
    '    <div class="dd-field"><label>Are You a Contractor?</label><div class="dd-select-wrap"><select id="ddIsContractor" onchange="window._onContractorChange(this.value)"><option value="">Select an option</option><option value="no">No — I am the homeowner</option><option value="yes">Yes — I am a contractor</option></select><span class="dd-arrow">&#9662;</span></div></div>',
    '    <div class="dd-field" id="ddCompanyWrap" style="display:none"><label>Company Name</label><input type="text" id="ddCompany" placeholder="e.g. Smith Contracting LLC" /></div>',
    '  </div>',

    '  <div class="dd-section">Project Address</div>',
    '  <div class="dd-field dd-full">',
    '    <label>Country</label>',
    '    <select id="ddCountry">',
    '      <option value="" disabled selected>Select a country</option>',
    '      <option value="US">United States</option>',
    '      <option value="CA">Canada</option>',
    '      <option value="GB">United Kingdom</option>',
    '      <option value="AU">Australia</option>',
    '      <option value="other">Other</option>',
    '    </select>',
    '    <span class="dd-arrow">&#9662;</span>',
    '  </div>',
    '  <div class="dd-field dd-full"><label>Street Address</label><input type="text" id="ddStreet" placeholder="123 Peachtree Street NE" /></div>',
    '  <div class="dd-row-3">',
    '    <div class="dd-field"><label>City</label><input type="text" id="ddCity" placeholder="Atlanta" /></div>',
    '    <div class="dd-field"><label>State</label><input type="text" id="ddState" placeholder="GA" /></div>',
    '    <div class="dd-field"><label>Zip Code</label><input type="text" id="ddZip" placeholder="30067" /></div>',
    '  </div>',

    '  <div class="dd-section">Project Details</div>',
    '  <div class="dd-field dd-full">',
    '    <label>How Did You Hear About Us?</label>',
    '    <select id="ddReferral">',
    '      <option value="" disabled selected>Select an option</option>',
    '      <option value="Google Search">Google Search</option>',
    '      <option value="Instagram">Instagram</option>',
    '      <option value="Facebook">Facebook</option>',
    '      <option value="LinkedIn">LinkedIn</option>',
    '      <option value="YouTube">YouTube</option>',
    '      <option value="Houzz">Houzz</option>',
    '      <option value="Nextdoor">Nextdoor</option>',
    '      <option value="Referral — Friend or Family">Referral — Friend or Family</option>',
    '      <option value="Referral — Past Client">Referral — Past Client</option>',
    '      <option value="Yard Sign / Drove By">Yard Sign / Drove By</option>',
    '      <option value="Home Show / Event">Home Show / Event</option>',
    '      <option value="Other">Other</option>',
    '    </select>',
    '    <span class="dd-arrow">&#9662;</span>',
    '  </div>',
    '  <div class="dd-field dd-full">',
    '    <label>What Design Services Are You Interested In?</label>',
    '    <select id="ddServices" required>',
    '      <option value="" disabled selected>Select an option</option>',
    '      <option value="2d_concept">2D Concept Phase</option>',
    '      <option value="3d_concept">3D Concept Phase</option>',
    '      <option value="2d_3d_concept">2D + 3D Concept Phase</option>',
    '      <option value="permit_plan">Permit Plan Phase</option>',
    '      <option value="2d_3d_permit">2D + 3D Concept Phase &amp; Permit Plan Phase</option>',
    '    </select>',
    '    <span class="dd-arrow">&#9662;</span>',
    '  </div>',
    '  <div class="dd-field dd-full"><label>What Level of Investment Are You Preparing for This Project?</label><input type="text" id="ddInvestment" placeholder="e.g. $75,000" /></div>',
    '  <div class="dd-field dd-full"><label>Anything Else We Need to Know?</label><textarea id="ddNotes" placeholder="Tell us about your vision, timeline, or any other details..."></textarea></div>',


    '  <div class="dd-submit-wrap">',
    '    <div class="dd-error" id="ddError">Something went wrong. Please try again.</div>',
    '    <button type="submit" id="ddSubmit"><span class="btn-text">Submit Inquiry</span><span class="btn-loading">Sending...</span></button>',
    '    <div class="dd-privacy">Your information is kept private and never shared</div>',
    '  </div>',

    '</form>'
  ].join('\n');

  // ── Supabase ──────────────────────────────────────────────────────
  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';

  var form     = document.getElementById('ddForm');
  var btn      = document.getElementById('ddSubmit');
  var errMsg   = document.getElementById('ddError');
  var success  = document.getElementById('ddSuccess');

  // Show company field when contractor is checked
  // Global contractor change handler (called via onchange attribute)
  window._onContractorChange = function(val) {
    var wrap = document.getElementById('ddCompanyWrap');
    if (wrap) wrap.style.display = val === 'yes' ? 'block' : 'none';
  };

  var contractorSelect = document.getElementById('ddIsContractor');
  var companyWrap = document.getElementById('ddCompanyWrap');
  if (contractorSelect && companyWrap) {
    contractorSelect.addEventListener('change', function() {
      companyWrap.style.display = this.value === 'yes' ? 'block' : 'none';
    });
  }

  // Dynamic role options based on service selection
  window._onServiceChange = function(val) {
    var stoneRoles    = document.querySelectorAll('#ddProfRole .dd-role-stone');
    var defaultRoles  = document.querySelectorAll('#ddProfRole .dd-role-default');
    var profSelect    = document.getElementById('ddProfRole');
    var showStone     = val === 'stone_sourcing' || val === 'both';
    stoneRoles.forEach(function(o)   { o.style.display = showStone ? '' : 'none'; });
    defaultRoles.forEach(function(o) { o.style.display = ''; });
    // Reset role selection when service changes
    if (profSelect) profSelect.value = '';
  };

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    errMsg.classList.remove('visible');
    btn.classList.add('loading');
    btn.disabled = true;

    var data = {
      full_name:    (document.getElementById('ddFirstName').value.trim() + ' ' + document.getElementById('ddLastName').value.trim()).trim(),
      email:        document.getElementById('ddEmail').value.trim(),
      phone:        document.getElementById('ddPhone').value.trim(),
      street:       document.getElementById('ddStreet').value.trim(),
      city:         document.getElementById('ddCity').value.trim(),
      state:        document.getElementById('ddState').value.trim(),
      zip:          document.getElementById('ddZip').value.trim(),
      country:      document.getElementById('ddCountry').value || '',
      referral:     document.getElementById('ddReferral').value || '',
      is_contractor: document.getElementById('ddIsContractor') ? document.getElementById('ddIsContractor').value === 'yes' : false,
      company_name: document.getElementById('ddCompany') ? document.getElementById('ddCompany').value.trim() || null : null,
      project_type: document.getElementById('ddServices').value,
      investment:   document.getElementById('ddInvestment').value.trim(),
      notes:        document.getElementById('ddNotes').value.trim(),
      status:       'client_inquiry_made',
      service_type:   (document.getElementById('ddServiceType') || {}).value || 'design_build',
      professional_role: document.getElementById('ddProfRole') ? document.getElementById('ddProfRole').value || null : null,
      client_stage: 'inquiry_submitted'
    };

    try {
      // ── STEP 1: Insert client record into database ────────────────
      var res = await fetch(SUPABASE_URL + '/rest/v1/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        var errBody = await res.text();
        console.error('Supabase insert error:', res.status, errBody);
        throw new Error('Insert failed');
      }

      // ── STEP 2: Portal email is sent automatically ──────────────
      // The Supabase database trigger (send-email) fires on INSERT
      // and sends the branded magic link email automatically.
      // No manual email call needed here — doing so would cause
      // duplicate emails. The trigger handles auth user creation
      // and the portal access link in one step.

      // ── STEP 3: Show success screen ───────────────────────────────
      form.style.display = 'none';
      success.classList.add('visible');

    } catch(err) {
      console.error('Form error:', err);
      errMsg.classList.add('visible');
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });

})();
