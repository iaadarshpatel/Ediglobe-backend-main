import React, { useState } from 'react'
import SideBar from "./SideBar";
import LottieFile from './LottieFile';
import './style.css';
import { MagnifyingGlassIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import {Card, CardHeader, Input, Typography, CardBody, Avatar, Tooltip,} from "@material-tailwind/react";


const TABS = [
  { label: 'All', key: 'all' },
  { label: 'August 2024', key: 'August 2024' },
  { label: 'September 2024', key: 'September 2024' },
  { label: 'October 2024', key: 'October 2024' },
  { label: 'November 2024', key: 'November 2024' },
];


const TABLE_HEAD = ["Student_Name", "Contact", "Total_Amount_Pitched", "Pre_Registration", "Pending_Payment", "Month"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Alice Johnson",
    Email: "alice@example.com",
    Contact: "123456789",
    Total_Amount: "5000",
    Pre_Registration: "1000",
    Pending: 3540,
    Month: "August 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Bob Smith",
    Email: "bob@example.com",
    Contact: "123456789",
    Total_Amount: "6000",
    Pre_Registration: "1200",
    Pending: 4200,
    Month: "August 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Charlie Davis",
    Email: "charlie@example.com",
    Contact: "123456789",
    Total_Amount: "7000",
    Pre_Registration: "1500",
    Pending: 4500,
    Month: "September 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "David Lee",
    Email: "david@example.com",
    Contact: "123456789",
    Total_Amount: "8000",
    Pre_Registration: "2000",
    Pending: 5000,
    Month: "September 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Eva Brown",
    Email: "eva@example.com",
    Contact: "123456789",
    Total_Amount: "9000",
    Pre_Registration: "2500",
    Pending: 5500,
    Month: "October 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Frank Green",
    Email: "frank@example.com",
    Contact: "123456789",
    Total_Amount: "10000",
    Pre_Registration: "3000",
    Pending: 6000,
    Month: "October 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Grace Harris",
    Email: "grace@example.com",
    Contact: "123456789",
    Total_Amount: "11000",
    Pre_Registration: "3500",
    Pending: 6500,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Henry Wilson",
    Email: "henry@example.com",
    Contact: "123456789",
    Total_Amount: "12000",
    Pre_Registration: "4000",
    Pending: 7000,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Isabella Martinez",
    Email: "isabella@example.com",
    Contact: "123456789",
    Total_Amount: "13000",
    Pre_Registration: "4500",
    Pending: 7500,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Jack Thomas",
    Email: "jack@example.com",
    Contact: "123456789",
    Total_Amount: "14000",
    Pre_Registration: "5000",
    Pending: 8000,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Katie Roberts",
    Email: "katie@example.com",
    Contact: "123456789",
    Total_Amount: "15000",
    Pre_Registration: "5500",
    Pending: 8500,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Liam Walker",
    Email: "liam@example.com",
    Contact: "123456789",
    Total_Amount: "16000",
    Pre_Registration: "6000",
    Pending: 9000,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Mia King",
    Email: "mia@example.com",
    Contact: "123456789",
    Total_Amount: "17000",
    Pre_Registration: "6500",
    Pending: 9500,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Nathan Scott",
    Email: "nathan@example.com",
    Contact: "123456789",
    Total_Amount: "18000",
    Pre_Registration: "7000",
    Pending: 10000,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Olivia Adams",
    Email: "olivia@example.com",
    Contact: "123456789",
    Total_Amount: "19000",
    Pre_Registration: "7500",
    Pending: 10500,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Paul Baker",
    Email: "paul@example.com",
    Contact: "123456789",
    Total_Amount: "20000",
    Pre_Registration: "8000",
    Pending: 11000,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Quinn Carter",
    Email: "quinn@example.com",
    Contact: "123456789",
    Total_Amount: "21000",
    Pre_Registration: "8500",
    Pending: 11500,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Rachel Edwards",
    Email: "rachel@example.com",
    Contact: "123456789",
    Total_Amount: "22000",
    Pre_Registration: "9000",
    Pending: 12000,
    Month: "November 2024"
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    Name: "Sam Foster",
    Email: "sam@example.com",
    Contact: "123456789",
    Total_Amount: "23000",
    Pre_Registration: "9500",
    Pending: 12500,
    Month: "November 2024"
  }
];


