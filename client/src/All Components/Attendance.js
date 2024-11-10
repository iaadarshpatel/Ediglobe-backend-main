import React from 'react';
import SideBar from './SideBar';
import { Card } from '@material-tailwind/react';
import LottieFile from './LottieFile';
import EmojiAttendance from './EmojiAttendance';
import Calendar from './Calander';

const Attendance = () => {
    return (
        <div className="flex h-[calc(100vh-0rem)] mt-1 opacity-1">
            <LottieFile />
            <SideBar />
            <Card className="h-full w-full bg-custom shadow-none">
                <div className="sticky mt-1 pt-3 pb-4 z-10 mx-2 rounded-border bg-transparent">
                    <EmojiAttendance/>
                </div>
                {/* Scrollable card body for the table */}
                <div className="mt-1 pt-3 pb-4 z-10 mx-2 rounded-border bg-transparent">
                <Calendar/>
                </div>
            </Card>
        </div>
    );
};

export default Attendance;
