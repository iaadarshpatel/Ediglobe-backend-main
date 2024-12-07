"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Card, Badge, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody, IconButton } from "@material-tailwind/react";
import { BanknotesIcon, ChevronDownIcon, CalendarDateRangeIcon, PowerIcon, BellAlertIcon, ChevronRightIcon, UserCircleIcon, TableCellsIcon, Bars3Icon, UserGroupIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountTree } from "react-icons/md";
import Birthday from "../Birthday.js";
import avatar from '../../assets/avatar.jpg';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesDetails } from "../redux/slice/employeeSlice";

const roleAccess = {
  "Sales": [ "EGE0062", "EGE0024", "EGE0034", "EGE0178"],
  "Post Sales": ["EGE0025", "EGE0052", "EGE0024"],
  "Human Resource": ["EGE0567", "EGE0004"],
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
  const [open, setOpen] = useState(0);
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
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

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
          {/* Common Items for all roles */}
          {(selectedRole === "Sales" || selectedRole === "Human Resource") && (
            <>
              {/* Payments Accordion */}
              <Accordion open={open === 1} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}>
                <ListItem className="p-0">
                  <AccordionHeader onClick={() => handleOpen(1)} className={`border-b-0 p-3 ${open === 1 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                    <ListItemPrefix>
                      <BanknotesIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">Payments</Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <Link to="/CheckPayments">
                      <ListItem className="cursor-pointer">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Check Payment
                      </ListItem>
                    </Link>
                    <Link to="/AllPayments">
                      <ListItem>
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        All Payments
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>

              {/* Attendance Accordion */}
              <Accordion open={open === 2} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}>
                <ListItem className="p-0">
                  <AccordionHeader onClick={() => handleOpen(2)} className={`border-b-0 p-3 ${open === 2 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                    <ListItemPrefix>
                      <CalendarDateRangeIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">Attendance</Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <Link to="/Attendance">
                      <ListItem className="cursor-pointer">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Attendance Details
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>

              <hr className="my-2 border-black-gray-50" />

              <ListItem onClick={() => navigate("/Notification")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <BellAlertIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Notification
              </ListItem>

              <ListItem onClick={() => navigate("/LeadsDistribution")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <TableCellsIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                PGFL Leads
              </ListItem>
              <ListItem onClick={() => navigate("/leadgen")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Lead Gen.
              </ListItem>

              <ListItem onClick={() => alert("Coming Soon!")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <MdAccountTree className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Team
                <span className="inline-flex items-center rounded-md ml-1 bg-black px-2 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20">
                  Coming Soon
                </span>
              </ListItem>

              <ListItem onClick={() => alert("Coming Soon!")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <NewspaperIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                DPS.
                <span className="inline-flex items-center rounded-md ml-1 bg-black px-2 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20">
                  Coming Soon
                </span>
              </ListItem>
              <ListItem onClick={() => navigate("/profile")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Profile
              </ListItem>

            </>
          )}

          {/* Role-based Items */}
          {selectedRole === "Post Sales" && (
            <>
              {/* Payments Accordion */}
              <Accordion open={open === 1} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}>
                <ListItem className="p-0">
                  <AccordionHeader onClick={() => handleOpen(1)} className={`border-b-0 p-3 ${open === 1 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                    <ListItemPrefix>
                      <BanknotesIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">Payments</Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <Link to="/CheckPayments">
                      <ListItem className="cursor-pointer">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Check Payment
                      </ListItem>
                    </Link>
                    <Link to="/AllPayments">
                      <ListItem>
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        All Payments
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>

              {/* Attendance Accordion */}
              <Accordion open={open === 2} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}>
                <ListItem className="p-0">
                  <AccordionHeader onClick={() => handleOpen(2)} className={`border-b-0 p-3 ${open === 2 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                    <ListItemPrefix>
                      <CalendarDateRangeIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">Attendance</Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <Link to="/Attendance">
                      <ListItem className="cursor-pointer">
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Attendance Details
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>

              <hr className="my-2 border-black-gray-50" />
              <ListItem onClick={() => navigate("/Notification")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <BellAlertIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Notification
              </ListItem>

              <ListItem onClick={() => navigate("/LeadsDistribution")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <TableCellsIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                PGFL Leads
              </ListItem>
              <ListItem onClick={() => navigate("/leadgen")} className={`border-b-0 p-3 ${open === 4 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Lead Gen.
              </ListItem>

              <ListItem onClick={() => alert("Coming Soon!")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <MdAccountTree className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Team
                <span className="inline-flex items-center rounded-md ml-1 bg-black px-2 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-green-600/20">
                  Coming Soon
                </span>
              </ListItem>
            </>
          )}

          {selectedRole === "Sales" && (
            <>
              {/* Add Sales-specific ListItems */}
            </>
          )}

          {selectedRole === "Human Resource" && (
            <>
              <ListItem onClick={() => navigate("/Notification")} className={`border-b-0 p-3 ${open === 3 ? 'bg-blue-gray-50' : 'hover:bg-blue-gray-50'}`}>
                <ListItemPrefix>
                  <BellAlertIcon className="h-5 w-5 text-black" />
                </ListItemPrefix>
                Notification
              </ListItem>
            </>
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
