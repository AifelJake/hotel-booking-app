import React from 'react'
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';


import hotelFacade from "../assets/img/hotelFacade.jpg";
import hotelLogo from "../assets/img/hotelLogo.webp"
const Register = () => {

    const { user } = useContext(UserContext);

    //an object with methods to redirect the user
    const navigate = useNavigate();

    // State hooks to store the values of the input fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        // Prevents page redirection via form submission
        e.preventDefault();

        // Check if the email already exists
        axios.post("http://localhost:4002/user/checkEmail", {
            email: email
        })
            .then(response => {
                const emailExists = response.data;

                if (emailExists) {
                    Swal.fire({
                        title: 'Duplicate email found',
                        icon: 'error',
                        text: 'Please provide a different email.'
                    });
                } else {
                    // Register the user if the email doesn't exist
                    axios.post("http://localhost:4002/user/register", {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobileNo: mobileNo,
                        password: password1
                    })
                        .then(response => {
                            const registrationSuccessful = response.data;

                            if (registrationSuccessful) {
                                // Clear input fields
                                setFirstName('');
                                setLastName('');
                                setEmail('');
                                setMobileNo('');
                                setPassword1('');
                                setPassword2('');

                                console.log('succes')

                                // Redirect the user to the login page after successful registration
                                navigate("/login");
                            } else {
                                console.log('error')
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);

                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);

            });
    }

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if ((firstName !== '' && lastName !== '' && email !== '' && mobileNo.length === 11 && password1 !== '' && password2 !== '') && (password1 === password2)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [firstName, lastName, email, mobileNo, password1, password2]);

    return (

        (user.token !== null) ?
            <Navigate to="/rooms" />
            :
            <div className='pt-12'>
                <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                    <div className="container h-full p-10">
                        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                            <div className="w-full">
                                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                    <div className="g-0 lg:flex lg:flex-wrap">
                                        {/* Left column container */}
                                        <div className="px-4 md:px-0 lg:w-6/12">
                                            <div className="md:mx-6 md:px-12">
                                                {/* Logo */}
                                                <div className="text-center ">
                                                    <img
                                                        className="mx-auto w-[8rem]"
                                                        src={hotelLogo}
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold"></h4>
                                                </div>

                                                <form onSubmit={(e) => registerUser(e)}>
                                                    <p className="mb-4">Please create an account</p>


                                                    <div className="relative mb-4 flex justify-between" data-twe-input-wrapper-init>
                                                        {/* First Name input */}
                                                        <div>
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className=""
                                                            >
                                                                First Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                                id="exampleFormControlInput1"
                                                                placeholder="Enter first name"
                                                                value={firstName}
                                                                onChange={e => setFirstName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        {/* Last Name input */}
                                                        <div>

                                                            <label
                                                                htmlFor="exampleFormControlInput2"
                                                                className=""
                                                            >
                                                                Last Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                                id="exampleFormControlInput2"
                                                                placeholder="Enter last name"
                                                                value={lastName}
                                                                onChange={e => setLastName(e.target.value)}
                                                                required
                                                            />
                                                        </div>

                                                    </div>





                                                    <div className="relative mb-4 flex justify-between" data-twe-input-wrapper-init>
                                                        {/* Username input */}
                                                        <div>
                                                            <label
                                                                htmlFor="exampleFormControlInput3"
                                                                className=""
                                                            >
                                                                Username
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                                id="exampleFormControlInput3"
                                                                placeholder="Username"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                value={email}
                                                                required
                                                            />
                                                        </div>
                                                        {/* mobile number input */}
                                                        <div>
                                                            <label
                                                                htmlFor="exampleFormControlInput17"
                                                                className=""
                                                            >
                                                                Mobile Number
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                                id="exampleFormControlInput17"
                                                                placeholder="Password"
                                                                onChange={(e) => setMobileNo(e.target.value)}
                                                                value={mobileNo}
                                                                required
                                                            />

                                                        </div>

                                                    </div>


                                                    {/* COnfirm Password input */}
                                                    <div className="relative mb-4 flex justify-between" data-twe-input-wrapper-init>
                                                        {/* Password input */}
                                                        <div>
                                                            <label
                                                                htmlFor="exampleFormControlInput11"
                                                                className=""
                                                            >
                                                                Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                                id="exampleFormControlInput11"
                                                                placeholder="Password"
                                                                onChange={(e) => setPassword1(e.target.value)}
                                                                value={password1}
                                                                required
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="exampleFormControlInput15"
                                                                className=""
                                                            >
                                                                Confirm Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                                id="exampleFormControlInput15"
                                                                placeholder="Confirm Password"
                                                                onChange={(e) => setPassword2(e.target.value)}
                                                                value={password2}
                                                                required
                                                            />
                                                        </div>


                                                    </div>

                                                    {/* Submit button */}
                                                    <div className="mb-12 pb-1 pt-1 text-center">
                                                      
                                                            <button className="mt-3 bg-[#A67B5B]"  type="submit" id="submitBtn">
                                                                Register
                                                            </button>
                                                            
                                                           
                                                        

                                                    </div>


                                                </form>
                                            </div>
                                        </div>

                                        {/* Right column container with background and description */}
                                        <div
                                            className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                                            style={{
                                                backgroundImage: `url(${hotelFacade})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                                <h4 className="mb-6 text-xl font-semibold">
                                                    We are more than just a company
                                                </h4>
                                                <p className="text-sm">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing
                                                    elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis
                                                    nostrud exercitation ullamco laboris nisi ut aliquip ex
                                                    ea commodo consequat.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    )
}

export default Register