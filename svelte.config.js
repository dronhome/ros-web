import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',  // Output folder
      assets: 'build', // Static assets folder
      fallback: 'index.html', // Enable SPA mode
    }),
  },
};

export default config;
