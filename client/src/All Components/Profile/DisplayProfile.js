import React from 'react'
import SideBar from '../SideBar';
import LottieFile from '../LottieFile';
import { Card } from '@material-tailwind/react';
import ProfileSection from './ProfileSection';

const DisplayProfile = () => {
    return (
        <>
            <div className="flex h-full mt-1 opacity-1">
                <LottieFile />
                <SideBar />
                <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
                    <div className="mt-1 h-full pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
                        <ProfileSection/>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DisplayProfile