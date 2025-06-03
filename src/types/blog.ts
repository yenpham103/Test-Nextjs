export interface BlogPost {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface BlogPostWithSlug extends BlogPost {
    slug: string;
    excerpt: string;
    readTime: string;
    createdAt: string;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface BlogCardProps {
    post: BlogPostWithSlug;
}

export interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
}