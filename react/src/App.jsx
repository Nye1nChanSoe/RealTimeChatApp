import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container mx-auto max-w-lg p-2 text-center bg-rose-200'>
      Hello World!
    </div>
  );
}

export default App
