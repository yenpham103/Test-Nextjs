import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
                        <Star className="w-4 h-4" />
                        <span>Chào mừng đến với Modern Blog</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
                        Khám phá những
                        <span className="text-gradient block md:inline md:ml-3">
                            ý tưởng tuyệt vời
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                        Tham gia cùng chúng tôi trong hành trình khám phá những bài viết chất lượng cao về công nghệ,
                        cuộc sống và những chủ đề thú vị khác. Mỗi bài viết đều được chọn lọc kỹ lưỡng để mang đến cho bạn
                        những trải nghiệm đọc tốt nhất.
                    </p>

                    {/* CTA Buttons */}
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
                            href="/about"
                            className="btn btn-secondary flex items-center space-x-2 px-8 py-3 text-lg"
                        >
                            <Users className="w-5 h-5" />
                            <span>Về chúng tôi</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
                            <div className="text-gray-600">Bài viết chất lượng</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
                            <div className="text-gray-600">Lượt đọc mỗi tháng</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">1K+</div>
                            <div className="text-gray-600">Độc giả thân thiết</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-primary-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
        </section>
    );
};

export default HeroSection;