import React from 'react'
import { useEffect, useReducer, useState } from 'react';

import down from "../assets/img/down.png";
import up from "../assets/img/up.png";
import bin from "../assets/img/bin.png";

const initialState = {
    showMore: false,
    
    error: null // Changed to null initially
};



function SelectedRooms({checkInDate, checkOutDate, numberOfAdults, numberOfChildren, selectedRooms, calculateStayDuration}) {


    const reducer = (state, action) => {
        switch (action.type) {
            case 'TOGGLE_INCLUSION':
                const roomIdToToggle = action.payload;
                const toggledSelectedRooms = selectedRooms.map(room => {
                    if (room.id === roomIdToToggle) {
                        return { ...room, showInclusion: !room.showInclusion };
                    }
                    return room;
                });
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    

    // converts date into more readable format
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2);
        return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    };

    const formatCheckInOutDates = () => {
        
        const formattedCheckInDate = formatDateString(checkInDate);
        const formattedCheckOutDate = formatDateString(checkOutDate);
        return `${formattedCheckInDate} – ${formattedCheckOutDate}`;
    };

    

    const calculateTotalPrice = () => {
        const prices = selectedRooms.map(room => room.price);

        const totalPrice = prices.reduce((acc, currentValue) => {
            const num = parseFloat(currentValue.replace(',', ''))
            return acc + num
        }, 0);
        return totalPrice;
    };

    const handleRoomInclusionToggle = (roomId) => {
        dispatch({ type: 'TOGGLE_INCLUSION', payload: roomId });
    };

    const bookRoom = async () => {
        try {
         
            if (!checkInDate || !checkOutDate || selectedRooms.length === 0) {
                dispatch({ type: 'SET_ERROR', payload: "Please select check-in and check-out dates and at least one room." });
                return;
            }

            const token = localStorage.getItem("token"); // Retrieve the token from localStorage

            const payload = {
                products: selectedRooms.map(room => ({
                    productId: room.id,
                    productName: room.name,
                    productImage: room.image,
                    price: room.price,
                    numberOfAdults: numberOfAdults,
                    numberOfChildren: numberOfChildren,
                    checkIn: checkInDate,
                    checkOut: checkOutDate
                }))
            };

            const res = await axios.post('http://localhost:4002/order/orders', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);

        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_ERROR', payload: error.message });

        }
    };

    const {error} = state
    const isSingleError = error && !Array.isArray(error);
  return (
    <div className='min-w-[30%]'>
                    <div className='border-2 p-4 min-w-[100%] max-w-[100%] space-y-2'>
                        <div className='space-x-5 flex min-w-[100%] max-w-[100%]'>
                            <div className='flex w-[100%]'>
                                <div className='w-[83%]'>
                                    {
                                        checkInDate && checkOutDate ? (
                                            <>
                                                <p>{formatCheckInOutDates()}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className='text-red-500'>Please choose check-in and check-out dates above</p>
                                            </>
                                        )
                                    }
                                </div>


                                {
                                    checkInDate && checkOutDate && calculateStayDuration() >= 1 ? (
                                        <>
                                            <div className='flex justify-end w-[17%]'>
                                                <p>{calculateStayDuration()} night</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p></p>
                                        </>
                                    )
                                }

                            </div>
                        </div>


                        {/* number of children and adults section */}
                        <div className='flex gap-2'>
                            {
                                numberOfAdults ? (
                                    <>
                                        <p>Adult {numberOfAdults} -</p>
                                        <p>Children {numberOfChildren}</p></>
                                ) : (null)
                            }
                        </div>
                        {isSingleError && <p className="text-red-500 text-center">{error}</p>}

                        <hr />
                        <p className='font-bold text-center'>SELECT A ROOM TO BOOK</p>



                        <div className='flex justify-center '>
                            {/* SECTION AFTER SELECTING A ROOM */}
                            {selectedRooms.length > 0 && (
                                <div className='w-[100%] font-lato '>
                                    <p className='font-bold font-sans text-xl'>PHP {calculateTotalPrice()} total</p>
                                    <div className='flex text-gray-500 gap-2'>

                                    </div>
                                    {selectedRooms.map((room, index) => (
                                        <div key={index} className='flex items-center '>
                                            <hr />
                                            <div className='w-[100%] space-y-2'>
                                                <div className='flex items-center'>
                                                    <p className='mr-auto font-bold text-1xl'>{room.name}</p>
                                                    <img src={bin} className='h-[20px]' onClick={() => handleRoomDeselect(room.id)} />
                                                </div>

                                                <p className='text-md font-lato'>Selected Room/s Details:</p>
                                                <div className=''>

                                                    <div className='flex '>
                                                        <div className='mr-auto text-gray-500'>
                                                            <p>-{room.bed}</p>
                                                            <p>-{room.bathroom} bathroom</p>
                                                        </div>
                                                        <div className='flex items-center justify-center font-bold text-md font-roboto'>{room.price}</div>
                                                    </div>

                                                </div>
                                                {/* Inclusion SECTION */}
                                                <div className='flex items-center '>
                                                    <p className='text-md pr-5 font-lato'>Room Inclusions</p>
                                                    <img src={room.showInclusion ? up : down} className='min-h-[10px]' onClick={() => handleRoomInclusionToggle(room.id)} alt="" />
                                                </div>
                                                {room.showInclusion && (
                                                    <div onClick={() => handleRoomInclusionToggle(room.id)} className='pr-[150px]'>
                                                        <p>{room.inclusions}</p>
                                                    </div>
                                                )}
                                                {/* End inclusion section */}
                                                <hr />


                                            </div>
                                        </div>

                                    ))}

                                    <div className='flex font-bold'>
                                        <p className='mr-auto'>Total Price: </p>
                                        <p>PHP {calculateTotalPrice()}</p>

                                    </div>
                                </div>
                            )}

                        </div>




                        <div>
                            <button className='bg-[#A67B5B] text-white font-bold w-full rounded-md py-2' onClick={bookRoom}>
                                BOOK NOW
                            </button>
                            {!isSingleError && <p className="text-red-500">{error}</p>}

                        </div>

                    </div>
                </div>
  )
}

export default SelectedRooms