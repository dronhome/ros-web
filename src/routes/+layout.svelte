
<script>
    export const prerender = true;
    import Sidebar from '$lib/components/Sidebar.svelte';
    import ContentArea from '$lib/components/ContentArea.svelte';
    import { onMount } from 'svelte';
    // export const path = '/ros-web'

    let selectedContent = null;
    let isSidebarOpen = true;

    // Track if the screen is small (mobile).
    let isMobile = false;

    // Check screen size on mount and on resize
    function checkScreenSize() {
        isMobile = window.innerWidth <= 600; // pick your desired breakpoint
        isSidebarOpen = window.innerWidth >= 1000;
    }

    onMount(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });

    function handleSelectContent(content) {
        selectedContent = content;
        // On mobile, once a module is selected, we want to hide the sidebar
        if (isMobile) {
            isSidebarOpen = false;
        }
    }

    function toggleSidebar() {
        // If user toggles sidebar on mobile, either show/hide it
        if (isMobile) {
            isSidebarOpen = !isSidebarOpen;
        } else {
            // On desktop, you do your usual toggle
            isSidebarOpen = !isSidebarOpen;
        }
    }
</script>

<!-- LAYOUT -->
{#if !isMobile}
    <!-- Desktop / Large Screen Layout -->
    <div class="layout">
        <!-- Sidebar -->
        {#if isSidebarOpen}
            <div class="bar_cont">
                <div class="button_div_bar">
                    <button
                        class="toggle-sidebar-btn"
                        on:click={toggleSidebar}
                        title="Close Sidebar"
                    >
                        <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                    </button>
                    <h3>ROSMASTER R2 Vzdelávací kurz</h3>
                </div>
                <div class="sidebar">
                    <Sidebar onSelectContent={handleSelectContent} />
                </div>
            </div>
        {/if}

        <!-- Content Area -->
        <div class="content-area" style="width: {isSidebarOpen ? '75vw' : '100vw'}">
            {#if !isSidebarOpen}
                <!-- Button Div when Sidebar is closed on desktop -->
                <div class="button_div_cont">
                    <button
                        class="toggle-sidebar-btn"
                        on:click={toggleSidebar}
                        title="Open Sidebar"
                    >
                        <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                    </button>
                </div>
            {/if}
            <ContentArea isSidebarOpen={isSidebarOpen} content={selectedContent} />
        </div>
    </div>

{:else}
    <!-- Mobile Layout -->
    {#if isSidebarOpen}
        <!-- Show ONLY Sidebar if no content selected -->
        <div class="bar_cont" style="width: 100vw">
            <div class="button_div_bar">
                <button
                    class="toggle-sidebar-btn"
                    on:click={toggleSidebar}
                    title="Close Sidebar"
                >
                    <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                </button>
                <h3>ROSMASTER R2 Vzdelávací kurz</h3>
            </div>
            <div class="sidebar" style="width: 100vw">
                <Sidebar onSelectContent={handleSelectContent} />
            </div>
        </div>
    {:else}
        <!-- Show ONLY Content if user has selected something -->
        <div class="content-area" style="width: 100vw;">
            <!-- Possibly add a button to go back to the sidebar -->
            <div class="button_div_cont">
                <button
                    class="toggle-sidebar-btn"
                    on:click={toggleSidebar}
                    title="Show Sidebar"
                >
                    <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                </button>
            </div>
            <ContentArea isSidebarOpen={isSidebarOpen} content={selectedContent} />
        </div>
    {/if}
{/if}

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, sans-serif;
    }

    .layout {
        display: flex;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    .button_div_cont {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .button_div_bar {
        padding-top: 10px;
        padding-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #212121;

    }

    .button_div_bar h3 {

        margin-right: 20px;
        opacity: 0.8;
        color: #ffffff;
    }

    .toggle-sidebar-btn {
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1000;
        padding: 4px 20px 4px 4px;
        opacity: 0.8;
        
    }

    .toggle-sidebar-btn img {
        width: 32px;
        height: 100%;
    }

    .toggle-sidebar-btn:hover {
        /* opacity: 0.8; */
        /*  why does not it work, color does not change */
        /* color: rgb(230, 253, 255); */
        filter: invert(10%) sepia(20%) saturate(300%) hue-rotate(180deg);
    }

    .bar_cont {
        width: 25vw;
        color: white;
        height: 100vh;
        background-color: #212121;
    }

    .sidebar {
        width: 25vw;
        height: 100vh;
        overflow-y: auto;
    }



    :global(.sidebar::-webkit-scrollbar) {
        width: 8px; 
    }

    :global(.sidebar::-webkit-scrollbar-track) {
        background: #333; 
    }

    :global(.sidebar::-webkit-scrollbar-thumb) {
        background-color: #888; /* Color of the scrollbar thumb */
        border-radius: 4px; /* Rounded edges */
        border: 2px solid #333; 
    }

    .content-area {
        width: 75vw;
        height: 100vh;
    }

    .theme-toggle {
        position: absolute;
        top: 10px;
        left: calc(100vw - 100px);
        z-index: 1000;
    }

    @media (max-width: 1400px) {
        .bar_cont {
            width: 30vw;
        }
        .content-area {
            width: 70vw;
        }
        .sidebar {
            width: 30vw;
        }
    }
    @media (max-width: 1200px) {
        .bar_cont {
            width: 40vw;
        }
        .content-area {
            width: 60vw;
        }
        .sidebar {
            width: 40vw;
        }
    }
    @media (max-width: 900px) {
        .bar_cont {
            width: 45vw;
        }
        .content-area {
            width: 55vw;
        }
        .sidebar {
            width: 45vw;
        }
    }
</style>
