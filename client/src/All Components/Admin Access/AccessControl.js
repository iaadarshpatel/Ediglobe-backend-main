import React from 'react'
import SideBar from '../Roles/SideBar.js';
import LottieFile from '../LottieFile.js';
import { Card, Typography } from '@material-tailwind/react';

const AccessControl = () => {
  return (
    <>
        <div className="flex h-full mt-1 opacity-1">
        <LottieFile />
        <SideBar />
        <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
        <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
        <Typography variant="md" color="blue-gray" className="font-bold">
                Revenue Details💰:
              </Typography>
        </div>
        </Card>
        </div>
    </>
  )
}

export default AccessControl
