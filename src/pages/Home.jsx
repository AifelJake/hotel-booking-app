import React from 'react'
import { Carousel } from "@material-tailwind/react";

// PICTURES IMPORTED
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

    const images = [
        { name: roomOne },
        { name: roomTwo },
        { name: roomThree },
        { name: roomFour },
        { name: roomFive },
    ]



    return (
        <>

            <div className='mt-12 '>
                <div className=' h-[90vh] w-[100%] text-white ' style={{
                    backgroundImage: `url(${bgHotel})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }} alt="" >

                    <div className='md:pl-[10%] md:pt-[8%] pl-[30%] pt-[60%]  md:text-[5em] text-[2.5em] welcome'>
                        <p className='md:w-[4.7em] w-[5.5em] border-t-[2.5px] border-r-[2.5px] font-bold pt-3'><span className='md:text-[1.5em] text-[1.7em]'>W</span>elcome</p>
                    </div>
                    <div className='md:ml-[7%] md:mt-[-9%] ml-[15%] mt-[-15%] md:text-[5em] text-[2.5em] welcome'>
                        <p className='md:w-[4.7em] w-[5.5em] pl-2 border-b-[2.5px] border-l-[2.5px] font-bold pt-8'><span className='md:text-[1.5em] text-[1.7em]'>A</span>wesome</p>
                    </div>

                    <div className='bg-white w-[120px] md:ml-[24%] ml-[40.5%] flex justify-center items-center '>
                        <div className='flex items-center'>
                            <p className=' w-[100%] items-center text-black h-[30px] text-l'>Book Now!</p>
                        </div>
                    </div>
                </div>

                <div className='pt-7  '>
                    <div className='text-center sticky top-0'>
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


                {/* images  */}
                <div className='md:flex md:justify-center pt-10 hidden sm:flex'>
                    <div>
                        <img className='h-[90%] md:w-[270px] pt-[50%]' src={roomOne} alt="" />
                        <p className='text-center font-semibold font-scheherazade'>White Elegant Room</p>
                    </div>
                    <div>
                        <img className='h-[90%] md:w-[270px] pb-[50%]' src={roomTwo} alt="" />
                        <p className='text-center mt-[-50%] font-semibold font-scheherazade'>Gold Stylish Room</p>
                    </div>
                    <div>
                        <img className='h-[90%] md:w-[270px] pt-[50%]' src={roomThree} alt="" />
                        <p className='text-center font-semibold font-scheherazade'>Sky High Room</p>
                    </div>
                    <div>
                        <img className='h-[90%] md:w-[270px] pb-[50%]' src={roomFour} alt="" />
                        <p className='text-center mt-[-50%] font-semibold font-scheherazade'>Cozy Room</p>
                    </div>
                    <div>
                        <img className='h-[90%] md:w-[270px] pt-[50%]' src={roomFive} alt="" />
                        <p className='text-center font-semibold font-scheherazade'>White Elegant Room</p>
                    </div>
                </div>



                {/* IMAGES SECTION
                <div className='md:flex hidden md:justify-evenly pt-[20px] mx-5'>
                    {
                        images.map((image, index) => (
                            <div
                                key={index}>
                                <img src={image.name} className='h-[110%] md:w-[220px] w-[100%]' alt="" />
                            </div>
                        ))
                    }
                </div> */}

                <div className='pt-[20px] mx-5 md:hidden'>
                    <div>
                        <Carousel>
                            {images.map((image, index) => (
                                <img
                                    key={index + 1}
                                    src={image.name}
                                    alt={`Room ${index + 1}`}
                                    className="max-h-[300px] w-[100%] object-cover"
                                />
                            ))}
                        </Carousel>
                    </div>
                </div>






                <div className='flex justify-center text-center pt-4  text-white'>
                    <p className='bg-[#A67B5B] w-[150px] h-[30px] rounded-xl flex items-center justify-center see-all- btn italic  '>SEE ALL ROOMS</p>
                </div>

                <div className='md:flex md:pt-[30px] md:px-[70px] px-3'>
                    <div className='flex items-center md:w-[90%] w-[100%] md:h-[80vh] h-[40vh] justify-center py-10'>
                        <div className='w-[100%] h-[100%] flex items-center border shadow-xl '>
                            <img src={hotelDining} className='p-[20px] h-[100%]' alt="" />
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        <div className='text-center  md:px-[60px] px-[20px]'>
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

                {/* RESTAURANT, PASTRY, LIQUOR section */}
                <div className='md:flex md:justify-center md:items-center pt-10'>
                    <div className='flex justify-center m-flex-col md:w-[30%] w-[100%]'>
                        <div className='md:h-[70vh] h-[40vh]  md:w-[100%] w-[70%] flex text-white items-end justify-end restaurant-bg'
                            style={{
                                backgroundImage: `url(${restaurant})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}>
                            <p className='restau-txt mr-20 mb-5 text-2xl italic'>RESTAURANT</p>
                        </div>
                    </div>
                    <div className='flex justify-center m-flex-col md:w-[30%] w-[100%]'>
                        <div className='md:h-[70vh] h-[40vh]  md:w-[100%] w-[70%] flex items-end justify-end pastry-bg'
                            style={{
                                backgroundImage: `url(${pastry})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}>
                            <p className='restau-txt mr-20 mb-5 text-2xl italic'>LOBBY CAFE</p>
                        </div>
                    </div>
                    <div className='flex justify-center m-flex-col md:w-[30%] w-[100%]'>
                        <div className='md:h-[70vh] h-[40vh] md:w-[100%] w-[70%] text-white flex items-end justify-end liquor-bg'
                            style={{
                                backgroundImage: `url(${liquor})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}>
                            <p className='restau-txt mr-10 mb-5 text-2xl italic'>SPORTS BAR</p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .restaurant-bg:hover,
                    .pastry-bg:hover,
                    .liquor-bg:hover {
                        background-color: black;
                        opacity: 0.6; /* Adjust opacity as desired */
                        transition: opacity 0.3s ease; /* Add transition for smoothness */
                    }
                `}</style>




            </div>



        </>
    )
}

export default Home