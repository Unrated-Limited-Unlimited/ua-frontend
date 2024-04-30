<script lang="ts">
    import { limitNumber } from "$lib/utils";
    import { query } from "$lib/graphql";
  import type { PageData } from "./$types";
  import { error } from "@sveltejs/kit";
  import Rating from "../../profile/rating.svelte";
  import { graphql } from "msw";


  export let data: PageData;
  export let id = data.id;
  let roundScore = Math.round(limitNumber(data.whiskey.avgScore)*5);
  let shortenedSummary: boolean = true;
  let moreButtonNeeded: boolean = (data.whiskey.summary).length > 100;
  let categories = data.whiskey.categories;

  let reviews = data.whiskey.ratings;

  function summarySwap() {
    shortenedSummary = !shortenedSummary;
  }

 
  function truncateString(str: string, maxLength: number, useEllipsis: boolean = true): string {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + (useEllipsis ? '...' : '');
    }
    return str;
    }

    const createThumbQL = `
    mutation CreateThumb(
      $ratingId: ID!,
      $isGood: Boolean!
        ) {
    createThumb(
      ratingId: $ratingId,
      isGood: $isGood
    ) {
        id
        isGood
      }
    }`;//will adding isGood here help any? could we use this to see what button has been pressed and therefore conduct an does-user-want-to-edit-check?

     //post a thumb to the backend
   async function createThumb(review: any, isGood: boolean) {
    //is there a check in the backend for existing thumbs?
    //there seems to be. so no checks from here then?
    //we can use the check in the backend to check if we need to edit the thumb??
    let thumbResult
    if(review.votedThumb){
     thumbResult = editThumb(review, isGood)
    }
    else{
      thumbResult = query(fetch, createThumbQL, {
        ratingId: review.id,
        isGood: isGood
      });

      (await thumbResult).json().then((r) => {review.votedThumb = r.data.createThumb})
    }

  }


     const editThumbQL = `
    mutation EditThumb(
      $id: ID!,
      $isGood: Boolean!
        ) {
    editThumb(
      id: $id,
      isGood: $isGood
    ) {
        id
        isGood
      }
    }`;

      //TODO
      //invoke this on "edit"-button press? or just on the other button press right away?
      //what separates an "edit" from a "create"-invocation in the frontend
      //this will require the view to change (ie show a text input box again)
      //how will we do this?
      async function editThumb(review: any, isGood: boolean) {
        //this should lead to an overwrite in the backend
        //we will need: reviewid and the new value (only if it is not the same)
        //there should be a check that the new press has actually been on the other button, not the same
        //this should simply do the query:

       const thumbResult = query(fetch, editThumbQL, {
        id: review.votedThumb.id,
        isGood: isGood
      });

      
       (await thumbResult).json().then((r) => review.votedThumb = r.data.editThumb)







        //but when do we approve of the change?
        //simply when the user has pressed the other button?
        //trust in the backend

      }


      const deleteThumbQL = `
    mutation DeleteThumb(
      $id: ID!,
        ) {
    deleteThumb(
      id: $id,
    ) {
        id
      }
    }`;

      //invoke this on "delete"-button press
      async function deleteThumb(reviewid: number) {
        query(fetch, deleteThumbQL, {
        id: reviewid
      })
      }


  
</script>

<div class="flex-column whiskey-site">
  <div class="main-box">
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
  </div>
  <div class="centered flex-column contrast-box taste-profile">
    <h3>Taste profile</h3>
    <div class="sliders">
      {#each categories as category}
        <div class="slider-box">
          <p>{category.name}</p>
          <div class="slider">
            <div class="slider-fill" style="width:{limitNumber(category.avgScore)*100}%">
              <p>{limitNumber(category.avgScore*10)}<p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="centered flex-column standard-box reviews">
    <h3>User Reviews</h3>
    {#each reviews as review}
      <div class="flex-column contrast-box review-box">
        <div class="review-title">
          <h2>{review.title}</h2>
          <div>
            {#each Array(Math.round(parseFloat(review.score) * 5)) as _}
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
            {#each Array(5 - Math.round(parseFloat(review.score) * 5)) as _}
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
        <h4>written by <a href="/profile/{review.user.id}">{review.user.name}</a></h4>
        <div class="review-buttons"> <!--legge editThumb til i knappene? hvordan?-->
          <button on:click={()=>{createThumb(review, true)}} class="hover-shadow">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M12.72 2c.15-.02.26.02.41.07.56.19.83.79.66 1.35-.17.55-1 3.04-1 3.58 0 .53.75 1 1.35 1h3c.6 0 1 .4 1 1s-2 7-2 7c-.17.39-.55 1-1 1H6V8h2.14c.41-.41 3.3-4.71 3.58-5.27.21-.41.6-.68 1-.73zM2 8h2v9H2V8z"/>
            </svg>
          </button>          
          
          <button on:click={()=>{createThumb(review, false)}} class="hover-shadow">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path  transform="scale(-1, -1) translate(-20, -20)" d="M12.72 2c.15-.02.26.02.41.07.56.19.83.79.66 1.35-.17.55-1 3.04-1 3.58 0 .53.75 1 1.35 1h3c.6 0 1 .4 1 1s-2 7-2 7c-.17.39-.55 1-1 1H6V8h2.14c.41-.41 3.3-4.71 3.58-5.27.21-.41.6-.68 1-.73zM2 8h2v9H2V8z"/>
            </svg>
          </button>
          {#if review.votedThumb}
          <p>{review.votedThumb.isGood}</p>
          {/if}
        </div>
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
    text-align: center;
    background-color: var(--bg-color);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
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
  .slider-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      padding: 0;
      margin: 0.2rem;
    }

  .slider {
    background-color: var(--bg-color);
    height: 3vh;
    width: 70vw;
    border-radius: 2rem;
  }
  }
  .slider-fill {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: inherit;
    border-radius: 2rem;
    background-color: var(--accent);
    p {
      padding: 0;
      margin: 0;
    }
  }

  .reviews {
    gap: 2vh;
  }
  .review-box {
    display: flex;
    justify-content: flex-start;
    width: 80vw;
    border: 2rem solid var(--navbar);
    border-radius: 2rem;
  }

  .review-buttons {
    display: inline-flex;
    gap: 1vw;
    
    button {
      border-radius: 100%;
      justify-content: center;
      align-items: center;

      width: 3rem;
      height: 3rem;
      display: flex;

      
      svg {
        width: 100%;
        height: 100%;
        color: var(--bg-color);
      }
    }
  }

  h4 {
    a {
        color: var(--contrast-text);
    }
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
        text-align: center;
        width:100%;
        max-width: 20rem;
      }

      .review-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1vw;
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
    .review-buttons {
        gap: 3vw;
      }
    .reviews {
        gap: 1.5vh;
        padding-bottom: 12vh;
    }

    .review-box {
      border: 1.8rem solid var(--navbar);
      border-radius: 1.8rem;
    }

    .whiskey-image {
      max-height: 20rem;
    }
    .slider-fill {
      p {
        padding-left: 2vw;
      }
    }
  }
  @media only screen and (min-width: 640px) {
    .review-title {
      display: inline-flex;
      align-items: center;
      gap: 1vw;
    }
    .slider-fill {
      p {
        padding-left: 1vw;
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    .review-title {
      display: inline-flex;
      align-items: center;
      gap: 1vw;
    }
    .slider-fill {
      p {
        padding-left: 1vw;
      }
    }
  }
</style>
