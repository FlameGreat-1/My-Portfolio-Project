import React, { useEffect, useState } from 'react';
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { fetchProjects } from "../utils/ProjectsData";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';

const Spinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-vegas-gold"></div>
    </div>
);

const ProjectCard = ({ project }) => {
    return (
        <div className="relative flex flex-col items-center justify-center p-4 rounded-lg shadow-sm shadow-jet border border-jet border-solid bg-smoky-black gap-3 pb-8 lg:pb-4">
            {project.images && project.images.length > 0 && (
                <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/img/default-project.png';
                    }}
                />
            )}
            <h1 className="text-lg md:text-xl text-litewhite font-bold">{project.title}</h1>
            <p className="text-[14px] md:text-[16px] text-litewhite text-center line-clamp-3">{project.about}</p>
            <Link 
                to={`/project/${project.id}`}
                className="px-4 py-2 bg-vegas-gold text-smoky-black rounded-md hover:bg-jet hover:text-vegas-gold transition-all duration-300"
            >
                View More
            </Link>
            <div className="flex items-center justify-center gap-3 mt-2">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <BiLogoGithub className="text-2xl text-litewhite hover:text-vegas-gold" />
                </a>
                {project.video_url && (
                    <a href={project.video_url} target="_blank" rel="noopener noreferrer">
                        <BiLinkExternal className="text-2xl text-litewhite hover:text-vegas-gold" />
                    </a>
                )}
            </div>
        </div>
    );
};

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            setIsLoading(true);
            try {
                const fetchedProjects = await fetchProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getProjects();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="relative ml-0 lg:ml-[26%] lg:right-0 w-full lg:w-[74%] bg-eerie-black rounded-lg border border-jet border-solid shadow-sm shadow-jet p-5 flex flex-col gap-10 mt-5 lg:mt-0 pb-10 lg:mb-0 mb-20 overflow-hidden">
            <NavBar />

            <section className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-litewhite" data-aos="fade-down">Recent Projects</h1>
                    <div className="bg-vegas-gold h-[5px] w-[60px] rounded-full" data-aos="fade-down"></div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
                <h4 className="text-[15px] md:text-[16px] text-litewhite font-bold font-italic text-center">More Projects!?</h4>
                <a href="https://github.com/FlameGreat-1?tab=repositories" target="_blank" rel="noopener noreferrer" className="py-[8px] px-6 rounded-md text-smoky-black hover:text-vegas-gold bg-vegas-gold hover:bg-smoky-black hover:border-jet border border-solid text-[14px] md:text-[16px] font-bold transition-all delay-200 flex items-center justify-center">
                    GitHub <BiLogoGithub className="ml-1 animate-bounce"/>
                </a>
            </div>
        </main>
    );
}

export default MyProjects;
