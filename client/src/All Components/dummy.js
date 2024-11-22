import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { Button, Card, Typography } from "@material-tailwind/react";
import { FaIdCard } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const options = {
  disableDefaultUI: true,
  draggable: false,
  zoomControl: false,
};

const Login = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [todayDay, setTodayDay] = useState("");
  const [workedSince, setWorkedSince] = useState("00:00:00");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog",
  });

  const fetchLocation = () => {
    setLoadingLocation(true); // Start loading
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
          setError(""); // Clear any previous errors
          setLoadingLocation(false); // End loading
        },
        (err) => {
          setError("Location access denied. Please enable location services.");
          setLoadingLocation(false); // End loading
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingLocation(false); // End loading
    }
  };

  const fetchAddress = async (lat, lng) => {
    const API_KEY = "AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    try {
      const response = await axios.get(url);
      const result = response.data;
      if (result.results && result.results[0]) {
        setAddress(result.results[0].formatted_address);
      } else {
        setAddress("Address not found.");
      }
    } catch (error) {
      setAddress("Error fetching address.");
    }
  };

  const formatDateTime = () => {
    const date = new Date();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const day = date.toLocaleDateString("en-US", options);
    const todayDay = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', weekday: 'long' });
    setDateTime(`${time}, ${day}`);
    setTodayDay(todayDay); 
  };
  

  const handleClockIn = () => {
    if (location && address) {
      const clockInData = {
        coordinates: location,
        date: new Date().toLocaleDateString(),
        time: dateTime,
        address: address,
      };
      localStorage.setItem("clockInData", JSON.stringify(clockInData));
      setClockInTime(new Date()); // Store the clock-in time
      setWorkedSince("00:00:00"); // Reset worked time when clocking in
      alert("Clocked In Successfully!");
    } else {
      alert("Please wait for location data to load.");
    }
  };

  const handleClockOut = () => {
    const clockOutTime = new Date();
    const timeDiff = Math.floor((clockOutTime - clockInTime) / 1000); // Time difference in seconds
    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    alert(`Clocked Out. Total time: ${hours}:${minutes}:${seconds}`);
    setClockInTime(null); // Reset clock-in time after clocking out
  };

  useEffect(() => {
    const calculateWorkedTime = () => {
      if (clockInTime) {
        const currentTime = new Date();
        const timeDiff = Math.floor((currentTime - clockInTime) / 1000); // Time difference in seconds
        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;
        const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        setWorkedSince(formattedTime);
      }
    };
  
    const intervalId = setInterval(() => {
      formatDateTime();
      calculateWorkedTime(); // Update worked time every second
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [clockInTime]); // Only depend on clockInTime, as calculateWorkedTime is now inside the effect
  
  

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="login-container">
      <Button onClick={fetchLocation} disabled={loadingLocation}>
        {loadingLocation ? "Loading Location..." : "Fetch Location"}
      </Button>

      {location && (
        <div>
          <div style={mapContainerStyle}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={15}
              options={options}
            >
              <Marker position={location} />
            </GoogleMap>
          </div>
          <p>
            <strong>Coordinates:</strong> {location.lat}, {location.lng}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <div>
            <strong>Current Time and Date:</strong> {dateTime}
          </div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="w-1/2 flex justify-end">
        <Card className="w-3/5 rounded-lg border border-gray-300 py-2 px-3">
          <Typography className="mb-1 text-gray-600 text-xs font-normal">
            GENERAL SHIFT (11:30 AM - 08:30 PM)
          </Typography>
          <div className="mb-2 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white border border-gray-400 p-1.5 rounded-lg">
                <FaIdCard className="h-6 w-6 text-black" />
              </div>
              <div className="flex">
                <Typography variant="medium" color="blue-gray" className="font-bold">
                  {todayDay}
                </Typography>
              </div>
              <div>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <Typography className="mb-1 text-sm !font-medium !text-gray-600">
                Worked Since:
              </Typography>
              <Typography className="text-sm font-medium text-gray-500">
                {workedSince}
              </Typography>
            </div>
          </div>
          {clockInTime === null ? (
            <div className="border border-gray-400 rounded-lg p-1" onClick={handleClockIn}>
              <Button className="w-full bg-green-700">Clock In</Button>
            </div>
          ) : (
            <div className="flex border border-gray-400 rounded-lg gap-2 p-1" onClick={handleClockOut}>
              <Button className="w-full bg-red-700">Clock Out</Button>
              <Button className="w-full bg-white text-black text-sm border border-gray-300 cursor-default pointer-events-none">      <p> {workedSince}</p>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;
