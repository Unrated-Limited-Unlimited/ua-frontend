<script lang=ts>
    const setTheme = (theme: string) => {
        document.documentElement.dataset.theme = theme;
        document.cookie = `siteTheme=${theme};Max-Age=2592000;path="/";SameSite=None;Secure;`;
    };
</script>

<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/friends">Friends</a></li>
    <li><a href="/whiskey-list">whiskey-list (testing)</a></li>
    <button on:click="{() => setTheme('val')}">val Theme</button>
    <button on:click="{() => setTheme('dracula')}">dracula Theme</button>
</ul>

<style>
    ul {
        margin: 0;
        display:flex;
        justify-content: flex-start;
        gap: 3rem;
        list-style: none;
        padding: .5rem;
    }
</style>