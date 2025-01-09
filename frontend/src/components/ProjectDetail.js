import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import NavBar from "./NavBar";
import { getProjectById } from "../utils/ProjectsData";

const Spinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-vegas-gold"></div>
    </div>
);

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const fetchedProject = await getProjectById(id);
                setProject(fetchedProject);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <main className="relative ml-0 lg:ml-[26%] lg:right-0 w-full lg:w-[74%] bg-eerie-black rounded-lg border border-jet border-solid shadow-sm shadow-jet p-5 flex flex-col gap-10 mt-5 lg:mt-0 pb-10 lg:mb-0 mb-20 overflow-hidden">
            <NavBar />
            <Link to="/projects" className="text-vegas-gold hover:underline">← Back to Projects</Link>
            <h1 className="text-2xl md:text-3xl text-litewhite font-bold">{project.title}</h1>
            <div className="flex flex-wrap gap-4">
                {project.images && project.images.map((image, index) => (
                    <img 
                        key={index}
                        src={image} 
                        alt={`${project.title} - ${index + 1}`}
                        className="max-w-full h-auto"
                    />
                ))}
            </div>
            <p className="text-[16px] md:text-[18px] text-litewhite">{project.about}</p>
            <h4 className="text-[17px] md:text-[19px] text-vegas-gold font-bold font-italic">
                {project.stack}
            </h4>
            <div className="flex items-center gap-4">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-vegas-gold hover:underline">
                    <BiLogoGithub /> GitHub
                </a>
                {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-vegas-gold hover:underline">
                        <BiLinkExternal /> Live Demo
                    </a>
                )}
            </div>
            {project.video_url && (
                <div className="mt-4">
                    <h3 className="text-xl text-litewhite font-bold mb-2">Project Video</h3>
                    <video controls className="w-full max-w-2xl mx-auto">
                        <source src={project.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </main>
    );
}

export default ProjectDetail;
