"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll the page to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-8 right-8 z-50 p-3 rounded-full 
                bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black 
                shadow-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 
                hover:scale-110
                transition-all duration-300 ease-in-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            `}
            aria-label="Scroll to top"
        >
            <FaArrowUp className="w-5 h-5" />
        </button>
    );
};