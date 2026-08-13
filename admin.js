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
    { value: 'client_inquiry_made',                 label: 'Client Inquiry Made',                  color: '#8a8680' },
    { value: 'client_qualified',                      label: 'Client Qualified',                      color: '#9e7b50' },
    { value: 'discovery_call_booked',                  label: 'Discovery Call Booked',                  color: '#9e7b50' },
    { value: 'discovery_call_completed',              label: 'Discovery Call Completed',              color: '#9e7b50' },
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
    { value: 'construction_started',                  label: 'Construction Started',                  color: '#9e7b50' },
    { value: 'construction_finished',                 label: 'Construction Finished',                 color: '#6a9e7a' },
    { value: 'site_photos_to_be_made',                label: 'Site Photos To Be Made',                color: '#8a8680' },
    { value: 'site_photos_finished',                  label: 'Site Photos Finished',                  color: '#6a9e7a' },
    { value: 'project_complete',                      label: 'Project Complete',                      color: '#9e7b50' }
  ];

  var CLIENT_STAGES = [
    { value: 'inquiry_submitted',            label: 'Inquiry Submitted' },
    { value: 'in_progress',                  label: 'In Progress' },
    { value: 'discovery_call',               label: 'Discovery Call' },
    { value: 'design_proposal',              label: 'Design Proposal' },
    { value: 'contract_signed',              label: 'Contract Signed' },
    { value: 'concept_design_phase',         label: 'Concept Design Phase' },
    { value: 'design_review_revisions',      label: 'Design Review & Revisions' },
    { value: 'construction_document_phase', label: 'Construction Document Phase' },
    { value: 'permit_submittal',             label: 'Permit Submittal' },
    { value: 'permit_design_revisions',      label: 'Permit Design Revisions' },
    { value: 'permit_approved',              label: 'Permit Approved' },
    { value: 'final_deliverables',           label: 'Final Deliverables' }
  ];

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

  var STONE_STAGES = [
    { value: 'discovery_call',        label: 'Discovery Call',         color: '#8a8680' },
    { value: 'designs_received',      label: 'Designs Received',        color: '#7a9eb8' },
    { value: 'model_started',         label: '3D Model Started',       color: '#6a8ea8' },
    { value: 'model_completed',       label: '3D Model Completed',     color: '#5a7e98' },
    { value: 'takeoffs_complete',     label: 'Take-offs Complete',     color: '#9e7b50' },
    { value: 'proposal_sent',         label: 'Proposal Sent',          color: '#c4a07a' },
    { value: 'proposal_accepted',     label: 'Proposal Accepted',      color: '#6a9e7a' },
    { value: 'payment_sent',          label: 'Payment Sent',           color: '#5a8e6a' },
    { value: 'payment_received',      label: 'Payment Received',       color: '#4a7e5a' },
    { value: 'stone_purchased',       label: 'Stone Purchased',        color: '#9e7a5a' },
    { value: 'stone_ordered',         label: 'Stone Ordered',          color: '#8e6a4a' },
    { value: 'in_transit',            label: 'In Transit',             color: '#7e5a3a' },
    { value: 'arrived_at_port',       label: 'Arrived at Port',        color: '#6a9e7a' },
    { value: 'delivered_to_job_site', label: 'Delivered to Job Site',  color: '#4a9e4a' }
  ];

  var CONTRACT_STAGES = [
    { value: 'not_sent',   label: 'Not Yet Sent',               color: '#8a8680' },
    { value: 'sent',       label: 'Sent — Awaiting Signature',  color: '#9e7b50' },
    { value: 'signed',     label: 'Signed ✓',                    color: '#6a9e7a' }
  ];

  var PAYMENT_STAGES = [
    { value: 'not_sent',          label: 'Invoice Not Yet Sent',             color: '#8a8680' },
    { value: 'invoice_sent',      label: 'Invoice Sent — Awaiting Payment', color: '#9e7b50' },
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

  var CLIENT_STATUSES = [
    { value: 'active_client',    label: 'Active Client',        color: '#6a9e7a' },
    { value: 'lead',             label: 'Lead / Not Converted', color: '#9e7b50' },
    { value: 'no_response',      label: 'No Response / Ghosted',color: '#c07a6a' },
    { value: 'archived',         label: 'Archived',             color: '#8a8680' }
  ];

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
    '#dd-admin { --bg: #ede8df; --surface: #faf8f5; --surface-2: #f7f3ed; --border: #e1d9cd; --text: #28231e; --muted: #8a7d73; --gold: #9e7b50; --gold-light: #c4a07a; --gold-dim: rgba(158,123,80,0.10); --error: #c07a6a; --success: #6a9e7a; font-family: Jost, sans-serif; font-weight: 300; background: var(--bg); color: var(--text); min-height: 100vh; width: 100%; }',
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
    /* FIX: tabs scroll freely, no compress */
    '#dd-admin .da-tabs { background: var(--surface); border-bottom: 1px solid var(--border); display: flex; padding: 0 24px; overflow-x: auto; overflow-y: visible; scrollbar-width: none; -webkit-overflow-scrolling: touch; justify-content: flex-start; width: 100%; }',
    '#dd-admin .da-tabs::-webkit-scrollbar { display: none; }',
    '#dd-admin .da-tabs-wrap { position: relative; width: 100%; overflow: hidden; }',
    '#dd-admin .da-tabs-wrap::after { content: ""; position: absolute; right: 0; top: 0; bottom: 0; width: 32px; background: linear-gradient(to right, transparent, var(--surface)); pointer-events: none; z-index: 1; }',
    '#dd-admin .da-tab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 14px 18px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; background: none; border-left: none; border-right: none; border-top: none; white-space: nowrap; flex-shrink: 0; line-height: 1; }',
    '#dd-admin .da-tab:hover { color: var(--text); }',
    '#dd-admin .da-tab.active { color: var(--gold); border-bottom-color: var(--gold); }',
    '#dd-admin .da-tab-add { color: var(--gold) !important; font-weight: 500; }',
    '#dd-admin .da-msg-dot { display: inline-block; background: var(--gold); color: var(--bg); font-size: 8px; font-family: Jost, sans-serif; padding: 1px 5px; border-radius: 8px; margin-left: 4px; vertical-align: middle; min-width: 16px; text-align: center; }',
    '#dd-admin .da-tab-content { display: none; flex: 1; }',
    '#dd-admin .da-tab-content.active { display: block; }',
    '#dd-admin .da-client-subtabs { display: flex; background: var(--bg); border-bottom: 2px solid var(--border); padding: 0 32px; gap: 0; overflow-x: auto; }',
    '#dd-admin .da-client-subtab { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); padding: 14px 20px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s, border-color 0.2s; background: none; border-left: none; border-right: none; border-top: none; white-space: nowrap; display: flex; align-items: center; gap: 8px; }',
    '#dd-admin .da-client-subtab:hover { color: var(--text); }',
    '#dd-admin .da-client-subtab.active { color: var(--gold); border-bottom-color: var(--gold); }',
    '#dd-admin .da-subtab-count { font-size: 8px; background: var(--surface-2); border: 1px solid var(--border); color: var(--muted); padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center; }',
    '#dd-admin .da-client-subtab.active .da-subtab-count { background: var(--gold-dim); border-color: var(--gold); color: var(--gold); }',
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
    '#dd-admin .da-check-clickable { cursor: pointer; transition: background 0.15s; }',
    '#dd-admin .da-check-clickable:hover { background: var(--gold-dim); }',
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
    // Subcontractor styles
    '#dd-admin .da-sub-flag { font-size: 7px; letter-spacing: 0.2em; text-transform: uppercase; padding: 2px 7px; border: 1px solid; margin-left: 8px; vertical-align: middle; }',
    '#dd-admin .da-sub-flag.expired { color: var(--error); border-color: var(--error); }',
    '#dd-admin .da-sub-flag.expiring { color: var(--gold); border-color: var(--gold); }',
    '#dd-admin .da-sub-compliance { text-align: right; flex-shrink: 0; }',
    '#dd-admin .da-sub-pct { font-family: "Cormorant Garamond", serif; font-size: 22px; line-height: 1; }',
    '#dd-admin .da-sub-pct-label { font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }',
    '#dd-admin .da-sub-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 16px; }',
    '#dd-admin .da-sub-info { background: var(--surface); padding: 10px 14px; }',
    '#dd-admin .da-sub-info-label { font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }',
    '#dd-admin .da-sub-info-val { font-size: 13px; color: var(--text); word-break: break-word; }',
    '#dd-admin .da-sub-notes { font-size: 12px; color: var(--text); line-height: 1.6; padding: 10px 0; border-top: 1px solid var(--border); }',
    '#dd-admin .da-sub-drive { display: flex; gap: 10px; margin: 14px 0; flex-wrap: wrap; }',
    '#dd-admin .da-sub-drive-btn { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--gold); padding: 8px 16px; text-decoration: none; transition: background 0.2s, color 0.2s; }',
    '#dd-admin .da-sub-drive-btn:hover { background: var(--gold); color: var(--surface); }',
    '#dd-admin .da-sub-section-title { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin: 20px 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }',
    '#dd-admin .da-sub-doc { border: 1px solid var(--border); margin-bottom: 8px; background: var(--surface); }',
    '#dd-admin .da-sub-doc-head { padding: 10px 14px; background: var(--surface-2); }',
    '#dd-admin .da-sub-doc-name { font-size: 13px; color: var(--text); }',
    '#dd-admin .da-sub-req { font-size: 7px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--gold); padding: 1px 6px; margin-left: 6px; }',
    '#dd-admin .da-sub-doc-empty { padding: 10px 14px; font-size: 12px; color: var(--muted); font-style: italic; }',
    '#dd-admin .da-sub-file { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 14px; border-top: 1px solid var(--border); flex-wrap: wrap; }',
    '#dd-admin .da-sub-file-main { flex: 1; min-width: 0; }',
    '#dd-admin .da-sub-file-name { font-size: 12px; color: var(--gold); text-decoration: none; word-break: break-word; }',
    '#dd-admin .da-sub-file-meta { font-size: 10px; color: var(--muted); margin-top: 2px; }',
    '#dd-admin .da-sub-file-meta.expiring { color: var(--gold); }',
    '#dd-admin .da-sub-file-meta.expired { color: var(--error); }',
    '#dd-admin .da-sub-status-sel, #dd-admin .da-sub-master-status { font-family: Jost, sans-serif; font-size: 11px; border: 1px solid var(--border); background: var(--surface); color: var(--text); padding: 6px 10px; outline: none; cursor: pointer; }',
    '#dd-admin .da-sub-actions { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }',
    '#dd-admin .da-sub-action-label { font-size: 8px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }',
    '#dd-admin .da-sub-admin-notes { width: 100%; font-family: Jost, sans-serif; font-size: 13px; border: 1px solid var(--border); background: var(--surface); color: var(--text); padding: 10px 12px; outline: none; min-height: 70px; margin: 12px 0 10px; resize: vertical; }',
    '#dd-admin .da-sub-save-notes { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--gold); background: none; padding: 9px 20px; cursor: pointer; transition: background 0.2s, color 0.2s; }',
    '#dd-admin .da-sub-save-notes:hover { background: var(--gold); color: var(--surface); }',
    '#dd-admin .da-section-title { font-family: "Cormorant Garamond", serif; font-size: 24px; font-weight: 300; color: var(--text); margin-bottom: 20px; }',
    '@keyframes daFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '#dd-admin .da-mobile-menu .da-tab { text-align: left; padding: 14px 20px; border-bottom: 1px solid var(--border); border-radius: 0; width: 100%; font-size: 9px; letter-spacing: 0.25em; }',
    '@media (max-width: 700px) {',
    '  #dd-admin .da-stats { flex-direction: column; }',
    '  #dd-admin .da-nav { padding: 0 12px; height: 52px; }',
    '  #dd-admin .da-nav-title { font-size: 12px; }',
    '  #dd-admin .da-toolbar { padding: 12px; gap: 8px; }',
    '  #dd-admin .da-toolbar .da-search { width: 100%; }',
    '  #dd-admin .da-toolbar .da-filter { width: 100%; min-width: unset !important; }',
    '  #dd-admin .da-cards-wrap { padding: 12px; }',
    '  #dd-admin .da-card-top { flex-direction: column; align-items: flex-start; gap: 8px; }',
    '  #dd-admin .da-card-right { width: 100%; justify-content: flex-start; flex-wrap: wrap; }',
    '  #dd-admin .da-card-name { font-size: 13px; word-break: break-word; }',
    '  #dd-admin .da-stage-pill { font-size: 9px; }',
    '  #dd-admin .da-details-grid { grid-template-columns: 1fr; }',
    '  #dd-admin .da-action-row { flex-direction: column; align-items: flex-start; }',
    '  #dd-admin .da-action-row .da-select { width: 100%; }',
    '  #dd-admin .da-action-row .da-update-btn { width: 100%; }',
    '  #dd-admin .da-messages-wrap, #dd-admin .da-checklist-wrap { padding: 12px; }',
    '  #dd-admin .da-modal-grid { grid-template-columns: 1fr; }',
    '  #dd-admin .da-add-client-wrap { padding: 16px; }',
    '  #dd-admin .da-client-subtabs { padding: 0 12px; }',
    '  #dd-admin .da-client-subtab { padding: 12px 14px; font-size: 8px; }',
    '  #dd-admin .da-section-title { font-size: 16px; }',
    '  #dd-admin .da-tabs { padding: 0 4px; }',
    '  #dd-admin .da-tab { padding: 14px 12px; font-size: 8px; letter-spacing: 0.18em; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Measure site header (#ddNav) and offset the admin panel below it ──
  function ddAdminHeaderOffset() {
    var admin = document.getElementById('dd-admin');
    if (!admin) return;
    var nav = document.getElementById('ddNav');
    var h = nav ? Math.ceil(nav.getBoundingClientRect().bottom) : 80;
    if (!h || h < 80) h = 80;
    admin.style.paddingTop = h + 'px';
  }
  ddAdminHeaderOffset();
  window.addEventListener('resize', ddAdminHeaderOffset, { passive: true });
  window.addEventListener('load', ddAdminHeaderOffset, { passive: true });
  setTimeout(ddAdminHeaderOffset, 400);

  // ── BUILD FILTER OPTIONS ──────────────────────────────────────────
  var filterOptions = '<option value="">All Pipeline Stages</option>' + PIPELINE_STAGES.map(function(s) {
    return '<option value="' + s.value + '">' + s.label + '</option>';
  }).join('');

  // ── HTML ──────────────────────────────────────────────────────────
  var wrap = document.getElementById('dd-admin');
  if (!wrap) return;

  wrap.innerHTML = [
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

    '<div id="daDashboard" class="da-dashboard">',
    '  <nav class="da-nav"><div style="display:flex;align-items:center"><div class="da-nav-logo">Daydream</div><div class="da-nav-badge">Admin</div></div><button class="da-nav-logout" id="daLogoutBtn">Sign Out</button></nav>',
    '  <div class="da-stats">',
    '    <div class="da-stat"><div class="da-stat-label">Total Leads</div><div class="da-stat-value" id="daStatTotal">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Active Projects</div><div class="da-stat-value" id="daStatActive">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">Completed</div><div class="da-stat-value" id="daStatComplete">—</div></div>',
    '    <div class="da-stat"><div class="da-stat-label">New This Month</div><div class="da-stat-value" id="daStatMonth">—</div></div>',
    '  </div>',
    '  <div class="da-tabs-wrap"><div class="da-tabs">',
    '    <button class="da-tab active" data-tab="clients">Clients</button>',
    '    <button class="da-tab da-tab-add" data-tab="add-client">+ Add Client</button>',
    '    <button class="da-tab da-tab-add" data-tab="projects">Projects</button>',
    '    <button class="da-tab" data-tab="checklist">Onboarding</button>',
    '    <button class="da-tab" data-tab="site-photos">Job Site Photos</button>',
    '    <button class="da-tab" data-tab="messages">Messages</button>',
    '    <button class="da-tab" data-tab="subcontractors">Subcontractors</button>',
    '  </div></div>',

    '  <div class="da-tab-content active" id="tab-clients">',
    '    <div class="da-client-subtabs">',
    '      <button class="da-client-subtab active" data-status="all">All <span class="da-subtab-count" id="cnt-all"></span></button>',
    '      <button class="da-client-subtab" data-status="active_client">Active <span class="da-subtab-count" id="cnt-active"></span></button>',
    '      <button class="da-client-subtab" data-status="lead">Leads <span class="da-subtab-count" id="cnt-lead"></span></button>',
    '      <button class="da-client-subtab" data-status="no_response">No Response <span class="da-subtab-count" id="cnt-noresponse"></span></button>',
    '      <button class="da-client-subtab" data-status="finished">Finished <span class="da-subtab-count" id="cnt-finished"></span></button>',
    '      <button class="da-client-subtab" data-status="archived">Archived <span class="da-subtab-count" id="cnt-archived"></span></button>',
    '      <button class="da-client-subtab" data-status="stone_sourcing" style="border-left:1px solid var(--border);margin-left:8px">Stone Sourcing <span class="da-subtab-count" id="cnt-stone"></span></button>',
    '    </div>',
    '    <div class="da-toolbar">',
    '      <input class="da-search" type="text" id="daSearch" placeholder="Search by name, email or phone..." />',
    '      <select class="da-filter" id="daFilter">' + filterOptions + '</select>',
    '      <select class="da-filter" id="daCategoryFilter" style="min-width:160px"><option value="">All Categories</option><option value="design_only">Design Only</option><option value="build">Build / Construction</option><option value="full_service">Full Service</option><option value="consultation">Consultation</option></select>',
    '      <div class="da-count" id="daCount"></div>',
    '    </div>',
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
    '          <div class="da-modal-field"><label class="da-field-label">Service Type</label><select class="da-field-input" id="acServiceType"><option value="design_build">Design &amp; Build</option><option value="stone_sourcing">Stone Sourcing &amp; Procurement</option><option value="outdoor_showers">Custom Outdoor Showers</option><option value="both">Both (Design, Build &amp; Stone)</option></select></div>',
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
    '    <div class="da-checklist-wrap"><div class="da-section-title">Client Onboarding</div><div style="font-size:11px;color:var(--muted);margin:-12px 0 16px;letter-spacing:0.05em">Click any item to mark it received from the client.</div><input class="da-checklist-search" type="text" id="daCheckSearch" placeholder="Search clients..." /><div id="daChecklistWrap"></div></div>',
    '  </div>',

    '  <div class="da-tab-content" id="tab-messages">',
    '    <div class="da-messages-wrap"><div class="da-section-title">Client Messages</div><div id="daMsgList"></div></div>',
    '  </div>',

    '  <div class="da-tab-content" id="tab-subcontractors">',
    '    <div class="da-sub-subtabs" id="daSubSubtabs">',
    '      <button class="da-client-subtab active" data-sub-status="all">All <span class="da-subtab-count" id="scnt-all"></span></button>',
    '      <button class="da-client-subtab" data-sub-status="needs_review">Needs Review <span class="da-subtab-count" id="scnt-review"></span></button>',
    '      <button class="da-client-subtab" data-sub-status="compliant">Compliant <span class="da-subtab-count" id="scnt-compliant"></span></button>',
    '      <button class="da-client-subtab" data-sub-status="expiring">Expiring Soon <span class="da-subtab-count" id="scnt-expiring"></span></button>',
    '      <button class="da-client-subtab" data-sub-status="new">New <span class="da-subtab-count" id="scnt-new"></span></button>',
    '    </div>',
    '    <div class="da-toolbar">',
    '      <input class="da-search" type="text" id="daSubSearch" placeholder="Search by company, trade, or contact..." />',
    '      <div class="da-count" id="daSubCount"></div>',
    '    </div>',
    '    <div class="da-cards-wrap" id="daSubCardsWrap"></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // ── STATE ─────────────────────────────────────────────────────────
  var allClients   = [];
  var allMessages = [];
  var allChecklists = {};
  var allNotes = {};
  var allSubs = [];
  var allSubDocs = {};
  var subSubtabStatus = 'all';

  // ── API ───────────────────────────────────────────────────────────
  function getAdminToken() {
    try { return localStorage.getItem('dd_admin_token') || sessionStorage.getItem('dd_admin_token') || SUPABASE_KEY; } catch(e) { return SUPABASE_KEY; }
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

  var searchTimeout;
  var activeSubtab = 'all';

  function applyFilters() {
    var q     = (document.getElementById('daSearch').value || '').toLowerCase();
    var stage = document.getElementById('daFilter').value;
    var cCat  = (document.getElementById('daCategoryFilter') || {}).value || '';
    renderCards(allClients.filter(function(c) {
      var mq  = !q     || (c.full_name||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q) || (c.phone||'').toLowerCase().includes(q) || (c.company_name||'').toLowerCase().includes(q);
      var ms  = !stage || c.status === stage;
      var mcat = !cCat || c.work_category === cCat;
      var mst = true;
      var clientStatus = c.client_status || 'lead';
      if (activeSubtab === 'all') {
        mst = clientStatus !== 'archived' && clientStatus !== 'no_response';
      } else if (activeSubtab === 'stone_sourcing') {
        mst = c.service_type === 'stone_sourcing';
      } else if (activeSubtab === 'active_client') {
        mst = clientStatus === 'active_client';
      } else if (activeSubtab === 'lead') {
        mst = clientStatus === 'lead' || clientStatus === null || clientStatus === undefined || clientStatus === '';
      } else {
        mst = clientStatus === activeSubtab;
      }
      return mq && ms && mcat && mst;
    }));
  }

  function updateSubtabCounts() {
    var counts = { all: 0, active_client: 0, lead: 0, no_response: 0, finished: 0, archived: 0, stone_sourcing: 0 };
    allClients.forEach(function(c) {
      var st = c.client_status;
      if (st === null || st === undefined || st === '') st = 'lead';
      if (counts.hasOwnProperty(st)) counts[st]++;
      else counts.lead++;
      if (st !== 'archived' && st !== 'no_response') counts.all++;
      if (c.service_type === 'stone_sourcing') counts.stone_sourcing++;
    });
    var keyMap = { active_client: 'active', stone_sourcing: 'stone', no_response: 'noresponse' };
    Object.keys(counts).forEach(function(key) {
      var el = document.getElementById('cnt-' + (keyMap[key] || key));
      if (el) el.textContent = counts[key] || '';
    });
    // TEMP DIAGNOSTIC - open browser console (F12) and read the [DD DIAG] line.
    // Delete this try block once your counts make sense.
    try {
      var breakdown = {};
      allClients.forEach(function(c) {
        var s = (c.client_status === null || c.client_status === undefined || c.client_status === '') ? '(blank->lead)' : c.client_status;
        breakdown[s] = (breakdown[s] || 0) + 1;
      });
      console.log('[DD DIAG] loaded:', allClients.length, '| status breakdown:', breakdown, '| tab counts:', counts);
    } catch(e) {}
  }
  document.getElementById('daSearch').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 300);
  });
  document.getElementById('daFilter').addEventListener('change', applyFilters);
  document.getElementById('daCategoryFilter').addEventListener('change', applyFilters);

  document.querySelectorAll('#dd-admin .da-client-subtab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-admin .da-client-subtab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      activeSubtab = tab.dataset.status;
      // Clear search + dropdown filters when switching tabs, so a leftover
      // filter value can never silently empty the list ("All 5 / 0 clients").
      var srch = document.getElementById('daSearch'); if (srch) srch.value = '';
      var pf = document.getElementById('daFilter'); if (pf) pf.value = '';
      var cf = document.getElementById('daCategoryFilter'); if (cf) cf.value = '';
      applyFilters();
    });
  });

  document.querySelectorAll('#dd-admin .da-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
      if (tab.dataset.tab === 'projects') loadProjects();
      if (tab.dataset.tab === 'checklist') loadAllChecklists();
      if (tab.dataset.tab === 'site-photos') { populatePhotoClientFilter(); loadAdminPhotos(''); }
      if (tab.dataset.tab === 'messages') {
        loadMessages();
        apiFetch('/rest/v1/messages?sender=neq.daydream_team&is_read=eq.false', { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ is_read: true }) }).catch(function() {});
        var dot = tab.querySelector('.da-msg-dot'); if (dot) dot.remove();
      }
      if (tab.dataset.tab === 'subcontractors') loadSubcontractors();
    });
  });

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
        try { localStorage.setItem('dd_admin_token', data.access_token); sessionStorage.setItem('dd_admin_token', data.access_token); } catch(e) {}
        document.getElementById('daLoginWrap').style.display = 'none';
        document.getElementById('daDashboard').classList.add('visible');
        loadClients();
        startAdminRealtime();
      } else {
        msg.textContent = 'Incorrect password. Please try again.'; msg.className = 'da-login-msg error';
      }
    } catch(e) { msg.textContent = 'Connection error. Please try again.'; msg.className = 'da-login-msg error'; }
    this.disabled = false; this.textContent = 'Sign In';
  });
  document.getElementById('daPassword').addEventListener('keydown', function(e) { if (e.key === 'Enter') document.getElementById('daLoginBtn').click(); });
  document.getElementById('daLogoutBtn').addEventListener('click', function() {
    stopAdminRealtime();
    try { localStorage.removeItem('dd_admin_token'); sessionStorage.removeItem('dd_admin_token'); } catch(e) {}
    document.getElementById('daDashboard').classList.remove('visible');
    document.getElementById('daLoginWrap').style.display = 'flex';
  });

  try {
    var savedToken = localStorage.getItem('dd_admin_token') || sessionStorage.getItem('dd_admin_token');
    if (savedToken) {
      fetch(SUPABASE_URL + '/auth/v1/user', { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + savedToken } })
        .then(function(r) { return r.json(); })
        .then(function(u) {
          if (u && u.email === ADMIN_EMAIL) {
            document.getElementById('daLoginWrap').style.display = 'none';
            document.getElementById('daDashboard').classList.add('visible');
            loadClients();
            startAdminRealtime();
          } else {
            localStorage.removeItem('dd_admin_token');
            sessionStorage.removeItem('dd_admin_token');
            document.getElementById('daLoginWrap').style.display = 'flex';
          }
        }).catch(function() {
          localStorage.removeItem('dd_admin_token');
          sessionStorage.removeItem('dd_admin_token');
          document.getElementById('daLoginWrap').style.display = 'flex';
        });
    } else {
      document.getElementById('daLoginWrap').style.display = 'flex';
    }
  } catch(e) {
    document.getElementById('daLoginWrap').style.display = 'flex';
  }

  async function loadClients() {
    try {
      var res = await apiFetch('/rest/v1/clients?order=created_at.desc');
      var data = await res.json();
      if (!res.ok) {
        console.error('loadClients API error:', res.status, JSON.stringify(data));
        if (res.status === 401 || res.status === 403) {
          try { localStorage.removeItem('dd_admin_token'); sessionStorage.removeItem('dd_admin_token'); } catch(e) {}
          document.getElementById('daDashboard').classList.remove('visible');
          document.getElementById('daLoginWrap').style.display = 'flex';
        }
        return;
      }
      allClients = Array.isArray(data) ? data : [];
      updateStats();
      updateSubtabCounts();
      applyFilters();
      checkUnreadMessages();
    } catch(e) { console.error('loadClients error:', e.message); }
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

  function renderCards(clients) {
    try {
      var container = document.getElementById('daCardsWrap');
      if (!container) { console.error('daCardsWrap not found'); return; }
      var countEl = document.getElementById('daCount');
      if (countEl) countEl.textContent = clients.length + ' client' + (clients.length !== 1 ? 's' : '');
      if (!clients.length) { container.innerHTML = '<div class="da-empty">No clients found</div>'; return; }

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
        var isStone = c.service_type === 'stone_sourcing' || c.service_type === 'outdoor_showers' || c.service_type === 'both';
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

        var statusBadgeInline = '';
        if (c.client_status && c.client_status !== 'active_client') {
          var csMap = {
            'lead': '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #9e7b50;color:#9e7b50;background:rgba(158,123,80,0.08);margin-left:6px;vertical-align:middle">Lead</span>',
            'no_response': '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #c07a6a;color:#c07a6a;background:rgba(192,122,106,0.08);margin-left:6px;vertical-align:middle">No Response</span>',
            'archived': '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #8a8680;color:#8a8680;background:rgba(138,134,128,0.08);margin-left:6px;vertical-align:middle">Archived</span>'
          };
          statusBadgeInline = csMap[c.client_status] || '';
        }

        var constructionOrStoneHtml = (c.service_type === 'stone_sourcing')
          ? '    <div class="da-action-row"><select class="da-select" id="stonesel-' + c.id + '">' + STONE_STAGES.map(function(ss) { return '<option value="' + ss.value + '"' + (c.stone_stage === ss.value ? ' selected' : '') + '>' + ss.label + '</option>'; }).join('') + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'stone_stage\', \'stonesel-' + c.id + '\')">Update</button></div>'
          : '    <div class="da-action-row"><select class="da-select" id="consel-' + c.id + '">' + conOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'construction_stage\', \'consel-' + c.id + '\')">Update</button></div>';

        return '<div class="da-client-card' + (c.client_status === 'archived' || c.client_status === 'no_response' ? ' archived' : '') + '" id="card-' + c.id + '">'
          + '<div class="da-card-top" onclick="window._toggleCard(\'' + c.id + '\')">'
          + '  <div class="da-card-left"><div class="da-card-avatar">' + s(initials(c.full_name)) + '</div>'
          + '  <div><div class="da-card-name">' + s(c.company_name || c.full_name || 'Unknown') + '<span class="da-role-badge ' + (isContr ? 'contractor' : 'client') + '">' + (isContr ? 'Contractor' : 'Client') + '</span>' + (isStone ? '<span style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #7a9eb8;color:#7a9eb8;background:rgba(122,158,184,0.08);margin-left:6px;vertical-align:middle">Stone</span>' : '') + statusBadgeInline + '</div>'
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
          + constructionOrStoneHtml
          + '    <div class="da-section-divider">Client Status</div>'
          + '    <div class="da-action-row"><div class="da-action-label">Lead Status</div><select class="da-select" id="cstatsel-' + c.id + '"><option value="">— Not Set —</option><option value="active_client"' + (c.client_status==='active_client'?' selected':'') + '>Active Client</option><option value="lead"' + (c.client_status==='lead'?' selected':'') + '>Lead / Not Converted</option><option value="no_response"' + (c.client_status==='no_response'?' selected':'') + '>No Response / Ghosted</option><option value="finished"' + (c.client_status==='finished'?' selected':'') + '>Finished</option><option value="archived"' + (c.client_status==='archived'?' selected':'') + '>Archived</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_status\', \'cstatsel-' + c.id + '\')">Update</button></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Contractor</div><select class="da-select" id="contrsel-' + c.id + '"><option value="false"' + (!c.is_contractor?' selected':'') + '>No — Homeowner / Client</option><option value="true"' + (c.is_contractor?' selected':'') + '>Yes — Contractor</option></select><button class="da-update-btn" onclick="window._updateContractor(\'' + c.id + '\', \'contrsel-' + c.id + '\')">Update</button></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Category</div><select class="da-select" id="catsel-' + c.id + '"><option value="">— Not Set —</option><option value="design_only"' + (c.work_category==='design_only'?' selected':'') + '>Design Only</option><option value="build"' + (c.work_category==='build'?' selected':'') + '>Build / Construction</option><option value="full_service"' + (c.work_category==='full_service'?' selected':'') + '>Full Service</option><option value="consultation"' + (c.work_category==='consultation'?' selected':'') + '>Consultation</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'work_category\', \'catsel-' + c.id + '\')">Update</button></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Relationship</div><select class="da-select" id="relsel-' + c.id + '"><option value="">— Not Set —</option><option value="owner"' + (c.client_relationship === 'owner' ? ' selected' : '') + '>Owner</option><option value="contractor"' + (c.client_relationship === 'contractor' ? ' selected' : '') + '>Contractor</option><option value="builder"' + (c.client_relationship === 'builder' ? ' selected' : '') + '>Builder</option><option value="designer"' + (c.client_relationship === 'designer' ? ' selected' : '') + '>Designer / Architect</option><option value="property_manager"' + (c.client_relationship === 'property_manager' ? ' selected' : '') + '>Property Manager</option></select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'client_relationship\', \'relsel-' + c.id + '\')" >Update</button></div>'
          + '    <div class="da-section-divider">Contract &amp; Payment</div>'
          + '    <div class="da-action-row"><div class="da-action-label">Contract</div><select class="da-select" id="contractsel-' + c.id + '">' + contractOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'contract_status\', \'contractsel-' + c.id + '\')">Update</button></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Payment</div><select class="da-select" id="paymentsel-' + c.id + '">' + paymentOpts + '</select><button class="da-update-btn" onclick="window._updateField(\'' + c.id + '\', \'payment_status\', \'paymentsel-' + c.id + '\')">Update</button></div>'
          + '    <div class="da-section-divider">Client Drive Links</div>'
          + (isStone ? '    <div style="font-size:10px;color:var(--gold);background:var(--gold-dim);border:1px solid var(--gold);padding:8px 12px;margin-bottom:8px;letter-spacing:0.05em">&#9671; Use the <strong>Stone Atelier Drive</strong> for this client\'s folders.</div>' : '')
          + '    <div class="da-action-row"><div class="da-action-label">Design</div><input class="da-text-input" id="dlink-design-' + c.id + '" type="text" placeholder="Google Drive link..." value="' + s(c.drive_design_link || '') + '" /></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Permit</div><input class="da-text-input" id="dlink-permit-' + c.id + '" type="text" placeholder="Google Drive link..." value="' + s(c.drive_permit_link || '') + '" /></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Construction</div><input class="da-text-input" id="dlink-construction-' + c.id + '" type="text" placeholder="Google Drive link..." value="' + s(c.drive_construction_link || '') + '" /></div>'
          + '    <div class="da-action-row"><button class="da-update-btn" onclick="window._updateDriveLinks(\'' + c.id + '\')">Save Drive Links</button></div>'
          + '    <div class="da-section-divider">Services</div>'
          + '    <div class="da-services-wrap" id="services-' + c.id + '"><div style="font-size:11px;color:var(--muted);padding:8px 0">Loading services...</div></div>'
          + '    <div class="da-section-divider">Stone Orders' + (isStone ? '' : ' <span style="font-size:9px;color:var(--muted);letter-spacing:0.1em;text-transform:none">(stone / shower service type)</span>') + '</div>'
          + '    <div id="admin-orders-' + c.id + '"><div style="font-size:11px;color:var(--muted);padding:8px 0">Click to load orders...</div></div>'
          + '    <button class="da-update-btn" style="margin-top:6px" onclick="window._loadAdminOrders(\'' + c.id + '\')">Load Orders</button>'
          + '    <button class="da-update-btn" style="margin-top:6px;margin-left:8px;background:var(--surface);color:var(--gold);border:1px solid var(--gold)" onclick="window._showAdminNewOrder(\'' + c.id + '\')">+ New Order</button>'
          + '    <div id="admin-new-order-form-' + c.id + '" style="display:none;margin-top:12px;background:var(--surface-2);border:1px solid var(--border);padding:16px">'
          + '      <div style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:12px">Create Order for Client</div>'
          + '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'
          + '        <div><div class="da-field-label" style="margin-bottom:4px">Order Name</div><input class="da-text-input" id="ano-name-' + c.id + '" placeholder="e.g. Smith Residence Pool Coping" style="width:100%" /></div>'
          + '        <div><div class="da-field-label" style="margin-bottom:4px">Stone Type</div><select class="da-select" id="ano-stone-' + c.id + '"><option value="">Select...</option><option>Limestone</option><option>Sandstone</option><option>Travertine</option><option>Granite</option><option>Marble</option><option>Porcelain</option></select></div>'
          + '        <div><div class="da-field-label" style="margin-bottom:4px">Finish</div><input class="da-text-input" id="ano-finish-' + c.id + '" placeholder="e.g. Sandblasted Brushed" style="width:100%" /></div>'
          + '        <div><div class="da-field-label" style="margin-bottom:4px">Quantity Estimate</div><input class="da-text-input" id="ano-qty-' + c.id + '" placeholder="e.g. 400 sq ft" style="width:100%" /></div>'
          + '        <div style="grid-column:1/-1"><div class="da-field-label" style="margin-bottom:4px">Delivery Address</div><input class="da-text-input" id="ano-addr-' + c.id + '" placeholder="123 Main St, Atlanta GA" style="width:100%" /></div>'
          + '        <div style="grid-column:1/-1"><div class="da-field-label" style="margin-bottom:4px">Intended Use</div><input class="da-text-input" id="ano-use-' + c.id + '" placeholder="Pool coping, shower surround, flooring..." style="width:100%" /></div>'
          + '        <div style="grid-column:1/-1"><div class="da-field-label" style="margin-bottom:4px">Notes</div><textarea class="da-note-textarea" id="ano-notes-' + c.id + '" style="min-height:60px;border-top:1px solid var(--border)" placeholder="Any additional details..."></textarea></div>'
          + '      </div>'
          + '      <div style="display:flex;gap:8px">'
          + '        <button class="da-update-btn" onclick="window._submitAdminNewOrder(\'' + c.id + '\')">Create Order</button>'
          + '        <button class="da-update-btn" style="background:var(--surface);color:var(--muted);border:1px solid var(--border)" onclick="document.getElementById(\'admin-new-order-form-' + c.id + '\').style.display=\'none\'">Cancel</button>'
          + '      </div>'
          + '      <div id="ano-msg-' + c.id + '" style="font-size:11px;margin-top:8px;min-height:16px"></div>'
          + '    </div>'
          + '    <div class="da-section-divider">Admin Notes</div>'
          + '    <div class="da-notes-log" id="notes-log-' + c.id + '"><div class="da-notes-log-empty">No notes yet</div></div>'
          + '    <div class="da-notes-new"><textarea class="da-note-textarea" id="note-new-' + c.id + '" placeholder="Write a note..."></textarea><button class="da-update-btn" style="margin-top:8px;width:100%" id="note-add-btn-' + c.id + '" onclick="window._saveNewNote(\'' + c.id + '\')">Add Note</button></div>'
          + '    <div class="da-action-row" style="margin-top:4px;gap:8px">'
          + '      <a class="da-email-link" href="mailto:' + s(c.email || '') + '">Email Client</a>'
          + '      <button class="da-email-link" style="cursor:pointer;background:none" id="resend-' + c.id + '" onclick="window._resendPortalAccess(\'' + c.id + '\', \'' + s(c.email || '') + '\', \'' + s(c.full_name || '') + '\', this)">Resend Portal Link</button>'
          + '      <button class="da-email-link" style="cursor:pointer;background:none" onclick="window._openAddProjectForClient(\'' + c.id + '\', \'' + s(c.full_name || '') + '\')">+ Add Project</button>'
          + '    </div>'
          + '  </div>'
          + '</div>'
          + '</div>';
      }).join('');
    } catch(e) {
      console.error('renderCards error:', e.message, e.stack);
      var errContainer = document.getElementById('daCardsWrap');
      if (errContainer) errContainer.innerHTML = '<div class="da-empty">Error rendering clients.</div>';
    }
  }

  window._toggleCard = function(id) {
    var det = document.getElementById('det-' + id);
    var exp = document.getElementById('exp-' + id);
    if (!det || !exp) return;
    if (det.classList.contains('visible')) { det.classList.remove('visible'); exp.classList.remove('open'); }
    else { det.classList.add('visible'); exp.classList.add('open'); loadClientServices(id); window._loadNotesLog(id); }
  };

  window._updateField = async function(id, field, selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var val = sel.value;
    var row = sel.closest('.da-action-row');
    var btn = row ? row.querySelector('.da-update-btn') : sel.nextElementSibling;
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var body = {}; body[field] = val || null;
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify(body) });
      if (!res.ok) {
        console.error('_updateField error:', await res.text());
        if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2500); }
        return;
      }
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c[field] = val;
      if (field === 'status') {
        var stage = getPipelineStage(val);
        var card = document.getElementById('card-' + id);
        if (card) { var pill = card.querySelector('.da-stage-pill'); if (pill) { pill.textContent = stage.label; pill.style.color = stage.color; pill.style.borderColor = stage.color; pill.style.background = stage.color + '18'; } }
        updateStats();
      }
      if (field === 'client_status') {
        updateSubtabCounts();
        var card2 = document.getElementById('card-' + id);
        if (card2) { card2.classList.toggle('archived', val === 'archived' || val === 'no_response'); }
        var nameDiv = card2 ? card2.querySelector('.da-card-name') : null;
        if (nameDiv) {
          var existingBadge = nameDiv.querySelector('.da-status-badge-inline');
          if (existingBadge) existingBadge.remove();
          if (val === 'lead') {
            nameDiv.insertAdjacentHTML('beforeend', '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #9e7b50;color:#9e7b50;background:rgba(158,123,80,0.08);margin-left:6px;vertical-align:middle">Lead</span>');
          } else if (val === 'no_response') {
            nameDiv.insertAdjacentHTML('beforeend', '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #c07a6a;color:#c07a6a;background:rgba(192,122,106,0.08);margin-left:6px;vertical-align:middle">No Response</span>');
          } else if (val === 'archived') {
            nameDiv.insertAdjacentHTML('beforeend', '<span class="da-status-badge-inline" style="font-size:7px;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border:1px solid #8a8680;color:#8a8680;background:rgba(138,134,128,0.08);margin-left:6px;vertical-align:middle">Archived</span>');
          }
        }
        var shouldHide = false;
        if (activeSubtab === 'all' && (val === 'archived' || val === 'no_response')) shouldHide = true;
        else if (activeSubtab !== 'all' && activeSubtab !== 'stone_sourcing' && val !== activeSubtab) shouldHide = true;
        if (shouldHide && card2) {
          card2.style.transition = 'opacity 0.4s';
          card2.style.opacity = '0';
          setTimeout(function() { applyFilters(); }, 450);
        }
      }
      if (btn) { btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2000); }
    } catch(e) {
      console.error('_updateField exception:', e);
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
    } catch(e) { console.error('_updateDriveLinks exception:', e); }
  };

  window._updateProjType = async function(id) {
    var val = (document.getElementById('ptypesel-' + id) || {}).value;
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ project_type_category: val || null }) });
      var btn = document.getElementById('ptypebtn-' + id);
      if (btn) { btn.textContent = res.ok ? 'Saved ✓' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update'; btn.style.background='var(--gold)';} }, 2000); }
    } catch(e) { console.error('_updateProjType exception:', e); }
  };

  window._updateContractor = async function(id, selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var newState = sel.value === 'true';
    var row = sel.closest('.da-action-row');
    var btn = row ? row.querySelector('.da-update-btn') : null;
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ is_contractor: newState }) });
      if (!res.ok) {
        if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2500); }
        return;
      }
      var c = allClients.find(function(x) { return x.id === id; });
      if (c) c.is_contractor = newState;
      var badge = document.querySelector('#card-' + id + ' .da-role-badge');
      if (badge) { badge.textContent = newState ? 'Contractor' : 'Client'; badge.className = 'da-role-badge ' + (newState ? 'contractor' : 'client'); }
      if (btn) { btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2000); }
    } catch(e) {
      if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; setTimeout(function() { if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2500); }
    }
  };

  async function loadClientServices(clientId) {
    var wrap = document.getElementById('services-' + clientId);
    if (!wrap) return;
    wrap.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:8px 0">Loading...</div>';
    try {
      var res = await apiFetch('/rest/v1/client_services?client_id=eq.' + clientId + '&order=created_at.asc');
      var services = await res.json() || [];
      renderClientServices(clientId, services);
    } catch(e) { wrap.innerHTML = '<div style="font-size:11px;color:var(--error);padding:8px 0">Error loading services</div>'; }
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
    if (body) { var isOpen = body.style.display === 'block'; body.style.display = isOpen ? 'none' : 'block'; if (label) label.textContent = isOpen ? '+ Add Services' : '− Close'; }
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
        await apiFetch('/rest/v1/client_services', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: clientId, service_name: toAdd[i].label, service_key: toAdd[i].key, status: 'pending' }) });
      }
      if (customInput) customInput.value = '';
      await loadClientServices(clientId);
    } catch(e) { console.error('_addSelectedServices:', e); }
  };

  window._updateServiceStatus = async function(serviceId, status) {
    try { await apiFetch('/rest/v1/client_services?id=eq.' + serviceId, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ status: status }) }); } catch(e) {}
  };

  window._removeService = async function(serviceId, clientId) {
    try { var res = await apiFetch('/rest/v1/client_services?id=eq.' + serviceId, { method: 'DELETE' }); if (res.ok) await loadClientServices(clientId); } catch(e) {}
  };

  window._saveNewNote = async function(id) {
    var textarea = document.getElementById('note-new-' + id);
    if (!textarea || !textarea.value.trim()) return;
    var noteText = textarea.value.trim();
    var btn = document.getElementById('note-add-btn-' + id);
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var res = await apiFetch('/rest/v1/admin_notes', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: id, note: noteText }) });
      if (res.ok) { textarea.value = ''; if (btn) { btn.textContent = 'Note Added!'; btn.style.background = 'var(--success)'; } window._loadNotesLog(id); }
    } catch(e) { console.error('_saveNewNote exception:', e); }
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
        return '<div class="da-note-entry"><div class="da-note-entry-meta">' + dateStr + '</div><div class="da-note-entry-text">' + s(n.note) + '</div></div>';
      }).join('');
    } catch(e) { log.innerHTML = '<div class="da-notes-log-empty">Could not load notes</div>'; }
  };

  // ── STONE ORDERS (ADMIN) ──────────────────────────────────────────
  var STONE_TIMELINE_ADMIN = [
    { value: 'inquiry_submitted',     label: 'Inquiry Submitted' },
    { value: 'discussion_call',       label: 'Project Discussion Call' },
    { value: 'designs_received',      label: 'Designs Received' },
    { value: 'model_started',         label: '3D Model Started' },
    { value: 'model_completed',       label: '3D Model Completed' },
    { value: 'takeoffs_complete',     label: 'Take-offs Complete' },
    { value: 'proposal_sent',         label: 'Proposal Sent' },
    { value: 'proposal_accepted',     label: 'Proposal Accepted' },
    { value: 'contract_signed',       label: 'Contract Signed' },
    { value: 'payment_sent',          label: 'Payment Sent' },
    { value: 'payment_received',      label: 'Payment Received' },
    { value: 'stone_purchased',       label: 'Stone Purchased' },
    { value: 'stone_ordered',         label: 'Stone Ordered' },
    { value: 'in_transit',            label: 'In Transit' },
    { value: 'arrived_at_port',       label: 'Arrived at Port' },
    { value: 'delivered_to_job_site', label: 'Delivered to Job Site' }
  ];
  var CONTRACT_STAGES_ADMIN = [
    { value: 'not_sent',         label: 'Not Yet Sent' },
    { value: 'sent',             label: 'Sent — Awaiting Signature' },
    { value: 'signed',           label: 'Signed' }
  ];
  var PAYMENT_STAGES_ADMIN = [
    { value: 'not_sent',          label: 'Invoice Not Yet Sent' },
    { value: 'invoice_sent',      label: 'Invoice Sent — Awaiting Payment' },
    { value: 'deposit_paid',      label: 'Deposit Paid — Balance Due' },
    { value: 'partially_paid',    label: 'Partially Paid' },
    { value: 'payment_complete',  label: 'Payment Complete' }
  ];

  window._loadAdminOrders = async function(clientId) {
    var container = document.getElementById('admin-orders-' + clientId);
    if (!container) return;
    container.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:8px 0">Loading...</div>';
    try {
      var res = await apiFetch('/rest/v1/stone_orders?client_id=eq.' + clientId + '&order=created_at.desc');
      var orders = await res.json() || [];
      if (!orders.length) { container.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:8px 0">No orders yet. Click + New Order to create one.</div>'; return; }
      container.innerHTML = orders.map(function(order) {
        var stageOpts = STONE_TIMELINE_ADMIN.map(function(st) { return '<option value="' + st.value + '"' + (order.stage === st.value ? ' selected' : '') + '>' + st.label + '</option>'; }).join('');
        var contractOpts = CONTRACT_STAGES_ADMIN.map(function(cs) { return '<option value="' + cs.value + '"' + (order.contract_status === cs.value ? ' selected' : '') + '>' + cs.label + '</option>'; }).join('');
        var paymentOpts  = PAYMENT_STAGES_ADMIN.map(function(ps) { return '<option value="' + ps.value + '"' + (order.payment_status === ps.value ? ' selected' : '') + '>' + ps.label + '</option>'; }).join('');
        var stoneOpts = ['Limestone','Sandstone','Travertine','Granite','Marble','Porcelain'].map(function(t) { return '<option value="' + t + '"' + (order.stone_type === t ? ' selected' : '') + '>' + t + '</option>'; }).join('');
        return '<div style="border:1px solid var(--border);background:var(--surface);margin-bottom:10px">'
          + '<div style="padding:12px 16px;background:var(--surface-2);border-bottom:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:space-between" onclick="window._toggleAdminOrder(\'' + order.id + '\')">'
          + '  <div><div style="font-size:13px;font-weight:400;color:var(--text)">' + s(order.order_name || 'Untitled Order') + '</div>'
          + '  <div style="font-size:10px;color:var(--muted);margin-top:2px">' + s(order.stone_type || '') + (order.stone_type && order.intended_use ? ' · ' : '') + s(order.intended_use || '') + '</div></div>'
          + '  <div style="font-size:8px;letter-spacing:0.18em;text-transform:uppercase;padding:3px 10px;border:1px solid var(--gold);color:var(--gold)">' + s((STONE_TIMELINE_ADMIN.find(function(t){return t.value===order.stage;})||{label:order.stage||'—'}).label) + '</div>'
          + '</div>'
          + '<div id="admin-order-det-' + order.id + '" style="display:none;padding:14px 16px">'

          // ── EDIT ORDER DETAILS ──
          + '  <div style="font-size:8px;letter-spacing:0.32em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--border)">Edit Order Details</div>'
          + '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">'
          + '    <div style="grid-column:1/-1"><div class="da-field-label" style="margin-bottom:4px">Order Name</div><input class="da-text-input" id="aord-name-' + order.id + '" value="' + s(order.order_name||'') + '" placeholder="Order name" style="width:100%" /></div>'
          + '    <div><div class="da-field-label" style="margin-bottom:4px">Stone Type</div><select class="da-select" id="aord-stone-' + order.id + '"><option value="">Select...</option>' + stoneOpts + '</select></div>'
          + '    <div><div class="da-field-label" style="margin-bottom:4px">Finish</div><input class="da-text-input" id="aord-finish-' + order.id + '" value="' + s(order.finish||'') + '" placeholder="e.g. Sandblasted Brushed" style="width:100%" /></div>'
          + '    <div><div class="da-field-label" style="margin-bottom:4px">Quantity Estimate</div><input class="da-text-input" id="aord-qty-' + order.id + '" value="' + s(order.quantity_estimate||'') + '" placeholder="e.g. 400 sq ft" style="width:100%" /></div>'
          + '    <div><div class="da-field-label" style="margin-bottom:4px">Intended Use</div><input class="da-text-input" id="aord-use-' + order.id + '" value="' + s(order.intended_use||'') + '" placeholder="Pool coping, flooring..." style="width:100%" /></div>'
          + '    <div style="grid-column:1/-1"><div class="da-field-label" style="margin-bottom:4px">Delivery Address</div><input class="da-text-input" id="aord-addr-' + order.id + '" value="' + s(order.delivery_address||'') + '" placeholder="123 Main St, Atlanta GA" style="width:100%" /></div>'
          + '    <div style="grid-column:1/-1"><div class="da-field-label" style="margin-bottom:4px">Notes</div><textarea class="da-note-textarea" id="aord-notes-' + order.id + '" style="min-height:60px;border-top:1px solid var(--border)">' + s(order.notes||'') + '</textarea></div>'
          + '  </div>'
          + '  <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
          + '    <button class="da-update-btn" id="aord-save-btn-' + order.id + '" onclick="window._saveOrderDetails(\'' + order.id + '\',\'' + clientId + '\')">Save Details</button>'
          + '    <div id="aord-save-msg-' + order.id + '" style="font-size:11px;min-height:16px"></div>'
          + '  </div>'

          // ── STATUS CONTROLS ──
          + '  <div style="font-size:8px;letter-spacing:0.32em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--border)">Status</div>'
          + '  <div style="display:flex;flex-direction:column;gap:8px">'
          + '    <div class="da-action-row"><div class="da-action-label">Stage</div><select class="da-select" id="aord-stage-' + order.id + '">' + stageOpts + '</select><button class="da-update-btn" onclick="window._updateOrderField(\'' + order.id + '\',\'stage\',\'aord-stage-' + order.id + '\',\'' + clientId + '\')">Update</button></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Contract</div><select class="da-select" id="aord-contract-' + order.id + '">' + contractOpts + '</select><button class="da-update-btn" onclick="window._updateOrderField(\'' + order.id + '\',\'contract_status\',\'aord-contract-' + order.id + '\',\'' + clientId + '\')">Update</button></div>'
          + '    <div class="da-action-row"><div class="da-action-label">Payment</div><select class="da-select" id="aord-payment-' + order.id + '">' + paymentOpts + '</select><button class="da-update-btn" onclick="window._updateOrderField(\'' + order.id + '\',\'payment_status\',\'aord-payment-' + order.id + '\',\'' + clientId + '\')">Update</button></div>'
          + '  </div>'
          + '</div>'
          + '</div>';
      }).join('');
    } catch(e) { container.innerHTML = '<div style="font-size:11px;color:var(--error);padding:8px 0">Error loading orders</div>'; }
  };

  window._toggleAdminOrder = function(orderId) {
    var det = document.getElementById('admin-order-det-' + orderId);
    if (det) det.style.display = det.style.display === 'none' ? 'block' : 'none';
  };

  window._saveOrderDetails = async function(orderId, clientId) {
    var btn = document.getElementById('aord-save-btn-' + orderId);
    var msg = document.getElementById('aord-save-msg-' + orderId);
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    var name   = (document.getElementById('aord-name-'   + orderId)||{}).value||'';
    var stone  = (document.getElementById('aord-stone-'  + orderId)||{}).value||'';
    var finish = (document.getElementById('aord-finish-' + orderId)||{}).value||'';
    var qty    = (document.getElementById('aord-qty-'    + orderId)||{}).value||'';
    var use    = (document.getElementById('aord-use-'    + orderId)||{}).value||'';
    var addr   = (document.getElementById('aord-addr-'   + orderId)||{}).value||'';
    var notes  = (document.getElementById('aord-notes-'  + orderId)||{}).value||'';
    try {
      var res = await apiFetch('/rest/v1/stone_orders?id=eq.' + orderId, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          order_name:        name.trim()   || null,
          stone_type:        stone         || null,
          finish:            finish.trim() || null,
          quantity_estimate: qty.trim()    || null,
          intended_use:      use.trim()    || null,
          delivery_address:  addr.trim()   || null,
          notes:             notes.trim()  || null
        })
      });
      if (res.ok) {
        if (msg) { msg.textContent = 'Saved'; msg.style.color = 'var(--success)'; }
        if (btn) { btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)'; }
        // refresh the order list so the header card updates
        setTimeout(function() {
          if (btn) { btn.textContent = 'Save Details'; btn.style.background = 'var(--gold)'; btn.disabled = false; }
          if (msg) msg.textContent = '';
          window._loadAdminOrders(clientId);
        }, 1800);
      } else {
        if (msg) { msg.textContent = 'Error saving.'; msg.style.color = 'var(--error)'; }
        if (btn) { btn.textContent = 'Save Details'; btn.style.background = 'var(--gold)'; btn.disabled = false; }
      }
    } catch(e) {
      if (msg) { msg.textContent = 'Something went wrong.'; msg.style.color = 'var(--error)'; }
      if (btn) { btn.textContent = 'Save Details'; btn.style.background = 'var(--gold)'; btn.disabled = false; }
    }
  };

  window._updateOrderField = async function(orderId, field, selectId, clientId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var val = sel.value;
    var row = sel.closest('.da-action-row');
    var btn = row ? row.querySelector('.da-update-btn') : null;
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var body = {}; body[field] = val || null;
      var res = await apiFetch('/rest/v1/stone_orders?id=eq.' + orderId, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify(body) });
      if (btn) { btn.textContent = res.ok ? 'Saved ✓' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function(){ if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2000); }
      if (res.ok && field === 'stage') {
        var stageLabel = (STONE_TIMELINE_ADMIN.find(function(t){return t.value===val;})||{label:val}).label;
        showAdminToast('Stage updated: ' + stageLabel);
        window._loadAdminOrders(clientId);
      }
    } catch(e) { if (btn) { btn.textContent = 'Error'; btn.style.background = 'var(--error)'; setTimeout(function(){ if(btn){btn.textContent='Update';btn.style.background='var(--gold)';btn.disabled=false;} }, 2500); } }
  };

  window._showAdminNewOrder = function(clientId) {
    var form = document.getElementById('admin-new-order-form-' + clientId);
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
  };

  window._submitAdminNewOrder = async function(clientId) {
    var name   = (document.getElementById('ano-name-'   + clientId)||{}).value||'';
    var stone  = (document.getElementById('ano-stone-'  + clientId)||{}).value||'';
    var finish = (document.getElementById('ano-finish-' + clientId)||{}).value||'';
    var qty    = (document.getElementById('ano-qty-'    + clientId)||{}).value||'';
    var addr   = (document.getElementById('ano-addr-'   + clientId)||{}).value||'';
    var use    = (document.getElementById('ano-use-'    + clientId)||{}).value||'';
    var notes  = (document.getElementById('ano-notes-'  + clientId)||{}).value||'';
    var msg    = document.getElementById('ano-msg-' + clientId);
    try {
      var res = await apiFetch('/rest/v1/stone_orders', {
        method: 'POST',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({ client_id: clientId, order_name: name.trim()||'New Order', stone_type: stone||null, finish: finish.trim()||null, quantity_estimate: qty.trim()||null, delivery_address: addr.trim()||null, intended_use: use.trim()||null, notes: notes.trim()||null, stage: 'inquiry_submitted', contract_status: 'not_sent', payment_status: 'not_sent' })
      });
      if (res.ok) {
        if (msg) { msg.textContent = 'Order created.'; msg.style.color = 'var(--success)'; }
        ['ano-name-','ano-stone-','ano-finish-','ano-qty-','ano-addr-','ano-use-','ano-notes-'].forEach(function(pre) { var el = document.getElementById(pre+clientId); if(el) el.value=''; });
        setTimeout(function() {
          var form = document.getElementById('admin-new-order-form-' + clientId);
          if (form) form.style.display = 'none';
          if (msg) msg.textContent = '';
          window._loadAdminOrders(clientId);
        }, 1200);
      } else {
        if (msg) { msg.textContent = 'Error creating order.'; msg.style.color = 'var(--error)'; }
      }
    } catch(e) { if (msg) { msg.textContent = 'Something went wrong.'; msg.style.color = 'var(--error)'; } }
  };

  window._saveContactInfo = async function(id) {
    var name       = (document.getElementById('edit-name-' + id) || {}).value || '';
    var phone      = (document.getElementById('edit-phone-' + id) || {}).value || '';
    var street     = (document.getElementById('edit-street-' + id) || {}).value || '';
    var investment = (document.getElementById('edit-investment-' + id) || {}).value || '';
    var notes      = (document.getElementById('edit-notes-' + id) || {}).value || '';
    var btn = document.querySelector('[onclick*="_saveContactInfo(\'' + id + '\')"]');
    if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }
    try {
      var res = await apiFetch('/rest/v1/clients?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ full_name: name||null, phone: phone||null, street: street||null, investment: investment||null, notes: notes||null }) });
      if (res.ok) {
        var c = allClients.find(function(x) { return x.id === id; });
        if (c) { c.full_name = name; c.phone = phone; c.street = street; c.investment = investment; c.notes = notes; }
        if (btn) { btn.textContent = 'Saved ✓'; btn.style.background = 'var(--success)'; }
      }
    } catch(e) { console.error('_saveContactInfo exception:', e); }
    setTimeout(function() { if(btn){ btn.textContent = 'Save Contact Info'; btn.style.background = 'var(--gold)'; btn.disabled = false; } }, 2500);
  };

  window._resendPortalAccess = async function(id, email, name, btn) {
    email = (email || '').replace(/&amp;/g,'&').replace(/&#039;/g,"'").replace(/&quot;/g,'"').trim();
    name  = (name  || '').replace(/&amp;/g,'&').replace(/&#039;/g,"'").replace(/&quot;/g,'"').trim();
    if (!email) { alert('No email address on file for this client.'); return; }
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    try {
      var res = await fetch(SUPABASE_URL + '/functions/v1/invite-client', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SUPABASE_KEY, 'apikey': SUPABASE_KEY }, body: JSON.stringify({ email: email.toLowerCase().trim(), full_name: name }) });
      var data = await res.json();
      if (btn) { btn.textContent = data.success ? 'Link Sent!' : 'Error'; btn.style.color = data.success ? 'var(--success)' : 'var(--error)'; }
    } catch(e) { if (btn) { btn.textContent = 'Error'; btn.style.color = 'var(--error)'; } }
    setTimeout(function() { if(btn){btn.textContent='Resend Portal Link'; btn.style.color='var(--gold)'; btn.disabled=false;} }, 3000);
  };

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
      var serviceType = (document.getElementById('acServiceType') || {}).value || 'design_build';
      var res = await apiFetch('/rest/v1/clients', { method: 'POST', headers: { 'Prefer': 'return=representation' }, body: JSON.stringify({ full_name: name, email: email, phone: phone||null, company_name: company||null, investment: investment||null, referral: referral||null, street: street||null, notes: notes||null, status: 'client_inquiry_made', client_stage: 'inquiry_submitted', is_contractor: isContr, service_type: serviceType }) });
      if (res.ok) {
        var newClient = await res.json();
        var newClientId = newClient && newClient[0] ? newClient[0].id : null;
        if (newClientId && selectedServices.length) {
          for (var si = 0; si < selectedServices.length; si++) {
            await apiFetch('/rest/v1/client_services', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: newClientId, service_name: selectedServices[si].label, service_key: selectedServices[si].key, status: 'pending' }) }).catch(function(){});
          }
        }
        if (document.getElementById('acSendEmail').checked && email) {
          try {
            await fetch(SUPABASE_URL + '/functions/v1/invite-client', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SUPABASE_KEY }, body: JSON.stringify({ email: email, full_name: name }) });
            msg.textContent = 'Client added and welcome email sent!';
          } catch(e) { msg.textContent = 'Client added! (Email send failed)'; }
        } else { msg.textContent = 'Client added successfully!'; }
        msg.className = 'da-modal-msg success';
        ['acName','acEmail','acPhone','acCompany','acInvestment','acStreet','acNotes'].forEach(function(fid) { var el = document.getElementById(fid); if (el) el.value = ''; });
        if (document.getElementById('acCustomService')) document.getElementById('acCustomService').value = '';
        document.getElementById('acContractor').checked = false;
        document.getElementById('acReferral').value = '';
        var svcSel = document.getElementById('acServicesSelect');
        if (svcSel) Array.from(svcSel.options).forEach(function(o) { o.selected = false; });
        document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(tc) { tc.classList.remove('active'); });
        document.querySelector('[data-tab="clients"]').classList.add('active');
        document.getElementById('tab-clients').classList.add('active');
        msg.textContent = '';
        await loadClients();
      } else { var et = await res.text(); msg.textContent = 'Error: ' + et.substring(0,100); msg.className = 'da-modal-msg error'; }
    } catch(e) { msg.textContent = 'Something went wrong.'; msg.className = 'da-modal-msg error'; }
    this.disabled = false; this.textContent = 'Add Client';
  });

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
    if (sel) { sel.onchange = function() { var opt = sel.options[sel.selectedIndex]; var nameInput = document.getElementById('apClientName'); if (nameInput && opt) nameInput.value = opt.dataset.name || ''; }; }
  };

  window._hideAddProjectForm = function() { var form = document.getElementById('daAddProjectForm'); if (form) form.style.display = 'none'; };

  window._openAddProjectForClient = function(clientId, clientName) {
    document.querySelectorAll('#dd-admin .da-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('#dd-admin .da-tab-content').forEach(function(c) { c.classList.remove('active'); });
    document.querySelector('[data-tab="projects"]').classList.add('active');
    document.getElementById('tab-projects').classList.add('active');
    window._showAddProjectForm();
    setTimeout(function() {
      var sel = document.getElementById('apClientId'); if (sel) sel.value = clientId;
      var nameInput = document.getElementById('apClientName'); if (nameInput && clientName) nameInput.value = clientName;
    }, 150);
    loadProjects();
  };

  window._submitAddProject = async function() {
    var clientId   = document.getElementById('apClientId').value;
    var clientName = (document.getElementById('apClientName') || {}).value ? document.getElementById('apClientName').value.trim() : '';
    var address    = document.getElementById('apAddress').value.trim();
    var name       = document.getElementById('apProjectName').value.trim();
    var type       = document.getElementById('apProjectType').value;
    var anything   = (document.getElementById('apAnything') || {}).value ? document.getElementById('apAnything').value.trim() : '';
    var goals      = document.getElementById('apGoals').value.trim();
    var investment = document.getElementById('apInvestment').value;
    var msg        = document.getElementById('apMsg');
    if (!clientId)   { msg.textContent = 'Please select a client.';         msg.className = 'da-modal-msg error'; return; }
    if (!address)    { msg.textContent = 'Project address is required.';    msg.className = 'da-modal-msg error'; return; }
    if (!name)       { msg.textContent = 'Project name is required.';       msg.className = 'da-modal-msg error'; return; }
    if (!investment) { msg.textContent = 'Please enter an investment level.'; msg.className = 'da-modal-msg error'; return; }
    var btn = document.getElementById('apSubmit');
    btn.disabled = true; btn.textContent = 'Creating...'; msg.textContent = '';
    var description = [goals, anything ? 'Additional notes: ' + anything : ''].filter(Boolean).join('\n\n');
    try {
      var res = await apiFetch('/rest/v1/projects', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: clientId, project_name: name, project_type: type||null, project_address: address||null, description: description||null, status: 'active' }) });
      if (investment) apiFetch('/rest/v1/clients?id=eq.' + clientId, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ investment: investment }) }).catch(function(){});
      if (res.ok) {
        msg.textContent = 'Project created successfully!'; msg.className = 'da-modal-msg success';
        ['apClientName','apAddress','apProjectName','apAnything','apGoals'].forEach(function(fid) { var el = document.getElementById(fid); if (el) el.value = ''; });
        ['apProjectType','apClientId'].forEach(function(fid) { var el = document.getElementById(fid); if (el) el.value = ''; });
        var inv = document.getElementById('apInvestment'); if (inv) inv.value = '';
        setTimeout(function() { window._hideAddProjectForm(); msg.textContent = ''; loadProjects(); }, 1500);
      }
    } catch(e) { msg.textContent = 'Something went wrong.'; msg.className = 'da-modal-msg error'; }
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
        return '<div class="da-client-card" style="margin-bottom:8px">'
          + '<div class="da-card-top" onclick="window._toggleProjectCard(\'' + p.id + '\')">'
          + '  <div class="da-card-left"><div class="da-card-avatar" style="font-size:11px">' + s((p.project_name||'P').charAt(0).toUpperCase()) + '</div>'
          + '  <div><div class="da-card-name">' + s(p.project_name || 'Unnamed Project') + '</div><div class="da-card-sub">' + clientName + ' · ' + typeLabel + '</div></div></div>'
          + '  <div class="da-card-right"><div class="da-stage-pill" style="color:var(--gold);border-color:var(--gold);background:var(--gold-dim)">' + s(p.status||'active') + '</div><div class="da-expand-icon" id="proj-exp-' + p.id + '">&#9660;</div></div>'
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
    } catch(e) { container.innerHTML = '<div class="da-empty">Error loading projects</div>'; }
  }

  window._toggleProjectCard = function(id) { var det = document.getElementById('proj-det-' + id); var exp = document.getElementById('proj-exp-' + id); if (det) det.classList.toggle('visible'); if (exp) exp.classList.toggle('open'); };
  window._saveProjectLinks = async function(id, btn) {
    var design = (document.getElementById('plink-design-' + id)||{}).value||'';
    var permit = (document.getElementById('plink-permit-' + id)||{}).value||'';
    var cons   = (document.getElementById('plink-const-' + id)||{}).value||'';
    try {
      var res = await apiFetch('/rest/v1/projects?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ drive_design_link: design.trim()||null, drive_permit_link: permit.trim()||null, drive_construction_link: cons.trim()||null }) });
      if (btn) { btn.textContent = res.ok ? 'Saved!' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function(){if(btn){btn.textContent='Save Links';btn.style.background='var(--gold)';}},2000); }
    } catch(e) {}
  };
  window._updateProjectStatus = async function(id, btn) {
    var val = (document.getElementById('pstatus-' + id)||{}).value;
    try {
      var res = await apiFetch('/rest/v1/projects?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ status: val }) });
      if (btn) { btn.textContent = res.ok ? 'Saved ✓' : 'Error'; btn.style.background = res.ok ? 'var(--success)' : 'var(--error)'; setTimeout(function(){if(btn){btn.textContent='Update';btn.style.background='var(--gold)';} loadProjects();},1500); }
    } catch(e) {}
  };
  window._deleteProject = async function(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try { var res = await apiFetch('/rest/v1/projects?id=eq.' + id, { method: 'DELETE' }); if (res.ok) loadProjects(); } catch(e) {}
  };

  async function loadAllChecklists() {
    try {
      var results = await Promise.all([apiFetch('/rest/v1/checklist_items?select=*'), apiFetch('/rest/v1/client_notes?select=*')]);
      var checks = await results[0].json() || [];
      var notes = await results[1].json() || [];
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
        return '<div class="da-check-row da-check-clickable" data-client="' + c.id + '" data-item="' + key + '" onclick="window._adminToggleCheck(this)">'
          + '<div class="da-check-dot' + (isDone ? ' done' : '') + '"></div>'
          + '<div style="flex:1"><div class="da-check-row-label">' + s(CHECKLIST_LABELS[key] || key)
          + ' <span class="da-check-done-mark" style="color:var(--success);font-size:10px;display:' + (isDone ? 'inline' : 'none') + '">\u2713 Received</span></div>'
          + (note ? '<div class="da-check-row-note">' + s(note) + '</div>' : '')
          + '</div></div>';
      }).join('');
      return '<div class="da-client-checklist"><div class="da-client-checklist-header" id="client-checklist-head-' + c.id + '" onclick="window._toggleClientChecklist(\'' + c.id + '\')"><div class="da-client-checklist-name">' + s(c.full_name || 'Unknown') + ' <span style="font-size:10px;color:var(--muted)">' + s(c.email || '') + '</span></div><div class="da-client-checklist-progress"><span>' + done + '</span> / ' + KEYS.length + '</div></div><div class="da-client-checklist-body" id="client-checklist-' + c.id + '">' + items + '</div></div>';
    }).join('');
  }

  window._adminToggleCheck = async function(rowEl) {
    var clientId = rowEl.dataset.client;
    var itemKey  = rowEl.dataset.item;
    var cc = allChecklists[clientId] = allChecklists[clientId] || {};
    var newVal = !cc[itemKey];
    var dot  = rowEl.querySelector('.da-check-dot');
    var mark = rowEl.querySelector('.da-check-done-mark');
    if (dot)  dot.classList.toggle('done', newVal);
    if (mark) mark.style.display = newVal ? 'inline' : 'none';
    try {
      var res = await apiFetch('/rest/v1/checklist_items?on_conflict=client_id,item_key', { method: 'POST', headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ client_id: clientId, item_key: itemKey, completed: newVal }) });
      if (!res.ok) throw new Error(await res.text());
      cc[itemKey] = newVal;
      var KEYS = ['goals','inspo','photos','survey','bylaws','houseplans'];
      var doneCount = KEYS.filter(function(k) { return cc[k]; }).length;
      var prog = document.querySelector('#client-checklist-head-' + clientId + ' .da-client-checklist-progress span');
      if (prog) prog.textContent = doneCount;
      showAdminToast(newVal ? 'Marked received \u2713' : 'Marked not received');
    } catch(e) {
      if (dot)  dot.classList.toggle('done', !newVal);
      if (mark) mark.style.display = !newVal ? 'inline' : 'none';
      showAdminToast('Error saving');
    }
  };

  window._toggleClientChecklist = function(id) { var b = document.getElementById('client-checklist-' + id); if (b) b.classList.toggle('visible'); };

  var checkSearchTimeout;
  document.getElementById('daCheckSearch').addEventListener('input', function() {
    var q = this.value.toLowerCase();
    clearTimeout(checkSearchTimeout);
    checkSearchTimeout = setTimeout(function() {
      renderChecklistTab(allClients.filter(function(c) { return (c.full_name||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q); }));
    }, 300);
  });

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
    } catch(e) {}
  };

  var SIX_MB = 6 * 1024 * 1024;

  function populatePhotoClientFilter() {
    var filter = document.getElementById('daPhotoClientFilter');
    var uploadSel = document.getElementById('daPhotoUploadClient');
    if (!filter || !allClients.length) return;
    var opts = '<option value="">All Clients</option>' + allClients.map(function(c) { return '<option value="' + c.id + '">' + s(c.full_name || c.email) + '</option>'; }).join('');
    filter.innerHTML = opts;
    if (uploadSel) uploadSel.innerHTML = '<option value="">Select client...</option>' + allClients.map(function(c) { return '<option value="' + c.id + '">' + s(c.full_name || c.email) + '</option>'; }).join('');
    filter.onchange = function() { loadAdminPhotos(filter.value); };
  }

  window._showAdminPhotoUpload = function() {
    var form = document.getElementById('daAdminPhotoUploadForm');
    if (form) form.style.display = 'block';
    var uploadClient = document.getElementById('daPhotoUploadClient');
    if (uploadClient && allClients.length && uploadClient.options.length <= 1) {
      uploadClient.innerHTML = '<option value="">Select client...</option>' + allClients.map(function(c) { return '<option value="' + c.id + '">' + s(c.full_name || c.email) + '</option>'; }).join('');
    }
    populatePhotoClientFilter();
    var dateInput = document.getElementById('daPhotoVisitDate');
    if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().split('T')[0];
  };
  window._hideAdminPhotoUpload = function() { var form = document.getElementById('daAdminPhotoUploadForm'); if (form) form.style.display = 'none'; };

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
    var uploadResults = await Promise.all(files.map(async function(file) {
      var safeName = file.name.replace(/[^a-zA-Z0-9._\-]/g, '_');
      var path = folderPath + '/' + Date.now() + '_' + safeName;
      try {
        var ok = false;
        if (file.size > SIX_MB) { ok = await adminUploadResumable(file, path); }
        else {
          var res = await fetch(SUPABASE_URL + '/storage/v1/object/client-documents/' + path, { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + getAdminToken(), 'Content-Type': file.type }, body: file });
          ok = res.ok;
        }
        if (ok) {
          await apiFetch('/rest/v1/documents', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ client_id: clientId, file_name: file.name, file_url: path, uploaded_by: 'daydream_team', photo_category: 'site_photos', photo_notes: notes, visit_date: visitDate }) });
        }
        return ok;
      } catch(e) { return false; }
    }));
    var uploaded = uploadResults.filter(Boolean).length;
    if (statusEl) statusEl.textContent = uploaded + ' of ' + files.length + ' photo(s) uploaded';
    if (uploaded > 0) {
      msg.textContent = uploaded + ' photo(s) saved successfully!'; msg.className = 'da-modal-msg success';
      if (fileInput) fileInput.value = '';
      setTimeout(function() { window._hideAdminPhotoUpload(); loadAdminPhotos(clientId); }, 1500);
    } else { msg.textContent = 'Upload failed. Please try again.'; msg.className = 'da-modal-msg error'; }
    btn.disabled = false; btn.textContent = 'Upload to Drive & Save';
  };

  async function adminUploadResumable(file, path) {
    var CHUNK = 6 * 1024 * 1024;
    try {
      var createRes = await fetch(SUPABASE_URL + '/storage/v1/upload/resumable', { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + getAdminToken(), 'Content-Type': 'application/offset+octet-stream', 'Upload-Length': file.size, 'Upload-Metadata': 'bucketName ' + btoa('client-documents') + ',objectName ' + btoa(path) + ',contentType ' + btoa(file.type || 'application/octet-stream'), 'Tus-Resumable': '1.0.0' } });
      if (!createRes.ok && createRes.status !== 201) return false;
      var uploadUrl = createRes.headers.get('Location');
      if (!uploadUrl) return false;
      if (uploadUrl.startsWith('/')) uploadUrl = SUPABASE_URL + uploadUrl;
      var offset = 0;
      while (offset < file.size) {
        var chunk = file.slice(offset, offset + CHUNK);
        var patchRes = await fetch(uploadUrl, { method: 'PATCH', headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + getAdminToken(), 'Content-Type': 'application/offset+octet-stream', 'Upload-Offset': offset, 'Tus-Resumable': '1.0.0' }, body: chunk });
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
      var groups = {};
      photos.forEach(function(p) { var d = p.visit_date || p.created_at.split('T')[0]; if (!groups[d]) groups[d] = []; groups[d].push(p); });
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
              var signedUrl = SUPABASE_URL + '/storage/v1/object/public/client-documents/' + p.file_url;
              return '<div style="position:relative;aspect-ratio:1;overflow:hidden;background:var(--surface-2);border:1px solid var(--border)">'
                + '<img src="' + signedUrl + '" style="width:100%;height:100%;object-fit:cover;cursor:pointer" onclick="window.open(\'' + signedUrl + '\', \'_blank\')" onerror="this.parentNode.innerHTML=\'<div style=\\&quot;display:flex;align-items:center;justify-content:center;height:100%;font-size:11px;color:var(--muted);\\&quot;>No preview</div>\'" />'
                + '<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);padding:4px 6px;font-size:9px;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + s(p.file_name) + '</div>'
                + '</div>';
            }).join('')
          + '</div>'
          + '</div>';
      }).join('');
    } catch(e) { container.innerHTML = '<div class="da-empty">Error loading photos</div>'; }
  }

  var adminRealtimeChannels = [];

  function startAdminRealtime() {
    stopAdminRealtime();
    var msgChannel = new WebSocket('wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=' + SUPABASE_KEY + '&vsn=1.0.0');
    msgChannel.onopen = function() { msgChannel.send(JSON.stringify({ topic: 'realtime:public:messages', event: 'phx_join', payload: {}, ref: '1' })); };
    msgChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'INSERT' && data.payload && data.payload.record) {
          var msg = data.payload.record;
          if (msg.sender === 'daydream_team') return;
          var msgTab = document.querySelector('#dd-admin [data-tab="messages"]');
          if (msgTab) { var dot = msgTab.querySelector('.da-msg-dot'); if (!dot) { dot = document.createElement('span'); dot.className = 'da-msg-dot'; msgTab.appendChild(dot); } var currentCount = parseInt(dot.textContent) || 0; dot.textContent = currentCount + 1; }
          var msgsTab = document.getElementById('tab-messages');
          if (msgsTab && msgsTab.classList.contains('active')) { loadMessages(); }
          showAdminToast('New message from client');
        }
      } catch(e) {}
    };
    adminRealtimeChannels.push(msgChannel);

    var clientChannel = new WebSocket('wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=' + SUPABASE_KEY + '&vsn=1.0.0');
    clientChannel.onopen = function() { clientChannel.send(JSON.stringify({ topic: 'realtime:public:clients', event: 'phx_join', payload: {}, ref: '2' })); };
    clientChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'INSERT' && data.payload && data.payload.record) {
          var newClient = data.payload.record;
          allClients.unshift(newClient);
          updateStats(); updateSubtabCounts();
          var clientsTab = document.getElementById('tab-clients');
          if (clientsTab && clientsTab.classList.contains('active')) { applyFilters(); }
          showAdminToast('New lead: ' + (newClient.full_name || newClient.email || 'Unknown'));
        }
        if (data.event === 'UPDATE' && data.payload && data.payload.record) {
          var updated = data.payload.record;
          var idx = allClients.findIndex(function(c) { return c.id === updated.id; });
          if (idx > -1) allClients[idx] = Object.assign({}, allClients[idx], updated);
        }
      } catch(e) {}
    };
    adminRealtimeChannels.push(clientChannel);

    var projChannel = new WebSocket('wss://wboqkfqibztjmdwrwsch.supabase.co/realtime/v1/websocket?apikey=' + SUPABASE_KEY + '&vsn=1.0.0');
    projChannel.onopen = function() { projChannel.send(JSON.stringify({ topic: 'realtime:public:projects', event: 'phx_join', payload: {}, ref: '3' })); };
    projChannel.onmessage = function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === 'INSERT' && data.payload && data.payload.record) {
          var proj = data.payload.record;
          var projTab = document.getElementById('tab-projects');
          if (projTab && projTab.classList.contains('active')) { loadProjects(); }
          showAdminToast('New project created: ' + (proj.project_name || 'Unnamed'));
        }
      } catch(e) {}
    };
    adminRealtimeChannels.push(projChannel);
  }

  function stopAdminRealtime() {
    adminRealtimeChannels.forEach(function(ch) { try { ch.close(); } catch(e) {} });
    adminRealtimeChannels = [];
  }

  function showAdminToast(message) {
    var existing = document.getElementById('daRealtimeToast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.id = 'daRealtimeToast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#9e7b50;color:#ede8df;font-family:Jost,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 20px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.4);animation:daFade 0.3s ease both';
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 4000);
  }


  // ══════════════════════════════════════════════════════════════════
  // SUBCONTRACTORS
  // ══════════════════════════════════════════════════════════════════
  var SUB_DOC_TYPES = [
    { key: 'w9', label: 'W-9 Form', required: true },
    { key: 'business_license', label: 'Business License', required: false },
    { key: 'general_liability', label: 'General Liability', required: true, ai: true },
    { key: 'workers_comp', label: "Workers' Comp", required: true },
    { key: 'professional_liability', label: 'Professional Liability', required: false },
    { key: 'auto', label: 'Commercial Auto', required: false },
    { key: 'bond', label: 'Bond', required: false },
    { key: 'subcontractor_agreement', label: 'Subcontractor Agreement', required: true },
    { key: 'trade_references', label: 'Trade References', required: false },
    { key: 'other', label: 'Other', required: false }
  ];

  function subEsc(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }
  function subFmtDate(str) {
    if (!str) return '';
    try { return new Date(str + (str.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); } catch(e) { return ''; }
  }
  function daysUntil(dateStr) {
    if (!dateStr) return null;
    try { return Math.ceil((new Date(dateStr + 'T12:00:00') - new Date()) / 86400000); } catch(e) { return null; }
  }

  async function loadSubcontractors() {
    var wrap = document.getElementById('daSubCardsWrap');
    if (wrap && !allSubs.length) wrap.innerHTML = '<div class="da-empty">Loading subcontractors...</div>';
    try {
      var res = await apiFetch('/rest/v1/subcontractors?order=created_at.desc');
      allSubs = await res.json() || [];
      // Load all docs in one query
      var dRes = await apiFetch('/rest/v1/subcontractor_documents?order=created_at.desc');
      var docs = await dRes.json() || [];
      allSubDocs = {};
      docs.forEach(function(d) {
        if (!allSubDocs[d.subcontractor_id]) allSubDocs[d.subcontractor_id] = [];
        allSubDocs[d.subcontractor_id].push(d);
      });
      renderSubCounts();
      renderSubcontractors();
    } catch(e) {
      console.error('loadSubcontractors:', e);
      if (wrap) wrap.innerHTML = '<div class="da-empty">Could not load subcontractors.</div>';
    }
  }

  function subComplianceInfo(sub) {
    var docs = allSubDocs[sub.id] || [];
    var required = SUB_DOC_TYPES.filter(function(d){ return d.required; });
    var doneReq = required.filter(function(rd) {
      return docs.some(function(x){ return x.doc_type === rd.key && (x.status === 'submitted' || x.status === 'approved'); });
    }).length;
    // Expiration check
    var expiring = false, expired = false;
    docs.forEach(function(x) {
      var du = daysUntil(x.expiration_date);
      if (du !== null) { if (du < 0) expired = true; else if (du <= 30) expiring = true; }
    });
    return { doneReq: doneReq, totalReq: required.length, pct: required.length ? Math.round(doneReq/required.length*100) : 0, expiring: expiring, expired: expired, docCount: docs.length };
  }

  function renderSubCounts() {
    var all = allSubs.length;
    var review = 0, compliant = 0, expiring = 0, newc = 0;
    allSubs.forEach(function(sub) {
      var ci = subComplianceInfo(sub);
      if (sub.status === 'new' || ci.docCount === 0) newc++;
      if (ci.pct === 100 && !ci.expired) compliant++;
      else review++;
      if (ci.expiring || ci.expired) expiring++;
    });
    var set = function(id, n) { var el = document.getElementById(id); if (el) el.textContent = n; };
    set('scnt-all', all); set('scnt-review', review); set('scnt-compliant', compliant); set('scnt-expiring', expiring); set('scnt-new', newc);
  }

  function subMatchesSubtab(sub) {
    var ci = subComplianceInfo(sub);
    if (subSubtabStatus === 'all') return true;
    if (subSubtabStatus === 'compliant') return ci.pct === 100 && !ci.expired;
    if (subSubtabStatus === 'needs_review') return !(ci.pct === 100 && !ci.expired);
    if (subSubtabStatus === 'expiring') return ci.expiring || ci.expired;
    if (subSubtabStatus === 'new') return sub.status === 'new' || ci.docCount === 0;
    return true;
  }

  function renderSubcontractors() {
    var wrap = document.getElementById('daSubCardsWrap');
    if (!wrap) return;
    var search = (document.getElementById('daSubSearch').value || '').toLowerCase();
    var list = allSubs.filter(function(sub) {
      if (!subMatchesSubtab(sub)) return false;
      if (!search) return true;
      return [sub.company_legal_name, sub.dba_name, sub.primary_trade, sub.contact_name, sub.contact_email].join(' ').toLowerCase().indexOf(search) !== -1;
    });
    var cntEl = document.getElementById('daSubCount');
    if (cntEl) cntEl.textContent = list.length + (list.length === 1 ? ' partner' : ' partners');
    if (!list.length) { wrap.innerHTML = '<div class="da-empty">No subcontractors match.</div>'; return; }

    wrap.innerHTML = list.map(function(sub) {
      var ci = subComplianceInfo(sub);
      var badge = ci.expired ? '<span class="da-sub-flag expired">Expired</span>' : (ci.expiring ? '<span class="da-sub-flag expiring">Expiring</span>' : '');
      var pctColor = ci.pct === 100 ? 'var(--success)' : (ci.pct > 0 ? 'var(--gold)' : 'var(--muted)');
      return '<div class="da-card da-sub-card" data-sub-id="' + sub.id + '">'
        + '<div class="da-card-head" onclick="window._toggleSub(\'' + sub.id + '\')">'
        + '  <div class="da-card-head-main">'
        + '    <div class="da-card-name">' + subEsc(sub.dba_name || sub.company_legal_name) + ' ' + badge + '</div>'
        + '    <div class="da-card-sub">' + subEsc(sub.primary_trade || 'Trade not set') + '  ·  ' + subEsc(sub.contact_name || '') + '</div>'
        + '  </div>'
        + '  <div class="da-sub-compliance"><div class="da-sub-pct" style="color:' + pctColor + '">' + ci.pct + '%</div><div class="da-sub-pct-label">' + ci.doneReq + '/' + ci.totalReq + ' required</div></div>'
        + '</div>'
        + '<div class="da-card-body" id="sub-body-' + sub.id + '" style="display:none"></div>'
        + '</div>';
    }).join('');
  }

  window._toggleSub = function(id) {
    var body = document.getElementById('sub-body-' + id);
    if (!body) return;
    if (body.style.display === 'block') { body.style.display = 'none'; return; }
    body.style.display = 'block';
    renderSubDetail(id, body);
  };

  function renderSubDetail(id, body) {
    var sub = allSubs.find(function(x){ return x.id === id; });
    if (!sub) return;
    var docs = allSubDocs[id] || [];

    var info = [
      ['Legal Name', sub.company_legal_name],
      ['DBA', sub.dba_name],
      ['Structure', sub.business_structure],
      ['EIN', sub.ein],
      ['Years in Business', sub.years_in_business],
      ['Address', sub.business_address],
      ['Business Phone', sub.business_phone],
      ['Website', sub.website],
      ['Contact', sub.contact_name],
      ['Title', sub.contact_title],
      ['Email', sub.contact_email],
      ['Direct Phone', sub.contact_phone],
      ['Primary Trade', sub.primary_trade],
      ['All Trades', sub.trades],
      ['Service Area', sub.service_area],
      ['Crew Size', sub.crew_size],
      ['License', (sub.license_number ? sub.license_number + (sub.license_state ? ' (' + sub.license_state + ')' : '') : '')]
    ].filter(function(r){ return r[1]; });

    var infoHtml = '<div class="da-sub-info-grid">' + info.map(function(r) {
      return '<div class="da-sub-info"><div class="da-sub-info-label">' + subEsc(r[0]) + '</div><div class="da-sub-info-val">' + subEsc(String(r[1])) + '</div></div>';
    }).join('') + '</div>';

    if (sub.trade_references) infoHtml += '<div class="da-sub-notes"><strong>Trade References:</strong> ' + subEsc(sub.trade_references) + '</div>';
    if (sub.notes) infoHtml += '<div class="da-sub-notes"><strong>Notes:</strong> ' + subEsc(sub.notes) + '</div>';

    // Drive links
    var driveHtml = '';
    if (sub.drive_folder_link) {
      driveHtml = '<div class="da-sub-drive"><a href="' + subEsc(sub.drive_folder_link) + '" target="_blank" class="da-sub-drive-btn">Open Drive Folder</a>'
        + (sub.drive_insurance_link ? '<a href="' + subEsc(sub.drive_insurance_link) + '" target="_blank" class="da-sub-drive-btn">Insurance</a>' : '')
        + '</div>';
    }

    // Documents review
    var docsHtml = '<div class="da-sub-section-title">Documents</div>';
    SUB_DOC_TYPES.forEach(function(dt) {
      var files = docs.filter(function(x){ return x.doc_type === dt.key; });
      if (!files.length && !dt.required) return; // hide empty optional types
      docsHtml += '<div class="da-sub-doc">';
      docsHtml += '<div class="da-sub-doc-head"><span class="da-sub-doc-name">' + subEsc(dt.label) + (dt.required ? ' <span class="da-sub-req">Required</span>' : '') + '</span></div>';
      if (!files.length) {
        docsHtml += '<div class="da-sub-doc-empty">Not yet submitted</div>';
      } else {
        files.forEach(function(f) {
          var du = daysUntil(f.expiration_date);
          var expTxt = f.expiration_date ? ('Expires ' + subFmtDate(f.expiration_date) + (du !== null && du < 0 ? ' (EXPIRED)' : (du !== null && du <= 30 ? ' (' + du + 'd)' : ''))) : '';
          var expClass = (du !== null && du < 0) ? 'expired' : ((du !== null && du <= 30) ? 'expiring' : '');
          docsHtml += '<div class="da-sub-file">'
            + '<div class="da-sub-file-main"><a href="' + subEsc(sub.drive_folder_link || '#') + '" target="_blank" class="da-sub-file-name">' + subEsc(f.file_name || 'Document') + '</a>'
            + '<div class="da-sub-file-meta ' + expClass + '">' + subFmtDate(f.created_at) + (expTxt ? '  ·  ' + expTxt : '') + (f.additional_insured_confirmed ? '  ·  AI confirmed' : '') + '</div></div>'
            + '<div class="da-sub-file-actions">'
            + '<select class="da-sub-status-sel" data-doc="' + f.id + '">'
            + '<option value="submitted"' + (f.status==='submitted'?' selected':'') + '>Submitted</option>'
            + '<option value="approved"' + (f.status==='approved'?' selected':'') + '>Approved</option>'
            + '<option value="rejected"' + (f.status==='rejected'?' selected':'') + '>Rejected</option>'
            + '<option value="expired"' + (f.status==='expired'?' selected':'') + '>Expired</option>'
            + '</select>'
            + '</div></div>';
        });
      }
      docsHtml += '</div>';
    });

    // Status + actions
    var actionsHtml = '<div class="da-sub-actions">'
      + '<label class="da-sub-action-label">Partner Status</label>'
      + '<select class="da-sub-master-status" data-sub="' + sub.id + '">'
      + '<option value="new"' + (sub.status==='new'?' selected':'') + '>New</option>'
      + '<option value="under_review"' + (sub.status==='under_review'?' selected':'') + '>Under Review</option>'
      + '<option value="approved"' + (sub.status==='approved'?' selected':'') + '>Approved</option>'
      + '<option value="active"' + (sub.status==='active'?' selected':'') + '>Active</option>'
      + '<option value="not_approved"' + (sub.status==='not_approved'?' selected':'') + '>Not Approved</option>'
      + '<option value="archived"' + (sub.status==='archived'?' selected':'') + '>Archived</option>'
      + '</select>'
      + '<textarea class="da-sub-admin-notes" data-sub="' + sub.id + '" placeholder="Internal notes about this partner...">' + subEsc(sub.admin_notes || '') + '</textarea>'
      + '<button class="da-sub-save-notes" data-sub="' + sub.id + '">Save Notes</button>'
      + '</div>';

    body.innerHTML = infoHtml + driveHtml + docsHtml + actionsHtml;

    // Wire document status changes
    body.querySelectorAll('.da-sub-status-sel').forEach(function(sel) {
      sel.addEventListener('change', async function() {
        await apiFetch('/rest/v1/subcontractor_documents?id=eq.' + sel.dataset.doc, { method:'PATCH', headers:{'Prefer':'return=minimal'}, body: JSON.stringify({ status: sel.value }) });
        showAdminToast('Document ' + sel.value);
        await loadSubcontractors();
      });
    });
    // Master status
    var masterSel = body.querySelector('.da-sub-master-status');
    if (masterSel) masterSel.addEventListener('change', async function() {
      await apiFetch('/rest/v1/subcontractors?id=eq.' + masterSel.dataset.sub, { method:'PATCH', headers:{'Prefer':'return=minimal'}, body: JSON.stringify({ status: masterSel.value }) });
      sub.status = masterSel.value;
      showAdminToast('Partner status: ' + masterSel.value);
      renderSubCounts();
    });
    // Save notes
    var saveBtn = body.querySelector('.da-sub-save-notes');
    if (saveBtn) saveBtn.addEventListener('click', async function() {
      var ta = body.querySelector('.da-sub-admin-notes');
      await apiFetch('/rest/v1/subcontractors?id=eq.' + saveBtn.dataset.sub, { method:'PATCH', headers:{'Prefer':'return=minimal'}, body: JSON.stringify({ admin_notes: ta.value }) });
      sub.admin_notes = ta.value;
      saveBtn.textContent = 'Saved'; setTimeout(function(){ saveBtn.textContent = 'Save Notes'; }, 1800);
    });
  }

  // Sub subtab + search wiring (deferred until elements exist)
  document.addEventListener('click', function(e) {
    var t = e.target.closest('[data-sub-status]');
    if (!t || !document.getElementById('daSubSubtabs') || !document.getElementById('daSubSubtabs').contains(t)) return;
    document.querySelectorAll('#daSubSubtabs [data-sub-status]').forEach(function(b){ b.classList.remove('active'); });
    t.classList.add('active');
    subSubtabStatus = t.dataset.subStatus;
    renderSubcontractors();
  });
  document.addEventListener('input', function(e) {
    if (e.target && e.target.id === 'daSubSearch') renderSubcontractors();
  });

})();
