import { gql } from "graphql-request";
import type Asset from "./asset";
import type Section from "./section";
import type ProjectTag from "./projectTag";
import {Size, schema as sectionSchema} from "./section";
import {schema as projectTagSchema} from "./projectTag";
import  {schema as assetSchema} from "./asset";

export enum Priority {
    Medium = 0,
    Low = 1,
    High = 2
}

export enum featuredType {
    Image = 'Image',
    Video = 'Video',
}

export default interface Project {
    id: string
    slug: string
    name: string
    title: string
    defaultSize: Size,
    image? : Asset
    description?: string
    excerpt?: string
    client?: string
    website?: string
    year?: number
    primaryColor?: {
        css: string
        hex: string
        rgba: {
            r: number
            g: number
            b: number
            a: number
        }
    }
    featured: boolean,
    featuredType: featuredType,
    priority: Priority,
    sections: Section[]
    tags: {
        id: string
        priority: boolean
        projectTag: ProjectTag
    }[]
    team?: string | null
}


export function simpleSchema() {
    return gql`
        id
        slug
        name
        title
        defaultSize
        description
        excerpt
        client
        website
        year
        primaryColor {
            css
            hex
            rgba {
                r
                g
                b
                a
            }
        }
        featured
        featuredType
        priority
        image {
            ${assetSchema()}
        }
        team
    `
}

export function schema() {
    return gql`
        ${simpleSchema()}
        tags {
            id
            priority
            projectTag {
                ${projectTagSchema()}
            }
        }
        sections {
            ${sectionSchema()}
        }
    `
}