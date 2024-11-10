import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useSWR from 'swr';

const AttendanceShortForm = {
  "P": "Present",
  "LOP": "LOP",
  "HD": "Half day",
  "HDLL": "Half day late login",
  "WFH": "WFH",
  "EL": "Emergency leave",
  "CL": "Casual leave",
  "SL": "Sick leave",
  "WO": "Week off",
  "TER": "Terminated",
  "ABS": "Abscond",
  "RESG": "Resigned",
  "HOL": "Holiday",
};

const AttendanceColors = {
  "P": "text-green-500",
  "LOP": "text-red-500",
  "HD": "text-red-500",
  "HDLL": "text-red-500",
  "WFH": "text-red-500",
  "EL": "text-orange-500",
  "CL": "text-orange-500",
  "SL": "text-orange-500",
  "WO": "text-green-500",
  "TER": "",
  "ABS": "text-red-500",
  "RESG": "",
  "HOL": "text-orange-500",
};


const SkeletonLoader = () => {
  const cellSize = "h-16 w-full"; // Replace h-16 with the height you used in the calendar
  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 lg:p-4 bg-black text-white rounded-border w-[95%] md:w-[90%] lg:w-[80%] h-[100%]">
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: 42 }, (_, i) => (
          <div key={i} className={`${cellSize} bg-gray-700 animate-pulse rounded-md`}></div>
        ))}
      </div>
    </div>
  );
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [attendanceMap, setAttendanceMap] = useState({});
  const [employeeId, setEmployeeId] = useState(null);

  const token = localStorage.getItem("Access Token");

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());

  const { data, error } = useSWR('https://ediglobe-backend-main.onrender.com/attendanceDetails/attendance', fetcher, {
    refreshInterval: 4000,
    onSuccess: (fetchedData) => {
      localStorage.setItem('attendanceData', JSON.stringify(fetchedData));
    }
  });

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    const storedData = localStorage.getItem('attendanceData');

    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const employeeRecords = parsedData.filter(item => item.Employee_Id === storedEmployeeId);

        // Merge all attendance records from different months into one object
        const mergedAttendance = employeeRecords.reduce((acc, record) => {
          const { Employee_Id, Name, ...attendance } = record;
          return { ...acc, ...attendance };
        }, {});

        setAttendanceMap(mergedAttendance); // Set the merged attendance data
      }
    } else {
      console.error('No employee ID found. Please log in again.');
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data && !localStorage.getItem('attendanceData')) return <div><SkeletonLoader /></div>;

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf('month').day();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  const selectDate = (day) => {
    setSelectedDate(dayjs(currentMonth).date(day));
  };

  const selectToday = () => {
    const today = dayjs();
    setSelectedDate(today);
    setCurrentMonth(today);
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 lg:p-4 bg-black text-white rounded-border w-[95%] md:w-[90%] lg:w-[80%] h-[100%]">

      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-white" onClick={prevMonth}>
          Prev
        </button>
        <h2 className="text-xl font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-white" onClick={nextMonth}>
          Next
        </button>
      </div>

      {/* Select Today Button */}
      <div className="text-center mb-4">
        <button className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-white" onClick={selectToday}>
          Select Today
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2 text-center font-medium">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={i}></div>
        ))}
        {daysArray.map((day) => {
          const date = dayjs(currentMonth).date(day);
          const isSelected = selectedDate && selectedDate.isSame(date, 'day');
          const formattedDate = date.format('DD/MM/YYYY');
          const attendanceStatus = attendanceMap[formattedDate] || '';
          const shortForm = Object.keys(AttendanceShortForm).find(key => AttendanceShortForm[key] === attendanceStatus) || attendanceStatus;
          const attendanceColorClass = AttendanceColors[shortForm] || '';

          return (
            <button
              key={day}
              className={`p-4 rounded-md flex items-center justify-center space-x-2 ${isSelected ? 'bg-white text-black' : 'bg-gray-900 hover:bg-gray-700 text-white'}`}
              onClick={() => selectDate(day)}
            >
              <div className="flex items-center">
                <span>{day}</span>
                {attendanceStatus && (
                  <span className={`text-[6px] sm:text-[8px] md:text-[12px] lg:text-[16px] ml-2 font-bold ${attendanceColorClass}`}>
                    {shortForm}
                  </span>
                )}
              </div>
            </button>
          );
        })}

      </div>

      {/* Show selected date */}
      {selectedDate && (
        <div className="mt-4 text-center">
          <p className="text-lg">Selected Date: {selectedDate.format('DD MMMM YYYY')}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;