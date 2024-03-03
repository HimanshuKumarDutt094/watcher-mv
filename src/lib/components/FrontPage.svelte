<script>
	import { goto } from '$app/navigation';
	import FrontPage from '$lib/components/FrontPage.svelte';
	let TMDB_API = import.meta.env.VITE_MOVIE_API_KEY;
	// Get the data prop from the load function
	export let data;

	// Define the base URL for the poster images
	let MOVIE_POSTER = import.meta.env.VITE_MOVIE_POSTER_LINK;
	const base_url = MOVIE_POSTER;
</script>

<div class=" gap-2 scroller h-full w-full bg-slate-600" data-animated="true">
	<h2 class="text-center text-5xl p-3">Popular Right Now</h2>
	<div data-sveltekit-reload class="scroller_inner w-full gap-12 ml-12 mr-12 flex flex-wrap">
		{#each data.results as movie}
			<a
				href="/player/{movie.id}"
				class=" bg-slate-600 w-auto h-full py-6 flex flex-col justify-center sm:py-12"
			>
				<!-- component -->
				<div class="py-3 sm:max-w-xl sm:mx-auto">
					<div
						class="bg-white shadow-lg border-gray-100 max-h-80 border sm:rounded-3xl p-8 flex space-x-8"
					>
						<div class=" overflow-visible w-1/2">
							<img
								class="rounded-3xl h-[17em] w-[12em] shadow-lg"
								src="{base_url}{movie.poster_path}"
								alt={movie.title}
							/>
						</div>
						<div class="flex flex-col w-1/2 space-y-4">
							<div class="flex justify-between items-start">
								<h2 title={movie.title} class="text-3xl font-bold line-clamp-2 h-[4.5rem]">
									{movie.title}
								</h2>
								<div class="bg-yellow-400 font-bold rounded-xl p-2">7.2</div>
							</div>
							<br />
							<div>
								<div class="text-lg text-gray-800">{movie.release_date}</div>
							</div>
							<p
								title={movie.overview}
								class=" text-gray-400 max-h-40 overflow-y-hidden line-clamp-4"
							>
								{movie.overview}
							</p>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.scroller[data-animated='true'] {
		overflow: hidden;
		-webkit-mask: linear-gradient(
			90deg,
			transparent,
			rgb(91, 141, 170) 20%,
			rgb(154, 145, 235) 80%,
			transparent
		);
		mask: linear-gradient(
			90deg,
			rgba(211, 63, 63, 0.274),
			rgb(166, 173, 235) 20%,
			rgb(133, 123, 231) 80%,
			rgba(211, 63, 63, 0.574)
		);
	}

	.scroller[data-animated='true'] .scroller_inner {
		width: max-content;
		flex-wrap: nowrap;
		animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear
			infinite;
	}
	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}
</style>
