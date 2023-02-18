import React from 'react'
import {
	Outlet,
	ReactLocation,
	Router,
} from '@tanstack/react-location'
import { defaultRouters } from '@/Router'
import CustomLayouts from '@/components/CustomLayouts'
import { ConfigProvider } from 'antd'
import 'global.css'



// Set up a ReactLocation instance
const location = new ReactLocation()
console.log('location', location)

function App() {
	return (
		<Router
			location={location}
			routes={defaultRouters}
		>
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
				<CustomLayouts>
					<Outlet /> {/* Start rendering router matches */}
				</CustomLayouts>
			</ConfigProvider>
		</Router>
	)
}

export default App
