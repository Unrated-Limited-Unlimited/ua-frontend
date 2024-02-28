<script lang="ts">
import { goto } from '$app/navigation';

    let username = "";
    let password = "";

    async function handleSubmit() {
        try {
            localStorage.setItem("isLoggedIn", "true")
            goto("/")
        } catch (error) {

        }
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

