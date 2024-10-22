/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'images/books', 'avatars.githubusercontent.com'],
  },
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
