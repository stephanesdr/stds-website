import { useEffect, useRef } from "react";

export default function ColumnComponent({ project }: any) {
    const eRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if(eRef.current) eRef.current.classList.remove('hidden');

        }, 500)
     
    }, []);

    return <div ref={eRef} className="boxed hidden" data-name="project-description">
        <p className="w-full  max-w-5xl text-pretty px-5 pb-44 pt-10 text-lg font-serif">{project.description}</p>
    </div>
}
