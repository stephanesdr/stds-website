import { useEffect, useRef } from "react";

export default function ColumnComponent({ project }: any) {
    const eRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if(eRef.current) eRef.current.classList.remove('hidden');

        }, 500)
     
    }, []);

    return <div ref={eRef} className="boxed hidden dark:text-stone-300" data-name="project-description">
        <p className="w-full sm:max-w-[48lvw] text-pretty text-lg font-serif font-bold">{project.description}</p>
        <ul>
          
        </ul>
    </div>
}
