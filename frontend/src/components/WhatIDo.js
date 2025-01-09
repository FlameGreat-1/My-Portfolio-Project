import React, { useEffect, useState } from 'react';
import { AiFillSetting } from "react-icons/ai";
import { FaCode, FaChartLine, FaLaptopCode, FaFlask, FaPaintBrush, FaGlobe } from "react-icons/fa";
import { fetchWhatIDo } from '../utils/WhatIDoData';

const iconMap = {
    'AiFillSetting': <AiFillSetting className="text-3xl text-vegas-gold font-medium" />,
    'FaCode': <FaCode className="text-3xl text-vegas-gold font-medium" />,
    'FaChartLine': <FaChartLine className="text-3xl text-vegas-gold font-medium" />,
    'FaLaptopCode': <FaLaptopCode className="text-3xl text-vegas-gold font-medium" />,
    'FaFlask': <FaFlask className="text-3xl text-vegas-gold font-medium" />,
    'FaPaintBrush': <FaPaintBrush className="text-3xl text-vegas-gold font-medium" />,
    'FaGlobe': <FaGlobe className="text-3xl text-vegas-gold font-medium" />,
};

const WhatIDo = () => {
    const [whatIDoItems, setWhatIDoItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchWhatIDo();
            setWhatIDoItems(data);
        };
        fetchData();
    }, []);

    return (
        <main className="grid gap-5">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-[28px] font-bold text-litewhite" data-aos="fade-down">What I Do!?</h1>
                <div className="bg-vegas-gold h-[5px] w-[60px] rounded-full" data-aos="fade-down"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {whatIDoItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm shadow-jet border border-jet border-solid bg-smoky-black" data-aos="fade-down">
                        {iconMap[item.icon] || <FaCode className="text-3xl text-vegas-gold font-medium" />}
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-lg md:text-xl text-litewhite font-bold">{item.title}</h1>
                            <p className="text-[14px] md:text-[16px] text-litewhite">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default WhatIDo;
