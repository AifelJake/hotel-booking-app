import { useState } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Activities from './pages/Activities';
import Dashboard from './pages/Dashboard';
import ProductForm from './components/ProductForm';
import Login from './pages/Login';
import { UserProvider } from "./UserContext"
import Register from './pages/Register';
import ShowRoom from './components/ShowRoom';
import UpdateProduct from './components/UpdateProduct';
import SelectedRooms from './components/SelectedRooms';

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

        {/* testing */}
      <Route path="/update" element={<UpdateProduct />} />
      <Route path="/select" element={<SelectedRooms/>} />


        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/show" element={<ShowRoom />} />
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
