<script>
    import Navbar from "./navbar.svelte";
    import '../app.scss';
</script>

<svelte:head>
    <title>Unrated</title>
</svelte:head>

<Navbar></Navbar>

<slot></slot>

<style lang="scss" global>
    :global(ul) {
        background-color: var(--navbar);
    }
</style>