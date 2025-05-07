<script>
  import { onMount } from 'svelte';
  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import githubDark from "svelte-highlight/styles/github-dark";
  import nightOwl from "svelte-highlight/styles/night-owl";
  import { base } from '$app/paths';
  import { python } from 'svelte-highlight/languages';

  export let code = `nothing here`;

  let wrapper;
  let collapsed = true;
  let copied = false;

  function copyCode() {
    const codeEl = wrapper.querySelector('pre code.hljs');
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.textContent || '');
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  function toggleCollapse() {
    collapsed = !collapsed;
  }
</script>

<svelte:head>{@html nightOwl}</svelte:head>

<div bind:this={wrapper} class="code-wrapper" class:collapsed={collapsed}>
  <button
    class="collapse-btn"
    on:click={toggleCollapse}
    aria-label={collapsed ? 'Expand code' : 'Collapse code'}
  >
    <span>
      {collapsed ? "Show" : "Hide"}
    </span>
    <img
      src={`${base}/${collapsed ? 'icons/expand.svg' : 'icons/collapse.svg'}`}
      alt=""
    />
  </button>

  <button class="copy-btn" on:click={copyCode} aria-label="Copy code">
    <span>
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </span>
    {#if !copied}
      <img src={`${base}/icons/copy.svg`} alt="Copy code icon" />
    {/if}
  </button>
  
  <Highlight language={python} {code} />
</div>

<style>
  .code-wrapper {
    position: relative;
  }

  .collapse-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .collapse-btn img {
    width: 1rem;
    height: 1rem;
  }
  .collapse-btn span {
    padding-right: 2px;
  }

  .copy-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copy-btn img {
    width: 1rem;
    height: 1rem;
  }

  .copy-btn span {
    padding-right: 2px;
  } 

  .copy-btn {
    transition: opacity 0.2s;
  }

  .copy-btn:active {
    opacity: 0.6;  
  }

  .collapse-btn,
  .copy-btn {
    background: #000;              
    border: 2px solid #888;        
    color: #fff;     
    border-radius: 0.5rem;              
  }

  .collapse-btn img,
  .copy-btn img {
    filter: invert(1);
  }

  :global(code.hljs) {
    padding-top: 3.5rem !important; 
    border: 3px solid #888;
    border-radius: 0.5rem;
  }

  .code-wrapper.collapsed :global(code.hljs) {
    max-height: 1em;
    overflow: hidden;
  }

  .code-wrapper.collapsed :global(code.hljs)::after {
    content: "";
    position: absolute;
    left: 3px; right: 3px; bottom: 3px;
    height: 50%;     
    backdrop-filter: blur(1px);
    pointer-events: none;
    background: transparent;
    border-radius: 0 0 0.5rem 0.5rem;
  }
</style>
