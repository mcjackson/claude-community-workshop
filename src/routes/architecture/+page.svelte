<svelte:head>
	<title>CareGrid — Architecture</title>
</svelte:head>

<div class="architecture-page">
	<div class="wrap">
		<header class="page">
			<p class="eyebrow">CareGrid · Homelessness Services Handoff</p>
			<h1><span class="accent">Warm Handoff</span> — Architecture</h1>
			<p class="lede">Birmingham homelessness-services hackathon project</p>
		</header>

		<div class="scrollpane">
			<div class="canvas">
				<!-- ROLES -->
				<div class="roles">
					<div class="role convener">
						<span class="tag">Convener</span>
						<h3>One Roof / Host Foundation</h3>
						<p>CoC lead. Owns the tool, maintains the service directory.</p>
					</div>
					<div class="role sender">
						<span class="tag">Sender</span>
						<h3>Frontline Responder</h3>
						<p>ER, shelter intake, outreach, 211, police. Creates the handoff card.</p>
					</div>
					<div class="role receiver">
						<span class="tag">Receiver</span>
						<h3>Receiving Agency</h3>
						<p>Reads the card to continue care. No account needed.</p>
					</div>
				</div>

				<div class="role-arrows">
					<svg viewBox="0 0 100 26" preserveAspectRatio="none">
						<defs>
							<marker id="arrowConvener" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
								<path d="M0,0 L8,4 L0,8 Z" fill="var(--convener-line)" />
							</marker>
						</defs>
						<line x1="50" y1="0" x2="50" y2="20" stroke="var(--convener-line)" stroke-width="2" marker-end="url(#arrowConvener)" />
					</svg>
					<svg viewBox="0 0 100 26" preserveAspectRatio="none">
						<defs>
							<marker id="arrowSender" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
								<path d="M0,0 L8,4 L0,8 Z" fill="var(--sender-line)" />
							</marker>
						</defs>
						<line x1="50" y1="0" x2="50" y2="20" stroke="var(--sender-line)" stroke-width="2" marker-end="url(#arrowSender)" />
					</svg>
					<svg viewBox="0 0 100 26" preserveAspectRatio="none">
						<defs>
							<marker id="arrowReceiverUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
								<path d="M0,8 L8,4 L0,0 Z" fill="var(--receiver-line)" />
							</marker>
						</defs>
						<line x1="50" y1="20" x2="50" y2="0" stroke="var(--receiver-line)" stroke-width="2" marker-end="url(#arrowReceiverUp)" />
					</svg>
				</div>

				<!-- TOOL -->
				<div class="tool-box">
					<div class="tool-title">
						<strong>Warm Handoff</strong>
						<span>ephemeral, browser-based handoff card tool — no client database</span>
					</div>

					<div class="components">
						<div class="comp">
							<div class="icon">🖊️</div>
							<h4>Card Generator</h4>
							<p>Front-end web form. Sender fills it in; nothing saves server-side as they type.</p>
						</div>

						<div class="comp">
							<div class="icon">📇</div>
							<h4>Synthetic Service Directory</h4>
							<p>
								Clearly-synthetic providers, "last verified" dates. Maintained by convener; production
								sources from One Roof / 211.
							</p>
						</div>

						<div class="comp">
							<div class="icon">⏱️</div>
							<h4>Card Instance</h4>
							<p>In-memory only. Rendered, shared, then purged after use. Never written to a client database.</p>
						</div>

						<div class="comp">
							<div class="icon">📤</div>
							<h4>Sharing</h4>
							<p>Printout or secure expiring link. Receiver needs no login, no account.</p>
						</div>
					</div>

					<div class="components components-half">
						<div class="comp negative">
							<div class="icon no-icon">🚫</div>
							<h4>No Client Database</h4>
							<p>Warm Handoff persists nothing about the client after the card is issued.</p>
						</div>
						<div class="comp negative">
							<div class="icon no-icon">🚫</div>
							<h4>No HMIS Write</h4>
							<p>The tool never writes into HMIS. It is a bridge, not a data source.</p>
						</div>
					</div>
				</div>

				<!-- PRIVACY STRIP -->
				<div class="privacy">
					<p class="section-label">Data Privacy Properties</p>
					<ul>
						<li>Minimum-necessary identity: first name + last initial + code</li>
						<li>Consent obtained before sharing</li>
						<li>No scoring or risk ranking</li>
						<li>No biometrics</li>
						<li>Human confirmation before issue</li>
					</ul>
				</div>

				<!-- ARROW DOWN TO SoR -->
				<div class="down-arrows">
					<svg width="140" height="30" viewBox="0 0 140 30" style="overflow: visible;">
						<defs>
							<marker id="arrowFeed" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
								<path d="M0,0 L9,4.5 L0,9 Z" fill="var(--sor-line)" />
							</marker>
						</defs>
						<line x1="70" y1="0" x2="70" y2="22" stroke="var(--sor-line)" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#arrowFeed)" />
					</svg>
				</div>

				<!-- SYSTEM OF RECORD -->
				<div class="sor">
					<p class="section-label">System of Record Boundary</p>
					<div class="sor-inner">
						<div class="sor-card">
							<span class="sor-badge">Authoritative</span>
							<h4>One Roof / HMIS</h4>
							<p>Remains the single system of record for client data and case history.</p>
						</div>
						<div class="sor-card">
							<span class="sor-badge">Unchanged</span>
							<h4>Coordinated Entry</h4>
							<p>Warm Handoff feeds into it — it never replaces or bypasses the CE process.</p>
						</div>
					</div>
					<p class="feeds-caption">Warm Handoff feeds One Roof / HMIS. It does not replace it.</p>
				</div>
			</div>
		</div>

		<footer class="page">
			Synthetic demonstration. Feeds — does not replace — Coordinated Entry (<strong>One Roof</strong>).
		</footer>
	</div>
