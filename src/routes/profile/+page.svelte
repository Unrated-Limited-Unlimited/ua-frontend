<script lang="ts">
    import { goto } from '$app/navigation';
    import { url } from '$lib/utils';
    import { loggedIn } from '../../store/userStore';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

{#if !!data.user} 
    <div class="main-window">
        <div class="profileInf">
            <img src="{data.user.img || `/profile/image/${data.user.id}.svg`}" alt="user icone" width=100px height=100px style="margin: 10px; border-radius: 50%;"/>
            <div>
                <h1>{data.user.name}</h1>
            </div>
        </div>
        <button>
            <a href="/profile/settings">Settings</a>
        </button>

        <div class="myRatings">
            <h2>My Ratings</h2>
            {#each data.user.ratings as review}
                <div class="rating-box">
                    <div class="review-display-name">
                    <h4><a href="/whiskey/{review.whiskey.id}">{review.whiskey.title}</a></h4>
                    <h3>{review.title}</h3>
                        <div>            
                            {#each Array(review.score*5) as _, index}
                                <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path 
                                        fill="currentColor" 
                                        d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                                </svg>
                            {/each}
                            {#each Array(5-review.score*5) as _, index}
                            <svg class="unfill-rating-star rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path 
                                    fill="currentColor" 
                                    d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                            </svg>
                            {/each}
                        </div>
                    </div>
                    <p>{review.body}</p>
                </div>
            {/each}
        </div>
    </div>
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
    .main-window {
            margin: 2rem;

            .rating-box {
                background-color: var(--navbar);
                color: var(--contrast-text);
                padding: 2rem;
            }
        }
    img {
        border-radius: 100%;
        border: .15rem solid var(--contrast-text);
    }
    h4{
        a{
            text-decoration: none;
            color: var(--contrast-text);
            opacity: 0.6;
        }
        a:hover{
            color: var(--accent);
            opacity: 1;
        }
        margin: 0;
    }
    .profileInf {
        display: flex;
        flex-wrap: wrap;
        background-color: var(--navbar);
        color: var(--contrast-text);
        border-radius: 2rem;
        border: 2rem solid var(--navbar);
    }
    .empty {
        text-align: center;
    }

    .rating-star {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        margin: 0;
    }
    svg{
        color: var(--accent);
    }
    .unfill-rating-star {
        color: var(--bg-color)
    }
    .myRatings {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%
    }
</style>