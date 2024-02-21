import { gql } from "graphql-request";

export default interface Asset {
    id: string
    fileName: string
    handle: string
    width: number
    height: number
    mimeType: string
    size: number
    url: string
}

export function schema() {
    return gql`
        id
        fileName
        handle
        width
        height
        mimeType
        size
        url
    `
}