</div>

<style>
	.architecture-page {
		/* teal maps onto the app's brand scale; sender maps onto signal (amber).
		   convener/receiver/system-of-record are a role-differentiation legend,
		   not app UI states, so they keep their own distinct hues — see
		   CLAUDE.md Architecture and the emergency-red precedent in /relay-card. */
		--bg: var(--color-brand-50);
		--card: #ffffff;
		--ink: var(--color-brand-950);
		--sub: var(--color-brand-700);
		--line: var(--color-brand-100);
		--teal: var(--color-brand-700);
		--teal-soft: var(--color-brand-50);
		--teal-line: var(--color-brand-300);
		--teal-ink: var(--color-brand-800);

		--sender: var(--color-signal-50);
		--sender-line: var(--color-signal-300);
		--sender-ink: var(--color-signal-700);

		--convener: #eaf0fc;
		--convener-line: #b8c9ee;
		--convener-ink: #33508f;

		--receiver: #f1eafb;
		--receiver-line: #cdb7ee;
		--receiver-ink: #6b3fa0;

		--sor-bg: #fdeceb;
		--sor-line: #e7a9a2;
		--sor-ink: #9c3b31;

		background: var(--bg);
		color: var(--ink);
		font-family: var(--font-sans);
		padding: 20px 14px 28px;
	}

	.wrap {
		max-width: 900px;
		margin: 0 auto;
	}

	header.page {
		text-align: center;
		margin-bottom: 18px;
	}

	.eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--teal);
		margin: 0 0 6px;
	}

	header.page h1 {
		margin: 0 0 4px;
		font-size: 1.35rem;
		letter-spacing: -0.01em;
	}

	header.page .accent {
		color: var(--teal);
	}

	.lede,
	header.page p {
		margin: 0;
		color: var(--sub);
		font-size: 0.85rem;
	}

	.scrollpane {
		overflow-x: auto;
		padding-bottom: 4px;
	}

	.canvas {
		min-width: 540px;
	}

	.section-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--sub);
		margin: 0 0 8px;
		text-align: center;
	}

	/* ---------- roles row ---------- */
	.roles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-bottom: 8px;
	}

	.role {
		border-radius: 12px;
		border: 1.5px solid var(--line);
		box-shadow: 0 1px 2px rgba(13, 33, 36, 0.06), 0 4px 14px rgba(13, 33, 36, 0.06);
		padding: 10px 10px 11px;
		text-align: center;
	}

	.role .tag {
		display: inline-block;
		font-size: 0.62rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 7px;
		border-radius: 999px;
		margin-bottom: 5px;
	}

	.role h3 {
		margin: 0 0 3px;
		font-size: 0.88rem;
	}

	.role p {
		margin: 0;
		font-size: 0.72rem;
		color: var(--sub);
		line-height: 1.35;
	}

	.role.convener {
		background: var(--convener);
		border-color: var(--convener-line);
	}
	.role.convener .tag {
		background: var(--convener-line);
		color: var(--convener-ink);
	}

	.role.sender {
		background: var(--sender);
		border-color: var(--sender-line);
	}
	.role.sender .tag {
		background: var(--sender-line);
		color: var(--sender-ink);
	}

	.role.receiver {
		background: var(--receiver);
		border-color: var(--receiver-line);
	}
	.role.receiver .tag {
		background: var(--receiver-line);
		color: var(--receiver-ink);
	}

	.role-arrows {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		height: 26px;
		margin-bottom: 2px;
	}
	.role-arrows svg {
		width: 100%;
		height: 100%;
		display: block;
		overflow: visible;
	}

	/* ---------- tool box ---------- */
	.tool-box {
		background: var(--teal-soft);
		border: 1.5px solid var(--teal-line);
		border-radius: 14px;
		box-shadow: 0 1px 2px rgba(13, 33, 36, 0.06), 0 4px 14px rgba(13, 33, 36, 0.06);
		padding: 12px;
		margin-bottom: 4px;
	}

	.tool-title {
		text-align: center;
		margin: 0 0 10px;
	}

	.tool-title strong {
		color: var(--teal);
		font-size: 0.95rem;
		letter-spacing: -0.01em;
	}

	.tool-title span {
		display: block;
		font-size: 0.68rem;
		color: var(--sub);
		margin-top: 1px;
	}

	.components {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}

	@media (min-width: 620px) {
		.components {
			grid-template-columns: repeat(4, 1fr);
		}
		.components.components-half {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.components-half {
		margin-top: 8px;
	}

	.comp {
		background: #ffffff;
		border: 1px solid var(--teal-line);
		border-radius: 10px;
		padding: 8px 8px 9px;
		text-align: center;
	}

	.comp .icon {
		font-size: 1.1rem;
		line-height: 1;
		margin-bottom: 4px;
	}

	.comp h4 {
		margin: 0 0 3px;
		font-size: 0.74rem;
		color: var(--ink);
	}

	.comp p {
		margin: 0;
		font-size: 0.66rem;
		color: var(--sub);
		line-height: 1.3;
	}

	.comp.negative {
		background: #fbfbfc;
		border-style: dashed;
		border-color: #c3cad4;
	}
	.comp.negative h4 {
		color: #6b7480;
	}

	.no-icon {
		color: #b23b3b;
	}

	.down-arrows {
		display: flex;
		justify-content: center;
		margin: 2px 0 2px;
	}

	/* ---------- privacy strip ---------- */
	.privacy {
		background: #ffffff;
		border: 1px dashed var(--teal-line);
		border-radius: 12px;
		padding: 8px 12px;
		margin: 10px 0 14px;
	}

	.privacy .section-label {
		margin-bottom: 6px;
	}

	.privacy ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 10px;
		justify-content: center;
	}

	.privacy li {
		font-size: 0.68rem;
		color: var(--teal-ink);
		background: var(--teal-soft);
		border: 1px solid var(--teal-line);
		border-radius: 999px;
		padding: 3px 9px;
		white-space: nowrap;
	}

	/* ---------- system of record boundary ---------- */
	.sor {
		background: var(--sor-bg);
		border: 2px dashed var(--sor-line);
		border-radius: 14px;
		padding: 12px;
		box-shadow: 0 1px 2px rgba(13, 33, 36, 0.06), 0 4px 14px rgba(13, 33, 36, 0.06);
	}

	.sor .section-label {
		color: var(--sor-ink);
	}

	.sor-inner {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: stretch;
		justify-content: center;
	}

	.sor-card {
		background: #ffffff;
		border: 1px solid var(--sor-line);
		border-radius: 10px;
		padding: 9px 12px;
		flex: 1 1 220px;
		max-width: 320px;
	}

	.sor-card h4 {
		margin: 0 0 4px;
		font-size: 0.8rem;
		color: var(--sor-ink);
	}

	.sor-card p {
		margin: 0;
		font-size: 0.7rem;
		color: var(--sub);
		line-height: 1.35;
	}

	.sor-badge {
		display: inline-block;
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #ffffff;
		background: var(--sor-ink);
		border-radius: 999px;
		padding: 2px 8px;
		margin-bottom: 6px;
	}

	.feeds-caption {
		text-align: center;
		font-size: 0.68rem;
		color: var(--sor-ink);
		margin: 6px 0 0;
		font-weight: 600;
	}

	footer.page {
		text-align: center;
		margin-top: 16px;
		font-size: 0.68rem;
		color: var(--sub);
		line-height: 1.5;
	}

	footer.page strong {
		color: var(--teal);
	}
</style>
