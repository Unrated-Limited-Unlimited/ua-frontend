<script lang="ts">
  import type { PageData } from "./$types";
  import { get, writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { query } from "$lib/graphql";
  import { onMount } from "svelte";

  export let data: PageData;
  export let id = data.id;

  let sliders: HTMLInputElement[];

  let rating = writable(0); // stores the rating
  let hoveredRating = writable(0); // stores the hover state rating
  let comment = "";
  let title = "";

  let sliderValues: Record<number, number> = {};

  interface Attribute {
    id: string;
    name: string;
  }
  onMount(() => {
  sliders = Array.from(document.querySelectorAll('.slider'));
  sliders.forEach((slider) => {
      slider.addEventListener('input', () => {
        slider.classList.remove('unset');
      });
    });
  });

  function normalizeNumber(number: number, min: number, max: number): number {
    return (number - min) / (max - min);
  }

  // Function to set the rating
  function setRating(index: number): void {
    rating.set(index + 1); // set the rating based on star clicked
  }

  // Function to update the hover state
  function updateHoverState(index: number): void {
    hoveredRating.set(index + 1);
  }

  // Function to reset hover state to current rating
  function resetHoverState(): void {
    hoveredRating.set(0);
  }

  const createRatingQL = `
    mutation CreateRating(
        $whiskeyId: ID!,
        $ratingInput : RatingInput!, 
        $attributeInputs: [AttributeInput]
    ) {
    createRating(
        whiskeyId: $whiskeyId, 
        ratingInput: $ratingInput,
        attributeInputs: $attributeInputs
    ) {
        id
      }
    }`;

  // Posts the rating to the backend.
  async function createRating() {
    const transformedAttributes = Object.entries(sliderValues).map(
      ([id, score]) => {
        return { id: id.toString(), score: score.toString() };
      },
    );
    console.log(transformedAttributes);
    query(fetch, createRatingQL, {
      whiskeyId: id,
      ratingInput: {
        body: comment,
        score: normalizeNumber(get(rating), 0, 1),
        title: title,
      },
      attributeInputs: transformedAttributes,
    }).then(() => goto("/whiskey/" + id));
  }
</script>

<div class="main-window">
  <div class="flex-column centered">
    <h1>Creating rating</h1>
    <h2>{data.whiskey.title}</h2>
  </div>
  <div class="flex-column centered main-rating">
    <p>Rating Title</p>
    <input bind:value={title} id="comment-title" />
    <p>Comment</p>
    <textarea id="comment" bind:value={comment}></textarea>
    <p>Rating</p>
    <div class="star-buttons">
      {#each Array(5) as _, index}
        <button
          class="star-button"
          on:mouseover={() => updateHoverState(index)}
          on:mouseout={resetHoverState}
          on:focus={() => updateHoverState(index)}
          on:blur={resetHoverState}
          on:click={() => setRating(index)}
        >
          <svg
            class="rating-star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              class:active-star={$hoveredRating > index || $rating > index}
              fill="currentColor"
              d="M21.5,9.757l-5.278,4.354L17.871,21.5,12,17.278,6.129,21.5l1.649-7.389L2.5,9.757l6.333-.924L12,2.5l3.167,6.333Z"
            />
          </svg>
        </button>
      {/each}
    </div>
    <h3>Other rating areas</h3>
    {#each data.attributes as attribute}
      {attribute.name}
      <input
        type="range"
        min="0"
        max="1"
        step="0.25"
        bind:value={sliderValues[parseInt(attribute.id)]}
        class="slider unset"
      />
    {/each}
  </div>
  <div class="flex-column centered">
  <button on:click={createRating}>Create Review</button>
  </div>
</div>

<style>
  textarea {
    resize: none;
    width: 20vw;
    height: 5vh;
  }

  .main-rating {
    padding-bottom: 2rem;
  }

  .star-buttons {
    display: flex;
    justify-content: center;
  }
  .star-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    margin: 0;
    color: var(--navbar);
    border: none;
    background-color: inherit;
  }
  .slider {
    -webkit-appearance: none;
    height: 1rem;
    border-radius: 1rem;
    background: var(--navbar);
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
  .unset::-webkit-slider-thumb {
    opacity: 0.5;
  }

  .unset::-moz-range-thumb {
    opacity: 0.5;
  }

  @media only screen and (max-width: 639px) {
    .main-window {
      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;
    }
    .slider {
      width: 80vw;
    }
    textarea {
      width: 80%;
      height: 10vh;
    }
    p {
      margin: 1vh;
    }
  }
  @media only screen and (min-width: 640px) {
    .slider {
      width: 60%;
    }
    .main-window {
      padding-left: 2rem;
    }
  }
  @media only screen and (min-width: 1200px) {
    .slider {
      width: 60%;
    }
  }
</style>
