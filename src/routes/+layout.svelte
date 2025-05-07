<script>
    import Sidebar from '$lib/components/Sidebar.svelte';
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { tick } from 'svelte';

    let isSidebarOpen = true;
    let isMobile = false;

    function checkScreenSize() {
        isMobile = window.innerWidth <= 600;
        isSidebarOpen = window.innerWidth >= 1000;
    }

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
        localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
    }


    onMount(() => {
        checkScreenSize();

        const savedState = localStorage.getItem('sidebarOpen');
        if (savedState !== null) {
            isSidebarOpen = JSON.parse(savedState);
        } else {
            isSidebarOpen = window.innerWidth >= 1000;
        }

        window.addEventListener('resize', checkScreenSize);
    });


    afterNavigate(async () => {
        if (isMobile) {
            isSidebarOpen = false;
        }
        await tick(); // Wait for the DOM to update
        const container = document.querySelector('.content-area');
        if (container) {
            container.scrollTop = 0; // ✅ Reset scroll position
        }
    })
</script>


<!-- Desktop Layout -->
{#if !isMobile}
    <div class="layout">
        {#if isSidebarOpen}
            <div class="bar_cont">
                <div class="button_div_bar">
                    <button class="toggle-sidebar-btn" on:click={toggleSidebar} title="Close Sidebar">
                        <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                    </button>
                    <h3>ROSMASTER R2 Vzdelávací kurz</h3>
                </div>
                <div class="sidebar">
                    <Sidebar />
                </div>
            </div>
        {/if}

        <div class="content-area" style="width: {isSidebarOpen ? '75vw' : '100vw'}">
            {#if !isSidebarOpen}
                <div class="button_div_cont">
                    <button class="toggle-sidebar-btn" on:click={toggleSidebar} title="Open Sidebar">
                        <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                    </button>
                </div>
            {/if}
            
            <slot />
        </div>
    </div>

<!-- Mobile Layout -->
{:else}
    {#if isSidebarOpen}
        <div class="bar_cont" style="width: 100vw">
            <div class="button_div_bar">
                <button class="toggle-sidebar-btn" on:click={toggleSidebar} title="Close Sidebar">
                    <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                </button>
                <h3>ROSMASTER R2 Vzdelávací kurz</h3>
            </div>
            <div class="sidebar" style="width: 100vw">
                <Sidebar />
            </div>
        </div>
    {:else}
        <div class="content-area" style="width: 100vw;">
            <div class="button_div_cont">
                <button class="toggle-sidebar-btn" on:click={toggleSidebar} title="Show Sidebar">
                    <img src="/ros-web/icons/sidebar.svg" alt="Toggle Sidebar" />
                </button>
            </div>
            <slot />
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