const PendingPayment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const filteredRows = TABLE_ROWS.filter((row) => {
    const searchLower = searchQuery.toLowerCase();
    const isMatchingMonth = selectedTab === 'all' || row.Month === selectedTab;
    return (
      (row.Name.toLowerCase().includes(searchLower) ||
        row.Email.toLowerCase().includes(searchLower)) &&
      isMatchingMonth
    );
  });

  const rowCount = filteredRows.length;
  const totalSum = filteredRows.reduce((acc, row) => acc + (parseFloat(row.Pending) || 0), 0);

  return (
    <>
      <div className="flex h-[calc(100vh-0rem)] opacity-1">
        <LottieFile />
        <SideBar />
        <Card className="h-full w-full mx-2 mt-1 opacity-1 bg-custom shadow-none">
          {/* Sticky header for the member list and search bar */}
          <div className="text-gray-700 rounded-border">
            <CardHeader
              floated={false}
              shadow={false}
              className="sticky top-0 z-10 p-4 rounded-none bg-transparent"
            >
              <div className="mb-4 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="text" color="black">
                    <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black"/>Total Pending Payments&nbsp;
                    <Tooltip
                      placement="bottom"
                      className="inline-flex border border-blue-gray-50 bg-black text-white px-4 py-3 shadow-xl shadow-black/10"
                      content={
                        <div className="w-80">
                          <Typography color="white" className="font-medium">
                            Material Tailwind
                          </Typography>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal opacity-80"
                          >
                            Material Tailwind is an easy-to-use components library for Tailwind CSS and Material Design.
                          </Typography>
                        </div>
                      }>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5 cursor-pointer text-blue-gray-500 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </Tooltip>&nbsp;: {rowCount} <br />
                    <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black"/>Total Amount&nbsp;
                    <Tooltip
                      placement="bottom"
                      className="inline-flex border border-blue-gray-50 bg-black text-white px-4 py-3 shadow-xl shadow-black/10"
                      content={
                        <div className="w-80">
                          <Typography color="white" className="font-medium">
                            Material Tailwind
                          </Typography>
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal opacity-80"
                          >
                            Material Tailwind is an easy-to-use components library for Tailwind CSS and Material Design.
                          </Typography>
                        </div>
                      }>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5 cursor-pointer text-blue-gray-500 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </Tooltip>&nbsp;: {totalSum} <br />
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    View the pending payments assigned to students for each employee
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4">
                  <Typography variant="md" color="blue-gray" className="whitespace-nowrap">
                    Select Month:
                  </Typography>
                  <select
                    value={selectedTab}
                    onChange={handleDropdownChange}
                    className="block w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-900/10 sm:text-sm"
                  >
                    {TABS.map(({ key, label }) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-72">
                  <Input
                    className="rounded-md focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    value={searchQuery} onChange={handleSearchChange} labelProps={{
                      className: "hidden",
                    }}
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    placeholder="Search Student" />
                </div>
                
              </div>
            </CardHeader>
          </div>

          {/* Scrollable card body for the table */}
          <div className="mt-1">
            <CardBody className="h-[calc(100vh-8rem)] overflow-y-auto px-0 text-gray-700 rounded-xl border border-gray-300">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map(({ img, Name, Email, Contact, Total_Amount, Pre_Registration, Pending, Month }, index) => {
                    const isLast = index === filteredRows.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={Name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={Name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {Name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {Email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Contact}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Total_Amount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Pre_Registration}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Pending}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Month}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </CardBody>
          </div>
        </Card>
      </div>
    </>
  );
}

export default PendingPayment