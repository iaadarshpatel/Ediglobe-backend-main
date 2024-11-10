import axios from "axios";
import React, { useEffect, useState } from "react";
import Profile from "../../assets/bg-profile.webp"
import { IconButton, ListItem, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { MdMail } from "react-icons/md";
import { FaPhoneAlt, FaIdBadge, FaBirthdayCake, FaUserCog } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployeesDetails} from "../redux/slice/employeeSlice";

const customColor = '#000000';

const ProfileSection = () => {
  const [advice, setAdvice] = useState("");

  const dispatch = useDispatch();
  const allDetails = useSelector(state => state.employeesDetails);

  const {Employee_Id, Employee_Name, DOB, Designation, DOJ, Personal_Email, Office_Email, Phone, Profile_img
  } = allDetails.data || {};
  console.log(Employee_Id );
  

  // Fetch advice on component mount
  useEffect(() => {
    // Fetch advice when the component mounts
    axios.get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        setAdvice(advice); // Update advice
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch employee details on component mount
  useEffect(() => {
      dispatch(fetchEmployeesDetails());
  }, [dispatch]);

  if(allDetails.isLoading){
    return <h1>Loading...</h1>;
}

  return (
    <>
      <div>
        <section className="relative pt-36 pb-8 bg-blue-gray-50 rounded-border">
          <img src={Profile} alt="cover" className="rounded-tr-lg rounded-tl-lg w-full absolute top-0 left-0 z-0 h-60 object-cover" />

          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <div className="flex items-center justify-center mb-2.5 ">
            <img 
              src={Profile_img}
              alt="user-avatar" 
              className="border-4 w-48 h-48 border-solid border-white rounded-full object-cover object-center shadow-xl shadow-blue-gray-600/50" 
            />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
              <ul className="flex items-center gap-5">
                <li>
                <div class="block max-lg:pl-6">
                <h5 class="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap mb-1.5">
                  Welcome back,
                </h5>
              </div>
                </li>
              </ul>

              <div className="flex gap-4 justify-center">
                <IconButton className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
                  <i className="fab fa-google text-lg" />
                </IconButton>
                <IconButton className="rounded bg-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                  <i className="fab fa-twitter text-lg" />
                </IconButton>
                <IconButton className="rounded bg-[#ea4c89] hover:shadow-[#ea4c89]/20 focus:shadow-[#ea4c89]/20 active:shadow-[#ea4c89]/10">
                  <i className="fab fa-dribbble text-lg" />
                </IconButton>
                <IconButton className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
                  <i className="fab fa-github text-lg" />
                </IconButton>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button className="rounded-full border border-solid border-black-600 bg-black py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500">
                  Full Time
                </button>
              </div>
            </div>

            {/* Name and description */}
            <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3 ">
              {Employee_Name}
            </h3>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 mr-2 mb-4" // Add margin to the right for spacing
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1556 29.4389L15.1556 15.7709L9.96491 15.7709C7.47307 10.3036 11.6949 6.83404 14.1173 5.78265L14.1173 1.23418e-06C-3.74082 1.26167 -0.937509 20.1517 2.69642 29.4389L15.1556 29.4389Z"
                    fill="black" // Changed color to black
                  />
                  <path
                    d="M31.9993 29.4389L31.9994 15.7709L26.8087 15.7709C24.3168 10.3036 28.5387 6.83404 30.9611 5.78265L30.9611 1.23418e-06C13.1029 1.26167 15.9062 20.1517 19.5402 29.4389L31.9993 29.4389Z"
                    fill="black" // Changed color to black
                  />
                </svg>
                <p className="font-normal text-base leading-7 text-gray-500 text-center">
                  {advice}
                </p>
                <svg
                  className="w-8 h-8 ml-2 mb-4" // Add margin to the left for spacing
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.8444 0.00050603L16.8444 13.6686L22.0351 13.6686C24.5269 19.1358 20.3051 22.6054 17.8827 23.6568L17.8827 29.4395C35.7408 28.1778 32.9375 9.28779 29.3036 0.000507119L16.8444 0.00050603Z"
                    fill="black"
                  />
                  <path
                    d="M0.000651072 0.00050603L0.000649877 13.6686L5.19134 13.6686C7.68318 19.1358 3.46132 22.6054 1.03891 23.6568L1.03891 29.4395C18.8971 28.1778 16.0938 9.28779 12.4598 0.000507119L0.000651072 0.00050603Z"
                    fill="black"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_9553_63113"
                      x1="16.8444"
                      y1="27.7528"
                      x2="39.5993"
                      y2="17.4644"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#7C3AED" />
                      <stop offset="0.993738" stop-color="#4F46E5" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_9553_63113"
                      x1="0.000648535"
                      y1="27.7528"
                      x2="22.7556"
                      y2="17.4644"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#7C3AED" />
                      <stop offset="0.993738" stop-color="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

          </div>
          <div className="mt-2">
          </div>
        </section>

        <section className="relative mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-border p-2">
            <ul className="grid grid-cols-1 gap-3 transition-opacity duration-300">
              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <FaUser style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Name:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {Employee_Name}
                    </span>
                  </Typography>
                </div>
              </ListItem>

              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <BiLogoGmail style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Personal Email:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {Personal_Email}
                    </span>
                  </Typography>
                </div>
              </ListItem>

              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <MdMail style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Office Mail:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {Office_Email}
                    </span>
                  </Typography>
                </div>
              </ListItem>

              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <FaPhoneAlt style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Phone:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {Phone}
                    </span>
                  </Typography>
                </div>
              </ListItem>
            </ul>
          </div>

          <div className="rounded-border p-2">
            <ul className="grid grid-cols-1 gap-3 transition-opacity duration-300">
              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <FaIdBadge style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Employee Id:
                    <span className="inline-flex items-center rounded-md bg-black ml-2 px-2 py-1.5 text-xs font-bold text-white">
                      {Employee_Id}
                    </span>
                  </Typography>
                </div>
              </ListItem>

              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <MdDateRange style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Date of Joining:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {DOJ}
                    </span>
                  </Typography>
                </div>
              </ListItem>

              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <span>
                    <FaUserCog style={{ color: customColor, fontSize: '1.2rem' }} />
                  </span>
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Designation:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {Designation}
                    </span>
                  </Typography>
                </div>
              </ListItem>

              <ListItem className="flex items-center gap-3 rounded-lg py-2 hover:bg-blue-gray-50">
                <div className="flex items-center justify-center rounded-lg bg-blue-gray-50 p-3">
                  <FaBirthdayCake style={{ color: customColor, fontSize: '1.2rem' }} />
                </div>
                <div className="flex-1">
                  <Typography variant="text" color="blue-gray" className="text-sm md:text-base font-bold">
                    Date of Birth:
                    <span className="ml-2 text-blue-gray-900 font-bold text-sm md:text-base">
                      {DOB}
                    </span>
                  </Typography>
                </div>
              </ListItem>
            </ul>
          </div>
        </section>

      </div>
    </>
  );
};

export default ProfileSection;
