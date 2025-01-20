<script>
    import { onMount, afterUpdate } from 'svelte';

    // Function to highlight code
    const applyHighlight = () => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    };

    onMount(() => {
        applyHighlight(); // Apply highlighting on initial render
    });

    afterUpdate(() => {
        applyHighlight(); // Apply highlighting after updates
    });

    export let content;
    // export let isSidebarOpen;
</script>

<div class="content-area">
    {#if content}
        <div class="main">
            <h1 class="main_name">{content.name}</h1>
            <div class="course_content">
                {#each content.description as block}
                    {#if block.type === "text"}
                        <p class="custom-html">{@html block.content}</p>
                    {:else if block.type === "title"} 
                        <div class="hashtag">
                            <h2 class="h">#</h2>
                            <h2>{block.content}</h2>
                        </div>
                    {:else if block.type === "subtitle"}
                        <h3 class="subtitle">{block.content}</h3>
                    {:else if block.type === "bullet"}
                        <ul class="list">
                            <li><strong>{block.item}</strong> {block.description}</li>
                        </ul>
                    {:else if block.type === "image"}
                        <img class="image-std" src="{block.src}" alt="{block.alt}" />
                    {:else if block.type === "image-long"}
                        <img class="image-long" src="{block.src}" alt="{block.alt}" />
                    {:else if block.type === "image-short"}
                        <img class="image-short" src="{block.src}" alt="{block.alt}" />
                    {:else if block.type === "code"}
                        <div class="code_block">
                            <pre>
                                <code class="language-javascript">{block.content}</code>
                            </pre>
                        </div>
                    {:else if block.type === "line"}
                        <hr />
                    {:else if block.type === "table"}
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
    {:else}
    <div class="welcome">
        <div class="greetings">
            <h1>Vitajte vo vzdelávacom kurze ROSMASTER R2</h1>
            <p>
                Tento kurz je navrhnutý tak, aby vás naučil základy práce s robotom Rosmaster R2. 
                Získate základné znalosti a praktické zručnosti v oblasti navigácie robota, využitia senzorov, 
                integrácie umelej inteligencie a ďalších tém.
            </p>
            <p>
                Po absolvovaní tohto kurzu sa naučíte základy ROS (Robotického operačného systému), 
                počítačového videnia a implementácie autonómnych funkcií v robote.
            </p>
        </div>

        
        <!-- Objectives Section -->
        <div class="ciele">
            <div class="hashtag">
                <h2 class="h">#</h2>
                <h2>Ciele</h2>
            </div>
            <ul>
                <li>Naučiť základy práce s robotom Rosmaster R2.</li>
                <li>Porozumieť navigácii, využitiu senzorov a umelej inteligencii v robote.</li>
                <li>Osvojiť si základné princípy ROS2 a počítačového videnia.</li>
                <li>Implementovať autonómne funkcie v robote.</li>
            </ul>
        </div>
        
        <!-- Resources Section -->
        <div class="zdroje">
            <div class="hashtag">
                <h2 class="h">#</h2>
                <h2>Zdroje</h2>
            </div>
            <ul>
                <li><strong>Rosmaster R2:</strong>
                    <ul>
                        <li><a href="https://github.com/orbbec/ros2_astra_camera" target="_blank">Oficiálny GitHub pre ovládač kamery Astra</a></li>
                        <li><a href="https://github.com/YahboomTechnology/ROSMASTER-R2/" target="_blank">Oficiálny GitHub pre Rosmaster R2</a></li>
                        <li><a href="http://www.yahboom.net/study/ROSMASTER-R2" target="_blank">Študijné materiály pre Rosmaster R2</a></li>
                        <li><a href="http://www.yahboom.net/study/ROSMASTER-X3-PLUS" target="_blank">Študijné materiály pre Rosmaster X3 Plus</a></li>
                        <li><a href="https://www.youtube.com/results?search_query=rosmaster+ros2" target="_blank">YouTube videá o Rosmaster a ROS2</a></li>
                        <li><a href="https://www.youtube.com/watch?v=xqroBkpf3lY&t=508s&ab_channel=robotmania" target="_blank">Rozpoznávanie objektov s Jetson Orin Nano a YOLOv8</a></li>
                    </ul>
                </li>
                <li><strong>YOLO (You Only Look Once):</strong>
                    <ul>
                        <li><a href="https://github.com/moksh-401-511/YOLOv5_ROS2-YOu-can-Leverage-On-ROS2" target="_blank">YOLOv5 integrácia s ROS2</a></li>
                        <li><a href="https://www.hackster.io/feiticeir0/yolov8-custom-classification-model-using-jetson-orin-nx-68a1a9" target="_blank">YOLOv8: Vytváranie vlastných klasifikačných modelov s Jetson Orin NX</a></li>
                        <li><a href="https://medium.com/@kabilankb2003/object-detection-in-ros2-with-pytorchs-faster-bb54a65e47e0" target="_blank">Detekcia objektov v ROS2 pomocou PyTorch Faster</a></li>
                    </ul>
                </li>
                <li><strong>Úvod do ROS2:</strong>
                    <ul>
                        <li><a href="https://medium.com/spinor/getting-started-with-ros2-install-and-setup-ros2-humble-on-ubuntu-22-04-lts-ad718d4a3ac2" target="_blank">Príručka na inštaláciu a nastavenie ROS2 na Ubuntu 22.04 LTS</a></li>
                    </ul>
                </li>
                <li><strong>Nvidia Jetson NX:</strong>
                    <ul>
                        <li><a href="https://developer.nvidia.com/embedded/jetpack-archive" target="_blank">Oficiálne zdroje pre JetPack od NVIDIA</a></li>
                        <li><a href="https://dusty-nv.github.io/NanoLLM/" target="_blank">NanoLLM: Implementácia malých jazykových modelov</a></li>
                        <li><a href="https://github.com/dusty-nv/NanoLLM/tree/main" target="_blank">NanoLLM: Oficiálny GitHub projekt</a></li>
                        <li><a href="https://www.youtube.com/watch?v=HlH3QkS1F5Y&ab_channel=JetsonHacks" target="_blank">Príručka na používanie Docker kontajnerov s Jetson</a></li>
                        <li><a href="https://www.youtube.com/watch?v=w48i8FmVvLA&ab_channel=NVIDIADeveloper" target="_blank">Live LLaVA implementácia na Jetson Orin</a></li>
                    </ul>
                </li>
            </ul>
            
        </div>
    </div>    
    {/if}
</div>

<style>
    /* Base styling */
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
        background-color: #2f2f2f;
        border-left: 0.01px solid rgba(128, 128, 128, 0.479);
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }

    /* Welcome section */
    .welcome, .main {
        padding-top: 5%;
        padding-bottom: 5%;
    }

    .greetings,
    .ciele,
    .zdroje {
        margin-bottom: 1rem;
    }

    .main_name {
        /* padding-bottom: 5%; */
        /* margin-top: 0; */
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

    .code_block pre {
        white-space: pre-wrap; 
        word-wrap: break-word; 
        margin: 0;
    }

    .code_block code {
        display: block;
        font-family: 'Courier New', Courier, monospace; 
        font-size: 0.9rem;
        color: #f8f8f2; 
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
