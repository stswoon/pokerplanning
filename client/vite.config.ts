import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    build: {
        sourcemap: true
    },
    server: {
        port: 5000,
        proxy: {
            '/health': 'http://localhost:3000',
            '/api/roomState': {target: 'ws://localhost:3000', ws: true}
        }
    },
    //assetsInclude:['**/*.jpg', '**/*.png'],
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
