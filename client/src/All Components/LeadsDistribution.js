import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import LottieFile from './LottieFile';
import { Card, CardBody, Input, Typography, Button, Chip, DialogBody, DialogFooter, Dialog, DialogHeader, Tooltip } from '@material-tailwind/react';
import { MagnifyingGlassIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import useSWR from 'swr';
import SkeletonLoader from './SkeltonPgfl';
import axios from 'axios';

const statusOptions = [
  { value: '', label: 'Select Status' },
  { value: 'DNP', label: '❌ DNP' },
  { value: 'Not Interested', label: '😐 Not Interested' },
  { value: 'Busy', label: '🕒 Busy' },
  { value: 'Disconnected', label: '📞 Disconnected' },
  { value: 'Not Called Yet', label: '🚫 Not Called Yet' },
  { value: 'Course Expensive', label: '💰 Course Expensive' },
  { value: 'Follow Up', label: '🔄 Follow Up' },
  { value: 'Forced by someone', label: '🧍 Forced by someone' },
  { value: 'Already Enrolled', label: '✅ Already Enrolled' },
  { value: 'Paid', label: '💵 Paid' },
];

const leadStatusOptions = [
  { id: 'Paid', display: '💵 Paid' },
  { id: 'DNP', display: '❌ DNP' },
  { id: 'Not Interested', display: '😐 Not Interested' },
  { id: 'Busy', display: '🕒 Busy' },
  { id: 'Disconnected', display: '📞 Disconnected' },
  { id: 'Not Called Yet', display: '🚫 Not Called Yet' },
  { id: 'Course Expensive', display: '💰 Course Expensive' },
  { id: 'Follow Up', display: '🔄 Follow Up' },
  { id: 'Forced by someone', display: '🧍 Forced by someone' },
  { id: 'Already Enrolled', display: '✅ Already Enrolled' }
];

const LeadsDistribution = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [updatedLeads, setUpdatedLeads] = useState({});
  const [matchedLeads, setMatchedLeads] = useState([]);
  const [disabledLeads, setDisabledLeads] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);


  const employeeId = localStorage.getItem('employeeId');
  const token = localStorage.getItem("Access Token");
  const fetcher = (url) => fetch(url, {
    headers: {
      Authorization: token,  
    }
  }).then((res) => res.json());
  const { data, error } = useSWR('http://localhost:3003/leadsDistribute/pgfl', fetcher, {
    refreshInterval: 4000,
  });

  const fetchMatchedLeads = async () => {
    try {
      const token = localStorage.getItem("Access Token");
      const {data: leads } = await axios.get('http://localhost:3003/leads/fetchLeads',{headers: {
        Authorization: token
      }});
      // Get the current employee ID from localStorage or other sources
      const employeeId = localStorage.getItem('employeeId');

      // Filter leads by employee_id
      const filteredLeads = leads.filter(lead => lead.employee_id === employeeId);

      // Store the filtered leads in state
      setMatchedLeads(filteredLeads);

      // Set disabled state for leads that have non-empty statuses
      const disabledLeadsMap = leads.reduce((acc, lead) => {
        if (lead.status) { // If the lead status is not empty
          acc[lead.id] = true;
        }
        return acc;
      }, {});

      setDisabledLeads(disabledLeadsMap);

      // Store the disabled leads in localStorage
      localStorage.setItem('disabledLeads', JSON.stringify(disabledLeadsMap));

    } catch (error) {
      console.error('Error fetching matched leads:', error.message);
    }
  };

  // Load disabledLeads from localStorage and fetch matched leads when the component mounts
  useEffect(() => {
    fetchMatchedLeads();
  }, []);

  //Filter leads on multiple select
  const handleDropdownChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = Array.isArray(data)
    ? data.filter((row) => {
      const matchedLead = matchedLeads.find(lead => lead.id === row.id);
      const matchedStatus = matchedLead ? matchedLead.status : undefined;

      return (
        row.employee_id === employeeId &&
        (row.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedStatus === '' ||
          (matchedStatus && matchedStatus.toLowerCase() === selectedStatus.toLowerCase()))
      );
    })
    : [];


  const handleStatusChange = (event, leadId) => {
    const selectedStatus = event.target.value; // Get the selected value
    const lead = filteredRows.find(row => row.id === leadId); // Find the lead

    if (lead) {
      const { employee_id, student_name, email, contact, course, year, college } = lead;


      setUpdatedLeads((prev) => {
        const newUpdatedLeads = {
          ...prev,
          [leadId]: {
            status: selectedStatus, // Update status with the selected value
            employee_id,
            student_name,
            email,
            contact,
            course,
            year,
            college,
          },
        };
        // Also update matchedLeads if needed
        // setMatchedLeads((prevLeads) =>
        //   prevLeads.map((lead) =>
        //     lead.id === leadId ? { ...lead, status: selectedStatus } : lead
        //   )
        // );

        return newUpdatedLeads; // Return updated state
      });
    }
  };

  const formatDate = (date) => {
    // Get the day, month, and year in the desired format
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date).replace(/,/g, '');

    // Extract the day from the date and add the suffix (st, nd, rd, th)
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);

    // Get hours, minutes, and AM/PM in 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

    // Construct the final formatted date and time string
    return `${day}${daySuffix} ${formattedDate.split(' ')[1]}'${formattedDate.split(' ')[2]} ${hours}:${minutes} ${ampm}`;
  };

  // Helper function to get the day suffix
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Exceptions for 11th, 12th, 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }


  const handleSave = async () => {
    // Check if any lead has "Select Status" as its status
    const invalidStatusLead = Object.values(updatedLeads).find(lead => lead.status === "Select Status");
    console.log("Invalid Status Lead:", invalidStatusLead);

    if (invalidStatusLead) {
      alert("Error: Please select a valid status for all leads before saving.");
      return;
    }

    // Get the current date and format it
    setSaving(true);

    // Prepare leads to save as an array
    const leadsToSave = Object.entries(updatedLeads).map(([id, { employee_id, student_name, email, college, contact, course, year, status }]) => ({
      id,
      employee_id,
      student_name,
      email,
      contact,
      college,
      course,
      year,
      status,
    }));

    try {
      const token = localStorage.getItem("Access Token");
      const response = await axios.post('https://ediglobe-backend-main.onrender.com/leads/updateLead', leadsToSave, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      alert("Saved successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update lead statuses';
      console.error('Error saving lead statuses:', errorMessage);
      alert(errorMessage);
    } finally {
      // Set saving back to false when the request completes
      setSaving(false);
    }
    fetchMatchedLeads();
  };

  const refreshData = async () => {
    try {
      setSaving(true); // Or use a separate loading state if preferred
      await fetchMatchedLeads(); // Assuming this function fetches your lead data
      setUpdatedLeads({}); // Clear any pending updates
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert('Failed to refresh data. Please try again.');
    } finally {
      setSaving(false); // Or turn off your loading state
    }
  };

  const handleSaveAndRefresh = async () => {
    await handleSave(); // Your existing save function
    await refreshData(); // Refresh data after saving
  };



  if (error) return <div>Error loading data</div>;


  return (
    <>
      <div className="flex h-[calc(100vh-0rem)] mt-1 opacity-1">
        <LottieFile />
        <SideBar />
        <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
          {/* Sticky header for the member list and search bar */}
          <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
            <div className="p-3 mb-3 bg-blue-gray-50 rounded-border">
              <Typography variant="md" color="blue-gray" className="font-bold">
                Potential Google Form Leads (PGFL)📝:
              </Typography>
              <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
                This tab contains urgent leads from the Potential Google Form (PGFL). Please prioritize contacting these leads immediately and ensure that their status is updated promptly and accurately.<br />
                <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black" /> Click on Update Leads button to send their status to Admin<br />
                <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black" /> Once lead status updated, cannot be change except "❌ DNP", "🕒 Busy", "📞 Disconnected", "🚫 Not Called Yet" or "🔄 Follow Up".<br />
                <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black" /> Status should be updated for all the leads everyday before logout.<br />
              </Typography>

            </div>

            <Dialog
              open={open}
              handler={handleOpen}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              className="max-w-4xl" // Increase horizontal size
            >
              <DialogHeader>Lead Details</DialogHeader>
              <DialogBody className="max-h-[400px] overflow-y-auto"> {/* Set max height and enable Y-axis scroll */}
                {matchedLeads.map((lead) => (
                  <div key={lead.id} className="grid grid-cols-2 gap-4 mb-4"> {/* Grid with two columns */}
                    <div>
                      <p className="font-semibold">Lead Id:</p>
                      <p className="font-semibold">Student Name:</p>
                      <p className="font-semibold">Email:</p>
                      <p className="font-semibold">Contact:</p>
                      <p className="font-semibold">Course:</p>
                      <p className="font-semibold">Year:</p>
                      <p className="font-semibold">College:</p>
                      <p className="font-semibold">Status:</p>
                      <p className="font-semibold">CreateAt:</p>
                      <p className="font-semibold">UpdatedAt:</p>
                    </div>
                    <div>
                      <p>{lead.id}</p>
                      <p>{lead.student_name}</p>
                      <p>{lead.email}</p>
                      <p>{lead.contact}</p>
                      <p>{lead.course}</p>
                      <p>{lead.year}</p>
                      <p>{lead.college}</p>
                      <p>{lead.status}</p>
                      <p>{lead.createdAt}</p>
                      <p>{lead.updatedAt}</p>
                    </div>
                  </div>
                ))}
              </DialogBody>
              <DialogFooter>
                <Button className='bg-black text-white w-32' onClick={handleOpen}>
                  <span>Cancel</span>
                </Button>
              </DialogFooter>
            </Dialog>

            <div className='pt-3 mb-2 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold">
                Total leads Assigned: <Chip color='indigo' value={filteredRows.length} className='text-white bg-black font-bold inline-block pt-2' />
              </Typography>
              <div className="w-full md:w-72">
                <Input
                  className="rounded-md focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{ className: "hidden" }}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  placeholder="Search Lead..."
                  onChange={handleSearchChange}
                />
              </div>
              <Button onClick={handleOpen} className="bg-black text-white p-3 w-32">
                Fetch Leads
              </Button>
              <Button onClick={handleSaveAndRefresh} className="bg-black text-white p-3 w-32" disabled={saving}>
                {saving ? 'Saving...' : 'Update Leads'}
              </Button>
            </div>

            <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold mt-1 flex items-center">
              Total leads:
              <span className="text-green-500 ml-2">Updated</span>
              <Chip color='indigo' value={matchedLeads.length} className='text-white bg-black font-bold inline-block pt-2 ml-1' />

              {/* Vertical line */}
              <span className="mx-4 border-l border-gray-500 h-6 inline-block"></span>

              <span className="text-red-500">Pending</span>
              <Chip color='indigo' value={Math.max(filteredRows.length - matchedLeads.length, 0)} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
            </Typography>

            <div className='flex items-center gap-4 mt-2'>
              <Typography variant="md" color="blue-gray" className="whitespace-nowrap">
                Select Status:
              </Typography>
              <select
                className="block w-auto max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-900/10 sm:text-md"
                value={selectedStatus}
                onChange={handleDropdownChange}>
                <option value="">All</option>
                {leadStatusOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
            
          </div>

          {/* Leads Table */}
          <div className="mt-1">
            <CardBody className="h-[calc(100vh-8rem)] overflow-y-auto px-0 text-gray-700 rounded-xl border border-gray-300">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {["Student Name", "Contact", "Course Name", "Year", "College", "Status"].map((head) => (
                      <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography variant="small" className="font-bold leading-none text-black">
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td colSpan={6} className="text-center p-4">Error in loading data</td>
                    </tr>
                  ) : data ? (
                    filteredRows.length > 0 ? (
                      filteredRows.map(({ student_name, email, contact, course, year, college, status, id }) => {
                        const matchedLead = matchedLeads.find((lead) => lead.id === id);
                        return (
                          <tr key={id}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                  <Typography variant="small" color="blue-gray" className="font-normal">{student_name}</Typography>
                                  <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{email}</Typography>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">{contact}</Typography>
                            </td>
                            <td className="p-4">
                              <Chip variant="small" value={course} className="font-bold text-center text-white bg-black p-2.5">
                              </Chip>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">{year}</Typography>
                            </td>
                            <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal w-52">{college}</Typography>
                            </td>
                            <td className="p-4">
                              <select
                                className={`overflow-y-auto font-normal text-blue-gray bg-white border border-gray-300 rounded-md p-2 border-2 ${matchedLead ? 'opacity-50' : 'opacity-100'
                                  }`}
                                value={matchedLead ? matchedLead.status : status}
                                onChange={(event) => handleStatusChange(event, id)} // Handle status change
                                disabled={
                                  (
                                    matchedLead && // Select field should not be blank
                                    matchedLead.status !== "Select Status" &&
                                    !["DNP", "Busy", "Disconnected", "Not Called Yet", "Follow Up"].includes(
                                      matchedLead.status // Disable only if it's not one of the allowed statuses
                                    )
                                  )
                                }
                              >
                                {statusOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>

                              {(disabledLeads[id]) && (
                                <div className="inline-flex items-center">
                                  <Chip
                                    value="Updated to db"
                                    variant="ghost"
                                    className='rounded-full bg-gray-800 normal-case text-white font-bold inline-block pt-2 ml-2 w-18'
                                  />

                                  <Tooltip
                                    placement="bottom"
                                    className="border border-blue-gray-50 bg-black px-2 py-3 shadow-xl shadow-black/10"
                                    content={
                                      <div className="w-auto">
                                        {matchedLead.createdAt && (
                                          <Typography variant="small" className="text-xs text-white">
                                            AssignedAt: {formatDate(new Date(matchedLead.createdAt))}
                                          </Typography>
                                        )}
                                        {matchedLead.updatedAt && (
                                          <Typography variant="small" className="text-xs text-white">
                                            UpdatedAt: {formatDate(new Date(matchedLead.updatedAt))}
                                          </Typography>
                                        )}

                                      </div>
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      className="h-5 w-5 cursor-pointer text-blue-gray-500 ml-2" // Added margin-left for spacing
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                      />
                                    </svg>
                                  </Tooltip>
                                </div>
                              )}

                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center p-4">No leads found</td>
                      </tr>
                    )
                  ) : (
                    <SkeletonLoader count={8} />
                  )}
                </tbody>
              </table>
            </CardBody>
          </div>

          {/* Footer */}
          <div className="py-4 text-center">
            <Typography variant="small" color="gray" className="font-normal">Total records fetched: {data ? data.length : 0}</Typography>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LeadsDistribution;
