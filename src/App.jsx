import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
