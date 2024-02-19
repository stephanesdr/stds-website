import { useStore } from "@nanostores/react";
import { projectId } from "@stores/AppStore";
import { useEffect } from "react";

const ProjectRoutingComponent = () => {
    const $projectId = useStore(projectId);
    
    useEffect(() => {
        const a = document.querySelectorAll('a[data-name="project__a"]');


        a.forEach(link => link.addEventListener('click', (e) => {
            e.preventDefault();

            const id = link.getAttribute('data-id')
            projectId.set(id || '')

            console.log($projectId, projectId);
        }))
        
        return () => {
            // clean up
        }

    }, []);

}

export default ProjectRoutingComponent;