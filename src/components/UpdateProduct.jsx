import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';



function UpdateProduct({ roomsData, onClose }) {
  const { name, image, description, moreDescription, person, bed, bathroom, price, status, _id } = roomsData;

  const initialState = {
    status: '',
    showModal1: false,
    showModal2: false,
    updatedProduct: {
      name: name,
      description: description,
      moreDescription: moreDescription,
      person: person,
      bed: bed,
      bathroom: bathroom,
      price: price,
      stock: '',
    },
    addedProduct: {
      name: '',
      description: '',
      price: '',
      stock: '',
      image: '',
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setStatus':
        return { ...state, status: action.payload };
      case 'setShowModal1':
        return { ...state, showModal1: action.payload };
      case 'setShowModal2':
        return { ...state, showModal2: action.payload };
      case 'setUpdatedProduct':
        return { ...state, updatedProduct: { ...state.updatedProduct, ...action.payload } };
      case 'setAddedProduct':
        return { ...state, addedProduct: { ...state.addedProduct, ...action.payload } };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { updatedProduct, addedProduct } = state;
  const { user } = useContext(UserContext);

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type === 'update') {
      dispatch({ type: 'setUpdatedProduct', payload: { [name]: value } });
    } else if (type === 'add') {
      dispatch({ type: 'setAddedProduct', payload: { [name]: value } });
    }
  };


  const updateProduct = () => {
    axios.put(`http://localhost:4002/product/${_id}`, {
      ...updatedProduct,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        console.log(res);
       onClose()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90"></div>
  <div className='bg-white border border-gray-500 rounded-lg w-[70%] z-50'>
    <form className='p-10 space-y-7' action='submit'>
      <div className='' data-twe-input-wrapper-init>
        <div className='flex justify-between flex-wrap'>
          <div className='flex flex-col w-[30%]'>
            <label htmlFor="roomName" className="">Room Name</label>
            <input
              type="text"
              id="roomName"
              name="name"
              className='border-2'
              value={updatedProduct.name}
              placeholder="Room Name"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[30%]'>
            <label htmlFor="numberOfPerson" className="">Number of Person</label>
            <input
              type="number"
              id="numberOfPerson"
              name="person"
              className='border-2'
              value={updatedProduct.person}
              placeholder="Number of Person"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[30%]'>
            <label htmlFor="numberOfBeds" className="">Number and type of Bed</label>
            <input
              type="text"
              id="numberOfBeds"
              name="bed"
              className='border-2'
              value={updatedProduct.bed}
              placeholder="Number and type of Bed"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[30%]'>
            <label htmlFor="numberOfBathrooms" className="">Number of Bathrooms</label>
            <input
              type="number"
              id="numberOfBathrooms"
              name="bathroom"
              className='border-2'
              value={updatedProduct.bathroom}
              placeholder="Number of Bathrooms"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[30%]'>
            <label htmlFor="productImage" className="">Product Image</label>
            <input
              type="file"
              id="productImage"
              name="image"
              className='border-2'
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[30%]'>
            <label htmlFor="productPrice" className="">Product Price</label>
            <input
              type="text"
              id="productPrice"
              name="price"
              className='border-2'
              value={updatedProduct.price}
              placeholder="Price"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[100%]'>
            <label htmlFor="productDescription" className="">Product Description</label>
            <textarea
              id="productDescription"
              name="description"
              className='border-2 h-[100px]'
              value={updatedProduct.description}
              placeholder="Description"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          <div className='flex flex-col w-[100%]'>
            <label htmlFor="moreDescription" className="">More Description</label>
            <textarea
              id="moreDescription"
              name="moreDescription"
              className='border-2 h-[100px]'
              value={updatedProduct.moreDescription}
              placeholder="More Description"
              onChange={(e) => handleInputChange(e, 'update')}
            />
          </div>
          {/* Add more inputs here following the same pattern */}
        </div>
        {/* Add more rows of inputs here if needed */}
      </div>
      <div className='flex justify-between'>
        <div>
          <p>Note:</p>
          <p>The "More Description" is for the inclusion section.</p>
        </div>
        <div className='flex space-x-4'>
          <button
            type="button"
            onClick={updateProduct}
            className='bg-blue-500 text-white px-5 py-2 rounded'>Update Product</button>
          <button
            type="button"
            className='bg-red-500 text-white px-8 py-2 rounded'
            onClick={onClose}
          >Cancel</button>
        </div>
      </div>
    </form>
  </div>
</div>

  );
}

export default UpdateProduct;
