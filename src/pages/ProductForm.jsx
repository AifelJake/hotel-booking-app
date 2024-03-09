import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
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
        console.log(formData)
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
        <form onSubmit={handleSubmit} className='mt-[100px]'>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="number" name="person" value={formData.person} onChange={handleChange} placeholder="Person" />
            <input type="text" name="bed" value={formData.bed} onChange={handleChange} placeholder="Bed" />
            <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} placeholder="Bathroom" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <textarea name="moreDescription" value={formData.moreDescription} onChange={handleChange} placeholder="More Description" />
            <input type="file" name="image" onChange={handleImageChange} />

            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
            <input type="number" name="numberOfStock" value={formData.numberOfStock} onChange={handleChange} placeholder="Number of Stock" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
