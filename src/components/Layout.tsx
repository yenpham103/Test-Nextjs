import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, User, Github, Facebook } from 'lucide-react';
import BackToTop from './BackToTop';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gradient">Xipat Blog</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                <span>Trang chủ</span>
                            </Link>
                            <Link
                                href="/blog"
                                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <BookOpen className="w-4 h-4" />
                                <span>Blog</span>
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span>Giới thiệu</span>
                            </Link>
                        </nav>

                        <div className="md:hidden">
                            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-20">
                <div className="container-custom py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gradient">Xipat Blog</span>
                            </div>
                            <p className="text-gray-600 max-w-md">
                                Khám phá những bài viết chất lượng về công nghệ, cuộc sống và nhiều chủ đề thú vị khác.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Trang chủ</Link></li>
                                <li><Link href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">Blog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/yenpham103"
                                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.facebook.com/nosgar.1003"
                                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                        <p className="text-gray-600">
                            © {new Date().getFullYear()} XIPAT FLEXIBLE SOLUTIONS COMPANY LIMITED.
                        </p>
                    </div>
                </div>
            </footer>
            <BackToTop />
        </div>
    );
};

export default Layout;