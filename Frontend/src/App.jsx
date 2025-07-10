import { useEffect, useState } from 'react'
import './index.css'

function App() {

  return (
    <nav>
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold bg">Task Management</div>
        <div className='flex s items-center space-x-4'>
          <h4>Dont have an Account?</h4>
          
          <button className="bg-blue-500 p-2 border-1 border-solid border-white ">Sign Up</button>
      
        </div>
      </div>
    </nav>
  )
}

export default App
