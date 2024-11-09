import React from 'react'
import LottieFile from '../LottieFile'
import SideBar from '../SideBar'
import { Card, Typography } from '@material-tailwind/react'
import Tree from './Tree'

const TeamStructure = () => {
    return (
        <>
            <div className="flex h-[calc(100vh-0rem)] mt-1 opacity-1">
                <LottieFile />
                <SideBar />
                <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
                    <div className="mt-1 h-full pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
                        <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
                            <Typography variant="md" color="blue-gray" className="font-bold">
                                Team Structure
                            </Typography>
                        </div>

                        <div className="mt-2 p-3 mb-3 bg-blue-gray-50 rounded-border flex justify-center">
                            <Tree />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default TeamStructure