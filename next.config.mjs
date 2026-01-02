/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "minio.nutech-integrasi.com",
    },
    {
      protocol: "https",
      hostname: "nutech-integrasi.app",
    },
  ],
},
};

export default nextConfig;
