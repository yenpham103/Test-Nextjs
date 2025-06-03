import React from 'react';

interface LoadingProps {
    text?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({
    text = 'Đang tải...',
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className={`${sizeClasses[size]} animate-spin`}>
                <div className="h-full w-full border-4 border-gray-200 border-t-primary-600 rounded-full"></div>
            </div>
            {text && (
                <p className="mt-4 text-gray-600 text-center">{text}</p>
            )}
        </div>
    );
};

export const LoadingCard: React.FC = () => {
    return (
        <div className="card p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-3">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default Loading;