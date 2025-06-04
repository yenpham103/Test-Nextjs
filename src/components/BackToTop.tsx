import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-6 right-6 z-50
                w-12 h-12 
                bg-blue-600
                text-white
                rounded-full 
                shadow-lg hover:shadow-xl
                transition-all duration-300 ease-in-out
                hover:scale-110
                focus:outline-none focus:ring-4 focus:ring-primary-300
                animate-fade-in
                cursor-pointer
            `}
            title="Về đầu trang"
            aria-label="Về đầu trang"
        >
            <ChevronUp className="w-6 h-6 mx-auto" />
        </button>
    );
};

export default BackToTop;