import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiBookOpen } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import NavBar from "./NavBar";

const MyJourney = () => {
    const [journeyData, setJourneyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/api/journey/');
                setJourneyData(result.data);
            } catch (error) {
                console.error('Error fetching journey data:', error);
            }
        };
        fetchData();
    }, []);

    const renderJourneyItems = (type) => {
        return journeyData
            .filter(item => item.type === type)
            .map((item, index) => (
                <div key={item.id} className="relative grid gap-2">
                    <h3 className="text-[16px] md:text-[18px] text-litewhite font-bold" data-aos="fade-down">{item.institution}</h3>
                    <h4 className="text-[15px] md:text-[17px] text-litewhite" data-aos="fade-down">{item.title}</h4>
                    <h4 className="text-[14px] md:text-[16px] text-litewhite" data-aos="fade-down">{item.description}</h4>
                    <p className="text-[14px] md:text-[16px] text-vegas-gold" data-aos="fade-down">{item.date_range}</p>
                    <GoDotFill className="absolute top-0 left-[-45px] text-vegas-gold text-2xl p-[1px] bg-smoky-gray rounded-full"/>
                </div>
            ));
    };

    return (
        <main className="relative ml-0 lg:ml-[26%] lg:right-0 w-full lg:w-[74%] bg-eerie-black rounded-lg border border-jet border-solid shadow-sm shadow-jet p-5 flex flex-col gap-10 mt-5 lg:mt-0 pb-10 lg:mb-0 mb-20 overflow-hidden">
            <NavBar />

            <section className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-litewhite" data-aos="fade-down">My Journey</h1>
                    <div className="bg-vegas-gold h-[5px] w-[60px] rounded-full" data-aos="fade-down"></div>
                </div>
                
                <div className="relative pl-8 pr-4 border-l-[2px] border-l-jet border-l-solid ml-5 md:ml-8 mt-10 mb-10 grid gap-6">
                    <h1 className="text-xl font-bold text-litewhite" data-aos="fade-down">Education</h1>
                    <FiBookOpen className="absolute top-[-15px] left-[-25px] p-2 rounded-xl text-vegas-gold bg-smoky-black border border-jet border-solid text-5xl"/>
                    {renderJourneyItems('education')}
                </div>

                <div className="relative pl-8 pr-4 border-l-[2px] border-l-jet border-l-solid ml-5 md:ml-8 mt-10 mb-10 grid gap-6">
                    <h1 className="text-xl font-bold text-litewhite" data-aos="fade-down">Internship Trainings</h1>
                    <FiBookOpen className="absolute top-[-15px] left-[-25px] p-2 rounded-xl text-vegas-gold bg-smoky-black border border-jet border-solid text-5xl"/>
                    {renderJourneyItems('internship')}
                </div>

                <div className="relative pl-8 pr-4 border-l-[2px] border-l-jet border-l-solid ml-5 md:ml-8 mt-10 mb-10 grid gap-6">
                    <h1 className="text-xl font-bold text-litewhite" data-aos="fade-down">Certifications</h1>
                    <FiBookOpen className="absolute top-[-15px] left-[-25px] p-2 rounded-xl text-vegas-gold bg-smoky-black border border-jet border-solid text-5xl"/>
                    {renderJourneyItems('certification')}
                </div>

                <div className="relative pl-8 pr-4 border-l-[2px] border-l-jet border-l-solid ml-5 md:ml-8 mt-10 mb-10 grid gap-6">
                    <h1 className="text-xl font-bold text-litewhite" data-aos="fade-down">Working Experience</h1>
                    <FiBookOpen className="absolute top-[-15px] left-[-25px] p-2 rounded-xl text-vegas-gold bg-smoky-black border border-jet border-solid text-5xl"/>
                    {renderJourneyItems('work')}
                </div>
            </section>
        </main>
    );
}

export default MyJourney;
