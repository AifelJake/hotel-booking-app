import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex w-full items-center h-12 border py-7 bg-white fixed top-0 z-10'>
        <div className='w-1/6 flex justify-center text-xl font-bold'>AWH</div>
        <div className='list-none flex w-2/3 text-md justify-center gap-3'>
            <Link to={'/'}>Home</Link>
            <Link to={'/rooms'}>Rooms</Link>
            <Link to={'/activities'}>Activities</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
            <Link to={'/login'}>Login</Link>
        </div>
        <div className='w-1/6 flex justify-center  text-white'>
            <p className='rounded-xl bg-[#A67B5B] py-2 px-6 mr-5'>Book Now!</p>
        </div>
    </div>
  );
};

export default Navbar;
