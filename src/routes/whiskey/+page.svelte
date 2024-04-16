<script lang="ts">
    import { page } from "$app/stores";
    import { query } from "$lib/graphql";
    import { limitNumber } from "$lib/utils";
    import { capitalize, featureFlagStore } from "../../store/featureFlagStore";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";

	export let data: PageData;

    const WHISKEYS_QUERY = `
    query Whiskeys($paging: Paging!) {
        getWhiskeys(paging: $paging) {
            id
            img
            title
            avgScore
            summary
        }
    }
    `;

    let whiskeys: any[] = data.whiskey_list;
    let currentPage: number = 1;
    let isLoading: boolean = false;
    let pageSize = 20;

    async function fetchMoreWhiskeys() {
        isLoading = true;

        const res = await query(fetch, WHISKEYS_QUERY, {paging: {page: currentPage, size: pageSize}});
        if (res.status === 200) {
        const jsonData = await res.json();
        if (jsonData.data && jsonData.data.getWhiskeys.length > 0) {
            whiskeys = [...whiskeys, ...jsonData.data.getWhiskeys];
            currentPage += 1; // Prepare the page number for the next request
        }
        } else {
        console.error("Failed to fetch data:", await res.json());
        }
        isLoading = false;
    }

    function checkScroll() {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (nearBottom && !isLoading) {
            fetchMoreWhiskeys();
        }
    }

    function truncateString(str: string, maxLength: number, useEllipsis: boolean = true): string {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + (useEllipsis ? '...' : '');
    }
    return str;
    }

    onMount(() => {
        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    });
</script>
    
    {#if whiskeys}
    <div class="main-container">
        <h1>{ capitalize($featureFlagStore?.wiskeySpelling) }</h1>
        <div class="grid-container">
            {#each whiskeys as whiskey}
            <a id="whiskey-link" href="/whiskey/{whiskey.id}">
                <div class="whiskey-view-container hover-shadow">
                    <div class="whiskey-view-image-container">
                        <img class="whiskey-view-image" alt={whiskey.title} src={(whiskey.img)}>
                    </div>
                    <div class="flex-column centered">
                        <h2>
                            {whiskey.title}
                        </h2>
                        <p>{truncateString(whiskey.summary, 30)}</p>
                        <div class="stars">
                            {#each Array(Math.round(limitNumber(whiskey.avgScore)*5)) as _, index}
                            <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path 
                                        fill="currentColor" 
                                        d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                                </svg>
                            {/each}
                            {#each Array(5-Math.round(limitNumber(whiskey.avgScore)*5)) as _, index}
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
        </div>
    </div>
    {/if}


<style>
    .grid-container {
        display: grid;
        grid-template-columns: 96vw;
        gap: 2vw;
        margin: 2vw;
    }
    @media only screen and (max-width: 639px) {
        .main-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
    @media only screen and (min-width: 640px) {
        .grid-container{
            display: grid;
            grid-template-columns: 47vw 47vw;
            gap: 2vw;
            margin: 2vw;
            margin-top: 0;
        }
    }
    @media only screen and (min-width: 1350px) {
        .main-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0;
        }
        .grid-container{
            display: grid;
            grid-template-columns: 22.5vw 22.5vw 22.5vw 22.5vw;
            gap: 2vw;
            margin-left: 2vw;
            margin-right: 2vw;
        }
    }
    a {
        text-decoration: none;
    }
    .whiskey-view-container {
        margin: 0;
        background-color: var(--navbar);
        display: grid;
        grid-template-columns: 30% 70%;
        gap: .5rem;
        flex-direction:row;
        border-radius: 2rem;
        padding: .5rem;
        padding-left: 11.25px;
        height: 15rem;
        width: auto;
        color: var(--contrast-text)
    }
    .whiskey-view-image-container{
        background-color: white;
        max-width: 14rem;
        max-height: 14rem;
        min-width: 4rem;
        padding: .5rem;
        display: flex;
        justify-content: center;
        border-radius: 2rem;
    }
    .whiskey-view-image {
        max-width: 14rem;
        max-height: 14rem;
        width: auto;
        height: auto;
        border-radius: 2rem;
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
