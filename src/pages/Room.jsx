import React, { useState } from 'react';

import roomOne from "../assets/img/room1.jpg"
import roomTwo from "../assets/img/room2.jpg"
import roomThree from "../assets/img/room3.webp"
import roomFour from "../assets/img/room4.jpeg"
import roomFive from "../assets/img/room5.jpg"
import bed from "../assets/img/bed.png"
import person from "../assets/img/person.png"
import bathroom from "../assets/img/bathroom.png"

const Room = () => {

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className='px-[15%] flex mt-9 gap-3'>

            {/* ROOM DETAILs */}
            <div className='w-[70%] border p-2 shadow-xl flex'>
                <div className='w-30%'>
                    <img src={roomOne} className='h-[220px] w-[220px]' alt="" />
                </div>

                <div className='ml-5 w-[70%] py-3 px-2 space-y-2 ' >

                    <p className='text-2xl font-bold'>WHITE ELEGANT ROOM</p>

                    {/* LOGOs */}
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <img src={person} className='h-[18px]' alt="person logo" />
                            <p>3 sleeps</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src={bed} className='h-[20px]' alt="bed logo" />
                            <p>1 King Bed</p>
                        </div>
                        <div className='flex'>
                            <img src={bathroom} className='h-[20px]' alt="bath tub" />
                            <p>1 bathroom</p>
                        </div>
                    </div>

                    {/* show more */}
                    <p>36m²• City view• Internet Access• Cable/Satellite TV• Room Service• Shower over bath• Air conditioned• Linen and Towels Provided• Bathrobes Provided</p>
                    {!showMore && (
                        <button className='italic underline' onClick={toggleShowMore}>
                            See More
                        </button>
                    )}

                    {
                        showMore && (
                            <>
                                <div onClick={toggleShowMore}>
                                    <p>Rooms located at 10/F - 29/F</p>
                                    <p>Smoking / Non-Smoking Room Option</p>
                                    <p>Hotel's Top Amenities</p>
                                    <p>Roofdeck Pool</p>
                                    <p className='pb-2'>High Speed WiFi</p>
                                    {showMore && (
                                        <button className='italic underline' onClick={toggleShowMore}>
                                            See Less
                                        </button>
                                    )}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            {/* BOOKED/RESERVATION SECTION */}
            <div className='w-[30%] h-[200px] flex justify-center items-center text-center border-red-gray border-2 p-4'>
                <div className='pt-2  space-y-2'>
                    <p>January 05, 2024 - January 06, 2024 </p>
                    <p>1 Room, 2 guests</p>
                    <hr />

                    <p>SELECT A ROOM TO BOOK</p>
                    <div className='mt-6'>
                        <button className='bg-black text-white font-bold w-[100%] rounded-md py-2'>
                            BOOK NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room