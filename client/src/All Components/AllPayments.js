import React, { useState } from 'react'
import SideBar from "./SideBar";
import LottieFile from './LottieFile';
import './style.css';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Card, Input, Typography, CardBody, Chip, } from "@material-tailwind/react";
import useSWR from 'swr';
import config from "../config.js";

const TABLE_HEAD = ["Student Name", "Date", "Contact", "Amount Pitched", "Amount Paid", "Amount Due", "Last Date", "Ob Form", "Domain", "Payment Status"];

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {TABLE_HEAD.map((_, index) => (
      <td key={index} className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
    ))}
  </tr>
);

const AllPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');

  const Employee_Id = localStorage.getItem('employeeId');
  const token = localStorage.getItem("Access Token")
  const fetcher = (url) => fetch(url, {
    headers: {
      Authorization: token
    }
  }).then((res) => res.json());
  const { data, error } = useSWR(`${config.hostedUrl}/payment/allpayments/${Employee_Id}`, fetcher);

  const monthlySales = data?.monthlyCount || "Loading...";
  const totalObMonths = data?.totalMonths || [];
  const monthOptions = totalObMonths ? totalObMonths.map(month => ({ label: month, key: month })) : [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const payments = data?.payments || [];

  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchQuery.toLowerCase();
    const isMatchingMonth = selectedTab === 'All' || payment.Month === selectedTab;
    return (
      (payment.student_name.toLowerCase().includes(searchLower) ||
        payment.email.toLowerCase().includes(searchLower)) &&
      isMatchingMonth
    );
  });

  let totalRevenueProjected = 0;
  let totalAmountReceived = 0;
  let ObFormFilled = 0;
  let ObFormNotFilled = 0;

  filteredPayments.forEach(payment => {
    if (selectedTab === 'All' || selectedTab.includes(payment.Month)) {
      totalRevenueProjected += payment.amount_pitched;
      totalAmountReceived += payment.amount_pitched - payment.amount_due;
    }
  });

  filteredPayments.forEach(payment => {
    if (selectedTab === 'All' || selectedTab.includes(payment.Month)) {
      if (payment.ob_month !== "Not Filled") {
        ObFormNotFilled += 1;
      } else if (payment.ob_month === "Not Filled") {
        ObFormFilled += 1;
      }
    }
  });

  function formatDateString(dateString) {
    const normalizedDateString = dateString.replace('T', ' ').replace('Z', '');

    // List of possible date formats
    const dateFormats = [
      'YYYY-MM-DD HH:mm:ss',
      'YYYY-MM-DD',
      'DD-MM-YYYY HH:mm:ss',
      'DD-MM-YYYY',
      'MM-YYYY-DD',
      'YYYY/MM/DD HH:mm:ss',
      'YYYY/MM/DD',
      'DD/MM/YYYY HH:mm:ss',
      'DD/MM/YYYY',
      'MM/YYYY/DD',
      'DD/MM/YYYY, HH:mm:ss', // Added support for this format
    ];

    // Attempt to parse the date string using the recognized formats
    let date;
    for (const format of dateFormats) {
      const parts = normalizedDateString.split(/[-/,\s]/); // Split by '-', '/', ',', and whitespace for flexible parsing
      if (format === 'YYYY-MM-DD' || format === 'YYYY-MM-DD HH:mm:ss') {
        const regex = /\d{4}-\d{2}-\d{2}/;
        if (regex.test(normalizedDateString)) {
          date = new Date(normalizedDateString);
          break;
        }
      } else if (format === 'DD-MM-YYYY' || format === 'DD-MM-YYYY HH:mm:ss') {
        if (parts.length === 3) {
          date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD
          break;
        }
      } else if (format === 'MM-YYYY-DD') {
        if (parts.length === 3) {
          date = new Date(`${parts[1]}-${parts[0]}-${parts[2]}`); // Convert to YYYY-MM-DD
          break;
        }
      } else if (format === 'DD/MM/YYYY' || format === 'DD/MM/YYYY HH:mm:ss') {
        if (parts.length === 3) {
          date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD
          break;
        }
      } else if (format === 'DD/MM/YYYY, HH:mm:ss') {
        // Modify this block to parse the date correctly
        if (parts.length >= 3) {
          date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD
          break;
        }
      }
    }

    // Check if the date is valid
    if (!date || isNaN(date.getTime())) return null;

    // Format the date to DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Console log the result in DD/MM/YYYY format
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate; // Return the formatted date
  }

  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div className="flex h-full mt-1 opacity-1">
        <LottieFile />
        <SideBar />
        <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
          {/* Sticky header for the member list and search bar */}
          <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
            <div className="p-3 mb-3 bg-blue-gray-50 rounded-border">
              <Typography variant="md" color="blue-gray" className="font-bold">
                Revenue Details💰:
              </Typography>
              <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
                This tab contains all the revenue details starting August'24 month.<br />
              </Typography>
            </div>

            <div className='pt-1 mb-2 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold mt-1 flex items-center">
                Daily Payments:
                <span className="text-green-500 ml-2">Count of Payments</span>
                <Chip color='indigo' value="Coming Soon" className='text-white bg-black font-bold inline-block pt-2 ml-1' />
                {/* Vertical line */}
                <span className="mx-4 border-l border-gray-500 h-6 inline-block"></span>
                <span className="text-red-500">Amount Received</span>
                <Chip color='indigo' value="Coming Soon" className='text-white bg-black font-bold inline-block pt-2 ml-1' />
              </Typography>
            </div>
            <div className='pt-1 mb-2 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold mt-1 flex items-center">
                Total Payments:
                <span className="text-green-500 ml-2">Count of Payments</span>
                <Chip color='indigo' value={monthlySales[selectedTab]} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
                {/* Vertical line */}
                <span className="mx-4 border-l border-gray-500 h-6 inline-block"></span>
                <span className="text-red-500">Amount Received</span>
                <Chip color='indigo' value={totalAmountReceived} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
                {/* Vertical line */}
                <span className="mx-4 border-l border-gray-500 h-6 inline-block"></span>
                <span className="text-purple-500">Revenue Projected</span>
                <Chip color='indigo' value={totalRevenueProjected} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
              </Typography>
            </div>
            <div className='pt-1 mb-2 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold mt-1 flex items-center">
                Onboarding Form:
                <span className="text-green-500 ml-2">Filled</span>
                <Chip color='indigo' value={ObFormNotFilled} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
                {/* Vertical line */}
                <span className="mx-4 border-l border-gray-500 h-6 inline-block"></span>
                <span className="text-red-500">Not Filled</span>
                <Chip color='indigo' value={ObFormFilled} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-4">
                <Typography variant="md" color="blue-gray" className="whitespace-nowrap">
                  Select Month:
                </Typography>
                {monthOptions.length === 0 ? (
                  <div className="text-gray-500">No Months</div>
                ) : (
                  <select
                    value={selectedTab}
                    onChange={handleDropdownChange}
                    className="block w-auto max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-900/10 sm:text-md"
                  >
                    {monthOptions.map(({ key, label }) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
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
          </div>

          {/* Scrollable card body for the table */}
          <div className="mt-1">
            <CardBody className="h-screen overflow-y-auto px-0 text-gray-700 rounded-xl border border-gray-300">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left border-collapse">
                  <thead className="bg-blue-gray-50/50 sticky top-0 z-10">
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none text-black"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {!data ? (
                      Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : filteredPayments.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center p-4">No Payments found</td>
                      </tr>
                    ) : (
                      filteredPayments.map((payment, index) => {
                        const isLast = index === filteredPayments.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        const formattedDate = formatDateString(payment.date);
                        return (
                          <tr key={payment.Unique_Id}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {payment.student_name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    {payment.email}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {formattedDate}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.phone}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.amount_pitched}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.amount_paid}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.amount_due}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.last_date}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.ob_month}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {payment.domain_opted}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className={`font-bold text-xs text-center border border-black rounded-md px-2 py-1 ${payment.payment_status === 'PAID' ? 'bg-green-500 text-white' :
                                    payment.payment_status === 'NOT INTERESTED' ? 'bg-red-200 text-black' :
                                      payment.payment_status === 'NO RESPONSE' ? 'bg-yellow-200 text-black' :
                                        payment.payment_status === 'College Issue' ? 'bg-orange-200 text-black' : 
                                          payment.payment_status === 'REFUND' ? 'bg-red-500 text-white' :
                                            payment.payment_status === 'MORE TIME REQ.' ? 'bg-blue-200 text-black' :
                                              payment.payment_status === 'WRONG PITCH' ? 'bg-brown-700 text-white' :
                                                payment.payment_status === 'PARTIAL PAYMENT' ? 'bg-green-200 text-black' :
                                                  payment.payment_status === 'SPAM' ? 'bg-gray-400 text-black' :
                                                    payment.payment_status === 'Will update' ? 'bg-purple-200 text-black' :
                                                    payment.payment_status === 'College Issue' ? 'bg-pink-200 text-black' :
                                                    payment.payment_status === 'DEMO' ? 'bg-purple-200 text-black' :
                                                      'bg-black text-white'  // Default to black background with white text
                                  }`}
                              >
                               {payment.payment_status || 'Not Updated yet'}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })
                    )}

                  </tbody>
                </table>
              </div>
            </CardBody>
          </div>

        </Card>
      </div>
    </>
  );
}

export default AllPayments