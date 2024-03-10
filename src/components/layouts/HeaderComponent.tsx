import { debug } from "@stores/AppStore";
import { useStore } from "@nanostores/react";
import { cn } from "@utils/cn";
import { computed } from "nanostores";

enum HeaderType {
    "Projects" = "projects",
    "Project" = "project",
    "Home" = "home",
}

const $isDebug = computed(debug, debug => {
    return debug == '0' ? false : true 
})

export default function HeaderComponent({ type, children }: {
    type: HeaderType,
    children: React.ReactNode
}) {
    
    const $debug = useStore($isDebug)

    return <>
        <header
            className={cn(
                    "header w-full relative",
                    type == HeaderType.Projects ? "header--type-projects" : "",
                   type == HeaderType.Project ? "header--type-project" : "",
                   type == HeaderType.Home ? "header--type-home" : "",
                )
            }
        >
            <nav 
                className={cn(
                    "flex flex-col md:flex-row items-center flex-wrap justify-between gap-4 py-4",
                    $debug ? 'border border-red-200' : '',
                    type !== HeaderType.Project ? "boxed" : "" 
                )}
            >
                {children}
                
            </nav>
            
        </header>
        <button type="button" className={
            cn(
                'text-white font-bold p-1 text-sm rounded fixed z-50 top-1 right-1 cursor-pointer',
                !$debug ? 'bg-blue-500 hover:bg-blue-700' : '',
                $debug ? 'bg-gray-500 hover:bg-gray-700' : ''
            )
        } onClick={(e) => {
            debug.set($debug ? '0' : '1')

        }}>{$debug ? 'Debug Off' : 'debug On'}</button>
    </>

}