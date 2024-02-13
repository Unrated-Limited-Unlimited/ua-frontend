<script>
    import Navbar from "./navbar.svelte";
    import '../app.scss';
</script>

<Navbar></Navbar>

<slot></slot>

<style lang="scss" global>
    ul {
        background-color: var(--navbar);
    }
</style>