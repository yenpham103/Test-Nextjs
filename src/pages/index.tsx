import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import Layout from '../components/Layout';
import { BlogPostWithSlug } from '../types/blog';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import BlogCard from '../components/BlogCard';
import { fetchBlogPosts, transformBlogPost } from '../lib/blog';



interface HomeProps {
  featuredPosts: BlogPostWithSlug[];
  recentPosts: BlogPostWithSlug[];
}

const Home: React.FC<HomeProps> = ({ featuredPosts, recentPosts }) => {
  return (
    <Layout>
      <SEO
        title="Xipat Blog - Khám phá những ý tưởng tuyệt vời"
        description="Tham gia cùng chúng tôi trong hành trình khám phá những bài viết chất lượng cao về công nghệ, cuộc sống và những chủ đề thú vị khác."
      />

      <HeroSection />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bài viết nổi bật
              </h2>
              <p className="text-gray-600">
                Những bài viết được đọc nhiều nhất trong tuần
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Trending</h3>
              <p className="text-gray-600">
                Luôn cập nhật những xu hướng mới nhất trong công nghệ và cuộc sống
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nhanh chóng</h3>
              <p className="text-gray-600">
                Đọc những bài viết ngắn gọn, dễ hiểu trong thời gian ngắn
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Chất lượng</h3>
              <p className="text-gray-600">
                Mọi bài viết đều được tuyển chọn và kiểm duyệt kỹ lưỡng
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bài viết mới nhất
              </h2>
              <p className="text-gray-600">
                Cập nhật những bài viết mới được đăng tải
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn btn-primary">
              Khám phá thêm bài viết
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const posts = await fetchBlogPosts();
    const transformedPosts = posts.map(transformBlogPost);

    const featuredPosts = transformedPosts.slice(0, 6);

    const recentPosts = transformedPosts.slice(6, 12);

    return {
      props: {
        featuredPosts,
        recentPosts,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredPosts: [],
        recentPosts: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;