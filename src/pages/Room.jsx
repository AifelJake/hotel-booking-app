import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Carousel } from "@material-tailwind/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import personLogo from "../assets/img/personLogo.png"
import goldBed from "../assets/img/goldBed.png"

const initialState = {
    rooms: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ROOMS':
            return { ...state, rooms: action.payload };
        default:
            return state;
    }
}

const Room = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4002/product/active");
                dispatch({ type: 'SHOW_ROOMS', payload: res.data });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-[6%] flex justify-center px-[15%]'>
            {loading ? (
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <div className='grid grid-cols-2 w-full font-sans '>
                    {state.rooms.map((room, id) => (
                        <div key={id} className='col-span-1 h-[80vh] px-10 border-r-2 mb-10'>
                            <p className='font-bold text-2xl text-[#BB8B00] '>{room.name}</p>
                            <div className='flex items-center gap-4'>
                                <img src={personLogo} className='h-5' alt="" />
                                <p className='text-[#BB8B00] text-md'>Pax: {room.person} Adult</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <img src={goldBed} className='h-4 w-6' alt="" />
                                <p className='text-[#BB8B00] text-md'>Bed: {room.bed}</p>
                            </div>
                            <p className='text-[#36454F]'> <span className='font-bold'>Room Inclusions:</span> {room.description}</p>
                            <div className='h-[60%]'>
                                <Carousel>
                                    {room.imageContainer.map((image, index) => {
                                        console.log(`Room ${room.name}, Image ${index}:`, image.images);
                                        return (
                                            <img key={index} src={`http://localhost:4002/images/${image.images}`} className='object-cover w-full h-full' alt={`room_${index}`} />
                                        );
                                    })}
                                </Carousel>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Room;
