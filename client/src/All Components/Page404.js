import {Typography } from '@material-tailwind/react';
import React from 'react';
import errorImg from '../assets/error.svg';
import { BellSlashIcon } from '@heroicons/react/24/solid';

const Page404 = () => {
  return (
    <div className="mx-auto grid place-items-center text-center">
      <div>
      <div className="flex justify-center">
          <img src={errorImg} alt="Error_Img" className="w-96 h-96" />
        </div>
        <div className="flex justify-center items-center space-x-2">
          <Typography
            variant="h1"
            color="blue-gray"
            className="font-large">Nothing to see here! 
          </Typography>
          <BellSlashIcon className="w-10 h-10 text-black" />
          </div>
        <Typography className="mt-4 mb-14 text-[20px] font-normal text-gray-500 mx-auto md:max-w-sm">
        No pings, no distractions. This is your moment to get ahead—let's make today count! 🚀💪
        </Typography>
      </div>
    </div>
  );
};

export default Page404;
