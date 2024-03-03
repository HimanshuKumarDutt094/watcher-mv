<script>
	import { page } from '$app/stores';
	import FrontPage from '../lib/components/FrontPage.svelte';
	import TopRated from '../lib/components/TopRated.svelte';

	let { popular, top_rated } = $page.data.props;
	let data = popular;
</script>

<FrontPage {data} />
<TopRated {top_rated} />
