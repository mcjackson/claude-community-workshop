<script lang="ts">
	type ResourceType =
		| 'Medical respite'
		| 'Cooling center'
		| 'Pet-friendly shelter bed'
		| 'Family shelter'
		| 'Youth transitional housing'
		| 'Daytime drop-in center';

	type Provider = { name: string; area: string; phone: string };

	type Scenario = {
		id: string;
		label: string;
		resourceType: ResourceType;
		ownerRole: string;
		ownerName: string;
		window: string;
		expect: string;
		ride: string;
	};

	// Synthetic scenarios and providers — see CLAUDE.md "Synthetic Data". Mirrors
	// docs/homelessness-handoff-scenarios.csv; providers are fictional, mapped to
	// real service categories.
	const PROVIDERS: Record<ResourceType, Provider> = {
		'Medical respite': { name: 'Southside Medical Respite', area: 'Southside', phone: '(205) 555-0142' },
		'Cooling center': { name: 'Eastlake Cooling Center', area: 'Eastlake', phone: '(205) 555-0187' },
		'Pet-friendly shelter bed': {
			name: 'Roebuck Pet-Friendly Shelter',
			area: 'Roebuck',
			phone: '(205) 555-0119'
		},
		'Family shelter': { name: 'Woodlawn Family Shelter', area: 'Woodlawn', phone: '(205) 555-0163' },
		'Youth transitional housing': {
			name: 'Avondale Youth Housing',
			area: 'Avondale',
			phone: '(205) 555-0155'
		},
		'Daytime drop-in center': { name: 'Norwood Daytime Center', area: 'Norwood', phone: '(205) 555-0138' }
	};

	const SCENARIOS: Scenario[] = [
		{
			id: 'SCEN-05',
			label: 'Hospital discharge — short-term respite bed',
			resourceType: 'Medical respite',
			ownerRole: 'Healthcare case manager',
			ownerName: 'Renee Talbot',
			window: 'within 24 hours',
			expect:
				"A nurse or case manager will check you in and get you settled in a bed to rest and recover. They'll go over any follow-up care you need.",
			ride: 'A hospital transport van will take you there directly from discharge.'
		},
		{
			id: 'SCEN-01',
			label: 'Sleeping outside in heat — shade + water',
			resourceType: 'Cooling center',
			ownerRole: 'Frontline responder',
			ownerName: 'Marcus Whitfield',
			window: 'within 2 hours',
			expect:
				"Walk in and tell staff at the front desk your name and code. You'll get a cool place to sit, water, and a chance to rest out of the heat.",
			ride: 'You can walk there, or ask the responder who gave you this slip for a ride.'
		},
		{
			id: 'SCEN-02',
			label: 'Adult with a pet — overnight pet-friendly shelter',
			resourceType: 'Pet-friendly shelter bed',
			ownerRole: 'Coordinated entry access point',
			ownerName: 'Dana Ochoa',
			window: 'within 4 hours',
			expect:
				"Staff will welcome you and your pet together — no separation. They'll show you both to a bed for the night and go over house rules.",
			ride: 'A coordinated entry van can pick you and your pet up — ask your responder to confirm.'
		},
		{
			id: 'SCEN-03',
			label: 'Family with children — emergency family shelter',
			resourceType: 'Family shelter',
			ownerRole: 'Coordinated entry access point',
			ownerName: 'Patrice Coleman',
			window: 'same day',
			expect:
				"Staff will welcome your whole family and get everyone checked in together, including your kids. They'll show you your room and explain meal times.",
			ride: 'Coordinated entry can arrange transportation for your whole family — ask your responder.'
		},
		{
			id: 'SCEN-04',
			label: 'Young adult aging out of foster care — transitional housing',
			resourceType: 'Youth transitional housing',
			ownerRole: 'Youth services provider',
			ownerName: 'Jalen Ford',
			window: 'within 3 days',
			expect:
				'A youth services staff member will meet with you one-on-one, show you your room, and start a plan with you for next steps like school, work, or ID.',
			ride: 'Youth services can pick you up — ask your responder for the pickup time.'
		},
		{
			id: 'SCEN-06',
			label: 'Daytime services + phone charge — daytime drop-in',
			resourceType: 'Daytime drop-in center',
			ownerRole: 'Frontline responder',
			ownerName: 'Ivy Nguyen',
			window: 'same day',
			expect:
				'Walk in any time during open hours. You can charge your phone, get a meal, take a shower, and talk with staff about next steps.',
			ride: 'You can walk there, or ask the responder who gave you this slip for a ride.'
		}
	];

	const CODE_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // no 0/O/1/I/L confusion

	function generateCode() {
		let code = '';
		for (let i = 0; i < 4; i++) {
			code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
		}
		return code;
	}

	let scenarioIndex = $state(0);
	let firstName = $state('');
	let code = $state(generateCode());

	const scenario = $derived(SCENARIOS[scenarioIndex]);
	const provider = $derived(PROVIDERS[scenario.resourceType]);
	const displayName = $derived(firstName.trim() || 'friend');

	function regenerateCode() {
		code = generateCode();
	}
