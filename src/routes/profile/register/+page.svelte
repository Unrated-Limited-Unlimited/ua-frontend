<script lang="ts">
    import { goto } from '$app/navigation';
    import { url } from '$lib/utils';

    let username = "";
    let email = "";
    let password = "";
    let repeatPassword = "";

    let warning = ""

    function resetPassword() {
        password = ""
        repeatPassword = ""
    }

    async function handleSubmit() {
        if (!username || !email || !password) {
            warning = "All fealds needs to be fild out";
            resetPassword();
            return;
        }

        if (password != repeatPassword) {
            warning = "Repeat password is not the same";
            resetPassword();
            return;
        }

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
        }).then((response) => {
            if (response.ok) {
                goto("/profile/login");
                return;
            };
            response.text().then(text => {
                warning = text;
                resetPassword();
            });
        });
        
    }
</script>

<div class="main-window">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-div">
            <h2>Create a user</h2>
            <div class="input-field">
                <label for="username">Username</label>
                <input
                    required={!!warning}
                    name="username"
                    autocomplete="off"
                    pattern="{`.{3,}`}"
                    bind:value={username}
                />
            </div>
            <div class="input-field">
                <label for="email">Email</label>
                <input
                    required={!!warning}
                    name="email"
                    type="email"
                    pattern="{`[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-z]{2,}$`}"
                    bind:value={email}
                />
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input
                    required={!!warning}
                    name="password"
                    type="password"
                    pattern="{`.{8,}`}"
                    bind:value={password}
                />
            </div>
            <div class="input-field">
                <label for="repete">Repeat password</label>
                <input
                    required={!!warning}
                    class={!((password.length === repeatPassword.length || !!warning) &&
                        password !== repeatPassword) ? '' : 'invalid'}
                    name="repeat"
                    type="password"
                    bind:value={repeatPassword}
                />
            </div>
            {#if warning}
                <p class="warning">{warning}</p>
            {/if}
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
