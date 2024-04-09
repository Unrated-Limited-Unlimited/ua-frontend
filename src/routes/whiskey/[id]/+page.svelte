
<script lang="ts">
        import type { PageData } from "./$types";
        export let data: PageData;
        export let id = data.id;
        let roundScore = Math.round(data.whiskey.avgScore)

        let categories = data.whiskey.categories;

        let reviews= data.whiskey.ratings
</script>

<div class="whiskey-site">
    <div class="main-box">
        <div class="whiskey-image"><img class="whiskey-image" alt={data.whiskey.name} src={(data.whiskey.img)}></div>
        <div class="info">
            <!--<p>{data.whiskey.producer}</p>-->
            <h2>{data.whiskey.title}</h2>
            <div class="score-container">
                <h1>{roundScore}</h1>
                <div class="stars">
                    {#each Array(roundScore) as _, index}
                    <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path 
                                fill="currentColor" 
                                d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                        </svg>
                    {/each}
                    {#each Array(5-roundScore) as _, index}
                    <svg class="unfill-rating-star2 rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                    </svg>
                    {/each}
                </div>
                <a href="/whiskey/{id}/rate">Rate this whiskey!</a>
            </div>
            <p>{data.whiskey.summary}</p>
            <!--
                currently no favourite system implemented
                <button>Favourite</button>
                -->
        </div>
    </div>
    <div class="main-window taste-profile">
        <h3>Taste profile</h3>
        <div class = "sliders">
            {#each categories as category}
                <div class="slider-box">
                    <p>{category.name}</p>
                    <input type="range" min="0" max="4" bind:value={category.avgScore} class="slider" disabled>
                </div>
            {/each}
        </div>
    </div>

    <div class="main-window review-box">
        <h3>User Reviews</h3>
        {#each reviews as review}
            <div class="rating-box">
                <div class="review-display-name">
                <h2>{review.title}</h2>
                    <div>            
                        {#each Array(parseFloat(review.score)) as _, index}
                            <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path 
                                    fill="currentColor" 
                                    d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                            </svg>
                        {/each}
                        {#each Array(5-parseFloat(review.score)) as _, index}
                        <svg class="unfill-rating-star rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path 
                                fill="currentColor" 
                                d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                        </svg>
                        {/each}
                    </div>
                </div>
                <p>{review.body}</p>
                <h4>written by {review.user.name}</h4>
            </div>
        {/each}
    </div>
</div>


<style lang="scss">
    .whiskey-site {
        background-color: var(--navbar);
        display: flex;
        flex-direction: column;
        margin: 0;
    }
    .score-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .unfill-rating-star2{
        fill: var(--navbar);
    }
    .review-box {
        background-color: var(--bg-color);
        color: var(--text);
        padding-bottom: 2rem;
    }
    .taste-profile {
        color: var(--contrast-text);
        padding-bottom: 1.5rem;
    }
    .main-box {
        background-color: var(--bg-color);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 2rem;
        padding: 2rem;
        margin: 0;
    }
    .info {
        width: 50rem;
    }
    .filler {
        height: 40rem;
    }
    .stars {
        display: flex;
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

    .whiskey-image {
        max-height: 35rem;
        max-width: auto;
    }

    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 1rem;
        border-radius: 1rem;
        background: var(--bg-color);
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
    .slider-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            padding: 0;
            margin: .2rem;
        }
    }
    .sliders{
        width: 30%;
    }
</style>
