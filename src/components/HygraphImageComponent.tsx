import { cn } from "@utils/cn";
import { useEffect, useRef } from "react";
import simpleParallax from 'simple-parallax-js';


function HygraphImageLoader({ src, width }: any) {
    const w = width ?? 300;
    const relativeSrc = (src: any) => src.split('/').pop();
    return `https://media.graphassets.com/resize=width:${w}/${relativeSrc(src)}`;
}


enum Orientation {
    'down' = 'down',
    'up' = 'up',
}

interface HygraphImageProps {
    className?: string,
    style?: React.CSSProperties,
    parallax?: boolean,
    parallaxScale?: number,
    parallaxOrientation?: Orientation,
    src: any,
    width: number,
    height: number,
    alt: string
}

const HygraphImage = ({ className, style, src, width, height, parallax, parallaxScale = 1.2, parallaxOrientation = Orientation.down, alt, ...rest }: HygraphImageProps) => {
    const imageRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        let instance: simpleParallax;
        if(parallax && imageRef.current) {
            instance = new simpleParallax(imageRef.current, {
                delay: 0,
                orientation: parallaxOrientation,
                scale: parallaxScale
            });
        }

        return () => {
            if(instance) instance.destroy();
        }

    }, [parallax, parallaxScale, parallaxOrientation])

    return <>
        <img
            ref={imageRef}
            className={cn(
                className,
                )}
            style={style}
            src={HygraphImageLoader({ src, width })}
            alt={alt}
            sizes={"(max-width: 1536px) 100vw, 50vw"}
            {...rest} />
    </>
}

export default HygraphImage;