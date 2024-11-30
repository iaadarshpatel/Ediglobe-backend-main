import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.js";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import MarkerIcon from "../../assets/marker.gif";
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { BsClockHistory } from "react-icons/bs";

const ClockInOut = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [address, setAddress] = useState("");
  const [todayDay, setTodayDay] = useState("");
  const [logs, setLogs] = useState([]);
  const [updatedAttendanceLogs, setUpdatedAttendanceLogs] = useState([]);
  const [clockInLatitude, setClockInLatitude] = useState(null);
  const [clockInLongitude, setClockInLongitude] = useState(null);
  const [clockOutLatitude, setClockOutLatitude] = useState(null);
  const [clockOutLongitude, setClockOutLongitude] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [size, setSize] = useState(false);
  const handleOpen = (value) => setSize(value);

  const Employee_Id = localStorage.getItem('employeeId');
  const token = localStorage.getItem("Access Token");

  const targetLocation = {
    lat: 12.8827581,
    lng: 77.6511447,
  };

  useEffect(() => {
    const fetchEmployeeAttendanceLogs = async () => {
      try {
        const response = await axios.get(`${config.hostedUrl}/attendanceLogs/${Employee_Id}`, {
          headers: {
            Authorization: token,
          },
        });
        setUpdatedAttendanceLogs(response.data);
        setLogs(response.data); // Update local state for display
      } catch (error) {
        console.error("Error fetching employee attendance logs:", error);
      }
    };

    fetchEmployeeAttendanceLogs();
  }, [Employee_Id, token]);

  const formatDateTime = () => {
    const date = new Date();
    const todayDate = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + date.toLocaleDateString("en-US", { weekday: 'long' });
    return todayDate;
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
      setTodayDay(savedAttendanceMarkDate || formatDateTime());
    }
    setLogs(savedLogs);
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog",
  });

  const fetchAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${"AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog"}`;
    try {
      const response = await axios.get(url);
      const result = response.data;
      return result.results?.[0]?.formatted_address || "Address not found.";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address.";
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // Latitude in radians
    const φ2 = (lat2 * Math.PI) / 180; // Latitude in radians
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  const handleClockIn = async () => {
    const currentTime = new Date();
    const formattedDate = formatDateTime();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Calculate the distance between the user's current location and the target location
          const distance = calculateDistance(latitude, longitude, targetLocation.lat, targetLocation.lng);

          if (distance <= 10000) {
            const fetchedAddress = await fetchAddress(latitude, longitude);

            // Update state
            setIsClockedIn(true);
            setClockInTime(currentTime);
            setTodayDay(formattedDate);
            setAddress(fetchedAddress);
            setClockInLatitude(latitude);
            setClockInLongitude(longitude);

            // Save to localStorage
            localStorage.setItem("isClockedIn", "true");
            localStorage.setItem("clockInTime", currentTime.toISOString());
            localStorage.setItem("clockInAddress", fetchedAddress);
            localStorage.setItem("attendanceMarkDate", formattedDate);
            localStorage.setItem("clockInLatitude", latitude);
            localStorage.setItem("clockInLongitude", longitude);

            handleOpen("xl");
            setShowMap(true);

            // Create the log object
            const clockInlog = {
              clockInTime: currentTime.toLocaleString(),
              clockInAddress: fetchedAddress,
              clockInLatitude: latitude,
              clockInLongitude: longitude,
              attendanceMarkDate: formattedDate,
              employeeId: Employee_Id,
            };

            try {
              const token = localStorage.getItem("Access Token");
              const response = await axios.post(`${config.hostedUrl}/logs/attendanceLogsPost`, clockInlog, {
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
              });

              const updatedLogs = [...logs, clockInlog];
              setLogs(updatedLogs);
              setUpdatedAttendanceLogs(updatedLogs);
              localStorage.setItem("clockLogs", JSON.stringify(updatedLogs));

              alert(`${response.data.message || "Log saved successfully."}`);
            } catch (error) {
              console.error("Error saving log:", error);
              alert("Failed to save log. Please try again.");
            }
          } else {
            alert("You must be within 30 meters of the Office location to clock in.");
          }
        },
        (error) => {
          alert("Location access is required to clock in. Please enable location services and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleClockOut = async () => {
    setShowMap(false);
    const currentTime = new Date();
    let fetchedAddress = "Address not available";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchedAddress = await fetchAddress(latitude, longitude);

          setClockOutLatitude(latitude);
          setClockOutLongitude(longitude);

          const newLog = {
            clockInTime: clockInTime?.toLocaleString(),
            clockOutTime: currentTime.toLocaleString(),
            clockInAddress: address,
            clockOutAddress: fetchedAddress,
            clockInLatitude: clockInLatitude,
            clockInLongitude: clockInLongitude,
            clockOutLatitude: latitude,
            clockOutLongitude: longitude,
            attendanceMarkDate: todayDay,
            employeeId: Employee_Id,
          };

          try {
            const token = localStorage.getItem("Access Token");
            const response = await axios.post(`${config.hostedUrl}/logs/attendanceLogsPost`, newLog, {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            });

            const updatedLogs = [...logs, newLog];
            setLogs(updatedLogs);
            setUpdatedAttendanceLogs(updatedLogs);
            localStorage.setItem("clockLogs", JSON.stringify(updatedLogs));

            // Clear clock-in state
            localStorage.setItem("isClockedIn", "false");
            setIsClockedIn(false);
            alert("Clock-out successful!");
          } catch (error) {
            console.error("Error saving log:", error);
            alert("Failed to save clock-out log.");
          }
        },
        (error) => {
          alert("Failed to retrieve your location for clock-out.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Utility to reset clock-in state
  const resetClockInState = () => {
    setIsClockedIn(false);
    setClockInTime(null);
    setClockInLatitude(null);
    setClockInLongitude(null);
    setClockOutLatitude(null);
    setClockOutLongitude(null);

    // Clear local storage
    localStorage.removeItem("isClockedIn");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("clockInAddress");
    localStorage.removeItem("attendanceMarkDate");
    localStorage.removeItem("clockLogs");
    localStorage.removeItem("clockInLatitude");
    localStorage.removeItem("clockInLongitude");
    localStorage.removeItem("clockOutLatitude");
    localStorage.removeItem("clockOutLongitude");
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    margin: "0 auto",
    borderRadius: "5px",
  };

  const center = {
    lat: clockInLatitude || 0,
    lng: clockInLongitude || 0,
  };

  const mapOptions = {
    zoom: 15,
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    draggable: false,
    disableDoubleClickZoom: true,
    gestureHandling: 'none',
    clickableIcons: false,
    draggableCursor: 'default',
    keyboardShortcuts: false
  };

  const customIcon = {
    url: MarkerIcon,
  };

  return (
    <>
      <div className="w-full lg:w-1/2 flex justify-end">
        <Card className="w-full lg:w-3/5 rounded-lg border border-gray-300 py-2 px-2">
          <Typography className="flex justify-between items-center mb-1 text-gray-600 text-xs font-normal">
            GENERAL SHIFT (11:30 AM - 08:30 PM)
            <h1
              className={`text-xs font-bold border border-gray-400 rounded-lg p-1 ${isClockedIn ? "text-green-800" : "text-red-800"
                } min-w-[1px] w-auto`}
            >
              {isClockedIn ? "Clocked In" : "Clocked Out"}
            </h1>
          </Typography>
          <div className="mb-1 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white">
                <BsClockHistory className="h-7 w-7 text-black" />
              </div>
              <div className="flex flex-col gap-.5">
                <div className="flex">
                  <Typography variant="medium" color="blue-gray" className="font-bold pl-1">
                    {todayDay}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography className="text-sm !font-medium !text-gray-600">
                    Worked for:{" "}
                    <span className="font-bold text-black">
                      0 / 8 hours
                    </span>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {isClockedIn ? (
            <>
              <Typography className="text-sm !font-bold !text-black">
                Clock-<span className="text-green-500 font-semibold">In</span> Time:{" "}
                <span className="text-black-500 font-normal">
                  {clockInTime?.toLocaleString()}
                </span>
              </Typography>
              <Typography className="text-sm !font-bold !text-black">
                Location: <span className="text-black-500 font-normal">{address}</span>
              </Typography>
              <div className="flex gap-1 w-full mt-1">
                <Button
                  onClick={handleClockOut}
                  className="bg-red-700 w-3/4"
                >
                  Clock Out
                </Button>
                <Button className="bg-black px-0 w-1/4" onClick={() => handleOpen("xxl")}>Logs</Button>
              </div>
            </>
          ) : (
            <>
              <Typography className="text-sm !font-bold !text-black">
                You are currently: <span className="text-red-500">Clocked Out</span>
              </Typography>
              <div className="flex gap-1 w-full mt-1">
                <Button
                  onClick={handleClockIn}
                  className="bg-green-700 w-3/4"
                >
                  Clock In
                </Button>
                <Button className="bg-black px-0 w-1/4" onClick={() => handleOpen("xxl")}>Logs</Button>
              </div>
            </>
          )}
        </Card>
      </div>
      <Dialog
        open={size === "xl"}
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader className="text-center sm:text-left">
          You are
          <h1
            className={`text-sm sm:text-base font-bold border border-gray-400 rounded-lg mx-2 p-1 
        ${isClockedIn ? "text-green-800" : "text-red-800"}
      `}
          >
            {isClockedIn ? "Clocked In" : "Clocked Out"}
          </h1>
          In ❤️
        </DialogHeader>
        <Typography className="flex justify-between items-center mb-1 text-gray-600 text-xs font-normal">
          {/* Additional content can go here */}
        </Typography>
        <DialogBody>
          {showMap && isLoaded && (
            <div className="w-full border border-sky-500 p-1 rounded-border">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={mapOptions}
              >
                {clockInLatitude && clockInLongitude && (
                  <Marker
                    position={{ lat: clockInLatitude, lng: clockInLongitude }}
                    icon={customIcon}
                  />
                )}
                {clockOutLatitude && clockOutLongitude && (
                  <Marker
                    position={{ lat: clockOutLatitude, lng: clockOutLongitude }}
                  />
                )}
              </GoogleMap>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex flex-col sm:flex-row justify-between">
          <span className="bg-black px-2 py-3 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20 mb-2 sm:mb-0">
            Precise Location: ON
          </span>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Back To HomePage</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        className="h-screen overflow-y-scroll"
        open={
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader className="flex justify-between">
          All the Attendance Logs
          <DialogFooter>
            <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1 border border-red-700">
              Cancel
            </Button>
          </DialogFooter>
        </DialogHeader>

        <DialogBody>
          <div className="bg-white mb-0 p-0 border-radius">
            {updatedAttendanceLogs && updatedAttendanceLogs.length > 0 ? (
              <ul className="space-y-4">
                {updatedAttendanceLogs.map((log, index) => (
                  <li key={log._id || index} className="border text-black p-3 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">
                      {log.attendanceMarkDate}
                    </h3>
                    <p>
                      <strong>EmployeeId:</strong> {log.Employee_Id}
                    </p>
                    <p>
                      <strong>Clock In Time:</strong> {log.clockInTime}
                    </p>
                    <p>
                      <strong>Clock In Address:</strong> {log.clockInAddress}
                    </p>
                    <p>
                      <strong>Clock Out Time:</strong> {log.clockOutTime || "N/A"}
                    </p>
                    <p>
                      <strong>Clock Out Address:</strong> {log.clockOutAddress || "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attendance logs available.</p>
            )}
          </div>
        </DialogBody>

      </Dialog>

    </>
  );
};

export default ClockInOut;
