import create_config from '@kucrut/vite-for-wp'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import alias from '@rollup/plugin-alias'
import path from 'path'

export default create_config('js/src/main.tsx', 'js/dist', {
  plugins: [
    alias(),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'js/src'),
    },
  },
})
