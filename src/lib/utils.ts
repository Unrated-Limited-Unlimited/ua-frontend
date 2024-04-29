import { getImageSufix } from '../store/imageCache';
import { BACKEND_BASE_URL, IMAGE_BASE_URL } from './env';


export function url(...args: string[]) {
    return `${BACKEND_BASE_URL}/${args.join("/")}`;
}

export function imageUrl(...args: string[]) {
    if (args && args[0]) {
        return `${IMAGE_BASE_URL}/${args.join("/")}?t=${getImageSufix()}`;
    }
    return ""
}

export const graphql_url = BACKEND_BASE_URL + "/graphql"

export function limitNumber(number: number): number {
    if(number > 1) {
        return 1;
    }
    if(number < 0){
        return 0
    }
    return number
  }