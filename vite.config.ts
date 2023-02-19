import create_config from '@kucrut/vite-for-wp';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default create_config('js/src/main.tsx', 'js/dist', {
	plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': {
      BASE_URL: "/home/carbon-check-app",
      RENDER_ID: 'carbon-check-app',
      API_URL: 'http://carbon.local/wp-json',
      API_TIMEOUT: '30000',
    },
  }
});
