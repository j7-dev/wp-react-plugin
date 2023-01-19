import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('my-app') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
