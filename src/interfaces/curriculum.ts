import { gql } from "graphql-request";
import type Asset from "./asset";
import  {schema as assetSchema} from "./asset";


export default interface Curriculum {
    imagesCv?: Asset;
}

export function simpleSchema() {
    return gql` 
    imagesCv {
        ${assetSchema()}
    }
    `
}