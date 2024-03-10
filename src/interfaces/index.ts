import { gql } from "graphql-request";
import type Asset from "./asset";
import  {schema as assetSchema} from "./asset";


export default interface Index {
    title: string;
	image?: Asset;
    linkedInUrl: string;
    instagramUrl: string;
    threadUrl: string;
}


export function simpleSchema() {
    return gql` 
    title
		image {
            ${assetSchema()}
        }
    linkedInUrl
    instagramUrl
    threadUrl
    `
}