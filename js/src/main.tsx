import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  RouterProvider,
} from "react-router-dom";
import { defaultRouters } from '@/Router'

const renderId = process.env.RENDER_ID || 'my-app';


ReactDOM.createRoot(document.getElementById(renderId) as HTMLElement).render(
	<React.StrictMode>
    <RouterProvider router={defaultRouters}>
		  <App />
    </RouterProvider>
	</React.StrictMode>,
);
