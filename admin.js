(function () {

  var SUPABASE_URL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
  var ADMIN_EMAIL  = 'admin@daydreamdesignandbuild.com'; // FIX 5: no plain text password

  // ── FIX 4: XSS sanitization ──────────────────────────────────────
  function s(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

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

  // Design & Permit Phase Timeline
  var CLIENT_STAGES = [
    { value: 'inquiry_submitted',            label: 'Inquiry Submitted' },
    { value: 'in_progress',                  label: 'In Progress' },
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
  var CONSTRUCTION_STAGES = [
    { value: 'not_started',                  label: 'Not Started' },
    { value: 'pre_site_visit',               label: 'Pre Site Visit' },
    { value: 'erosion_control',              label: 'Erosion Control / BMP Installed' },
    { value: 'construction_scheduled',       label: 'Construction Start Date Scheduled' },
    { value: 'completion_30',                label: '30% Completion' },
    { value: 'completion_60',                label: '60% Completion' },
    { value: 'completion_90',                label: '90% Completion' },
    { value: 'final_walk_through',           label: 'Final Walk Through' },
    { value: 'project_complete',             label: '100% Project Complete' }
  ];

  var CONTRACT_STAGES = [
    { value: 'not_sent',   label: 'Not Yet Sent',               color: '#8a8680' },
    { value: 'sent',       label: 'Sent — Awaiting Signature',  color: '#eeb24a' },
    { value: 'signed',     label: 'Signed ✓',                   color: '#6a9e7a' }
  ];

  var PAYMENT_STAGES = [
    { value: 'not_sent',          label: 'Invoice Not Yet Sent',            color: '#8a8680' },
    { value: 'invoice_sent',      label: 'Invoice Sent — Awaiting Payment', color: '#eeb24a' },
    { value: 'deposit_paid',      label: 'Deposit Paid — Balance Due',      color: '#5a8e9e' },
    { value: 'partially_paid',    label: 'Partially Paid',                  color: '#7a9e8a' },
    { value: 'payment_complete',  label: 'Payment Complete ✓',              color: '#6a9e7a' }
  ];

  var ALL_SERVICES = [
    { key: '2d_concept',            label: '2D Concept Phase' },
    { key: '3d_concept',            label: '3D Concept Phase' },
    { key: '2d_3d_concept',         label: '2D + 3D Concept Phase' },
    { key: 'permit_plan',           label: 'Permit Plan Phase' },
    { key: '2d_3d_permit',          label: '2D + 3D + Permit Plan Phase' },
    { key: 'site_plans',            label: 'Site Plans' },
    { key: 'retaining_wall_permit', label: 'Permit Plans — Retaining Walls' },
    { key: 'deck_permit',           label: 'Permit Plans — Decks' },
    { key: 'footing_permit',        label: 'Footing Permit Plans' },
    { key: 'pavilion_permit',       label: 'Permit Plans — Pavilion' },
    { key: 'shade_structures',      label: 'Shade Structures' },
    { key: 'pergolas',              label: 'Pergolas' },
    { key: 'drainage_plans',        label: 'Drainage Plans' },
    { key: 'planting_plans',        label: 'Planting Plans' },
    { key: 'irrigation_plans',      label: 'Irrigation Plans' },
    { key: 'outdoor_audio',         label: 'Outdoor Audio Plans' },
    { key: 'outdoor_lighting',      label: 'Outdoor Lighting Plans' },
    { key: 'furniture_layout',      label: 'Outdoor Furniture Layout' },
    { key: 'grading_plans',         label: 'Grading Plans' },
    { key: 'stormwater_plans',      label: 'Stormwater Management Plans' },
    { key: 'site_consultation',     label: 'Site Consultation' }
  ];

  // Client relationship status
  var CLIENT_STATUSES = [
    { value: 'active_client',    label: 'Active Client',        color: '#6a9e7a' },
    { value: 'lead',             label: 'Lead / Not Converted', color: '#eeb24a' },
    { value: 'archived',         label: 'Archived',             color: '#8a8680' }
  ];

  // Work categories
  var WORK_CATEGORIES = [
    { value: 'design_only',      label: 'Design Only' },
    { value: 'build',            label: 'Build / Construction' },
    { value: 'full_service',     label: 'Full Service' },
    { value: 'consultation',     label: 'Consultation' }
  ];

  var PROJECT_TYPES = [
    { key: 'full_yard',              label: 'Full Yard' },
    { key: 'front_yard',             label: 'Front Yard' },
    { key: 'backyard',               label: 'Backyard' },
    { key: 'outdoor_living',         label: 'Outdoor Living' },
    { key: 'landscape_construction', label: 'Landscape Construction' },
    { key: 'pool_and_spa',           label: 'Pool & Spa' },
    { key: 'custom',                 label: 'Custom / Other' }
  ];

  var PROJECT_TYPE_LABELS = {};
  PROJECT_TYPES.forEach(function(t) { PROJECT_TYPE_LABELS[t.key] = t.label; });

  var CHECKLIST_LABELS = {
    'goals':      'Project Goals & Must-Have Features',
    'inspo':      'Inspiration Photos or Boards',
    'photos':     'Site Photos & Walkthrough Video',
    'survey':     'Property Survey / Site Plat',
    'bylaws':     'HOA Bylaws & Neighborhood Covenants',
    'houseplans': 'Existing House Architectural Plans'
  };

  // Expose globals
  window._PROJECT_TYPES = PROJECT_TYPES;
  window._ALL_SERVICES  = ALL_SERVICES;

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
    '#dd-admin .da-login-title { font-family: "Cormorant Garamond", serif; font-size: 18px; color: var(--text); font-weight: 300; font-style: italic; margin-bottom: 20px; }',
    '#dd-admin .da-input-wrap { border: 1px solid var(--border); background: var(--surface-2); margin-bottom: 12px; transition: border-color 0.2s; }',
    '#dd-admin .da-input-wrap:focus-within { border-color: var(--gold); }',
    '#dd-admin .da-input-wrap:focus-within::after { content: ""; display: block; height: 2px; background: var(--gold); }',
    '#dd-admin .da-input-label { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted); padding: 10px 14px 3px; display: block; }',
    '#dd-admin .da-input-wrap:focus-within .da-input-label { color: var(--gold); }',
    '#dd-admin .da-input { width: 100%; background: transparent; border: none; outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 3px 14px 10px; }',
    '#dd-admin .da-btn { width: 100%; background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: Jost, sans-serif; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px; cursor: pointer; transition: background 0.3s, color 0.3s; margin-top: 8px; }',
    '#dd-admin .da-btn:hover { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-btn:disabled { opacity: 0.4; cursor: not-allowed; }',
    '#dd-admin .da-login-msg { font-size: 11px; text-align: center; margin-top: 10px; min-height: 18px; }',
    '#dd-admin .da-login-msg.error { color: var(--error); }',
    '#dd-admin .da-login-msg.success { color: var(--success); }',
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
    '#dd-admin .da-client-card.archived { opacity: 0.5; }',
    '#dd-admin .da-client-card.archived:hover { opacity: 0.8; border-color: var(--muted); }',
    '#dd-admin .da-client-card.archived { opacity: 0.5; }',
    '#dd-admin .da-client-card.archived:hover { opacity: 0.8; border-color: var(--muted); }',
    '#dd-admin .da-client-card.archived { opacity: 0.5; }',
    '#dd-admin .da-client-card.archived:hover { opacity: 0.8; border-color: var(--muted); }',
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
    '#dd-admin .da-update-btn:disabled { opacity: 0.4; cursor: not-allowed; }',
    '#dd-admin .da-email-link { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid var(--gold); padding: 8px 14px; white-space: nowrap; transition: background 0.2s, color 0.2s; }',
    '#dd-admin .da-email-link:hover { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-section-divider { font-size: 8px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); padding: 12px 0 6px; border-top: 1px solid var(--border); margin-top: 4px; }',
    '#dd-admin .da-contractor-projects { border: 1px solid var(--border); margin: 12px 0 4px; }',
    '#dd-admin .da-contractor-projects-header { padding: 10px 16px; background: var(--surface-2); border-bottom: 1px solid var(--border); font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }',
    '#dd-admin .da-contractor-project-row { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 12px; }',
    '#dd-admin .da-contractor-project-row:last-child { border-bottom: none; }',
    '#dd-admin .da-contractor-project-name { font-size: 12px; color: var(--text); flex: 1; }',
    '#dd-admin .da-contractor-project-address { font-size: 10px; color: var(--muted); }',
    '#dd-admin .da-services-wrap { display: flex; flex-direction: column; gap: 6px; padding: 8px 0; }',
    '#dd-admin .da-service-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 12px; background: var(--surface-2); border: 1px solid var(--border); }',
    '#dd-admin .da-service-name { font-size: 12px; color: var(--text); flex: 1; }',
    '#dd-admin .da-service-actions { display: flex; align-items: center; gap: 8px; }',
    '#dd-admin .da-service-status { background: var(--surface); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 10px; padding: 4px 8px; outline: none; cursor: pointer; appearance: none; transition: border-color 0.2s; }',
    '#dd-admin .da-service-remove { background: none; border: 1px solid var(--border); color: var(--muted); font-size: 10px; padding: 4px 8px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }',
    '#dd-admin .da-service-remove:hover { color: var(--error); border-color: var(--error); }',
    '#dd-admin .da-svc-checklist-wrap { border: 1px solid var(--border); margin-top: 10px; }',
    '#dd-admin .da-svc-checklist-header { padding: 10px 14px; background: var(--surface-2); cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }',
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
    '#dd-admin .da-add-client-wrap { padding: 32px; max-width: 700px; }',
    '#dd-admin .da-add-client-form { background: var(--surface); border: 1px solid var(--border); padding: 28px; }',
    '#dd-admin .da-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }',
    '#dd-admin .da-modal-field { display: flex; flex-direction: column; gap: 6px; }',
    '#dd-admin .da-field-label { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }',
    '#dd-admin .da-field-input { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: Jost, sans-serif; font-size: 13px; padding: 10px 12px; outline: none; transition: border-color 0.2s; width: 100%; resize: vertical; appearance: none; }',
    '#dd-admin .da-field-input:focus { border-color: var(--gold); }',
    '#dd-admin .da-field-input::placeholder { color: var(--muted); }',
    '#dd-admin #acServicesSelect option { padding: 8px 12px; font-family: Jost, sans-serif; font-size: 12px; color: var(--text); background: var(--surface-2); }',
    '#dd-admin #acServicesSelect option:checked { background: var(--gold); color: var(--bg); }',
    '#dd-admin .da-modal-check { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-size: 12px; color: var(--text); }',
    '#dd-admin .da-modal-check input { accent-color: var(--gold); width: 14px; height: 14px; cursor: pointer; }',
    '#dd-admin .da-modal-check label { cursor: pointer; }',
    '#dd-admin .da-modal-msg { font-size: 11px; min-height: 20px; margin-bottom: 12px; }',
    '#dd-admin .da-modal-msg.success { color: var(--success); }',
    '#dd-admin .da-modal-msg.error { color: var(--error); }',
    '#dd-admin .da-modal-submit { width: 100%; background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; padding: 14px; cursor: pointer; transition: opacity 0.2s; }',
    '#dd-admin .da-modal-submit:hover { opacity: 0.85; }',
    '#dd-admin .da-modal-submit:disabled { opacity: 0.4; cursor: not-allowed; }',
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
    '#dd-admin .da-messages-wrap { padding: 24px 32px; }',
    '#dd-admin .da-msg-card { background: var(--surface); border: 1px solid var(--border); padding: 16px 20px; margin-bottom: 12px; }',
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
    '#dd-admin .da-msg-reply textarea { flex: 1; background: var(--surface-2); border: 1px solid var(--border); outline: none; color: var(--text); font-family: Jost, sans-serif; font-size: 12px; padding: 10px 14px; resize: none; height: 48px; }',
    '#dd-admin .da-msg-reply textarea::placeholder { color: var(--muted); }',
    '#dd-admin .da-reply-btn { background: var(--gold); border: none; color: var(--bg); font-family: Jost, sans-serif; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; padding: 0 20px; cursor: pointer; }',
    '#dd-admin .da-empty { text-align: center; padding: 60px 24px; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; }',
    '#dd-admin .da-section-title { font-family: "Cormorant Garamond", serif; font-size: 24px; font-weight: 300; color: var(--text); margin-bottom: 20px; }',
    '@keyframes daFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '@media (max-width: 700px) { #dd-admin .da-stats { flex-direction: column; } #dd-admin .da-nav { padding: 0 16px; } #dd-admin .da-toolbar { padding: 16px; } #dd-admin .da-cards-wrap { padding: 16px; } #dd-admin .da-details-grid { grid-template-columns: 1fr; } #dd-admin .da-messages-wrap, #dd-admin .da-checklist-wrap { padding: 16px; } #dd-admin .da-modal-grid { grid-template-columns: 1fr; } }'
  ].join('\n');
  document.head.appendChild(style);

  // ── BUILD FILTER OPTIONS ──────────────────────────────────────────
  var filterOptions = '<option value="">All Pipeline Stages</option>' + PIPELINE_STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-admin');
  if (!wrap) return;

  wrap.innerHTML = [
    // ── LOGIN — FIX 5: Supabase auth, no plain text password ─────────
    '<div id="daLoginWrap" class="da-login-wrap">',
    '  <div class="da-login-card">',
    '    <div class="da-login-header"><div class="da-login-logo">Daydream</div><div class="da-login-sub">Admin Dashboard</div></div>',
    '    <div class="da-login-body">',
    '      <div class="da-login-title">Admin Access</div>',
    '      <div class="da-input-wrap"><label class="da-input-label">Password</label><input class="da-input" type="password" id="daPassword" placeholder="Enter admin password" /></div>',
    '      <button class="da-btn" id="daLoginBtn">Sign In</button>',
    '      <div class="da-login-msg" id="daLoginMsg"></div>',
    '    </div>',
    '  </div>',
    '</div>',

    // ── DASHBOARD ─────────────────────────────────────────────────────
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
    '    <button class="da-tab" data-tab="site-photos">Job Site Photos</button>',
    '    <button class="da-tab" data-tab="messages">Messages</button>',
    '  </div>',

    // CLIENTS TAB
    '  <div class="da-tab-content active" id="tab-clients">',
    '    <div class="da-toolbar">',
    '      <input class="da-search" type="text" id="daSearch" placeholder="Search by name, email or phone..." />',
    '      <select class="da-filter" id="daFilter">' + filterOptions + '</select>',
    '      <select class="da-filter" id="daStatusFilter" style="min-width:180px"><option value="">All Statuses</option><option value="active_client">Active Clients</option><option value="lead">Leads / Not Converted</option><option value="archived">Archived</option></select>',
    '      <select class="da-filter" id="daCategoryFilter" style="min-width:180px"><option value="">All Categories</option><option value="design_only">Design Only</option><option value="build">Build / Construction</option><option value="full_service">Full Service</option><option value="consultation">Consultation</option></select>',
    '      <div class="da-count" id="daCount"></div>',
    '    </div>',
    '    <div class="da-cards-wrap" id="daCardsWrap"></div>',
    '  </div>',

    // ADD CLIENT TAB
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
    '            <select class="da-field-input" id="acServicesSelect" multiple size="7" style="height:auto;padding:0">' + ALL_SERVICES.map(function(sv) { return '<option value="' + sv.key + '" data-label="' + sv.label + '">' + sv.label + '</option>'; }).join('') + '</select>',
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

    // PROJECTS TAB
    '  <div class="da-tab-content" id="tab-projects">',
    '    <div class="da-add-client-wrap" style="max-width:900px">',
    '      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">',
    '        <div class="da-section-title" style="margin-bottom:0">Projects</div>',
    '        <button class="da-update-btn" onclick="window._showAddProjectForm()">+ Add Project</button>',
    '      </div>',
    '      <div id="daAddProjectForm" style="display:none;background:var(--surface);border:1px solid var(--gold);padding:28px;margin-bottom:24px">',
    '        <div style="font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold);margin-bottom:20px">Create New Project</div>',
    '        <div class="da-modal-grid">',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Project Address *</label><input class="da-field-input" type="text" id="apAddress" placeholder="123 Main St, Atlanta GA" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Client *</label><select class="da-field-input" id="apClientId"><option value="">Select client...</option></select></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Client Name *</label><input class="da-field-input" type="text" id="apClientName" placeholder="Full name on the project" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Project Name *</label><input class="da-field-input" type="text" id="apProjectName" placeholder="e.g. Backyard Renovation" /></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Project Type</label><select class="da-field-input" id="apProjectType"><option value="">Select type...</option>' + PROJECT_TYPES.map(function(t) { return '<option value="' + t.key + '">' + t.label + '</option>'; }).join('') + '</select></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Anything Else We Need to Know?</label><textarea class="da-field-input" id="apAnything" rows="2" placeholder="Constraints, HOA rules, access details, or important context..."></textarea></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Goals and Notes</label><textarea class="da-field-input" id="apGoals" rows="3" placeholder="Goals, must-have features, vision..."></textarea></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">What Level of Investment Are You Preparing for This Project? *</label><input class="da-field-input" type="text" id="apInvestment" placeholder="e.g. $75,000 or $100k–$150k" /></div>',
    '        </div>',
    '        <div class="da-modal-msg" id="apMsg"></div>',
    '        <div style="display:flex;gap:12px;margin-top:16px">',
    '          <button class="da-modal-submit" id="apSubmit" style="flex:1" onclick="window._submitAddProject()">Create Project</button>',
    '          <button class="da-modal-submit" style="background:var(--surface);color:var(--muted);border:1px solid var(--border);flex:0 0 auto;width:120px" onclick="window._hideAddProjectForm()">Cancel</button>',
    '        </div>',
    '      </div>',
    '      <div id="daProjectsList"></div>',
    '    </div>',
    '  </div>',

    // CHECKLIST TAB
    '  <div class="da-tab-content" id="tab-site-photos">',
    '    <div class="da-add-client-wrap" style="max-width:900px">',
    '      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">',
    '        <div class="da-section-title" style="margin-bottom:0">Job Site Photos</div>',
    '        <div style="display:flex;gap:12px;align-items:center">',
    '          <select class="da-filter" id="daPhotoClientFilter" style="min-width:200px"><option value="">All Clients</option></select>',
    '          <button class="da-update-btn" onclick="window._showAdminPhotoUpload()">+ Upload Photos</button>',
    '        </div>',
    '      </div>',
    '      <div id="daAdminPhotoUploadForm" style="display:none;background:var(--surface);border:1px solid var(--gold);padding:24px;margin-bottom:24px">',
    '        <div style="font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold);margin-bottom:16px">Upload Job Site Photos</div>',
    '        <div class="da-modal-grid">',
    '          <div class="da-modal-field"><label class="da-field-label">Client *</label><select class="da-field-input" id="daPhotoUploadClient"><option value="">Select client...</option></select></div>',
    '          <div class="da-modal-field"><label class="da-field-label">Visit Date</label><input class="da-field-input" type="date" id="daPhotoVisitDate" /></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1"><label class="da-field-label">Notes / Description</label><textarea class="da-field-input" id="daPhotoNotes" rows="2" placeholder="Describe what was photographed, progress made, etc..."></textarea></div>',
    '          <div class="da-modal-field" style="grid-column:1/-1">',
    '            <label class="da-field-label">Photos *</label>',
    '            <div class="dd-drop-zone" style="border:1px dashed var(--border);padding:24px;text-align:center;cursor:pointer;position:relative;background:var(--surface-2)">',
    '              <input type="file" multiple accept=".jpg,.jpeg,.png,.heic,.webp" id="daPhotoFiles" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%" />',
    '              <div style="font-size:20px;color:var(--gold);margin-bottom:8px">&#8679;</div>',
    '              <div style="font-size:11px;color:var(--muted)">Drop photos or click to upload</div>',
    '            </div>',
    '            <div id="daPhotoUploadStatus" style="font-size:11px;color:var(--success);margin-top:8px;min-height:16px"></div>',
    '          </div>',
    '        </div>',
    '        <div class="da-modal-msg" id="daPhotoMsg"></div>',
    '        <div style="display:flex;gap:12px;margin-top:12px">',
    '          <button class="da-modal-submit" id="daPhotoSubmit" style="flex:1" onclick="window._submitAdminPhotos()">Upload to Drive &amp; Save</button>',
    '          <button class="da-modal-submit" style="background:var(--surface);color:var(--muted);border:1px solid var(--border);flex:0 0 auto;width:120px" onclick="window._hideAdminPhotoUpload()">Cancel</button>',
    '        </div>',
    '      </div>',
    '      <div id="daPhotosList"></div>',
    '    </div>',
    '  </div>',


    '  <div class="da-tab-content" id="tab-checklist">',
    '    <div class="da-checklist-wrap"><div class="da-section-title">Client Onboarding</div><input class="da-checklist-search" type="text" id="daCheckSearch" placeholder="Search clients..." /><div id="daChecklistWrap"></div></div>',
    '  </div>',

    // MESSAGES TAB
    '  <div class="da-tab-content" id="tab-messages">',
    '    <div class="da-messages-wrap"><div class="da-section-title">Client Messages</div><div id="daMsgList"></div></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var allClients  = [];
  var allMessages = [];
  var allChecklists = {};
  var allNotes = {};

  // ── API ───────────────────────────────────────────────────────────
  function getAdminToken() {
    try { return sessionStorage.getItem('dd_admin_token') || SUPABASE_KEY; } catch(e) { return SUPABASE_KEY; }
  }

  function apiFetch(path, options) {
    var opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers['apikey'] = SUPABASE_KEY;
    opts.headers['Authorization'] = 'Bearer ' + getAdminToken();
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
    return fetch(SUPABASE_URL + path, opts);
  }
  window._apiFetch = apiFetch;

  function formatDate(str) { if (!str) return '—'; return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  function serviceLabel(key) { var found = ALL_SERVICES.find(function(sv) { return sv.key === key; }); return found ? found.label : (key || '—'); }
  function initials(name) { if (!name) return '?'; var p = name.trim().split(' '); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  function formatInvestment(inv) { if (!inv) return ''; var n = (inv || '').replace(/[^0-9.]/g, ''); return n && !isNaN(n) ? '$' + Number(n).toLocaleString() : inv; }

  // FIX 6: Debounced search ──────────────────────────────────────────
  var searchTimeout;
  function applyFilters() {
    var q        = (document.getElementById('daSearch').value || '').toLowerCase();
    var stage    = document.getElementById('daFilter').value;
    var cStatus  = (document.getElementById('daStatusFilter') || {}).value || '';
    var cCat     = (document.getElementById('daCategoryFilter') || {}).value || '';
    renderCards(allClients.filter(function(c) {
      var mq   = !q       || (c.full_name||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q) || (c.phone||'').toLowerCase().includes(q) || (c.company_name||'').toLowerCase().includes(q);
      var ms   = !stage   || c.status === stage;
      var mcs  = !cStatus || c.client_status === cStatus;
      var mcat = !cCat    || c.work_category === cCat;
      return mq && ms && mcs && mcat;
    }));
  }
  document.getElementById('daSearch').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 300);
  });
  document.getElementById('daFilter').addEventListener('change', applyFilters);
  document.getElementById('daStatusFilter').addEventListener('change', applyFilters);
  document.getElementById('daCategoryFilter').addEventListener('change', applyFilters);

  // ── TABS ──────────────────────────────────────────────────────────
  document.querySelectorAll('#dd-admin .da-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
      if (tab.dataset.tab === 'projects') loadProjects();
      if (tab.dataset.tab === 'checklist') loadAllChecklists();
      if (tab.dataset.tab === 'messages') {
        loadMessages();
        apiFetch('/rest/v1/messages?sender=neq.daydream_team&is_read=eq.false', { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ is_read: true }) }).catch(function() {});
        var dot = tab.querySelector('.da-msg-dot'); if (dot) dot.remove();
      }
    });
  });

  // ── FIX 5: LOGIN via Supabase Auth ────────────────────────────────
  document.getElementById('daLoginBtn').addEventListener('click', async function() {
    var password = document.getElementById('daPassword').value;
    var msg = document.getElementById('daLoginMsg');
    if (!password) { msg.textContent = 'Please enter your password.'; msg.className = 'da-login-msg error'; return; }
    this.disabled = true; this.textContent = 'Signing in...'; msg.textContent = '';
    try {
      var res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ADMIN_EMAIL, password: password })
      });
      var data = await res.json();
      if (data.access_token) {
        try { sessionStorage.setItem('dd_admin_token', data.access_token); } catch(e) {}
        document.getElementById('daLoginWrap').style.display = 'none';
        document.getElementById('daDashboard').classList.add('visible');
        loadClients();
        startAdminRealtime(); // Start live updates
      } else {
        msg.textContent = 'Incorrect password. Please try again.'; msg.className = 'da-login-msg error';
      }
    } catch(e) { msg.textContent = 'Connection error. Please try again.'; msg.className = 'da-login-msg error'; }
    this.disabled = false; this.textContent = 'Sign In';
  });
  document.getElementById('daPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('daLoginBtn').click(); });
  document.getElementById('daLogoutBtn').addEventListener('click', function() {
    stopAdminRealtime(); // Clean up WebSocket connections
    try { sessionStorage.removeItem('dd_admin_token'); } catch(e) {}
    document.getElementById('daDashboard').classList.remove('visible');
    document.getElementById('daLoginWrap').style.display = 'flex';
  });
  // Auto-login from session
  try {
    var savedToken = sessionStorage.getItem('dd_admin_token');
    if (savedToken) {
      // Verify token is still valid
      fetch(SUPABASE_URL + '/auth/v1/user', { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + savedToken } })
        .then(function(r) { return r.json(); })
        .then(function(u) {
          if (u && u.email === ADMIN_EMAIL) {
            document.getElementById('daLoginWrap').style.display = 'none';
            document.getElementById('daDashboard').classList.add('visible');
            loadClients();
            startAdminRealtime(); // Start live updates on auto-login
          } else { sessionStorage.removeItem('dd_admin_token'); }
        }).catch(function() { sessionStorage.removeItem('dd_admin_token'); });
    }
  } catch(e) {}

  // ── LOAD CLIENTS ──────────────────────────────────────────────────
  async function loadClients() {
    try {
      var res = await apiFetch('/rest/v1/clients?order=created_at.desc');
      allClients = await res.json() || [];
      updateStats();
      renderCards(allClients);
      checkUnreadMessages();
    } catch(e) { console.error('loadClients error:', e); }
  }

  async function checkUnreadMessages() {
    try {
      var res = await apiFetch('/rest/v1/messages?is_read=eq.false&order=created_at.desc&limit=50');
      var msgs = await res.json() || [];
      var unread = msgs.filter(function(m) { return m.sender !== 'daydream_team'; }).length;
      var msgTab = document.querySelector('#dd-admin [data-tab="messages"]');
      if (msgTab && unread > 0) {
        var dot = msgTab.querySelector('.da-msg-dot');
        if (!dot) { dot = document.createElement('span'); dot.className = 'da-msg-dot'; msgTab.appendChild(dot); }
        dot.textContent = unread;
      }
    } catch(e) { console.error('checkUnreadMessages:', e); }
  }

  function updateStats() {
    document.getElementById('daStatTotal').textContent = allClients.length;
    var active = allClients.filter(function(c) { return c.status && c.status !== 'client_inquiry_made' && c.status !== 'project_complete'; }).length;
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

    // Group contractors by email
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
      var isContr = c.is_contractor && g.projects.length > 0;
      var stage = getPipelineStage(c.status || 'client_inquiry_made');
      var inv = formatInvestment(c.investment || '');

      var pOpts = PIPELINE_STAGES.map(function(ps) { return '<option value="' + ps.value + '"' + (c.status === ps.value ? ' selected' : '') + '>' + ps.label + '</option>'; }).join('');
      var cOpts = CLIENT_STAGES.map(function(cs) { return '<option value="' + cs.value + '"' + (c.client_stage === cs.value ? ' selected' : '') + '>' + cs.label + '</option>'; }).join('');
      var conOpts = CONSTRUCTION_STAGES.map(function(cs) { return '<option value="' + cs.value + '"' + (c.construction_stage === cs.value ? ' selected' : '') + '>' + cs.label + '</option>'; }).join('');
      var contractOpts = CONTRACT_STAGES.map(function(cs) { return '<option value="' + cs.value + '"' + (c.contract_status === cs.value ? ' selected' : '') + '>' + cs.label + '</option>'; }).join('');
      var paymentOpts = PAYMENT_STAGES.map(function(ps) { return '<option value="' + ps.value + '"' + (c.payment_status === ps.value ? ' selected' : '') + '>' + ps.label + '</option>'; }).join('');
      var ptOpts = (window._PROJECT_TYPES || []).map(function(t) { return '<option value="' + t.key + '"' + (c.project_type_category === t.key ? ' selected' : '') + '>' + t.label + '</option>'; }).join('');

      var contractorProjectsHtml = '';
      if (isContr && g.projects.length > 1) {
        contractorProjectsHtml = '<div class="da-contractor-projects"><div class="da-contractor-projects-header">All Projects (' + g.projects.length + ')</div>'
          + g.projects.map(function(p) {
            var addr = [p.street, p.city, p.state].filter(Boolean).join(', ');
            var pStage = getPipelineStage(p.status);
            return '<div class="da-contractor-project-row"><div><div class="da-contractor-project-name">' + s(p.full_name || 'Project') + '</div><div class="da-contractor-project-address">' + s(addr || '—') + '</div></div><div class="da-stage-pill" style="color:' + pStage.color + ';border-color:' + pStage.color + ';background:' + pStage.color + '18;font-size:7px">' + s(pStage.label) + '</div></div>';
          }).join('')
          + '</div>';
      }

      return '<div class="da-client-card" id="card-' + c.id + '">'
        + '<div class="da-card-top" onclick="window._toggleCard(\'' + c.id + '\')">'
        + '  <div class="da-card-left"><div class="da-card-avatar">' + s(initials(c.full_name)) + '</div>'
        + '  <div><div class="da-card-name">' + s(c.company_name || c.full_name || 'Unknown') + '<span class="da-role-badge ' + (isContr ? 'contractor' : 'client') + '">' + (isContr ? 'Contractor' : 'Client') + '</span>' + (function(){ var cs = c.client_status; if(!cs||cs==='active_client') return ''; var csMap={'lead':'<span style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #eeb24a;color:#eeb24a;background:rgba(238,178,74,0.08);margin-left:6px;vertical-align:middle">Lead</span>','archived':'<span style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #8a8680;color:#8a8680;background:rgba(138,134,128,0.08);margin-left:6px;vertical-align:middle">Archived</span>'}; return csMap[cs]||''; })() + '</div>'
        + '  <div class="da-card-sub">' + s(c.email || '') + (c.phone ? ' · ' + s(c.phone) : '') + (isContr && g.projects.length > 1 ? ' · ' + g.projects.length + ' projects' : '') + '</div></div></div>'
        + '  <div class="da-card-right"><div class="da-stage-pill" style="color:' + stage.color + ';border-color:' + stage.color + ';background:' + stage.color + '18">' + s(stage.label) + '</div><div class="da-card-investment">' + s(inv) + '</div><div class="da-card-date">' + formatDate(c.created_at) + '</div><div class="da-expand-icon" id="exp-' + c.id + '">&#9660;</div></div>'
        + '</div>'
        + '<div class="da-card-details" id="det-' + c.id + '">'
        + '  <div class="da-details-grid">'
        + '    <div class="da-detail-item"><div class="da-detail-label">Service</div><div class="da-detail-value">' + s(serviceLabel(c.project_type)) + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Investment</div><div class="da-detail-value">' + s(inv || '—') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Address</div><div class="da-detail-value">' + s([c.street, c.city, c.state, c.zip].filter(Boolean).join(', ') || '—') + '</div></div>'
        + '    <div class="da-detail-item"><div class="da-detail-label">Referral</div><div class="da-detail-value">' + s(c.referral || '—') + '</div></div>'
        + '    <div class="da-detail-item" style="grid-column:1/-1"><div class="da-detail-label">Notes</div><div class="da-detail-value">' + s(c.notes || '—') + '</div></div>'
        + '  </div>'
        + '  <div class="da-card-actions" style="border-top:1px solid var(--border)">'
        + '    <div class="da-section-divider">Edit Contact Info</div>'
        + '    <div class="da-action-row"><div class="da-action-label">Name</div><input class="da-text-input" id="edit-name-' + c.id + '" type="text" value="' + s(c.full_name || '') + '" placeholder="Full name" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Phone</div><input class="da-text-input" id="edit-phone-' + c.id + '" type="text" value="' + s(c.phone || '') + '" placeholder="Phone number" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Address</div><input class="da-text-input" id="edit-street-' + c.id + '" type="text" value="' + s(c.street || '') + '" placeholder="Street address" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Investment</div><input class="da-text-input" id="edit-investment-' + c.id + '" type="text" value="' + s(c.investment || '') + '" placeholder="e.g. $75,000" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Notes</div><input class="da-text-input" id="edit-notes-' + c.id + '" type="text" value="' + s(c.notes || '') + '" placeholder="Internal notes" /></div>'
        + '    <button class="da-update-btn" onclick="window._saveContactInfo(\'' + c.id + '\')">Save Contact Info</button>'
        + '  </div>'
        + contractorProjectsHtml
        + '  <div class="da-card-actions">'
        + '    <div class="da-section-divider">Internal Pipeline</div>'
        + '    <div class="da-action-row"><select class="da-select" id="psel-' + c.id + '">' + pOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'status\', \'psel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Project Type</div>'
        + '    <div class="da-action-row"><select class="da-select" id="ptypesel-' + c.id + '"><option value="">Select project type...</option>' + ptOpts + '</select><button class="da-update-btn" id="ptypebtn-' + c.id + '" onclick="window._updateProjType(\'' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Design &amp; Permit Phase</div>'
        + '    <div class="da-action-row"><select class="da-select" id="csel-' + c.id + '">' + cOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_stage\', \'csel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Construction Phase <span style="font-size:9px;color:var(--muted);letter-spacing:0.1em;text-transform:none">(set to not_started to hide from client)</span></div>'
        + '    <div class="da-action-row"><select class="da-select" id="consel-' + c.id + '">' + conOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'construction_stage\', \'consel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Client Status</div>'
        + '    <div class="da-action-row"><div class="da-action-label">Relationship</div><select class="da-select" id="cstatsel-' + c.id + '"><option value="">— Not Set —</option><option value="active_client"' + (c.client_status==='active_client'?' selected':'') + '>Active Client</option><option value="lead"' + (c.client_status==='lead'?' selected':'') + '>Lead / Not Converted</option><option value="archived"' + (c.client_status==='archived'?' selected':'') + '>Archived</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_status\', \'cstatsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Category</div><select class="da-select" id="catsel-' + c.id + '"><option value="">— Not Set —</option><option value="design_only"' + (c.work_category==='design_only'?' selected':'') + '>Design Only</option><option value="build"' + (c.work_category==='build'?' selected':'') + '>Build / Construction</option><option value="full_service"' + (c.work_category==='full_service'?' selected':'') + '>Full Service</option><option value="consultation"' + (c.work_category==='consultation'?' selected':'') + '>Consultation</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'work_category\', \'catsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Relationship</div><select class="da-select" id="relsel-' + c.id + '"><option value="">— Not Set —</option><option value="owner"' + (c.client_relationship === 'owner' ? ' selected' : '') + '>Owner</option><option value="contractor"' + (c.client_relationship === 'contractor' ? ' selected' : '') + '>Contractor</option><option value="builder"' + (c.client_relationship === 'builder' ? ' selected' : '') + '>Builder</option><option value="designer"' + (c.client_relationship === 'designer' ? ' selected' : '') + '>Designer / Architect</option><option value="property_manager"' + (c.client_relationship === 'property_manager' ? ' selected' : '') + '>Property Manager</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_relationship\', \'relsel-' + c.id + '\')" >Update</button></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Relationship</div><select class="da-select" id="relsel-' + c.id + '"><option value="">— Not Set —</option><option value="owner"' + (c.client_relationship==='owner'?' selected':'') + '>Owner</option><option value="contractor"' + (c.client_relationship==='contractor'?' selected':'') + '>Contractor</option><option value="builder"' + (c.client_relationship==='builder'?' selected':'') + '>Builder</option><option value="designer"' + (c.client_relationship==='designer'?' selected':'') + '>Designer / Architect</option><option value="property_manager"' + (c.client_relationship==='property_manager'?' selected':'') + '>Property Manager</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_relationship\', \'relsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Relationship</div><select class="da-select" id="relsel-' + c.id + '"><option value="">— Not Set —</option><option value="owner"' + (c.client_relationship==='owner'?' selected':'') + '>Owner</option><option value="contractor"' + (c.client_relationship==='contractor'?' selected':'') + '>Contractor</option><option value="builder"' + (c.client_relationship==='builder'?' selected':'') + '>Builder</option><option value="designer"' + (c.client_relationship==='designer'?' selected':'') + '>Designer / Architect</option><option value="property_manager"' + (c.client_relationship==='property_manager'?' selected':'') + '>Property Manager</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_relationship\', \'relsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Contract &amp; Payment</div>'
        + '    <div class="da-action-row"><div class="da-action-label">Contract</div><select class="da-select" id="contractsel-' + c.id + '">' + contractOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'contract_status\', \'contractsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Payment</div><select class="da-select" id="paymentsel-' + c.id + '">' + paymentOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'payment_status\', \'paymentsel-' + c.id + '\')">Update</button></div>'
        + '    <div class="da-section-divider">Client Drive Links</div>'
        + '    <div class="da-action-row"><div class="da-action-label">Design</div><input class="da-text-input" id="dlink-design-' + c.id + '" type="text" placeholder="Google Drive link..." value="' + s(c.drive_design_link || '') + '" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Permit</div><input class="da-text-input" id="dlink-permit-' + c.id + '" type="text" placeholder="Google Drive link..." value="' + s(c.drive_permit_link || '') + '" /></div>'
        + '    <div class="da-action-row"><div class="da-action-label">Construction</div><input class="da-text-input" id="dlink-construction-' + c.id + '" type="text" placeholder="Google Drive link..." value="' + s(c.drive_construction_link || '') + '" /></div>'
        + '    <div class="da-action-row"><button class="da-update-btn" onclick="window._updateDriveLinks(\'' + c.id + '\')">Save Drive Links</button></div>'
        + '    <div class="da-section-divider">Services</div>'
        + '    <div class="da-services-wrap" id="services-' + c.id + '"><div style="font-size:11px;color:var(--muted);padding:8px 0">Loading services...</div></div>'
        + '    <div class="da-section-divider">Admin Notes</div>'
        + '    <div class="da-notes-log" id="notes-log-' + c.id + '"><div class="da-notes-log-empty">No notes yet</div></div>'
        + '    <div class="da-notes-new"><textarea class="da-note-textarea" id="note-new-' + c.id + '" placeholder="Write a note..."></textarea><button class="da-update-btn" style="margin-top:8px;width:100%" id="note-add-btn-' + c.id + '" onclick="window._saveNewNote(\'' + c.id + '\')">Add Note</button></div>'
        + '    <div class="da-action-row" style="margin-top:4px;gap:8px">'
        + '      <a class="da-email-link" href="mailto:' + s(c.email || '') + '">Email Client</a>'
        + '      <button class="da-email-link" style="cursor:pointer;background:none" id="resend-' + c.id + '" onclick="window._resendPortalAccess(\'' + c.id + '\', \'' + s(c.email || '') + '\', \'' + s(c.full_name || '') + '\', this)">Resend Portal Link</button>'
        + '      <button class="da-email-link" style="cursor:pointer;background:none" onclick="window._openAddProjectForClient(\'' + c.id + '\', \'' + s(c.full_name || '') + '\')">+ Add Project</button>'
        + '      <button class="da-email-link" id="contractor-btn-' + c.id + '" style="cursor:pointer;border-color:' + (c.is_contractor ? 'var(--success)' : 'var(--border)') + ';color:' + (c.is_contractor ? 'var(--success)' : 'var(--muted)') + '" onclick="window._toggleContractor(\'' + c.id + '\', ' + !!c.is_contractor + ')">' + (c.is_contractor ? '✓ Contractor' : 'Mark as Contractor') + '</button>'
        + '    </div>'
        + '  </div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // ── TOGGLE CARD ───────────────────────────────────────────────────
  window._toggleCard = function(id) {
    var det = document.getElementById('det-' + id);
    var exp = document.getElementById('exp-' + id);
    if (det.classList.contains('visible')) { det.classList.remove('visible'); exp.classList.remove('open'); }
    else { det.classList.add('visible'); exp.classList.add('open'); loadClientServices(id); window._loadNotesLog(id); }
  };

  // ── UPDATE FIELDS (all use direct fetch for reliability) ──────────
  window._updateField = async function(id, field, selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var val = sel.value;
    // Find the Update button — it may not be the direct next sibling if there's a label div
    var row = sel.closest('.da-action-row');
    var btn = row ? row.querySelector('.da-update-btn') : sel.nextElementSibling;
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var body = {}; body[field] = val || null;
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify(body) });
      if (!res.ok) {
        var errText = await res.text();
        console.error('_updateField error [' + field + ']:', errText);
        if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2500); }
        return;
      }
      // Update local cache
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c[field] = val;
      // Special UI updates per field
      if (field === 'status') {
        var stage = getPipelineStage(val);
        var card = document.getElementById('card-' + id);
        if (card) { var pill = card.querySelector('.da-stage-pill'); if (pill) { pill.textContent = stage.label; pill.style.color = stage.color; pill.style.borderColor = stage.color; pill.style.background = stage.color + '18'; } }
        updateStats();
      }
      if (field === 'client_status') {
        // Update archived dimming
        var card2 = document.getElementById('card-' + id);
        if (card2) { card2.classList.toggle('archived', val === 'archived'); }
        // Update badge in card name
        var nameDiv = card2 ? card2.querySelector('.da-card-name') : null;
        if (nameDiv) {
          var existingBadge = nameDiv.querySelector('.da-status-badge-inline');
          if (existingBadge) existingBadge.remove();
          if (val === 'lead') {
            nameDiv.insertAdjacentHTML('beforeend', '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #eeb24a;color:#eeb24a;background:rgba(238,178,74,0.08);margin-left:6px;vertical-align:middle">Lead</span>');
          } else if (val === 'archived') {
            nameDiv.insertAdjacentHTML('beforeend', '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #8a8680;color:#8a8680;background:rgba(138,134,128,0.08);margin-left:6px;vertical-align:middle">Archived</span>');
          }
        }
      }
      if (btn) { btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2000); }
    } catch(e) {
      console.error('_updateField exception [' + field + ']:', e);
      if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2500); }
    }
  };

  window._updateDriveLinks = async function(id) {
    var design = (document.getElementById('dlink-design-' + id) || {}).value || '';
    var permit = (document.getElementById('dlink-permit-' + id) || {}).value || '';
    var construction = (document.getElementById('dlink-construction-' + id) || {}).value || '';
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ drive_design_link: design.trim() || null, drive_permit_link: permit.trim() || null, drive_construction_link: construction.trim() || null }) });
      var card = document.getElementById('card-' + id);
      var btn = card ? card.querySelector('[onclick*="_updateDriveLinks"]') : null;
      if (btn) { btn.textContent = res.ok ? 'Saved!' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Save Drive Links'; btn.style.background='var(--gold)';} }, 2000); }
      if (!res.ok) console.error('_updateDriveLinks error:', await res.text());
    } catch(e) { console.error('_updateDriveLinks exception:', e); }
  };

  window._updateProjType = async function(id) {
    var val = (document.getElementById('ptypesel-' + id) || {}).value;
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_type_category: val || null }) });
      var btn = document.getElementById('ptypebtn-' + id);
      if (btn) { btn.textContent = res.ok ? 'Saved ✓' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update'; btn.style.background='var(--gold)';} }, 2000); }
      if (!res.ok) console.error('_updateProjType error:', await res.text());
    } catch(e) { console.error('_updateProjType exception:', e); }
  };

  function flashSaved(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var btn = sel.nextElementSibling;
    if (!btn || btn.tagName !== 'BUTTON') return;
    var orig = btn.textContent;
    btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)';
    setTimeout(function() { if (btn) { btn.textContent = orig; btn.style.background = 'var(--gold)'; } }, 2000);
  }

  // ── SERVICES ─────────────────────────────────────────────────────
  async function loadClientServices(clientId) {
    var wrap = document.getElementById('services-' + clientId);
    if (!wrap) return;
    wrap.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:8px 0">Loading...</div>';
    try {
      var res = await apiFetch('/rest/v1/client_services?client_id=eq.' + clientId + '&order=created_at.asc');
      var services = await res.json() || [];
      renderClientServices(clientId, services);
    } catch(e) { console.error('loadClientServices:', e); wrap.innerHTML = '<div style="font-size:11px;color:var(--error);padding:8px 0">Error loading services</div>'; }
  }
  window.loadClientServices = loadClientServices;

  function renderClientServices(clientId, services) {
    var wrap = document.getElementById('services-' + clientId);
    if (!wrap) return;
    var addedKeys = {};
    services.forEach(function(sv) { if (sv.service_key) addedKeys[sv.service_key] = true; });

    var existingHtml = services.length
      ? services.map(function(sv) {
          return '<div class="da-service-item" id="svc-' + sv.id + '">'
            + '<div class="da-service-name">' + s(sv.service_name) + '</div>'
            + '<div class="da-service-actions"><select class="da-service-status" onchange="window._updateServiceStatus(\'' + sv.id + '\', this.value)"><option value="pending"' + (sv.status==='pending'?' selected':'') + '>Pending</option><option value="in_progress"' + (sv.status==='in_progress'?' selected':'') + '>In Progress</option><option value="complete"' + (sv.status==='complete'?' selected':'') + '>Complete</option></select>'
            + '<button class="da-service-remove" onclick="window._removeService(\'' + sv.id + '\', \'' + clientId + '\')">&#10005;</button></div></div>';
        }).join('')
      : '<div style="font-size:11px;color:var(--muted);padding:4px 0 8px">No services added yet</div>';

    var checklistHtml = (window._ALL_SERVICES || []).map(function(sv) {
      var added = addedKeys[sv.key];
      return '<label class="da-svc-check-label' + (added ? ' da-svc-check-added' : '') + '">'
        + '<input type="checkbox" class="da-svc-checkbox" value="' + sv.key + '" data-label="' + sv.label + '"' + (added ? ' disabled checked' : '') + ' />'
        + '<span>' + s(sv.label) + '</span>'
        + (added ? '<span class="da-svc-added-tag">Added</span>' : '')
        + '</label>';
    }).join('');

    wrap.innerHTML = existingHtml
      + '<div class="da-svc-checklist-wrap" id="svc-checklist-' + clientId + '">'
      + '  <div class="da-svc-checklist-header" onclick="window._toggleSvcChecklist(\'' + clientId + '\')">'
      + '    <span id="svc-checklist-label-' + clientId + '">+ Add Services</span>'
      + '    <span class="da-svc-selected-count" id="svc-count-' + clientId + '"></span>'
      + '  </div>'
      + '  <div class="da-svc-checklist-body" id="svc-checklist-body-' + clientId + '">'
      + '    <div class="da-svc-checklist-grid">' + checklistHtml + '</div>'
      + '    <div class="da-svc-custom-row"><input class="da-text-input" id="svc-custom-input-' + clientId + '" type="text" placeholder="Custom service..." style="flex:1" /></div>'
      + '    <button class="da-update-btn" style="margin-top:8px;width:100%" onclick="window._addSelectedServices(\'' + clientId + '\')">Add Selected Services</button>'
      + '  </div>'
      + '</div>';

    var checkboxes = wrap.querySelectorAll('.da-svc-checkbox:not(:disabled)');
    checkboxes.forEach(function(cb) {
      cb.addEventListener('change', function() {
        var checked = wrap.querySelectorAll('.da-svc-checkbox:not(:disabled):checked').length;
        var countEl = document.getElementById('svc-count-' + clientId);
        if (countEl) countEl.textContent = checked > 0 ? checked + ' selected' : '';
      });
    });
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
    checked.forEach(function(cb) { toAdd.push({ key: cb.value, label: cb.dataset.label }); });
    if (customName) toAdd.push({ key: null, label: customName });
    if (!toAdd.length) return;
    try {
      for (var i = 0; i < toAdd.length; i++) {
        var res = await apiFetch('/rest/v1/client_services', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: clientId, service_name: toAdd[i].label, service_key: toAdd[i].key, status: 'pending' }) });
        if (!res.ok) console.error('Add service error:', await res.text());
      }
      if (customInput) customInput.value = '';
      await loadClientServices(clientId);
    } catch(e) { console.error('_addSelectedServices:', e); }
  };

  window._updateServiceStatus = async function(serviceId, status) {
    try {
      var res = await apiFetch('/rest/v1/client_services?id=eq.' + serviceId, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ status: status }) });
      if (!res.ok) console.error('_updateServiceStatus error:', await res.text());
    } catch(e) { console.error('_updateServiceStatus:', e); }
  };

  window._removeService = async function(serviceId, clientId) {
    try {
      var res = await apiFetch('/rest/v1/client_services?id=eq.' + serviceId, { method: 'DELETE' });
      if (res.ok) await loadClientServices(clientId);
      else console.error('_removeService error:', await res.text());
    } catch(e) { console.error('_removeService:', e); }
  };

  // ── NOTES ─────────────────────────────────────────────────────────
  window._saveNewNote = async function(id) {
    var textarea = document.getElementById('note-new-' + id);
    if (!textarea || !textarea.value.trim()) return;
    var noteText = textarea.value.trim();
    var btn = document.getElementById('note-add-btn-' + id);
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var res = await apiFetch('/rest/v1/admin_notes', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: id, note: noteText }) });
      if (res.ok) {
        textarea.value = '';
        if (btn) { btn.textContent = 'Note Added!'; btn.style.background = 'var(--success)'; }
        window._loadNotesLog(id);
      } else {
        var errText = await res.text();
        console.error('_saveNewNote error:', res.status, errText);
        if (btn) { btn.textContent = 'Error — check console'; btn.style.background = 'var(--error)'; }
      }
    } catch(e) { console.error('_saveNewNote exception:', e); if(btn){btn.textContent='Error';btn.style.background='var(--error)';} }
    setTimeout(function() { if(btn){btn.textContent='Add Note'; btn.style.background='var(--gold)'; btn.disabled=false;} }, 2500);
  };

  window._loadNotesLog = async function(id) {
    var log = document.getElementById('notes-log-' + id);
    if (!log) return;
    try {
      var res = await apiFetch('/rest/v1/admin_notes?client_id=eq.' + id + '&order=created_at.desc');
      var notes = await res.json() || [];
      if (!notes.length) { log.innerHTML = '<div class="da-notes-log-empty">No notes yet</div>'; return; }
      log.innerHTML = notes.map(function(n) {
        var d = new Date(n.created_at);
        var dateStr = d.toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) + ' ' + d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
        // FIX 4: full XSS sanitization on note content
        return '<div class="da-note-entry"><div class="da-note-entry-meta">' + dateStr + '</div><div class="da-note-entry-text">' + s(n.note) + '</div></div>';
      }).join('');
    } catch(e) { log.innerHTML = '<div class="da-notes-log-empty">Could not load notes</div>'; }
  };

  // ── CONTRACTOR TOGGLE ─────────────────────────────────────────────
  window._saveContactInfo = async function(id) {
    var name       = (document.getElementById('edit-name-' + id) || {}).value || '';
    var phone      = (document.getElementById('edit-phone-' + id) || {}).value || '';
    var street     = (document.getElementById('edit-street-' + id) || {}).value || '';
    var investment = (document.getElementById('edit-investment-' + id) || {}).value || '';
    var notes      = (document.getElementById('edit-notes-' + id) || {}).value || '';
    var btn = document.querySelector('[onclick*="_saveContactInfo(\'' + id + '\')"]');
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          full_name: name || null,
          phone: phone || null,
          street: street || null,
          investment: investment || null,
          notes: notes || null
        })
      });
      if (res.ok) {
        // Update local cache
        var c = allClients.find(function(x) { return x.id === id; });
        if (c) { c.full_name = name; c.phone = phone; c.street = street; c.investment = investment; c.notes = notes; }
        // Update visible card name + sub
        var cardName = document.querySelector('#card-' + id + ' .da-card-name');
        if (cardName && name) cardName.childNodes[0].textContent = name;
        if (btn) { btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)'; }
      } else {
        var err = await res.text();
        console.error('_saveContactInfo error:', err);
        if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; }
      }
    } catch(e) {
      console.error('_saveContactInfo exception:', e);
      if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; }
    }
    setTimeout(function() { if(btn){ btn.textContent = 'Save Contact Info'; btn.style.background = 'var(--gold)'; btn.disabled = false; } }, 2500);
  };

  window._toggleContractor = async function(id, currentState) {
    var newState = !currentState;
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ is_contractor: newState }) });
      if (!res.ok) { console.error('_toggleContractor error:', await res.text()); return; }
      var c = allClients.find(function(x) { return x.id === id; }); if (c) c.is_contractor = newState;
      var btn = document.getElementById('contractor-btn-' + id);
      if (btn) {
        btn.textContent = newState ? '✓ Contractor' : 'Mark as Contractor';
        btn.style.color = newState ? 'var(--success)' : 'var(--muted)';
        btn.style.borderColor = newState ? 'var(--success)' : 'var(--border)';
        btn.setAttribute('onclick', 'window._toggleContractor("' + id + '", ' + newState + ')');
      }
      var badge = document.querySelector('#card-' + id + ' .da-role-badge');
      if (badge) { badge.textContent = newState ? 'Contractor' : 'Client'; badge.className = 'da-role-badge ' + (newState ? 'contractor' : 'client'); }
    } catch(e) { console.error('_toggleContractor exception:', e); }
  };

  // ── RESEND PORTAL ACCESS ──────────────────────────────────────────
  window._resendPortalAccess = async function(id, email, name, btn) {
    if (!email) return;
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    try {
      var res = await fetch(SUPABASE_URL + '/functions/v1/invite-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SUPABASE_KEY },
        body: JSON.stringify({ email: email, full_name: name })
      });
      var data = await res.json();
      if (btn) { btn.textContent = data.success ? 'Link Sent!' : 'Error'; btn.style.color = data.success ? 'var(--success)' : 'var(--error)'; }
    } catch(e) { if (btn) { btn.textContent = 'Error'; btn.style.color = 'var(--error)'; } }
    setTimeout(function() { if(btn){btn.textContent='Resend Portal Link'; btn.style.color='var(--gold)'; btn.disabled=false;} }, 3000);
  };

  // ── ADD CLIENT ────────────────────────────────────────────────────
  document.getElementById('acSubmit').addEventListener('click', async function() {
    var name = document.getElementById('acName').value.trim();
    var email = document.getElementById('acEmail').value.trim();
    var phone = document.getElementById('acPhone').value.trim();
    var company = document.getElementById('acCompany').value.trim();
    var investment = document.getElementById('acInvestment').value.trim();
    var referral = document.getElementById('acReferral').value;
    var street = document.getElementById('acStreet').value.trim();
    var notes = document.getElementById('acNotes').value.trim();
    var isContr = document.getElementById('acContractor').checked;
    var customService = document.getElementById('acCustomService') ? document.getElementById('acCustomService').value.trim() : '';
    var selectedServices = Array.from(document.querySelectorAll('#acServicesSelect option:checked')).map(function(o) { return { key: o.value, label: o.dataset.label || o.text }; });
    if (customService) selectedServices.push({ key: null, label: customService });
    var msg = document.getElementById('acMsg');
    if (!name || !email) { msg.textContent = 'Name and email are required.'; msg.className = 'da-modal-msg error'; return; }
    this.disabled = true; this.textContent = 'Adding...'; msg.textContent = '';
    try {
      var res = await apiFetch('/rest/v1/clients', { method: 'POST', headers: { 'Prefer': 'return=representation' }, body: JSON.stringify({ full_name: name, email: email, phone: phone||null, company_name: company||null, investment: investment||null, referral: referral||null, street: street||null, notes: notes||null, status: 'client_inquiry_made', client_stage: 'inquiry_submitted', is_contractor: isContr }) });
      if (res.ok) {
        var newClient = await res.json();
        var newClientId = newClient && newClient[0] ? newClient[0].id : null;
        // Add services
        if (newClientId && selectedServices.length) {
          for (var si = 0; si < selectedServices.length; si++) {
            await apiFetch('/rest/v1/client_services', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: newClientId, service_name: selectedServices[si].label, service_key: selectedServices[si].key, status: 'pending' }) }).catch(function(){});
          }
        }
        // Send welcome email
        if (document.getElementById('acSendEmail').checked && email) {
          try {
            await fetch(SUPABASE_URL + '/functions/v1/invite-client', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SUPABASE_KEY }, body: JSON.stringify({ email: email, full_name: name }) });
            msg.textContent = 'Client added and welcome email sent!';
          } catch(e) { msg.textContent = 'Client added! (Email send failed)'; }
        } else { msg.textContent = 'Client added successfully!'; }
        msg.className = 'da-modal-msg success';
        // Reset form
        ['acName','acEmail','acPhone','acCompany','acInvestment','acStreet','acNotes'].forEach(function(fid) { var el = document.getElementById(fid); if (el) el.value = ''; });
        if (document.getElementById('acCustomService')) document.getElementById('acCustomService').value = '';
        document.getElementById('acContractor').checked = false;
        document.getElementById('acReferral').value = '';
        var svcSel = document.getElementById('acServicesSelect');
        if (svcSel) Array.from(svcSel.options).forEach(function(o) { o.selected = false; });
        // Switch to clients tab then reload
        document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(tc) { tc.classList.remove('active'); });
        document.querySelector('[data-tab="clients"]').classList.add('active');
        document.getElementById('tab-clients').classList.add('active');
        msg.textContent = '';
        await loadClients();
      } else { var et = await res.text(); msg.textContent = 'Error: ' + et.substring(0,100); msg.className = 'da-modal-msg error'; }
    } catch(e) { msg.textContent = 'Something went wrong.'; msg.className = 'da-modal-msg error'; console.error('acSubmit:', e); }
    this.disabled = false; this.textContent = 'Add Client';
  });

  // ── PROJECTS ─────────────────────────────────────────────────────
  window._showAddProjectForm = function() {
    var form = document.getElementById('daAddProjectForm');
    if (!form) return;
    form.style.display = 'block';
    var sel = document.getElementById('apClientId');
    if (sel && allClients.length) {
      sel.innerHTML = '<option value="">Select client...</option>' + allClients.map(function(c) {
        return '<option value="' + c.id + '" data-name="' + s(c.full_name || '') + '">' + s(c.full_name || c.email) + '</option>';
      }).join('');
    }
    // Auto-fill client name when client is selected
    if (sel) {
      sel.onchange = function() {
        var opt = sel.options[sel.selectedIndex];
        var nameInput = document.getElementById('apClientName');
        if (nameInput && opt) nameInput.value = opt.dataset.name || '';
      };
    }
  };

  window._hideAddProjectForm = function() {
    var form = document.getElementById('daAddProjectForm'); if (form) form.style.display = 'none';
  };

  window._openAddProjectForClient = function(clientId, clientName) {
    document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
    document.querySelector('[data-tab="projects"]').classList.add('active');
    document.getElementById('tab-projects').classList.add('active');
    window._showAddProjectForm();
    setTimeout(function() {
      var sel = document.getElementById('apClientId');
      if (sel) sel.value = clientId;
      var nameInput = document.getElementById('apClientName');
      if (nameInput && clientName) nameInput.value = clientName;
    }, 150);
    loadProjects();
  };

  window._submitAddProject = async function() {
    var clientId    = document.getElementById('apClientId').value;
    var clientName  = (document.getElementById('apClientName') || {}).value ? document.getElementById('apClientName').value.trim() : '';
    var address     = document.getElementById('apAddress').value.trim();
    var name        = document.getElementById('apProjectName').value.trim();
    var type        = document.getElementById('apProjectType').value;
    var anything    = (document.getElementById('apAnything') || {}).value ? document.getElementById('apAnything').value.trim() : '';
    var goals       = document.getElementById('apGoals').value.trim();
    var investment  = document.getElementById('apInvestment').value;
    var msg         = document.getElementById('apMsg');

    // Validation — unified required fields
    if (!clientId)  { msg.textContent = 'Please select a client.';         msg.className = 'da-modal-msg error'; return; }
    if (!address)   { msg.textContent = 'Project address is required.';    msg.className = 'da-modal-msg error'; document.getElementById('apAddress').focus(); return; }
    if (!name)      { msg.textContent = 'Project name is required.';       msg.className = 'da-modal-msg error'; document.getElementById('apProjectName').focus(); return; }
    if (!investment){ msg.textContent = 'Please enter an investment / budget level.'; msg.className = 'da-modal-msg error'; document.getElementById('apInvestment').focus(); return; }

    var btn = document.getElementById('apSubmit');
    btn.disabled = true; btn.textContent = 'Creating...'; msg.textContent = '';

    // Combine goals + anything into description
    var description = [goals, anything ? 'Additional notes: ' + anything : ''].filter(Boolean).join('\n\n');

    try {
      var res = await apiFetch('/rest/v1/projects', {
        method: 'POST',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          client_id: clientId,
          project_name: name,
          project_type: type || null,
          project_address: address || null,
          description: description || null,
          status: 'active'
        })
      });
      // Also update investment on client record
      if (investment) {
        apiFetch('/rest/v1/clients?id=eq.' + clientId, {
          method: 'PATCH',
          headers: { 'Prefer': 'return=minimal' },
          body: JSON.stringify({ investment: investment })
        }).catch(function(e) { console.error('investment patch:', e); });
      }
      if (res.ok) {
        msg.textContent = 'Project created successfully!'; msg.className = 'da-modal-msg success';
        // Reset all unified fields
        ['apClientName','apAddress','apProjectName','apAnything','apGoals'].forEach(function(fid) {
          var el = document.getElementById(fid); if (el) el.value = '';
        });
        ['apProjectType','apClientId'].forEach(function(fid) {
          var el = document.getElementById(fid); if (el) el.value = '';
        });
        var inv = document.getElementById('apInvestment'); if (inv) inv.value = '';
        setTimeout(function() { window._hideAddProjectForm(); msg.textContent = ''; loadProjects(); }, 1500);
      } else {
        var et = await res.text();
        msg.textContent = 'Error: ' + et.substring(0,120); msg.className = 'da-modal-msg error';
      }
    } catch(e) {
      msg.textContent = 'Something went wrong. Please try again.'; msg.className = 'da-modal-msg error';
      console.error('_submitAddProject:', e);
    }
    btn.disabled = false; btn.textContent = 'Create Project';
  };

  async function loadProjects() {
    var container = document.getElementById('daProjectsList');
    if (!container) return;
    container.innerHTML = '<div class="da-empty">Loading projects...</div>';
    try {
      var res = await apiFetch('/rest/v1/projects?order=created_at.desc&select=*,clients(full_name,email)');
      var projects = await res.json() || [];
      if (!projects.length) { container.innerHTML = '<div class="da-empty">No projects yet. Click + Add Project to create one.</div>'; return; }
      container.innerHTML = projects.map(function(p) {
        var clientName = p.clients ? s(p.clients.full_name || p.clients.email) : 'Unknown';
        var typeLabel = s(PROJECT_TYPE_LABELS[p.project_type] || p.project_type || '—');
        var startStr = p.start_date ? new Date(p.start_date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '—';
        var endStr = p.end_date ? new Date(p.end_date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '—';
        return '<div class="da-client-card" style="margin-bottom:8px">'
          + '<div class="da-card-top" onclick="window._toggleProjectCard(\'' + p.id + '\')">'
          + '  <div class="da-card-left"><div class="da-card-avatar" style="font-size:11px">' + s((p.project_name||'P').charAt(0).toUpperCase()) + '</div>'
          + '  <div><div class="da-card-name">' + s(p.project_name || 'Unnamed Project') + '</div><div class="da-card-sub">' + clientName + ' · ' + typeLabel + '</div></div></div>'
          + '  <div class="da-card-right"><div class="da-stage-pill" style="color:var(--gold);border-color:var(--gold);background:var(--gold-dim)">' + s(p.status||'active') + '</div><div class="da-card-date">' + startStr + ' → ' + endStr + '</div><div class="da-expand-icon" id="proj-exp-' + p.id + '">&#9660;</div></div>'
          + '</div>'
          + '<div class="da-card-details" id="proj-det-' + p.id + '">'
          + '  <div class="da-details-grid">'
          + '    <div class="da-detail-item"><div class="da-detail-label">Client</div><div class="da-detail-value">' + clientName + '</div></div>'
          + '    <div class="da-detail-item"><div class="da-detail-label">Type</div><div class="da-detail-value">' + typeLabel + '</div></div>'
          + '    <div class="da-detail-item"><div class="da-detail-label">Address</div><div class="da-detail-value">' + s(p.project_address||'—') + '</div></div>'
          + '    <div class="da-detail-item"><div class="da-detail-label">Status</div><div class="da-detail-value">' + s(p.status||'active') + '</div></div>'
          + '    <div class="da-detail-item" style="grid-column:1/-1"><div class="da-detail-label">Goals</div><div class="da-detail-value">' + s(p.description||'—') + '</div></div>'
          + '  </div>'
          + '  <div class="da-card-actions">'
          + '    <div class="da-section-divider">Drive Links</div>'
          + '    <div class="da-action-row"><div class="da-action-label">Design</div><input class="da-text-input" id="plink-design-' + p.id + '" type="text" placeholder="Google Drive link..." value="' + s(p.drive_design_link||'') + '" /></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Permit</div><input class="da-text-input" id="plink-permit-' + p.id + '" type="text" placeholder="Google Drive link..." value="' + s(p.drive_permit_link||'') + '" /></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Construction</div><input class="da-text-input" id="plink-const-' + p.id + '" type="text" placeholder="Google Drive link..." value="' + s(p.drive_construction_link||'') + '" /></div>'
          + '    <button class="da-update-btn" id="plinkbtn-' + p.id + '" onclick="window._saveProjectLinks(\'' + p.id + '\', this)">Save Links</button>'
          + '    <div class="da-section-divider">Status</div>'
          + '    <div class="da-action-row"><select class="da-select" id="pstatus-' + p.id + '"><option value="active"' + (p.status==='active'?' selected':'') + '>Active</option><option value="on_hold"' + (p.status==='on_hold'?' selected':'') + '>On Hold</option><option value="complete"' + (p.status==='complete'?' selected':'') + '>Complete</option><option value="cancelled"' + (p.status==='cancelled'?' selected':'') + '>Cancelled</option></select><button class="da-update-btn" id="pstatusbtn-' + p.id + '" onclick="window._updateProjectStatus(\'' + p.id + '\', this)">Update</button></div>'
          + '    <div class="da-section-divider">Danger Zone</div>'
          + '    <div class="da-action-row"><button class="da-update-btn" style="background:var(--error);border-color:var(--error)" onclick="window._deleteProject(\'' + p.id + '\')">Delete Project</button></div>'
          + '  </div>'
          + '</div>'
          + '</div>';
      }).join('');
    } catch(e) { container.innerHTML = '<div class="da-empty">Error loading projects</div>'; console.error('loadProjects:', e); }
  }

  window._toggleProjectCard = function(id) {
    var det = document.getElementById('proj-det-' + id); var exp = document.getElementById('proj-exp-' + id);
    if (det) det.classList.toggle('visible'); if (exp) exp.classList.toggle('open');
  };

  window._saveProjectLinks = async function(id, btn) {
    var design = (document.getElementById('plink-design-' + id)||{}).value||'';
    var permit = (document.getElementById('plink-permit-' + id)||{}).value||'';
    var cons   = (document.getElementById('plink-const-' + id)||{}).value||'';
    try {
      var res = await apiFetch('/rest/v1/projects?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ drive_design_link: design.trim()||null, drive_permit_link: permit.trim()||null, drive_construction_link: cons.trim()||null }) });
      if (btn) { btn.textContent = res.ok ? 'Saved!' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function(){if(btn){btn.textContent='Save Links';btn.style.background='var(--gold)';}},2000); }
      if (!res.ok) console.error('_saveProjectLinks error:', await res.text());
    } catch(e) { console.error('_saveProjectLinks exception:', e); }
  };

  window._updateProjectStatus = async function(id, btn) {
    var val = (document.getElementById('pstatus-' + id)||{}).value;
    try {
      var res = await apiFetch('/rest/v1/projects?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ status: val }) });
      if (btn) { btn.textContent = res.ok ? 'Saved ✓' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function(){if(btn){btn.textContent='Update';btn.style.background='var(--gold)';} loadProjects();},1500); }
      if (!res.ok) console.error('_updateProjectStatus error:', await res.text());
    } catch(e) { console.error('_updateProjectStatus:', e); }
  };

  window._deleteProject = async function(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      var res = await apiFetch('/rest/v1/projects?id=eq.' + id, { method: 'DELETE' });
      if (res.ok) loadProjects(); else console.error('_deleteProject error:', await res.text());
    } catch(e) { console.error('_deleteProject:', e); }
  };

  // ── CHECKLIST TAB ─────────────────────────────────────────────────
  async function loadAllChecklists() {
    try {
      var [checkRes, noteRes] = await Promise.all([apiFetch('/rest/v1/checklist_items?select=*'), apiFetch('/rest/v1/client_notes?select=*')]);
      var checks = await checkRes.json() || [];
      var notes = await noteRes.json() || [];
      allChecklists = {}; allNotes = {};
      checks.forEach(function(c) { if (!allChecklists[c.client_id]) allChecklists[c.client_id] = {}; allChecklists[c.client_id][c.item_key] = c.completed; });
      notes.forEach(function(n) { if (!allNotes[n.client_id]) allNotes[n.client_id] = {}; allNotes[n.client_id][n.note_key] = n.content; });
      renderChecklistTab(allClients);
    } catch(e) { console.error('loadAllChecklists:', e); }
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
        return '<div class="da-check-row"><div class="da-check-dot' + (isDone?' done':'') + '"></div><div style="flex:1"><div class="da-check-row-label">' + s(CHECKLIST_LABELS[key]||key) + (isDone?' <span style="color:var(--success);font-size:10px">✓</span>':'') + '</div>' + (note ? '<div class="da-check-row-note">' + s(note) + '</div>' : '') + '</div></div>';
      }).join('');
      return '<div class="da-client-checklist"><div class="da-client-checklist-header" onclick="window._toggleClientChecklist(\'' + c.id + '\')"><div class="da-client-checklist-name">' + s(c.full_name||'Unknown') + ' <span style="font-size:10px;color:var(--muted)">' + s(c.email||'') + '</span></div><div class="da-client-checklist-progress"><span>' + done + '</span> / ' + KEYS.length + '</div></div><div class="da-client-checklist-body" id="client-checklist-' + c.id + '">' + items + '</div></div>';
    }).join('');
  }

  window._toggleClientChecklist = function(id) { var b = document.getElementById('client-checklist-' + id); if (b) b.classList.toggle('visible'); };

  // FIX 6: Debounced checklist search
  var checkSearchTimeout;
  document.getElementById('daCheckSearch').addEventListener('input', function() {
    var q = this.value.toLowerCase();
    clearTimeout(checkSearchTimeout);
    checkSearchTimeout = setTimeout(function() {
      renderChecklistTab(allClients.filter(function(c) { return (c.full_name||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q); }));
    }, 300);
  });

  // ── MESSAGES ─────────────────────────────────────────────────────
  async function loadMessages() {
    try {
      var res = await apiFetch('/rest/v1/messages?order=created_at.asc&limit=200');
      allMessages = await res.json() || [];
      renderMessages();
    } catch(e) { console.error('loadMessages:', e); }
  }

  function renderMessages() {
    var container = document.getElementById('daMsgList');
    if (!allMessages.length) { container.innerHTML = '<div class="da-empty">No messages yet</div>'; return; }
    var groups = {};
    allMessages.forEach(function(m) { var key = m.client_id || m.sender || 'unknown'; if (!groups[key]) groups[key] = []; groups[key].push(m); });
    container.innerHTML = Object.keys(groups).map(function(key) {
      var msgs = groups[key];
      var latest = msgs[msgs.length - 1];
      var client = allClients.find(function(c) { return c.id === key || c.email === msgs[0].sender; });
      var name = s(client ? client.full_name : (msgs[0].sender || 'Unknown'));
      var clientId = client ? client.id : key;
      var hasUnread = msgs.some(function(m) { return !m.is_read && m.sender !== 'daydream_team'; });
      var threadHtml = msgs.map(function(m) {
        var isTeam = m.sender === 'daydream_team';
        return '<div style="display:flex;flex-direction:column;margin-bottom:8px;align-items:' + (isTeam ? 'flex-end' : 'flex-start') + '"><div class="da-msg-bubble ' + (isTeam ? 'team' : 'client') + '">' + s(m.content) + '</div><div style="font-size:9px;color:var(--muted);margin-top:2px' + (isTeam?';text-align:right':'') + '">' + (isTeam ? 'Daydream Team' : name) + ' · ' + formatDate(m.created_at) + '</div></div>';
      }).join('');
      return '<div class="da-msg-card' + (hasUnread?' unread':'') + '"><div style="cursor:pointer" onclick="window._toggleThread(\'' + clientId + '\')"><div class="da-msg-client">' + name + '</div><div class="da-msg-preview">' + s((latest.content||'').substring(0,100)) + '</div><div class="da-msg-meta">' + msgs.length + ' message(s) · ' + formatDate(latest.created_at) + '</div></div><div class="da-msg-thread" id="thread-' + clientId + '"><div style="max-height:300px;overflow-y:auto;padding:8px 0">' + threadHtml + '</div><div class="da-msg-reply"><textarea id="reply-' + clientId + '" placeholder="Type your reply..."></textarea><button class="da-reply-btn" onclick="window._sendReply(\'' + clientId + '\', \'' + (msgs[0].project_id||'') + '\')">Send</button></div></div></div>';
    }).join('');
  }

  window._toggleThread = function(id) { var t = document.getElementById('thread-' + id); if (t) t.classList.toggle('visible'); };
  window._sendReply = async function(clientId, projectId) {
    var textarea = document.getElementById('reply-' + clientId);
    var content = textarea ? textarea.value.trim() : '';
    if (!content) return;
    try {
      var res = await apiFetch('/rest/v1/messages', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_id: projectId||null, client_id: clientId||null, sender: 'daydream_team', content: content, is_read: true }) });
      if (res.ok) { textarea.value = ''; await loadMessages(); }
      else console.error('_sendReply error:', await res.text());
    } catch(e) { console.error('_sendReply:', e); }
  };

  // ── JOB SITE PHOTOS ──────────────────────────────────────────────
  var SIX_MB = 6 * 1024 * 1024;

  function populatePhotoClientFilter() {
    var filter = document.getElementById('daPhotoClientFilter');
    var uploadSel = document.getElementById('daPhotoUploadClient');
    if (!filter || !allClients.length) return;
    var opts = '<option value="">All Clients</option>' + allClients.map(function(c) {
      return '<option value="' + c.id + '">' + s(c.full_name || c.email) + '</option>';
    }).join('');
    filter.innerHTML = opts;
    if (uploadSel) uploadSel.innerHTML = '<option value="">Select client...</option>' + allClients.map(function(c) {
      return '<option value="' + c.id + '">' + s(c.full_name || c.email) + '</option>';
    }).join('');
    filter.onchange = function() { loadAdminPhotos(filter.value); };
  }

  window._showAdminPhotoUpload = function() {
    var form = document.getElementById('daAdminPhotoUploadForm');
    if (form) form.style.display = 'block';
    // Default visit date to today
    var dateInput = document.getElementById('daPhotoVisitDate');
    if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().split('T')[0];
    // Populate client selector
    var uploadClient = document.getElementById('daPhotoUploadClient');
    if (uploadClient && allClients.length && uploadClient.options.length <= 1) {
      uploadClient.innerHTML = '<option value="">Select client...</option>' + allClients.map(function(c) {
        return '<option value="' + c.id + '">' + s(c.full_name || c.email) + '</option>';
      }).join('');
    }
    populatePhotoClientFilter();
    // Default visit date to today
    var dateInput = document.getElementById('daPhotoVisitDate');
    if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().split('T')[0];
  };

  window._hideAdminPhotoUpload = function() {
    var form = document.getElementById('daAdminPhotoUploadForm');
    if (form) form.style.display = 'none';
    var msg = document.getElementById('daPhotoMsg');
    if (msg) msg.textContent = '';
  };

  window._submitAdminPhotos = async function() {
    var clientId = (document.getElementById('daPhotoUploadClient') || {}).value;
    var visitDate = (document.getElementById('daPhotoVisitDate') || {}).value || new Date().toISOString().split('T')[0];
    var notes = (document.getElementById('daPhotoNotes') || {}).value || '';
    var fileInput = document.getElementById('daPhotoFiles');
    var files = fileInput ? Array.from(fileInput.files) : [];
    var msg = document.getElementById('daPhotoMsg');
    var btn = document.getElementById('daPhotoSubmit');
    var statusEl = document.getElementById('daPhotoUploadStatus');

    if (!clientId) { msg.textContent = 'Please select a client.'; msg.className = 'da-modal-msg error'; return; }
    if (!files.length) { msg.textContent = 'Please select at least one photo.'; msg.className = 'da-modal-msg error'; return; }

    btn.disabled = true; btn.textContent = 'Uploading...'; msg.textContent = '';
    var client = allClients.find(function(c) { return c.id === clientId; });
    var clientName = client ? (client.full_name || client.email) : clientId;
    var folderPath = clientName + '/site-photos/' + visitDate + ' Site Visit';

    // Upload all photos in parallel
    var uploadResults = await Promise.all(files.map(async function(file) {
      var safeName = file.name.replace(/[^a-zA-Z0-9._\-]/g, '_');
      var path = folderPath + '/' + Date.now() + '_' + safeName;
      try {
        var ok = false;
        if (file.size > SIX_MB) {
          ok = await adminUploadResumable(file, path);
        } else {
          var res = await fetch('https://wboqkfqibztjmdwrwsch.supabase.co/storage/v1/object/client-documents/' + path, {
            method: 'POST',
            headers: { 'apikey': 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU', 'Authorization': 'Bearer ' + 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU', 'Content-Type': file.type },
            body: file
          });
          ok = res.ok;
        }
        if (ok) {
          await apiFetch('/rest/v1/documents', {
            method: 'POST',
            headers: { 'Prefer': 'return=minimal' },
            body: JSON.stringify({
              client_id: clientId,
              file_name: file.name,
              file_url: path,
              uploaded_by: 'daydream_team',
              photo_category: 'site_photos',
              photo_notes: notes,
              visit_date: visitDate
            })
          });
        }
        return ok;
      } catch(e) { console.error('Admin photo upload error:', e); return false; }
    }));

    var uploaded = uploadResults.filter(Boolean).length;
    if (statusEl) statusEl.textContent = uploaded + ' of ' + files.length + ' photo(s) uploaded';
    if (uploaded > 0) {
      msg.textContent = uploaded + ' photo(s) saved successfully!'; msg.className = 'da-modal-msg success';
      if (fileInput) fileInput.value = '';
      setTimeout(function() { window._hideAdminPhotoUpload(); loadAdminPhotos(clientId); }, 1500);
    } else {
      msg.textContent = 'Upload failed. Please try again.'; msg.className = 'da-modal-msg error';
    }
    btn.disabled = false; btn.textContent = 'Upload & Save';
  };

  async function adminUploadResumable(file, path) {
    var CHUNK = 6 * 1024 * 1024;
    var SKEY = 'sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU';
    var SURL = 'https://wboqkfqibztjmdwrwsch.supabase.co';
    try {
      var createRes = await fetch(SURL + '/storage/v1/upload/resumable', {
        method: 'POST',
        headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/offset+octet-stream', 'Upload-Length': file.size, 'Upload-Metadata': 'bucketName ' + btoa('client-documents') + ',objectName ' + btoa(path) + ',contentType ' + btoa(file.type || 'application/octet-stream'), 'Tus-Resumable': '1.0.0' }
      });
      if (!createRes.ok && createRes.status !== 201) return false;
      var uploadUrl = createRes.headers.get('Location');
      if (!uploadUrl) return false;
      if (uploadUrl.startsWith('/')) uploadUrl = SURL + uploadUrl;
      var offset = 0;
      while (offset < file.size) {
        var chunk = file.slice(offset, offset + CHUNK);
        var patchRes = await fetch(uploadUrl, { method: 'PATCH', headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY, 'Content-Type': 'application/offset+octet-stream', 'Upload-Offset': offset, 'Tus-Resumable': '1.0.0' }, body: chunk });
        if (!patchRes.ok) return false;
        offset += CHUNK;
      }
      return true;
    } catch(e) { return false; }
  }

  async function loadAdminPhotos(clientIdFilter) {
    var container = document.getElementById('daPhotosList');
    if (!container) return;
    container.innerHTML = '<div class="da-empty">Loading photos...</div>';
    try {
      var url = '/rest/v1/documents?photo_category=eq.site_photos&order=visit_date.desc,created_at.desc';
      if (clientIdFilter) url += '&client_id=eq.' + clientIdFilter;
      var res = await apiFetch(url);
      var photos = await res.json() || [];
      if (!photos.length) { container.innerHTML = '<div class="da-empty">No site photos yet. Click + Upload Photos to add some.</div>'; return; }

      // Group by visit date
      var groups = {};
      photos.forEach(function(p) {
        var d = p.visit_date || p.created_at.split('T')[0];
        if (!groups[d]) groups[d] = [];
        groups[d].push(p);
      });

      container.innerHTML = Object.keys(groups).sort(function(a,b) { return b.localeCompare(a); }).map(function(date) {
        var datePhotos = groups[date];
        var client = allClients.find(function(c) { return c.id === datePhotos[0].client_id; });
        var clientName = client ? s(client.full_name || client.email) : 'Unknown Client';
        var d = new Date(date + 'T12:00:00');
        var dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        var notes = datePhotos[0].photo_notes || '';
        return '<div class="da-client-card" style="margin-bottom:16px">'
          + '<div style="padding:16px 20px;border-bottom:1px solid var(--border);background:var(--surface-2);display:flex;align-items:center;justify-content:space-between">'
          + '  <div><div class="da-card-name">' + dateStr + ' Site Visit</div><div class="da-card-sub">' + clientName + ' · ' + datePhotos.length + ' photo(s) · Uploaded by ' + s(datePhotos[0].uploaded_by === 'daydream_team' ? 'Daydream Team' : 'Client') + '</div></div>'
          + '</div>'
          + (notes ? '<div style="padding:12px 20px;border-bottom:1px solid var(--border);font-size:12px;color:var(--muted);border-left:3px solid var(--gold)">' + s(notes) + '</div>' : '')
          + '<div style="padding:16px 20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">'
          + datePhotos.map(function(p) {
              var signedUrl = 'https://wboqkfqibztjmdwrwsch.supabase.co/storage/v1/object/public/client-documents/' + p.file_url;
              return '<div style="position:relative;aspect-ratio:1;overflow:hidden;background:var(--surface-2);border:1px solid var(--border)">'
                + '<img src="' + signedUrl + '" style="width:100%;height:100%;object-fit:cover;cursor:pointer" onclick="window.open(\'' + signedUrl + '\', \'_blank\')" onerror="this.parentNode.innerHTML=\'<div style=\\"display:flex;align-items:center;justify-content:center;height:100%;font-size:11px;color:var(--muted);\\">No preview</div>\'" />'
                + '<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);padding:4px 6px;font-size:9px;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + s(p.file_name) + '</div>'
                + '</div>';
            }).join('')
          + '</div>'
          + '</div>';
      }).join('');
    } catch(e) { container.innerHTML = '<div class="da-empty">Error loading photos</div>'; console.error('loadAdminPhotos:', e); }
  }

  // ── ADMIN REALTIME — Live updates when clients act ────────────────
  var adminRealtimeChannels = [];

  function startAdminRealtime() {
    stopAdminRealtime();

    // ── 1. LIVE NEW MESSAGES from clients ─────────────────────────
    // Admin sees gold dot and unread count update the moment a client sends a message
    var msgChannel = new WebSocket(
      'wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU&vsn=1.0.0'
    );

    msgChannel.onopen = function() {
      // Subscribe to ALL new messages (admin sees everything)
      msgChannel.send(JSON.stringify({
        topic: 'realtime:public:messages',
        event: 'phx_join',
        payload: {},
        ref: '1'
      }));
    };

    msgChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'INSERT' && data.payload && data.payload.record) {
          var msg = data.payload.record;
          // Only react to client messages, not admin replies
          if (msg.sender === 'daydream_team') return;
          // Update unread dot on Messages tab
          var msgTab = document.querySelector('#dd-admin [data-tab="messages"]');
          if (msgTab) {
            var dot = msgTab.querySelector('.da-msg-dot');
            if (!dot) { dot = document.createElement('span'); dot.className = 'da-msg-dot'; msgTab.appendChild(dot); }
            var currentCount = parseInt(dot.textContent) || 0;
            dot.textContent = currentCount + 1;
          }
          // If messages tab is open, reload it live
          var msgsTab = document.getElementById('tab-messages');
          if (msgsTab && msgsTab.classList.contains('active')) {
            loadMessages();
          }
          // Show admin toast
          showAdminToast('New message from client');
        }
      } catch(e) { console.error('Admin realtime messages:', e); }
    };

    msgChannel.onerror = function(e) { console.error('Admin realtime msg error:', e); };
    adminRealtimeChannels.push(msgChannel);

    // ── 2. LIVE NEW CLIENTS from intake form ──────────────────────
    // Admin sees new leads instantly when someone submits the intake form
    var clientChannel = new WebSocket(
      'wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU&vsn=1.0.0'
    );

    clientChannel.onopen = function() {
      clientChannel.send(JSON.stringify({
        topic: 'realtime:public:clients',
        event: 'phx_join',
        payload: {},
        ref: '2'
      }));
    };

    clientChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'INSERT' && data.payload && data.payload.record) {
          var newClient = data.payload.record;
          // Add to local cache
          allClients.unshift(newClient);
          updateStats();
          // If clients tab is active, re-render
          var clientsTab = document.getElementById('tab-clients');
          if (clientsTab && clientsTab.classList.contains('active')) {
            applyFilters();
          }
          showAdminToast('New lead: ' + (newClient.full_name || newClient.email || 'Unknown'));
        }
        if (data.event === 'UPDATE' && data.payload && data.payload.record) {
          var updated = data.payload.record;
          // Update local cache
          var idx = allClients.findIndex(function(c) { return c.id === updated.id; });
          if (idx > -1) allClients[idx] = Object.assign({}, allClients[idx], updated);
        }
      } catch(e) { console.error('Admin realtime clients:', e); }
    };

    clientChannel.onerror = function(e) { console.error('Admin realtime client error:', e); };
    adminRealtimeChannels.push(clientChannel);

    // ── 3. LIVE NEW PROJECTS from client portal ───────────────────
    var projChannel = new WebSocket(
      'wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=sb_publishable_0Pcs1MVkQt4ILtrN_luJ6Q_9JeR2KNU&vsn=1.0.0'
    );

    projChannel.onopen = function() {
      projChannel.send(JSON.stringify({
        topic: 'realtime:public:projects',
        event: 'phx_join',
        payload: {},
        ref: '3'
      }));
    };

    projChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'INSERT' && data.payload && data.payload.record) {
          var proj = data.payload.record;
          // If projects tab is active, reload it
          var projTab = document.getElementById('tab-projects');
          if (projTab && projTab.classList.contains('active')) {
            loadProjects();
          }
          showAdminToast('New project created: ' + (proj.project_name || 'Unnamed'));
        }
      } catch(e) { console.error('Admin realtime projects:', e); }
    };

    projChannel.onerror = function(e) { console.error('Admin realtime proj error:', e); };
    adminRealtimeChannels.push(projChannel);
  }

  function stopAdminRealtime() {
    adminRealtimeChannels.forEach(function(ch) {
      try { ch.close(); } catch(e) {}
    });
    adminRealtimeChannels = [];
  }

  // Admin toast notification
  function showAdminToast(message) {
    var existing = document.getElementById('daRealtimeToast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.id = 'daRealtimeToast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--gold);color:var(--bg);font-family:Jost,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 20px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.4);animation:daFade 0.3s ease both';
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 4000);
  }

})();
