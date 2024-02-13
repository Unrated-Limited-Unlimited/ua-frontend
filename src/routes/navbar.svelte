<script lang=ts>
    import { onMount } from "svelte";

    let current_theme: string;

    function toggle_theme(): void {
	const theme = current_theme === "dracula" ? "val" : "dracula";
	set_theme(theme);
    }   

    onMount(() => {
	const saved_theme =
		document.documentElement.getAttribute("data-theme");
	if (saved_theme) {
		current_theme = saved_theme;
		return;
	}

	const preference_is_dark = window.matchMedia(
		"(prefers-color-scheme: dracula)",
	).matches;

	const theme = preference_is_dark ? "val" : "dracula";
	set_theme(theme);
    });
    function set_theme(theme: string) {
        const one_year = 60 * 60 * 24 * 365;
        document.cookie = `theme=${theme}; max-age=${one_year}; path=/`;
        document.documentElement.setAttribute("data-theme", theme);
        current_theme = theme;
    }
</script>

<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/friends">Friends</a></li>
    <button on:click={toggle_theme}>random colour</button>
</ul>