<script lang="ts">
    import { goto } from '$app/navigation';

    let username = "";
    let email = "";
    let password = "";

    async function handleSubmit() {
        

        fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then(() => goto("/profile"));
    }
</script>

<div class="main-window">
    <form on:submit={handleSubmit}>
        <h2>Create a user</h2>
        <div>
            <label for="username">Username</label>
            <input
                name="username"
                autocomplete="off"
                required
                bind:value={username}
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
        <button>register</button>
    </form>
</div>
