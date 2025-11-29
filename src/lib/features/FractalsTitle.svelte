<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {createFractalRenderer, type View} from "./fractalWebgl";

    let canvas: HTMLCanvasElement;
    let containerW: number;
    let containerH: number;

    const MAX_ITER = 300;
    const renderer = createFractalRenderer(MAX_ITER);

    const view: View = { x: -1.4102, y: 0, zoom: 10 };

    onMount(() => {
        renderer.setCanvas(canvas);
        renderer.setSize(containerW, containerH);
        renderer.setView(view);
        renderer.updateReferenceOrbit();
    });

    $: if (containerW && containerH) renderer.setSize(containerW, containerH);

    const startDrawing = () => renderer.start();
    const stopDrawing = () => renderer.stop();

    onDestroy(() => renderer.dispose());
</script>

<div class="bg rounded-sm"
     bind:clientWidth={containerW}
     bind:clientHeight={containerH}
     on:mouseenter={startDrawing}
     on:mouseleave={stopDrawing}
>
    <canvas class="rounded-sm" bind:this={canvas}></canvas>

    <div class="h-full grid grid-cols-1 absolute right-0 top-0 z-20 pointer-events-none rounded-r-sm">
        <svg viewBox="-30 40 65 100" width="100%" height="100%" fill="rgb(197, 245, 227)">
            <text y="5">f</text>
            <text y="30%">r</text>
            <text y="55%">a</text>
            <text y="80%">c</text>
            <text y="105%">t</text>
            <text y="130%">a</text>
            <text y="155%">l</text>
            <text y="180%">s</text>
        </svg>
    </div>
</div>

<style>
    div.bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-image: radial-gradient(1200px 700px at 15% 10%, rgba(124, 179, 158, 0.18), rgba(15, 37, 37, 0) 60%), radial-gradient(900px 500px at 85% 85%, rgba(92, 131, 116, 0.16), rgba(15, 37, 37, 0) 65%), radial-gradient(600px 400px at 70% 20%, rgba(124, 179, 158, 0.1), rgba(15, 37, 37, 0) 70%), conic-gradient(from 180deg, rgba(92, 131, 116, 0.06), rgba(15, 37, 37, 0) 25%, rgba(124, 179, 158, 0.06) 50%, rgba(15, 37, 37, 0) 75%, rgba(92, 131, 116, 0.06) 100%), linear-gradient(rgb(10, 31, 31) 0%, rgb(10, 22, 22) 40%, rgb(15, 37, 37) 100%);
    }

    div.bg > div{
        width: 10%;
        background-color: #000000A8;
        font-family: Inika, serif;
    }

    canvas{
        height: 100%;
        width: 100%;
        background-color: #00000000;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 20;
        display: block;
    }
</style>