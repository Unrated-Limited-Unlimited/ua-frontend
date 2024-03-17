<script lang="ts">
    import { goto } from '$app/navigation';
    import { url } from '$lib/utils';
    import { loggedIn } from '../../../store/userStore';

    let username = "";
    let password = "";

    async function handleSubmit() {
        fetch(url("login"), {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(() => {
            loggedIn.set(true)
        })

        goto("/")
    }
</script>
<div class="main-window">
    <h2>Create a user</h2>

    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <label for="username">Username</label>
            <input
                name="username"
                type="username" 
                bind:value={username}
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
        
        <button>Log in</button>
    </form>
</div>

