import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex w-[100%] items-center h-12 border'>
        <div className='w-[10%] flex justify-center text-xl font-bold'>AWH</div>
        <div className='list-none flex w-[80%] justify-center gap-3'>
            <Link to={'/'}>Home</Link>
            <Link to={'/rooms'}>Rooms</Link>
            <Link to={'/activities'}>Activities</Link>
            <Link to={'/booking'}>Booking</Link>
            <Link to={'/login'}>Login</Link>
        </div>
        <div className='w-[10%] flex justify-center  text-white '>
            <p className='rounded-xl bg-black px-4'>Book Now!</p>
        </div>
    </div>
  )
}

export default Navbar
