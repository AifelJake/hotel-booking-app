import React, { useReducer, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ProductForm from '../components/ProductForm';
import axios from 'axios';
import UpdateProduct from '../components/UpdateProduct';

const Dashboard = () => {
  const initialState = {
    showAddRoomModal: false,
    showUpdateRoomModal: false,
    rooms: [],
    loading: true,
    roomsUpdate: [],

  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_SHOW_ADD_ROOM_MODAL":
        return { ...state, showAddRoomModal: !state.showAddRoomModal };
      case "TOGGLE_SHOW_UPDATE_ROOM_MODAL":
        return { ...state, showUpdateRoomModal: !state.showUpdateRoomModal };
      case 'SHOW_ROOMS':
        return { ...state, rooms: action.payload, loading: false };
      case 'UPDATE_ROOM_STATUS':
        const updatedRoomStatus = state.rooms.map(room => {
          if (room._id === action.payload._id) {
            return { ...room, status: action.payload.status };
          }
          return room;
        });
        return { ...state, rooms: updatedRoomStatus };

      case 'UPDATE_ROOM':
        return { ...state, roomsUpdate: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4002/product/all");
        dispatch({ type: 'SHOW_ROOMS', payload: res.data });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_SHOW_ADD_ROOM_MODAL" });
  };

  const toggleShowUpdateModal = () => {
    dispatch({ type: "TOGGLE_SHOW_UPDATE_ROOM_MODAL" });
  };

  const toggleUpdateModal = async (_id) => {

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.get(`http://localhost:4002/product/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      dispatch({ type: "UPDATE_ROOM", payload: response.data })
      toggleShowUpdateModal()
      console.log('clicked')
    } catch (e) {
      console.log(e)
    }

    console.log("clicked")
  };


  const updateProductStatus = async (_id, updatedData) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.put(`http://localhost:4002/product/${_id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      dispatch({ type: 'UPDATE_ROOM_STATUS', payload: { _id, status: updatedData.status } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { showAddRoomModal, rooms, loading, showUpdateRoomModal, roomsUpdate } = state;
 
  

  return (
    <>
      <div className='bg-gray-100 w-[100%] mt-20'>
        <div>
          <button
            className='bg-[#A67B5B] text-white p-2 rounded mb-2 '
            onClick={toggleModal}>
            ADD PRODUCT
          </button>
        </div>

        <div className='flex justify-center px-5'>
          <div className='border w-[100%] bg-white'>
            <table className="border-collapse border border-gray-400 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Product</th>
                  <th className="border  border-gray-400 px-4 py-2">Image</th>
                  <th className="border  border-gray-400 px-4 py-2">Description</th>
                  <th className="border  border-gray-400 px-4 py-2">More Description</th>
                  <th className="border  border-gray-400 px-4 py-2">Capacity, Bed, Bathrooom</th>
                  <th className="border  border-gray-400 px-4 py-2">Price</th>
                  <th className="border  border-gray-400 px-4 py-2">Status</th>
                  <th className="border  border-gray-400 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr key={room._id}>
                    <td className="border border-gray-400 w-[10%]">
                      <div className='flex justify-center text-center'>
                        {room.name}
                      </div>
                    </td>
                    <td className="border border-gray-400 flex justify-center">
                      
                    {room.imageContainer.length > 0 && (
                        <img
                          src={`http://localhost:4002/images/${room.imageContainer[0].images}`}
                          className='h-[15rem] w-[20rem]'
                          alt="rooms"
                        />
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 w-[20%]">
                      <p>{room.description}</p>
                    </td>
                    <td className="border border-gray-400 px-4 py-2 w-[20%]">
                      <p>{room.moreDescription}</p>
                    </td>
                    <td className="border border-gray-400 px-4 py-2 w-[10%]">
                      <p>-{room.person} person</p>
                      <p>-{room.bed}</p>
                      <p>-{room.bathroom} bathroom</p>
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{room.price}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      <div
                        className={`bg-${room.status === 'Active' ? 'blue' : 'red'}-500 py-1 rounded-xl cursor-pointer`}
                        onClick={() => updateProductStatus(room._id, {
                          ...room,
                          status: room.status === 'Active' ? 'notActive' : 'Active'
                        })}
                      >
                        {room.status}
                      </div>

                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      <button
                        className='bg-[#A67B5B] rounded-xl text-white py-1'
                        onClick={() => toggleUpdateModal(room._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddRoomModal && (<ProductForm onclose={toggleModal} />)}
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: 9999 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {
        showUpdateRoomModal && (<UpdateProduct roomsData={roomsUpdate} onClose={toggleShowUpdateModal}/>)
      }
    </>
  );
};

export default Dashboard;
