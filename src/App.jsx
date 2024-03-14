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
import Login from './pages/Login';
import { UserProvider } from "./UserContext"
import Register from './pages/Register';

function App() {
  const [count, setCount] = useState(0);

  const [user, setUser] = useState({
    id: localStorage.getItem("id"),
    isAdmin: null,
    email: null,
    token: localStorage.getItem("token")
})

const unsetUser = () => {
  localStorage.clear();
}


  return (

    <BrowserRouter>
    <UserProvider value={{user, setUser, unsetUser}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Room />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/add' element={<ProductForm/>} />
      </Routes>
      {/* <Footer/> */}
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
