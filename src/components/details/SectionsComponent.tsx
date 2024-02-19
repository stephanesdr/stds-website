import { useState, useMemo, useEffect } from "react";
import type Project from "@interfaces/project.js"
import SectionComponent from "./SectionComponent.tsx"
import { motion } from "framer-motion";
import { projectId } from "@stores/AppStore.ts";
import { useStore } from '@nanostores/react';

type SectionsProps = {
    project: Project
}

const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
}
  
export default function Sections({ project }: SectionsProps) {
    const [show] = useState(true);
    const $projectId = useStore(projectId);

    useEffect(() => {
        console.log($projectId)
    }, [])

    const columnIndexes = useMemo(() => {
        const data: any = project.sections.reduce((acc, curr) => {
          acc.sections[curr.id] = acc.currentIndex;
          acc.currentIndex += curr.columns.length;
          return acc;
    
        }, { sections: {}, currentIndex: 0 } as any)
    
        return data.sections;
    
      }, [project.sections])
    
    return  <motion.ul className="project__sections overflow-hidden"
        initial={"closed"}
        animate={show ? "open" : "closed"}
        variants={variants}>
        {project.sections && project.sections.length > 0 && project.sections.map(section => <SectionComponent projectSize={project.defaultSize} startIndexAt={columnIndexes[section.id]} key={section.id} section={section} />)}
    
    </motion.ul>
}
