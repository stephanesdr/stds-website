function HygraphImageLoader({ src, width }: any) {
    const relativeSrc = (src: any) => src.split('/').pop();
    return `https://media.graphassets.com/resize=width:${width}/${relativeSrc(src)}`;
}

interface HygraphImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
    src: any,
    hero?: boolean
    alt: string,
    rgb?: number[] | null
}

const HygraphImage = ({ src, alt, ...rest }: HygraphImageProps) => {

    return <img
            loader={HygraphImageLoader}
            src={src}
            alt={alt}
            sizes={"(max-width: 1536px) 100vw, 50vw"}
            {...rest} />

    
}

export default HygraphImage;