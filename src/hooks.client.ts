import type { HandleClientError } from '@sveltejs/kit';
// To use Clerk components:
import { initializeClerkClient } from 'clerk-sveltekit/client';
// Or for headless mode:
// import { initializeClerkClient } from 'clerk-sveltekit/headless'
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
initializeClerkClient(CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/admin/',
	afterSignUpUrl: '/admin/',
	signInUrl: '/login',
	signUpUrl: '/signup'
});

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event);
};
