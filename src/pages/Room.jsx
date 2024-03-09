import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import bed from "../assets/img/bed.png";
import person from "../assets/img/person.png";
import bathroom from "../assets/img/bathroom.png";

const initialState = {
    showMore: false,
    rooms: [],
    checkInDate: "",
    checkOutDate: "",
    selectedRoom: null,
    numberOfChildren: 0,
    numberOfAdult: 0,
    error: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_DESC':
            return { ...state, showMore: !state.showMore };
        case 'FETCH_IMAGE':
            return { ...state, image: action.payload };
        case 'SHOW_ROOMS':
            return { ...state, rooms: action.payload }
        case 'SET_CHECK_IN_DATE':
            return { ...state, checkInDate: action.payload };
        case 'SET_CHECK_OUT_DATE':
            return { ...state, checkOutDate: action.payload };
        case 'SET_SELECTED_ROOM':
            return { ...state, selectedRoom: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'ADD_CHILDREN_NUMBER':
            return { ...state, numberOfChildren: state.numberOfChildren + 1 }
        case 'DEDUCT_CHILDREN_NUMBER':
            return { ...state, numberOfChildren: state.numberOfChildren - 1 }
            case 'ADD_ADULT_NUMBER':
            return { ...state, numberOfAdult: state.numberOfAdult + 1 }
        case 'DEDUCT_ADULT_NUMBER':
            return { ...state, numberOfAdult: state.numberOfAdult - 1 }
        default:
            return state
    }
}


const Room = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4002/product/all");
                dispatch({ type: 'SHOW_ROOMS', payload: res.data });
                console.log(res)
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4002/product/getImages");
                dispatch({ type: 'FETCH_IMAGE', payload: res.data });

            } catch (error) {
                console.log(error);
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };

        fetchData();
    }, []);


    const bookRoom = async () => {
        try {

            const { checkInDate, checkOutDate, selectedRoom } = state;
            console.log(selectedRoom)
            if (!checkInDate || !checkOutDate || !selectedRoom) {
                dispatch({ type: 'SET_ERROR', payload: "Please select check-in and check-out dates and a room." });
                return;
            }

            const payload = {
                products: [{
                    productId: selectedRoom.id,
                    productName: selectedRoom.name,
                    productImage: selectedRoom.image,
                    price: selectedRoom.price,
                    // numberOfAdults: selectedRoom.numberOfAdults,
                    // numberOfChildren: selectedRoom.numberOfChildren,
                    // checkIn: checkInDate,
                    // checkOut: checkOutDate
                }]
            };
            const res = await axios.post('http://localhost:4002/order/orders', payload);
            console.log(res.data);

        } catch (error) {
            console.log(error)
        }
    }

    const selectRoom = (id, name, image, price) => {
        dispatch({ type: 'SET_SELECTED_ROOM', payload: { id, name, image, price } });
    }

    useEffect(() => {
        console.log(state.selectedRoom);
    }, [state.selectedRoom]);

    const { showMore, rooms, checkInDate, checkOutDate, selectedRoom, error } = state;

    return (
        <div className='px-[12%] flex  gap-3 mt-20'>
            {/* ROOM DETAILS */}
            <div >

                {state.rooms.map((room, id) => (
                    <div className='w-[100%] border p-2 shadow-md flex mb-5' key={id}>
                        <div className='w-30%'>
                            <img src={'http://localhost:4002/images/' + room.image} className='max-h-[270px] w-[220px]' alt="" />
                        </div>

                        <div className='ml-5 w-[70%] py-3 px-2 space-y-2 ' >
                            <p className='text-2xl font-bold'>{room.name}</p>

                            {/* LOGOS */}
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-1'>
                                    <img src={person} className='h-[18px]' alt="person logo" />
                                    <p>{room.person} sleeps</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={bed} className='h-[20px]' alt="bed logo" />
                                    <p>{room.bed}</p>
                                </div>
                                <div className='flex gap-1'>
                                    <img src={bathroom} className='h-[20px]' alt="bath tub" />
                                    <p>{room.bathroom} bathroom</p>
                                </div>
                            </div>

                            {/* Show more */}
                            <p>{room.description}</p>
                            <div className='flex'>
                                {!showMore && (
                                    <button className='italic underline' onClick={() => dispatch({ type: 'TOGGLE_DESC' })}>
                                        See More
                                    </button>
                                )}

                                <div className='ml-auto'>
                                    <p className='font-bold '>PHP {room.price}</p>
                                    <p className='bg-[#A67B5B] text-white rounded-md py-1.5 px-6' onClick={() => selectRoom(room._id, room.name, room.image, room.price)}>SELECT</p>
                                </div>
                            </div>

                            {showMore && (
                                <>
                                    <div onClick={() => dispatch({ type: 'TOGGLE_DESC' })} className='pr-[230px]'>
                                        <p>{room.moreDescription}</p>
                                    </div>
                                    <button className='italic underline' onClick={() => dispatch({ type: 'TOGGLE_DESC' })}>
                                        See Less
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* BOOKED/RESERVATION SECTION */}
            <div className='min-w-[30%] h-[200px] flex justify-center items-center text-center border-red-gray border-2 p-4'>
                <div className='pt-2  space-y-2'>
                    <div className='space-x-5 flex'>
                        <div>
                            <p className='font-bold'>Check-In Date</p>
                            <input type="date" className='border-2' />
                        </div>
                        <div>
                            <p className='font-bold'>Check-Out Date</p>
                            <input type="date" className='border-2' />
                        </div>
                    </div>
                    <p>1 Room, 2 guests</p>
                    <hr />
                    <p className='font-bold'>SELECT A ROOM TO BOOK</p>
                    <div className='mt-6'>
                        <button className='bg-[#A67B5B] text-white font-bold w-[100%] rounded-md py-2' onClick={bookRoom}>
                            BOOK NOW
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Room;
