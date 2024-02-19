import { gql } from "graphql-request";

export default interface AspectRatio {
    id: string
    aspectWidth: number
    aspectHeight: number
}

export function schema() {
    return gql`
        id
        aspectWidth
        aspectHeight
    `
}