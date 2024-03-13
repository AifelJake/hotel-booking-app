import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

// images import
import bed from "../assets/img/bed.png";
import person from "../assets/img/person.png";
import bathroom from "../assets/img/bathroom.png";
import down from "../assets/img/down.png";
import up from "../assets/img/up.png";
import bin from "../assets/img/bin.png";
import bgBooking from "../assets/img/bgBooking.jpg"
import frontBg from "../assets/img/frontBg.jpg"

const initialState = {
    showMore: false,
    rooms: [],
    checkInDate: "",
    checkOutDate: "",
    selectedRooms: [],
    numberOfChildren: 0,
    numberOfAdults: 0,
    error: null // Changed to null initially
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_DESC':
            return { ...state, showMore: !state.showMore };
        case 'TOGGLE_INCLUSION':
            const roomIdToToggle = action.payload;
            const toggledSelectedRooms = state.selectedRooms.map(room => {
                if (room.id === roomIdToToggle) {
                    return { ...room, showInclusion: !room.showInclusion };
                }
                return room;
            });
            return { ...state, selectedRooms: toggledSelectedRooms };
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4002/product/all");
                dispatch({ type: 'SHOW_ROOMS', payload: res.data });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
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




    const handleRoomInclusionToggle = (roomId) => {
        dispatch({ type: 'TOGGLE_INCLUSION', payload: roomId });
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
            console.log(error);
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const calculateTotalPrice = () => {
        const prices = state.selectedRooms.map(room => room.price);

        const totalPrice = prices.reduce((acc, currentValue) => {
            const num = parseFloat(currentValue.replace(',', ''))
            return acc + num
        }, 0);
        return totalPrice;
    };

    const calculateStayDuration = () => {

        const { checkInDate, checkOutDate } = state;


        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const duration = (endDate - startDate) / oneDay;
        console.log(duration)
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
        const { checkInDate, checkOutDate } = state;
        const formattedCheckInDate = formatDateString(checkInDate);
        const formattedCheckOutDate = formatDateString(checkOutDate);
        return `${formattedCheckInDate} – ${formattedCheckOutDate}`;
    };

    const { showMore, error, checkInDate, checkOutDate, numberOfAdults, numberOfChildren } = state;
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
                            <input type="number" name='adults' className='border-2 w-[40px] h-[35px]' onChange={handleAdultsChange} />

                        </div>
                        <div className=' w-[40px] ml-10'>
                            <p>Children:</p>
                            <input type="number" name='children' className='border-2 w-[40px] h-[35px]' onChange={handleChildrenChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/* end */}


            <div className='px-[12%] flex gap-3 mt-20'>

                {/* ROOM DETAILS */}
                <div>
                    {state.rooms.map((room, id) => (
                        <div className='w-[100%] border p-2 shadow-md flex mb-5' key={id}>
                            <div className='w-30%'>
                                <img src={'http://localhost:4002/images/' + room.image} className='max-h-[270px] w-[220px]' alt="" />
                            </div>

                            <div className='ml-5 w-[70%] py-3 px-2 space-y-2'>
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
                                        <p className='bg-[#A67B5B] text-white rounded-md py-1.5 px-6' onClick={() => handleRoomSelect(room._id, room.name, room.image, room.price, room.moreDescription, room.bed, room.bathroom)}>SELECT</p>
                                    </div>
                                </div>

                                {showMore && (
                                    <>
                                        <div onClick={() => dispatch({ type: 'TOGGLE_DESC' })} className='mr-[320px]'>
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
                            <p>Adult {state.numberOfAdults} -</p>
                            <p>Children {state.numberOfChildren}</p>
                        </div>
                        {isSingleError && <p className="text-red-500 text-center">{error}</p>}

                        <hr />
                        <p className='font-bold text-center'>SELECT A ROOM TO BOOK</p>



                        <div className='flex justify-center '>
                            {/* SECTION AFTER SELECTING A ROOM */}
                            {state.selectedRooms.length > 0 && (
                                <div className='w-[100%] font-lato '>
                                    <p className='font-bold font-sans text-xl'>PHP {calculateTotalPrice()} total</p>
                                    <div className='flex text-gray-500 gap-2'>
                                        <p>{calculateStayDuration()} day/s</p>


                                    </div>
                                    {state.selectedRooms.map((room, index) => (
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
            </div>

        </>
    );
}

export default Room;
