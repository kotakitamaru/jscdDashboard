<script lang="ts">
    import type {Component} from "svelte";

    interface AppCardProps {
        href: string;
        image?: string;
        Child?: Component;
        gradient?: string[];
    }

    let { href, image, Child = undefined, gradient = ["#fff", "#000"] } : AppCardProps = $props()
</script>


<a {href} class="shadow-2xs relative cool-border col-span-1 rounded-lg w-full cursor-pointer hover:scale-105 transition-all"
     style="--gradient-colors: {gradient.join(', ')}; aspect-ratio: 17/6;">
    <img src="{image}" alt="{href}" class="rounded-sm h-full w-full object-cover bg-green-600" />
    {#if Child}
        <Child />
    {/if}
</a>

<style>
    @property --gradient-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
    }

    .cool-border{
        background-clip: padding-box;
        border: 5px solid transparent;
        position: relative;

        &:before{
            border-radius: var(--radius);

            content: ' ';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(var(--gradient-angle), var(--gradient-colors));
            margin: -5px;

            animation: spin-gradient 1s linear infinite;
            z-index: -10;
            animation-play-state: paused;
        }
    }
    .cool-border:hover:before{
        animation-play-state: running;
    }

    @keyframes spin-gradient {
        0% { --gradient-angle: 0deg; }
        50% { --gradient-angle: 180deg; }
        100% { --gradient-angle: 360deg; }
    }
</style>