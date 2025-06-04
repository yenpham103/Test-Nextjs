import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
    items: T[];
    itemsPerPage: number;
}

interface UseInfiniteScrollReturn<T> {
    displayedItems: T[];
    hasMore: boolean;
    loadMore: () => void;
    loading: boolean;
    reset: () => void;
}

export function useInfiniteScroll<T>({
    items,
    itemsPerPage
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
    const [displayedItems, setDisplayedItems] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const hasMore = displayedItems.length < items.length;

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);

        setTimeout(() => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const newItems = items.slice(startIndex, endIndex);

            setDisplayedItems(prev => [...prev, ...newItems]);
            setCurrentPage(prev => prev + 1);
            setLoading(false);
        }, 150);
    }, [items, itemsPerPage, currentPage, loading, hasMore]);

    const reset = useCallback(() => {
        setDisplayedItems([]);
        setCurrentPage(1);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (items.length > 0 && displayedItems.length === 0) {
            const initialItems = items.slice(0, itemsPerPage);
            setDisplayedItems(initialItems);
            setCurrentPage(2);
        }
    }, [items, itemsPerPage, displayedItems.length]);

    useEffect(() => {
        reset();
    }, [items, reset]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (
                        window.innerHeight + document.documentElement.scrollTop
                        >= document.documentElement.offsetHeight - 1000
                    ) {
                        loadMore();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        if (hasMore && !loading) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [hasMore, loading, loadMore]);

    return {
        displayedItems,
        hasMore,
        loadMore,
        loading,
        reset
    };
}