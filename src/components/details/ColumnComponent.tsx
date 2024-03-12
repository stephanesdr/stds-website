import { useCallback, useMemo } from "react";
import type Column from "@interfaces/column";
import { ItemPosition, ColumnType, ImageSize, Direction } from "@interfaces/column";
import { motion, useTransform, useSpring, MotionValue } from 'framer-motion'
import HygraphVideo from "@components/HygraphVideoComponent"
import HygraphImage from "@components/HygraphImageComponent"
import type Asset from "@interfaces/asset"
import { cn } from "@utils/cn";
import { useStore } from "@nanostores/react";
import { debug } from "@stores/AppStore";
import { computed } from "nanostores";

type ColumnProps = {
    column: Column
    index: number
    scrollYProgress: MotionValue<number>
}

const rF1 = 1;
const rF2 = rF1 * 2;

const $isDebug = computed(debug, debug => {
    return debug == '0' ? false : true 
})

export default function ColumnComponent({ column, scrollYProgress, index }: ColumnProps) {
    const scrollTransformed = useSpring(scrollYProgress, {stiffness:55, damping: 10});
    const $debug = useStore($isDebug)
    
    const y = useTransform(scrollTransformed, [0, 1],
        column.direction === Direction.Up ? [column.distance * rF2, -column.distance * rF2]
            : [-column.distance * rF2, column.distance * rF2]
    );

    const iy = useTransform(scrollTransformed, [0, 1],
        column.direction === Direction.Up ? [-column.distance * rF1, column.distance * rF1]
            : [column.distance * rF1, -column.distance * rF1]
    );

    const columnStyle = useMemo(() => {
        let style: { [key: string]: any } = {
            y,
            marginTop: column.marginTop,
            marginBottom: column.marginBottom,
            marginLeft: column.outerSpace,
            marginRight: column.outerSpace,
            paddingTop: column.paddingTop,
            paddingBottom: column.paddingBottom,
            flex: column.slot,
            alignItems: column.columnAlign === ItemPosition.Bottom ? 'flex-end' : (column.columnAlign === ItemPosition.Center ? 'center' : 'flex-start')
        };

        if(style.marginTop < 0) {
            style.position = "relative";
            style.top = style.marginTop;
            delete style.marginTop;
        }

        if (column.backgroundColor) style.backgroundColor = column.backgroundColor.hex;

        return style;

    }, [y, column])

    const objectStyle = useMemo(() => {
        let style: { [key: string]: any } = {}

        if (column.columnType === ColumnType.Text) {
            if (column.textAlign) style.textAlign = column.textAlign;
            if (column.fontWeight) style.fontWeight = column.fontWeight;
            if (column.fontSize) style.fontSize = column.fontSize;
            if (column.textColor) style.color = column.textColor.hex;
        
        } else {
            style = {
                objectFit: column.imageSize === ImageSize.Contain ? 'contain' : (column.imageSize === ImageSize.Cover ? 'cover' : 'fill'),
                objectPosition: column.imagePosition === ItemPosition.Bottom ? 'bottom' : (column.imagePosition === ItemPosition.Center ? 'center' : 'top'),
            }

            if (column.aspectRatio) style.aspectRatio = `${column.aspectRatio.aspectWidth} / ${column.aspectRatio.aspectHeight}`;
        }

        return style;

    }, [column])

    const isVideo = useCallback((image: Asset) => /^video\//.test(image.mimeType), []);
    const isImage = useCallback((image: Asset) => /^image\//.test(image.mimeType), []);

    return <motion.div
        className={cn(
            "project__columns__item", "flex overflow-hidden",
            $debug ? "border border-blue-500" : ""
        )}
        style={columnStyle}>

        {column.image && <>
            {column.columnType === ColumnType.Image && <motion.div
                className={cn("project__image-wrapper", "w-full overflow-hidden")}
                style={{
                    y: column.parallax ? iy : 0,
                }}>

                {isImage(column.image) && <HygraphImage
                    className={cn(
                        "project__image",
                        $debug ? "border border-green-500" : "",
                        "w-full"
                    )}
                    style={objectStyle}
                    src={column.image.url}
                    width={column.image.width}
                    height={column.image.height}
                    alt={""} />}

                {!isImage(column.image) && <p className={cn("w-full p-4 bg-red-500 text-white")}>Error: Not a valid image asset!</p>}

            </motion.div>}

            {column.columnType === ColumnType.Video && <motion.div
                className={cn("project__video-wrapper", "w-full overflow-hidden")}
                style={{
                    y: column.parallax ? iy : 0,
                }}>

                {isVideo(column.image) && <HygraphVideo
                    className={cn(
                        "project__video",
                        $debug ? "border border-green-500" : "",
                        "w-full")}
                    style={objectStyle}
                    src={column.image.url}
                    width={column.image.width}
                    height={column.image.height}
                    mimeType={column.image.mimeType}
                />}

                {!isVideo(column.image) && <p className={cn("w-full p-4 bg-red-500 text-white")}>Error: Not a valid video asset!</p>}

            </motion.div>}
        </>}

        {column.columnType === ColumnType.Text && <p className={cn(
            "project__text",
            $debug ? "border border-green-500" : "",
            "w-full")} style={objectStyle}>{column.text}</p>}

    </motion.div>
}
