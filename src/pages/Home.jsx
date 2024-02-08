import React from 'react'
import Navbar from '../components/Navbar'
import bgHotel from "../assets/img/ff.webp"
const Home = () => {
    return (
        <>
            <Navbar />
            <div className='h-[70vh]'>
                <div className=' h-[90vh] w-[100%] ' style={{ 
            backgroundImage: `url(${bgHotel})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}alt="" >
                </div>

            </div>
        </>
    )
}

export default Home