<script>
	import MovieDetails from '$lib/components/MovieDetails.svelte';
	import { page } from '$app/stores';
	import TorrentioStream from '$lib/TorrentioStream.svelte';
	let title = $page.params.movieTitle,
		movieId = $page.params.movieId;
</script>

<MovieDetails {title} {movieId} />
