import { gql } from "graphql-request";
import type AspectRatio from "./aspectRatio"
import type Asset from "./asset"
import {schema as assetSchema} from "./asset";
import {schema as aspectRatioSchema} from "./aspectRatio";

export enum ItemPosition {
    Top = 'Top',
    Center = 'Center',
    Bottom = 'Bottom'
}

export enum TextAlign {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right'
}

export enum ImageSize {
    Contain = 'Contain',
    Cover = 'Cover',
    Default = 'Default'
}

export enum ColumnType {
    Image = 'Image',
    Video = 'Video',
    Text = 'Text',
    Empty = 'Empty'
}

export enum Direction {
    Up = 'Up',
    Down = 'Down'
}

export default interface Column {
    id: string
    columnType: ColumnType
    marginTop: number
    marginBottom: number
    paddingTop: number
    paddingBottom: number
    outerSpace: number
    direction: Direction
    distance: number
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

    // ONLY FOR TEXT TYPE
    text?: string
    fontSize?: number
    fontWeight?: string
    textColor?: {
        css: string
        hex: string
        rgba: {
            r: number
            g: number
            b: number
            a: number
        }
    }
    textAlign?: TextAlign
    // END TEXT TYPE

    // ONLY FOR IMAGE TYPE
    parallax: boolean
    imageSize: ImageSize
    imagePosition: ItemPosition
    // END IMAGE TYPE

    columnAlign: ItemPosition
    image?: Asset
    aspectRatio: AspectRatio
    slot: number
}

export function schema() {
    return gql`
        id
        columnType
        marginTop
        marginBottom
        paddingTop
        paddingBottom
        outerSpace
        parallax
        direction
        distance
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
        text
        fontSize
        fontWeight
        textColor {
            css
            hex
            rgba {
                r
                g
                b
                a
            }
        }
        textAlign
        imageSize
        imagePosition
        columnAlign
        image {
            ${assetSchema()}
        }
        aspectRatio {
            ${aspectRatioSchema()}
        }
        slot
    `
}