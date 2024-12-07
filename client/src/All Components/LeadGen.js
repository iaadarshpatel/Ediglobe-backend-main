import React, { useEffect, useState } from 'react'
import SideBar from '../All Components/Roles/SideBar';
import LottieFile from './LottieFile';
import { Button, Card, CardBody, Chip, Input, Typography } from '@material-tailwind/react';
import { ArrowRightCircleIcon, MagnifyingGlassIcon, CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const TABLE_HEAD = ["Time", "Student Name", "Contact", "State", "College", "Interested Domain", "Experience"];

const TABLE_ROWS = [
  {
    Time: "7/15/2024 12:17:53",
    Name: "John Doe",
    Email: "john@example.com",
    Contact: "123456789",
    College: "University of California, Los Angeles",
    State: "Uttar Pradesh",
    Domain: "Computer Science",
    Experience: "5 years",
    WhatsApp: true,
  },
  {
    Time: "7/16/2024 17:38:16",
    Name: "Bob Smith",
    Email: "bob@example.com",
    Contact: "123456789",
    College: "Stanford University",
    State: "Karnataka",
    Domain: "Data Science",
    Experience: "3 years",
    WhatsApp: false,
  },
  {
    Time: "7/17/2024 17:47:59",
    Name: "Charlie Davis",
    Email: "charlie@example.com",
    Contact: "123456789",
    College: "Harvard University",
    State: "Assam",
    Domain: "Machine Learning",
    Experience: "4 years",
    WhatsApp: true,
  },
  {
    Time: "7/18/2024 17:50:01",
    Name: "David Lee",
    Email: "david@example.com",
    Contact: "123456789",
    College: "MIT",
    State: "Bihar",
    Domain: "Artificial Intelligence",
    Experience: "6 years",
    WhatsApp: false,
  },
  {
    Time: "7/19/2024 18:08:39",
    Name: "Eva Brown",
    Email: "eva@example.com",
    Contact: "123456789",
    College: "California Institute of Technology",
    State: "Mumbai",
    Domain: "Cybersecurity",
    Experience: "5 years",
    WhatsApp: true,
  },
  {
    Time: "7/20/2024 18:22:20",
    Name: "Frank Green",
    Email: "frank@example.com",
    Contact: "123456789",
    College: "Princeton University",
    State: "Delhi",
    Domain: "Data Science",
    Experience: "4 years",
    WhatsApp: false,
  },
  {
    Time: "7/21/2024 18:29:05",
    Name: "Grace Harris",
    Email: "grace@example.com",
    Contact: "123456789",
    College: "University of Chicago",
    State: "Punjab",
    Domain: "Web Development",
    Experience: "2 years",
    WhatsApp: true,
  },
  {
    Time: "7/22/2024 18:37:14",
    Name: "Henry Wilson",
    Email: "henry@example.com",
    Contact: "123456789",
    College: "Yale University",
    State: "Madhya Pradesh",
    Domain: "Computer Science",
    Experience: "5 years",
    WhatsApp: false,
  },
  {
    Time: "7/23/2024 18:38:20",
    Name: "Isabella Martinez",
    Email: "isabella@example.com",
    Contact: "123456789",
    College: "University of Texas at Austin",
    State: "Tamil Nadu",
    Domain: "Artificial Intelligence",
    Experience: "3 years",
    WhatsApp: true,
  },
  {
    Time: "7/24/2024 18:43:32",
    Name: "Jack Thomas",
    Email: "jack@example.com",
    Contact: "123456789",
    College: "Cornell University",
    State: "Haryana",
    Domain: "Cybersecurity",
    Experience: "4 years",
    WhatsApp: false,
  },
  {
    Time: "8/1/2024 19:31:31",
    Name: "Katie Roberts",
    Email: "katie@example.com",
    Contact: "123456789",
    College: "Columbia University",
    State: "Haryana",
    Domain: "Machine Learning",
    Experience: "3 years",
    WhatsApp: true,
  },
  {
    Time: "8/5/2024 19:34:32",
    Name: "Liam Walker",
    Email: "liam@example.com",
    Contact: "123456789",
    College: "Brown University",
    State: "Jharkhand",
    Domain: "Computer Science",
    Experience: "2 years",
    WhatsApp: false,
  },
  {
    Time: "8/10/2024 19:45:00",
    Name: "Mia Johnson",
    Email: "mia@example.com",
    Contact: "123456789",
    College: "University of Michigan",
    State: "Kerala",
    Domain: "Data Science",
    Experience: "4 years",
    WhatsApp: true,
  },
  {
    Time: "8/15/2024 20:00:00",
    Name: "Noah Wilson",
    Email: "noah@example.com",
    Contact: "123456789",
    College: "Duke University",
    State: "Odisha",
    Domain: "Cybersecurity",
    Experience: "5 years",
    WhatsApp: false,
  },
  {
    Time: "8/16/2024 09:12:45",
    Name: "Olivia Brown",
    Email: "olivia@example.com",
    Contact: "123456789",
    College: "Northwestern University",
    State: "Madhya Pradesh",
    Domain: "Computer Science",
    Experience: "3 years",
    WhatsApp: true,
  },
  {
    Time: "8/17/2024 11:23:32",
    Name: "Lucas Green",
    Email: "lucas@example.com",
    Contact: "123456789",
    College: "University of Washington",
    State: "Delhi",
    Domain: "Machine Learning",
    Experience: "2 years",
    WhatsApp: false,
  },
  {
    Time: "8/18/2024 13:47:11",
    Name: "Emma White",
    Email: "emma@example.com",
    Contact: "123456789",
    College: "University of Southern California",
    State: "Gujarat",
    Domain: "Cybersecurity",
    Experience: "4 years",
    WhatsApp: true,
  },
  {
    Time: "8/19/2024 15:59:28",
    Name: "Ethan Clark",
    Email: "ethan@example.com",
    Contact: "123456789",
    College: "University of Pennsylvania",
    State: "Karnataka",
    Domain: "Data Science",
    Experience: "5 years",
    WhatsApp: false,
  },
  {
    Time: "8/20/2024 16:22:10",
    Name: "Sophia Lewis",
    Email: "sophia@example.com",
    Contact: "123456789",
    College: "Rice University",
    State: "Uttar Pradesh",
    Domain: "Web Development",
    Experience: "3 years",
    WhatsApp: true,
  },
  {
    Time: "8/21/2024 18:37:14",
    Name: "James Walker",
    Email: "james@example.com",
    Contact: "123456789",
    College: "Georgia Institute of Technology",
    State: "Maharashtra",
    Domain: "Artificial Intelligence",
    Experience: "4 years",
    WhatsApp: false,
  },
  {
    Time: "8/22/2024 19:05:00",
    Name: "Ava Robinson",
    Email: "ava@example.com",
    Contact: "123456789",
    College: "University of Illinois",
    State: "Bihar",
    Domain: "Machine Learning",
    Experience: "2 years",
    WhatsApp: true,
  },
  {
    Time: "8/23/2024 20:15:40",
    Name: "Isabella Martinez",
    Email: "isabella@example.com",
    Contact: "123456789",
    College: "University of California, Berkeley",
    State: "Karnataka",
    Domain: "Cybersecurity",
    Experience: "3 years",
    WhatsApp: false,
  },
  {
    Time: "8/24/2024 21:30:00",
    Name: "Alexander Johnson",
    Email: "alexander@example.com",
    Contact: "123456789",
    College: "University of Florida",
    State: "Haryana",
    Domain: "Web Development",
    Experience: "1 year",
    WhatsApp: true,
  },
  {
    Time: "8/25/2024 22:45:00",
    Name: "Charlotte Anderson",
    Email: "charlotte@example.com",
    Contact: "123456789",
    College: "University of North Carolina",
    State: "Madhya Pradesh",
    Domain: "Computer Science",
    Experience: "5 years",
    WhatsApp: false,
  },
  {
    Time: "8/26/2024 23:30:00",
    Name: "Liam King",
    Email: "liam@example.com",
    Contact: "123456789",
    College: "University of Notre Dame",
    State: "Odisha",
    Domain: "Data Science",
    Experience: "4 years",
    WhatsApp: true,
  },
];


const LeadGen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current currentPage
  const [rowsPerPage, setRowsPerPage] = useState(10); // No. of rows per page
  const [indexOfLastRow, setIndexOfLastRow] = useState(currentPage * rowsPerPage);
  const [indexOfFirstRow, setIndexOfFirstRow] = useState(indexOfLastRow - rowsPerPage);

  const filteredRows = TABLE_ROWS.filter((row) => {
    const searchLower = searchQuery.toLowerCase();
    const isMatchingDate = selectedDate === '' || row.Time.startsWith(selectedDate);
    return (
      (row.Name.toLowerCase().includes(searchLower) || row.Email.toLowerCase().includes(searchLower)) &&
      isMatchingDate
    );
  });

  const currentItems = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Handlers for pagination
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    setIndexOfLastRow(indexOfLastRow);
    setIndexOfFirstRow(indexOfFirstRow);
  }, [currentPage]);


  // Extract unique dates from TABLE_ROWS
  const uniqueDates = [...new Set(TABLE_ROWS.map(row => row.Time.split(' ')[0]))];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatCustomDate = (inputDate) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Regular expression to match date formats with optional time
    const dateTimeRegex = /(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\s*(\d{1,2}:\d{2}\s*[APMapm]{2})?/;

    const match = inputDate.match(dateTimeRegex);

    if (!match) {
      throw new Error("Invalid date format");
    }

    let day, month, year, time;

    // Extracting the date components
    if (match[3].length === 2) {
      year = `20${match[3]}`; // Convert two-digit year to four-digit
    } else {
      year = match[3];
    }

    month = parseInt(match[1], 10) - 1; // Month is 0-indexed
    day = match[2];

    // Get the time if it exists
    time = match[4] ? `, ${match[4]}` : ''; // Append time if available

    // Create the date object
    const date = new Date(year, month, day);

    // Format the output
    return `${day} ${monthNames[month]} ${year}${time}`;
  };

  // Map through the TABLE_ROWS and format the Time property
  const formattedTableRows = TABLE_ROWS.map(row => {
    return {
      ...row, // Spread the existing row properties
      Time: formatCustomDate(row.Time) // Format the Time property
    };
  });

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
                Lead Generation📝:
              </Typography>
              <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
                This tab contains urgent leads from the Potential Google Form (PGFL). Please prioritize contacting these leads immediately and ensure that their status is updated promptly and accurately.<br />
                <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black" /> Click on Update Leads button to send their status to Admin<br />
                <ArrowRightCircleIcon className="inline-block w-6 h-6 text-black" /> Status should be updated for all the leads everyday before logout.<br />
              </Typography>

            </div>
            <div className='pt-3 mb-2 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold">
                Total leads Generated: <Chip color='indigo' value={filteredRows.length} className='text-white bg-black font-bold inline-block pt-2' />
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
            </div>

            <div className='flex items-center gap-4 mt-2'>
              <Typography variant="md" color="blue-gray" className="whitespace-nowrap">
                Select Date:
              </Typography>
              <select
                className="block w-auto max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-900/10 sm:text-md"
                value={selectedDate}
                onChange={handleDateChange}>
                <option value="">All</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Scrollable card body for the table */}
          <div className="mt-1 pb-4">
            <CardBody className="h-screen overflow-y-auto px-0 text-gray-700 rounded-xl border border-gray-300">
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
                          className="font-bold leading-none text-black"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(({ id, Time, Name, Email, Contact, State, College, Domain, Experience, WhatsApp }, index) => {
                    const isLast = index === currentItems.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {formatCustomDate(Time)}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
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
                              className="font-normal flex items-center"
                            >
                              {Contact}
                              {WhatsApp ? <CheckCircleIcon className='inline-block ml-2 w-4 h-4 text-green-500' /> : <ArrowRightCircleIcon className='inline-block ml-2 w-4 h-4 text-red-500' />}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {State}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal w-52"
                          >
                            {College}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Chip variant="small" value={Domain} className="font-bold text-center text-white bg-black p-2.5">
                          </Chip>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Experience}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
            <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-4 p-2 bg-white shadow-lg z-0">
              <Button
                variant="sm"
                className="flex items-center gap-1 bg-black hover:bg-black text-white"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} variant="text"
                  className={currentPage === index + 1 ? 'bg-black text-white' : " bg-black hover:bg-black text-white"}
                  onClick={() => handlePageClick(index + 1)}
                  disabled={currentPage === index + 1}>
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="text"
                className="flex items-center gap-1 bg-black hover:bg-black text-white"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default LeadGen