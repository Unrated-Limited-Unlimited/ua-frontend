<script lang="ts" context="module">
    export async function load({ params }) {
    const { id } = params;
    // Fetch product data using the id
    const response = await fetch(`/api/whiskey/${id}`);
    const whiskey_data = await response.json();
    return { props: { whiskey_data } };
    }

</script>

<script lang="ts">
        interface Whiskey {
        id: number,
        name: string,
        price: Number,
        summary: string,
        percentage: Number,
        img: string,
        volume: Number,
        score: Number
    };

    export let whiskey_data : Whiskey;
</script>   

<html lang="en">
    <!-- svelte-ignore missing-declaration -->
    <title>{whiskey_data.name} - Unrated</title>
</html>

<div class="whiskey-site">
    <div class="whiskey-image"><img alt={whiskey_data.name} src={whiskey_data.img}></div>
    <div>{whiskey_data.name}</div>
    <div class="score-container">
        <p>{whiskey_data.score}/5</p>
        <button>review</button>
    </div>
    <div>{whiskey_data.summary}</div>
</div>

<style lang="scss">
    .whiskey-site {
        background-color: salmon;
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