import React, { useState, useMemo } from "react";
import type Project from "@interfaces/project.js"
import Section from "./Section.tsx"
import { motion } from "framer-motion";

type SectionsProps = {
    project: Project
}

const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
}
  
export default function Sections({ project }: SectionsProps) {
    const [show, setShow] = useState(true);

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
        {project.sections && project.sections.length > 0 && project.sections.map(section => <Section projectSize={project.defaultSize} startIndexAt={columnIndexes[section.id]} key={section.id} section={section} />)}
    </motion.ul>
}
