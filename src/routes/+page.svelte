<script>
    import AppCard from "$lib/components/AppCard.svelte";
    import apps from "$lib/features/apps.js";
    import Cursor from "$lib/features/Cursor.svelte";

    let laserCursor = $state(false);
</script>

<h1
    class="text-9xl text-center m-16 cursor-default"
    style="font-family: 'Questrial', sans-serif; color: #232"
>
    <span on:click={_ => laserCursor = !laserCursor}>
        j
    </span>scd
</h1>

<div class="list grid lg:grid-cols-2 grid-cols-1 xl:gap-4  gap-4
            m-auto !mt-16 w-fit transition-all ">
    {#each apps as app}
        <AppCard
            image={app.image}
            href={app.href}
            gradient={app.gradient}
            Child={app.Child} />
    {/each}
</div>

{#if laserCursor}
    <Cursor/>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
    div.list {
        @media (width < 540px) {
            margin: 1rem;
        }
    }

    @property --angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
    }
    @keyframes rotateGradient {
        to {
            --angle: 360deg;
        }
    }

    h1 > span{
        animation: appearText 1s linear;
        background-clip: text;
        background-image: linear-gradient(var(--angle), #232, #53836d, #232);
    }
    h1:hover > span{
        animation: rotateGradient 5s linear infinite, shine 3s linear infinite, disappearText 1s linear;
        transition: all;
        color: transparent;
    }

    @keyframes disappearText {
        0%{
            color: rgba(35, 35, 35, 1);
        }
        100%{
            color: rgba(35, 35, 35, 0);
        }
    }

    @keyframes appearText {
        0%{
            color: rgba(35, 35, 35, 0);
        }
        100%{
            color: rgba(35, 35, 35, 1);
        }
    }
</style>