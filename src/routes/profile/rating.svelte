<script lang="ts">
    export let review: any;
</script>

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

<style lang="scss">
    .rating-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1vh;
        background-color: var(--navbar);
        color: var(--contrast-text);
        padding: 2rem;

        p{
            padding: 0;
            margin: 0;
        }
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
    @media only screen and (max-width: 639px) {
        .a-buttons {
            text-align: center;
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            a {
                width: 80vw;
                height: 1rem;
                background-color: var(--accent);
                text-decoration: none;
                border-radius: 2rem;
                border: 1rem solid var(--accent);
            }
            a:hover{
                color: var(--contrast-text);
            }
        }
    }
    @media only screen and (min-width: 640px) {
        .a-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            a {
                width: 20vw;
                height: 1rem;
                background-color: var(--accent);
                text-decoration: none;
                border-radius: 2rem;
                border: 1rem solid var(--accent);
            }
        }
        a:hover{
                color: var(--contrast-text);
        }
    }
</style>