import { useState } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Activities from './pages/Activities';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/ProductForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Room />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/add' element={<ProductForm/>} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
