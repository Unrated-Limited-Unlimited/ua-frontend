<script lang="ts">
	import type { PageData } from './$types';
    import Rating from '../rating.svelte';
    import Profileinfo from '../profileinfo.svelte';
	
	export let data: PageData;

</script>

<div class="main-window">
    <div class="userHeader">
        <Profileinfo user={data.user}></Profileinfo>
    </div>
    <div class="myRatings">
        <h2>Their Ratings</h2>
        {#each data.user.ratings as review}
            <Rating review={review}></Rating>
        {/each}
    </div>
</div>