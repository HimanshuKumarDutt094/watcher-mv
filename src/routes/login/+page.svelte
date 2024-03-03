<script lang="ts">
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte';
</script>

<div class="flex justify-center items-center">
	<SignIn redirectUrl="/admin" />
</div>
