import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { BlogPostWithSlug } from '../types/blog';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import BlogCard from '../components/BlogCard';
import { fetchBlogPosts, transformBlogPost } from '../lib/blog';
import Image from 'next/image';



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
              <div className="bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="https://xprofile.vn/_next/image?url=https%3A%2F%2Fhe44r2a3tgobj.vcdn.cloud%2Fp%2FImage%2F91b37322-a23b-40a2-b5ab-d46b4bc35a08.png&w=256&q=75" alt="Trending" width={120} height={120} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Buổi sáng</h3>
              <p className="text-gray-600">
                Các phòng ban warm-up, cùng nhau trao đổi công việc trong ngày và bắt đầu làm việc đến trưa
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className=" bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="https://xprofile.vn/_next/image?url=https%3A%2F%2Fhe44r2a3tgobj.vcdn.cloud%2Fp%2FImage%2Fe621ec29-05fc-49c7-b3ab-d078b005c816.png&w=256&q=75" alt="Trending" width={120} height={120} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Buổi trưa</h3>
              <p className="text-gray-600">
                Ăn uống, nghỉ ngơi nạp lại năng lượng chuẩn bị bắt đầu làm việc lại vào buổi chiều
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="https://xprofile.vn/_next/image?url=https%3A%2F%2Fhe44r2a3tgobj.vcdn.cloud%2Fp%2FImage%2F652a8e60-e032-4579-9614-156b72812fed.png&w=256&q=75" alt="Trending" width={120} height={120} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Buổi chiều</h3>
              <p className="text-gray-600">
                Tan làm, có thể tụ tập đi ăn uống cùng nhau
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