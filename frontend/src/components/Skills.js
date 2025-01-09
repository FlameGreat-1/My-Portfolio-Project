import React, { useEffect, useState } from 'react';
import { SkillItem, fetchSkills } from '../utils/SkillsData';
import { getIcon } from '../utils/IconUtils';

const DynamicIcon = ({ iconName }) => {
    const IconComponent = getIcon(iconName);
    return IconComponent ? <IconComponent className="text-3xl text-vegas-gold"/> : null;
};

const Skills = () => {
    const [skills, setSkills] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSkills = async () => {
            setIsLoading(true);
            try {
                const fetchedSkills = await fetchSkills();
                const groupedSkills = fetchedSkills.reduce((acc, skill) => {
                    if (!acc[skill.category]) {
                        acc[skill.category] = [];
                    }
                    acc[skill.category].push(skill);
                    return acc;
                }, {});
                setSkills(groupedSkills);
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSkills();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vegas-gold"></div>
            </div>
        );
    }

    return ( 
        <main className="grid gap-5">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-[28px] font-bold text-litewhite" data-aos="fade-down">Stack and Tools</h1>
                <div className="bg-vegas-gold h-[5px] w-[60px] rounded-full" data-aos="fade-down"></div>
            </div>

            {Object.entries(skills).map(([category, categorySkills]) => (
                <div key={category} className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-litewhite mb-3" data-aos="fade-down">{category}</h2>
                    <div className="flex flex-wrap gap-3">
                        {categorySkills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-start gap-2 shadow-sm shadow-jet rounded-lg border border-jet border-solid p-2 md:p-3" data-aos="fade-down">
                                <DynamicIcon iconName={skill.icon} />
                                <h1 className="text-litewhite text-sm md:text-base font-bold">{skill.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Skills;
