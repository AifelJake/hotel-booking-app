import React from 'react';
import { useState, useEffect, useContext } from 'react';
import UserContext from "../UserContext"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

// images import
import hotelFacade from "../assets/img/hotelFacade.jpg";
import hotelLogo from "../assets/img/hotelLogo.webp"


const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password]);

    function authenticate(e) {
        // Prevents page redirection via form submission
        e.preventDefault();

        // Process an Axios request to the corresponding API
        axios.post("http://localhost:4002/user/login", {
            email: email,
            password: password
        })
            .then(response => {
                const data = response.data;
                // If no user info is found, the "access" property will not be available
                if (typeof data.access !== "undefined") {
                    localStorage.setItem("token", data.access);
                    retrieveUserDetails(data.access);
                    console.log("success")
                    navigate('/rooms')
                } else {
                    console.log("error")
                }
            })
            .catch(error => {
                console.error('Error:', error);

            });

        // Clear input fields after submission
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = async (token) => {
        try {
            const response = await axios.get("http://localhost:4002/user/details", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            setUser({
                id: data._id,
                isAdmin: data.isAdmin,
                email: data.email
            });
        } catch (error) {
            // Handle error
            console.error("Error retrieving user details:", error);
        }
    };

    return (
        <div className='pt-12'>
            <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-10">
                    <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    {/* Left column container */}
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">
                                            {/* Logo */}
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-[10rem]"
                                                    src={hotelLogo}
                                                    alt="logo"
                                                />
                                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold"></h4>
                                            </div>

                                            <form onSubmit={(e) => authenticate(e)}>
                                                <p className="mb-4">Please login to your account</p>
                                                {/* Username input */}
                                                <div className="relative mb-4" data-twe-input-wrapper-init>
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className=""
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] border-2"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                        required
                                                    />

                                                </div>

                                                {/* Password input */}
                                                <div className="relative mb-4" data-twe-input-wrapper-init>
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
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                        required
                                                    />

                                                </div>

                                                {/* Submit button */}
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <button
                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-[#A67B5B]"
                                                        type="submit"
                                                        data-twe-ripple-init
                                                        data-twe-ripple-color="light"

                                                    >
                                                        Log in
                                                    </button>

                                                    {/* Forgot password link */}
                                                    <a href="#!">Forgot password?</a>
                                                </div>

                                                {/* Register button */}
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 me-2">Don't have an account?</p>
                                                    <button
                                                        type="button"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                                                        data-twe-ripple-init

                                                    >
                                                        <Link to='/register'>Register</Link>
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
    );
};

export default Login;
