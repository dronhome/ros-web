<script>
    import ModuleTree from './ModuleTree.svelte';
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    export let onSelectContent;
    let modules = [];
    let isLoading = true;

    onMount(async () => {
        try {
            const response = await fetch('/ros-web/data/modules.json');
            modules = await response.json();
        } catch (error) {
            console.error('Error loading modules:', error);
        } finally {
            isLoading = false;
        }
    });
</script>

<div class="sidebar">
    {#if isLoading}
        <div class="loading-container">
            <div class="loading-spinner"></div>
        </div>
    {:else}
        <div class="module-list">
            <a class="intro" href={`${base}/module/welcome`}>
                <h3>Informácie o predmete</h3>
            </a>

            {#each modules as module}
                <ModuleTree {module} onSelectContent={onSelectContent} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .sidebar {
        position: relative;
        width: 100%;
        background: #212121;
        color: white;
        overflow-y: auto;
        box-sizing: border-box;
        padding-bottom: 100px;
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 200px);
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .module-list {
        display: flex;
        flex-direction: column;
    }

    .intro {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
        padding: 18px 30px;
        user-select: none;
        background: transparent;
        color: #ddd;
        border-bottom: 1px solid rgba(128, 128, 128, 0.2);
        transition: background 0.3s ease;
        text-decoration: none;
    }

    .intro:hover {
        background-color: #333;
        color: #fff;
    }

    .intro h3 {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: transparent;
        color: #ddd;
        font-weight: 600;
        letter-spacing: 0.5px;
        font-size: 1.1rem;
        opacity: 0.9;
    }
</style>
