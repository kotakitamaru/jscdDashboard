<script lang="ts">
    import {onMount} from "svelte";
    import cat from "$lib/assets/cat.jpg"
    import cat_catched from "$lib/assets/cat_catched.jpg"

    interface Point{
        x: number;
        y: number;
    }

    let point = $state({x: 0, y: 0});
    let cat_point = $state({x: 0, y: 0});
    let catRotation = $derived((Math.atan2(point.y - cat_point.y, point.x - cat_point.x) * 180 / Math.PI));

    let moving = $state(false);

    function mouseOver(event: MouseEvent) {
        point.x = event.clientX;
        point.y = event.clientY;
    }

    onMount(() => {
        document.documentElement.classList.add("cursor");
        const swiftness = 0.01;
        const damping = 0.9;
        let velocity = { x: 0, y: 0};
        function moveCat() {
            const getNewPos = (n : Point, o: Point) : Point => {
                const dist = { x : n.x - o.x, y: n.y - o.y};
                velocity.x += (dist.x - velocity.x) * swiftness;
                velocity.y += (dist.y - velocity.y) * swiftness;

                velocity.x *= damping;
                velocity.y *= damping;

                moving = Math.sqrt(velocity.x ** 2 + velocity.y ** 2) > 3;

                return {
                    x: o.x + (moving? velocity.x : 0),
                    y: o.y + (moving? velocity.y : 0)
                };
            };

            cat_point = getNewPos(point, cat_point);
            requestAnimationFrame(moveCat)
        }

        moveCat()
        return () => document.documentElement.classList.remove("cursor");
    })

</script>

<div
    class="cursor-point"
    style="transform: translate({point.x}px, {point.y}px);">
</div>

<div
    style="transform: translate({cat_point.x}px, {cat_point.y}px) translate(-50%, -50%) rotate({catRotation}deg);
            background-image: url({moving ? cat : cat_catched});
            --cursor: none"
    class="cursor-cat">
</div>

<svelte:window on:mousemove={mouseOver}/>

<style>
    .cursor-point {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 0, 0, 0.75);
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
        margin-left: -5px;
        margin-top: -5px;
        transition: all;
    }

    .cursor-cat {
        width: 100px;
        height: 80px;
        transition: all;
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        background-size: cover;
        pointer-events: none;
        background-position-y: -20px;
    }

    :global(html.cursor, html.cursor *) {
        cursor: none;
    }
    :global(html.cursor){
        min-width: 100vw;
        min-height: 100vh;
    }
</style>