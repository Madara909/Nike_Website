import { useState, useEffect } from "react"; // Import useEffect to handle scroll event
import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

    // Toggle menu open/close state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu on scroll
    const handleScroll = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false); // Close the menu if it's open when scrolling
        }
    };

    // Attach scroll event listener when the component mounts and clean up when it unmounts
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMenuOpen]);

    return (
        <header className='padding-x py-8 absolute z-50 w-full'>
            <nav className='flex justify-between items-center max-container'>
                <a href='/'>
                    <img
                        src={headerLogo}
                        alt='logo'
                        width={129}
                        height={29}
                        className='m-0 w-[129px] h-[29px]'
                    />
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className='font-montserrat leading-normal text-lg text-slate-gray hover:text-blue-500 transition-colors'
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
                    <a href='/'>Sign in</a>
                    <span>/</span>
                    <a href='/'>Explore now</a>
                </div>
                <div className='hidden max-lg:block'>
                    <img
                        src={hamburger}
                        alt='hamburger icon'
                        width={25}
                        height={25}
                        onClick={toggleMenu} // Attach click event to toggle menu
                        className='cursor-pointer'
                    />
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full bg-white w-64 transition-transform duration-300 ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } max-lg:block lg:hidden shadow-lg`}
            >
                <button
                    className='absolute top-5 right-5 text-2xl'
                    onClick={toggleMenu} // Close menu when clicked
                >
                    &times;
                </button>
                <ul className='mt-20 flex flex-col items-center justify-start gap-6 h-full'>
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className='font-montserrat text-lg text-slate-gray hover:text-blue-500 hover:underline transition-colors'
                                onClick={toggleMenu} // Close the menu on link click
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Nav;
