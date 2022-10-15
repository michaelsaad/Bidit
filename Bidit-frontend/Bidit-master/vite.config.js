import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    VitePWA({
      includeAssets: [
        '/images/pwa/favicon.ico',
        '/images/pwa/apple-touch-icon.png',
        '/images/pwa/pwa-192x192.png',
        '/images/pwa/pwa-512x512.png',
        '/public/images/flags/eg.svg',
        '/public/images/flags/us.svg',
        '/public/images/avatar.png',
      ],
      manifest: {
        name: 'Bidit',
        short_name: 'Bidit',
        start_url: '/',
        theme_color: '#6E3DD6',
        background_color: '#EEF0F1',
        description: 'Bidit - Online Auction PLatform 🔥',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/images/pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/images/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
