import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoChecklist } from "react-icons/go";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RiContactsBookFill } from "react-icons/ri";
import { FaUser, FaBlog } from "react-icons/fa";

const NavBar = () => {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <header className="fixed lg:absolute bottom-0 lg:bottom-auto left-0 lg:left-auto lg:top-0 lg:right-0 flex items-center lg:items-end justify-center lg:justify-end w-full lg:w-[500px] rounded-lt-lg rounded-rt-lg z-50">
            <nav className="relative flex items-center justify-center text-[12px] sm:text-[14px] lg:text-[16px] font-medium text-litewhite gap-2 sm:gap-4 lg:gap-6 rounded-bl-none lg:rounded-bl-lg rounded-tr-lg lg:rounded-tr-lg rounded-tl-lg lg:rounded-tl-none border border-jet border-solid p-3 lg:p-4 backdrop-blur-lg bg-transparent lg:bg-smoky-gray shadow-sm w-full z-36">
                <Link to="/" className={pathName === "/" ? "flex items-center gap-1 visited:text-vegas-gold font-bold transition-all delay-200" : "flex items-center gap-1 hover:text-gray transition -all delay-200"}><FaUser /> About</Link>
                <Link to="/journey" className={pathName === "/journey" ? "flex items-center gap-1 visited:text-vegas-gold font-bold transition-all delay-200" : "flex items-center gap-1 hover:text-gray transition-all delay-200"}><GoChecklist /> Journey</Link>
                <Link to="/projects" className={pathName === "/projects" ? "flex items-center gap-1 visited:text-vegas-gold font-bold transition-all delay-200" : "flex items-center gap-1 hover:text-gray transition-all delay-200"}><AiOutlineFundProjectionScreen /> Projects</Link>
                <Link to="/contact" className={pathName === "/contact" ? "flex items-center gap-1 visited:text-vegas-gold font-bold transition-all delay-200" : "flex items-center gap-1 hover:text-gray transition-all delay-200"}><RiContactsBookFill /> Contact</Link>
                <Link to="/blog" className={pathName.startsWith("/blog") ? "flex items-center gap-1 visited:text-vegas-gold font-bold transition-all delay-200" : "flex items-center gap-1 hover:text-gray transition-all delay-200"}><FaBlog /> Blog</Link>
            </nav>
        </header>
    );
}

export default NavBar;