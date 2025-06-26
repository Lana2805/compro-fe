  import type { NextConfig } from "next";

<<<<<<< HEAD
  const nextConfig: NextConfig = {
    /* config options here */
    images: {
      domains: ['http://127.0.0.1:8000'],
    },
  };
=======
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**', // karena gambarnya di public/storage
      },
    ],
  },
};
>>>>>>> DaffaMalik12/daffadev

  export default nextConfig;
