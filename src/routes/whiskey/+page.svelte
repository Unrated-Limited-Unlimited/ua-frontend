<script lang="ts">
    import type { PageData } from "./$types";

	export let data: PageData;
</script>

<title>Whiskeys - Unrated</title>

<body>
    {#if data.whiskey_list}
    <div>
        <h1>Whiskeys</h1>
        {#each data.whiskey_list as whiskey}
        <a href="/whiskey/{whiskey.id}">
            <div class="whiskey-view-container">
                <div class="whiskey-view-image-container">
                    <img class="whiskey-view-image" alt={whiskey.title} src={whiskey.img}>
                </div>
                <div class="whiskey-view-desc">
                    <h3>
                        {whiskey.title}
                    </h3>
                    <p>X X X X O O</p>
                </div>
            </div>
        </a>
        {/each}
    </div>
    {/if}
</body>

<style>
    body {
        margin: 2rem;
    }
    .whiskey-view-desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:10rem;
        height: auto;
    }
    .whiskey-view-container {
        background-color: var(--navbar);
        display: flex;
        justify-content:flex-start;
        gap: 1rem;
        flex-direction:row;
        margin: .5rem;
        border-radius: 2rem;
        padding: .5rem;
    }
    h3{
        margin: 0;
    }
    .whiskey-view-image-container{
        flex-grow: 1;
        background-color: white;
        max-width: 7rem;
        max-height: 7rem;
        min-width: 4rem;
        height: auto;
        padding: .5rem;
        display: flex;
        justify-content: center;
        border-radius: 2rem;
    }
    .whiskey-view-image {
        max-height: 7rem;
        max-width: 7rem;
        min-width: 2rem;
        height: auto;
    }

</style>