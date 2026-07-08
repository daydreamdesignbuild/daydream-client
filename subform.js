(function() {

  // ── Google Fonts ──────────────────────────────────────────────────
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400&display=swap';
  document.head.appendChild(font);

  // ── Styles (matches connect form brand system) ────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#dd-subform-wrap * { box-sizing: border-box; margin: 0; padding: 0; }',
    '#dd-subform-wrap {',
    '  --surface:    #faf8f5;',
    '  --surface-2:  #ede8df;',
    '  --border:     #ddd7ce;',
    '  --text:       #28231e;',
    '  --muted:      #8a7d73;',
    '  --gold:       #9e7b50;',
    '  --gold-hover: #c4a07a;',
    '  --gold-dim:   rgba(158,123,80,0.06);',
    '  --error:      #a05040;',
    '  --success:    #6a9e7a;',
    '  font-family: Jost, sans-serif; font-weight: 300;',
    '  color: var(--text); width: 100%; max-width: 720px; margin: 0 auto; padding: 48px 0; background: var(--surface);',
    '}',

    '#dd-subform-wrap header { text-align: center; margin-bottom: 40px; animation: ddSubFade 0.9s ease both; background: var(--surface); padding: 32px 24px; }',
    '#dd-subform-wrap .dd-logo { font-family: "Cormorant Garamond", serif; font-weight: 300; font-size: clamp(28px,5vw,40px); letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; line-height: 1; margin-bottom: 8px; }',
    '#dd-subform-wrap .dd-logo-sub { font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase; color: var(--muted); margin-bottom: 22px; }',
    '#dd-subform-wrap .dd-rule { display: flex; align-items: center; gap: 16px; justify-content: center; margin-bottom: 18px; }',
    '#dd-subform-wrap .dd-rule span { display: block; height: 1px; width: 60px; background: linear-gradient(90deg, transparent, var(--border)); }',
    '#dd-subform-wrap .dd-rule span:last-child { background: linear-gradient(90deg, var(--border), transparent); }',
    '#dd-subform-wrap .dd-diamond { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }',
    '#dd-subform-wrap .dd-subtitle { font-family: "Cormorant Garamond", serif; font-size: clamp(14px,2.5vw,18px); font-style: italic; font-weight: 300; color: var(--muted); letter-spacing: 0.04em; line-height: 1.5; max-width: 520px; margin: 0 auto; }',

    '#dd-subform-wrap form { display: flex; flex-direction: column; border: 1px solid var(--border); background: var(--surface); animation: ddSubFade 0.7s 0.2s ease both; opacity: 0; animation-fill-mode: both; }',

    '#dd-subform-wrap .dd-section { font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); padding: 18px 24px 12px; border-bottom: 1px solid var(--border); background: var(--surface-2); opacity: 0.95; }',
    '#dd-subform-wrap .dd-section-note { font-size: 11px; letter-spacing: 0.02em; text-transform: none; color: var(--muted); font-style: italic; margin-top: 4px; font-family: "Cormorant Garamond", serif; }',

    '#dd-subform-wrap .dd-row   { display: grid; grid-template-columns: 1fr 1fr; }',
    '#dd-subform-wrap .dd-row-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; }',

    '#dd-subform-wrap .dd-field { position: relative; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--surface); transition: background 0.25s; }',
    '#dd-subform-wrap .dd-row .dd-field:last-child, #dd-subform-wrap .dd-row-3 .dd-field:last-child, #dd-subform-wrap .dd-field.dd-full { border-right: none; }',
    '#dd-subform-wrap .dd-field:focus-within { background: var(--gold-dim); z-index: 2; }',
    '#dd-subform-wrap .dd-field:focus-within::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); }',
    '#dd-subform-wrap .dd-field label { display: block; font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); padding: 16px 24px 5px; transition: color 0.2s; font-family: Jost, sans-serif; }',
    '#dd-subform-wrap .dd-field:focus-within label { color: var(--gold); }',
    '#dd-subform-wrap .dd-field label .req { color: var(--gold); margin-left: 3px; }',

    '#dd-subform-wrap .dd-field input,',
    '#dd-subform-wrap .dd-field select,',
    '#dd-subform-wrap .dd-field textarea {',
    '  width: 100%; background: transparent !important; border: none !important; outline: none;',
    '  color: var(--text) !important; font-family: Jost, sans-serif; font-weight: 300; font-size: 14px;',
    '  padding: 0 24px 16px; -webkit-appearance: none; appearance: none;',
    '}',
    '#dd-subform-wrap .dd-field textarea { padding-top: 4px; resize: vertical; min-height: 90px; line-height: 1.6; }',
    '#dd-subform-wrap .dd-field select { cursor: pointer; padding-right: 44px; }',
    '#dd-subform-wrap .dd-field.dd-has-select::before { content: ""; position: absolute; right: 24px; top: 50%; width: 7px; height: 7px; border-right: 1px solid var(--muted); border-bottom: 1px solid var(--muted); transform: translateY(-30%) rotate(45deg); pointer-events: none; }',
    '#dd-subform-wrap .dd-field input::placeholder, #dd-subform-wrap .dd-field textarea::placeholder { color: var(--muted); opacity: 0.5; }',

    '#dd-subform-wrap .dd-checkrow { display: flex; align-items: center; gap: 12px; padding: 18px 24px; border-bottom: 1px solid var(--border); }',
    '#dd-subform-wrap .dd-checkrow input { width: 16px; height: 16px; accent-color: var(--gold); cursor: pointer; flex-shrink: 0; }',
    '#dd-subform-wrap .dd-checkrow label { font-size: 12px; color: var(--text); cursor: pointer; letter-spacing: 0.02em; line-height: 1.5; }',

    '#dd-subform-wrap .dd-submit-wrap { padding: 28px 24px; background: var(--surface); }',
    '#dd-subform-wrap button[type="submit"] { width: 100%; background: var(--gold); color: var(--surface); border: none; font-family: Jost, sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.35em; text-transform: uppercase; padding: 18px; cursor: pointer; transition: background 0.3s; position: relative; }',
    '#dd-subform-wrap button[type="submit"]:hover { background: var(--text); }',
    '#dd-subform-wrap button[type="submit"]:disabled { opacity: 0.5; cursor: not-allowed; }',
    '#dd-subform-wrap button.loading { color: transparent; }',
    '#dd-subform-wrap button.loading::after { content: ""; position: absolute; top: 50%; left: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; border: 2px solid var(--surface); border-top-color: transparent; border-radius: 50%; animation: ddSubSpin 0.7s linear infinite; }',

    '#dd-subform-wrap .dd-error { display: none; color: var(--error); font-size: 12px; text-align: center; padding: 0 24px 16px; letter-spacing: 0.02em; }',
    '#dd-subform-wrap .dd-error.visible { display: block; }',

    '#dd-subform-wrap .dd-success { display: none; text-align: center; padding: 60px 32px; border: 1px solid var(--border); background: var(--surface); animation: ddSubFade 0.7s ease both; }',
    '#dd-subform-wrap .dd-success.visible { display: block; }',
    '#dd-subform-wrap .dd-success .dd-success-mark { width: 56px; height: 56px; border: 1px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--gold); font-size: 26px; }',
    '#dd-subform-wrap .dd-success h3 { font-family: "Cormorant Garamond", serif; font-size: 28px; font-weight: 300; color: var(--text); margin-bottom: 12px; letter-spacing: 0.02em; }',
    '#dd-subform-wrap .dd-success p { font-size: 14px; color: var(--muted); line-height: 1.7; max-width: 440px; margin: 0 auto 8px; }',
    '#dd-subform-wrap .dd-success .dd-portal-btn { display: inline-block; margin-top: 24px; background: var(--gold); color: var(--surface); text-decoration: none; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; padding: 14px 32px; transition: background 0.3s; }',
    '#dd-subform-wrap .dd-success .dd-portal-btn:hover { background: var(--text); }',

    '@keyframes ddSubFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }',
    '@keyframes ddSubSpin { to { transform: rotate(360deg); } }',

    '@media (max-width: 640px) {',
    '  #dd-subform-wrap { padding: 24px 0; }',
    '  #dd-subform-wrap .dd-row, #dd-subform-wrap .dd-row-3 { grid-template-columns: 1fr; }',
    '  #dd-subform-wrap .dd-field { border-right: none !important; }',
    '  #dd-subform-wrap header { margin-bottom: 28px; padding: 24px 16px; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);


  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-subform-wrap');
  if (!wrap) return;

  wrap.innerHTML = [
    '<header>',
    '  <div class="dd-logo">Daydream</div>',
    '  <div class="dd-logo-sub">Trade Partner Network</div>',
    '  <div class="dd-rule"><span></span><div class="dd-diamond"></div><span></span></div>',
    '  <div class="dd-subtitle">Join our network of vetted subcontractors and vendors. Tell us about your company and we will set up your partner portal to collect the details we need to work together.</div>',
    '</header>',

    '<form id="ddSubForm">',

    // Company Information
    '  <div class="dd-section">Company Information</div>',
    '  <div class="dd-row">',
    '    <div class="dd-field"><label>Legal Business Name<span class="req">*</span></label><input type="text" id="sfLegalName" required placeholder="ABC Masonry LLC" /></div>',
    '    <div class="dd-field"><label>DBA / Trade Name</label><input type="text" id="sfDba" placeholder="If different" /></div>',
    '  </div>',
    '  <div class="dd-row-3">',
    '    <div class="dd-field dd-has-select"><label>Business Structure</label><select id="sfStructure"><option value="">Select...</option><option value="llc">LLC</option><option value="s_corp">S-Corporation</option><option value="c_corp">C-Corporation</option><option value="sole_prop">Sole Proprietor</option><option value="partnership">Partnership</option><option value="other">Other</option></select></div>',
    '    <div class="dd-field"><label>EIN</label><input type="text" id="sfEin" placeholder="00-0000000" /></div>',
    '    <div class="dd-field"><label>Years in Business</label><input type="text" id="sfYears" placeholder="e.g. 8" /></div>',
    '  </div>',
    '  <div class="dd-row">',
    '    <div class="dd-field dd-full"><label>Business Address</label><input type="text" id="sfAddress" placeholder="Street, City, State, ZIP" /></div>',
    '  </div>',
    '  <div class="dd-row">',
    '    <div class="dd-field"><label>Business Phone</label><input type="tel" id="sfPhone" placeholder="(770) 000-0000" /></div>',
    '    <div class="dd-field"><label>Website</label><input type="text" id="sfWebsite" placeholder="yourcompany.com" /></div>',
    '  </div>',

    // Primary Contact
    '  <div class="dd-section">Primary Contact</div>',
    '  <div class="dd-row">',
    '    <div class="dd-field"><label>Contact Name<span class="req">*</span></label><input type="text" id="sfContactName" required placeholder="Full name" /></div>',
    '    <div class="dd-field"><label>Title / Role</label><input type="text" id="sfContactTitle" placeholder="Owner, Estimator..." /></div>',
    '  </div>',
    '  <div class="dd-row">',
    '    <div class="dd-field"><label>Email<span class="req">*</span></label><input type="email" id="sfContactEmail" required placeholder="you@company.com" /></div>',
    '    <div class="dd-field"><label>Direct Phone</label><input type="tel" id="sfContactPhone" placeholder="(770) 000-0000" /></div>',
    '  </div>',

    // Trade & Capability
    '  <div class="dd-section">Trade &amp; Capability</div>',
    '  <div class="dd-row">',
    '    <div class="dd-field dd-has-select"><label>Primary Trade<span class="req">*</span></label><select id="sfPrimaryTrade" required><option value="">Select...</option><option>Masonry / Stone</option><option>Concrete / Flatwork</option><option>Excavation / Grading</option><option>Pool Construction</option><option>Plumbing</option><option>Electrical</option><option>Gas / Fire Features</option><option>Carpentry / Framing</option><option>Pavers / Hardscape</option><option>Landscaping / Planting</option><option>Irrigation</option><option>Drainage</option><option>Fencing</option><option>Metal / Welding</option><option>Lighting</option><option>Audio / Low Voltage</option><option>Painting / Finishing</option><option>Steel / Structural</option><option>Other</option></select></div>',
    '    <div class="dd-field"><label>Service Area</label><input type="text" id="sfServiceArea" placeholder="e.g. North Metro Atlanta" /></div>',
    '  </div>',
    '  <div class="dd-row">',
    '    <div class="dd-field dd-full"><label>All Trades / Services Offered</label><input type="text" id="sfTrades" placeholder="List all trades you provide, comma separated" /></div>',
    '  </div>',
    '  <div class="dd-row-3">',
    '    <div class="dd-field"><label>Typical Crew Size</label><input type="text" id="sfCrewSize" placeholder="e.g. 4-6" /></div>',
    '    <div class="dd-field"><label>License Number</label><input type="text" id="sfLicense" placeholder="If applicable" /></div>',
    '    <div class="dd-field"><label>License State</label><input type="text" id="sfLicenseState" placeholder="GA" /></div>',
    '  </div>',

    // References & Notes
    '  <div class="dd-section">References &amp; Notes<div class="dd-section-note">Optional, but helps us evaluate faster</div></div>',
    '  <div class="dd-row">',
    '    <div class="dd-field dd-full"><label>Trade References</label><textarea id="sfReferences" placeholder="Names, companies, and contact info for 2-3 references..."></textarea></div>',
    '  </div>',
    '  <div class="dd-row">',
    '    <div class="dd-field dd-full"><label>Anything Else We Should Know</label><textarea id="sfNotes" placeholder="Notable projects, certifications, specialties, or a note about why you want to work with us..."></textarea></div>',
    '  </div>',

    // Consent
    '  <div class="dd-checkrow"><input type="checkbox" id="sfConsent" required /><label for="sfConsent">I confirm the information above is accurate and I am authorized to represent this company. I understand Daydream will request insurance certificates, a W-9, and a signed subcontractor agreement before work begins.</label></div>',

    '  <div class="dd-error" id="sfError">Something went wrong. Please check your details and try again.</div>',
    '  <div class="dd-submit-wrap"><button type="submit" id="sfSubmit">Submit &amp; Create Portal Access</button></div>',
    '</form>',

    '<div class="dd-success" id="sfSuccess">',
    '  <div class="dd-success-mark">&#10003;</div>',
    '  <h3>Welcome to the Network</h3>',
    '  <p>Your company has been added to our trade partner list. We have created your secure partner portal where you can upload your W-9, insurance certificates, and other documents when requested.</p>',
    '  <p>Check your email for a secure sign-in link to access your portal.</p>',
    '  <a href="https://daydreamdesignandbuild.com/vendor-portal/" class="dd-portal-btn">Go to Partner Portal</a>',
    '</div>'
  ].join('\n');

  // ── Supabase ──────────────────────────────────────────────────────
  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';

  var form    = document.getElementById('ddSubForm');
  var btn     = document.getElementById('sfSubmit');
  var errMsg  = document.getElementById('sfError');
  var success = document.getElementById('sfSuccess');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    errMsg.classList.remove('visible');

    var legalName    = document.getElementById('sfLegalName').value.trim();
    var contactName  = document.getElementById('sfContactName').value.trim();
    var contactEmail = document.getElementById('sfContactEmail').value.trim();
    var primaryTrade = document.getElementById('sfPrimaryTrade').value;
    var consent      = document.getElementById('sfConsent').checked;

    if (!legalName || !contactName || !contactEmail || !primaryTrade || !consent) {
      errMsg.textContent = 'Please complete all required fields and confirm the checkbox.';
      errMsg.classList.add('visible');
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;

    var data = {
      company_legal_name: legalName,
      dba_name:           document.getElementById('sfDba').value.trim() || null,
      business_structure: document.getElementById('sfStructure').value || null,
      ein:                document.getElementById('sfEin').value.trim() || null,
      years_in_business:  document.getElementById('sfYears').value.trim() || null,
      business_address:   document.getElementById('sfAddress').value.trim() || null,
      business_phone:     document.getElementById('sfPhone').value.trim() || null,
      website:            document.getElementById('sfWebsite').value.trim() || null,
      contact_name:       contactName,
      contact_title:      document.getElementById('sfContactTitle').value.trim() || null,
      contact_email:      contactEmail.toLowerCase(),
      contact_phone:      document.getElementById('sfContactPhone').value.trim() || null,
      primary_trade:      primaryTrade,
      trades:             document.getElementById('sfTrades').value.trim() || null,
      service_area:       document.getElementById('sfServiceArea').value.trim() || null,
      crew_size:          document.getElementById('sfCrewSize').value.trim() || null,
      license_number:     document.getElementById('sfLicense').value.trim() || null,
      license_state:      document.getElementById('sfLicenseState').value.trim() || null,
      trade_references:   document.getElementById('sfReferences').value.trim() || null,
      notes:              document.getElementById('sfNotes').value.trim() || null,
      status:             'new',
      compliance_status:  'incomplete',
      auth_email:         contactEmail.toLowerCase()
    };

    try {
      // STEP 1: Insert subcontractor record (triggers Drive folder webhook)
      var res = await fetch(SUPABASE_URL + '/rest/v1/subcontractors', {
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

      // STEP 2: Send portal magic-link invite (auto-approve = instant access)
      try {
        await fetch(SUPABASE_URL + '/functions/v1/invite-subcontractor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + SUPABASE_KEY,
            'apikey': SUPABASE_KEY
          },
          body: JSON.stringify({ email: contactEmail.toLowerCase(), company: legalName, contact_name: contactName })
        });
      } catch(inviteErr) {
        console.log('Invite send note (non-fatal):', inviteErr.message);
      }

      // STEP 3: Show success
      form.style.display = 'none';
      success.classList.add('visible');
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}

      // STEP 4: GTM event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'subcontractor_signup',
        'form_name': 'trade_partner_signup',
        'primary_trade': primaryTrade
      });

    } catch(err) {
      console.error('Subform error:', err);
      errMsg.textContent = 'Something went wrong. Please check your details and try again.';
      errMsg.classList.add('visible');
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });

})();
