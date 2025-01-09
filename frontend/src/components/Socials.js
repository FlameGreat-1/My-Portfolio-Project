import React, { useEffect, useState } from 'react';
import { fetchSocials } from '../utils/SocialsData';
import { HiOutlineMail, HiOutlineMap } from "react-icons/hi";
import { FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
import { getIcon } from '../utils/IconUtils';

const Socials = () => {
    const [socials, setSocials] = useState([]);
    const [icons, setIcons] = useState({});

    useEffect(() => {
        const getSocials = async () => {
            const fetchedSocials = await fetchSocials();
            setSocials(fetchedSocials);

            const iconMap = fetchedSocials.reduce((acc, social) => {
                switch (social.type) {
                    case 'Email':
                        acc[social.icon] = HiOutlineMail;
                        break;
                    case 'Location':
                        acc[social.icon] = HiOutlineMap;
                        break;
                    case 'Phone':
                        acc[social.icon] = FaPhoneVolume;
                        break;
                    case 'WhatsApp':
                        acc[social.icon] = FaWhatsapp;
                        break;
                    default:
                        acc[social.icon] = getIcon(social.icon) || FaPhoneVolume;
                }
                return acc;
            }, {});
            setIcons(iconMap);
        };
        getSocials();
    }, []);

    const DynamicIcon = ({ iconName }) => {
        const IconComponent = icons[iconName] || FaPhoneVolume;
        return <IconComponent className="p-2 rounded-xl text-vegas-gold bg-smoky-black border border-jet border-solid text-4xl" />;
    };

    return ( 
        <main className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {socials.map((social, index) => (
                <div key={index} className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-sm shadow-jet border border-jet border-solid bg-smoky-black" data-aos="fade-down">
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <DynamicIcon iconName={social.icon} />
                        <p className="text-gray text-[15px] md:text-[16px] font-bold">{social.type}</p>
                    </div>
                    {social.link ? (
                        <a href={social.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 group">
                            <p className="text-litewhite text-[12px] md:text-[13px] font-medium">{social.value}</p>
                            <h4 className="text-[14px] md:text-[16px] text-litewhite group-hover:text-vegas-gold transition-all delay-200 font-medium">
                                {social.type === 'Email' ? 'Send A Mail' : 
                                 social.type === 'WhatsApp' ? 'Send A Message' : 
                                 social.type === 'Phone' ? 'Place A Call' : 
                                 social.type === 'Location' ? 'View on Map' : ''}
                            </h4>
                        </a>
                    ) : (
                        <h4 className="text-[14px] md:text-[16px] text-litewhite transition-all delay-200 font-medium">{social.value}</h4>
                    )}
                </div>
            ))}
        </main>
    );
}

export default Socials;
