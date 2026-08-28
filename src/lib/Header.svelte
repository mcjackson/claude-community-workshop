<script lang="ts">
	import { resolve } from '$app/paths';

	const home = resolve('/');
</script>

<header class="sticky top-0 z-50 border-b border-brand-100 bg-white/95 font-sans backdrop-blur">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
		<a href={home} class="flex items-center gap-2.5">
			<img src="/cg-icon.png" alt="" class="h-9 w-9 object-contain" aria-hidden="true" />
			<span class="text-lg font-bold tracking-tight text-brand-950">CareGrid</span>
		</a>

		<div class="hidden items-center gap-6 text-sm font-medium text-brand-700 md:flex">
			<a href="{home}#directory" class="transition hover:text-brand-950">Directory</a>
			<a href="{home}#how-it-works" class="transition hover:text-brand-950">How it works</a>
			<a href="{home}#hotlines" class="transition hover:text-brand-950">Hotlines</a>
		</div>

		<div class="flex items-center gap-2">
			<span
				class="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:inline-block"
			>
				For First Responders
			</span>
			<a
				href={resolve('/relay-card')}
				class="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-800"
			>
				Relay Card
			</a>
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
