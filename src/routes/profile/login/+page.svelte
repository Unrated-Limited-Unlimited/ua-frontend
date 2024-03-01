<script lang="ts">
    import { goto } from '$app/navigation';

    let username = "";
    let password = "";

    async function handleSubmit() {
        fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        goto("/")
    }
</script>

<h2>Create a user</h2>

<form on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="email">Email</label>
        <input
            name="email"
            type="email" 
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

