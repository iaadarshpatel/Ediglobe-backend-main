import React, { useState } from 'react'
import { Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { BanknotesIcon, ChevronDownIcon, CalendarDateRangeIcon, BellAlertIcon, ChevronRightIcon, UserCircleIcon, TableCellsIcon, UserGroupIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountTree } from 'react-icons/md';

const PostSales = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <>
            {/* Payments Accordion */}
            <Accordion open={open === 1} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}>
                <ListItem className="p-0">
                    <AccordionHeader onClick={() => handleOpen(1)} className={`border-b-0 p-3 ${open === 1 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                        <ListItemPrefix>
                            <BanknotesIcon className="h-5 w-5 text-black" />
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal">Payments</Typography>
                    </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                    <List className="p-0">
                        <Link to="/CheckPayments">
                            <ListItem className="cursor-pointer">
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Check Payment
                            </ListItem>
                        </Link>
                        <Link to="/AllPayments">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                All Payments
                            </ListItem>
                        </Link>
                    </List>
                </AccordionBody>
            </Accordion>

            {/* Attendance Accordion */}
            <Accordion open={open === 2} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}>
                <ListItem className="p-0">
                    <AccordionHeader onClick={() => handleOpen(2)} className={`border-b-0 p-3 ${open === 2 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                        <ListItemPrefix>
                            <CalendarDateRangeIcon className="h-5 w-5 text-black" />
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal">Attendance</Typography>
                    </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                    <List className="p-0">
                        <Link to="/Attendance">
                            <ListItem className="cursor-pointer">
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Attendance Details
                            </ListItem>
                        </Link>
                    </List>
                </AccordionBody>
            </Accordion>

            <hr className="my-2 border-black-gray-50" />

            <ListItem onClick={() => navigate("/Notification")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <BellAlertIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Notification
            </ListItem>

            <ListItem onClick={() => navigate("/LeadsDistribution")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <TableCellsIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Potential Leads
            </ListItem>
            <ListItem onClick={() => navigate("/leadgen")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Self Gen. Leads
            </ListItem>

            <ListItem onClick={() => alert("Coming Soon!")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <MdAccountTree className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Team
                <span className="inline-flex items-center rounded-md ml-1 bg-black px-2 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20">
                    Coming Soon
                </span>
            </ListItem>

            <ListItem onClick={() => navigate("/DPS")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <NewspaperIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                DPS.
            </ListItem>
            <ListItem onClick={() => navigate("/profile")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Profile
            </ListItem>

        </>
    )
}

export default PostSales
