import React from 'react'
import Navbar from '../components/Navbar'
import bgHotel from "../assets/img/oo.jpg"
import roomOne from "../assets/img/room1.jpg"
import roomTwo from "../assets/img/room2.jpg"
import roomThree from "../assets/img/room3.webp"
import roomFour from "../assets/img/room4.jpeg"
import roomFive from "../assets/img/room5.jpg"

const Home = () => {
    return (
        <>
            <Navbar />
            <div className=''>
                <div className=' h-[90vh] w-[100%] text-white' style={{
                    backgroundImage: `url(${bgHotel})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }} alt="" >

                    <div className='pl-[10%] pt-[8%]  text-[5em] welcome'>
                        <p className='w-[4.7em] border-t-[2.5px] border-r-[2.5px] font-bold pt-3'><span className='text-[1.5em]'>W</span>elcome</p>
                    </div>
                    <div className='ml-[7%]  mt-[-9%] text-[5em] welcome'>
                        <p className='w-[4.7em] pl-2 border-b-[2.5px] border-l-[2.5px] font-bold pt-8'><span className='text-[1.5em]'>A</span>wesome</p>
                    </div>

                    <div className='bg-white w-[120px] ml-[25.5%] flex justify-center items-center '>
                        <div className='flex items-center'>
                            <p className=' w-[100%] items-center text-black h-[30px] text-l'>Book Now!</p>
                        </div>
                    </div>
                </div>

                <div className='pt-7'>
                    <div className='text-center'>
                        <p className='text-[1.4em] font-bold'>MODERN STYLISH ROOMS</p>
                    </div>
                    <div className='flex justify-center py-2'>
                        <div className='w-[70px] border-2 border-gold-200 border-t-[#FFD700] h-1'>

                        </div>
                    </div>
                    <div className='flex justify-center text-center'>
                        <p className='w-[80%] text-[1.2em] intro-description'>A total of 113 cozy rooms with a spacious balcony, a view of infinity pool, and sea view that can absolutely make for a memorable, enjoyable and awesome stay. Each room exudes not only with the hotel’s gleaming aesthetic but also the modern comforts of a luxury hotel & resort. Awesome Hotel can ensure esteemed guests that they will undoubtedly feel relaxed and pampered throughout their stay. These amenities also help to create a luxurious atmosphere, which can make guests feel like they are truly on a special and memorable vacation.</p>
                    </div>
                </div>

                <div className='flex justify-evenly pt-[100px] mx-5'>
                    <div>
                        <img src={roomOne} className='h-[110%]' width="220" alt="" />
                    </div>
                    <div>
                        <img src={roomTwo} className='h-[110%]' width="220" alt="" />
                    </div>
                    <div><img src={roomThree} className='h-[110%]' width="220" alt="" /></div>
                    <div>
                        <img src={roomFour} className='h-[110%]' width="220" alt="" />
                    </div>
                    <div>
                        <img src={roomFive} className='h-[110%]' width="220" alt="" />
                    </div>
                </div>

                <div className='flex justify-center text-center pt-10  text-white'>
                    <p className='bg-black w-[150px] h-[30px] rounded-xl flex items-center justify-center see-all- btn italic  '>SEE ALL ROOMS</p>
                </div>
            </div>



        </>
    )
}

export default Home