import React, { useState } from 'react'
import { Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { BanknotesIcon, ChevronDownIcon, ChatBubbleLeftRightIcon, ChevronRightIcon, UserGroupIcon, LockClosedIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountTree } from 'react-icons/md';

const Admin = () => {
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

            <hr className="my-2 border-black-gray-50" />

            <ListItem onClick={() => navigate("/onboard")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <BriefcaseIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Let's Onboard
            </ListItem>

            <ListItem onClick={() => navigate("/accesscontrol")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <LockClosedIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Access Control
            </ListItem>

            <ListItem onClick={() => navigate("/leadsassign")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Leads Assigning
            </ListItem>

            <ListItem onClick={() => navigate("/postnotification")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Post Notification
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
        </>
    )
}

export default Admin
