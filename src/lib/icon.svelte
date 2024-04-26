<script lang="ts">
    import { onMount } from 'svelte';

    export let id: number;

    export let image: string;

    const colourList = ["#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b","#562e2b"];

    const colours = ["#562e2b", "#af7540", "#d2a150", "#333333", "#4e515a", "#f5f5f5"]

    onMount(() =>{    
        if (!image) {   
            randomList(id, colours.length)
        }
    })

    function randomList(id: number, nr: number) {
        if (id < 0 || id >= Math.pow(nr, 12)) {
            throw new Error("Input number must be in the range.");
        }

        const random = (id * 10000000019) % Math.pow(nr, 12);

        for (let i = 0; i < 12; i++) {
            const digit = (random / Math.pow(nr, i)) % nr;
            const number = Math.floor(digit);
            colourList[i] = colours[number];
        }
    }
</script>
{#if image} 
<div class="image-container icon">
    <img src="{image}" alt="user icon"/>
</div>
{:else}
<div>
    <svg height="100" width="100" class="icon" style="">
        <defs>
            <path id="quarter" d="M 0 50
                    A 50 50, 0, 0, 0, 50 0
                    L 0 0 Z"/>
            <path id="bigquarter" d="M -10 10
                    L 0 50
                    A 50 50, 0, 0, 0, 50 0
                    L 10 -10 Z"/>
        </defs>
        
        <use href="#bigquarter" transform="translate(50 50)" fill="{colourList[0]}" />
        <use href="#bigquarter" transform="translate(50 50) rotate(180)" fill="{colourList[1]}" />
        <use href="#quarter" transform="translate(50 50) rotate(90)" fill="{colourList[2]}" />
        <use href="#quarter" transform="translate(50 50) rotate(270)" fill="{colourList[3]}" />
        
        <use href="#bigquarter" transform="translate(50 50) scale(0.7) rotate(45)" fill="{colourList[4]}"/>
        <use href="#bigquarter" transform="translate(50 50) scale(0.7) rotate(225) " fill="{colourList[5]}" />
        <use href="#quarter" transform="translate(50 50) scale(0.7) rotate(135) " fill="{colourList[6]}" />
        <use href="#quarter" transform="translate(50 50) scale(0.7) rotate(315) " fill="{colourList[7]}" />
        
        <use href="#bigquarter" transform="translate(50 50) scale(0.4)" fill="{colourList[8]}" />
        <use href="#bigquarter" transform="translate(50 50) scale(0.4) rotate(180)" fill="{colourList[9]}" />
        <use href="#quarter" transform="translate(50 50) scale(0.4) rotate(90)" fill="{colourList[10]}" />
        <use href="#quarter" transform="translate(50 50) scale(0.4) rotate(270)" fill="{colourList[11]}" />
    </svg>
</div>
{/if}

<style lang="scss">
    .image-container {
        width: 100px;
        height: 100px;
        overflow: hidden;
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    .icon {
        margin: 10px; 
        border-radius: 50%;
        border: .15rem solid var(--contrast-text);
    }
</style>