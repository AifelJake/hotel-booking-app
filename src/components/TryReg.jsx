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
            images: ['', '', '', '', ''],
            price: ''
        });

        // Function to handle form input changes
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        // Function to handle image file input changes
        const handleImageChange = (e, index) => {
            const files = Array.from(e.target.files);
            // Update the image at the specified index in the images array
            setFormData(prevState => {
                const updatedImages = [...prevState.images];
                updatedImages[index] = files[0];
                return {
                    ...prevState,
                    images: updatedImages
                };
            });
        };

        // Function to handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();

            // Create FormData object for sending form data
            const formDataToSend = new FormData();
            for (let key in formData) {
                if (key === 'images') {
                    formData[key].forEach((image, index) => {
                        formDataToSend.append(`images`, image); // Append each image with the same key name
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            try {
                // Send form data to backend for product registration
                const response = await axios.post('http://localhost:4002/product/registerProducts', formDataToSend);
                console.log(response.data); // Log response data
            } catch (error) {
                console.error('Error registering product:', error); // Log error if request fails
            }
        };

        return (
            <div className='mt-[12%]'>
                <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Product Form</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                            <input className="w-full px-3 py-2 border rounded-md" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        {/* Person */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="person">Person</label>
                            <input className="w-full px-3 py-2 border rounded-md" type="number" id="person" name="person" value={formData.person} onChange={handleChange} />
                        </div>
                        {/* Bed */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="bed">Bed</label>
                            <input className="w-full px-3 py-2 border rounded-md" type="text" id="bed" name="bed" value={formData.bed} onChange={handleChange} />
                        </div>
                        {/* Bathroom */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="bathroom">Bathroom</label>
                            <input className="w-full px-3 py-2 border rounded-md" type="number" id="bathroom" name="bathroom" value={formData.bathroom} onChange={handleChange} />
                        </div>
                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
                            <textarea className="w-full px-3 py-2 border rounded-md" id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        {/* More Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="moreDescription">More Description</label>
                            <textarea className="w-full px-3 py-2 border rounded-md" id="moreDescription" name="moreDescription" value={formData.moreDescription} onChange={handleChange} />
                        </div>
                        {/* Image Upload */}
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor={`image${index + 1}`}>Image {index + 1}</label>
                                <input className="w-full" type="file" id={`image${index + 1}`} name={`images`} accept="image/*" onChange={(e) => handleImageChange(e, index)} />
                            </div>
                        ))}
                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Price</label>
                            <input className="w-full px-3 py-2 border rounded-md" type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
                        </div>
                        {/* Submit Button */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    export default TryReg;
