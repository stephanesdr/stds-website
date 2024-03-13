import { cn } from "../../utils/cn";

type ButtonProps = {
    children?: React.ReactNode;
    href: string;
    className?: string;
}

export const Button = ({ children, href, className }: ButtonProps) => {
    return (
        <>
            <div className={cn("!absolute top-3 md:left-3 left-4")}>
                <a
                    className={cn("relative", className)}
                    href={href}
                >
                    <span
                        className={cn("text-sm font-sans font-semibold")}
                    >
                        {children}
                    </span>
                </a>
            </div>
        </>
    )
}