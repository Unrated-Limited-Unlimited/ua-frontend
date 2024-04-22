
<script lang="ts">
    import { goto } from "$app/navigation";
    import { url } from "$lib/utils";
    import type { PageData } from "../$types";
    import { loggedIn } from "../../../store/userStore";
    import { changeUser } from "./change";

    async function logout() {
        fetch(url("logout"), {method: "POST"}).then(() => loggedIn.set(false));

        goto("/");
    }

    export let data: PageData
    let data__theme = document.documentElement.getAttribute("data-theme");
    let selectedTheme = "standard";
    if(data__theme) {
        selectedTheme = data__theme;
    }

    let themes = data.themes;

    let eddeting = false;
    function enableEdditing() {
        eddeting = true;
    }

    let warning = ""

    let username = data.user.name;
    let email = data.user.email;
    let password = "";
    let repeatPassword = "";

    async function cancelSubmit() {
        username = data.user.name;
        email = data.user.email;
        password = "";
        repeatPassword = "";

        warning = ""

        eddeting = false;
    }

    async function handleSubmit() {
        let changes: any = {}
        if (email != "") {
            changes.email = email;
        }
        if (password != "") {
            if (password !== repeatPassword) {
                warning = "Repeat password is not the same";
                return;
            }
            changes.password = password;
        }
        changeUser(changes).then((res) => {
            if (res.errors && res.errors[0]) {
                password = ""
                repeatPassword = ""

                warning = res.errors[0].message
            } else if (res.data) {
                email = res.data.editUser.email
                username = res.data.editUser.name
                password = ""
                repeatPassword = ""

                warning = ""

                eddeting = false
            } else {
                
            }

        })
    }

    function handleThemeChange() {
        setTheme(selectedTheme);
    }

    const setTheme = (theme: string) => {
        document.documentElement.dataset.theme = theme;
        document.cookie = `siteTheme=${theme};Max-Age=2592000;path="/";SameSite=None;Secure;`;
    };
</script>
<div class="main-window">
    <h2>User info</h2>
    <form on:submit|preventDefault>
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
                disabled={!eddeting}
                pattern="{`[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-z]{2,}$`}"
                bind:value={email}
            />
        </div>
        {#if eddeting}
        <div>
            <label for="password">Password</label>
            <input
                name="password"
                type="password"
                pattern="{`.{8,}$`}"
                bind:value={password}
            />
        </div>
        <div class="input-field">
            <label for="repete">Repeat password</label>
            <input
                class={(password === repeatPassword) ? '' : 'invalid'}
                name="repeat"
                type="password"
                bind:value={repeatPassword}
            />
        </div>
        {#if warning}
            <p class="warning">{warning}</p>
        {/if}
        <button on:click={handleSubmit}>Save changes</button>
        <button on:click={cancelSubmit}>Cancel changes</button>
        {:else}
        <button on:click|preventDefault={enableEdditing}>Change profile</button>
        {/if}
    </form>
    <h2>Log out</h2>
    <button name="logout" on:click={logout}>Log out</button>
    <h2>Themes</h2>
        Select Theme:
        
        <select id="theme-selector" bind:value={selectedTheme} on:change={handleThemeChange}>
            {#if themes}
            {#each themes as {id, name}}
              <option value={id}>{name}</option>
            {/each}
            {/if}
        </select>
</div>

<style>
    .main-window {
        margin-left: 2rem;
    }
</style>

