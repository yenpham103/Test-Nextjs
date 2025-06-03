import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogCardProps } from '../types/blog';

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <article className="card card-hover p-6 group">
            <div className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </h2>

                <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {post.userId}
                    </div>
                    <span className="text-sm text-gray-600">Tác giả #{post.userId}</span>
                </div>

                <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                >
                    <span>Đọc thêm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;