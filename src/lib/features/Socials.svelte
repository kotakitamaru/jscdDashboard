<script>
    import * as Icon from 'svelte-lucide';

</script>

<div class="fixed bottom-0 right-0 m-3">
    <a href="https://github.com/kotakitamaru">
        <Icon.Github  class="github" size="24" />
    </a>
</div>

<style>
    :global(.github) {
        color: #223322;
        opacity: 0.5;
        cursor: pointer;
        transition: all 300ms;
    }
    :global(.github:hover) {
        opacity: 1;
    }
</style>