import React from 'react'


const Navbar = () => {
  return (
    <div className='flex w-[100%] items-center h-12 border'>
        <div className='w-[10%] flex justify-center text-xl font-bold'>AWH</div>
        <div className='list-none flex w-[80%] justify-center gap-3'>
            <li>Home</li>
            <li>Rooms</li>
            <li>Activities</li>
            <li>Booking</li>
            <li>Login</li>
        </div>
        <div className='w-[10%] flex justify-center  text-white '>
            <p className='rounded-xl bg-black px-4'>Book Now!</p>
        </div>
    </div>
  )
}

export default Navbar