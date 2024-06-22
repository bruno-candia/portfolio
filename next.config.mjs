import MillionLint from '@million/lint'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
export default MillionLint.next({
  rsc: true,
  filter: {
    include: '**/src/components/**',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.vercel/**',
      '**/.github/**',
      '**/.git/**',
      '**/.vscode/**',
    ],
  },
})(withNextIntl(nextConfig))
