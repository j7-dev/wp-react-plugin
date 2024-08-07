import { useState } from 'react'
import reactLogo from '../assets/images/react.svg'
import viteLogo from '../assets/images/vite.svg'
import wpLogo from '../assets/images/wp.png'
import GetRestPostsPage from './GetRestPosts'

function DefaultPage() {
	const [
		count,
		setCount,
	] = useState(0)
	const [
		showRestPosts,
		setShowRestPosts,
	] = useState(false)

	return (
		<div className="App py-20">
			<div className="flex justify-center">
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer noopener">
					<img src={reactLogo} className="logo" alt="React logo" />
				</a>
				<a
					href="https://wordpress.org"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={wpLogo} className="logo" alt="WordPress logo" />
				</a>
			</div>
			<h1>Vite + React + WordPress</h1>
			<div className="flex justify-center mb-8">
				<button
					type="button"
					onClick={() => setCount((theCount) => theCount + 1)}
				>
					Count is {count}
				</button>

				<button type="button" onClick={() => setShowRestPosts(!showRestPosts)}>
					Get Posts Example by REST API
				</button>
			</div>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
			<p className="read-the-docs">
				Click on the Vite, React and WordPress logos to learn more
			</p>

			{showRestPosts && <GetRestPostsPage />}
		</div>
	)
}

export default DefaultPage
