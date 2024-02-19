function HygraphImageLoader({ src, width }: any) {
    const w = width ?? 300;
    const relativeSrc = (src: any) => src.split('/').pop();
    return `https://media.graphassets.com/resize=width:${w}/${relativeSrc(src)}`;
}

interface HygraphImageProps {
    className?: string,
    style: any,
    src: any,
    width: number,
    height: number,
    alt: string
}

const HygraphImage = ({ className, style, src, width, height, alt, ...rest }: HygraphImageProps) => {
    return <img
            className={className}
            style={style}
            src={HygraphImageLoader({ src, width })}
            alt={alt}
            sizes={"(max-width: 1536px) 100vw, 50vw"}
            {...rest} />
}

export default HygraphImage;