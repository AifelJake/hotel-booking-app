import React from 'react'
import Navbar from '../components/Navbar'
import bgHotel from "../assets/img/oo.jpg"
import roomOne from "../assets/img/room1.jpg"
import roomTwo from "../assets/img/room2.jpg"
import roomThree from "../assets/img/room3.webp"
import roomFour from "../assets/img/room4.jpeg"
import roomFive from "../assets/img/room5.jpg"
import hotelDining from "../assets/img/hotelDining.jpg"
import restaurant from "../assets/img/restaurant.jpg"
import pastry from "../assets/img/pastry.png"
import liquor from "../assets/img/liquor.jpg"
import spoon from "../assets/img/spoon.png"

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

                    <div className='bg-white w-[120px] ml-[24%] flex justify-center items-center '>
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
                        <p className='w-[80%] text-[1.1em] intro-description'>A total of 113 cozy rooms with a spacious balcony, a view of infinity pool, and sea view that can absolutely make for a memorable, enjoyable and awesome stay. Each room exudes not only with the hotel’s gleaming aesthetic but also the modern comforts of a luxury hotel & resort. Awesome Hotel can ensure esteemed guests that they will undoubtedly feel relaxed and pampered throughout their stay. These amenities also help to create a luxurious atmosphere, which can make guests feel like they are truly on a special and memorable vacation.</p>
                    </div>
                </div>

                <div className='flex justify-evenly pt-[20px] mx-5'>
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

                <div className='flex pt-[30px] px-[70px]'>
                    <div className='flex items-center w-[90%] h-[80vh] justify-center py-10'>
                        <div className='w-[100%] h-[100%] flex items-center border shadow-xl '>
                            <img src={hotelDining} className='p-[20px] h-[100%]' alt="" />
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        <div className='text-center  px-[60px]'>
                            <h2 className='text-2xl font-bold'>HOTEL DINING</h2>
                            <div className='flex justify-center py-2'>
                                <div className='w-[70px] border-2 border-gold-200 border-t-[#FFD700] h-1'>

                                </div>
                            </div>

                            <p className="dining-des text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sapien eget quam lobortis congue quis non nisi. Maecenas nec semper magna.
                            </p>

                            <p className="dining-des pt-2 text-center">Nam non purus placerat, lacinia lorem vel, vehicula massa. Nunc hendrerit pretium nisi quis gravida. Praesent ornare dictum est. Integer porta commodo ligula vel tempor. Donec at sapien ut mauris hendrerit blandit.
                            </p>

                        </div>
                    </div>
                </div>

                {/* RESTAURANT, PASTRY, LIQOUR section */}
                <div className='flex justify-center items-center pt-10'>
                    <div className='h-[70vh] w-[30%] flex text-white items-end justify-end' style={{
                        backgroundImage: `url(${restaurant})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}>
                        {/* <img src={spoon} alt="" /> */}
                        <p className='restau-txt mr-20 mb-5 text-2xl italic'>RESTAURANT </p>

                    </div>
                    <div className='h-[70vh] w-[30%]     flex items-end justify-end' style={{
                        backgroundImage: `url(${pastry})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}>
                        <p className='restau-txt mr-20 mb-5 text-2xl italic'>LOBBY CAFE</p>
                    </div>
                    <div className='h-[70vh] w-[30%] text-white flex items-end justify-end' style={{
                        backgroundImage: `url(${liquor})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}>
                        <p className='restau-txt mr-10 mb-5 text-2xl italic'>SPORTS BAR</p>
                    </div>
                </div>


                {/* FOOTER */}

                <footer class="bg-black mt-12 dark:bg-gray-900">
                    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                        <div class="md:flex md:justify-between">
                            <div class="mb-6 md:mb-0 flex justify-center items-center">
                                <div className='text-white  text-center'>
                                    <span class="self-center text-5xl font-semibold whitespace-nowrap text-white dark:text-white">AWH</span>
                                    <p>Come and create memories with us.</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                                <div>
                                    <h2 class="mb-6 text-sm font-semibold uppercase text-white dark:text-white">Resources</h2>
                                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                        <li class="mb-4">
                                            <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                                        </li>
                                        <li>
                                            <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 class="mb-6 text-sm font-semibold uppercase text-white dark:text-white">Follow us</h2>
                                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                        <li class="mb-4">
                                            <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                                        </li>
                                        <li>
                                            <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 class="mb-6 text-sm font-semibold uppercase text-white dark:text-white">Legal</h2>
                                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                        <li class="mb-4">
                                            <a href="#" class="hover:underline">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        
                    </div>
                </footer>



            </div>



        </>
    )
}

export default Home