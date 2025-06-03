import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, Menu, X } from 'lucide-react';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { MobileMenu } from '../MobileMenu';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    <Navigation className="hidden md:flex" />

                    <div className="flex items-center space-x-4">
                        <button
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            </div>
        </header>
    );
};