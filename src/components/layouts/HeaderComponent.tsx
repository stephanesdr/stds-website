import { debug } from "@stores/AppStore";
import { useStore } from "@nanostores/react";
import { cn } from "@utils/cn";
import { computed } from "nanostores";
import { useMemo } from "react";

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

    const nav = useMemo(() => {
        return <nav
            className={cn(
                "flex flex-row items-center flex-wrap justify-between gap-4 p-4",
                $debug ? 'border border-red-200' : '',
                type !== HeaderType.Project ? "boxed" : ""
            )}
        >
            {children}

        </nav>
    }, [type, $debug, children])

    return <>
        {type == HeaderType.Projects && <header className={"header w-full relative z-30 header--type-projects"}>{nav}</header>}
        {type == HeaderType.Project && <header className={"header w-full relative z-30 header--type-project"}>{nav}</header>}
        {type == HeaderType.Home && <header className={"header w-full relative z-30 header--type-home"}>{nav}</header>}

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