<script lang="ts">
	import { tick } from 'svelte';

	type Scenario = {
		id: string;
		context: string;
		need: string;
		type: string;
		confirm: string;
		owner: string;
		window: string;
	};

	type Provider = {
		id: string;
		name: string;
		type: string;
		serves: string;
		acc: string[];
		area: string;
		contact: string;
		verified: string;
	};

	// Synthetic scenarios and provider directory — see CLAUDE.md "Synthetic Data".
	// Mirrors docs/homelessness-handoff-scenarios.csv; providers are fictional,
	// mapped to real service categories. No live capacity: every place must be
	// confirmed by phone before travel.
	const SCENARIOS: Scenario[] = [
		{
			id: 'SCEN-05',
			context: 'Adult recently discharged from a hospital',
			need: 'Short-term respite care bed',
			type: 'Medical respite',
			confirm: 'whether a discharge referral form is required',
			owner: 'Healthcare case manager',
			window: 'within 24h'
		},
		{
			id: 'SCEN-01',
			context: 'Adult sleeping outdoors during a heat advisory',
			need: 'Immediate shade and water',
			type: 'Cooling center',
			confirm: 'the nearest cooling center is open today',
			owner: 'Frontline responder',
			window: 'within 2h'
		},
		{
			id: 'SCEN-02',
			context: 'Adult with a pet seeking overnight shelter',
			need: 'Overnight shelter that accepts pets',
			type: 'Pet-friendly shelter bed',
			confirm: 'pet-friendly beds are currently available',
			owner: 'Coordinated entry access point',
			window: 'within 4h'
		},
		{
			id: 'SCEN-03',
			context: 'Family with children needing emergency shelter',
			need: 'Emergency family shelter placement',
			type: 'Family shelter',
			confirm: 'a family intake slot is open today',
			owner: 'Coordinated entry access point',
			window: 'same day'
		},
		{
			id: 'SCEN-04',
			context: 'Young adult aging out of foster care',
			need: 'Transitional housing information',
			type: 'Youth transitional housing',
			confirm: 'age & eligibility documentation needed',
			owner: 'Youth services provider',
			window: 'within 3 days'
		},
		{
			id: 'SCEN-06',
			context: 'Adult seeking daytime services and a phone charge',
			need: 'Daytime drop-in services',
			type: 'Daytime drop-in center',
			confirm: 'current operating hours',
			owner: 'Frontline responder',
			window: 'same day'
		}
	];

	const DIRECTORY: Provider[] = [
		{
			id: 'SVC-01',
			name: 'Southside Medical Respite',
			type: 'Medical respite',
			serves: 'Adults recently discharged',
			acc: ['wheelchair accessible'],
			area: 'Southside',
			contact: '(205) 555-0142',
			verified: '2026-08-27'
		},
		{
			id: 'SVC-02',
			name: 'Cahaba Recovery Respite',
			type: 'Medical respite',
			serves: 'Short-term recovery beds',
			acc: ['referral form'],
			area: 'Woodlawn',
			contact: '(205) 555-0177',
			verified: '2026-08-26'
		},
		{
			id: 'SVC-03',
			name: 'Magic City Family Haven',
			type: 'Family shelter',
			serves: 'Families with children',
			acc: ['cribs'],
			area: 'Downtown',
			contact: '(205) 555-0110',
			verified: '2026-08-27'
		},
		{
			id: 'SVC-04',
			name: 'East Lake Family Shelter',
			type: 'Family shelter',
			serves: 'Families; DV-safe intake',
			acc: ['DV-safe', 'children'],
			area: 'East Lake',
			contact: '(205) 555-0198',
			verified: '2026-08-25'
		},
		{
			id: 'SVC-05',
			name: 'Red Mountain Shelter',
			type: 'Pet-friendly shelter bed',
			serves: 'Adults with pets',
			acc: ['on-site kennels'],
			area: 'Southtown',
			contact: '(205) 555-0163',
			verified: '2026-08-27'
		},
		{
			id: 'SVC-06',
			name: 'Downtown Cooling Center',
			type: 'Cooling center',
			serves: 'Anyone, daytime',
			acc: ['water', 'AC'],
			area: 'City Center',
			contact: '(205) 555-0120',
			verified: '2026-08-28'
		},
		{
			id: 'SVC-07',
			name: 'Norwood Cooling Site',
			type: 'Cooling center',
			serves: 'Anyone, daytime',
			acc: ['water'],
			area: 'Norwood',
			contact: '(205) 555-0134',
			verified: '2026-08-28'
		},
		{
			id: 'SVC-08',
			name: 'Vulcan Youth Transitions',
			type: 'Youth transitional housing',
			serves: 'Young adults 18-24',
			acc: ['ID assistance'],
			area: 'Five Points',
			contact: '(205) 555-0155',
			verified: '2026-08-24'
		},
		{
			id: 'SVC-09',
			name: 'First Light Day Center',
			type: 'Daytime drop-in center',
			serves: 'Adults',
			acc: ['showers', 'charging'],
			area: 'Downtown',
			contact: '(205) 555-0188',
			verified: '2026-08-27'
		},
		{
			id: 'SVC-10',
			name: 'Common Ground Drop-In',
			type: 'Daytime drop-in center',
			serves: 'Adults',
			acc: ['mail', 'charging'],
			area: 'Avondale',
			contact: '(205) 555-0171',
			verified: '2026-08-26'
		}
	];

	const TRANSPORT_OPTIONS = [
		'Program / agency van',
		'Bus pass or transit token',
		'Agency-funded ride voucher',
		'Partner outreach vehicle',
		'Self-transport (able & willing)',
		'Not yet arranged'
	];

	let scenarioId = $state(SCENARIOS[0].id);
	let firstName = $state('');
	let lastInitial = $state('');
	let need = $state(SCENARIOS[0].need);
	let transport = $state(TRANSPORT_OPTIONS[0]);
	let placeId: string | null = $state(null);
	let step = $state<'entry' | 'confirm' | 'card'>('entry');
	let handoffCode = $state('');

	let c1 = $state(false);
	let c2 = $state(false);
	let c3 = $state(false);
	let c4 = $state(false);
	let consent = $state(false);

	let entryStepEl: HTMLDivElement | undefined = $state();
	let confirmStepEl: HTMLDivElement | undefined = $state();
	let cardStepEl: HTMLDivElement | undefined = $state();

	const scenario = $derived(SCENARIOS.find((s) => s.id === scenarioId)!);
	const matches = $derived(DIRECTORY.filter((d) => d.type === scenario.type));
	const place = $derived(matches.find((d) => d.id === placeId) ?? matches[0]!);
	const displayName = $derived(
		(firstName.trim() || '(first name)') +
			(lastInitial.trim() ? ' ' + lastInitial.trim().toUpperCase() + '.' : '')
	);
	const transportArranged = $derived(transport !== 'Not yet arranged');
	const allChecked = $derived(c1 && c2 && c3 && c4 && consent);

	$effect(() => {
		placeId = matches[0]?.id ?? null;
	});

	function generateCode() {
		const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
		const digits = '23456789';
		const pick = (s: string) => s[Math.floor(Math.random() * s.length)];
		return pick(letters) + pick(digits) + pick(letters) + pick(digits);
	}

	function onScenarioChange() {
		need = scenario.need;
		step = 'entry';
	}

	async function toConfirm() {
		handoffCode = generateCode();
		c1 = c2 = c3 = c4 = consent = false;
		step = 'confirm';
		await tick();
		confirmStepEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	async function issue() {
		step = 'card';
		await tick();
		cardStepEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	async function reset() {
		step = 'entry';
		await tick();
		entryStepEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>CareGrid — Relay Card</title>
</svelte:head>

<div class="relay-card-page">
	<div class="wrap">
		<p class="eyebrow">CareGrid · Homelessness Services Handoff</p>
		<h1>Relay Card</h1>
		<p class="lede">Fill in the situation, pick a place, confirm with a human, then issue a simple card.</p>

		<details class="help">
			<summary>How to run a handoff</summary>
			<div class="hc">
				<ol>
					<li>
						<b>Safety first.</b> Immediate danger or dangerous weather with no shelter? Call 911/crisis
						and transport now, don't issue a card.
					</li>
					<li><b>Ask what they need,</b> in their words. Get consent to help.</li>
					<li>
						<b>Capture the minimum:</b> first name + initial, need, eligibility lane, accommodations.
						Not their history.
					</li>
					<li>
						<b>Pick a place</b> the person is eligible for, then <b>confirm by phone</b> (room, eligibility,
						form).
					</li>
					<li><b>Arrange the ride</b> and <b>call ahead</b> with the first name + code.</li>
					<li>
						<b>Hand off the card,</b> or (no printer) say/write: where to go, the code, who's expecting
						them.
					</li>
				</ol>
			</div>
		</details>

		<!-- STEP 1 -->
		<div class="block" bind:this={entryStepEl}>
			<div class="sec-h"><span class="step">1</span><h2>Responder entry</h2></div>
			<div class="body">
				<div class="fld">
					<label for="scen">Scenario (demo selector)</label>
					<select id="scen" bind:value={scenarioId} onchange={onScenarioChange}>
						{#each SCENARIOS as s (s.id)}
							<option value={s.id}>{s.id} — {s.context}</option>
						{/each}
					</select>
				</div>
				<div class="row">
					<div class="fld">
						<label for="fname">Preferred / first name</label>
						<input type="text" id="fname" placeholder="e.g. Marcus" autocomplete="off" bind:value={firstName} />
					</div>
					<div class="fld">
						<label for="linit">Last initial</label>
						<input type="text" id="linit" maxlength="1" placeholder="T" autocomplete="off" bind:value={lastInitial} />
					</div>
				</div>
				<p class="hint" style="margin-top:-4px;margin-bottom:12px;">
					Minimum necessary. No full legal name, SSN, ID, photo, or fingerprint.
				</p>
				<div class="fld">
					<label for="need">Immediate need</label>
					<input type="text" id="need" autocomplete="off" bind:value={need} />
				</div>
				<div class="fld">
					<label for="transport">Transportation to next place</label>
					<select id="transport" bind:value={transport}>
						{#each TRANSPORT_OPTIONS as option (option)}
							<option>{option}</option>
						{/each}
					</select>
				</div>
				<div class="fld">
					<div class="places-label">
						Matching places
						<span style="font-weight:400;color:var(--faint)">· from the synthetic directory, last-verified shown</span>
					</div>
					<div id="places">
						{#each matches as p (p.id)}
							<label class="place">
								<input type="radio" name="place" value={p.id} bind:group={placeId} />
								<div>
									<div class="pn">{p.name}</div>
									<div class="pm">{p.serves} · {p.area} · {p.contact}</div>
									<div class="tags">
										{#each p.acc as tag (tag)}
											<span class="tag">{tag}</span>
										{/each}
									</div>
									<div class="pv">✓ last verified {p.verified}</div>
								</div>
							</label>
						{/each}
					</div>
					<p class="hint">Filtered to who this person is eligible for. Pick one, then confirm by phone.</p>
				</div>
				<button class="btn" onclick={toConfirm}>Continue to confirmation →</button>
			</div>
		</div>

		<!-- STEP 2 -->
		<div class="block" class:dim={step === 'entry'} bind:this={confirmStepEl}>
			<div class="sec-h"><span class="step">2</span><h2>Confirm before issuing · human in the loop</h2></div>
			<div class="body">
				<div class="plan">
					<b>{displayName}</b> · {need.trim() || scenario.need}<br />
					Go to: <b>{place.name}</b> ({place.area}) · call {place.contact}<br />
					Owner: {scenario.owner} · ride: {transport}
				</div>
				<div class="emg">
					<span>🚨</span>
					<div>
						<b>Immediate safety risk? Stop.</b> This is not a handoff. Call 911 or the crisis line. Do
						not issue a card for an active emergency.
					</div>
				</div>
				<div id="gatechecks">
					<label class="check">
						<input type="checkbox" class="gc" bind:checked={c1} />
						<span><b>Confirmed:</b> {scenario.confirm}.</span>
					</label>
					<label class="check">
						<input type="checkbox" class="gc" bind:checked={c2} />
						<span>
							<b>Confirmed by phone ({place.contact}):</b>
							{place.name} can accept this person now (capacity is not live).
						</span>
					</label>
					<label class="check">
						<input type="checkbox" class="gc" bind:checked={c3} />
						<span>
							<b>Transportation arranged:</b>
							{transportArranged ? transport : "a named ride (currently 'not yet arranged')"}.
						</span>
					</label>
					<label class="check">
						<input type="checkbox" class="gc" bind:checked={c4} />
						<span>
							<b>Called ahead:</b> gave {place.name} the first name + code
							<code style="font-family:var(--mono)">{handoffCode}</code>.
						</span>
					</label>
				</div>
				<label class="check">
					<input type="checkbox" class="gc" bind:checked={consent} />
					<span><b>Person's consent obtained</b> to share this summary with the receiving agency.</span>
				</label>
				<button class="btn" disabled={!allChecked} style="margin-top:13px;" onclick={issue}>
					Issue handoff card
				</button>
			</div>
		</div>

		<!-- STEP 3 -->
		<div class="block" class:dim={step !== 'card'} bind:this={cardStepEl}>
			<div class="sec-h"><span class="step">3</span><h2>Handoff card</h2></div>
			<div class="body">
				<div class="hcard">
					<div class="hcard-top">
						<div class="nm">{displayName}</div>
						<div class="cd"><div class="l">Code</div><div class="v">{handoffCode}</div></div>
					</div>
					<div class="hrow"><div class="k">Needs</div><div class="v">{need.trim() || scenario.need}</div></div>
					<div class="hrow">
						<div class="k">Go to</div>
						<div class="v">{place.name}<span class="sub">{place.area} · call {place.contact}</span></div>
					</div>
					<div class="hrow warn">
						<div class="k">Before travel</div>
						<div class="v">Confirm {scenario.confirm} · <b>capacity not live, confirm by phone</b></div>
					</div>
					<div class="hrow"><div class="k">Ride</div><div class="v">{transport}</div></div>
					<div class="hrow">
						<div class="k">Owner</div>
						<div class="v">{scenario.owner} · follow up {scenario.window}</div>
					</div>
					<div class="hfoot">Match by first name + code. Person carries a copy. Synthetic demo, not a real record.</div>
				</div>
				<div class="cardactions">
					<button class="btn ghost" onclick={() => window.print()}>Print / share</button>
					<button class="btn" onclick={reset}>New handoff</button>
				</div>
				<details class="rev">
					<summary>For reviewers · data provenance &amp; rules compliance</summary>
					<div class="rc">
						<div class="prov">
							<span>scenario_id = {scenario.id}</span>
							<span>service_id = {place.id}</span>
							<span>is_synthetic = true</span>
							<span>capacity_is_not_live = true</span>
						</div>
						<ul class="rules" style="margin:0;padding-left:18px;">
							<li>
								<b>Synthetic only</b> (<code>is_synthetic=true</code>); providers are fictional, mapped to
								real categories.
							</li>
							<li><b>No live capacity</b> (<code>capacity_is_not_live=true</code>); phone confirmation required.</li>
							<li><b>No scoring, ranking, or profiling.</b></li>
							<li><b>Minimum identity:</b> first name + initial + code; no ID, photo, or biometric.</li>
							<li>
								<b>Feeds, does not replace, Coordinated Entry</b> (One Roof). Directory sourced from One
								Roof / 211 in production.
							</li>
							<li><b>Human confirms</b> availability, eligibility, transport, and consent before issue.</li>
						</ul>
					</div>
				</details>
			</div>
		</div>

		<p class="synbar">Demo scenario <b>{scenario.id}</b> · <code>is_synthetic=true</code> · One Roof / HMIS remains the system of record.</p>
	</div>
</div>

<style>
	.relay-card-page {
		/* Mapped onto the app's brand (teal) / signal (amber) scale from
		   src/routes/layout.css — see CLAUDE.md Architecture. brand = primary
		   flow, signal = needs-attention / caution, red = true emergency only. */
		--bg: var(--color-brand-50);
		--panel: #ffffff;
		--ink: var(--color-brand-950);
		--muted: var(--color-brand-700);
		--faint: var(--color-brand-400);
		--line: var(--color-brand-100);
		--line2: var(--color-brand-200);
		--accent: var(--color-brand-700);
		--accent-ink: var(--color-brand-800);
		--accent-soft: var(--color-brand-50);
		--warn: var(--color-signal-700);
		--warn-soft: var(--color-signal-50);
		--human: var(--color-signal-600);
		--red: #dc2626;
		--red-soft: #fef2f2;
		--red-line: #fecaca;
		--ok: var(--color-brand-600);
		--shadow: 0 2px 6px rgba(13, 33, 36, 0.06), 0 12px 30px rgba(13, 33, 36, 0.07);
		--font: var(--font-sans);
		--mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

		background: var(--bg);
		color: var(--ink);
		font-family: var(--font);
		line-height: 1.5;
		padding: 26px 16px 60px;
		-webkit-font-smoothing: antialiased;
	}
	.wrap {
		max-width: 560px;
		margin: 0 auto;
	}
	.eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 0 0 5px;
	}
	h1 {
		font-size: 1.5rem;
		margin: 0 0 4px;
		letter-spacing: -0.015em;
	}
	.lede {
		color: var(--muted);
		font-size: 0.93rem;
		margin: 0 0 14px;
	}

	details.help {
		margin-bottom: 18px;
		border: 1px solid var(--line2);
		border-radius: 11px;
		background: #fff;
	}
	details.help summary {
		cursor: pointer;
		padding: 11px 15px;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent-ink);
		list-style: none;
	}
	details.help summary::-webkit-details-marker {
		display: none;
	}
	details.help summary::before {
		content: '▸ ';
		color: var(--faint);
	}
	details.help[open] summary::before {
		content: '▾ ';
	}
	details.help .hc {
		padding: 0 16px 14px;
	}
	details.help ol {
		margin: 0;
		padding-left: 18px;
	}
	details.help li {
		font-size: 0.84rem;
		margin-bottom: 5px;
		color: var(--muted);
	}
	details.help li b {
		color: var(--ink);
	}

	.block {
		background: var(--panel);
		border: 1px solid var(--line2);
		border-radius: 16px;
		box-shadow: var(--shadow);
		padding: 18px 20px;
		margin-bottom: 16px;
	}
	.sec-h {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-bottom: 14px;
	}
	.sec-h .step {
		width: 22px;
		height: 22px;
		border-radius: 999px;
		background: var(--accent);
		color: #fff;
		font-size: 0.75rem;
		font-weight: 700;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
	}
	.sec-h h2 {
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--muted);
		margin: 0;
	}
	.block.dim {
		opacity: 0.5;
	}
	.block.dim .body {
		display: none;
	}

	.row {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.fld {
		flex: 1;
		min-width: 150px;
		margin-bottom: 12px;
	}
	.fld:last-child {
		margin-bottom: 0;
	}
	label,
	.places-label {
		display: block;
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--muted);
		margin-bottom: 5px;
	}
	input[type='text'],
	select {
		width: 100%;
		font-family: var(--font);
		font-size: 0.95rem;
		padding: 10px 12px;
		border: 1px solid var(--line2);
		border-radius: 9px;
		background: #fff;
		color: var(--ink);
	}
	input:focus,
	select:focus {
		outline: 2px solid var(--accent-soft);
		border-color: var(--accent);
	}
	select {
		appearance: none;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><path d='M1 1l5 5 5-5' fill='none' stroke='%2324575d' stroke-width='1.6'/></svg>");
		background-repeat: no-repeat;
		background-position: right 13px center;
	}
	.hint {
		font-size: 0.74rem;
		color: var(--faint);
		margin-top: 5px;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-family: var(--font);
		font-size: 0.92rem;
		font-weight: 600;
		padding: 12px 20px;
		border-radius: 11px;
		border: 1px solid var(--accent);
		background: var(--accent);
		color: #fff;
		cursor: pointer;
		transition: 0.15s;
		width: 100%;
	}
	.btn:hover {
		background: var(--accent-ink);
		border-color: var(--accent-ink);
	}
	.btn:disabled {
		background: #e4e8ee;
		border-color: #dbe1e9;
		color: #9aa4b2;
		cursor: not-allowed;
	}

	.place {
		display: flex;
		gap: 11px;
		align-items: flex-start;
		border: 1px solid var(--line2);
		border-radius: 10px;
		padding: 11px 13px;
		margin-bottom: 8px;
		cursor: pointer;
		transition: 0.12s;
	}
	.place:hover {
		border-color: var(--accent);
		background: var(--accent-soft);
	}
	.place input {
		margin-top: 3px;
		accent-color: var(--accent);
		flex: none;
	}
	.place .pn {
		font-size: 0.92rem;
		font-weight: 600;
	}
	.place .pm {
		font-size: 0.78rem;
		color: var(--muted);
		margin-top: 1px;
	}
	.place .pv {
		font-size: 0.7rem;
		color: var(--ok);
		font-weight: 600;
		margin-top: 3px;
	}
	.place .tags {
		margin-top: 4px;
	}
	.tag {
		display: inline-block;
		font-size: 0.68rem;
		background: var(--accent-soft);
		color: var(--accent-ink);
		border-radius: 999px;
		padding: 1px 8px;
		margin: 2px 4px 0 0;
	}

	.plan {
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 11px 13px;
		font-size: 0.85rem;
		margin-bottom: 12px;
	}
	.plan b {
		color: var(--accent-ink);
	}
	.emg {
		display: flex;
		gap: 9px;
		align-items: flex-start;
		background: var(--red-soft);
		border: 1px solid var(--red-line);
		border-radius: 10px;
		padding: 10px 13px;
		font-size: 0.82rem;
		color: #7f1d1d;
		margin-bottom: 13px;
	}
	.emg b {
		color: var(--red);
	}
	.check {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		padding: 7px 0;
		font-size: 0.88rem;
		cursor: pointer;
	}
	.check input {
		margin-top: 2px;
		width: 17px;
		height: 17px;
		accent-color: var(--human);
		flex: none;
		cursor: pointer;
	}
	.check b {
		color: var(--human);
	}

	.hcard {
		border: 1.5px solid var(--accent);
		border-radius: 14px;
		overflow: hidden;
	}
	.hcard-top {
		background: var(--accent);
		color: #fff;
		padding: 15px 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	.hcard-top .nm {
		font-size: 1.3rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.hcard-top .cd {
		text-align: right;
		flex: none;
	}
	.hcard-top .cd .l {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.8;
	}
	.hcard-top .cd .v {
		font-family: var(--mono);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.08em;
	}
	.hrow {
		display: flex;
		gap: 12px;
		padding: 12px 18px;
		border-bottom: 1px solid var(--line);
	}
	.hrow:last-of-type {
		border-bottom: 0;
	}
	.hrow .k {
		flex: none;
		width: 92px;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--faint);
		padding-top: 2px;
	}
	.hrow .v {
		font-size: 0.97rem;
	}
	.hrow .v .sub {
		display: block;
		font-size: 0.8rem;
		color: var(--muted);
		margin-top: 1px;
	}
	.hrow.warn {
		background: var(--warn-soft);
	}
	.hrow.warn .k {
		color: var(--warn);
	}
	.hrow.warn .v b {
		color: var(--warn);
	}
	.hfoot {
		padding: 10px 18px;
		background: var(--bg);
		font-size: 0.75rem;
		color: var(--faint);
		border-top: 1px solid var(--line);
	}
	.cardactions {
		display: flex;
		gap: 10px;
		margin-top: 14px;
	}
	.cardactions .btn {
		width: auto;
		flex: 1;
	}
	.btn.ghost {
		background: #fff;
		color: var(--accent-ink);
	}

	details.rev {
		margin-top: 14px;
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--bg);
	}
	details.rev summary {
		cursor: pointer;
		padding: 11px 14px;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--muted);
		list-style: none;
	}
	details.rev summary::-webkit-details-marker {
		display: none;
	}
	details.rev summary::before {
		content: '▸ ';
		color: var(--faint);
	}
	details.rev[open] summary::before {
		content: '▾ ';
	}
	details.rev .rc {
		padding: 0 15px 14px;
	}
	.prov {
		display: flex;
		gap: 7px;
		flex-wrap: wrap;
		margin: 2px 0 12px;
	}
	.prov span {
		font-family: var(--mono);
		font-size: 0.72rem;
		background: var(--bg);
		border: 1px solid var(--line2);
		border-radius: 6px;
		padding: 3px 8px;
		color: var(--muted);
	}
	.rules li {
		font-size: 0.83rem;
		margin-bottom: 6px;
	}
	.rules li b {
		color: var(--accent-ink);
	}
	.rules code {
		font-family: var(--mono);
		font-size: 0.85em;
		background: var(--bg);
		border: 1px solid var(--line2);
		border-radius: 4px;
		padding: 0 5px;
	}
	.synbar {
		font-size: 0.78rem;
		color: var(--muted);
		text-align: center;
		margin-top: 8px;
	}
	.synbar code {
		font-family: var(--mono);
	}
</style>