</script>

<svelte:head>
	<title>CareGrid — Updated Workflow</title>
</svelte:head>

<div class="workflow-page">
	<div class="wrap">
		<p class="eyebrow">CareGrid · Homelessness Services Handoff</p>
		<h1>Updated Workflow</h1>
		<p class="lede">Warm handoff — the person's own slip, plus a no-printer field-mode script.</p>

		<div class="synthetic-banner">
			This is synthetic demo data for a hackathon project. No real person, place, or record.
		</div>

		<div class="controls">
			<div class="field">
				<label for="scenario-select">Scenario</label>
				<select id="scenario-select" bind:value={scenarioIndex}>
					{#each SCENARIOS as s, i (s.id)}
						<option value={i}>{s.id} — {s.label}</option>
					{/each}
				</select>
			</div>
			<div class="field">
				<label for="name-input">First name</label>
				<input type="text" id="name-input" placeholder="e.g. Jordan" maxlength="30" bind:value={firstName} />
			</div>
			<button class="regen" type="button" onclick={regenerateCode}>New code</button>
		</div>

		<div class="outputs">
			<!-- (A) Person's slip -->
			<section class="card" id="slip-card">
				<div class="card-head">
					<h2>Your Slip</h2>
					<span class="sub">Keep this with you</span>
				</div>
				<div id="slip-body">
					<p class="slip-greeting">Hi <span class="name-fill">{displayName}</span>,</p>
					<p class="slip-sub">Here's where you're headed and what happens next.</p>

					<div class="slip-row">
						<div class="slip-label">Where you're going</div>
						<div class="slip-value">
							<span class="place-name">{provider.name}</span>
							<span class="place-meta">{provider.area} · {provider.phone}</span>
						</div>
					</div>

					<div class="slip-row">
						<div class="slip-label">Your code</div>
						<div class="slip-value"><span class="code-box">{code}</span></div>
					</div>

					<div class="slip-row">
						<div class="slip-label">Your ride</div>
						<div class="slip-value">{scenario.ride}</div>
					</div>

					<div class="slip-row">
						<div class="slip-label">Who's expecting you</div>
						<div class="slip-value">{scenario.ownerName} ({scenario.ownerRole})</div>
					</div>

					<div class="expect-box">
						<h3>What to expect when you arrive</h3>
						<div>{scenario.expect}</div>
					</div>

					<div class="safety-note">
						If something goes wrong, {scenario.ownerName} is expecting you. Just say your name and your
						code.
					</div>
				</div>
				<div class="slip-foot">
					<span class="window-pill">
						Please arrive: <strong>{scenario.window} — please call ahead to confirm, availability can change</strong>
					</span>
					<button class="print-btn" onclick={() => window.print()}>Print this slip</button>
				</div>
			</section>

			<!-- (B) Field mode -->
			<section class="card" id="field-card">
				<div class="card-head">
					<h2>Field Mode</h2>
					<span class="sub">No printer needed</span>
				</div>
				<div id="field-body">
					<div class="field-script">Go to {provider.name} ({provider.area}).
Your code is <span class="code-inline">{code}</span>.
Ask for {scenario.ownerName} — they're expecting you.</div>
					<div class="field-note">
						<strong>No phone needed.</strong> The full record travels responder-phone to receiver-phone
						through the ahead-call — the person only needs to remember their code.
					</div>
					<p class="card-card-hint">
						Read this aloud, or copy it onto any scrap paper or index card. Three lines is all it takes.
					</p>
				</div>
			</section>
		</div>

		<p class="page-foot">Warm Handoff · Birmingham homelessness-services hackathon project · synthetic data only</p>
	</div>
</div>

<style>
	.workflow-page {
		/* Mapped onto the app's brand (teal) / signal (amber) scale from
		   src/routes/layout.css — see CLAUDE.md Architecture. */
		--bg: var(--color-brand-50);
		--card: #ffffff;
		--ink: var(--color-brand-950);
		--ink-soft: var(--color-brand-700);
		--teal: var(--color-brand-700);
		--teal-dark: var(--color-brand-800);
		--teal-tint: var(--color-brand-50);
		--border: var(--color-brand-100);
		--warn-bg: var(--color-signal-50);
		--warn-border: var(--color-signal-300);
		--warn-ink: var(--color-signal-700);
		--mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
		--sans: var(--font-sans);

		background: var(--bg);
		color: var(--ink);
		font-family: var(--sans);
		padding: 24px 16px 64px;
	}

	@media print {
		:global(header) {
			display: none !important;
		}
	}

	.wrap {
		max-width: 900px;
		margin: 0 auto;
	}

	.eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--teal);
		margin: 0 0 5px;
	}
	h1 {
		font-size: 1.5rem;
		margin: 0 0 4px;
		letter-spacing: -0.015em;
		color: var(--teal-dark);
	}
	.lede {
		color: var(--ink-soft);
		font-size: 0.95rem;
		margin: 0 0 20px;
	}

	.synthetic-banner {
		background: var(--warn-bg);
		border: 1px solid var(--warn-border);
		color: var(--warn-ink);
		border-radius: 10px;
		padding: 10px 16px;
		font-size: 0.85rem;
		text-align: center;
		margin-bottom: 20px;
	}

	.controls {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 18px 20px;
		margin-bottom: 24px;
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: 14px;
		align-items: end;
	}

	@media (max-width: 640px) {
		.controls {
			grid-template-columns: 1fr;
		}
	}

	.field label {
		display: block;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--ink-soft);
		margin-bottom: 6px;
		font-weight: 600;
	}

	.field select,
	.field input[type='text'] {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: 8px;
		font-size: 1rem;
		font-family: var(--sans);
		background: #fff;
		color: var(--ink);
	}

	.field select:focus,
	.field input:focus {
		outline: 2px solid var(--teal);
		outline-offset: 1px;
		border-color: var(--teal);
	}

	button.regen {
		padding: 10px 16px;
		border-radius: 8px;
		border: 1px solid var(--teal);
		background: var(--teal-tint);
		color: var(--teal-dark);
		font-weight: 600;
		cursor: pointer;
		font-size: 0.9rem;
		white-space: nowrap;
	}
	button.regen:hover {
		background: var(--color-brand-100);
	}

	.outputs {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 24px;
		align-items: start;
	}

	@media (max-width: 760px) {
		.outputs {
			grid-template-columns: 1fr;
		}
	}

	section.card {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 16px;
		box-shadow: 0 1px 3px rgba(13, 33, 36, 0.06);
		overflow: hidden;
	}

	.card-head {
		padding: 16px 22px;
		border-bottom: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.card-head h2 {
		margin: 0;
		font-size: 1.05rem;
		color: var(--teal-dark);
	}

	.card-head .sub {
		font-size: 0.78rem;
		color: var(--ink-soft);
	}

	/* ---- Person's slip ---- */

	#slip-body {
		padding: 26px 24px 22px;
	}

	.slip-greeting {
		font-size: 1.35rem;
		font-weight: 700;
		margin: 0 0 4px;
		color: var(--ink);
	}

	.slip-greeting .name-fill {
		color: var(--teal-dark);
	}

	.slip-sub {
		color: var(--ink-soft);
		margin: 0 0 20px;
		font-size: 1rem;
	}

	.slip-row {
		display: grid;
		grid-template-columns: 130px 1fr;
		gap: 10px;
		padding: 14px 0;
		border-top: 1px solid var(--border);
	}

	.slip-row:first-of-type {
		border-top: none;
	}

	.slip-label {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--ink-soft);
		font-weight: 700;
		padding-top: 3px;
	}

	.slip-value {
		font-size: 1.15rem;
		line-height: 1.4;
	}

	.slip-value .place-name {
		font-weight: 700;
	}

	.slip-value .place-meta {
		display: block;
		font-size: 0.95rem;
		color: var(--ink-soft);
		margin-top: 2px;
	}

	.code-box {
		display: inline-block;
		font-family: var(--mono);
		font-size: 1.6rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		background: var(--teal-tint);
		color: var(--teal-dark);
		border: 2px solid var(--teal);
		border-radius: 10px;
		padding: 6px 16px;
	}

	.expect-box {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 16px 18px;
		margin: 18px 0;
		font-size: 1.02rem;
		line-height: 1.5;
	}

	.expect-box h3 {
		margin: 0 0 8px;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--teal-dark);
	}

	.safety-note {
		background: var(--teal-tint);
		border: 1px solid var(--teal);
		border-radius: 10px;
		padding: 14px 18px;
		margin-top: 16px;
		font-size: 1.05rem;
		line-height: 1.5;
		color: var(--teal-dark);
		font-weight: 600;
	}

	.slip-foot {
		padding: 14px 24px 20px;
		border-top: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.window-pill {
		font-size: 0.85rem;
		color: var(--ink-soft);
	}

	.print-btn {
		background: var(--teal);
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 10px 18px;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
	}
	.print-btn:hover {
		background: var(--teal-dark);
	}

	/* ---- Field mode ---- */

	#field-body {
		padding: 22px 22px 20px;
	}

	.field-script {
		font-family: var(--mono);
		background: var(--color-brand-950);
		color: #eafff9;
		border-radius: 10px;
		padding: 18px 20px;
		line-height: 1.9;
		font-size: 1rem;
		white-space: pre-wrap;
	}

	.field-script .code-inline {
		color: #7de8cf;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.field-note {
		margin-top: 16px;
		font-size: 0.88rem;
		color: var(--ink-soft);
		background: var(--bg);
		border: 1px dashed var(--border);
		border-radius: 8px;
		padding: 12px 14px;
		line-height: 1.5;
	}

	.field-note strong {
		color: var(--ink);
	}

	.card-card-hint {
		font-size: 0.8rem;
		color: var(--ink-soft);
		margin-top: 14px;
		line-height: 1.4;
	}

	.page-foot {
		text-align: center;
		color: var(--ink-soft);
		font-size: 0.78rem;
		margin-top: 32px;
	}

	/* Print rules: only the person's slip prints */
	@media print {
		.workflow-page {
			background: #fff;
			padding: 0;
		}
		.controls,
		.synthetic-banner,
		#field-card,
		.slip-foot .print-btn,
		.page-foot,
		.eyebrow,
		.lede {
			display: none !important;
		}
		.outputs {
			display: block;
		}
		#slip-card {
			border: none;
			box-shadow: none;
			border-radius: 0;
		}
		.card-head {
			border-bottom: 2px solid var(--teal);
		}
	}
</style>
