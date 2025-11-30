<script>
    import * as Icon from 'svelte-lucide';

</script>

<a class="email text-sm m-2" href="mailto:me@jscd.uk" >me@jscd.uk</a>
<div class="fixed bottom-0 right-0 m-3">
    <a href="https://github.com/kotakitamaru">
        <Icon.Github  class="github" size="24" />
    </a>
</div>

<style>
    .email {
        position: fixed;
        bottom: 0;
        left: 50%;
    }

    :global(.github:hover), .email:hover {
        opacity: 1;
    }

    :global(.github), .email {
        color: #223322;
        opacity: 0.5;
        transition: all 300ms;
    }

</style>