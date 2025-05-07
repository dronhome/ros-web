<script>
    import { onMount, afterUpdate } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { tick } from 'svelte';
    import CodeBlock from './CodeBlock.svelte';

    let mounted = false;

    export let content;

    let scrollableContainer;

    afterNavigate(async () => {
        await tick();
        if (scrollableContainer) {
            scrollableContainer.scrollTop = 0;
        }
    });
</script>

<div class="content-area" bind:this={scrollableContainer}>
    <div class="main">
    <h1 class="main_name">{content.name}</h1>

    <div class="course_content">
        {#each content.description as block}
        {#if block.type === 'text'}
            <p class="custom-html">{@html block.content}</p>
        {:else if block.type === 'title'}
            <div class="hashtag">
            <h2 class="h">#</h2>
            <h2>{block.content}</h2>
            </div>
        {:else if block.type === 'subtitle'}
            <h3 class="subtitle">{block.content}</h3>
        {:else if block.type === 'bullet'}
            <ul class="list">
            <li><strong>{block.item}</strong> {block.description}</li>
            </ul>
        {:else if block.type === 'image'}
            <img class="image-std" src="{block.src}" alt="{block.alt}" />
        {:else if block.type === 'image-long'}
            <img class="image-long" src="{block.src}" alt="{block.alt}" />
        {:else if block.type === 'image-short'}
            <img class="image-short" src="{block.src}" alt="{block.alt}" />
        {:else if block.type === 'code'}
            <div class="code_block">
                <!-- <pre><code class="language-javascript">{block.content}</code></pre> -->
                <CodeBlock code={block.content}/> 
            </div>
        {:else if block.type === 'line'}
            <hr />
        {:else if block.type === 'video'}
            <video
                class="video-block"
                controls
                poster = {block.poster}
                src={block.src}
            >
                Sorry, your browser doesn’t support embedded videos.
            </video>
        {:else if block.type === 'table'}
            <div class="table_cont">
            <table class="comparison-table">
                <thead>
                <tr>
                    {#each block.columns as column}
                    <th>{column}</th>
                    {/each}
                </tr>
                </thead>
                <tbody>
                {#each block.rows as row}
                    <tr>
                    {#each block.columns as column}
                        <td>{@html row[column]}</td>
                    {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
            </div>
        {/if}
        {/each}
    </div>
    </div>
</div>


<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: #1f1f1f;
        color: #ddd;
    }
    
    .content-area {
        padding-top: 1vh;
        padding-left: 10%;
        padding-right: 10%;
        padding-bottom: 5%;
        background-color: #2f2f2f;
        border-left: 0.01px solid rgba(128, 128, 128, 0.479);
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .list {
        margin: 0;
        margin-bottom: 0.5rem;
    }

    /* Headings */
    h1, h2 {
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
        color: #fff;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 1.6rem;
    }

    .h {
        color: #6ec6ff; /* Accent color for the hashtag */
        margin-right: 8px;
    }

    /* Paragraphs */
    p {
        line-height: 1.8;
        margin-bottom: 1.2rem;
        color: #e8e8e8;
    }

    /* Lists */
    ul {
        margin: 1rem 0;
        padding-left: 20px;
    }

    ul ul {
        margin: 0.5rem 0 0 20px;
    }

    li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    /* Links */
    :global(a) {
        color: #6ec6ff;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    :global(a:hover) {
        color: #9fe2ff;
        text-decoration: underline;
    }

    /* Hashtag container */
    .hashtag {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }


    .course_content {
        display: flex;
        flex-direction: column;
    }

    .image-std {
        height: 100%;
        width: 20vw;
        margin-bottom: 1rem;
    }

    .image-long {
        height: 100%;
        width: 40vw;
        margin-bottom: 2rem;
    }

    .image-short {
        height: 100%;
        width: 10vw;
        margin-bottom: 1rem;
    }

    /* .main h2 {
        margin-top: 0;
    } */

    .course_content p {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    .subtitle {
        margin-top: 0;
        font-size: 1.3rem;
        color: #f0f0f0;
    }

    .code_block {
        max-width: 100%; 
        overflow-x: auto;
    }

    .table_cont {
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        margin: 0;
        padding: 0;
    }

    .comparison-table {
        width: 100%;
        max-width: 100%;
        border-collapse: collapse;
        table-layout: auto;
        margin: 1rem 0;
        font-size: 1rem;
        /* font-family: Arial, sans-serif; */
    }

    .comparison-table th, .comparison-table td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
        word-wrap: break-word;
        color: #ccc;
    }

    .comparison-table th {
        background-color: #333;
        /* color: #fff; */
    }



    .comparison-table td:hover, 
    .comparison-table th:hover {
        background-color: #212121;
    }

    hr {
        border: none;
        border-top: 1px solid #ccc; 
        margin: 20px 0;
    }

    .video-block {
        width: 100%;
        max-width: 800px;
        max-height: 400px;
        margin: 1rem 0;
        border-radius: 0.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    @media (max-width: 1024px) {
        .image-long {
            height: 100%;
            width: 100%;
            margin-bottom: 2rem;
        }
        .image-std {
            height: 100%;
            width: 100%;
            margin-bottom: 1rem;
        }
    }
    @media (max-width: 900px) {
        .content-area {
            padding-left: 5%;
            padding-right: 5%;
        }
    }
    @media (max-width: 600px) {
        .image-long {
            height: 100%;
            width: 80vw;
            margin-bottom: 2rem;
        }
        .image-std {
            height: 100%;
            width: 80vw;
            margin-bottom: 1rem;
        }
    }
</style>
