<script>
    import Navbar from "./navbar.svelte";
    import '../app.scss';

    import { onMount } from "svelte";
    import { loggedIn } from "../store/userStore";
    import { get } from "svelte/store";
    import { url } from "$lib/utils";

    function refreshToken() {
        if (get(loggedIn)) {
            fetch(url('oauth', 'access_token'), {
                method: 'POST',
                credentials: 'include'
            }).then((response) => {
                if (!response.ok) {
                    loggedIn.set(false);
                }
            })
        }
    }

    onMount(() => {
        refreshToken();

        setInterval(refreshToken, 30 * 60 * 1000)
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