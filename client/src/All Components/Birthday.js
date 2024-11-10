import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Carousel } from "@material-tailwind/react";
import nobirthday from '../assets/nobirthday.webp';
import axios from 'axios';

const Birthday = () => {
  const [birthday, setBirthday] = useState([]);
  
  useEffect(() => {
    const getBirthdays = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await axios.get("http://localhost:3003/employee/allemployees", {headers: {
        Authorization: token
      }});
      setBirthday(Array.isArray(response.data) ? response.data : []);
    };
    getBirthdays();
  }, []);

  const today = new Date();
  const todayDate = today.getDate().toString().padStart(2, '0'); 
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  
  // Filter birthday array to only include employees with birthdays today
   const todayBirthdays = birthday.filter(item => {
    const [day, month] = item.DOB.split('-').map(part => part.trim()); // Split and trim the DOB into day and month
    const isBirthdayToday = day === todayDate && month === todayMonth;
    return isBirthdayToday;
  });

  return (
    <div className="relative flex flex-col justify-between mt-auto mt-2 bg-black text-white py-3 rounded-lg shadow-md">
      {todayBirthdays.length > 0 ? (
        <Carousel
          loop={true}
          autoplay={true}
          autoplayDelay={1500}
          transition={{ type: "tween", duration: 0.5 }}
          prevArrow={() => null}
          nextArrow={() => null}
          className='rounded-xl'
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-3 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {todayBirthdays.map((item, index) => (
            <div key={index} className="relative flex items-center justify-center">
              <div className="absolute top-1 left-0 right-0 flex flex-col items-center justify-center opacity-15 text-5xl font-bold text-gray-200">
                <Typography variant="h4">Happy</Typography>
                <Typography variant="h1">Birthday!</Typography>
              </div>
              <div className="flex flex-col items-center rounded-lg shadow-md p-3">
                <div className="flex flex-col items-center justify-center">
                  <Typography variant="h6">Happy</Typography>
                  <Typography variant="h3" className="mt-2">Birthday!</Typography>
                </div>

                <img
                  className="relative w-24 h-24 mb-3 overflow-hidden rounded-full shadow-2xl shadow-white transition-transform duration-300 transform hover:scale-105"
                  src={item.Profile_img !== "Not Uploaded" ? item.Profile_img : nobirthday}
                  alt="{`${item.Employee_Name} image`}"
                />
                <h5 className="mb-1 text-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-500">
                  {item.Employee_Name.slice(0, 18)}
                </h5>
                <span className="text-sm font-bold text-gray-400">{item.Designation.slice(0, 18)}</span>
                <span className='inline-flex items-center px-4 py-2 text-md font-bold'>
                  DOB: {item.DOB.slice(0, 5)}
                </span>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="relative flex items-center justify-center">
          {/* Watermark */}
          <div className="absolute top-1 left-0 right-0 flex flex-col items-center justify-center opacity-15 text-5xl font-bold text-gray-200">
            <Typography variant="h4">No</Typography>
            <Typography variant="h1">Birthday!</Typography>
          </div>
          {/* Birthday Details */}
          <div className="flex flex-col items-center rounded-lg shadow-md p-3">
            <div className="flex flex-col items-center justify-center">
              <Typography variant="h6">No</Typography>
              <Typography variant="h3" className="mt-2">Birthday!</Typography>
            </div>

            <img className="w-24 h-24 mb-3 rounded-full shadow-2xl shadow-white" src={nobirthday} alt="image" />
            <span className='inline-flex items-center py-2 text-md font-bold'>
              No Birth Today! 😔
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Birthday;
