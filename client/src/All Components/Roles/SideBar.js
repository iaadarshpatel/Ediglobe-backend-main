"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Card, Badge, Typography, List, ListItem, ListItemPrefix, IconButton } from "@material-tailwind/react";
import { PowerIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Birthday from "../Birthday.js";
import avatar from '../../assets/avatar.jpg';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesDetails } from "../redux/slice/employeeSlice";
import Admin from "./Admin.js";
import Sales from "./Sales.js";
import PostSales from "./PostSales.js";

const roleAccess = {
  "Admin": ["EGE0567", "EGE0004", "EGE0007", "EGE0001"],
  "Sales": ["EGE0062", "EGE0024", "EGE0034", "EGE0178", "EGE0007", "EGE0001"],
  "Post Sales": ["EGE0025", "EGE0052", "EGE0024"],
};
const getEmojiForRole = (role) => {
  switch (role) {
    case "Sales":
      return "💼";
    case "Post Sales":
      return "⚙️";
    case "Human Resource":
      return "👥";
    default:
      return "🌟";
  }
};

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState("Sales");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allDetails = useSelector(state => state.employeesDetails);

  const { Designation, Employee_Id, Employee_Name } = allDetails.data || {};

  // Fetch employee details on component mount
  useEffect(() => {
    dispatch(fetchEmployeesDetails());
  }, [dispatch]);

  const displayEmployeeName = Employee_Name ? Employee_Name.slice(0, 12) : '';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/Employeelogin', { replace: true });
    }
  }, [navigate]);

  const isAuthorizedForRole = (role) => {
    return roleAccess[role]?.includes(Employee_Id);
  };

  const authorizedRoles = Object.keys(roleAccess).filter((role) =>
    isAuthorizedForRole(role)
  );

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('toastShown');
    navigate('/Employeelogin', { replace: true });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (selectedRole === "Admin") {
  //     navigate("/AdminDashboard");
  //   }
  // }, [selectedRole, navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const customColor = '#000000';


  return (
    <div className="flex mt-1 ml-2 text-gray-700 rounded-xl border border-gray-300 border-b-0 custom-shadow z-50">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <IconButton variant="text" className="m-2" onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </IconButton>
      </div>

      {/* Sidebar Container */}
      <Card className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:w-64 w-full lg:max-w-[18rem] h-full p-4 bg-white custom-shadow overflow-y-auto z-50 overflow-x-hidden`}>
        <div className="mb-3 flex items-center gap-4 p-4 bg-blue-gray-50 text-gray-700 rounded-xl border border-gray-300 border-b-0 custom-shadow">
          <Badge placement="top-end" overlap="circular" color="green" withBorder>
            <Avatar
              src={avatar}
              alt="avatar"
              withBorder={true}
              className="p-0.5"
              style={{ borderColor: customColor, borderWidth: '2px' }}
            />
          </Badge>
          <div>
            <Typography variant="h6" style={{ color: customColor }}>{displayEmployeeName}</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {Designation}
            </Typography>
            <span className="inline-flex items-center rounded-md bg-black px-2 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20">
              {Employee_Id || "login again"}
            </span>
          </div>
        </div>

        {/* Select Roles */}
        <select
          className="focus:ring-0 w-full border border-black-500 rounded-md p-2 border-2 cursor-pointer transition-all duration-300 ease-in-out"
          value={selectedRole}
          onChange={(e) => {
            const role = e.target.value;
            if (authorizedRoles.includes(role)) {
              setSelectedRole(role);
            } else {
              alert("You are not authorized to access this role.");
            }
          }} >
          {/* Filter roles based on authorization */}
          {authorizedRoles.length === 0 ? (
            <option value="NA" className="sm:text-sm bg-black text-white">
              ❓Not Assigned yet
            </option>
          ) : (
            authorizedRoles.map((role) => (
              <option key={role} className="sm:text-sm bg-black text-white" value={role}>
                {getEmojiForRole(role)} {role}
              </option>
            ))
          )}
        </select>
        <hr className="my-2 border-black-gray-50" />

        {/* Sidebar List */}
        <List>
          {/* Items for Sales*/}
          {(selectedRole === "Sales") && (
            <Sales />
          )}

          {/* Items for Admin */}
          {selectedRole === "Admin" && (
            <Admin />
          )}

          {/* Items for Post Sales*/}
          {selectedRole === "Post Sales" && (
            <PostSales />
          )}


          {/* Common Logout */}
          <ListItem onClick={handleLogout} style={{ "color": "red" }}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
        <Birthday />
      </Card>
    </div>
  );
};

export default SideBar;
