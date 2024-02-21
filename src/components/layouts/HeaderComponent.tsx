import { debug } from "@stores/AppStore";
import { useStore } from "@nanostores/react";
import { cn } from "@utils/cn";

enum HeaderType {
    "Projects" = "projects",
    "Project" = "project",
    "Home" = "home",
}

export default function HeaderComponent({ type, children }: {
    type: HeaderType,
    children: React.ReactNode
}) {
    
    const $debug = useStore(debug)

    return <header
        className={cn(
                "header w-full",
                type == HeaderType.Projects || type == HeaderType.Project ? "header--type-project" : ""
            )
        }
    >
        <nav 
            className={cn(
                $debug ? 'border border-red' : '',
                "flex flex-col md:flex-row items-center flex-wrap justify-between gap-4 py-4",
                type !== HeaderType.Project ? "boxed" : "" 
            )}
        >
            {children}
            
        </nav>
    </header>
}