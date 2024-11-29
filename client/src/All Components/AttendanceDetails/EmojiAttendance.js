import React, { useEffect, useState } from "react";
import { Typography, ListItem, Switch } from "@material-tailwind/react";
import { FaCheckCircle, FaHome, FaHospitalUser, FaUmbrellaBeach, FaQuestionCircle, FaUserClock } from 'react-icons/fa';
import { GiMoneyStack, GiWitchFlight } from 'react-icons/gi';
import { CalendarDateRangeIcon, PencilSquareIcon, ClockIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'
import { MdPunchClock, MdSick } from 'react-icons/md';
import { LuPalmtree } from 'react-icons/lu';
import useSWR from 'swr';
import config from "../../config.js";
import Map from "./Map.js";

const customColor = '#000000';

const attendanceTypeDetails = [
    {
        type: 'Present',
        icon: <FaCheckCircle style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Fully attended work',
        shortCode: '[P]',
        textColor: 'text-green-500'
    },
    {
        type: 'LOP',
        icon: <GiMoneyStack style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Loss of pay',
        shortCode: '[LOP]',
        textColor: 'text-red-500'
    },
    {
        type: 'Half day',
        icon: <FaUserClock style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Half-day work',
        shortCode: '[HD]',
        textColor: 'text-red-500'
    },
    {
        type: 'Half day late login',
        icon: <MdPunchClock style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Half Day Logged in late',
        shortCode: '[HDLL]',
        textColor: 'text-red-500'
    },
    {
        type: 'WFH',
        icon: <FaHome style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Work from home',
        shortCode: '[WFH]',
        textColor: 'text-red-500'
    },
    {
        type: 'Emergency leave',
        icon: <FaHospitalUser style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Leave due to emergency',
        shortCode: '[EL]',
        textColor: 'text-orange-500'
    },
    {
        type: 'Casual leave',
        icon: <LuPalmtree style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Casual leave',
        shortCode: '[CL]',
        textColor: 'text-orange-500'
    },
    {
        type: 'Sick leave',
        icon: <MdSick style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Sick leave',
        shortCode: '[SL]',
        textColor: 'text-orange-500'
    },
    {
        type: 'Week off',
        icon: <FaUmbrellaBeach style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Weekly off',
        shortCode: '[WO]',
        textColor: 'text-green-500'
    },
    {
        type: 'Abscond',
        icon: <FaQuestionCircle style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Unclear status',
        shortCode: '[ABS]',
        textColor: 'text-red-500'
    },
    {
        type: 'Holiday',
        icon: <GiWitchFlight style={{ color: customColor, fontSize: '1.2rem' }} />,
        description: 'Holiday',
        shortCode: '[HOL]',
        textColor: 'text-orange-500'
    }
];

const EmojiAttendance = () => {
    const [isVisible, setIsVisible] = useState(true); // State to control visibility
    const [attendanceData, setAttendanceData] = useState([]);
    const [monthlyCounts, setMonthlyCounts] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('');
    const storedEmployeeId = localStorage.getItem('employeeId');

    const token = localStorage.getItem("Access Token");

    const fetcher = (url) =>
        fetch(url, {
            headers: {
                Authorization: token,
            },
        }).then((res) => res.json());
    const { data, error } = useSWR(`${config.hostedUrl}/attendanceDetails/attendance`, fetcher, {
        refreshInterval: 4000,
        onSuccess: (fetchedData) => {
            localStorage.setItem('attendanceData', JSON.stringify(fetchedData));
        }
    });

    const SkeletonItem = () => (
        <div className="flex items-center gap-3 rounded-lg py-2 animate-pulse">
            <div className="flex items-center justify-center rounded-lg bg-gray-300 p-3">
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );

    // Filter data based on storedEmployeeId
    useEffect(() => {
        try {
            const storedData = localStorage.getItem('attendanceData');
            if (storedData) {
                let parsedData;
                try {
                    parsedData = JSON.parse(storedData);
                } catch (e) {
                    console.error("Error parsing localStorage data:", e);
                    parsedData = []; // Default to empty array if parsing fails
                }

                // Ensure parsedData is an array or convert it to an array if it's an object
                if (!Array.isArray(parsedData)) {
                    parsedData = Object.values(parsedData); // Convert non-array object to array
                }

                // Filter data based on storedEmployeeId
                const filteredData = storedEmployeeId
                    ? parsedData.filter((item) => item.Employee_Id === storedEmployeeId)
                    : parsedData;


                // Create a flat array from the attendance data
                const attendanceEntries = [];
                filteredData.forEach((entry) => {
                    const { Employee_Id, Name, ...dates } = entry; // Destructure to separate dates
                    Object.entries(dates).forEach(([date, status]) => {
                        attendanceEntries.push({ Employee_Id, Name, date, status });
                    });
                });
                setAttendanceData(attendanceEntries);

                // Count attendance types by month
                const counts = {};
                attendanceEntries.forEach((entry) => {
                    const [day, month, year] = entry.date.split('/').map(Number);
                    const date = new Date(year, month - 1, day); // Month is zero-indexed
                    const monthYear = date.toLocaleString('default', { month: 'long' }) + ' ' + year;
                    const attendanceType = entry.status;

                    if (!counts[monthYear]) {
                        counts[monthYear] = {
                            "LOP": 0,
                            "Present": 0,
                            "Week off": 0,
                            "Sick leave": 0,
                            "WFH": 0,
                            "Emergency leave": 0,
                            "Abscond": 0,
                            "Half day": 0,
                            "Casual leave": 0,
                            "Half day late login": 0,
                            "Holiday": 0,
                        };
                    }

                    if (attendanceType && counts[monthYear][attendanceType] !== undefined) {
                        counts[monthYear][attendanceType]++;
                    }
                });

                setMonthlyCounts(counts);
            } else {
                throw new Error('No attendance data found in localStorage.');
            }
        } catch (err) {
            console.error('Error in useEffect:', err.message);
        }
    }, [data, storedEmployeeId]);

    if (error) return <div>Error loading attendance data</div>;

    // Create an array of month-year options from the monthlyCounts
    const monthOptions = Object.keys(monthlyCounts);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <div className="w-full px-4">
            <div className="flex flex-col lg:flex-row justify-between p-3 mb-3 bg-blue-gray-50 rounded-border">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 mb-3 lg:mb-0">
                    <div className="mb-1 flex items-center gap-3">
                        <Typography
                            variant="md"
                            color="blue-gray"
                            className="font-bold transition-colors hover:text-gray-900"
                        >
                            Attendance Overview:
                        </Typography>
                    </div>
                    <Typography
                        variant="sm"
                        color="gray-500"
                        className="font-normal text-blue-gray-500"
                    >
                        Attendance details are listed in the tab. For corrections, please contact HR.
                    </Typography>
                    <div className="flex flex-col items-start gap-2 mt-1">
                        <div className="flex items-center gap-2">
                            <ClipboardDocumentCheckIcon className="h-5 w-5 text-black" />
                            <Typography
                                color="gray"
                                className="text-sm font-normal text-blue-gray-500"
                            >
                                Attendance <span className="text-indigo-800 font-semibold">recorded</span> daily
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <PencilSquareIcon className="h-5 w-5 text-black" />
                            <Typography
                                color="gray"
                                className="text-sm font-normal text-blue-gray-500"
                            >
                                Request <span className="text-yellow-800 font-semibold">corrections</span> from HR
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDateRangeIcon className="h-5 w-5 text-black" />
                            <Typography
                                color="gray"
                                className="text-sm font-normal text-blue-gray-500"
                            >
                                Check attendance <span className="text-purple-800 font-semibold">date-wise</span> using the calendar
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-5 w-5 text-black" />
                            <Typography
                                color="gray"
                                className="text-sm font-normal text-blue-gray-500"
                            >
                                Clock <span className="text-green-800 font-semibold">In</span> and <span className="text-red-800 font-semibold">Out</span> available (Do it once) <span className="inline-flex items-center rounded-md ml-1 bg-black px-2 py-1 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20">New</span>
                            </Typography>
                        </div>
                    </div>
                </div>
                {/* Right Section */}
                <Map/>
            </div>

            <div className="flex items-center gap-4">
                <Typography variant="md" color="blue-gray" className="whitespace-nowrap font-normal">
                    Select Month:
                </Typography>
                <select
                    id="month-select"
                    className="block w-auto max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-900/10 sm:text-md"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Please choose a month</option>
                    {monthOptions.map((monthYear) => (
                        <option key={monthYear} value={monthYear}>
                            {monthYear}
                        </option>
                    ))}
                </select>
            </div>
            <hr className="my-2 border-black-gray-50" />
            <div className="mt-2">
                <div className="flex justify-end">
                    <Switch color="blue-gray" label={
                        <div className="flex items-center gap-2">
                            <Typography className="font-medium text-black">
                                {isVisible ? 'Hide' : 'Show'} Details
                            </Typography>
                        </div>
                    }
                        className={`${isVisible ? 'bg-teal-500' : 'bg-red-500'}`}
                        onChange={toggleVisibility}
                        checked={isVisible}
                    />
                </div>
                {isVisible && (
                    <div>
                        <ul className={`grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-opacity duration-300 ${isVisible ? '' : 'opacity-50 blur-sm'}`}>
                            {!attendanceData.length
                                ? Array.from({ length: 4 }).map((_, index) => (
                                    <SkeletonItem key={index} />
                                ))
                                : attendanceTypeDetails.map(({ type, icon, description, shortCode, textColor }) => (
                                    <ListItem key={type} className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                                        <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                                            {icon}
                                        </div>
                                        <div className="flex-1">
                                            <Typography variant="text" color="blue-gray" className="text-sm font-bold">
                                                {type}:
                                                <span className="ml-2 text-blue-gray-900 font-bold text-base">
                                                    {monthlyCounts?.[selectedMonth]?.[type] || 0}
                                                </span>
                                            </Typography>
                                            <Typography variant="text" className="text-xs font-medium text-blue-gray-500">
                                                {description} <span className={`font-bold ${textColor}`}>{shortCode}</span>
                                            </Typography>
                                        </div>
                                    </ListItem>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmojiAttendance;
