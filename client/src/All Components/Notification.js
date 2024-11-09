import React from 'react';
import LottieFile from './LottieFile';
import SideBar from './SideBar';
import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import Page404 from './Page404';

const Notification = () => {
  return (
    <>
      <div className="flex h-[calc(100vh-0rem)] mt-1 opacity-1">
        <LottieFile />
        <SideBar />
        <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
          {/* Sticky header for the member list and search bar */}
          <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
            <div className="p-3 mb-3 bg-blue-gray-50 rounded-border">
              <Typography variant="md" color="blue-gray" className="font-bold">
                Stay Informed, Stay Engaged:
              </Typography>
              <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
              We are thrilled to introduce our brand-new notification feature, designed to revolutionize how you stay connected and informed within our organization! 🎉✨<br />

              With this feature, you'll never miss an important update, event, or announcement again. Whether it’s key company news, team updates, or upcoming events, you’ll be the first to know! 🚀📅<br />
              </Typography>
            </div>

            <div className='flex flex-col gap-2'>
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold">
              Date: <Chip color='indigo' value="30th Sept 2024" className='text-white bg-black font-bold inline-block pt-2' />
              </Typography>
            
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold">
              Sent By: <Chip value="Senior HR" className='text-white bg-black font-bold inline-block pt-2' />
              </Typography>
            </div>

          </div>

          {/* Scrollable card body for the table */}
          <div className="mt-1">
            <CardBody className="h-[calc(100vh-8rem)] overflow-y-auto px-4 py-3 text-gray-700 rounded-xl border border-gray-300 bg-transparent">
              <div className="p-3 mb-3 bg-blue-gray-50 rounded-border">
                <div className="mb-6 w-1/2">
                  <Typography variant="lg" color="blue-gray" className="font-bold">Subject: Exciting New Notification Feature  for Employees</Typography>
                </div>
                <div className="mb-6">
                    <Typography variant="sm" color="gray" 
                    className="font-normal text-blue-gray-500 mb-3">Dear Folks,🍻</Typography>
                    <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
                     <Page404/>
                    </Typography>
                </div>
                <div className="mt-8">
                    <Typography className="font-bold text-black">Best Regards,</Typography>
                    <Typography variant="sm" color="gray" 
                    className="font-normal text-blue-gray-500">Head HR</Typography>
                    <Typography variant="sm" color="gray" 
                    className="font-normal text-blue-gray-500 mb-3">EdiGlobe</Typography>
                </div>
              </div>
            </CardBody>
          </div>

        </Card>
      </div>
    </>
  );
};

export default Notification;
