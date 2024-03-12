import { useState, useMemo } from "react";
import type Project from "@interfaces/project.js"
import SectionComponent from "./SectionComponent.tsx"
import { motion } from "framer-motion";
import { cn } from "@utils/cn.ts";
import { useStore } from "@nanostores/react";
import { debug } from "@stores/AppStore";
import { computed } from "nanostores";

type SectionsProps = {
    project: Project
}

const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
}

const $isDebug = computed(debug, debug => {
    return debug == '0' ? false : true 
})

export default function Sections({ project }: SectionsProps) {
    const [show] = useState(true);
    const $debug = useStore($isDebug)

    const columnIndexes = useMemo(() => {
        const data: any = project.sections.reduce((acc, curr) => {
          acc.sections[curr.id] = acc.currentIndex;
          acc.currentIndex += curr.columns.length;
          return acc;
    
        }, { sections: {}, currentIndex: 0 } as any)
    
        return data.sections;
    
      }, [project.sections])
    
    return  <>
        <motion.div className={cn("project__sections", "overflow-hidden")}
            initial={"closed"}
            animate={show ? "open" : "closed"}
            variants={variants}>
            {project.sections && project.sections.length > 0 && project.sections.map(section => <SectionComponent projectSize={project.defaultSize} startIndexAt={columnIndexes[section.id]} key={section.id} section={section} />)}
        
        </motion.div>
    </>
}
