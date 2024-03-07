<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export const whiskeys = writable([]);

    async function loadWhiskeys() {
        try {
            const response = await fetch("/api/whiskeys", {method: "GET"});
            if (!response.ok) {
                throw new Error("HTTP error! status: + ${resposne.status}");
            }
            const jsonData = await response.json();
            console.log("Fetched data:", jsonData);

            if (jsonData.whiskey_list && Array.isArray(jsonData.whiskey_list)) {
                whiskeys.set(jsonData.whiskey_list);
            } else {
                console.error("whiskey_list is not an array:", jsonData.whiskey_list);
                whiskeys.set([]);
            }
        }
        catch (e) {
            console.error("Failed to fetch whiskeys:", e);
        }
    }

    onMount(() => {
        loadWhiskeys();
    });
</script>

<title>Whiskeys - Unrated</title>

<body>
    <div>
        <h1>Whiskeys</h1>
        {#each $whiskeys as whiskey}
        <a href="/whiskey-view/{whiskey.id}">
            <div class="whiskey-view-container">
                <div class="whiskey-view-image-container">
                    <img class="whiskey-view-image" alt={whiskey.name} src={whiskey.img}>
                </div>
                <div class="whiskey-view-desc">
                    <h3>
                        {whiskey.name}
                    </h3>
                    <p>X X X X O O</p>
                </div>
            </div>
        </a>
        {/each}
    </div>
</body>

<style>
    .whiskey-view-desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:10rem;
        height: auto;
    }
    .whiskey-view-container {
        color: black;
        background-color: var(--navbar);
        display: flex;
        justify-content:flex-start;
        gap: 1rem;
        flex-direction:row;
        margin: .5rem;
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
    }
    .whiskey-view-image {
        max-height: 7rem;
        max-width: 7rem;
        min-width: 2rem;
        height: auto;
    }

</style>