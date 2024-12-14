import React from 'react'
import SideBar from '../Roles/SideBar.js';
import LottieFile from '../LottieFile.js';
import { Card } from '@material-tailwind/react';

const PostNotify = () => {
  return (
    <>
        <div className="flex h-full mt-1 opacity-1">
        <LottieFile />
        <SideBar />
        <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
          <h1>Post Notification</h1> 
        </Card>
        </div>
    </>
  )
}

export default PostNotify;
