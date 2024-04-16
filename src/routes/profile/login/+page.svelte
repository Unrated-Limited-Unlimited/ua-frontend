<script lang="ts">
    import { goto } from '$app/navigation';
    import { url } from '$lib/utils';
    import { loggedIn } from '../../../store/userStore';

    let username = "";
    let password = "";

    async function handleSubmit() {
        fetch(url("login"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: "include"
        }).then((res) => {
            loggedIn.set(true)
            goto("/")
        })
    }
</script>
<div class="main-window">
    <div>
    <h2>Create a user</h2>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="input-field">
            <label for="username">Username</label>
            <input
                name="username"
                type="username" 
                bind:value={username}
            />
        </div>
        
        <div class="input-field">
            <label for="password">Password</label>
            <input
                data-testid="action-password"
                name="password"
                type="password"
                bind:value={password}
            />
        </div>
        
        <button name="login">Log in</button>
    </form>
    </div>
</div>

<style>
    p {
        margin: .5rem;
    }
    .main-window {
        padding-left: 2rem;
    }
    .form-div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    button {
            width: 10rem;
            margin-top: 2rem;
        }
    @media only screen and (max-width: 639px) {
        .main-window {
            text-align: center;
        }
        .form-div {
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
        }
        button {
            width: 15rem;
            margin-top: 2rem;
        }
        .input-field {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-bottom: 1rem;
        }
    }
    @media only screen and (min-width: 640px) {

    }
    @media only screen and (min-width: 1200px) {

    }
</style>