// Define the API endpoint
const popular_url =import.meta.env.VITE_MOVIE_POPULAR+'api_key='+import.meta.env.VITE_MOVIE_API_KEY;
const top_rated_url =import.meta.env.VITE_MOVIE_TOP_RATED+'api_key='+import.meta.env.VITE_MOVIE_API_KEY;
// Create a function to fetch the data
export async function load() {
	// Use the fetch method to get the response
	const popular = await fetch(popular_url);
const top_rated = await fetch(top_rated_url);
	// Check if the response is ok
	if (popular.ok && top_rated.ok) {
		// Convert the response to JSON format
		const popularData = await popular.json();
const top_ratedData = await top_rated.json();
		// Return the array of movie objects
		let props={
		popular: popularData,
		top_rated: top_ratedData
	}
		return {
			props
	}
	} else {
		// Throw an error if the response is not ok
		throw new Error('Something went wrong');
	}
}
