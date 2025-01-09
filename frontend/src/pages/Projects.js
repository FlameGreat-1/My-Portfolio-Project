import React from 'react';
import ProfileBar from '../components/ProfileBar';
import MyProjects from '../components/MyProjects';
import BackToTop from '../components/BackToTop';

const Projects = () => {
  return (
    <main className="relative w-full min-h-screen h-full p-[2%] bg-smoky-black gap-10">
      <ProfileBar />
      <MyProjects />
      <BackToTop targetId={"top"} />
    </main>
  );
}

export default Projects;
