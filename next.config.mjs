// @ts-check

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        port: '',
        pathname: '/cdn/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'ddragon.leagueoflegends.com',
      //   port: '',
      //   pathname: '/cdn/14.19.1/img/champion/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ddragon.leagueoflegends.com',
      //   port: '',
      //   pathname: '/cdn/14.19.1/img/item/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ddragon.leagueoflegends.com',
      //   port: '',
      //   pathname: '/cdn/14.19.1/img/spell/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ddragon.leagueoflegends.com',
      //   port: '',
      //   pathname: '/cdn/img/perk-images/**',
      // },
    ],
  },
};

export default nextConfig;
