/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    SHEET_PRIVATE_KEY: process.env.SHEET_PRIVATE_KEY
  },
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com']
  },
  webpack: (config, options) => {
    // Configura o @svgr como um loader para imagens SVG usando o hook para o Webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = nextConfig
