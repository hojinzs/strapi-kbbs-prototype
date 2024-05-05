/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'strapi-kbbs-1-e0536926671a.herokuapp.com',
      },
      {
        protocol: 'https',
        hostname: 'strapi-kbb-prototype.s3.ap-northeast-2.amazonaws.com',
      }
    ]
  }
};
