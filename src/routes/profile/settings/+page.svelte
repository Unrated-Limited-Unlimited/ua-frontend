
<script lang="ts">
    import { goto } from "$app/navigation";
    import { url } from "$lib/utils";
    import type { PageData } from "../$types";
    import { loggedIn } from "../../../store/userStore";
    import { changeUser } from "./change";
    import { siteTheme } from "../../../store/themeStore";

    async function logout() {
        fetch(url("logout"), {method: "POST"}).then(() => loggedIn.set(false));

        goto("/");
    }

    export let data: PageData
    let selectedTheme = {id: "standard", name: "standard"};
    siteTheme.subscribe(theme => {
        selectedTheme = {id: theme, name: theme}
    })

    let themes = data.themes;

    let username = data.user.name;
    let email = data.user.email;
    let password = "";

    async function handleSubmit() {
        changeUser({ email: email, password: password }).then((res) => {
            email = res.email
            username = res.name
        })
    }

    function handleThemeChange() {
        setTheme(selectedTheme);
    }

    const setTheme = (theme: string) => {
        siteTheme.set(theme);
        document.cookie = `siteTheme=${theme};Max-Age=2592000;path="/";SameSite=None;Secure;`;
    };
</script>
<div>
    <h2>User info</h2>
    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <label for="username">Username</label>
            <input
                name="username"
                type="text"
                bind:value={username}
                disabled
            />
        </div>
        <div>
            <label for="email">Email</label>
            <input
                name="email"
                type="email"
                bind:value={email}
            />
        </div>
        <div>
            <label for="password">Password</label>
            <input
                name="password"
                type="password"
                bind:value={password}
            />
        </div>
        
        <button>Save changes</button>
    </form>
    <h2>Themes</h2>
        Select Theme:
        
        <select id="theme-selector" bind:value={selectedTheme} on:change={handleThemeChange}>
            {#if themes}
            {#each themes as {id, name}}
              <option value={id}>{name}</option>
            {/each}
            {/if}
        </select>          
    <h2>Log out</h2>
    <button name="logout" on:click={logout}>Log out</button>
</div>

