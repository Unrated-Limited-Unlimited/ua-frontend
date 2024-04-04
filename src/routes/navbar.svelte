<script lang="ts">
    import flagsmith from 'flagsmith';
    
    export let fancyLogo = false;

    flagsmith.init({
        environmentID: "3DGuwpd47RjMmj9ajBh8uU",
        cacheFlags: true,
        onChange() {
            fancyLogo = flagsmith.hasFeature("logo-change")
        },
    })
</script>

<ul>
    <div>
        <li>
            <a href="/">
            {#if fancyLogo}
                <img class="navbar-logo" alt="Unrated" src="/assets/Logo_4k.png">
            {:else}
                <img class="navbar-logo" alt="Unrated" src="/assets/VectorLogoUnratedText.svg">
            {/if}
            </a>
        </li>
    </div>
    <div class="navbar-links">
        <li><a href="/profile">Profile</a></li>
        <li><a href="/whiskey">Whiskey</a></li>
    </div>
</ul>

<style>
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
</style>