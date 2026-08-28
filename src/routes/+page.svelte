<script lang="ts">
	import { resolve } from '$app/paths';

	type Category = {
		name: string;
		description: string;
		icon: 'shelter' | 'food' | 'medical' | 'crisis' | 'substance' | 'weather' | 'id' | 'case';
	};

	const categories: Category[] = [
		{
			name: 'Emergency Shelter',
			description: 'Same-night beds, family and youth intake, DV-safe placements.',
			icon: 'shelter'
		},
		{
			name: 'Food & Meals',
			description: 'Hot meals, pantries, and mobile food units open right now.',
			icon: 'food'
		},
		{
			name: 'Medical Care',
			description: 'Street medicine teams, urgent care, and wound follow-up.',
			icon: 'medical'
		},
		{
			name: 'Mental Health & Crisis',
			description: 'Mobile crisis response and walk-in behavioral health.',
			icon: 'crisis'
		},
		{
			name: 'Substance Use Support',
			description: 'Detox beds, harm reduction, and same-day treatment referral.',
			icon: 'substance'
		},
		{
			name: 'Warming & Cooling Centers',
			description: 'Extreme-weather sites with hours and current capacity.',
			icon: 'weather'
		},
		{
			name: 'ID & Documents',
			description: 'Help replacing ID, birth certificates, and benefit paperwork.',
			icon: 'id'
		},
		{
			name: 'Case Management',
			description: 'Warm handoff to an outreach worker for ongoing follow-up.',
			icon: 'case'
		}
	];

	const stats: { value: string; label: string }[] = [
		{ value: '24/7', label: 'Dispatch coverage' },
		{ value: '340+', label: 'Partner service sites' },
		{ value: '<6 min', label: 'Avg. outreach response' },
		{ value: '19', label: 'Counties connected' }
	];

	const steps: { title: string; description: string }[] = [
		{
			title: 'Identify the need',
			description: 'Pick the category that fits the situation — shelter, medical, crisis, or otherwise.'
		},
		{
			title: 'See what’s open now',
			description: 'Live hours, capacity, and eligibility for every nearby site, filtered to your location.'
		},
		{
			title: 'Connect directly',
			description: 'Call, text, or request a warm handoff to an outreach worker without leaving the scene.'
		}
	];

	const hotlines: { name: string; number: string; note: string }[] = [
		{ name: 'Regional Dispatch', number: '211', note: 'Non-emergency services & shelter intake' },
		{ name: '988 Suicide & Crisis Lifeline', number: '988', note: 'Call or text, 24/7' },
		{ name: 'Mobile Crisis Outreach', number: '(555) 019-2843', note: 'On-scene behavioral health support' },
		{ name: 'National Human Trafficking Hotline', number: '1-888-373-7888', note: 'Confidential, 24/7' }
	];
</script>

<svelte:head>
	<title>CareGrid — First Responder Services Finder</title>
	<meta
		name="description"
		content="CareGrid helps first responders connect people experiencing homelessness to shelter, food, medical, and crisis services in real time."
	/>
</svelte:head>

