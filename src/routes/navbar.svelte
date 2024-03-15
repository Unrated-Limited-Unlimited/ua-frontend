<script lang=ts>
    const setTheme = (theme: string) => {
        document.documentElement.dataset.theme = theme;
        document.cookie = `siteTheme=${theme};Max-Age=2592000;path="/";SameSite=None;Secure;`;
    };
</script>

<ul>
    <div>
        <li><a href="/"><img class="navbar-logo" alt="Unrated" src="/assets/VectorLogoUnratedText.svg"></a></li>
    </div>
    <div class="navbar-links">
        <li><a href="/profile">Profile</a></li>
        <li><a href="/friends">Friends</a></li>
        <li><a href="/whiskey">whiskey-list (testing)</a></li>
        <button on:click="{() => setTheme('val')}">val Theme</button>
        <button on:click="{() => setTheme('dracula')}">dracula Theme</button>
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