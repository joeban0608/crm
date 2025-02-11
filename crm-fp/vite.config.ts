import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), '/dist/*']
		},
		allowedHosts: [
			'd96e-2407-4d00-3c01-95d3-c42f-da89-a3ba-dfbd.ngrok-free.app',
			'8230-2407-4d00-3c01-95d3-c42f-da89-a3ba-dfbd.ngrok-free.app'
		]
	}
});
