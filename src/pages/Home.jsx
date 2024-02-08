import React from 'react'
import Navbar from '../components/Navbar'
import bgHotel from "../assets/img/oo.jpg"
const Home = () => {
    return (
        <>
            <Navbar />
            <div className='h-[70vh]'>
                <div className=' h-[90vh] w-[100%] text-white' style={{
                    backgroundImage: `url(${bgHotel})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }} alt="" >

                    <div className='pl-[10%] pt-[6%]  text-[5em] welcome'>
                        <p className='w-[4.7em] border-t-4 border-r-4 font-bold pt-4'><span className='text-[1.5em]'>W</span>elcome</p>
                    </div>
                    <div className='ml-[7%]  mt-[-7%] text-[5em] welcome'>
                        <p className='w-[4.7em] pl-2 border-b-4 border-l-4 font-bold pt-8'><span className='text-[1.5em]'>A</span>wesome</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home