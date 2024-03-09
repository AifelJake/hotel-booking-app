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
    selectedRooms: [],
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
        case 'ADD_SELECTED_ROOM':
            const newRoom = action.payload;
            const updatedSelectedRooms = [...state.selectedRooms, newRoom];
            return { ...state, selectedRooms: updatedSelectedRooms };
        case 'REMOVE_SELECTED_ROOM':
            const roomIdToRemove = action.payload;
            const filteredSelectedRooms = state.selectedRooms.filter(room => room.id !== roomIdToRemove);
            return { ...state, selectedRooms: filteredSelectedRooms };
        case 'SET_NUMBER_OF_ADULTS':
            return { ...state, numberOfAdults: action.payload };
        case 'SET_NUMBER_OF_CHILDREN':
            return { ...state, numberOfChildren: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
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

    const handleAdultsChange = (e) => {
        dispatch({ type: 'SET_NUMBER_OF_ADULTS', payload: e.target.value });
    };

    const handleChildrenChange = (e) => {
        dispatch({ type: 'SET_NUMBER_OF_CHILDREN', payload: e.target.value });
    };

    const handleRoomSelect = (id, name, image, price) => {
        dispatch({ type: 'ADD_SELECTED_ROOM', payload: { id, name, image, price, quantity: 1 } });
    };

    const handleRoomDeselect = (id) => {
        dispatch({ type: 'REMOVE_SELECTED_ROOM', payload: id });
    };

    const bookRoom = async () => {
        try {
            const { checkInDate, checkOutDate, selectedRooms, numberOfAdults, numberOfChildren } = state;
            if (!checkInDate || !checkOutDate || selectedRooms.length === 0) {
                dispatch({ type: 'SET_ERROR', payload: "Please select check-in and check-out dates and at least one room." });
                return;
            }
    
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
    
            const res = await axios.post('http://localhost:4002/order/orders', payload);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
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
                                    <p className='bg-[#A67B5B] text-white rounded-md py-1.5 px-6' onClick={() => handleRoomSelect(room._id, room.name, room.image, room.price)}>SELECT</p>
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
            <div className='min-w-[30%] h-[250px] max-h-[100%] flex justify-center items-center text-center border-red-gray border-2'>
                <div className='pt-2  space-y-2 '>
                    <div className='space-x-5 flex'>
                        <div>
                            <p className='font-bold'>Check-In Date</p>
                            <input type="date" className='border-2' onChange={(e) => dispatch({ type: 'SET_CHECK_IN_DATE', payload: e.target.value })} />
                        </div>
                        <div>
                            <p className='font-bold'>Check-Out Date</p>
                            <input type="date" className='border-2' onChange={(e) => dispatch({ type: 'SET_CHECK_OUT_DATE', payload: e.target.value })} />
                        </div>
                    </div>

                    {/* number of children and adults section */}
                    <div className='flex  justify-center'>
                        <div className='w-[40px]'>
                            <p>Adults:</p>
                            <input type="number" name='adults' className='border-2 w-[40px]' onChange={handleAdultsChange} />
                        </div>
                        <div className=' w-[40px] ml-10'>
                            <p>Children:</p>
                            <input type="number" name='children' className='border-2 w-[40px]' onChange={handleChildrenChange} />
                        </div>
                    </div>

                    <hr />
                    <p className='font-bold'>SELECT A ROOM TO BOOK</p>

                    {/* SECTION AFTER SELECTING A ROOM */}
                    {state.selectedRooms.length > 0 && (
                        <div>
                            <p className='font-bold'>Selected Rooms:</p>
                            {state.selectedRooms.map((room, index) => (
                                <div key={index} className='flex justify-between items-center'>
                                    <p>{room.name}</p>
                                    <button onClick={() => handleRoomDeselect(room.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    )}


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
