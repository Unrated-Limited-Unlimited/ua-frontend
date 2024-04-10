<script lang="ts">
    import { featureFlagStore, capitalize } from "../store/featureFlagStore";
    import { onMount, onDestroy } from 'svelte';
    let isMobile = false;

    function checkWindowSize() {
        // Example breakpoint at 640px
        isMobile = window.innerWidth < 640;
    }

    onMount(() => {
        checkWindowSize(); // Check size on mount
        window.addEventListener('resize', checkWindowSize);
    });

    onDestroy(() => {
        window.removeEventListener('resize', checkWindowSize);
    });
</script>

<ul>
    <div class="logo">
        <li>
            <a href="/">
            {#if $featureFlagStore?.fancyLogo}
                <img class="navbar-logo" alt="Unrated" src="/assets/Logo_4k.png">
            {:else}
                <picture class="">
                    <source media="(max-width:639px)" srcset="/assets/VectorLogoUnrated.svg">
                    <source media="(min-width:640px)" srcset="/assets/VectorLogoUnratedText.svg">
                    <img class="navbar-logo" alt="Unrated"  src="640px,/assets/VectorLogoUnratedText.svg">
                </picture>
            {/if}
            </a>
        </li>
    </div>
    {#if isMobile}
        <li class="profile"><a href="/profile">Profile</a></li>
        <li class="whiskey"><a href="/whiskey">{ capitalize($featureFlagStore?.wiskeySpelling) }</a></li>
    {:else}
        <div class="navbar-links">
            <li><a class="profile" href="/profile">Profile</a></li>
            <li><a class="whiskey" href="/whiskey">{ capitalize($featureFlagStore?.wiskeySpelling) }</a></li>
        </div>
    {/if}
</ul>

<style>
    .navbar-logo {
        max-height: 3rem;
        width: auto;
        font-family: 'Courier New', Courier, monospace;
    }

    .navbar-links {
        display: flex;
        gap: 3rem;
        padding: .5rem;
    }

    a{
        text-decoration: none;
    }

    ul {
        margin: 0;
        display:flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        padding: .5rem;
        padding-right: 2rem;
        font-size: larger;
    }

    @media only screen and (max-width: 639px) {
        ul {
            overflow: hidden;
            position: fixed;
            bottom: 0;
            width: 100%;
            display: grid;
            grid-template-areas: "whiskeys home profile";
            grid-template-columns: 1fr 1fr 1fr;
            justify-items: center;
            border-top: 3px solid var(--bg-color);
        }
        .whiskey {
            grid-area: whiskeys;
        }
        .profile {
            grid-area: profile;
        }
        .logo {
            grid-area: home;
        }
    }
    @media only screen and (min-width: 640px) {
        .navbar-logo {
        max-height: 3rem;
        width: auto;
        font-family: 'Courier New', Courier, monospace;
        }
    }
    @media only screen and (min-width: 1200px) {

    }
</style>