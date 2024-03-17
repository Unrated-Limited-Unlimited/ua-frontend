
<script lang="ts">
        import type { PageData } from "./$types";
        export let data: PageData;
</script>

<title>{data.whiskey.title} - Unrated</title>

<div class="whiskey-site">
    <div class="main-box">
        <div class="whiskey-image"><img alt={data.whiskey.name} src={data.whiskey.img}></div>
        <div class="info">
            <!--<p>{data.whiskey.producer}</p>-->
            <h2>{data.whiskey.title}</h2>
            <div class="score-container">
                <h1>{data.whiskey.rating}</h1>
                <div class="stars">
                    {#each Array(5) as _}
                        <!-- svelte-ignore a11y-missing-attribute -->
                    <div><img class="rating-star" src=https://st.depositphotos.com/1795881/1619/i/450/depositphotos_16199827-stock-photo-3d-symbol.jpg></div>
                    {/each}
                </div>
            </div>
            <button>Favourite</button>
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
        display: flex;;
    }
    .rating-star {
        width: 2rem;
    }
</style>