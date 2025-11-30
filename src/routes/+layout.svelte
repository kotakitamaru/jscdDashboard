<script lang="ts">
	import './layout.css';
	import icon from '$lib/assets/icon.svg'
	import Socials from "$lib/features/Socials.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{icon}" />
	<title>jscd</title>
</svelte:head>


<Socials />
{@render children()}