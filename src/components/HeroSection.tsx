import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-slate-400 font-medium mb-8 animate-fade-in">
                        <Star className="w-4 h-4" />
                        <span>Chào mừng đến với Xipat Blog</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
                        Welcome to
                        <span className="text-gradient block md:inline md:ml-3">
                            XIPAT FLEXIBLE SOLUTIONS COMPANY LIMITED
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                        Xipat cung cấp các giải pháp công nghệ cho cuộc sống tốt đẹp hơn
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 animate-scale-in">
                        <Link
                            href="/blog"
                            className="btn btn-primary flex items-center space-x-2 px-8 py-3 text-lg"
                        >
                            <BookOpen className="w-5 h-5" />
                            <span>Khám phá ngay</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/"
                            className="btn btn-secondary flex items-center space-x-2 px-8 py-3 text-lg cursor-not-allowed"
                        >
                            <Users className="w-5 h-5" />
                            <span>Về chúng tôi</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
                            <div className="text-gray-600">Đối tác trên khắp thế giới</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                            <div className="text-gray-600">Sản phẩm</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">500K+</div>
                            <div className="text-gray-600">Khách hàng trên khắp thế giới</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-primary-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
        </section>
    );
};

export default HeroSection;