<script>
    import ModuleTree from './ModuleTree.svelte';
    import { onMount } from 'svelte';

    export let onSelectContent; // Function to propagate content selection

    let modules = [];
    let isLoading = true; // Track loading state

    onMount(async () => {
        try {
            const response = await fetch('/data/course.json');
            modules = await response.json();
        } catch (error) {
            console.error('Error loading modules:', error);
        } finally {
            isLoading = false; // End loading once the data is fetched
        }
    });
</script>

<div class="sidebar">
    {#if isLoading}
        <!-- Centered Spinner -->
        <div class="loading-container">
            <div class="loading-spinner"></div>
        </div>
    {:else}
        <!-- Module List -->
        <div class="module-list">
            <!-- Intro Section -->
            <div class="intro" on:click={() => onSelectContent(null)}>
                <h3>Informácie o predmete</h3>
            </div>
            
            <!-- Dynamic Modules -->
            {#each modules as module}
                <ModuleTree {module} onSelectContent={onSelectContent} />
            {/each}
        </div>
    {/if}
</div>



<style>
    .sidebar {
        position: relative;
        /* padding-left: 30px; */
        width: 100%;
        background: #212121;
        color: white;
        overflow-y: auto;
        /* height: 100%; */
        box-sizing: border-box;
        /* margin-bottom: 50px; */
        padding-bottom: 100px;
    }

    /* Spinner Container */
    .loading-container {
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        height: calc(100vh - 200px); /* Fill the sidebar height */
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

    /* Module List Styles */
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
