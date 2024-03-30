import React, { useState } from 'react';
import axios from 'axios';

function TryReg() {
    const [formData, setFormData] = useState({
        name: '',
        person: '',
        bed: '',
        bathroom: '',
        description: '',
        moreDescription: '',
        images: [],
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, ...files] // Append new files to the existing images array
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('person', formData.person);
        formDataToSend.append('bed', formData.bed);
        formDataToSend.append('bathroom', formData.bathroom);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('moreDescription', formData.moreDescription);
        formData.images.forEach((image, index) => {
            console.log(image)
            formDataToSend.append(`images`, image); // Appending all images with the same name
        });
        formDataToSend.append('price', formData.price);

        try {
            const response = await axios.post('http://localhost:4002/product/registerProducts', formDataToSend);
            console.log(response.data); // Do something with the response if needed
        } catch (error) {
            console.error('Error registering product:', error);
        }
    };

    return (
        <div className='mt-[12%]'>
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Product Form</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border rounded-md" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="person">Person</label>
                        <input className="w-full px-3 py-2 border rounded-md" type="number" id="person" name="person" value={formData.person} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="bed">Bed</label>
                        <input className="w-full px-3 py-2 border rounded-md" type="text" id="bed" name="bed" value={formData.bed} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="bathroom">Bathroom</label>
                        <input className="w-full px-3 py-2 border rounded-md" type="number" id="bathroom" name="bathroom" value={formData.bathroom} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
                        <textarea className="w-full px-3 py-2 border rounded-md" id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="moreDescription">More Description</label>
                        <textarea className="w-full px-3 py-2 border rounded-md" id="moreDescription" name="moreDescription" value={formData.moreDescription} onChange={handleChange} />
                    </div>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor={`image${index + 1}`}>Image {index + 1}</label>
                            <input className="w-full" type="file" id={`image${index + 1}`} name="images" accept="image/*" onChange={handleImageChange} />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Price</label>
                        <input className="w-full px-3 py-2 border rounded-md" type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TryReg;
