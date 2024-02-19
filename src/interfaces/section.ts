import { gql } from "graphql-request";
import type Column from "./column"
import {schema as columnScheme} from "./column";

export enum Size {
    Full = "full",
    xs = "xs",
    sm = "sm",
    md = "md",
    lg = "lg",
    xl = "xl",
    xxl = "xxl"
}

export default interface Section {
    id: string
    size?: Size,
    backgroundColor?: {
        css: string
        hex: string
        rgba: {
            r: number
            g: number
            b: number
            a: number
        }
    }
    useProjectPrimaryColor: boolean
    marginTop: number
    marginBottom: number
    paddingTop: number
    paddingBottom: number
    gap: number
    outerSpace: number
    columns: Column[]
}

export function schema() {
    return gql`
        id
        size
        backgroundColor {
            css
            hex
            rgba {
                r
                g
                b
                a
            }
        }
        useProjectPrimaryColor
        marginTop
        marginBottom
        paddingTop
        paddingBottom
        gap
        outerSpace
        columns {
            ${columnScheme()}
        }
    `
}