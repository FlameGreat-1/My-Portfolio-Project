import React, { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';
import NavBar from "./NavBar";
import WhatIDo from "./WhatIDo";
import WordsonMarble from "./WordsOnMarble";
import { fetchAboutMe } from '../utils/AboutMeData';

const Skills = lazy(() => import("./Skills"));

const AboutMe = () => {
    const [aboutMeData, setAboutMeData] = useState({ content: '' });


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAboutMe();
            setAboutMeData(data);
        };
        fetchData();
    }, []);

    return (
        <main className="relative ml-0 lg:ml-[26%] lg:right-0 w-full lg:w-[74%] bg-eerie-black rounded-lg border border-jet border-solid shadow-sm shadow-jet p-5 flex flex-col gap-10 mt-5 lg:mt-0 pb-10 lg:mb-0 mb-[4rem] overflow-hidden">
            <NavBar />

            <section className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-[28px] font-bold text-litewhite" data-aos="fade-down">About Me</h1>
                    <div className="bg-vegas-gold h-[5px] w-[60px] rounded-full" data-aos="fade-down"></div>
                </div>
                <p className="text-[14px] md:text-[16px] text-justify text-litewhite" data-aos="fade-down">
                    {aboutMeData.content}
                </p>
            </section>

            <WhatIDo />

            <Suspense fallback={<div>Loading Skills...</div>}>
                <Skills />
            </Suspense>

            <WordsonMarble />
        </main>
    );
}

export default AboutMe;
