import React from 'react';
import roomOne from "../assets/img/room1.jpg";

const Dashboard = () => {
  return (
    <div className='bg-gray-100 w-[100%] flex justify-center'>

      {/* white bg container */}
      <div className='mt-20 w-[90%] bg-white'>
        {/* product boxes */}
        <div className='border'>

          {/* CRUD  actions*/}
          <div>

          </div>

          {/* tables */}
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Product</th>
                <th className="border border-gray-400 px-4 py-2">Image</th>
                <th className="border border-gray-400 px-4 py-2">Description</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 w-[20%] ">
      

                  <div className='flex justify-center'> 
                    WHITE ELEGANT ROOM
                  </div>
                </td>


                <td className="border  border-gray-400 flex justify-center  ">
                  <img src={roomOne} className='h-[12rem] w-[10rem]' alt="" />
                </td>

                <td className="border border-gray-400 px-4 py-2 w-[30%]"><p>36m²• City view• Internet Access• Cable/Satellite TV• Room Service• Shower over bath• Air conditioned• Linen and Towels Provided• Bathrobes Provided</p>
                  <p>-Rooms located at 10/F - 29/F</p>
                  <p>-Smoking / Non-Smoking Room Option</p>
                  <p>-Hotel's Top Amenities</p>
                  <p>-Roofdeck Pool</p></td>
                <td className="border border-gray-400 px-4 py-2 text-center">P 5,600</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <div className='bg-green-500 py-1 rounded-xl'>
                  Active
                  </div>
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <div className='bg-[#A67B5B] rounded-xl text-white py-1' >Update</div>

                </td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
