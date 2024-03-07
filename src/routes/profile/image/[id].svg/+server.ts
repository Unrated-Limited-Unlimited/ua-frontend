import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ params }) => {
	const id = Number(params.id);
    const response = new Response(createSvg(id));
    response.headers.set("content-type", "image/svg+xml");
	return response;
};

function randomList(id: number, nr: number) {
    if (id < 0 || id >= Math.pow(nr, 12)) {
        throw new Error("Input number must be in the range.");
    }

	const random = (id * 10000000019) % Math.pow(nr, 12);

    const uniqueNumbers = [];

    for (let i = 0; i < 12; i++) {
        const digit = (random / Math.pow(nr, i)) % nr;
        const number = Math.floor(digit);
        uniqueNumbers.push(number);
    }

    return uniqueNumbers;
}

const colours = ["#562e2b", "#af7540", "#d2a150", "#333333", "#4e515a", "#f5f5f5"]

function createSvg(id: number) {
    const colourList = randomList(id, colours.length).map(i => colours[i]);

    return `<svg height="320" width="320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="quarter" d="M 0 160
               A 160 160, 0, 0, 0, 160 0
               L 0 0 Z"/>
      <path id="bigquarter" d="M -10 10
               L 0 160
               A 160 160, 0, 0, 0, 160 0
               L 10 -10 Z"/>
    </defs>
    
    <use href="#bigquarter" transform="translate(160 160)" fill="${colourList[0]}" />
    <use href="#bigquarter" transform="translate(160 160) rotate(180)" fill="${colourList[1]}" />
    <use href="#quarter" transform="translate(160 160) rotate(90)" fill="${colourList[2]}" />
    <use href="#quarter" transform="translate(160 160) rotate(270)" fill="${colourList[3]}" />
    
    <use href="#bigquarter" transform="translate(160 160) scale(0.7) rotate(45)" fill="${colourList[4]}"/>
    <use href="#bigquarter" transform="translate(160 160) scale(0.7) rotate(225) " fill="${colourList[5]}" />
    <use href="#quarter" transform="translate(160 160) scale(0.7) rotate(135) " fill="${colourList[6]}" />
    <use href="#quarter" transform="translate(160 160) scale(0.7) rotate(315) " fill="${colourList[7]}" />
    
    <use href="#bigquarter" transform="translate(160 160) scale(0.4)" fill="${colourList[8]}" />
    <use href="#bigquarter" transform="translate(160 160) scale(0.4) rotate(180)" fill="${colourList[9]}" />
    <use href="#quarter" transform="translate(160 160) scale(0.4) rotate(90)" fill="${colourList[10]}" />
    <use href="#quarter" transform="translate(160 160) scale(0.4) rotate(270)" fill="${colourList[11]}" />
  </svg>`
}