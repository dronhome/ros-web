import { writable } from 'svelte/store';

function getInitialTheme() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  return 'light'; // Default theme when SSR
}

export const theme = writable(getInitialTheme());

// Subscribe to changes and update localStorage and <html> class
theme.subscribe((value) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
});
