import React from 'react';
import { Carousel } from "@material-tailwind/react";

const Modal = ({ imageUrl, onClose, onPrev, onNext }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90"></div>

      {/* Modal content */}
      <div className="rounded-lg max-w-sm relative z-10 flex justify-center items-center">
        <button
          className="absolute top-0 text-[3rem] left-0 p-2 text-white hover:text-gray-800"
          onClick={onPrev}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &lt;
        </button>
        <button
          className="absolute top-0 right-0 p-2 text-white text-[3rem] hover:text-gray-800"
          onClick={onNext}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &gt;
        </button>
        <button
          className="absolute top-0 right-10 p-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div style={{ width: '500px', height: '500px' }}>
          <Carousel>
            {imageUrl.map((image, index) => (
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
    </div>
  );
};

export default Modal;
