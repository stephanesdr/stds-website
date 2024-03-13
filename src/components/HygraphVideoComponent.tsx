import { cn } from "@utils/cn";
import { useEffect, useMemo, useRef } from "react";
import simpleParallax from 'simple-parallax-js';

function HygraphVideoLoader({ src }: any) {
    const relativeSrc = (src: any) => src.split('/').pop();
    return `https://media.graphassets.com/${relativeSrc(src)}`;
}

enum Orientation {
    'down' = 'down',
    'up' = 'up',
}

type HygraphVideoProps = {
    src: any,
    className?: string,
    style?: React.CSSProperties,
    parallax?: boolean,
    parallaxScale?: number,
    parallaxOrientation?: Orientation,
    width: number,
    height: number,
    mimeType: string,
}

const HygraphVideo = ({ src, style, className, width, height, parallax, parallaxScale = 1.3, parallaxOrientation = Orientation.down, mimeType }: HygraphVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        let instance: simpleParallax;
        if(parallax && videoRef.current) instance = new simpleParallax(videoRef.current, {
            delay: 0,
            orientation: parallaxOrientation,
            scale: parallaxScale
        });
        
        return () => {
            if(instance) instance.destroy();
        }

    }, [parallax, parallaxScale, parallaxOrientation])

    useEffect(() => {
        if (!videoRef.current) return () => { };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                if (videoRef.current) {
                    if (entries[0].isIntersecting) {
                        videoRef.current.play();

                    } else videoRef.current.pause();
                }

            }, { threshold: 0})

            observer.observe(videoRef.current);

            return () => observer.disconnect()
        }

        return () => { };

    }, []);

    const videoAttributes = useMemo(() => {
        return {
            preload: 'metadata',
            playsInline: true,
            autoPlay: true
        }

    }, [])

    return <video
            ref={videoRef}
            className={cn(className)}
            style={style}
            width={width}
            height={height}
            loop
            {...videoAttributes}
            muted
        >
            <source src={HygraphVideoLoader({ src })} type={mimeType} />

        </video>

}

export default HygraphVideo;