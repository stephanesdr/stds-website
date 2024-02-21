import { useState, useRef, useMemo } from "react";
import type Section from "@interfaces/section"
import { Size } from "@interfaces/section"
import ColumnComponent from "./ColumnComponent.tsx"
import { useScroll } from "framer-motion"
import { cn } from "@utils/cn.ts";

type SectionProps = {
    section: Section
    projectSize: Size
    startIndexAt: number
}

export default function SectionComponent({ section, projectSize, startIndexAt = 0 }: SectionProps) {
    const scrollRef = useRef(null)

    const [type] = useState("normal");

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
    })

    const sectionWrapperStyle = useMemo(() => {
        let style: { [key: string]: any } = {
            marginTop: section.marginTop,
            marginBottom: section.marginBottom,
        }

        if (style.marginTop < 0) {
            style.position = "relative";
            style.top = style.marginTop;
            delete style.marginTop;
        }

        if (section.backgroundColor) style.backgroundColor = section.backgroundColor.hex;

        return style;

    }, [section])

    const sectionStyle = useMemo(() => {
        let style: { [key: string]: any } = {
            paddingTop: section.paddingTop,
            paddingBottom: section.paddingBottom,
            marginLeft: section.outerSpace,
            marginRight: section.outerSpace
        }

        if (style.marginTop < 0) {
            style.position = "relative";
            style.top = style.marginTop;
            delete style.marginTop;
        }

        return style;

    }, [section])

    const columns = useMemo(() => {
        return <div style={sectionStyle} className={cn("project__columns-wrapper")}>
            <div style={{gap: section.gap}} className={cn("project__columns", "w-full flex flex-col sm:flex-row justify-start items-stretch")}>
                {section.columns && section.columns.length > 0 && section.columns.map((column, i) => <ColumnComponent
                    key={column.id}
                    index={startIndexAt + i}
                    scrollYProgress={scrollYProgress}
                    column={column} />)}
            </div>
        </div>
    }, [section, sectionStyle, startIndexAt, scrollYProgress])

    const size = useMemo(() => {
        if(section.size) return section.size;
        return projectSize

    }, [section, projectSize]);

    return <li
        ref={scrollRef}
        style={sectionWrapperStyle}
        className={cn("project__sections__item", "w-full")}
    >
        {size === Size.Full && <div className="w-full">{columns}</div>}

        {type === 'container' && <>
            {size === Size.xs && <div className={cn("w-full container mx-auto")}>{columns}</div>}
            {size === Size.sm && <div className={cn("w-full sm:container sm:mx-auto")}>{columns}</div>}
            {size === Size.md && <div className={cn("w-full md:container md:mx-auto")}>{columns}</div>}
            {size === Size.lg && <div className={cn("w-full lg:container lg:mx-auto")}>{columns}</div>}
            {size === Size.xl && <div className={cn("w-full xl:container xl:mx-auto")}>{columns}</div>}
            {size === Size.xxl && <div className={cn("w-full 2xl:container 2xl:mx-auto")}>{columns}</div>}
        </>}

        {type !== 'container' && <>
            {size === Size.xs && <div className={cn("w-full mx-auto max-w-screen-xs")}>{columns}</div>}
            {size === Size.sm && <div className={cn("w-full mx-auto max-w-screen-sm")}>{columns}</div>}
            {size === Size.md && <div className={cn("w-full mx-auto max-w-screen-md")}>{columns}</div>}
            {size === Size.lg && <div className={cn("w-full mx-auto max-w-screen-lg")}>{columns}</div>}
            {size === Size.xl && <div className={cn("w-full mx-auto max-w-screen-xl")}>{columns}</div>}
            {size === Size.xxl && <div className={cn("w-full mx-auto max-w-screen-2xl")}>{columns}</div>}
        </>}
    
    </li>
}
