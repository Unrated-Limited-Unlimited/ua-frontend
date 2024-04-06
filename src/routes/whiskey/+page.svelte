<script lang="ts">
    import { capitalize, featureFlagStore } from "../../store/featureFlagStore";
    import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>	
    <title>{ capitalize($featureFlagStore?.wiskeySpelling) + "s" } - Unrated</title>
</svelte:head>	

<body>
    
    {#if data.whiskey_list}
    <div>
        <h1>{ capitalize($featureFlagStore?.wiskeySpelling) + "s" }</h1>
        {#each data.whiskey_list as whiskey}
        <a id="whiskey-link" href="/whiskey/{whiskey.id}">
            <div class="whiskey-view-container">
                <div class="whiskey-view-image-container">
                    <img class="whiskey-view-image" alt={whiskey.title} src={whiskey.img}>
                </div>
                <div class="whiskey-view-desc">
                    <h3>
                        {whiskey.title}
                    </h3>
                    <div class="stars">
                        {#each Array(Math.round(whiskey.avgScore)) as _}
                            <div>
                                <svg class="rating-star" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentcolor" d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                                </svg>
                                <!--<img class="rating-star" src="/assets/reshot-icon-stars-SKPW9CD3X8.svg">-->
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </a>
        {/each}
    </div>
    {/if}
</body>

<style>
    body {
        margin: 2rem;
    }
    .whiskey-view-desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:10rem;
        height: auto;
    }
    .whiskey-view-container {
        background-color: var(--navbar);
        display: flex;
        justify-content:flex-start;
        gap: 1rem;
        flex-direction:row;
        margin: .5rem;
        border-radius: 2rem;
        padding: .5rem;
    }
    h3{
        margin: 0;
    }
    .whiskey-view-image-container{
        flex-grow: 1;
        background-color: white;
        max-width: 7rem;
        max-height: 7rem;
        min-width: 4rem;
        height: auto;
        padding: .5rem;
        display: flex;
        justify-content: center;
        border-radius: 2rem;
    }
    .whiskey-view-image {
        max-height: 7rem;
        max-width: 7rem;
        min-width: 2rem;
        height: auto;
    }

    .stars {
        display: flex;
        padding-top: 1rem;
        height: auto;
    }
    .rating-star {
        width: 2rem;
        height: 2rem;
        padding: 0;
        margin: 0;
    }

</style>