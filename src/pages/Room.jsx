import { Carousel } from "@material-tailwind/react";
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import roomOne from "../assets/img/room1.jpg"
import roomTwo from "../assets/img/room2.jpg"
import personLogo from "../assets/img/personLogo.png"
import goldBed from "../assets/img/goldBed.png"

const initialState = {
    rooms: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ROOMS':
            return { ...state, rooms: action.payload };
    }
}

const Room = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    const { rooms } = state
    console.log(rooms)

    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await axios.get("http://localhost:4002/product/active");
                dispatch({ type: 'SHOW_ROOMS', payload: res.data });
                setLoading(false)
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-[6%] flex justify-center px-[15%]'>
            <div className='grid grid-cols-2 w-full font-sans ' >
                {
                    rooms.map((room, id) => (

                        <div
                            key={id}
                            className='col-span-1 h-[80vh] px-10 border-r-2 mb-10'>
                            <p className='font-bold text-2xl text-[#BB8B00] '>{room.name}</p>
                            <div className='flex items-center gap-4'>
                                <img src={personLogo} className='h-5' alt="" />
                                <p className='text-[#BB8B00] text-md'>Pax: {room.person} Adult</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <img src={goldBed} className='h-4 w-6' alt="" />
                                <p className='text-[#BB8B00] text-md'>Bed: {room.bed}</p>
                            </div>
                            <p className='text-[#36454F]'> <span className='font-bold'>Roon Inclusions:</span> {room.description}</p>
                            <p></p>
                            <p></p>
                            <div className='h-[60%]' >
                            <Carousel>
            {room.imageContainer.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:4002/images/${image.images}`}
                className='object-cover w-full h-full'
                alt="rooms"
              />
            ))}
          </Carousel>
                            </div>

                        </div>

                    ))
                }
            </div>
            {/* <div className='grid grid-cols-2 w-full font-sans '>
                <div className='col-span-1 h-[80vh] px-10 border-r-2'>
                    <p className='font-bold text-2xl text-[#BB8B00] '>Elegant White Room</p>
                    <div className='flex items-center gap-4'>
                        <img src={personLogo} className='h-5' alt="" />
                        <p className='text-[#BB8B00] text-md'>Pax: 2 Adult</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img src={goldBed} className='h-4 w-6' alt="" />
                        <p className='text-[#BB8B00] text-md'>Bed: 1 Queen Size</p>
                    </div>
                    <p className='text-[#36454F]'> <span className='font-bold'>Roon Inclusions:</span> 28m²• Limited view• Shower over bath• Air conditioned• Cable/Satellite TV• Room Service• Internet Access• Linen and Towels Provided• Telephone• Spa• Lift/Elevator Access• Desk• Room Safe• Television• Tea/Coffee Maker• Iron/Ironing board• Hairdryer• Bathrobes Provided</p>
                    <p></p>
                    <p></p>
                    <div className='h-[60%]'
                        style={{
                            backgroundImage: `url(${roomOne})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderRadius: '10px' // Adjust the value as needed
                        }} >
                    </div>

                </div>

                <div className='col-span-1 h-[80vh] px-10'>
                    <p className='font-bold text-2xl text-[#BB8B00] '>Elegant White Room</p>
                    <div className='flex items-center gap-4'>
                        <img src={personLogo} className='h-5' alt="" />
                        <p className='text-[#BB8B00] text-md'>Pax: 2 Adult</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img src={goldBed} className='h-4 w-6' alt="" />
                        <p className='text-[#BB8B00] text-md'>Bed: 1 Queen Size</p>
                    </div>
                    <p className='text-[#36454F]'> <span className='font-bold'>Roon Inclusions:</span> 28m²• Limited view• Shower over bath• Air conditioned• Cable/Satellite TV• Room Service• Internet Access• Linen and Towels Provided• Telephone• Spa• Lift/Elevator Access• Desk• Room Safe• Television• Tea/Coffee Maker• Iron/Ironing board• Hairdryer• Bathrobes Provided</p>
                    <p></p>
                    <p></p>
                    <div className='h-[60%]'
                        style={{
                            backgroundImage: `url(${roomOne})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderRadius: '10px' // Adjust the value as needed
                        }} >
                    </div>

                </div>






            </div> */}

        </div>
    )
}

export default Room