export interface BlogPost {
    id: number;
    title: string;
    body: string;
    userId: number;
    slug: string;
    excerpt: string;
    readTime: number;
    publishedAt: string;
    author: Author;
    category: string;
    tags: string[];
    coverImage: string;
    views?: number;
    likes?: number;
}

export interface Author {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    email?: string;
    social?: SocialLinks;
}

export interface SocialLinks {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    postCount: number;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    postCount: number;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    perPage: number;
}

export interface SearchFilters {
    query?: string;
    category?: string;
    tags?: string[];
    author?: string;
    dateRange?: {
        from: string;
        to: string;
    };
}

export interface ApiResponse<T> {
    data: T;
    meta?: {
        pagination?: PaginationInfo;
        filters?: SearchFilters;
    };
    success: boolean;
    message?: string;
}

export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export interface BlogCardProps extends BaseComponentProps {
    post: BlogPost;
    featured?: boolean;
    variant?: 'default' | 'horizontal' | 'minimal';
}

export interface PaginationProps extends BaseComponentProps {
    pagination: PaginationInfo;
    basePath?: string;
    onPageChange?: (page: number) => void;
}

export interface LayoutProps extends BaseComponentProps {
    title?: string;
    description?: string;
    ogImage?: string;
    noIndex?: boolean;
}