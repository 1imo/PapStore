import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/admin/',
                '/private/',
            ],
        },
        sitemap: 'https://papstore.co.uk/sitemap.xml',
    }
} 