<script lang="ts">
    import type { PageData } from "./$types";

    export let data : PageData
</script>

<div class="main-window">
    <h1>Creating rating</h1>
    <div class="whiskey-desc">
        <h2>{data.whiskey.title}</h2>
    </div>
    <div class=rating-details>
        <label for="comment">Comment</label>
        <textarea id="comment">
        </textarea>
        <label for="score">Rating</label>
        <input id="score" type="range" min="1" max="5" value="5" class="slider">

        <h3>Other rating areas</h3>
        Smooth - Fiery
        <input type="range" min="1" max="5" value="5" class="slider">
        Mellow - Peaty
        <input type="range" min="1" max="5" value="5" class="slider">
        Dry - Sweet
        <input type="range" min="1" max="5" value="5" class="slider">
        Simple - Complex
        <input type="range" min="1" max="5" value="5" class="slider">

        <button>Create Review</button>
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
</style>
