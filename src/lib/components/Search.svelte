<!-- src/routes/MovieSearch.svelte -->
<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let MOVIE_POSTER = import.meta.env.VITE_MOVIE_POSTER_LINK;
	let TMDB_API = import.meta.env.VITE_MOVIE_API_KEY;

	let query = '';
	let results = [];

	const searchMovies = async () => {
	
		const apiKey = TMDB_API;
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
		);
		const data = await response.json();
		results = data.results;
	};
</script>

<div>
	<input bind:value={query} placeholder="Search for movies" />
	<button on:click={searchMovies}>Search</button>

	{#if results.length > 0}
		<ul>
			{#each results as movie (movie.id)}
				<button
					type="button"
					on:click={goto(`/player/${movie.title}x${movie.id}`)}
				>
					<li>{movie.title}</li>
					<img src={MOVIE_POSTER + movie.poster_path} alt="" />
				</button>
			{/each}
		</ul>
	{:else}
		<p>No results found.</p>
	{/if}
</div>
