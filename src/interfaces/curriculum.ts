import { gql } from "graphql-request";


export default interface Curriculum {
    title: string;
    description: string;
}

export function simpleSchema() {
    return gql` 
    
    title
    description
    `
}