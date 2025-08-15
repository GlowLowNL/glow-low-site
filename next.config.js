/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'cdn.shopify.com',
      'static.zara.net',
      'media.douglas.de',
      'media.douglas.nl',
      'media.sephora.com',
      'lookfantastic.com',
      'www.iciparisxl.nl',
      // extra retailers / examples
      'www.beautycorner.example',
      'www.parfumdeals.example',
      'www.luxeparfum.example',
      'www.mannengeur.example'
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig
