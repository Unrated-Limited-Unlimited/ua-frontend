<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

    async function logout() {
        localStorage.removeItem("isLoggedIn");
        isLoggedIn = false;
    }
    export let isLoggedIn = !!localStorage.getItem("isLoggedIn");
</script>

{#if isLoggedIn} 
<div class="profileInf">
    <img src='profile/image/{data.user.id}.svg' alt="user icone" width=100px height=100px style="margin: 10px; border-radius: 50%;"/>
    <div>
        <h1>{data.user.username}</h1>
        <p>{data.user.bio}</p>
    </div>
</div>

<button on:click={logout}>Log out</button>
{:else}
    <div class="empty">
        <h2>You are not logged in</h2>
        <div>
            <a href="/profile/login">Login</a>
            <a href="/profile/register">Register</a>
        </div>
    </div>
{/if}

<style lang="scss">
    .profileInf {
        display: flex;
        flex-wrap: wrap;
    }
    .empty {
        text-align: center;
    }
</style>