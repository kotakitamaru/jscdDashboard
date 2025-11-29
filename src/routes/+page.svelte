<script>
    import AppCard from "$lib/components/AppCard.svelte";
    import apps from "$lib/features/apps.js";

</script>

<h1 class="text-9xl text-center m-16">jscd</h1>

<div class="grid xl:grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-8 xl:m-48 2xl:m-64
            md:m-32 m-16 !mt-16 transition-all">
    {#each apps as app}
        <AppCard
            image={app.image}
            href={app.href}
            gradient={app.gradient}
            Child={app.Child} />
    {/each}
</div>
