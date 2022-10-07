import create_config from '@kucrut/vite-for-wp';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default create_config('js/src/main.jsx', 'js/dist', {
	plugins: [react()],
});
