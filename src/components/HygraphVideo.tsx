'use client'

import { useEffect, useMemo, useRef } from "react";

function HygraphVideoLoader({ src }: any) {
    const relativeSrc = (src: any) => src.split('/').pop();
    return `https://media.graphassets.com/${relativeSrc(src)}`;
}

type HygraphVideoProps = {
    src: any,
    className?: string,
    style?: any,
    width: number,
    height: number,
    mimeType: string,
}

const HygraphVideo = ({ src, className, style, width, height, mimeType }: HygraphVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

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
            className={className}
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