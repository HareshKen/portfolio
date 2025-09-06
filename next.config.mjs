/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    experimental: {
        // Caching all page.jsx files on the client for 5 minutes.
        // Resulting in immediate navigation and no loading time.
        staleTimes: {
            dynamic: 300,
            static: 300
        }
    },
    env: {
        /** GitHub username loaded from static data instead of API */
        GITHUB_USERNAME: 'HareshKen', // Set directly from your data
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.githubusercontent.com' },
            { protocol: 'https', hostname: '**.github.com' },
            { protocol: 'https', hostname: '**.vercel.app' },
            { protocol: 'https', hostname: '**.netlify.app' },
            { protocol: 'https', hostname: '**.herokuapp.com' },
            // Add your own domain if you're hosting images
            { protocol: 'https', hostname: 'your-domain.com' },
            // For local development
            { protocol: 'http', hostname: 'localhost' },
        ],
    },
    // Optional: Add any other configurations you need
    compress: true,
    poweredByHeader: false,
    // If you want to optimize for static export
    // output: 'export',
    // trailingSlash: true,
};

export default nextConfig;