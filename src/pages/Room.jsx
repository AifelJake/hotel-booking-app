import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// images import
import bed from "../assets/img/bed.png";
import person from "../assets/img/person.png";
import bathroom from "../assets/img/bathroom.png";
import bgBooking from "../assets/img/bgBooking.jpg"
import frontBg from "../assets/img/frontBg.jpg"

import ShowRoom from '../components/ShowRoom';
import SelectedRooms from '../components/SelectedRooms';

const initialState = {
    showMore: false,
    rooms: [],
    checkInDate: "",
    checkOutDate: "",
    selectedRooms: [],
    numberOfChildren: 0,
    numberOfAdults: 0,
    showMobileSelectRooms: false,
    showModal: false,
    error: null // Changed to null initially
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_DESC':
            const roomIdToShowMore = action.payload;
            const updatedRooms = state.rooms.map(room => {
                if (room._id === roomIdToShowMore) {
                    return { ...room, showMore: !room.showMore };
                }
                return room;
            });
            return { ...state, rooms: updatedRooms };


        case 'TOGGLE_INCLUSION':
            const roomIdToToggle = action.payload;
            const toggledSelectedRooms = state.selectedRooms.map(room => {
                if (room.id === roomIdToToggle) {
                    return { ...room, showInclusion: !room.showInclusion };
                }
                return room;
            });
            return { ...state, selectedRooms: toggledSelectedRooms };
        case 'SHOW_ROOM_MODAL':
            return { ...state, showModal: !state.showModal, selectedRoomImage: action.payload };
        case 'TOGGLE_GLOBAL_MODAL':
            return { ...state, showModal: !state.showModal };
        case 'TOGGLE_SHOW_MOBILE_MODAL':
            return { ...state, showMobileSelectRooms: !state.showMobileSelectRooms };
        case 'FETCH_IMAGE':
            return { ...state, image: action.payload };
        case 'SHOW_ROOMS':
            return { ...state, rooms: action.payload };
        case 'SET_CHECK_IN_DATE':
            return { ...state, checkInDate: action.payload };
        case 'SET_CHECK_OUT_DATE':
            return { ...state, checkOutDate: action.payload };
        case 'ADD_SELECTED_ROOM':
            const newRoom = action.payload;
            newRoom.showInclusion = false; // Initialize showInclusion for the new room
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
            return { ...state, error: action.payload }; // Update error directly

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
                setLoading(false)
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
                setLoading(false)
            }
        };

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
        const numberOfAdults = parseInt(e.target.value);
        dispatch({ type: 'SET_NUMBER_OF_ADULTS', payload: numberOfAdults });
    };


    const handleChildrenChange = (e) => {
        dispatch({ type: 'SET_NUMBER_OF_CHILDREN', payload: e.target.value });
    };


    const handleShowModal = (imageUrl) => {
        dispatch({ type: 'SHOW_ROOM_MODAL', payload: imageUrl });
    }

    const handleRoomInclusionToggle = (roomId) => {
        dispatch({ type: 'TOGGLE_INCLUSION', payload: roomId });
    };

    const handleToggleDesc = (roomId) => {

        dispatch({ type: 'TOGGLE_DESC', payload: roomId })
    }

    const handleRoomDeselect = (id) => {
        dispatch({ type: 'REMOVE_SELECTED_ROOM', payload: id });
        console.log('clicked')
    };


    const toggleShowMobileSelectRooms = () => {
        dispatch({ type: 'TOGGLE_SHOW_MOBILE_MODAL' })

    }

    const calculateStayDuration = () => {

        const { checkInDate, checkOutDate } = state;


        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const duration = (endDate - startDate) / oneDay;
        return duration;
    };



    const handleRoomSelect = (id, name, image, price, inclusions, bed, bathroom) => {
        const { checkInDate, checkOutDate, numberOfAdults } = state;
        const errors = [];

        if (!checkInDate) {
            errors.push("Please enter the check-in date.");
        }
        if (!checkOutDate) {
            errors.push("Please enter the check-out date.");
        }
        if (!numberOfAdults) {
            errors.push("Please enter the number of adults.");
        }

        if (calculateStayDuration() <= 0) {
            errors.push("The number of days is invalid please book atleast 1 day");
        }

        if (errors.length === 0) {
            dispatch({ type: 'ADD_SELECTED_ROOM', payload: { id, name, image, price, inclusions, bed, bathroom, quantity: 1 } });
            dispatch({ type: 'SET_ERROR', payload: null }); // Reset error to null when there are no errors
        } else {
            dispatch({ type: 'SET_ERROR', payload: errors });
        }
    };

    const { showMore, error, checkInDate, checkOutDate, numberOfAdults, numberOfChildren, showModal, selectedRooms, showMobileSelectRooms } = state;

    // calculate total price
    const calculateTotalPrice = () => {
        const prices = selectedRooms.map(room => room.price);

        const totalPrice = prices.reduce((acc, currentValue) => {
            const num = parseFloat(currentValue.replace(',', ''))
            return acc + num
        }, 0);
        return totalPrice;
    };

    const totalGuests = numberOfAdults + numberOfChildren;
    const totalRoomCount = selectedRooms.reduce((total, room) => {
        return total + room.quantity;
    }, 0);



    const isSingleError = error && !Array.isArray(error);

    return (
        <>



            {/* choosing dates and numbers section */}
            <div className='flex '>
                <div className='w-[50%] h-[40vh]' style={{
                    backgroundImage: `url(${bgBooking})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                </div>
                <div className='w-[50%] h-[40vh]' style={{
                    backgroundImage: `url(${frontBg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>

                </div>

            </div>


            {/* input section for booking */}
            <div className='flex justify-center  mt-[-20px] '>
                <div className='w-[50%] h-[13vh] justify-evenly items-center border-2 border-[#A67B5B] rounded  bg-white flex pb-2'>
                    <div className='w-[30%] '>
                        <p className='font-lato text-[0.8em]'>Check-In Date</p>
                        <input
                            type="date"
                            className='border-2 w-[100%] h-[35px]'
                            onChange={(e) => {
                                const selectedCheckInDate = new Date(e.target.value);
                                const nextDay = new Date(selectedCheckInDate);
                                nextDay.setDate(selectedCheckInDate.getDate() + 1); // Increment the selected check-in date by 1 day

                                // Set the minimum date for check-out to the next day after the selected check-in date
                                document.getElementById('checkOutDate').setAttribute('min', nextDay.toISOString().split('T')[0]);

                                dispatch({ type: 'SET_CHECK_IN_DATE', payload: e.target.value });
                            }}
                            id="checkInDate" // Add an id to the check-in date input
                        />


                    </div>
                    <div className='w-[30%] '>
                        <p className='font-lato text-[0.8em]'>Check-Out Date</p>
                        <input
                            type="date"
                            className='border-2 w-[100%] h-[35px]'
                            onChange={(e) => {
                                const selectedCheckOutDate = new Date(e.target.value);
                                const selectedCheckInDate = new Date(state.checkInDate);

                                // Check if the selected check-out date is the same as or before the selected check-in date
                                if (selectedCheckOutDate <= selectedCheckInDate) {
                                    // Set the check-out date to the next day after the selected check-in date
                                    const nextDay = new Date(selectedCheckInDate);
                                    nextDay.setDate(selectedCheckInDate.getDate() + 1);
                                    e.target.value = nextDay.toISOString().split('T')[0];
                                }

                                dispatch({ type: 'SET_CHECK_OUT_DATE', payload: e.target.value });
                            }}
                            id="checkOutDate" // Add an id to the check-out date input
                        />


                    </div>

                    <div className='flex text-[0.8em]'>
                        <div className='w-[40px]'>
                            <p>Adults:</p>
                            <input 
                            type="number" 
                            name='adults' 
                            className='border-2 w-[40px] h-[35px]' 
                            onChange={handleAdultsChange} />

                        </div>
                        <div className=' w-[40px] ml-10'>
                            <p>Children:</p>
                            <input type="number" 
                            name='children' c
                            lassName='border-2 w-[40px] h-[35px]' 
                            onChange={handleChildrenChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/* end */}


            <div className='md:px-[12%] px-3 flex gap-3 mb-20 mt-20'>

                {/* ROOM DETAILS */}
                <div>
                    {state.rooms.map((room, id) => (
                        <div className='w-[100%] border md:p-2 shadow-md md:flex mb-5' key={id}>
                            <div className='md:w-30% '>
                                <img
                                    src={'http://localhost:4002/images/' + room.image}
                                    className='max-h-[270px] md:w-[220px] w-[100%]'
                                    alt=""
                                    onClick={() => handleShowModal('http://localhost:4002/images/' + room.image)}
                                />


                            </div>

                            <div className='md:ml-5 md:w-[70%] w-[100%] py-3 px-4 space-y-2 '>
                                <p className='md:text-2xl text-xl font-bold text-center'>{room.name}</p>

                                {/* LOGOS */}
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center gap-1'>
                                        <img src={person} className='h-[18px]' alt="person logo" />
                                        <p>{room.person} sleep</p>
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
                                    {!room.showMore && (
                                        <button className='italic underline' onClick={() => handleToggleDesc(room._id)}>
                                            See More
                                        </button>
                                    )}

                                    <div className='ml-auto'>
                                        <p className='font-bold '>PHP {room.price}</p>
                                        <p className='bg-[#A67B5B] text-white rounded-md py-1.5 px-6' 
                                        onClick={() => 
                                        handleRoomSelect(room._id, 
                                        room.name, 
                                        room.image, 
                                        room.price, 
                                        room.moreDescription, 
                                        room.bed, 
                                        room.bathroom)}>SELECT</p>
                                     
                                    </div>
                                </div>
                                {!isSingleError && <p className="text-red-500">{error}</p>}

                                {room.showMore && (
                                    <>
                                        <div onClick={() => handleToggleDesc(room._id)} className='mr-[320px]'>
                                            <p>{room.moreDescription}</p>
                                        </div>
                                        <button className='italic underline' onClick={() => handleToggleDesc(room._id)}>
                                            See Less
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                </div>

                <div className='hidden sm:block md:min-w-[30%]'>
                    <SelectedRooms
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        numberOfAdults={numberOfAdults}
                        numberOfChildren={numberOfChildren}
                        selectedRooms={selectedRooms}
                        calculateStayDuration={calculateStayDuration}
                        calculateTotalPrice={calculateTotalPrice}
                        error={error}
                    />
                </div>

                {/* BOOKED/RESERVATION SECTION */}

            </div>

            {/* SMALL SECTION FOR MOBILE */}
            <div className='md:hidden fixed bottom-0 bg-white w-[100vw] px-4 flex items-center  border-2 h-[8%]'>

                <div className='w-[60%]'
                    onClick={toggleShowMobileSelectRooms}>

                    <p className='text-xl font-bold'>PHP {calculateTotalPrice()}</p>
                    <div className='flex font-lato text-gray-500'>
                        <p>{totalRoomCount} Room,</p>
                        <p>Guest: {totalGuests} </p>

                    </div>


                </div>

                {/* book now button for mobile */}
                <div className='flex justify-center items-center w-[40%]'>
                    <div className='text-white flex justify-center items-center py-2 rounded bg-[#A67B5B] w-[100%]'>
                        <p>
                            BOOK NOW
                        </p>
                    </div>
                </div>
            </div>

            {state.showModal && (
                <ShowRoom
                    imageUrl={state.selectedRoomImage}
                    onClose={() => handleShowModal(null)}
                />
            )}



            {
                showMobileSelectRooms && (

                    <div className='w-[100%] md:hidden fixed inset-0 z-50 overflow-y-auto bg-white'>
                        <SelectedRooms 
                        checkInDate={checkInDate} 
                        checkOutDate={checkOutDate} 
                        numberOfAdults={numberOfAdults} 
                        numberOfChildren={numberOfChildren} 
                        selectedRooms={selectedRooms} 
                        calculateStayDuration={calculateStayDuration} 
                        calculateTotalPrice={calculateTotalPrice} 
                        handleRoomDeselect={handleRoomDeselect} 
                        toggleShowMobileSelectRooms={toggleShowMobileSelectRooms} />
                    </div>
                )
            }


            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: 9999 }} // Adjust the zIndex value as needed
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

        </>
    );
}

export default Room;
