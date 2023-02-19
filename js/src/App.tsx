
import { ConfigProvider } from 'antd'
import 'global.css'
import { RouterProvider } from "react-router-dom";
import { defaultRouters } from "@/Router";


function App() {
	return (
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#54bab9',
						colorLink: '#54bab9',
						colorLinkActive: '#46a8a7',
						colorLinkHover: '#79c7c3',
						colorFillQuaternary: '#fbf8f1', //table
						colorText: '#707070',
					},
				}}
			>
				      <RouterProvider router={defaultRouters} />
			</ConfigProvider>
	)
}

export default App
