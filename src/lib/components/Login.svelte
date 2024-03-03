<script>
	import user from '$lib/store';
	let username = '';
	let password = '';
	const login = () => {};
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900"
>
	<div class="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md dark:bg-gray-800">
		<h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
		<form class="space-y-4">
			<div class="space-y-1">
				<label
					class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-200"
					for="name">Name</label
				><input
					class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
					id="name"
					required=""
				/>
			</div>
			<div class="space-y-1">
				<label
					class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-200"
					for="email">Email</label
				><input
					class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
					id="email"
					required=""
					type="email"
				/>
			</div>
			<div class="space-y-1">
				<label
					class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700 dark:text-gray-200"
					for="password">Password</label
				><input
					class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
					id="password"
					required=""
					type="password"
				/>
			</div>
			<button
				class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
				type="submit">Sign Up</button
			>
		</form>
		<button
			on:click={login}
			class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
			type="submit">Log In</button
		>
	</div>
</div>
