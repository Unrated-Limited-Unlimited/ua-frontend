<script lang="ts">
    import { featureFlagStore, capitalize } from "../store/featureFlagStore";
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
    <li><a class="profile" href="/profile">Profile</a></li>
    <li><a class="whiskey" href="/whiskey">{ capitalize($featureFlagStore?.wiskeySpelling) }</a></li>
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
        color: var(--contrast-text)
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

    ul {
        margin: 0;
        display:grid;
        grid-template-areas: "home whiskeys profile";
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
    }
    @media only screen and (min-width: 640px) {
        .navbar-logo {
        max-height: 3rem;
        width: auto;
        font-family: 'Courier New', Courier, monospace;
        }
        ul {
            grid-template-columns: 70% 15% 15%;
        }
    }
    @media only screen and (min-width: 1200px) {
        ul {
            grid-template-columns: 85% 7.5% 7.5%;
        }
    }
</style>