import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Input, Button, CardBody, CardHeader, Typography, Chip } from "@material-tailwind/react";
import logo from '../assets/logo_1.png';
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import Lottie from 'react-lottie';
import loti2 from '../assets/loti_file.json'
import Typewriter from 'typewriter-effect';
import './style.css';


function Login() {
    const navigate = useNavigate();
    const [employeeCode, setEmployeeCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const [showButton, setShowButton] = useState(false); 
    const [error, setError] = useState('');
    const logOutTimer = 7200000; // 2 hours in milliseconds
    const logoutTimerRef = useRef(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const loginTime = localStorage.getItem('loginTime');
    
        if (isLoggedIn && loginTime) {
            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - parseInt(loginTime, 10);
    
            if (timeElapsed >= logOutTimer) {
                handleLogout(); // Auto logout if the time elapsed exceeds the logout timer
            } else {
                const timeRemaining = logOutTimer - timeElapsed;
                setTimeout(handleLogout, timeRemaining); // Set timeout for remaining time
            }
        }
        if(isLoggedIn){
            navigate('/CheckPayments', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setShowButton(false);
    
        if (!employeeCode || !password) {
            setError('Please fill in both fields');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post('https://ediglobe-backend-main.onrender.com/employee/auth/login', { employeeCode, password });
            
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("Access Token", token);
                
                // Clear existing timer if any
                if (logoutTimerRef.current) {
                    clearTimeout(logoutTimerRef.current);
                }
    
                // Set new logout timer
                logoutTimerRef.current = setTimeout(handleLogout, logOutTimer);
    
                const loginTime = new Date().getTime();
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('employeeId', employeeCode);
                localStorage.setItem('Employee_Name', response.data.Employee_Name);
                localStorage.setItem('loginTime', loginTime);
    
                setTimeout(() => {
                    setLoading(false);
                    setShowButton(true);
                    navigate('/CheckPayments', { replace: true });
                }, 2000);
            } else {
                setError('Invalid Employee Code or Password');
                setLoading(false);
                setTimeout(() => setError(''), 5000);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid Employee Code or Password');
            setLoading(false);
            setTimeout(() => setError(''), 5000);
        }
    };
    
    
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('employeeId');
        localStorage.removeItem('Employee_Name');
        localStorage.removeItem('loginTime');
        navigate('/Employeelogin', { replace: true });
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loti2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <section className="px-8 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto flex w-full max-w-screen-xl h-auto">
                <div className="flex w-full">
                    {/* Lottie Animation */}
                    <div className="w-1/2 flex justify-center items-center lotti-slide-in-left">
                        <Lottie options={defaultOptions} height={400} width={400} />
                    </div>
                    {/* Login Form */}
                    <div className="w-1/2 flex flex-col items-center justify-center">
                        <img src={logo} alt="Logo" className="h-20 element-slide-in-up" />
                        <Card
                            shadow={false}
                            className="md:px-18 md:py-10 border border-gray-300 element-slide-in-left"
                        >
                            <CardHeader shadow={false} floated={false} className="text-center">
                                <div className="flex items-center justify-center">
                                    <Chip className="rounded-full w-auto bg-black"
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-full w-full -translate-x-0.5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                            </svg>
                                        }
                                        value={
                                            <Typography
                                                variant="small"
                                                color="white"
                                                className="text-xs capitalize leading-none">
                                                Exciting News! Introducing our latest Dashboard
                                            </Typography>
                                        }
                                    />
                                </div>
                                <h4 className="block mt-4 antialiased tracking-normal font-sans font-semibold text-blue-gray-900 w-full leading-snug !text-1xl lg:max-w-2xl lg:!text-3xl">
                                    Simplify your workflow with our <br /> all-in-1
                                    <span className="text-green-500 leading-snug">
                                        <Typewriter
                                            options={{
                                                strings: [`<span>Dashboard!</span>`],
                                                autoStart: true,
                                                loop: true,
                                                delay: 200, // Adjust typing speed
                                                deleteSpeed: 100, // Adjust delete speed
                                            }}
                                        />
                                    </span>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:mt-8">
                                    <div>
                                        <label htmlFor="email">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="block font-medium mb-2">
                                                Employee Id
                                            </Typography>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Employee Id"
                                            className="w-full border-2 border-dashed !border !border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                            value={employeeCode}
                                            disabled={loading}
                                            onChange={(e) => setEmployeeCode(e.target.value)}
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            icon={<UserIcon className="h-5 w-5 absolute left-1 text-black" />}
                                            containerProps={{ className: "min-w-[100px]" }}
                                        />
                                        <label htmlFor="password">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="block font-medium my-2 mb-2"
                                            >
                                                Password
                                            </Typography>
                                        </label>
                                        <Input
                                            id="password"
                                            color="gray"
                                            size="lg"
                                            type="password"
                                            name="password"
                                            disabled={loading}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border-2 border-dashed !border !border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                            labelProps={{
                                                className: "hidden",
                                            }}
                                            icon={<LockClosedIcon className="h-5 w-5 absolute left-2 text-black" />}
                                        />
                                    </div>
                                    {error && (
                                        <Typography variant="small" className="text-red-500 text-center">
                                            {error}
                                        </Typography>
                                    )}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        color="gray"
                                        className={`bg-black ${loading ? 'cursor-not-allowed' : ''}`}
                                        fullWidth
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading....' : 'Continue'}
                                    </Button>
                                    <Typography
                                        variant="medium"
                                        className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                                    >
                                        Upon signing in, you consent to abide by our{" "}
                                        <Link to="#" className="text-gray-900">
                                            Terms of Service
                                        </Link>{" "}
                                        &{" "}
                                        <Link to="#" className="text-gray-900">
                                            Privacy Policy.
                                        </Link>
                                    </Typography>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
