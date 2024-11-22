import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.js";

const ClockInOut = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [address, setAddress] = useState("");
  const [todayDay, setTodayDay] = useState("");
  const [logs, setLogs] = useState([]);

  const formatDateTime = () => {
    const date = new Date();
    const todayDate = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + date.toLocaleDateString("en-US", { weekday: 'long' });
    setTodayDay(todayDate);
};

  useEffect(() => {
    const savedClockInState = localStorage.getItem("isClockedIn");
    const savedClockInTime = localStorage.getItem("clockInTime");
    const savedLogs = JSON.parse(localStorage.getItem("clockLogs")) || [];

    if (savedClockInState === "true" && savedClockInTime) {
      setIsClockedIn(true);
      setClockInTime(new Date(savedClockInTime));
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
    formatDateTime();
    const currentTime = new Date();
    setIsClockedIn(true);
    setClockInTime(currentTime);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const fetchedAddress = await fetchAddress(latitude, longitude);
        setAddress(fetchedAddress);

        localStorage.setItem("isClockedIn", "true");
        localStorage.setItem("clockInTime", currentTime.toISOString());
        localStorage.setItem("clockInAddress", fetchedAddress);
      });
    } else {
      setAddress("Geolocation not supported.");
    }
  };

  const handleClockOut = async () => {
    formatDateTime();
    const employeeId = localStorage.getItem("employeeId");
    const currentTime = new Date();

    let fetchedAddress = "Address not available";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchedAddress = await fetchAddress(latitude, longitude);

        const updatedLogs = [
          ...logs,
          {
            clockIn: clockInTime.toISOString(),
            clockOut: currentTime.toISOString(),
            clockInAddress: address,
            clockOutAddress: fetchedAddress,
            attendanceMarkDate: todayDay,
            employeeId,
          },
        ];

        try {
          const response = await axios.post(`${config.hostedUrl}/logs/attendanceLogsPost;`, updatedLogs, {
            employeeId,
            clockInTime: clockInTime.toISOString(),
            clockOutTime: currentTime.toISOString(),
            clockInAddress: address,
            clockOutAddress: fetchedAddress,
            attendanceMarkDate: todayDay
          });
          alert("Saved successfully");
        } catch (error) {
          console.error("Error saving logs:", error);
        }

        setLogs(updatedLogs);
        setIsClockedIn(false);
        setClockInTime(null);

        localStorage.setItem("clockLogs", JSON.stringify(updatedLogs));
        localStorage.removeItem("isClockedIn");
        localStorage.removeItem("clockInTime");
        localStorage.removeItem("clockInAddress");
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
        {logs.length > 0 ? (
          <ul className="mt-4 text-left">
            {logs.map((log, index) => (
              <li key={index} className="py-1">
                <strong>Clock-In:</strong> {new Date(log.clockIn).toLocaleString()} <br />
                <strong>Clock-In Address:</strong> {log.clockInAddress} <br />
                <strong>Clock-Out:</strong> {new Date(log.clockOut).toLocaleString()} <br />
                <strong>Clock-Out Address:</strong> {log.clockOutAddress} <br />
                <strong>Clock-Out Address:</strong> {log.attendanceMarkDate} <br />
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
