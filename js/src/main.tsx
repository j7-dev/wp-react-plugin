import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderId = process.env.RENDER_ID || 'my-app';


ReactDOM.createRoot(document.getElementById(renderId) as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
