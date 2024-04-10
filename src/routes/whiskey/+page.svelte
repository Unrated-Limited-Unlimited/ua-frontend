<script lang="ts">
    import { capitalize, featureFlagStore } from "../../store/featureFlagStore";
    import type { PageData } from "./$types";

	export let data: PageData;
</script>

<body>
    
    {#if data.whiskey_list}
    <div>
        <h1>{ capitalize($featureFlagStore?.wiskeySpelling) }</h1>
        <div class="grid-container">
            {#each Array(10) as _}
            {#each data.whiskey_list as whiskey}
            <a id="whiskey-link" href="/whiskey/{whiskey.id}">
                <div class="whiskey-view-container">
                    <div class="whiskey-view-image-container">
                        <img class="whiskey-view-image" alt={whiskey.title} src={(whiskey.img)}>
                    </div>
                    <div class="whiskey-view-desc">
                        <h2>
                            {whiskey.title}
                        </h2>
                        <div class="stars">
                            {#each Array(Math.round(whiskey.avgScore*5)) as _, index}
                            <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path 
                                        fill="currentColor" 
                                        d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                                </svg>
                            {/each}
                            {#each Array(5-Math.round(whiskey.avgScore*5)) as _, index}
                            <svg class="unfill-rating-star rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                            </svg>
                            {/each}
                        </div>
                    </div>
                </div>
            </a>
            {/each}
            {/each}
        </div>
    </div>
    {/if}
</body>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        gap: 2vw;
        width: 90vw;
        margin: 2vw;
    }
    body {
        margin: 2rem;
    }
    a {
        text-decoration: none;
    }
    .whiskey-view-desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:auto;
        height: auto;
    }
    .whiskey-view-container {
        margin: 0;
        background-color: var(--navbar);
        display: flex;
        justify-content:flex-start; 
        gap: .5rem;
        flex-direction:row;
        border-radius: 2rem;
        padding: .5rem;
        height: 15rem;
        width: auto;
        color: var(--contrast-text)
    }
    .whiskey-view-container:hover{
        box-shadow: .02rem .02rem .5rem;
    }
    h3{
        margin: 0;
    }
    .whiskey-view-image-container{
        background-color: white;
        max-width: 7rem;
        max-height: 15rem;
        min-width: 4rem;
        width: auto;
        height: auto;
        padding: .5rem;
        display: flex;
        justify-content: center;
        border-radius: 2rem;
    }
    .whiskey-view-image {
        max-width: 7rem;
        min-width: 5rem;
        width: auto;
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
    svg{
        color: var(--accent);
    }
    .unfill-rating-star {
        fill: var(--bg-color)
    }

    body {margin: 0}
</style>
