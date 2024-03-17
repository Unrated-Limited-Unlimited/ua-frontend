<script lang="ts">
    import { goto } from '$app/navigation';
    import { url } from '$lib/utils';
    import { loggedIn } from '../../store/userStore';
	import type { PageData } from './$types';
	
	export let data: PageData;

    async function logout() {
        fetch(url("logout"), {method: "POST"}).then(() => loggedIn.set(false));

        goto("/");
    }
</script>

{#if !!data.user} 
<div class="profileInf">
    <img src="{data.user.img || `/profile/image/${data.user.id}.svg`}" alt="user icone" width=100px height=100px style="margin: 10px; border-radius: 50%;"/>
    <div>
        <h1>{data.user.name}</h1>
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