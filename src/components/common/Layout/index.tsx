import React from 'react';
import { LayoutProps } from '@/types';
import { SEO } from '../SEO';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const Layout: React.FC<LayoutProps> = ({
    children,
    title = 'Modern Blog - Chia sẻ kiến thức và kinh nghiệm',
    description = 'Blog hiện đại với những bài viết chất lượng về công nghệ, thiết kế và cuộc sống',
    ogImage,
    noIndex = false,
    className = ''
}) => {
    return (
        <>
            <SEO
                title={title}
                description={description}
                ogImage={ogImage}
                noIndex={noIndex}
            />

            <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
                <Header />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />
            </div>
        </>
    );
};

export { Layout };