import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.js";

const ClockInOut = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [address, setAddress] = useState("");
  const [todayDay, setTodayDay] = useState("");
  const [logs, setLogs] = useState([]);
  const [updatedAttendanceLogs, setUpdatedAttendanceLogs] = useState([]);

  const formatDateTime = () => {
    const date = new Date();
    const todayDate = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + date.toLocaleDateString("en-US", { weekday: 'long' });
    return todayDate; // Return the formatted date
  };

  useEffect(() => {
    // Restore saved states from localStorage
    const savedClockInState = localStorage.getItem("isClockedIn");
    const savedClockInTime = localStorage.getItem("clockInTime");
    const savedClockInAddress = localStorage.getItem("clockInAddress");
    const savedAttendanceMarkDate = localStorage.getItem("attendanceMarkDate");
    const savedLogs = JSON.parse(localStorage.getItem("clockLogs")) || [];

    if (savedClockInState === "true" && savedClockInTime) {
      setIsClockedIn(true);
      setClockInTime(new Date(savedClockInTime));
      setAddress(savedClockInAddress || "Address not found.");
      setTodayDay(savedAttendanceMarkDate || formatDateTime());
    } else {
      // If not clocked in, set todayDay
      setTodayDay(savedAttendanceMarkDate || formatDateTime());
    }
    setLogs(savedLogs);
  }, []);

  const fetchAddress = async (lat, lng) => {
    const API_KEY = "AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    try {
      const response = await axios.get(url);
      const result = response.data;
      return result.results?.[0]?.formatted_address || "Address not found.";
    } catch (error) {
      return "Error fetching address.";
    }
  };

  const handleClockIn = async () => {
    const employeeId = localStorage.getItem("employeeId");
    const currentTime = new Date();
    const formattedDate = formatDateTime();

    setIsClockedIn(true);
    setClockInTime(currentTime);
    setTodayDay(formattedDate);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const fetchedAddress = await fetchAddress(latitude, longitude);
        setAddress(fetchedAddress);

        // Save to localStorage
        localStorage.setItem("isClockedIn", "true");
        localStorage.setItem("clockInTime", currentTime.toISOString());
        localStorage.setItem("clockInAddress", fetchedAddress);
        localStorage.setItem("attendanceMarkDate", formattedDate);

        // Create the log object
        const clockInlog = {
          clockInTime: currentTime.toLocaleString(),
          clockInAddress: fetchedAddress,
          attendanceMarkDate: formattedDate,
          employeeId,
        };

        try {
          const token = localStorage.getItem("Access Token");
          const response = await axios
            .post(`${config.hostedUrl}/logs/attendanceLogsPost`, clockInlog, {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            })
            .then((res) => res.data)
            .catch((error) => {
              console.error("Error saving log:", error);
              throw error; // Rethrow to catch it in the outer block
            });

          console.log("Response from API:", response);
          alert("Saved successfully");

          // Update the logs array locally after successful post
          const updatedLogs = [...logs, clockInlog];
          setLogs(updatedLogs);
          setUpdatedAttendanceLogs(updatedLogs);

          // Update localStorage
          localStorage.setItem("clockLogs", JSON.stringify(updatedLogs));
        } catch (error) {
          console.error("Error saving log:", error);
          alert("Failed to save log. Please try again.");
        }

      });
    } else {
      setAddress("Geolocation not supported.");
    }
  };

  const handleClockOut = async () => {
    const employeeId = localStorage.getItem("employeeId");
    const currentTime = new Date();

    let fetchedAddress = "Address not available";
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchedAddress = await fetchAddress(latitude, longitude);

        // Create the latest log object
        const newLog = {
          clockInTime: clockInTime.toLocaleString(),
          clockOutTime: currentTime.toLocaleString(),
          clockInAddress: address,
          clockOutAddress: fetchedAddress,
          attendanceMarkDate: todayDay,
          employeeId,
        };

        try {
          const token = localStorage.getItem("Access Token");
          console.log("Sending log to API:", newLog);

          // Send only the new log object in the POST request
          const response = await axios
            .post(`${config.hostedUrl}/logs/attendanceLogsPost`, newLog, {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            })
            .then((res) => res.data)
            .catch((error) => {
              console.error("Error saving log:", error);
              throw error; // Rethrow to catch it in the outer block
            });

          console.log("Response from API:", response);
          alert("Saved successfully");

          // Update the logs array locally after successful post
          const updatedLogs = [...logs, newLog];
          setLogs(updatedLogs);
          setUpdatedAttendanceLogs(updatedLogs);

          // Update localStorage
          localStorage.setItem("clockLogs", JSON.stringify(updatedLogs));
        } catch (error) {
          console.error("Error saving log:", error);
          alert("Failed to save log. Please try again.");
        }

        // Reset state after logging out
        setIsClockedIn(false);
        setClockInTime(null);
        localStorage.removeItem("isClockedIn");
        localStorage.removeItem("clockInTime");
        localStorage.removeItem("clockInAddress");
        localStorage.removeItem("attendanceMarkDate");
        localStorage.removeItem("address");
        localStorage.removeItem("clockLogs");
      });
    }
  };


  return (
    <div className="p-4 text-center">
    
      {isClockedIn ? (
        <div>
          <h1>You are Clocked In</h1>
          <p>Clock-In Time: {clockInTime?.toLocaleString()}</p>
          <p>Clock-In Address: {address}</p>
          <button
            onClick={handleClockOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clock Out
          </button>
        </div>
      ) : (
        <div>
          <h1>You are Clocked Out</h1>
          <button
            onClick={handleClockIn}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Clock In
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold">Clock-In/Out Logs</h2>
        {updatedAttendanceLogs.length > 0 ? (
          <ul className="mt-4 text-left">
            {updatedAttendanceLogs.map((log, index) => (
              <li key={index} className="py-1">
                <strong>Clock-In:</strong> {log.clockInTime} <br />
                <strong>Clock-In Address:</strong> {log.clockInAddress} <br />
                <strong>Clock-Out:</strong> {log.clockOutTime} <br />
                <strong>Clock-Out Address:</strong> {log.clockOutAddress} <br />
                <strong>Attendance Date:</strong> {log.attendanceMarkDate} <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No logs available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClockInOut;
