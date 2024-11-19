import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const options = {
  disableDefaultUI: true, // Hides default controls
  draggable: false, // Prevents map dragging
  zoomControl: false, // Disables zoom control
};

const Login = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog", // Replace with your API key
  });

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
          setError("");
        },
        (err) => {
          setError("Location access denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

   // Custom Marker Style
   const markerIcon = {
    fillColor: "blue",  // Circle fill color
    fillOpacity: 0.8,  // Circle fill opacity
    strokeColor: "white",  // Circle border color
    strokeWeight: 2,  // Circle border thickness
    scale: 10,  // Circle size
  };


  const fetchAddress = async (lat, lng) => {
    const API_KEY = "AIzaSyByruGZGFedhP3qrKosNr86J4_5VtbvHog"; // Replace with your API key
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

    // Extract day, date, and time in the desired format
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const day = date.toLocaleDateString("en-US", options);

    // Combine everything in the required format
    const formattedDateTime = `${time}, ${day}`;

    setDateTime(formattedDateTime);
  };

  const handleClockIn = () => {
    // Check if location and address are available
    if (location && address) {
      const clockInData = {
        coordinates: location,
        date: new Date().toLocaleDateString(),
        time: dateTime,
        address: address,
      };

      // Store the clock-in data in local storage
      localStorage.setItem("clockInData", JSON.stringify(clockInData));
      alert("Clocked In Successfully!");
    } else {
      alert("Please wait for location data to load.");
    }
  };

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(formatDateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={fetchLocation}>Get Location</button>
      {location && (
        <div>
          {/* <p>
            <strong>Coordinates:</strong> {location.lat}, {location.lng}
          </p> */}
          <p>
            <strong>Address:</strong> {address}
          </p>
          <div style={mapContainerStyle}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={15} // Set the zoom level
              options={options}
            >
              <Marker icon={markerIcon} position={location} />
            </GoogleMap>
          </div>
          <div>
        <h3>Current Time and Date</h3>
        <p>{dateTime}</p>
      </div>
          <button onClick={handleClockIn}>Clock In</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
    </div>
  );
};

export default Login;
