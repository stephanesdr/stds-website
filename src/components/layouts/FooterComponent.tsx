import { useStore } from "@nanostores/react";
import { debug } from "@stores/AppStore";
import { cn } from "@utils/cn";

export default function FooterComponent({ children } : {
    children: React.ReactNode
}) {
    const $debug = useStore(debug)

    return <footer className="footer">
        <nav className={cn(
                'boxed',
                $debug ? 'border border-red' : '',
                'flex flex-col md:flex-row items-center flex-wrap justify-between gap-4 border border-red py-4'
            )}>
            {children}
           
        </nav>
    </footer>
}