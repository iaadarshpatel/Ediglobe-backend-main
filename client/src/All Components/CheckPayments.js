import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { Chip, Typography } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Typewriter from 'typewriter-effect';
import LottieFile from "./LottieFile";
import useSWR from 'swr';
import LoginToastMessage from "./LoginToastMessage";

const CheckPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cache, setCache] = useState({});
  const [disabled, setDisabled] = useState(false); 
  const [showToast, setShowToast] = useState(false); 
  const navigate = useNavigate();

  const token = localStorage.getItem("Access Token");
  const fetcher = (url) =>
    fetch(url, {
        headers: {
            Authorization: token,
        },
    }).then((res) => res.json());
  const { data, error: swrError } = useSWR('https://ediglobe-backend-main.onrender.com/paymentCount/payment/count', fetcher, {
    refreshInterval: 4000,
  });

  const postSalesCountNumber = data && typeof data.postSalesCount === 'number' ? data.postSalesCount : "Loading..";
  const salesCountNumber = data && typeof data.salesCount === 'number' ? data.salesCount : "Loading...";

  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString('en-GB');

  const storeInCache = (data) => {
    const identifiers = [data.id, data.order_id, data.email];
    setCache((prevCache) => {
      const newCache = { ...prevCache };
      identifiers.forEach((id) => {
        if (id) {
          newCache[id] = data;
        }
      });
      return newCache;
    });
  };

  // Fetch user data from the API
  const getUserData = async (query) => {
    if (cache[query]) {
      setResult(cache[query]);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("Access Token");
      const response = await axios.get(`https://ediglobe-backend-main.onrender.com/paymentCount/searchpayment/${query}`, {headers: {
        Authorization: token
      }});
      if (response.data) {
        setResult(response.data);
        storeInCache(response.data);
        setError(null);
      } else {
        setResult(null);
        setError("No payment found for the provided details.");
      }
    } catch (err) {
      setResult(null);
      setError("Please enter valid details.");
    } finally {
      setIsLoading(false);
      // Disable the button after 2 seconds
      setTimeout(() => {
        setDisabled(true);
      }, 2000);
    }
  };

  // Handle check button click
  const handleCheck = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setDisabled(false); // Enable button before making the request
    getUserData(searchQuery);
  };

  // Handle clearing the search
  const handleClear = () => {
    setSearchQuery("");
    setResult(null);
    setError(null);
    setDisabled(false); // Re-enable the button after clearing
  };

  // Logout logic
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/Employeelogin', { replace: true }); // Redirect if not logged in
    } else {
      // Show toast message after successful login
      setShowToast(true); // Show the toast message when logged in
    }
  }, [navigate]);

  // Helper function to get the day with suffix
  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`; // All days from 4th to 20th
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp (in seconds) to milliseconds
    const day = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // Convert to 12-hour format

    return `${day} ${month} ${year}, ${formattedHour}:${minutes}${ampm}`;
  };

  return (
    <>
      {/* Render LoginToastMessage only when showToast is true */}
      {showToast && <LoginToastMessage />}
      <div className="flex h-[calc(100vh-0rem)] opacity-1 z-10 mt-1">
        <LottieFile />
        <SideBar />
        <div className="flex-1 flex items-center justify-center mx-2 p-9 z-10">
        <div className="absolute top-4 right-8 p-1 border-2 border-black flex flex-col md:flex-row items-center">
        {isLoading ? (
            <Chip color='indigo' value="Loading..." className='normal-case text-white bg-black font-bold inline-block pt-2 ml-1' />
        ) : swrError ? (
              <div className="flex space-x-4">
                <div className="h-6 w-12 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-6 w-12 bg-gray-300 animate-pulse rounded"></div>
            </div>
        ) : (
          <div>
            <span className="text-black-500 font-bold">Today's Date: {formattedDate} </span>
            <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold flex items-center">
                <span className="text-lg md:text-base">Daily Payment Count:</span>
                <span className="text-green-500 ml-2 text-lg md:text-base">Sales</span>
                <Chip color='indigo' value={salesCountNumber} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
                {/* Vertical line */}
                <span className="mx-2 md:mx-4 border-l border-gray-500 h-6 inline-block"></span>
                <span className="text-red-500 text-lg md:text-base">Post Sales</span>
                <Chip color='indigo' value={postSalesCountNumber} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
            </Typography>
          </div>
        )}
        </div>
          <Typography>
            <div className="min-h-full flex flex-col justify-center">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={handleCheck} method="POST" className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl ">
                      Check Your Current
                      <Typewriter
                        options={{
                          strings: [`<span style="color: #1e2a5a";">Payment Status!</span>`],
                          autoStart: true,
                          loop: true,
                          delay: 200, // Adjust typing speed
                          deleteSpeed: 100, // Adjust delete speed
                        }}
                      />
                    </h1>

                    <div variant="small" className="font-normal opacity-80 py-4">
                      <b style={{ color: "red", fontWeight: "bold", backgroundColor: "white" }}>Note:</b> <span>Enter payment ID, order ID, or Email. It only shows payment with the status <mark className="font-bold"> Captured </mark >.</span>
                    </div>

                    <div className="mt-2">
                      <input
                        id="searchQuery"
                        name="searchQuery"
                        type="text"
                        required
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter payment ID, order ID or Email"
                        className={`block w-full rounded-md p-2 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6
                      ${isLoading || error ? 'bg-gray-200 text-gray-500 cursor-not-allowed ring-gray-200' : 'border-1 text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'}`}
                        disabled={isLoading || error} // Disable input while loading
                      />
                    </div>
                  </div>
                  <div>

                    <div className="flex justify-center space-x-4 mt-4">
                      <button
                        type="submit"
                        className="flex w-3/12 justify-center rounded-md bg-black py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={disabled || isLoading}
                      >
                        {isLoading ? (
                          <Hourglass
                            visible={true}
                            height="24"
                            width="20"
                            ariaLabel="hourglass-loading"
                            colors={['white']}
                          />
                        ) : (
                          "Check"
                        )}
                      </button>

                      {/* Conditionally render the "Clear" button if there's input or a result */}
                      {(searchQuery || result) && (
                        <button
                          type="button"
                          className="rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          onClick={handleClear}
                          disabled={isLoading} // Disable Clear button while loading
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Display the result card if payment data is found */}
              {result && (
                <div className="card mt-4 px-2 py-4 border-2 border-black shadow-lg rounded-md">
                  <div className="card-body">
                    <u className="font-bold">Payment Details:</u>
                    <p><strong>Payment ID:</strong> {result.id}</p>
                    <p><strong>Amount:</strong> {result.amount / 100}</p>
                    <p><strong>Currency:</strong> {result.currency}</p>
                    <p><strong>Status:</strong> <b style={{ color: "#00C000" }}>{result.status}</b></p>
                    <p><strong>Order ID:</strong> {result.order_id}</p>
                    <p><strong>Method:</strong> {result.method}</p>
                    <p><strong>Email:</strong> {result.email}</p>
                    <p><strong>Date:</strong> {formatDate(result.created_at)}</p>
                  </div>
                </div>
              )}

              {/* Display error if any */}
              {error && <div className="font-medium p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{error}</div>}
            </div>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default CheckPayments;
