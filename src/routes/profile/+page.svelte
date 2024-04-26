<script lang="ts">
	import type { PageData } from './$types';
    import Rating from './rating.svelte';
    import Profileinfo from './profileinfo.svelte';
	
	export let data: PageData;

</script>

{#if !!data.user} 
    <div class="main-window">
        <div class="userHeader">
            <Profileinfo user={data.user}></Profileinfo>
            <div>
                <button>
                    <a href="/profile/settings">User Settings</a>
                </button>
            </div>
        </div>

        <div class="myRatings">
            <h2>My Ratings</h2>
            {#each data.user.ratings as review}
                <Rating review={review}></Rating>
            {/each}
        </div>
    </div>
{:else}
    <div class="empty">
        <h2>You are not logged in</h2>
        <div class="a-buttons">
            <a class="hover-shadow" href="/profile/login">Login</a>
            <a class="hover-shadow" href="/profile/register">Register</a>
        </div>
    </div>
{/if}

<style lang="scss" module>
    :global(.main-window) {
        margin: 2rem;
    }
    :global(.userHeader) {
        display: flex;
        justify-content: space-between;
        background-color: var(--navbar);
        color: var(--contrast-text);
        border-radius: 2rem;
        border: 2rem solid var(--navbar);
    }
    :global(.empty) {
        text-align: center;
    }
    @media only screen and (max-width: 639px) {
            :global(.main-window) {
                margin: 1rem;
            }
            :global(.userHeader) {
                display: flex;
                flex-direction: column;
            }
        }
</style>