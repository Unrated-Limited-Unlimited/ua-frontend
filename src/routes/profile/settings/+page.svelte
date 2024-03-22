
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

    let username = data.user.name;
    let email = data.user.email;
    let password = "";

    async function handleSubmit() {
        changeUser({ email: email, password: password }).then((res) => {
            email = res.email
            username = res.name
        })
    }
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

    <h2>Log out</h2>
    <button name="logout" on:click={logout}>Log out</button>
</div>

