import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2, Heart, MessageCircle } from 'lucide-react';
import { BlogPostWithSlug } from '@/types/blog';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { fetchBlogPosts, findPostBySlug, transformBlogPost } from '@/lib/blog';



interface BlogDetailProps {
    post: BlogPostWithSlug;
    relatedPosts: BlogPostWithSlug[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, relatedPosts }) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Đã sao chép link vào clipboard!');
        }
    };

    return (
        <Layout>
            <SEO
                title={post.title}
                description={post.excerpt}
                url={`${process.env.SITE_URL}/blog/${post.slug}`}
            />

            <section className="bg-gray-50 py-4 border-b border-gray-200">
                <div className="container-custom">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                            Trang chủ
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">
                            Blog
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium line-clamp-1">{post.title}</span>
                    </nav>
                </div>
            </section>

            <article className="py-12 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Quay lại danh sách</span>
                        </Link>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{post.createdAt}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>Tác giả #{post.userId}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between py-6 border-y border-gray-200 mb-8">
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span>Thích</span>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Bình luận</span>
                                </button>
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                                <span>Chia sẻ</span>
                            </button>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed space-y-6">
                                {post.body.split('\n').map((paragraph, index) => (
                                    <p key={index} className="text-lg leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    {post.userId}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Tác giả #{post.userId}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Một tác giả tài năng với nhiều bài viết chất lượng trên Modern Blog.
                                        Luôn mang đến những góc nhìn mới mẻ và thú vị cho độc giả.
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={`/author/${post.userId}`}
                                            className="text-primary-600 hover:text-primary-700 font-medium"
                                        >
                                            Xem thêm bài viết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                Bài viết liên quan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <BlogCard key={relatedPost.id} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const posts = await fetchBlogPosts();
        const transformedPosts = posts.map(transformBlogPost);

        const paths = transformedPosts.map((post) => ({
            params: { slug: post.slug },
        }));

        return {
            paths,
            fallback: false,
        };
    } catch (error) {
        console.error('Error in getStaticPaths:', error);
        return {
            paths: [],
            fallback: false,
        };
    }
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
    try {
        const slug = params?.slug as string;

        if (!slug) {
            return {
                notFound: true,
            };
        }

        const posts = await fetchBlogPosts();
        const transformedPosts = posts.map(transformBlogPost);

        const post = findPostBySlug(transformedPosts, slug);

        if (!post) {
            return {
                notFound: true,
            };
        }

        const relatedPosts = transformedPosts
            .filter(p => p.id !== post.id && p.userId === post.userId)
            .slice(0, 3);

        if (relatedPosts.length < 3) {
            const additionalPosts = transformedPosts
                .filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id))
                .slice(0, 3 - relatedPosts.length);

            relatedPosts.push(...additionalPosts);
        }

        return {
            props: {
                post,
                relatedPosts,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            notFound: true,
        };
    }
};

export default BlogDetail;