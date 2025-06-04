import { BlogPost, BlogPostWithSlug } from "../types/blog";

export const createSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

export const createExcerpt = (body: string, length: number = 150): string => {
    return body.length > length ? body.substring(0, length) + '...' : body;
};

export const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} phút đọc`;
};

export const generateRandomDate = (): string => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const transformBlogPost = (post: BlogPost): BlogPostWithSlug => {
    const slug = createSlug(post.title);
    const excerpt = createExcerpt(post.body);
    const readTime = calculateReadTime(post.body);
    const createdAt = generateRandomDate();

    return {
        ...post,
        slug,
        excerpt,
        readTime,
        createdAt
    };
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const originalPosts = await response.json();

        const duplicatedPosts = [];
        for (let i = 0; i < 5; i++) {
            const batch = originalPosts.map((post: BlogPost) => ({
                ...post,
                id: post.id + (i * 100),
                title: `${post.title} (Batch ${i + 1})`,
            }));
            duplicatedPosts.push(...batch);
        }

        return duplicatedPosts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

export const findPostBySlug = (posts: BlogPostWithSlug[], slug: string): BlogPostWithSlug | undefined => {
    return posts.find(post => post.slug === slug);
};