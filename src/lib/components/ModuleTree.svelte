<script>
    export let module;
    export let onSelectContent;

    let isOpen = false;

    function toggleOpen() {
        isOpen = !isOpen;
    }
</script>

<div class="module">
    <!-- Header for the module (folder-like toggle) -->
    <div class="module-header" on:click={toggleOpen}>
        <span class="arrow {isOpen ? 'open' : ''}"></span>
        <h3>{module.name}</h3>
    </div>

    {#if isOpen}
    <div class="module-content">
        <div class="lectures">
            <ul>
                {#each module.lectures as lecture}
                <li on:click={() => onSelectContent(lecture)}>
                    <span class="file-icon1"></span>
                    <h4>{lecture.name}</h4>
                </li>
                {/each}
            </ul>
        </div>
        <div class="exercises">
            <ul>
                {#each module.exercises as exercise}
                <li on:click={() => onSelectContent(exercise)}>
                    <span class="file-icon2"></span>
                    <h4>{exercise.name}</h4>
                </li>
                {/each}
            </ul>
        </div>
    </div>
    {/if}
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        
        background: #1f1f1f;
        color: #ddd;
    }

    .module {
        width: 100%;
        opacity: 0.8;
        background: transparent;
        color: #ddd;
    }

    /* Module header */
    .module-header {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
        padding: 18px 20px;
        user-select: none;
        background: transparent;
        color: #ddd;
        border-bottom: 1px solid rgba(128, 128, 128, 0.2);
        transition: background 0.3s ease;
    }

    .module-header:hover {
        background-color: #333;
        color: #fff;
    }

    .module-header h3 {
        margin: 0;
        font-weight: 600;
        letter-spacing: 0.5px;
        font-size: 1rem;
    }

    /* Arrow for dropdown */
    .arrow {
        width: 7px;
        height: 7px;
        border: solid #ddd;
        border-width: 0 2px 2px 0;
        display: inline-block;
        margin-right: 12px;
        transform: rotate(-45deg);
        transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .arrow:hover {
        border-color: #6ec6ff;
    }

    .arrow.open {
        transform: rotate(45deg);
        border-color: #6ec6ff;
    }

    /* Module content */
    .module-content {
        padding: 0px 0;
    }

    /* Lists */
    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    li {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 12px 40px;
        font-size: 0.95rem;
        color: #ddd;
        transition: background 0.3s ease;
        border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    }

    li:hover {
        background-color: #333;
        color: #fff;
    }

    li h4 {
        margin: 0;
        font-weight: 500;
        font-size: 1rem;
        transition: color 0.3s ease;
    }

    li h4:hover {
        text-decoration: underline;
        color: #6ec6ff;
    }

    .file-icon1 {
        width: 32px;
        height: 32px;
        margin-right: 8px;
        background-color: transparent;
        mask: url('/icons/lecture.svg') no-repeat center;
        -webkit-mask: url('/icons/lecture.svg') no-repeat center;
        mask-size: contain;
        -webkit-mask-size: contain;
        background-color: #d4d4d4;
    }
    .file-icon2 {
        width: 32px;
        height: 32px;
        margin-right: 8px;
        background-color: transparent;
        mask: url('/icons/exercise.svg') no-repeat center;
        -webkit-mask: url('/icons/exercise.svg') no-repeat center;
        mask-size: contain;
        -webkit-mask-size: contain;
        background-color: #d4d4d4;
    }
    @media (max-width: 900px) {
        .module-header {
            padding: 18px 10px;
        }
    }
</style>
