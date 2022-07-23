import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import globalPackageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
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
