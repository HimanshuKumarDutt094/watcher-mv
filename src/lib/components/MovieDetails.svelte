<!-- src/routes/MovieDetails.svelte -->

<script>
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	import magnetURL from '$lib/magnetStore.js';
	export let movieId;
	let MOVIE_BACKDROP = import.meta.env.VITE_MOVIE_BACKDROP_LINK;
	const corsAnywhereUrl = 'https://creepy-red-fossa.cyclic.app/';
	let MOVIE_POSTER = import.meta.env.VITE_MOVIE_POSTER_LINK;
	let backgroundImage = 'none';
	let movieDetails = null;
	let torrents;
	const fetchMovieDetails = async () => {
		const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
		const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
		const data = await response.json();
		movieDetails = data;

		try {
			let torrentsData = localStorage.getItem(`torrents-${movieDetails.imdb_id}`);
			if (!torrentsData) {
				const torrentsResponse = await fetch(
					corsAnywhereUrl + `?search=${movieDetails.imdb_id}&lang=1&nox=2`
				);
				const respondedtorrent = await torrentsResponse.json();
				console.log('torrent response', respondedtorrent);
				if (torrentsResponse.ok && respondedtorrent.torrent != '') {
					torrentsData = respondedtorrent;
					console.log('torrent data response ok setting local ');
					localStorage.setItem(`torrents-${movieDetails.imdb_id}`, JSON.stringify(torrentsData));
				} else {
					alert('No torrents found for this movie try reloading or selectng another movie');
					console.error('Error fetching torrents data:', torrentsResponse.status);
				}
			} else if (torrentsData && torrentsData.torrent != '') {
				console.log('torrent data in local ');
				torrentsData = JSON.parse(torrentsData);
			}
			torrents = torrentsData.torrent;

			console.log('torrent data in local ', torrents);
		} catch (error) {
			console.error(error);
		}
	};
	onMount(fetchMovieDetails);
	$: backgroundImage = movieDetails
		? `url(${MOVIE_BACKDROP + movieDetails.backdrop_path})`
		: 'none';
	onMount(() => {
		let currentvideo = localStorage.getItem('videoplay');
		let videolink = localStorage.getItem('magnet');
		if (browser && currentvideo) {
			playTorrent = !playTorrent;
			playSelectedTorrent = true;
			runtor(videolink);
			localStorage.setItem('videoplay', false);
		}
	});
	onDestroy(() => {
		if (browser && window.location.pathname !== `/player/${movieId}`) {
			localStorage.setItem('videoplay', false);
			localStorage.setItem('magnet', '');
		}
	});
	function runtor(mag) {
		if (browser) {
			if (window.webtor) {
				const windows = window.webtor;
				windows.push({
					id: 'player',
					magnet: mag,
					on: function (e) {
						if (e.name == window.webtor.TORRENT_FETCHED) {
							console.log('Torrent fetched!');
						}
						if (e.name == window.webtor.TORRENT_ERROR) {
							console.log('Torrent error!');
							document.getElementById('playerText').innerHTML =
								'Error: The player failed to initialize.';
						}
					},
					poster: 'https://i.imgur.com/DCdBXcq.png',
					subtitles: [],
					lang: 'en',
					i18n: {
						en: {
							common: {
								'prepare to play': 'Preparing Video Stream... Please Wait...'
							},
							stat: {
								seeding: 'Seeding',
								waiting: 'Client initialization',
								'waiting for peers': 'Waiting for peers',
								from: 'from'
							}
						}
					}
				});
			}
		} else {
		}
	}
	let playTorrent = false;
	let playSelectedTorrent = false;
	function handleClick() {
		localStorage.setItem('videoplay', playSelectedTorrent);
		localStorage.setItem('magnet', $magnetURL);
	}
</script>

<div>
	{#if movieDetails}
		<section
			style="background-image: {backgroundImage}"
			class="relative bgImage bg-cover bg-center bg-no-repeat"
		>
			<div
				class="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
			></div>

			<div
				class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
			>
				<div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
					<h1 class="text-3xl font-extrabold sm:text-5xl">
						{movieDetails.title}

						<p class="mt-4 max-w-lg sm:text-xl/relaxed">
							{movieDetails.overview}
						</p>

						<div class="mt-8 flex flex-wrap gap-4 text-center">
							<button
								type="button"
								on:click={() => {
									playTorrent = !playTorrent;
								}}
								class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
							>
								Watch Now
							</button>

							<a
								href="${movieDetails.trailer_link}"
								class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
							>
								Trailer
							</a>
						</div>
					</h1>
				</div>
			</div>
		</section>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
{#if torrents && playTorrent}
	<div class="grid grid-cols-1 sm:grid-cols-3 bg-slate-600">
		{#each torrents as tr, i}
			<div class="p-4">
				<div
					class="grid grid-cols-2 p-3 rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden"
				>
					<img
						class="lg:h-48 md:h-36 mr-auto rounded-xl mt-2 ml-auto scale-110 transition-all duration-400 hover:scale-100"
						src={MOVIE_POSTER + movieDetails.poster_path}
						alt="blog"
					/>
					<div class="p-6">
						<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
							{movieDetails.genres[0].name}
							{movieDetails.genres[1].name}
							{movieDetails.genres[2].name}
						</h2>
						<h1
							title={tr.title}
							class="title-font line-clamp-4 overflow-hidden text-lg font-medium text-gray-600 mb-3"
						>
							{tr.title}
						</h1>
						<div class="flex justify-end items-end">
							Sedeers: {tr.seed} | Leechers: {tr.leech} | Size: {tr.size}
						</div>

						<div class="flex items-center flex-wrap">
							<button
								on:click|preventDefault={() => {
									if (browser) {
										magnetURL.set(tr.magnet);
										playTorrent = !playTorrent;
										playSelectedTorrent = !playSelectedTorrent;
										handleClick();
										location.reload();
									}
								}}
								class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg"
								>Play</button
							>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<div
	id="player"
	class={playSelectedTorrent ? 'flex justify-center items-center bg-gray-900' : 'hidden'}
></div>
