<script lang="ts">
    import { page } from "$app/stores";
    import { query } from "$lib/graphql";
    import { limitNumber } from "$lib/utils";
    import { capitalize, featureFlagStore } from "../../store/featureFlagStore";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { get, writable, type Writable } from 'svelte/store';

	export let data: PageData;

    const WHISKEYS_QUERY = `
    query Whiskeys($paging: Paging!, $filters: [Filter], $sort: Sort) {
        getWhiskeys(paging: $paging, filters: $filters, sort: $sort) {
            id
            img
            title
            avgScore
            summary
            price
        }
    }
    `;

    interface Attribute {
        id: string;
        name: string;
    }

    interface AttributeValue {
        field: {
            attribute: {
                avgScore: string;
                id: string;
            }
        }
        comp: string;
    }

    interface SliderValues {
        [key: string]: AttributeValue;
    }
    
    let whiskeys: any[] = data.whiskey_list;
    let currentPage: number = 1;
    let isLoading: boolean = false;
    let pageSize = 20;
    let searchbar_value = "";
    let search_value = "";
    let currentSortType : string = "DEFAULT";
    let reverse_boolean : boolean = false;

    async function searchWhiskey(event: Event){
        whiskeys = [];
        search_value = searchbar_value;
        currentPage = 0;

        const button = event.target as HTMLButtonElement;
        button.disabled = true; // Disable the button to prevent multiple clicks

        try {
            const result = await fetchMoreWhiskeys();
            console.log(result); // Process the result
        } catch (error) {
            console.error(error); // Handle any errors
        } finally {
            button.disabled = false; // Re-enable the button regardless of the fetch result
        }
    }
    
    async function fetchMoreWhiskeys() {
        isLoading = true;

        const res = await query(fetch, WHISKEYS_QUERY, 
            {
                paging: {page: currentPage, size: pageSize},   
                sort: {sortType: currentSortType, reverse: reverse_boolean}, 
                filters: {field: {title: search_value}}
            });

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

    function swapReverse(event: Event){
        if(reverse_boolean) {
            reverse_boolean = false;
        }
        else {
            reverse_boolean = true;
        }
        searchWhiskey(event)
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

    function handleSelect(event: Event) {
        const target = event.target as HTMLSelectElement;
        currentSortType = target.value;
        searchWhiskey(event);
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
        <div class="search">
            <h1>{ capitalize($featureFlagStore?.wiskeySpelling) }</h1>
            <div>
                <div class="flex-inline centered">
                    <input class="searchbar" id="searchbar" bind:value={searchbar_value} type="text" placeholder="Search...">
                    <button class="searchButton" id="searchButton" on:click={searchWhiskey}>search</button>
                </div>
            </div>
            <div class="sort-thing">
                <p>sort by:</p>
                <select bind:value={currentSortType} on:change={handleSelect}>
                    <option value="DEFAULT">Standard</option>
                    {#if $featureFlagStore?.recommendation}
                    <option value="RECOMMENDED">Recommended</option>
                    {/if}
                    <option value="BEST">Best Rating</option>
                    <option value="POPULAR">Popular</option>
                    <option value="HIGHEST">Ratring</option>
                    <option value="PRICE">Price</option>
                    <option value="VALUE">Price per volume</option>
                    <option value="RANDOM">Random</option>
                </select>
                <button on:click={swapReverse}>
                    reverse
                </button>
            </div>
        </div>
        <div class="grid-container">
            {#each whiskeys as whiskey}
            <a id="whiskey-link" href="/whiskey/{whiskey.id}">
                <div class="whiskey-view-container hover-shadow">
                    <div class="whiskey-view-image-container">
                        <img class="whiskey-view-image" alt={whiskey.title} src={(whiskey.img)}>
                    </div>
                    <div class="flex-column centered">
                        <h2>
                            {truncateString(whiskey.title, 20, true)}
                        </h2>
                        <p>{truncateString(whiskey.summary, 30)}</p>
                        <p>{whiskey.price} NOK</p>
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


<style lang="scss">
    .grid-container {
        display: grid;
        grid-template-columns: 96vw;
        gap: 2vw;
        margin: 2vw;
        text-align: center;
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
        color: var(--contrast-text);
        overflow-wrap: break-word;
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

    .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 2rem;
        margin-bottom: 2rem;

        input{
            height: 2rem;
            width: 20vw;
        }
        .searchbar{
            border-radius: 2rem 0 0 2rem; // topleft, Top right, bottom right, bottom left
            padding-left: .8rem;
            border: 2px solid gainsboro;
            margin: 0;
            height: 2rem;
        }
        .searchButton {
            border-radius: 0 2rem 2rem 0; // topleft, Top right, bottom right, bottom left
            padding-right: .5rem;
            height: 2.38rem;
            margin: 0;
            border: 4px solid var(--accent);
        }
    }

    .aligned {
        display: grid;
        grid-template-columns: 1.3fr 1fr 10fr;
        text-align: left;
    }
    .filters {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .sort-thing {
        gap: 1rem;
        display: inline-flex;
        align-items: center;
        p{
            padding: 0;
        }
        button {
            height: 2rem;
        }
    }

    body {margin: 0}
    h2 {
        padding: 0;
        margin: 0;
    }
</style>
