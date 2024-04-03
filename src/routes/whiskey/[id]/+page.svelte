
<script lang="ts">
        import type { PageData } from "./$types";
        export let data: PageData;
        export let id = data.id;
        let roundScore = Math.round(data.whiskey.avgScore)
</script>

<title>{data.whiskey.title} - Unrated</title>

<div class="whiskey-site">
    <div class="main-box">
        <div class="whiskey-image"><img alt={data.whiskey.name} src={data.whiskey.img}></div>
        <div class="info">
            <!--<p>{data.whiskey.producer}</p>-->
            <h2>{data.whiskey.title}</h2>
            <div class="score-container">
                <h1>{roundScore}</h1>
                <div class="stars">
                    {#each Array(roundScore) as _}
                        <div>
                            <svg class="rating-star" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentcolor" d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"/>
                            </svg>
                            <!--<img class="rating-star" src="/assets/reshot-icon-stars-SKPW9CD3X8.svg">-->
                        </div>
                    {/each}
                </div>
            </div>
            <button>Favourite</button>
            <a href="/whiskey/{id}/rate">Hello</a>
        </div>
    </div>
    <div class="filler"></div>
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
    .main-box {
        background-color: var(--bg-color);
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 2rem;
        padding: 2rem;
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
        width: 2rem;
        height: 2rem;
        padding: 0;
        margin: 0;
    }
    svg{
        color: var(--accent);
    }
</style>