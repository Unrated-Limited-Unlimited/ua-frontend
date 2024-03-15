
<script lang="ts">
        import type { PageData } from "./$types";
        export let data: PageData;
</script>

<title>{data.whiskey.name} - Unrated</title>

<div class="whiskey-site">
    <div class="whiskey-image"><img alt={data.whiskey.name} src={data.whiskey.img}></div>
    <div>{data.whiskey.name}</div>
    <div class="score-container">
        <p>{data.whiskey.score}/5</p>
        <button>review</button>
    </div>
    <div>{data.whiskey.summary}</div>
</div>


<style lang="scss">
    .whiskey-site {
        margin-top: 1rem;
        padding: 2rem;
        border: .2rem solid var(--navbar);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .score-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
</style>