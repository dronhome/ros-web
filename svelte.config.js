import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // For SPA mode
    }),
    paths: {
    //   base: '/', // Replace <repository-name> with your actual GitHub repository name
    },
  },
};

export default config;