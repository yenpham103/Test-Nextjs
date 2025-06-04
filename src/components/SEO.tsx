import Head from 'next/head';
import { SEOProps } from '../types/blog';

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image = '/blog-og-image.jpg',
    url = process.env.SITE_URL || 'http://localhost:3000'
}) => {
    const siteName = process.env.SITE_NAME || 'Xipat Blog';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta name="robots" content="index, follow" />
            <meta name="author" content={siteName} />
            <link rel="canonical" href={url} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": siteName,
                        "description": description,
                        "url": url
                    })
                }}
            />
        </Head>
    );
};

export default SEO;