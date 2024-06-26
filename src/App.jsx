import { useState } from 'react'
import './App.css'
import Solarsytem from './components/solarSytem'
// import Solarsystem from './components/Solarsystem'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='bg-[#101010]'>
  
   {/* <Solarsystem/> */}
   <Solarsytem/>
   </div>
  )
}

export default App
