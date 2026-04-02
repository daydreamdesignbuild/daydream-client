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

  var ALL_SERVICES = [
    { key: '2d_concept',             label: '2D Concept Phase' },
    { key: '3d_concept',             label: '3D Concept Phase' },
    { key: '2d_3d_concept',          label: '2D + 3D Concept Phase' },
    { key: 'permit_plan',            label: 'Permit Plan Phase' },
    { key: '2d_3d_permit',           label: '2D + 3D + Permit Plan Phase' },
    { key: 'site_plans',             label: 'Site Plans' },
    { key: 'retaining_wall_permit',  label: 'Permit Plans — Retaining Walls' },
    { key: 'deck_permit',            label: 'Permit Plans — Decks' },
    { key: 'pavilion_permit',        label: 'Permit Plans — Pavilion' },
    { key: 'pergola_permit',         label: 'Permit Plans — Pergola' },
    { key: 'shade_permit',           label: 'Permit Plans — Shade Structures' },
    { key: 'shade_structures',       label: 'Shade Structures' },
    { key: 'pergolas',               label: 'Pergolas' },
    { key: 'drainage_plans',         label: 'Drainage Plans' },
    { key: 'planting_plans',         label: 'Planting Plans' },
    { key: 'irrigation_plans',       label: 'Irrigation Plans' },
    { key: 'outdoor_audio',          label: 'Outdoor Audio Plans' },
    { key: 'outdoor_lighting',       label: 'Outdoor Lighting Plans' },
    { key: 'furniture_layout',       label: 'Outdoor Furniture Layout' },
    { key: 'grading_plans',          label: 'Grading Plans' },
    { key: 'stormwater_plans',       label: 'Stormwater Management Plans' },
    { key: 'site_consultation',      label: 'Site Consultation' }
  ];

  var CHECKLIST_LABELS = {
    'goals':      'Project Goals & Must-Have Features',
    'inspo':      'Inspiration Photos or Boards',
    'photos':     'Site Photos & Walkthrough Video',
    'survey':     'Property Survey / Site Plat',
    'bylaws':     'HOA Bylaws & Neighborhood Covenants',
    'houseplans': 'Existing House Architectural Plans'
  };

  // Project types per spec
  var PROJECT_TYPES = [
    { key: 'full_yard',              label: 'Full Yard' },
    { key: 'front_yard',             label: 'Front Yard' },
    { key: 'backyard',               label: 'Backyard' },
    { key: 'outdoor_living',         label: 'Outdoor Living' },
    { key: 'landscape_construction', label: 'Landscape Construction' },
    { key: 'pool_and_spa',           label: 'Pool & Spa' },
    { key: 'custom',                 label: 'Custom / Other' }
  ];
  window._PROJECT_TYPES = PROJECT_TYPES;

  // Expose ALL_SERVICES globally so renderClientServices can access it
  window._ALL_SERVICES = ALL_SERVICES;

  // Fix _addService to use window._ALL_SERVICES
  window._addService = async function(clientId) {
    var sel = document.getElementById('svc-select-' + clientId);
    var customInput = document.getElementById('svc-custom-input-' + clientId);
    if (!sel) return;
    var serviceKey = sel.value;
    var serviceName = '';
    if (!serviceKey) return;
    var found = (window._ALL_SERVICES || []).find(function(s) { return s.key === serviceKey; });
    serviceName = found ? found.label : serviceKey;
    try {
      await apiFetch('/rest/v1/client_services', {
        method: 'POST',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ client_id: clientId, service_name: serviceName, service_key: serviceKey, status: 'pending' })
      });
      if (sel) sel.value = '';
      await window.loadClientServices(clientId);
    } catch(e) { console.error('Add service error:', e); }
  };

  function getPipelineStage(value) {
    return PIPELINE_STAGES.find(function(s) { return s.value === value; }) || { value: value, label: value || 'New Inquiry', color: '#8a8680' };
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
    '#dd-admin .da-tabs { background: var(--surface); border-bottom: 1px solid var(--border); display: flex; padding: 0 32px; overflow-x: auto; }',
    '#dd-admin .da-tab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 14px 20px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; background: none; border-left: none; border-right: none; border-top: none; white-space: nowrap; }',
    '#dd-admin .da-tab:hover { color: var(--text); }',
    '#dd-admin .da-tab.active { color: var(--gold); border-bottom-color: var(--gold); }',
    '#dd-admin .da-tab-add { color: var(--gold) !important; font-weight: 500; }',
    '#dd-admin .da-msg-dot { display: inline-block; background: var(--gold); color: var(--bg); font-size: 8px; font-family: Jost, sans-serif; padding: 1px 5px; border-radius: 8px; margin-left: 4px; vertical-align: middle; min-width: 16px; text-align: center; }',
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
    '#dd-admin .da-role-badge { font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; padding: 2px 8px; border: 1px solid; margin-left: 8px; vertical-align: middle; }',
    '#dd-admin .da-role-badge.contractor { background: var(--gold-dim); border-color: var(--gold); color: var(--gold); }',
    '#dd-admin .da-role-badge.client { background: rgba(106,158,122,0.1); border-color: var(--success); color: var(--success); }',
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

    // Contractor projects section
    '#dd-admin .da-contractor-projects { border: 1px solid var(--border); margin: 12px 0 4px; }',
    '#dd-admin .da-contractor-projects-header { padding: 10px 16px; background: var(--surface-2); border-bottom: 1px solid var(--border); font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }',
    '#dd-admin .da-contractor-project-row { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 12px; }',
    '#dd-admin .da-contractor-project-row:last-child { border-bottom: none; }',
    '#dd-admin .da-contractor-project-name { font-size: 12px; color: var(--text); flex: 1; }',
    '#dd-admin .da-contractor-project-address { font-size: 10px; color: var(--muted); }',

    // Services
    '#dd-admin .da-services-wrap { display: flex; flex-direction: column; gap: 6px; padding: 8px 0; }',
    '#dd-admin .da-service-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 12px; background: var(--surface-2); border: 1px solid var(--border); }',
    '#dd-admin .da-service-name { font-size: 12px; color: var(--text); flex: 1; }',
    '#dd-admin .da-service-actions { display: flex; align-items: center; gap: 8px; }',
    '#dd-admin .da-service-status { background: var(--surface); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 10px; padding: 4px 8px; outline: none; cursor: pointer; appearance: none; transition: border-color 0.2s; }',
    '#dd-admin .da-service-status:focus { border-color: var(--gold); }',
    '#dd-admin .da-service-remove { background: none; border: 1px solid var(--border); color: var(--muted); font-size: 10px; padding: 4px 8px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }',
    '#dd-admin .da-service-remove:hover { color: var(--error); border-color: var(--error); }',
    '#dd-admin .da-add-service-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }',

    // Services checklist
    '#dd-admin .da-svc-checklist-wrap { border: 1px solid var(--border); margin-top: 10px; }',
    '#dd-admin .da-svc-checklist-header { padding: 10px 14px; background: var(--surface-2); cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); transition: background 0.2s; }',
    '#dd-admin .da-svc-checklist-header:hover { background: var(--gold-dim); }',
    '#dd-admin .da-svc-selected-count { font-size: 9px; color: var(--bg); background: var(--gold); padding: 2px 8px; border-radius: 8px; }',
    '#dd-admin .da-svc-checklist-body { display: none; padding: 12px 14px; border-top: 1px solid var(--border); }',
    '#dd-admin .da-svc-checklist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px; }',
    '#dd-admin .da-svc-check-label { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text); cursor: pointer; padding: 6px 8px; border: 1px solid var(--border); transition: background 0.15s, border-color 0.15s; }',
    '#dd-admin .da-svc-check-label:hover { border-color: var(--gold); background: var(--gold-dim); }',
    '#dd-admin .da-svc-check-label input { accent-color: var(--gold); width: 13px; height: 13px; cursor: pointer; flex-shrink: 0; }',
    '#dd-admin .da-svc-check-label.da-svc-check-added { opacity: 0.5; cursor: not-allowed; }',
    '#dd-admin .da-svc-added-tag { margin-left: auto; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--success); }',
    '#dd-admin .da-svc-custom-row { display: flex; gap: 8px; margin-top: 4px; }',

    // Admin Notes
    '#dd-admin .da-notes-log { max-height: 260px; overflow-y: auto; border: 1px solid var(--border); background: var(--surface-2); margin-top: 8px; }',
    '#dd-admin .da-notes-log-empty { padding: 16px; font-size: 11px; color: var(--muted); text-align: center; letter-spacing: 0.08em; }',
    '#dd-admin .da-note-entry { padding: 12px 16px; border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-note-entry:last-child { border-bottom: none; }',
    '#dd-admin .da-note-entry-meta { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }',
    '#dd-admin .da-note-entry-text { font-size: 12px; color: var(--text); line-height: 1.7; white-space: pre-wrap; }',
    '#dd-admin .da-notes-new { margin-top: 8px; }',
    '#dd-admin .da-note-textarea { width: 100%; background: var(--surface-2); border: 1px solid var(--border); border-top: none; color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 12px 14px; resize: vertical; min-height: 100px; outline: none; line-height: 1.7; transition: border-color 0.2s; }',
    '#dd-admin .da-note-textarea:focus { border-color: var(--gold); }',
    '#dd-admin .da-note-textarea::placeholder { color: var(--muted); }',

    // Add Client Modal
    '#dd-admin .da-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 999999; display: none; align-items: flex-start; justify-content: center; padding: 80px 20px 20px; overflow-y: auto; }',
    '#dd-admin .da-modal-overlay.visible { display: flex; }',
    '#dd-admin .da-modal { background: var(--surface); border: 1px solid var(--border); width: 100%; max-width: 640px; }',    
    '#dd-admin .da-modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--surface-2); }',
    '#dd-admin .da-modal-title { font-family: "Cormorant Garamond", serif; font-size: 22px; font-weight: 300; color: var(--gold); }',
    '#dd-admin .da-modal-close { background: none; border: none; color: var(--muted); font-size: 20px; cursor: pointer; transition: color 0.2s; }',
    '#dd-admin .da-modal-close:hover { color: var(--text); }',
    '#dd-admin .da-modal-body { padding: 24px; }',
    '#dd-admin .da-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }',
    '#dd-admin .da-modal-field { display: flex; flex-direction: column; gap: 6px; }',
    '#dd-admin .da-field-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }',
    '#dd-admin .da-field-input { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 12px; outline: none; transition: border-color 0.2s; width: 100%; resize: vertical; }',
    '#dd-admin .da-field-input:focus { border-color: var(--gold); }',
    '#dd-admin .da-field-input::placeholder { color: var(--muted); }',
    '#dd-admin .da-modal-check { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-size: 12px; color: var(--text); }',
    '#dd-admin .da-modal-check input { accent-color: var(--gold); width: 14px; height: 14px; cursor: pointer; }',
    '#dd-admin .da-modal-check label { cursor: pointer; }',
    '#dd-admin .da-modal-msg { font-size: 11px; min-height: 20px; margin-bottom: 12px; }',
    '#dd-admin .da-modal-msg.success { color: var(--success); }',
    '#dd-admin .da-modal-msg.error { color: var(--error); }',
    '#dd-admin .da-modal-submit { width: 100%; background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px; cursor: pointer; transition: opacity 0.2s; }',
    '#dd-admin .da-modal-submit:hover { opacity: 0.85; }',
    '#dd-admin .da-modal-submit:disabled { opacity: 0.4; cursor: not-allowed; }',
    '#dd-admin #acServicesSelect option { padding: 8px 12px; font-family: Jost, sans-serif; font-size: 12px; color: var(--text); background: var(--surface-2); cursor: pointer; }',
    '#dd-admin #acServicesSelect option:checked { background: var(--gold); color: var(--bg); }',
    '#dd-admin #acServicesSelect:focus { border-color: var(--gold); outline: none; }',










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
    '@media (max-width: 700px) { #dd-admin .da-stats { flex-direction: column; } #dd-admin .da-nav { padding: 0 16px; } #dd-admin .da-toolbar { padding: 16px; } #dd-admin .da-cards-wrap { padding: 16px; } #dd-admin .da-details-grid { grid-template-columns: 1fr; } #dd-admin .da-messages-wrap, #dd-admin .da-checklist-wrap { padding: 16px; } #dd-admin .da-modal-grid { grid-template-columns: 1fr; } #dd-admin .da-svc-checklist-grid { grid-template-columns: 1fr; } }'
  ].join('\n');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────
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
    '    <button class="da-tab da-tab-add" data-tab="add-client">+ Add Client</button>',
    '    <button class="da-tab da-tab-add" data-tab="projects">Projects</button>',
    '    <button class="da-tab" data-tab="checklist">Onboarding</button>',
    '    <button class="da-tab" data-tab="messages">Messages</button>',
    '  </div>',
    '  <div class="da-tab-content active" id="tab-clients">',
    '    <div class="da-toolbar"><input class="da-search" type="text" id="daSearch" placeholder="Search by name, email or phone..." /><select class="da-filter" id="daFilter">' + filterOptions + '</select><div class="da-count" id="daCount"></div></div>',
    '    <div class="da-cards-wrap" id="daCardsWrap"></div>',
    '  </div>',
    '  <div class="da-tab-content" id="tab-add-client">',
    '    <div class="da-add-client-wrap">',
    '      <div class="da-section-title">Add New Client</div>',
    '      <div class="da-add-client-form">',
    '        <div class="da-modal-grid">',
    '          <div class="da-modal-field"><label class="da-field-label">Full Name *</label><input class="da-field-input" type="text" id="acName" placeholder="Jesse House" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Email *</label><input class="da-field-input" type="email" id="acEmail" placeholder="client@email.com" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Phone</label><input class="da-field-input" type="text" id="acPhone" placeholder="404-555-0123" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Company (contractors)</label><input class="da-field-input" type="text" id="acCompany" placeholder="Smith Contracting LLC" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Investment</label><input class="da-field-input" type="text" id="acInvestment" placeholder="$75,000" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">How Did They Hear About Us?</label><select class="da-field-input" id="acReferral"><option value="">Select...</option><option>Google Search</option><option>Instagram</option><option>Facebook</option><option>LinkedIn</option><option>YouTube</option><option>Houzz</option><option>Nextdoor</option><option>Referral — Friend or Family</option><option>Referral — Past Client</option><option>Yard Sign / Drove By</option><option>Home Show / Event</option><option>Other</option></select></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Project Address</label><input class="da-field-input" type="text" id="acStreet" placeholder="123 Main St, Atlanta GA" /></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Notes</label><textarea class="da-field-input" id="acNotes" rows="3" placeholder="Any additional notes..."></textarea></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1">',
    '            <label class="da-field-label" style="margin-bottom:8px;display:block">Project Services <span style="color:var(--muted);font-size:9px;letter-spacing:0.1em;text-transform:none">(hold Ctrl / Cmd to select multiple)</span></label>',
    '            <select class="da-field-input" id="acServicesSelect" multiple size="7" style="height:auto;padding:0">' + ALL_SERVICES.map(function(s) { return '<option value="' + s.key + '" data-label="' + s.label + '">' + s.label + '</option>'; }).join('') + '</select>',
    '            <input class="da-field-input" id="acCustomService" type="text" placeholder="Custom service (optional)..." style="margin-top:8px" />',
    '          </div>',
    '        </div>',
    '        <div class="da-modal-check"><input type="checkbox" id="acContractor" /><label for="acContractor">This is a contractor (will have multiple projects)</label></div>',
    '        <div class="da-modal-check"><input type="checkbox" id="acSendEmail" checked /><label for="acSendEmail">Send welcome email with portal access link</label></div>',
    '        <div class="da-modal-msg" id="acMsg"></div>',
    '        <button class="da-modal-submit" id="acSubmit">Add Client</button>',
    '      </div>',
    '    </div>',
    '  </div>',

    '  <div class="da-tab-content" id="tab-projects">',
    '    <div class="da-add-client-wrap">',
    '      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">',
    '        <div class="da-section-title" style="margin-bottom:0">Projects</div>',
    '        <button class="da-add-btn" id="daShowAddProjectForm" onclick="window._showAddProjectForm()">+ Add Project</button>',
    '      </div>',
    '      <div id="daAddProjectForm" style="display:none;background:var(--surface);border:1px solid var(--border);padding:24px;margin-bottom:24px">',
    '        <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:16px">New Project</div>',
    '        <div class="da-modal-grid">',
    '          <div class="da-modal-field"><label class="da-field-label">Client *</label><select class="da-field-input" id="apClientId"><option value="">Select client...</option></select></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Project Name *</label><input class="da-field-input" type="text" id="apProjectName" placeholder="e.g. Backyard Renovation" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Project Type</label><select class="da-field-input" id="apProjectType"><option value="">Select type...</option><option value="full_yard">Full Yard</option><option value="front_yard">Front Yard</option><option value="backyard">Backyard</option><option value="outdoor_living">Outdoor Living</option><option value="landscape_construction">Landscape Construction</option><option value="pool_and_spa">Pool & Spa</option><option value="custom">Custom / Other</option></select></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Start Date</label><input class="da-field-input" type="date" id="apStartDate" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">End Date</label><input class="da-field-input" type="date" id="apEndDate" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Project Address</label><input class="da-field-input" type="text" id="apAddress" placeholder="123 Main St, Atlanta GA" /></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Goals / Notes</label><textarea class="da-field-input" id="apGoals" rows="3" placeholder="Project goals and key details..."></textarea></div>',
    '        </div>',
    '        <div class="da-modal-msg" id="apMsg"></div>',
    '        <div style="display:flex;gap:12px;margin-top:12px">',
    '          <button class="da-modal-submit" id="apSubmit" style="flex:1" onclick="window._submitAddProject()">Create Project</button>',
    '          <button class="da-modal-submit" style="background:var(--surface);color:var(--muted);border-color:var(--border);flex:0 0 auto;width:120px" onclick="window._hideAddProjectForm()">Cancel</button>',
    '        </div>',
    '      </div>',
    '      <div id="daProjectsList"></div>',
    '    </div>',
    '  </div>',

    '  <div class="da-tab-content" id="tab-checklist">',
    '    <div class="da-checklist-wrap"><div class="da-section-title">Client Onboarding</div><input class="da-checklist-search" type="text" id="daCheckSearch" placeholder="Search clients..." /><div id="daChecklistWrap"></div></div>',
    '  </div>',
    '  <div class="da-tab-content" id="tab-messages">',
    '    <div class="da-messages-wrap"><div class="da-section-title">Client Messages</div><div id="daMsgList"></div></div>',
    '  </div>',
    '</div>',
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var allClients = [];

  // Expose apiFetch globally so onclick handlers can use it
  window._apiFetch = function(path, options) {
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SKEY;
    opts.headers['Authorization'] = 'Bearer ' + SKEY;
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SURL + path, opts);
  };
  var allMessages = [];
  var allChecklists = {};
  var allNotes = {};

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
    var found = ALL_SERVICES.find(function(s) { return s.key === key; });
    return found ? found.label : (key || '—');
  }
  function initials(name) { if (!name) return '?'; var p = name.trim().split(' '); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  function formatInvestment(inv) { if (!inv) return ''; var n = (inv || '').replace(/[^0-9.]/g, ''); return n && !isNaN(n) ? '$' + Number(n).toLocaleString() : inv; }

  // ── TABS ──────────────────────────────────────────────────────────
  document.querySelectorAll('#dd-admin .da-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
      if (tab.dataset.tab === 'projects') { loadProjects(); }
      if (tab.dataset.tab === 'messages') {
        loadMessages();
        apiFetch('/rest/v1/messages?sender=neq.daydream_team&is_read=eq.false', { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ is_read: true }) }).catch(function() {});
        var dot = tab.querySelector('.da-msg-dot');
        if (dot) dot.remove();
      }
      if (tab.dataset.tab === 'checklist') loadAllChecklists();
    });
  });

  // ── LOGIN ─────────────────────────────────────────────────────────
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

  // ── LOAD CLIENTS ──────────────────────────────────────────────────
  async function loadClients() {
    try {
      var res = await apiFetch('/rest/v1/clients?order=created_at.desc');
      allClients = await res.json();
      updateStats();
      renderCards(allClients);
      checkUnreadMessages();
    } catch(e) {}
  }

  async function checkUnreadMessages() {
    try {
      var res = await apiFetch('/rest/v1/messages?is_read=eq.false&order=created_at.desc&limit=50');
      var msgs = await res.json();
      var unread = (msgs || []).filter(function(m) { return m.sender !== 'daydream_team'; }).length;
      var msgTab = document.querySelector('#dd-admin [data-tab="messages"]');
      if (msgTab && unread > 0) {
        var dot = msgTab.querySelector('.da-msg-dot');
        if (!dot) { dot = document.createElement('span'); dot.className = 'da-msg-dot'; msgTab.appendChild(dot); }
        dot.textContent = unread;
      }
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

  // ── RENDER CARDS ──────────────────────────────────────────────────
  function renderCards(clients) {
    var container = document.getElementById('daCardsWrap');
    document.getElementById('daCount').textContent = clients.length + ' client' + (clients.length !== 1 ? 's' : '');
    if (!clients.length) { container.innerHTML = '<div class="da-empty">No clients found</div>'; return; }

    // Group contractors (same email = same contractor)
    var seen = {};
    var grouped = [];
    clients.forEach(function(c) {
      if (c.is_contractor) {
        if (!seen[c.email]) { seen[c.email] = { lead: c, projects: [] }; grouped.push(seen[c.email]); }
        seen[c.email].projects.push(c);
      } else {
        grouped.push({ lead: c, projects: [] });
      }
    });

    container.innerHTML = grouped.map(function(g) {
      var c = g.lead;
      var isContractor = c.is_contractor && g.projects.length > 0;
      var stage = getPipelineStage(c.status || 'client_inquiry_made');
      var inv = formatInvestment(c.investment || '');

      var pOpts = PIPELINE_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.status === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');
      var cOpts = CLIENT_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.client_stage === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');
      var contractOpts = CONTRACT_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.contract_status === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');
      var paymentOpts = PAYMENT_STAGES.map(function(s) { return '<option value="' + s.value + '"' + (c.payment_status === s.value ? ' selected' : '') + '>' + s.label + '</option>'; }).join('');

      // Contractor projects list
      var contractorProjectsHtml = '';
      if (isContractor && g.projects.length > 1) {
        contractorProjectsHtml = '<div class="da-contractor-projects"><div class="da-contractor-projects-header">All Projects (' + g.projects.length + ')</div>'
          + g.projects.map(function(p) {
            var addr = [p.street, p.city, p.state].filter(Boolean).join(', ');
            return '<div class="da-contractor-project-row"><div><div class="da-contractor-project-name">' + (p.full_name || 'Project') + '</div><div class="da-contractor-project-address">' + (addr || '—') + '</div></div><div class="da-stage-pill" style="color:' + getPipelineStage(p.status).color + ';border-color:' + getPipelineStage(p.status).color + ';background:' + getPipelineStage(p.status).color + '18;font-size:7px">' + getPipelineStage(p.status).label + '</div></div>';
          }).join('')
          + '</div>';
      }

      return '<div class="da-client-card" id="card-' + c.id + '">'
        + '<div class="da-card-top" onclick="window._toggleCard(\'' + c.id + '\')">'
        + '  <div class="da-card-left"><div class="da-card-avatar">' + initials(c.full_name) + '</div>'
        + '  <div><div class="da-card-name">' + (c.company_name || c.full_name || 'Unknown') + (isContractor ? '<span class="da-contractor-badge">Contractor</span>' : '') + '</div><div class="da-card-sub">' + (c.email || '') + (c.phone ? ' &middot; ' + c.phone : '') + '</div></div></div>'
        + '  <div class="da-card-right"><div class="da-stage-pill" style="color:' + stage.color + ';border-color:' + stage.color + ';background:' + stage.color + '18">' + stage.label + '</div><div class="da-card-investment">' + inv + '</div><div class="da-card-date">' + formatDate(c.created_at) + '</div><div class="da-expand-icon" id="exp-' + c.id + '">&#9660;</div></div>'
        + '</div>'
        + '<div class="da-card-details" id="det-' + c.id + '">'
        + '  <div class="da-details-grid">'
        + '    <div class="da-detail-item"><div class="da-detail-label">Project Type</div><div class="da-detail-value">' + serviceLabel(c.project_type) + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Investment</div><div class="da-detail-value">' + (inv || '—') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Address</div><div class="da-detail-value">' + [c.street, c.city, c.state, c.zip].filter(Boolean).join(', ') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Referral</div><div class="da-detail-value">' + (c.referral || '—') + '</div></div>'
        + '    <div class="da-detail-item" style="grid-column:1/-1"><div class="da-detail-label">Notes</div><div class="da-detail-value">' + (c.notes || '—') + '</div></div>'
        + '  </div>'
        + contractorProjectsHtml
        + '  <div class="da-card-actions">'
        + '    <div class="da-section-divider">Internal Pipeline</div>'
        + '    <div class="da-action-row"><select class="da-select" id="psel-' + c.id + '">' + pOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'status\', \'psel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Project Type</div>'
        + '<div class="da-action-row"><select class="da-select" id="ptypesel-' + c.id + '"><option value="">Select project type...</option>' + (window._PROJECT_TYPES || []).map(function(t) { return '<option value="' + t.key + '"' + (c.project_type_category === t.key ? ' selected' : '') + '>' + t.label + '</option>'; }).join('') + '</select><button class="da-update-btn" id="ptypebtn-' + c.id + '" onclick="window._updateProjType(\'' + c.id + '\')">Update</button></div>'
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
        + '    <div class="da-section-divider">Scope of Work</div>'
        + '    <div class="da-services-wrap" id="services-' + c.id + '"><div style="font-size:11px;color:var(--muted);padding:8px 0">Loading services...</div></div>'
        + '    <div class="da-section-divider">Admin Notes</div>'
        + '    <div class="da-notes-log" id="notes-log-' + c.id + '"><div class="da-notes-log-empty">No notes yet</div></div>'
        + '    <div class="da-notes-new">'
        + '      <textarea class="da-note-textarea" id="note-new-' + c.id + '" placeholder="Write a note..."></textarea>'
        + '      <button class="da-update-btn" style="margin-top:8px;width:100%" id="note-add-btn-' + c.id + '" onclick="window._saveNewNote(\'' + c.id + '\')">Add Note</button>'
        + '    </div>'
        + '    <div class="da-action-row" style="margin-top:4px;gap:8px">'
        + '      <a class="da-email-link" href="mailto:' + (c.email || '') + '">Email Client</a>'
        + '      <button class="da-email-link" style="cursor:pointer;background:none" onclick="window._openAddProjectForClient(\'' + c.id + '\', \'' + (c.full_name || '') + '\')">+ Add Project</button>'
        + '      <button class="da-email-link" style="cursor:pointer;background:none" id="resend-' + c.id + '" onclick="window._resendPortalAccess(\'' + c.id + '\', \'' + (c.email || '') + '\', \'' + (c.full_name || '') + '\', this)">Resend Portal Link</button>'
        + (function() { var isC = !!c.is_contractor; return '<button class="da-email-link" style="cursor:pointer;border:1px solid ' + (isC ? 'var(--success)' : 'var(--border)') + ';color:' + (isC ? 'var(--success)' : 'var(--muted)') + '" onclick="window._toggleContractor(\'' + c.id + '\', ' + isC + ')" id="contractor-btn-' + c.id + '">' + (isC ? '\u2713 Contractor' : 'Mark as Contractor') + '</button>'; })()
        + '    </div>'
        + '  </div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // ── TOGGLE ────────────────────────────────────────────────────────
  window._toggleCard = function(id) {
    var det = document.getElementById('det-' + id);
    var exp = document.getElementById('exp-' + id);
    if (det.classList.contains('visible')) { det.classList.remove('visible'); exp.classList.remove('open'); }
    else { det.classList.add('visible'); exp.classList.add('open'); loadClientServices(id); window._loadNotesLog(id); }
  };

  // ── UPDATE FIELDS ─────────────────────────────────────────────────
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

  // ── SERVICES ─────────────────────────────────────────────────────
  async function loadClientServices(clientId) {
    var wrap = document.getElementById('services-' + clientId);
    if (!wrap) return;
    wrap.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:8px 0">Loading...</div>';
    try {
      var res = await apiFetch('/rest/v1/client_services?client_id=eq.' + clientId + '&order=created_at.asc');
      var services = await res.json();
      renderClientServices(clientId, services || []);
    } catch(e) {
      wrap.innerHTML = '<div style="font-size:11px;color:var(--error);padding:8px 0">Error loading services.</div>';
    }
  }
  window.loadClientServices = loadClientServices;

  function renderClientServices(clientId, services) {
    var wrap = document.getElementById('services-' + clientId);
    if (!wrap) return;
    var serviceOpts = (window._ALL_SERVICES || []).map(function(s) { return '<option value="' + s.key + '">' + s.label + '</option>'; }).join('');
    var existingHtml = services.length ? services.map(function(s) {
      return '<div class="da-service-item" id="svc-' + s.id + '"><div class="da-service-name">' + s.service_name + '</div><div class="da-service-actions"><select class="da-service-status" onchange="window._updateServiceStatus(\'' + s.id + '\', this.value)"><option value="pending"' + (s.status === 'pending' ? ' selected' : '') + '>Pending</option><option value="in_progress"' + (s.status === 'in_progress' ? ' selected' : '') + '>In Progress</option><option value="complete"' + (s.status === 'complete' ? ' selected' : '') + '>Complete</option></select><button class="da-service-remove" onclick="window._removeService(\'' + s.id + '\', \'' + clientId + '\')">&#10005;</button></div></div>';
    }).join('') : '<div style="font-size:11px;color:var(--muted);padding:4px 0 8px">No services added yet</div>';

    wrap.innerHTML = existingHtml
      + '<div class="da-add-service-row"><select class="da-select" id="svc-select-' + clientId + '"><option value="">Select service to add...</option>' + serviceOpts + '<option value="__custom__">+ Add Custom Service</option></select><button class="da-update-btn" onclick="window._addService(\'' + clientId + '\')">Add</button></div>'
      + '<div id="svc-custom-' + clientId + '" style="display:none;margin-top:8px"><input class="da-text-input" id="svc-custom-input-' + clientId + '" type="text" placeholder="Enter custom service name..." /></div>';

    var sel = document.getElementById('svc-select-' + clientId);
    if (sel) {
      sel.addEventListener('change', function() {
        var d = document.getElementById('svc-custom-' + clientId);
        if (d) d.style.display = this.value === '__custom__' ? 'block' : 'none';
      });
    }
  }

  window._toggleSvcChecklist = function(clientId) {
    var body = document.getElementById('svc-checklist-body-' + clientId);
    var label = document.getElementById('svc-checklist-label-' + clientId);
    if (body) {
      var isOpen = body.style.display === 'block';
      body.style.display = isOpen ? 'none' : 'block';
      if (label) label.textContent = isOpen ? '+ Add Services' : '− Close';
    }
  };

  window._addSelectedServices = async function(clientId) {
    var wrap = document.getElementById('services-' + clientId);
    if (!wrap) return;
    var checked = wrap.querySelectorAll('.da-svc-checkbox:not(:disabled):checked');
    var customInput = document.getElementById('svc-custom-input-' + clientId);
    var customName = customInput ? customInput.value.trim() : '';
    var toAdd = [];

    checked.forEach(function(cb) {
      toAdd.push({ key: cb.value, label: cb.dataset.label });
    });
    if (customName) toAdd.push({ key: null, label: customName });
    if (!toAdd.length) return;

    try {
      for (var i = 0; i < toAdd.length; i++) {
        await apiFetch('/rest/v1/client_services', {
          method: 'POST',
          headers: { 'Prefer': 'return=minimal' },
          body: JSON.stringify({ client_id: clientId, service_name: toAdd[i].label, service_key: toAdd[i].key, status: 'pending' })
        });
      }
      if (customInput) customInput.value = '';
      await loadClientServices(clientId);
    } catch(e) { console.error('Add services error:', e); }
  };

  window._updateServiceStatus = async function(serviceId, status) {
    try { await apiFetch('/rest/v1/client_services?id=eq.' + serviceId, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ status: status }) }); } catch(e) {}
  };

  window._removeService = async function(serviceId, clientId) {
    try { await apiFetch('/rest/v1/client_services?id=eq.' + serviceId, { method: 'DELETE' }); await loadClientServices(clientId); } catch(e) {}
  };

  // ── ADMIN NOTES ───────────────────────────────────────────────────
  // Note tabs replaced with note log

  window._saveNewNote = async function(id) {
    var textarea = document.getElementById('note-new-' + id);
    if (!textarea || !textarea.value.trim()) return;
    var noteText = textarea.value.trim();
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/admin_notes', {
        method: 'POST',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ client_id: id, note: noteText })
      });
      var btn = document.querySelector('[onclick*="_saveNewNote(\'"][onclick*="' + id + '"]');
      if (!btn) btn = document.getElementById('note-add-btn-' + id);
      if (res.ok) {
        textarea.value = '';
        if (btn) { btn.textContent = 'Note Added!'; btn.style.background = 'var(--success)'; setTimeout(function() { if(btn){btn.textContent = 'Add Note'; btn.style.background = 'var(--gold)';} }, 2000); }
        window._loadNotesLog(id);
      } else {
        var errBody = await res.text();
        console.error('Note save failed:', res.status, errBody);
        if (btn) { btn.textContent = 'Error — check console'; btn.style.background = 'var(--error)'; setTimeout(function() { if(btn){btn.textContent = 'Add Note'; btn.style.background = 'var(--gold)';} }, 3000); }
      }
    } catch(e) { console.error('Save note error:', e); }
  };

  window._loadNotesLog = async function(id) {
    var log = document.getElementById('notes-log-' + id);
    if (!log) return;
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/admin_notes?client_id=eq.' + id + '&order=created_at.desc', {
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY }
      });
      var notes = await res.json();
      if (!notes || !notes.length) { log.innerHTML = '<div class="da-notes-log-empty">No notes yet</div>'; return; }
      log.innerHTML = notes.map(function(n) {
        var d = new Date(n.created_at);
        var dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        return '<div class="da-note-entry"><div class="da-note-entry-meta">' + dateStr + '</div><div class="da-note-entry-text">' + n.note.replace(/</g, '&lt;') + '</div></div>';
      }).join('');
    } catch(e) { log.innerHTML = '<div class="da-notes-log-empty">Could not load notes</div>'; }
  };

  // ── SEARCH & FILTER ───────────────────────────────────────────────
  function applyFilters() {
    var q = document.getElementById('daSearch').value.toLowerCase();
    var stage = document.getElementById('daFilter').value;
    renderCards(allClients.filter(function(c) {
      var mq = !q || (c.full_name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q) || (c.phone || '').toLowerCase().includes(q) || (c.company_name || '').toLowerCase().includes(q);
      var ms = !stage || c.status === stage || (!c.status && stage === 'client_inquiry_made');
      return mq && ms;
    }));
  }
  document.getElementById('daSearch').addEventListener('input', applyFilters);
  document.getElementById('daFilter').addEventListener('change', applyFilters);

  // ── ADD CLIENT MODAL ──────────────────────────────────────────────
  // Add Client tab switching via toolbar button removed — now a tab


  document.getElementById('acSubmit').addEventListener('click', async function() {
    var name = document.getElementById('acName').value.trim();
    var email = document.getElementById('acEmail').value.trim();
    var phone = document.getElementById('acPhone').value.trim();
    var company = document.getElementById('acCompany').value.trim();
    var service = '';
    var investment = document.getElementById('acInvestment').value.trim();
    var referral = document.getElementById('acReferral').value;
    var street = document.getElementById('acStreet').value.trim();
    var notes = document.getElementById('acNotes').value.trim();
    var isContractor = document.getElementById('acContractor').checked;
    var customService = document.getElementById('acCustomService') ? document.getElementById('acCustomService').value.trim() : '';
    var svcSelect = document.getElementById('acServicesSelect');
    var selectedServices = svcSelect ? Array.from(svcSelect.selectedOptions).map(function(o) {
      return { key: o.value, label: o.dataset.label || o.text };
    }) : [];
    if (customService) selectedServices.push({ key: null, label: customService });
    var msg = document.getElementById('acMsg');
    if (!name || !email) { msg.textContent = 'Name and email are required.'; msg.className = 'da-modal-msg error'; return; }
    this.disabled = true; this.textContent = 'Adding...'; msg.textContent = '';
    try {
      var res = await apiFetch('/rest/v1/clients', { method: 'POST', headers: { 'Prefer': 'return=representation' }, body: JSON.stringify({ full_name: name, email: email, phone: phone || null, company_name: company || null, project_type: service || null, investment: investment || null, referral: referral || null, street: street || null, notes: notes || null, status: 'client_inquiry_made', client_stage: 'inquiry_submitted', is_contractor: isContractor }) });
      if (res.ok) {
        // If send welcome email is checked — create auth user and send portal invite
        if (document.getElementById('acSendEmail').checked) {
          try {
            await fetch('https://wboqkfqibztjmdwrwsch.supabase.co/functions/v1/invite-client', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SUPABASE_KEY },
              body: JSON.stringify({ email: email, full_name: name })
            });
            msg.textContent = 'Client added and welcome email sent!';
          } catch(e) {
            msg.textContent = 'Client added! (Email send failed — check Edge Function logs)';
          }
        } else {
          msg.textContent = 'Client added successfully!';
        }
        msg.className = 'da-modal-msg success';
        // Add selected services to the new client
        if (selectedServices.length > 0) {
          var newClient = await res.json();
          var newClientId = newClient && newClient[0] ? newClient[0].id : null;
          if (newClientId) {
            for (var si = 0; si < selectedServices.length; si++) {
              await apiFetch('/rest/v1/client_services', {
                method: 'POST',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({ client_id: newClientId, service_name: selectedServices[si].label, service_key: selectedServices[si].key, status: 'pending' })
              }).catch(function() {});
            }
          }
        }
        ['acName','acEmail','acPhone','acCompany','acInvestment','acStreet','acNotes'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
        if (document.getElementById('acCustomService')) document.getElementById('acCustomService').value = '';

        document.getElementById('acContractor').checked = false;
        document.getElementById('acReferral').value = '';
        // Reset services select
        var svcSel = document.getElementById('acServicesSelect');
        if (svcSel) Array.from(svcSel.options).forEach(function(o) { o.selected = false; });
        // Switch to clients tab FIRST then reload
        document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
        document.querySelector('[data-tab="clients"]').classList.add('active');
        document.getElementById('tab-clients').classList.add('active');
        // Clear form
        ['acName','acEmail','acPhone','acCompany','acInvestment','acStreet','acNotes'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
        if (document.getElementById('acCustomService')) document.getElementById('acCustomService').value = '';
        if (document.getElementById('acContractor')) document.getElementById('acContractor').checked = false;
        if (document.getElementById('acReferral')) document.getElementById('acReferral').value = '';
        var svcSel2 = document.getElementById('acServicesSelect');
        if (svcSel2) Array.from(svcSel2.options).forEach(function(o) { o.selected = false; });
        msg.textContent = '';
        await loadClients();
        setTimeout(function() {
        }, 2000);
      } else { msg.textContent = 'Something went wrong. Please try again.'; msg.className = 'da-modal-msg error'; }
    } catch(e) { msg.textContent = 'Something went wrong.'; msg.className = 'da-modal-msg error'; }
    this.disabled = false; this.textContent = 'Add Client';
  });

  // ── CHECKLIST TAB ─────────────────────────────────────────────────
  async function loadAllChecklists() {
    try {
      var [checkRes, noteRes] = await Promise.all([ apiFetch('/rest/v1/checklist_items?select=*'), apiFetch('/rest/v1/client_notes?select=*') ]);
      var checks = await checkRes.json();
      var notes = await noteRes.json();
      allChecklists = {}; allNotes = {};
      if (checks) checks.forEach(function(c) { if (!allChecklists[c.client_id]) allChecklists[c.client_id] = {}; allChecklists[c.client_id][c.item_key] = c.completed; });
      if (notes) notes.forEach(function(n) { if (!allNotes[n.client_id]) allNotes[n.client_id] = {}; allNotes[n.client_id][n.note_key] = n.content; });
      renderChecklistTab(allClients);
    } catch(e) {}
  }

  function renderChecklistTab(clients) {
    var container = document.getElementById('daChecklistWrap');
    if (!clients.length) { container.innerHTML = '<div class="da-empty">No clients yet</div>'; return; }
    var KEYS = ['goals','inspo','photos','survey','bylaws','houseplans'];
    container.innerHTML = clients.map(function(c) {
      var cc = allChecklists[c.id] || {};
      var cn = allNotes[c.id] || {};
      var done = KEYS.filter(function(k) { return cc[k]; }).length;
      var items = KEYS.map(function(key) {
        var isDone = cc[key] === true;
        var note = cn[key] || '';
        return '<div class="da-check-row"><div class="da-check-dot' + (isDone ? ' done' : '') + '"></div><div style="flex:1"><div class="da-check-row-label">' + (CHECKLIST_LABELS[key] || key) + (isDone ? ' <span style="color:var(--success);font-size:10px">✓</span>' : '') + '</div>' + (note ? '<div class="da-check-row-note">' + note + '</div>' : '') + '</div></div>';
      }).join('');
      return '<div class="da-client-checklist"><div class="da-client-checklist-header" onclick="window._toggleClientChecklist(\'' + c.id + '\')"><div class="da-client-checklist-name">' + (c.full_name || 'Unknown') + ' <span style="font-size:10px;color:var(--muted)">' + (c.email || '') + '</span></div><div class="da-client-checklist-progress"><span>' + done + '</span> / ' + KEYS.length + '</div></div><div class="da-client-checklist-body" id="client-checklist-' + c.id + '">' + items + '</div></div>';
    }).join('');
  }

  window._toggleClientChecklist = function(id) { var b = document.getElementById('client-checklist-' + id); if (b) b.classList.toggle('visible'); };
  document.getElementById('daCheckSearch').addEventListener('input', function() {
    var q = this.value.toLowerCase();
    renderChecklistTab(allClients.filter(function(c) { return (c.full_name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q); }));
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
    var unreadCount = allMessages.filter(function(m) { return m.sender !== 'daydream_team' && !m.is_read; }).length;
    var msgTab = document.querySelector('#dd-admin [data-tab="messages"]');
    if (msgTab) {
      var existingDot = msgTab.querySelector('.da-msg-dot');
      if (unreadCount > 0) { if (!existingDot) { existingDot = document.createElement('span'); existingDot.className = 'da-msg-dot'; msgTab.appendChild(existingDot); } existingDot.textContent = unreadCount; }
      else if (existingDot) { existingDot.remove(); }
    }
    var groups = {};
    allMessages.forEach(function(m) { var key = m.client_id || m.sender || 'unknown'; if (!groups[key]) groups[key] = []; groups[key].push(m); });
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
  window._toggleContractor = async function(id, currentState) {
    var newState = !currentState;
    try {
      await apiFetch('/rest/v1/clients?id=eq.' + id, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ is_contractor: newState })
      });
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c.is_contractor = newState;
      var btn = document.getElementById('contractor-btn-' + id);
      if (btn) {
        btn.textContent = newState ? '✓ Contractor' : 'Mark as Contractor';
        btn.style.borderColor = newState ? 'var(--success)' : 'var(--border)';
        btn.style.color = newState ? 'var(--success)' : 'var(--muted)';
        btn.setAttribute('onclick', 'window._toggleContractor("' + id + '", ' + newState + ')');
      }
      // Also update card name badge
      var card = document.getElementById('card-' + id);
      if (card) {
        var badge = card.querySelector('.da-contractor-badge');
        if (newState && !badge) {
          var nameEl = card.querySelector('.da-card-name');
          if (nameEl) nameEl.insertAdjacentHTML('beforeend', '<span class="da-contractor-badge">Contractor</span>');
        } else if (!newState && badge) { badge.remove(); }
      }
    } catch(e) { console.error('Toggle contractor error:', e); }
  };

  window._updateProjType = async function(id) {
    var val = document.getElementById('ptypesel-' + id);
    if (!val) return;
    var v = val.value;
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/clients?id=eq.' + id, {
        method: 'PATCH',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ project_type_category: v || null })
      });
      var btn = document.getElementById('ptypebtn-' + id);
      if (btn) { btn.textContent = res.ok ? 'Saved!' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function() { btn.textContent = 'Update'; btn.style.background = 'var(--gold)'; }, 2000); }
    } catch(e) { console.error('Project type update error:', e); }
  };

  window._resendPortalAccess = async function(id, email, name, btn) {
    if (!email) return;
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    try {
      var res = await fetch('https://wboqkfqibztjmdwrwsch.supabase.co/functions/v1/invite-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU' },
        body: JSON.stringify({ email: email, full_name: name })
      });
      var data = await res.json();
      if (btn) { btn.textContent = data.success ? 'Link Sent!' : 'Error'; btn.style.color = data.success ? 'var(--success)' : 'var(--error)'; }
    } catch(e) {
      if (btn) { btn.textContent = 'Error'; btn.style.color = 'var(--error)'; }
    }
    setTimeout(function() { if (btn) { btn.textContent = 'Resend Portal Link'; btn.style.color = 'var(--gold)'; btn.disabled = false; } }, 3000);
  };

  // duplicate _toggleContractor removed

  // ── PROJECT MANAGEMENT FUNCTIONS ────────────────────────────────

  var PROJECT_TYPE_LABELS_MAP = {
    'full_yard': 'Full Yard', 'front_yard': 'Front Yard', 'backyard': 'Backyard',
    'outdoor_living': 'Outdoor Living', 'landscape_construction': 'Landscape Construction',
    'pool_and_spa': 'Pool & Spa', 'custom': 'Custom / Other'
  };

  window._showAddProjectForm = function() {
    var form = document.getElementById('daAddProjectForm');
    if (!form) return;
    form.style.display = 'block';
    // Populate client dropdown
    var sel = document.getElementById('apClientId');
    if (sel && allClients.length) {
      sel.innerHTML = '<option value="">Select client...</option>' + allClients.map(function(c) {
        return '<option value="' + c.id + '">' + (c.full_name || c.email) + '</option>';
      }).join('');
    }
  };

  window._hideAddProjectForm = function() {
    var form = document.getElementById('daAddProjectForm');
    if (form) form.style.display = 'none';
  };

  window._openAddProjectForClient = function(clientId, clientName) {
    // Switch to projects tab and pre-select client
    document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
    document.querySelector('[data-tab="projects"]').classList.add('active');
    document.getElementById('tab-projects').classList.add('active');
    window._showAddProjectForm();
    setTimeout(function() {
      var sel = document.getElementById('apClientId');
      if (sel) sel.value = clientId;
    }, 100);
    loadProjects();
  };

  window._submitAddProject = async function() {
    var clientId = document.getElementById('apClientId').value;
    var name = document.getElementById('apProjectName').value.trim();
    var type = document.getElementById('apProjectType').value;
    var start = document.getElementById('apStartDate').value;
    var end = document.getElementById('apEndDate').value;
    var address = document.getElementById('apAddress').value.trim();
    var goals = document.getElementById('apGoals').value.trim();
    var msg = document.getElementById('apMsg');
    if (!clientId || !name) { msg.textContent = 'Client and project name are required.'; msg.className = 'da-modal-msg error'; return; }
    var btn = document.getElementById('apSubmit');
    btn.disabled = true; btn.textContent = 'Creating...'; msg.textContent = '';
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/projects', {
        method: 'POST',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          client_id: clientId,
          project_name: name,
          project_type: type || null,
          start_date: start || null,
          end_date: end || null,
          project_address: address || null,
          description: goals || null,
          status: 'active'
        })
      });
      if (res.ok) {
        msg.textContent = 'Project created!'; msg.className = 'da-modal-msg success';
        ['apProjectName','apAddress','apGoals'].forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
        document.getElementById('apProjectType').value = '';
        document.getElementById('apStartDate').value = '';
        document.getElementById('apEndDate').value = '';
        document.getElementById('apClientId').value = '';
        setTimeout(function() { window._hideAddProjectForm(); msg.textContent = ''; loadProjects(); }, 1500);
      } else {
        var errText = await res.text();
        msg.textContent = 'Error: ' + errText.substring(0, 100); msg.className = 'da-modal-msg error';
      }
    } catch(e) { msg.textContent = 'Something went wrong.'; msg.className = 'da-modal-msg error'; }
    btn.disabled = false; btn.textContent = 'Create Project';
  };

  async function loadProjects() {
    var container = document.getElementById('daProjectsList');
    if (!container) return;
    container.innerHTML = '<div class="da-empty">Loading projects...</div>';
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/projects?order=created_at.desc&select=*,clients(full_name,email)', {
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY }
      });
      var projects = await res.json();
      if (!projects || !projects.length) { container.innerHTML = '<div class="da-empty">No projects yet. Use + Add Project to create one.</div>'; return; }
      container.innerHTML = projects.map(function(p) {
        var clientName = p.clients ? (p.clients.full_name || p.clients.email) : 'Unknown Client';
        var typeLabel = PROJECT_TYPE_LABELS_MAP[p.project_type] || p.project_type || '—';
        var startStr = p.start_date ? new Date(p.start_date).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) : '—';
        var endStr = p.end_date ? new Date(p.end_date).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) : '—';
        return '<div class="da-client-card" style="margin-bottom:8px">'
          + '<div class="da-card-top" onclick="window._toggleProjectCard(\'' + p.id + '\')">'
          + '  <div class="da-card-left"><div class="da-card-avatar" style="font-size:11px">' + (p.project_name || 'P').charAt(0).toUpperCase() + '</div>'
          + '  <div><div class="da-card-name">' + (p.project_name || 'Unnamed Project') + '</div>'
          + '  <div class="da-card-sub">' + clientName + ' &middot; ' + typeLabel + '</div></div></div>'
          + '  <div class="da-card-right">'
          + '    <div class="da-stage-pill" style="color:var(--gold);border-color:var(--gold);background:var(--gold-dim)">' + (p.status || 'active') + '</div>'
          + '    <div class="da-card-date">' + startStr + ' → ' + endStr + '</div>'
          + '    <div class="da-expand-icon" id="proj-exp-' + p.id + '">&#9660;</div>'
          + '  </div>'
          + '</div>'
          + '<div class="da-card-details" id="proj-det-' + p.id + '">'
          + '  <div class="da-details-grid">'
          + '    <div class="da-detail-item"><div class="da-detail-label">Client</div><div class="da-detail-value">' + clientName + '</div></div>'
          + '    <div class="da-detail-item"><div class="da-detail-label">Type</div><div class="da-detail-value">' + typeLabel + '</div></div>'
          + '    <div class="da-detail-item"><div class="da-detail-label">Address</div><div class="da-detail-value">' + (p.project_address || '—') + '</div></div>'
          + '    <div class="da-detail-item"><div class="da-detail-label">Status</div><div class="da-detail-value">' + (p.status || 'active') + '</div></div>'
          + '    <div class="da-detail-item" style="grid-column:1/-1"><div class="da-detail-label">Goals / Notes</div><div class="da-detail-value">' + (p.description || '—') + '</div></div>'
          + '  </div>'
          + '  <div class="da-card-actions">'
          + '    <div class="da-section-divider">Drive Links</div>'
          + '    <div class="da-action-row"><div class="da-action-label">Design</div><input class="da-text-input" id="plink-design-' + p.id + '" type="text" placeholder="Google Drive link..." value="' + (p.drive_design_link || '') + '" /></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Permit</div><input class="da-text-input" id="plink-permit-' + p.id + '" type="text" placeholder="Google Drive link..." value="' + (p.drive_permit_link || '') + '" /></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Construction</div><input class="da-text-input" id="plink-const-' + p.id + '" type="text" placeholder="Google Drive link..." value="' + (p.drive_construction_link || '') + '" /></div>'
          + '    <button class="da-update-btn" id="plinkbtn-' + p.id + '" onclick="window._saveProjectLinks(\'' + p.id + '\', this)">Save Links</button>'
          + '    <div class="da-section-divider">Status</div>'
          + '    <div class="da-action-row"><select class="da-select" id="pstatus-' + p.id + '"><option value="active"' + (p.status==='active'?' selected':'') + '>Active</option><option value="on_hold"' + (p.status==='on_hold'?' selected':'') + '>On Hold</option><option value="complete"' + (p.status==='complete'?' selected':'') + '>Complete</option><option value="cancelled"' + (p.status==='cancelled'?' selected':'') + '>Cancelled</option></select><button class="da-update-btn" id="pstatusbtn-' + p.id + '" onclick="window._updateProjectStatus(\'' + p.id + '\', this)">Update</button></div>'
          + '    <div class="da-section-divider">Danger</div>'
          + '    <div class="da-action-row"><button class="da-update-btn" style="background:var(--error);border-color:var(--error)" onclick="window._deleteProject(\'' + p.id + '\')">Delete Project</button></div>'
          + '  </div>'
          + '</div>'
          + '</div>';
      }).join('');
    } catch(e) { container.innerHTML = '<div class="da-empty">Error loading projects</div>'; console.error(e); }
  }

  window._toggleProjectCard = function(id) {
    var det = document.getElementById('proj-det-' + id);
    var exp = document.getElementById('proj-exp-' + id);
    if (det) det.classList.toggle('visible');
    if (exp) exp.classList.toggle('open');
  };

  window._saveProjectLinks = async function(id, btn) {
    var design = document.getElementById('plink-design-' + id).value.trim();
    var permit = document.getElementById('plink-permit-' + id).value.trim();
    var cons = document.getElementById('plink-const-' + id).value.trim();
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/projects?id=eq.' + id, {
        method: 'PATCH',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ drive_design_link: design || null, drive_permit_link: permit || null, drive_construction_link: cons || null })
      });
      if (btn) { btn.textContent = res.ok ? 'Saved!' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function() { if(btn){btn.textContent = 'Save Links'; btn.style.background = 'var(--gold)';} }, 2000); }
    } catch(e) { console.error('Save project links error:', e); }
  };

  window._updateProjectStatus = async function(id, btn) {
    var val = document.getElementById('pstatus-' + id).value;
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var res = await fetch(SURL + '/rest/v1/projects?id=eq.' + id, {
        method: 'PATCH',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ status: val })
      });
      if (btn) { btn.textContent = res.ok ? 'Saved!' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update'; btn.style.background='var(--gold)';} loadProjects(); }, 1500); }
      else loadProjects();
    } catch(e) { console.error(e); }
  };

  window._deleteProject = async function(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      await fetch(SURL + '/rest/v1/projects?id=eq.' + id, {
        method: 'DELETE',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY }
      });
      loadProjects();
    } catch(e) {}
  };

  window._sendReply = async function(clientId, projectId) {
    var textarea = document.getElementById('reply-' + clientId);
    var content = textarea ? textarea.value.trim() : '';
    if (!content) return;
    try { await apiFetch('/rest/v1/messages', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_id: projectId || null, client_id: clientId || null, sender: 'daydream_team', content: content, is_read: true }) }); textarea.value = ''; await loadMessages(); } catch(e) {}
  };

})();
