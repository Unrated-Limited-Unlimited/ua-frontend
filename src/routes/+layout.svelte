<script>
    import Navbar from "./navbar.svelte";
    import '../app.scss';
</script>

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