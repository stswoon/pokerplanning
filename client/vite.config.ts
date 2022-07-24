import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import globalPackageJson from './../package.json';
import dns from 'dns'

// https://vitejs.dev/config/
dns.setDefaultResultOrder && dns.setDefaultResultOrder('verbatim'); //check for old node
export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      '/health': 'http://localhost:3000',
      '/api/roomState': { target: 'ws://localhost:3000', ws: true }
    }
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      // entry: 'src/main.ts',
      template: 'src/index.html',
      inject: {
        data: {
          VERSION: globalPackageJson.version
        }
      }
    })
  ]
})
