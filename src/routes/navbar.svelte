<script lang=ts>
    import { onMount } from "svelte";

    let current_theme: string;

    function toggle_theme(): void {
	const theme = current_theme === "dracula" ? "val" : "dracula";
	set_theme(theme);
    }   

    function getCookie(name: string): string | undefined {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return undefined;
    }

    onMount(() => {
	let theme =
        getCookie("data-theme");
        console.log("cookie theme is:"+theme)
	if (theme) {
		current_theme = theme;
        set_theme(theme);
		return;
	}
    else{
        const preference_is_dark = window.matchMedia(
		"(prefers-color-scheme: dracula)",
        ).matches;

        theme = preference_is_dark ? "val" : "dracula";
    }

	set_theme(theme);
    });

    function set_theme(theme: string) {
        const one_year = 60 * 60 * 24 * 365;
        document.cookie = `data-theme=${theme}; max-age=${one_year}; path=/; SameSite=None; Secure`;
        document.documentElement.setAttribute("data-theme", theme);
        current_theme = theme;
    }
</script>

<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/friends">Friends</a></li>
    <li><a href="/whiskey-list">whiskey-list (testing)</a></li>
    <button on:click={toggle_theme}>colour toggle</button>
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