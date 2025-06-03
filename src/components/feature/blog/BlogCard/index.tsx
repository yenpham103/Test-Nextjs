import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogCardProps } from '@/types';
import { formatDate } from '@/lib/utils';
import { BlogCardContent } from './BlogCardContent';
import { BlogCardImage } from './BlogCardImage';
import { BlogCardMeta } from './BlogCardMeta';

export const BlogCard: React.FC<BlogCardProps> = ({
    post,
    featured = false,
    variant = 'default',
    className = ''
}) => {
    if (featured) {
        return (
            <article className={`relative group ${className}`}>
                <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
                        <BlogCardImage
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {post.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <BlogCardContent
                                title={post.title}
                                excerpt={post.excerpt}
                                variant="featured"
                                className="text-white"
                            />

                            <BlogCardMeta
                                author={post.author}
                                readTime={post.readTime}
                                publishedAt={post.publishedAt}
                                variant="featured"
                                className="text-gray-300"
                            />
                        </div>
                    </div>
                </Link>
            </article>
        );
    }

    if (variant === 'horizontal') {
        return (
            <article className={`group ${className}`}>
                <Link href={`/blog/${post.slug}`}>
                    <div className="card card-hover p-4 flex space-x-4">
                        <BlogCardImage
                            src={post.coverImage}
                            alt={post.title}
                            width={200}
                            height={120}
                            className="object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                            <BlogCardContent
                                title={post.title}
                                excerpt={post.excerpt}
                                tags={post.tags}
                                category={post.category}
                                variant="horizontal"
                            />

                            <BlogCardMeta
                                author={post.author}
                                readTime={post.readTime}
                                publishedAt={post.publishedAt}
                                variant="compact"
                                className="mt-3"
                            />
                        </div>
                    </div>
                </Link>
            </article>
        );
    }

    // Default card variant
    return (
        <article className={`group ${className}`}>
            <Link href={`/blog/${post.slug}`}>
                <div className="card card-hover overflow-hidden">
                    <BlogCardImage
                        src={post.coverImage}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="p-6">
                        <BlogCardContent
                            title={post.title}
                            excerpt={post.excerpt}
                            tags={post.tags}
                            category={post.category}
                        />

                        <BlogCardMeta
                            author={post.author}
                            readTime={post.readTime}
                            publishedAt={post.publishedAt}
                            className="mt-4"
                        />
                    </div>
                </div>
            </Link>
        </article>
    );
};