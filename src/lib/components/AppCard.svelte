<script>
    let { href, image } = $props()

    let deg = $state(0);

</script>


<div class="cool-border col-span-1 rounded-lg sm:h-46 h-32 w-full cursor-pointer shadow-lg shadow-green-800 hover:scale-105 transition-all"v>
    <div class="bg-green-500 h-full w-full rounded-sm">
        <h1>{image}</h1>
    </div>
</div>

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
            background: linear-gradient(var(--gradient-angle),#fff,#000);
            margin: -5px;

            animation: spin-gradient 3s linear infinite;
            z-index: -10;
            animation-play-state: paused;
        }
    }
    .cool-border:hover:before{
        animation-play-state: running;
        z-index: -10;

    }

    @keyframes spin-gradient {
        0% { --gradient-angle: 0deg; }
        100% { --gradient-angle: 360deg; }
    }
</style>