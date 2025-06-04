import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import { Search, Grid, List } from 'lucide-react';
import { BlogPostWithSlug } from '@/types/blog';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { LoadingCard } from '@/components/Loading';
import Pagination from '@/components/Pagination';
import { fetchBlogPosts, transformBlogPost } from '@/lib/blog';
import Image from 'next/image';

interface BlogIndexProps {
    posts: BlogPostWithSlug[];
}

const POSTS_PER_PAGE = 3;

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [usePagination, setUsePagination] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) return posts;

        return posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, endIndex);
    }, [filteredPosts, currentPage]);

    const {
        displayedItems: infiniteScrollPosts,
        hasMore,
        loadMore,
        loading: infiniteLoading,
    } = useInfiniteScroll({
        items: filteredPosts,
        itemsPerPage: POSTS_PER_PAGE,
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const displayPosts = usePagination ? paginatedPosts : infiniteScrollPosts;

    return (
        <Layout>
            <SEO
                title="Blog - Xipat Blog"
                description="Khám phá tất cả bài viết về công nghệ, cuộc sống và những chủ đề thú vị khác. Cập nhật liên tục với nội dung chất lượng cao."
            />

            <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
                <div className="container-custom bg-primary-100 rounded-full flex gap-12 items-center justify-center mx-auto mb-4">
                    <div className='rounded-full overflow-hidden object-cover pointer-events-none'>
                        <Image src="https://xprofile.vn/_next/image?url=https%3A%2F%2Fhe44r2a3tgobj.vcdn.cloud%2Fp%2FAvatar%2F0b180660-4ee5-46dc-82d6-f25af7598991.webp&w=256&q=100" alt="Xipat Blog" width={200} height={200} />
                    </div>
                    <div className="text-start text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Tất cả bài viết
                        </h1>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            Khám phá {posts.length} bài viết chất lượng cao về nhiều chủ đề thú vị
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                    {usePagination ? 'Phân trang' : 'Cuộn vô hạn'}:
                                </span>
                                <button
                                    onClick={() => setUsePagination(!usePagination)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${usePagination ? 'bg-pink-300' : 'bg-blue-500'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${usePagination ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        {!usePagination && hasMore && (
                            <span className="text-primary-600 ml-1">Cuộn xuống để tải thêm bài viết</span>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    {displayPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                {searchQuery ? 'Không tìm thấy bài viết nào.' : 'Chưa có bài viết nào.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={`${viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                                : 'space-y-6'
                                }`}>
                                {displayPosts.map((post, index) => (
                                    <BlogCard key={`post-${post.id}-${index}`} post={post} />
                                ))}
                            </div>

                            {!usePagination && infiniteLoading && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <LoadingCard key={index} />
                                    ))}
                                </div>
                            )}

                            {!usePagination && hasMore && !infiniteLoading && (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={loadMore}
                                        className="btn btn-primary px-8 py-3"
                                    >
                                        Tải thêm bài viết ({filteredPosts.length - displayPosts.length} còn lại)
                                    </button>
                                </div>
                            )}

                            {usePagination && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
    try {
        const posts = await fetchBlogPosts();
        const transformedPosts = posts.map(transformBlogPost);

        return {
            props: {
                posts: transformedPosts,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            props: {
                posts: [],
            },
            revalidate: 60,
        };
    }
};

export default BlogIndex;