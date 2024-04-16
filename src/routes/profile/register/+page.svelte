<script lang="ts">
    import { goto } from '$app/navigation';
    import { url } from '$lib/utils';

    let username = "";
    let email = "";
    let password = "";

    async function handleSubmit() {
        

        fetch(url("register"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then(() => goto("/profile"));
    }
</script>

<div class="main-window">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-div">
            <h2>Create a user</h2>
            <div class="input-field">
                <label for="username">Username</label>
                <input
                    name="username"
                    autocomplete="off"
                    required
                    bind:value={username}
                />
            </div>
            <div class="input-field">
                <label for="email">Email</label>
                <input
                    name="email"
                    type="email"
                    bind:value={email}
                />
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input
                    name="password"
                    type="password"
                    bind:value={password}
                />
            </div>
            <button>register</button>
        </div>
    </form>
</div>

<style>
    p {
        margin: .5rem;
    }
    .main-window {
        padding-left: 2rem;
        text-align: center;
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
