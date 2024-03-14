import { useCallback } from "react";
import type Project from "@interfaces/project";
import { featuredType } from "@interfaces/project";
import HygraphVideo from "@components/HygraphVideoComponent"
import HygraphImage from "@components/HygraphImageComponent"
import type Asset from "@interfaces/asset"
import { cn } from "@utils/cn";


type FeaturedProps = {
    project: Project
}

export default function FeaturedComponent({ project }: FeaturedProps) {



    const isVideo = useCallback((image: Asset) => /^video\//.test(image.mimeType), []);
    const isImage = useCallback((image: Asset) => /^image\//.test(image.mimeType), []);

    console.log(project.image)
    return <>


        {project.image && <a href={`/projects/${project.slug}`}>

            

            {isImage(project.image) && <HygraphImage
                className={cn(
                    "project__image",
                    "w-full"
                )}
                width={project.image.width}
                height={project.image.height}
                
                src={project.image.url}
                alt={""}

            />}

            {isVideo(project.image) && <HygraphVideo
                className={cn(
                    "project__image",
                    "w-full"
                )}
                width={project.image.width}
                height={project.image.height}
                data-transition-name="project-card"
                src={project.image.url}
                mimeType={project.image.mimeType}

            />}

        </a>

        }
    </>

}