
<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import Icon from "$lib/icon.svelte";
    import { imageUrl, url } from "$lib/utils";
    import type { PageData } from "../$types";
    import { newImageCache } from "../../../store/imageCache";
    import { loggedIn } from "../../../store/userStore";
    import { changeUser } from "./change";
    import { siteTheme } from "../../../store/themeStore";

    async function logout() {
        fetch(url("logout"), {
            method: "POST",
            credentials: "include"
        }).then(() => loggedIn.set(false));

        goto("/");
    }

    export let data: PageData

    let selectedTheme = {id: "standard", name: "standard"};
    siteTheme.subscribe(theme => {
        selectedTheme = {id: theme, name: theme}
    })

    let themes = data.themes;

    let eddeting = false;
    function enableEdditing() {
        eddeting = true;
        iconEddit = false;
    }

    let iconEddit = false;
    function enableIconEdit() {
        iconEddit = true;
        eddeting = false;
    }

    let files: any;
    let tempImageUrl = "";

    function createImageUrl() {
        if (files && files[0]) {
            tempImageUrl = URL.createObjectURL(files[0]);
        } else {
            tempImageUrl = "";
        }
    }

    async function cancelImage() {
        image = data.user.img;
        iconEddit = false;
        files = [];
        tempImageUrl = "";
    }

    let warning = ""

    let username = data.user.name;
    let email = data.user.email;
    let password = "";
    let repeatPassword = "";

    let image = data.user.img;

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
                data.user.email = email

                username = res.data.editUser.name
                data.user.name = username

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
        siteTheme.set(theme);
        document.cookie = `siteTheme=${theme};Max-Age=2592000;path="/";SameSite=None;Secure;`;
    };


    function uploadImage() {
        if (files && files[0]) {
            const formData = new FormData()
            formData.append("file", files[0])

            fetch(url("img", "profile"), {
                method: "POST",
                body: formData,
                credentials: "include"
            }).then((res) => {
                if (res.ok) {
                    image = `p${data.user.id}`;
                    data.user.img = image;
                    iconEddit = false;
                    newImageCache();
                }
                tempImageUrl = "";
            })
        }
    }
</script>
<div class="main-window">
    <Icon id={data.user.id} image={tempImageUrl || imageUrl(image)}></Icon>
    {#if iconEddit}
    <form on:submit|preventDefault>
        <div>
            <label for="img">Select image:</label>
            <input bind:files on:change={createImageUrl} type="file" id="img" name="img" accept="image/*"> 
        </div>
        <button disabled={!files} on:click={uploadImage}>Save changes</button>
        <button on:click={cancelImage}>Cancel changes</button>
      </form>
    {:else}
    <button on:click|preventDefault={enableIconEdit}>Change icon</button>
    {/if}
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

