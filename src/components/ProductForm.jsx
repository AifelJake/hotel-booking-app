import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({onclose}) => {
    const [formData, setFormData] = useState({
        name: '',
        person: '',
        bed: '',
        bathroom: '',
        description: '',
        moreDescription: '',
        image: null, // Store the selected image file
        price: '',
        numberOfStock: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected image file:', file); // Log the selected file
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        console.log(formData);
        console.log("FormData:", formDataToSend); // Log formDataToSend instead of formData
        try {
            const res = await axios.post('http://localhost:4002/product/registerProducts', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product registered successfully:', res.data);
        } catch (error) {
            console.error('Error registering product:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90"></div>
            <div className='bg-white border border-gray-500 rounded-lg w-[50%] z-50'>
                <form onSubmit={handleSubmit} className='p-10 space-y-7'>
                    <div className='flex justify-between'>
                        <input
                            type="text"
                            name="name"
                            className='border-2 w-[30%]'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Room Name" />

                        <input
                            type="number"
                            name="person"
                            className='border-2 w-[30%]'
                            value={formData.person}
                            onChange={handleChange}
                            placeholder="Number of Person" />

                        <input
                            type="text"
                            name="bed"
                            className='border-2 w-[30%]'
                            value={formData.bed}
                            onChange={handleChange}
                            placeholder="Number and type of Bed" />
                    </div>

                    <div className='flex justify-between'>
                        <input
                            type="number"
                            name="bathroom"
                            className='border-2 w-[30%]'
                            value={formData.bathroom}
                            onChange={handleChange}
                            placeholder="Number of Bathroom" />

                        <input
                            type="file"
                            name="image"
                            className='border-2 w-[30%]'
                            onChange={handleImageChange} />

                        <input type="text"
                            name="price"
                            className='border-2 w-[30%]'
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price" />

                    </div>

                    <div>
                        <textarea name="description" className='border-2 w-full h-[100px]'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description" />
                    </div>

                    <div>
                        <textarea name="moreDescription" className='border-2 w-full h-[100px]'
                            value={formData.moreDescription}
                            onChange={handleChange}
                            placeholder="More Description" />
                    </div>

                    {/* BUTTONS SECTION */}
                    <div className='flex justify-between'>
                        <div>
                            <p>Note:</p>
                            <p>The "More Description" is for the inclusion section.</p>
                        </div>
                        <div className='flex space-x-4'>
                            <button 
                            type="submit" 
                            className='bg-blue-500 text-white px-5 py-2 rounded'>Add Product</button>
                            <button 
                            type="button" 
                            className='bg-red-500 text-white px-8 py-2 rounded'
                            onClick={onclose}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
