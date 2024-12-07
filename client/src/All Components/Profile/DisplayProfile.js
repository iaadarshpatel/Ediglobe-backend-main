import React from 'react'
import SideBar from '../Roles/SideBar';
import LottieFile from '../LottieFile';
import { Card, CardBody } from '@material-tailwind/react';
import ProfileSection from './ProfileSection';

const DisplayProfile = () => {
    return (
        <>
            <div className="flex h-full mt-1 opacity-1">
                <LottieFile />
                <SideBar />
                <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
                    <div className="mt-1">
                        <CardBody className="h-full overflow-y-auto px-4 py-3 text-gray-700 rounded-xl border border-gray-300">
                            <ProfileSection />
                        </CardBody>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DisplayProfile