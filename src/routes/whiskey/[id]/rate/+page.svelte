<script lang="ts">
    import type { PageData } from "./$types";    
    import { writable } from 'svelte/store';
    import { url } from '$lib/utils';
    import { goto } from '$app/navigation';

    export let data : PageData
    export let id = data.id;

    let rating = writable(0); // stores the rating
    let hoveredRating = writable(0); // stores the hover state rating
    let comment = '';
    let smoothFiery = 2;
    let mellowPeaty = 2;
    let drySweet = 2;
    let simpleComplex = 2;

    // Function to set the rating
    function setRating(index: number): void {
        rating.set(index + 1); // set the rating based on star clicked
    }

    // Function to update the hover state
    function updateHoverState(index: number): void {
        hoveredRating.set(index + 1);
    }

    // Function to reset hover state to current rating
    function resetHoverState(): void {
        hoveredRating.set(0);
    }

    // Posts the rating to the backend.
    async function createRating(){
        // TODO: Create post request.

        goto('/whiskey/'+id)
    }
</script>

<div class="main-window">
    <h1>Creating rating</h1>
    <div class="whiskey-desc">
        <h2>{data.whiskey.title}</h2>
    </div>
    <div class=rating-details>
        <label for="comment">Comment</label>
        <textarea id="comment" bind:value={comment}></textarea>
        <label for="score">Rating</label>
        <div class="star-buttons">
            {#each Array(5) as _, index}
                <button 
                    class="star-button"
                    on:mouseover={() => updateHoverState(index)}
                    on:mouseout={resetHoverState}
                    on:focus={() => updateHoverState(index)}
                    on:blur={resetHoverState}
                    on:click={() => setRating(index)}>
                    <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path 
                            class:active-star={$hoveredRating > index || $rating > index} 
                            fill="currentColor" 
                            d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                    </svg>
                </button>
            {/each}
        </div>
        <h3>Other rating areas {$rating}</h3>
        Smooth - Fiery
        <input type="range" min="0" max="4" bind:value={smoothFiery} class="slider">
        Mellow - Peaty
        <input type="range" min="0" max="4" bind:value={mellowPeaty} class="slider">
        Dry - Sweet
        <input type="range" min="0" max="4" bind:value={drySweet} class="slider">
        Simple - Complex
        <input type="range" min="0" max="4" bind:value={simpleComplex} class="slider">

        <button on:click={createRating}>Create Review</button>
    </div>
</div>

<style>
    .whiskey-desc {
        display: flex;
        flex-direction: column;
    }
    .rating-details {
        display: flex;
        flex-direction: column;
    }
    .star-buttons {
        display: flex;
        justify-content: center;
    }
    .star-button{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        padding: 0;
        margin: 0;
        color: var(--navbar);
        border: none;
        background-color: inherit;
    }
    .rating-star{
        width: 100%;
        height: 100%;
        padding:0;
    }
    .active-star {
        color: var(--accent); /* Red or any color you define */
    }
    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 1rem;
        border-radius: 1rem;
        background: var(--navbar);
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25%;
        height: 1rem;
        border-radius: 100%;
        border: none;
        cursor: pointer;
        background-color: var(--accent);
    }
    .slider::-moz-range-thumb {
        width: 25%;
        height: 1rem;
        border-radius: 1rem;
        border: none;
        cursor: pointer;
        background-color: var(--accent);
    }

</style>