<script>
    import Navbar from "./navbar.svelte";
    import '../app.scss';
    import { siteTheme } from "../store/themeStore";
    import { onMount } from "svelte";

    onMount(() => {
        siteTheme.subscribe(theme => {
            document.documentElement.dataset.theme = theme;
        })
    })
    
</script>

<svelte:head>
    <title>Unrated</title>
</svelte:head>

<Navbar></Navbar>
<section>
    <slot></slot>
</section>

<style lang="scss" global>
    section {
        margin: 2rem;
    }
    :global(ul) {
        background-color: var(--navbar);
    }
</style>