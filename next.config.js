/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "image.tmdb.org",
      "iagegbsesviabfojrneb.supabase.co",
      "iagegbsesviabfojrneb.supabase.in",
    ],
  },
};

module.exports = nextConfig;
