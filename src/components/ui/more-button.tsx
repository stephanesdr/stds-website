import React, {useState} from "react"
import { simpleSchema as projectSchema } from "@interfaces/project";

const MoreButton = ({
    currentCursor, 
    size,
    url,
    hasNextParam = false
}: {
    currentCursor: any;
    size: number;
    url: string;
    hasNextParam?: boolean;
}) => {
    

    console.log(url, 1)

    const [projects, setProjects] = useState<any>([])
    const [cursor, setCursor] = useState(currentCursor)
    const [hasNext, setHasNext] = useState(hasNextParam )
    const [loading, setLoading] = useState(false)

    const getMore = async () => {
        setLoading(true)
        const response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    query: `query MyQuery($cursor: String!, $size: Int!) {
                        projectsConnection(after:$cursor, first:$size, orderBy: priority_DESC) {
                            projectsArray: edges {
                                cursor
                                project: node {
                                    ${projectSchema()}
                                }
                            }
                            pageInfo {
                                endCursor
                                hasNextPage
                             }
                        }
                    }`,
                    variables: {
                        size,
                        cursor
                    }
                })
            }
        );

        
        const json = await response.json()

        console.log(json,2)

        const { data } = json;
        const { projectsArray, pageInfo } = data.projectsConnection;

        
        
        setProjects([...projects, ...projectsArray])
        setCursor(pageInfo.endCursor)
        setHasNext(pageInfo.hasNextPage)
        setLoading(false)

        // console.log(projectsArray[0]);
    }

    return (
        <>
        <div className="fixed top-0 bg-red-300 py-6 !z-[99999] w-full text-center">{JSON.stringify({cursor, hasNext, projects: projects.length})}</div>
            {projects.map((item: any) => (
                     <div key={item.cursor} className="card mx-4 my-[0.5rem] z-50 overflow-clip hover:rounded-3xl shadow-lg hover:shadow-sm flex flex-col justify-center items-center max-w-md">
                                    {item.project.image &&
                                        item.project.featuredType === "Image" && (
                                            <div
                                                className="image-container"
                                                data-persist-container="true"
                                            >
                                                <a
                                                    href={`/projects/${item.project.slug}/`}
                                                    data-name="project__a"
                                                    data-id={item.project.id}
                                                >
                                                    <img
                                                        loading="lazy"
                                                        className="card-media w-full h-full"
                                                        data-transition-name="card-media"
                                                        data-persist="true"
                                                        src={item.project.image.url}
                                                        alt={
                                                            item.project.image
                                                                .fileName
                                                        }
                                                    />
                                                </a>
                                            </div>
                                        )}
                                    {item.project.image &&
                                        item.project.featuredType === "Video" && (
                                            <div
                                                className="video-container"
                                                data-persist-container="true"
                                            >
                                                <a
                                                    href={`/projects/${item.project.slug}/`}
                                                    data-name="project__a"
                                                    data-id={item.project.id}
                                                >
                                                    <video
                                                        loop
                                                        muted
                                                        autoPlay
                                                        className="card-media w-full h-full"
                                                        data-transition-name="card-media"
                                                        data-persist="true"
                                                    >
                                                        <source
                                                            src={
                                                                item.project.image
                                                                    .url
                                                            }
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                </a>
                                            </div>
                                            )}                        
                                    </div>
                                 ))}
                                 
            {loading && <div className="bg-white mb-4 p-4 rounded-xl text-center"> Loading ...</div>}
            { hasNext && <button onClick={getMore} className="bg-white mb-4 p-4 rounded-xl text-center"> Get more</button>}
        </> 
    )
}

export default MoreButton;