<div class="min-h-screen bg-white font-sans text-brand-950 antialiased">
	<!-- Header -->
	<header class="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
		<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
			<a href="/" class="flex items-center gap-2.5">
				<span
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white"
					aria-hidden="true"
				>
					<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
						<path
							d="M3 21V10L12 3L21 10V21H14V15H10V21H3Z"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				<span class="text-lg font-bold tracking-tight text-brand-950">CareGrid</span>
			</a>

			<div class="hidden items-center gap-6 text-sm font-medium text-brand-700 md:flex">
				<a href="#services" class="transition hover:text-brand-950">Services</a>
				<a href="#how-it-works" class="transition hover:text-brand-950">How it works</a>
				<a href="#hotlines" class="transition hover:text-brand-950">Hotlines</a>
				<a href={resolve('/handoff')} class="transition hover:text-brand-950">Handoff Card</a>
			</div>

			<div class="flex items-center gap-2">
				<span
					class="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:inline-block"
				>
					For First Responders
				</span>
				<a
					href="tel:911"
					class="inline-flex items-center gap-1.5 rounded-lg bg-signal-500 px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-signal-600"
				>
					<svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
						<path
							d="M4 5C4 4.44772 4.44772 4 5 4H8.5L10 8.5L7.8 10.2C8.7 12.2 10.3 13.8 12.3 14.7L14 12.5L18.5 14V17.5C18.5 18.0523 18.0523 18.5 17.5 18.5C10.0442 18.5 4 12.4558 4 5Z"
							stroke="currentColor"
							stroke-width="1.7"
							stroke-linejoin="round"
						/>
					</svg>
					911
				</a>
			</div>
		</div>
	</header>

	<!-- Hero -->
	<section class="relative overflow-hidden bg-brand-950">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(78,163,169,0.35),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(253,126,15,0.18),transparent_45%)]"
			aria-hidden="true"
		></div>
		<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
			<div class="max-w-2xl">
				<p class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-100 uppercase">
					<span class="h-1.5 w-1.5 rounded-full bg-signal-400"></span>
					Live service directory
				</p>
				<h1 class="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
					Connect someone to help — right where you're standing.
				</h1>
				<p class="mt-5 text-lg leading-relaxed text-brand-100">
					CareGrid gives first responders real-time access to shelter, food, medical, and crisis
					services near an encounter, so no one has to wait for a callback to get help.
				</p>
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<a
						href="#services"
						class="inline-flex items-center justify-center rounded-lg bg-signal-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-signal-900/30 transition hover:bg-signal-600"
					>
						Find Services Near Me
					</a>
					<a
						href="#how-it-works"
						class="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
					>
						How it works
					</a>
				</div>
			</div>
		</div>

		<!-- Stats strip -->
		<div class="relative border-t border-white/10 bg-black/15">
			<dl class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
				{#each stats as stat (stat.label)}
					<div>
						<dt class="text-xs font-medium tracking-wide text-brand-200 uppercase">{stat.label}</dt>
						<dd class="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<!-- Service categories -->
	<section id="services" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="max-w-2xl">
			<h2 class="text-sm font-bold tracking-wide text-brand-600 uppercase">What do they need?</h2>
			<p class="mt-2 text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
				Search by service, not by directory.
			</p>
			<p class="mt-3 text-base text-brand-700">
				Every category below filters to sites that are open now, near your location, with capacity
				to take a referral.
			</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each categories as category (category.name)}
				<button
					type="button"
					class="group flex flex-col rounded-xl border border-brand-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
				>
					<span
						class="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white"
						aria-hidden="true"
					>
						<svg viewBox="0 0 24 24" fill="none" class="h-5.5 w-5.5">
							{#if category.icon === 'shelter'}
								<path
									d="M3 21V10L12 3L21 10V21H14V15H10V21H3Z"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linejoin="round"
								/>
							{:else if category.icon === 'food'}
								<path
									d="M6 3V10.5M9 3V10.5M6 10.5C6 12 7.2 13 9 13V21M9 3C7 3 6 5 6 7.5C6 9 6.8 10.5 9 10.5"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M16 3C14 3 13.5 6 13.5 9C13.5 11 14.5 12 16 12V21"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							{:else if category.icon === 'medical'}
								<path
									d="M12 21C12 21 4 15.5 4 9.8C4 6.6 6.4 4.5 9 4.5C10.5 4.5 11.5 5.2 12 6.1C12.5 5.2 13.5 4.5 15 4.5C17.6 4.5 20 6.6 20 9.8C20 15.5 12 21 12 21Z"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linejoin="round"
								/>
								<path
									d="M9.5 11H11.2L12 9L13 13L13.8 11H15.5"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							{:else if category.icon === 'crisis'}
								<path
									d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 16 17 19 13 19.8V22L9.5 19.6C6.3 18.6 4 15.6 4 12Z"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linejoin="round"
								/>
								<path
									d="M9 12H9.01M12 12H12.01M15 12H15.01"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
								/>
							{:else if category.icon === 'substance'}
								<path
									d="M10 3H14M11 3V8.5L6.5 17C5.8 18.3 6.7 20 8.2 20H15.8C17.3 20 18.2 18.3 17.5 17L13 8.5V3"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linejoin="round"
								/>
								<path d="M8 15H16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
							{:else if category.icon === 'weather'}
								<path
									d="M12 3V5M12 19V21M4.2 4.2L5.6 5.6M18.4 18.4L19.8 19.8M3 12H5M19 12H21M4.2 19.8L5.6 18.4M18.4 5.6L19.8 4.2"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linecap="round"
								/>
								<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7" />
							{:else if category.icon === 'id'}
								<rect
									x="3.5"
									y="5.5"
									width="17"
									height="13"
									rx="1.8"
									stroke="currentColor"
									stroke-width="1.7"
								/>
								<circle cx="9" cy="11" r="1.8" stroke="currentColor" stroke-width="1.5" />
								<path
									d="M6.5 15.5C6.5 14 7.6 13.3 9 13.3C10.4 13.3 11.5 14 11.5 15.5"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
								<path d="M14 9.5H17.5M14 12.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							{:else if category.icon === 'case'}
								<circle cx="9" cy="8" r="2.5" stroke="currentColor" stroke-width="1.7" />
								<path
									d="M4 19C4 15.7 6.3 14 9 14C11.7 14 14 15.7 14 19"
									stroke="currentColor"
									stroke-width="1.7"
									stroke-linecap="round"
								/>
								<circle cx="17" cy="9" r="2" stroke="currentColor" stroke-width="1.5" />
								<path
									d="M14.5 19C14.5 16.3 15.9 15 18 15C19.9 15 21 16.1 21 18.3"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							{/if}
						</svg>
					</span>
					<h3 class="mt-4 text-base font-bold text-brand-950">{category.name}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-brand-700">{category.description}</p>
					<span
						class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-signal-600"
					>
						View nearby sites
						<svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 transition group-hover:translate-x-0.5">
							<path
								d="M5 12H19M19 12L13 6M19 12L13 18"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- How it works -->
	<section id="how-it-works" class="bg-brand-50">
		<div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
			<h2 class="text-sm font-bold tracking-wide text-brand-600 uppercase">How it works</h2>
			<p class="mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
				Three steps, built for the field.
			</p>

			<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
				{#each steps as step, i (step.title)}
					<div class="relative">
						<span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
							{i + 1}
						</span>
						<h3 class="mt-4 text-lg font-bold text-brand-950">{step.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-brand-700">{step.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Hotlines -->
	<section id="hotlines" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="max-w-2xl">
			<h2 class="text-sm font-bold tracking-wide text-brand-600 uppercase">Can't wait? Call now.</h2>
			<p class="mt-2 text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
				Direct lines for urgent situations.
			</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each hotlines as hotline (hotline.name)}
				<div class="flex items-center justify-between gap-4 rounded-xl border border-brand-100 bg-white p-5">
					<div>
						<p class="text-sm font-bold text-brand-950">{hotline.name}</p>
						<p class="mt-0.5 text-sm text-brand-700">{hotline.note}</p>
					</div>
					<a
						href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
						class="shrink-0 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
					>
						{hotline.number}
					</a>
				</div>
			{/each}
		</div>
	</section>

	<!-- CTA banner -->
	<section class="bg-brand-950">
		<div class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
			<h2 class="text-2xl font-extrabold text-white sm:text-3xl">
				CareGrid is built with outreach teams, not instead of them.
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-brand-100">
				Every referral routes to a real case worker who follows up within 24 hours.
			</p>
			<a
				href={resolve('/handoff')}
				class="mt-8 inline-flex items-center justify-center rounded-lg bg-signal-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-signal-900/30 transition hover:bg-signal-600"
			>
				Start a Referral
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-brand-100 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
				<div class="flex items-center gap-2.5">
					<span
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white"
						aria-hidden="true"
					>
						<svg viewBox="0 0 24 24" fill="none" class="h-4.5 w-4.5">
							<path
								d="M3 21V10L12 3L21 10V21H14V15H10V21H3Z"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<span class="text-base font-bold text-brand-950">CareGrid</span>
				</div>
				<p class="text-sm text-brand-700">
					In a life-threatening emergency, always call <span class="font-semibold text-brand-950">911</span> first.
				</p>
			</div>
			<p class="mt-6 text-xs text-brand-400">
				&copy; 2026 CareGrid Response Network. Built for first responders and outreach teams.
			</p>
		</div>
	</footer>
</div>
