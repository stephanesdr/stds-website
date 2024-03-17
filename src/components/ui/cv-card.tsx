import { cn } from "../../utils/cn";

type CvCardProps = {
    className?: string;
    title: string;
    body: string;
}

export const CvCard = ({className, title, body}: CvCardProps) => {
    return (

        <div className={cn(
            "flex flex-col max-w-md p-6 md:p-8 gap-4",
            className
        )}>
            <h3 className={cn(
                "text-lg font-serif capitalize",
                className
            )} >
                {title}
            </h3>
            <p className={cn(
                "text-base font-sans font-semibold text-balance",
                className
            )}>
                {body}
            </p>

        </div>

    )
}