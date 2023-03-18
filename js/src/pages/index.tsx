import { useState } from 'react'
import reactLogo from '../assets/images/react.svg'
import viteLogo from '../assets/images/vite.svg'
import wpLogo from '../assets/images/wp.png'

import { Link } from 'react-router-dom'

function DefaultPage() {
  const [
    count,
    setCount,
  ] = useState(0)

  return (
    <div className="App">
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://wordpress.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={wpLogo} className="logo wp" alt="WordPress logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="flex justify-center mb-8">
        <button onClick={() => setCount((theCount) => theCount + 1)}>
          Count is {count}
        </button>
        <Link to="/get-posts">
          <button>Get Posts Example</button>
        </Link>
        <Link to="/get-users">
          <button>Get Users Example</button>
        </Link>
      </div>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite, React and WordPress logos to learn more
      </p>
    </div>
  )
}

export default DefaultPage
