import { useStore } from "@nanostores/react";
import { debug } from "@stores/AppStore";
import { cn } from "@utils/cn";
import { computed } from "nanostores";

const $isDebug = computed(debug, debug => {
    return debug == '0' ? false : true 
})

export default function FooterComponent({ children } : {
    children: React.ReactNode
}) {
    const $debug = useStore($isDebug)

    return <footer className="footer">
        <nav className={cn(
                // 'boxed',
                //$debug ? 'border border-red-200' : '',
                'flex flex-col md:flex-row items-center flex-wrap justify-between gap-4 p-4'
            )}>
            {children}
           
        </nav>
    </footer>
}