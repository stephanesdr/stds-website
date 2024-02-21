import { gql } from "graphql-request";

export default interface ProjectTag {
    id: string
    slug: string
    name: string
    title: string
    description?: string
}

export function schema() {
    return gql`
        id
        slug
        name
        title
        description
    `
}