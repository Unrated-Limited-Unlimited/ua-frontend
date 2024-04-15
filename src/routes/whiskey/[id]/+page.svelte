<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount, onDestroy } from 'svelte';

  export let data: PageData;
  export let id = data.id;
  let roundScore = Math.round(data.whiskey.avgScore*5);
  let shortenedSummary: boolean = true;
  let categories = data.whiskey.categories;

  let reviews = data.whiskey.ratings;

  let isMobile = false;

  function checkWindowSize() {
      // Example breakpoint at 640px
      isMobile = window.innerWidth < 640;
  }

  onMount(() => {
      checkWindowSize(); // Check size on mount
      window.addEventListener('resize', checkWindowSize);
  });

  onDestroy(() => {
      window.removeEventListener('resize', checkWindowSize);
  });

  function summarySwap() {
    shortenedSummary = !shortenedSummary;
  }

  function truncateString(str: string, maxLength: number, useEllipsis: boolean = true): string {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + (useEllipsis ? '...' : '');
    }
    return str;
    }
</script>

<title>{data.whiskey.title} - Unrated</title>

<div class="flex-column whiskey-site">
  <div class="main-box">
    {#if isMobile}
    <div class="small-window">
      <div class="whiskey-image">
        <img
          class="whiskey-image"
          alt={data.whiskey.name}
          src={data.whiskey.img}
        />
      </div>
      <div class="whiskey-details">
      
        <!--<p>{data.whiskey.producer}</p>-->
        <h2>{data.whiskey.title}</h2>
        <div class="centered flex-inline score-box">
          <h1>{roundScore}</h1>
          <div class="stars">
            {#each Array(roundScore) as _}
              <svg
                class="rating-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
                />
              </svg>
            {/each}
            {#each Array(5 - roundScore) as _}
              <svg
                class="unfill-rating-star2 rating-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
                />
              </svg>
            {/each}
          </div>
          <a href="/whiskey/{id}/rate">Rate this whiskey!</a>
        </div>
      </div>
    </div>
      {#if shortenedSummary}
        <p>{truncateString(data.whiskey.summary, 100, false)}  <a href="" on:click={summarySwap}> [more]</a></p>
      {:else}
        <p>{data.whiskey.summary}  <a href="" on:click={summarySwap}> [less]</a></p>
      {/if}
    {:else}
      <div class="whiskey-image">
        <img
          class="whiskey-image"
          alt={data.whiskey.name}
          src={data.whiskey.img}
        />
      </div>
      <div>
        <!--<p>{data.whiskey.producer}</p>-->
        <h2>{data.whiskey.title}</h2>
        <div class="centered flex-inline">
          <h1>{roundScore}</h1>
          <div class="stars">
            {#each Array(roundScore) as _}
              <svg
                class="rating-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
                />
              </svg>
            {/each}
            {#each Array(5 - roundScore) as _}
              <svg
                class="unfill-rating-star2 rating-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
                />
              </svg>
            {/each}
          </div>
          <a href="/whiskey/{id}/rate">Rate this whiskey!</a>
        </div>
        <p>{data.whiskey.summary}</p>
    </div>
    {/if}
  </div>
  <div class="centered flex-column contrast-box taste-profile">
    <h3>Taste profile</h3>
    <div class="sliders">
      {#each categories as category}
        <div class="slider-box">
          <p>{category.name}</p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.25"
            bind:value={category.avgScore}
            class="slider"
            disabled
          />
        </div>
      {/each}
    </div>
  </div>

  <div class="centered flex-column standard-box">
    <h3>User Reviews</h3>
    {#each reviews as review}
      <div class="centered flex-column contrast-box">
        <div class="centered flex-inline">
          <h2>{review.title}</h2>
          <div>
            {#each Array(parseFloat(review.score) * 5) as _}
              <svg
                class="rating-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
                />
              </svg>
            {/each}
            {#each Array(5 - parseFloat(review.score) * 5) as _}
              <svg
                class="unfill-rating-star rating-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
                />
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
    margin: 0;
  }
  .unfill-rating-star2 {
    fill: var(--navbar);
  }
  .taste-profile {
    padding-bottom: 2rem;
  }
  .main-box {
    background-color: var(--bg-color);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding: 2rem;
    margin: 0;
    text-wrap: wrap;

    p {
      width: 30rem;
      max-width: 30rem;

      a {
        text-decoration: none;
        opacity: 0.7;
      }
    }
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
  svg {
    color: var(--accent);
  }
  .unfill-rating-star {
    color: var(--bg-color);
  }

  .whiskey-image {
    max-height: 35rem;
    max-width: auto;
    border-radius: 2rem;
    border: 2rem solid var(--white);
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 1rem;
    border-radius: 1rem;
    background: var(--bg-color);
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
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
  .slider-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      padding: 0;
      margin: 0.2rem;
    }
  }
  .sliders {
    width: 30%;
  }

  @media only screen and (max-width: 639px) {
    .main-box {
      display: flex;
      flex-direction: column;
      margin: 0;
      gap: 0rem;
      padding: 0;
      padding-top: 2vh;
      p{
        width:100%;
        max-width: 20rem;
      }

      .small-window{
        display: flex;
      }

      .score-box {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        justify-content: center;
        align-items: center;
        margin: 3vw;
      }

      .whiskey-details {
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    .whiskey-image {
      max-height: 20rem;
    }
  }
  @media only screen and (min-width: 640px) {

  }
  @media only screen and (min-width: 1200px) {

  }
</style>
