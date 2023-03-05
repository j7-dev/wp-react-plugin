import create_config from '@kucrut/vite-for-wp'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default create_config('js/src/main.tsx', 'js/dist', {
  plugins: [
    react(),
    tsconfigPaths(),
  ],
})
