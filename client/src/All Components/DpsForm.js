import React, { useEffect, useState } from 'react';
import SideBar from './Roles/SideBar';
import LottieFile from './LottieFile';
import config from '../config';
import { Button, Card, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { PencilSquareIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesDetails } from '../All Components/redux/slice/employeeSlice'
import { MdEmail } from "react-icons/md";
import { FaUserCheck, FaSquarePhone, FaRegCalendarCheck } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdOutlineError } from "react-icons/md";
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';

const DpsForm = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm();

    const dispatch = useDispatch();
    const allDetails = useSelector(state => state.employeesDetails);
    const { Employee_Id, Employee_Name } = allDetails.data || {};
    const [studentPersonalEmail, setStudentPersonalEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dpsFormData, setDpsFormData] = useState(null);
    const [size, setSize] = useState(false);
    const handleOpen = (value) => setSize(value);

    const [employeeDetails, setEmployeeDetails] = useState({
        Employee_Id: '',
        Employee_Name: ''
    });

    const handleEmailChange = (e) => {
        setStudentPersonalEmail(e.target.value);
        setIsLoading(false);
    };

    const CheckDpsStatus = async () => {
        try {
            const token = localStorage.getItem("Access Token");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!studentPersonalEmail || !emailRegex.test(studentPersonalEmail)) {
                setError("Email address is invalid or blank");
                return;
            }
            setIsLoading(true);
            const response = await axios.get(`${config.hostedUrl}/dpsForm/dpsFormDataById/${studentPersonalEmail}`, {
                headers: {
                    Authorization: token,
                }
            });
            if (response.data && response.data.length > 0) {
                setDpsFormData(response.data);
                setStudentPersonalEmail("");
                setIsLoading(false);
                setError(null);
            } else {
                setError("No data found for the provided email.");
                setStudentPersonalEmail("");
                setIsLoading(false);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to update DPS data';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    const formatDateTime = () => {
        const date = new Date();
        const todayDate = date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + date.toLocaleDateString("en-US", { weekday: 'long' });
        return todayDate;
    };

    useEffect(() => {
        dispatch(fetchEmployeesDetails());
    }, [dispatch]);

    useEffect(() => {
        if (Employee_Id && Employee_Name) {
            setEmployeeDetails({ Employee_Id, Employee_Name });
            setValue("Employee_Id", Employee_Id);
            setValue("Employee_Name", Employee_Name);
        }
    }, [Employee_Id, Employee_Name, setValue]);

    const onSubmit = async (data) => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const formattedDate = formatDateTime();
        const dataWithDate = { ...data, DateOfDpsFilled: formattedDate };
        await delay(3000);
        try {
            setError(false);
            const token = localStorage.getItem("Access Token");
            const { studentPersonalEmail, domainOpted } = data;
            console.log(data);
            if (studentPersonalEmail === dpsFormData.studentPersonalEmail &&
                domainOpted === dpsFormData.domainOpted
            ) {
                alert("DPS data already exists for the provided email.");
                return;
            }
            const response = await axios.post(`${config.hostedUrl}/dpsForm/dpsFormData`, dataWithDate, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            setDpsFormData(response.data);
            alert("DPS data updated successfully!");
            reset();
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to update DPS data';
            alert(errorMessage);
        } finally {
            setDpsFormData([]);
        }
    };

    return (
        <>
            <div className="flex h-full mt-1 opacity-1">
                <LottieFile />
                <SideBar />
                <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
                    <div className="w-full flex flex-col sm:flex-row gap-2 mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
                        <div className="w-full sm:w-1/2 p-3 mb-3 rounded-border">
                            <Typography variant="md" color="blue-gray" className="font-bold">
                                Daily Payment Form📝:
                            </Typography>
                            <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
                                Please fill out your DPS form on the same day you receive the payment.<br />
                            </Typography>
                            <div className="flex flex-col items-start gap-2 mt-1">
                                <div className="flex items-center gap-2">
                                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-black" />
                                    <Typography
                                        color="gray"
                                        className="text-sm font-normal text-blue-gray-500">
                                        Once the DPS form is submitted, it cannot be <span className="text-indigo-800 font-semibold">edited</span> or <span className="text-indigo-800 font-semibold">modified.</span>
                                    </Typography>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PencilSquareIcon className="h-5 w-5 text-black" />
                                    <Typography
                                        color="gray"
                                        className="text-sm font-normal text-blue-gray-500"
                                    >
                                        Please ensure the <span className="text-yellow-800 font-semibold">correct lead's email ID</span> is entered while filling out the DPS form.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 p-3 mb-3 rounded-border">
                            <Typography variant="md" color="blue-gray" className="font-bold">
                                Check your DPS Status:
                            </Typography>
                            <div className="relative flex flex-col gap-3 md:flex-row items-center w-full">
                                <div className="relative w-full">
                                    <FaUserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                    <input
                                        type="text"
                                        placeholder="Enter student email"
                                        value={studentPersonalEmail}
                                        onChange={handleEmailChange}
                                        className="w-full py-2.5 pl-12 pr-3 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-gray-400 rounded-md transition duration-300 ease focus:outline-none focus:border-black-400 hover:border-black-300 shadow-sm focus:shadow-lg focus:shadow-gray-400"
                                    />
                                </div>
                                <Button
                                    className="w-full md:w-auto bg-black text-white rounded-lg"
                                    type="button"
                                    onClick={CheckDpsStatus}>
                                    {isLoading ? (
                                        <Hourglass
                                            visible={true}
                                            height="20"
                                            width="16"
                                            ariaLabel="hourglass-loading"
                                            colors={["white"]}
                                        />
                                    ) : (
                                        "Check"
                                    )}
                                </Button>
                            </div>
                            <Dialog
                                open={size === "md"}
                                size={size || "md"}
                                handler={handleOpen}
                                className="h-full overflow-y-auto"
                            >
                                <DialogHeader className="text-center sm:text-left">
                                    <h1 className='flex justify-center'>View all your📝&nbsp;
                                        <Typewriter
                                            options={{
                                                strings: [`<span style="color: #16a34a";">DPS Records exclusively!</span>`],
                                                autoStart: true,
                                                loop: true,
                                                delay: 200, // Adjust typing speed
                                                deleteSpeed: 100, // Adjust delete speed
                                            }}
                                        />
                                    </h1>
                                </DialogHeader>
                                <DialogBody>
                                    <Typography variant="text" className="whitespace-nowrap font-bold mb-2 text-purple-600 flex items-center">
                                        Total Domains Opted:
                                        <Chip color='indigo' value={dpsFormData?.length} className='text-white bg-black font-bold inline-block pt-2 ml-1' />
                                    </Typography>
                                    {dpsFormData?.map((item, index) => (
                                        <div key={index}
                                            className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white">
                                            <Typography variant="md" color="blue-gray" className="font-bold mt-1">
                                                Student Email: <span className="font-normal text-blue-gray-500">{item.studentPersonalEmail}</span>
                                            </Typography>
                                            <Typography variant="md" color="blue-gray" className="font-bold mt-1">
                                                Lead Belongs to: <span className="font-normal text-blue-gray-500">{item.Employee_Id}</span>
                                            </Typography>
                                            <Typography variant="md" color="blue-gray" className="font-bold mt-1">
                                                DPS Filled Date: <span className="font-normal text-blue-gray-500">{item.DateOfDpsFilled}</span>
                                            </Typography>
                                            <Typography variant="md" color="blue-gray" className="font-bold mt-1">
                                                Domain Opted: <span className="font-normal text-blue-gray-500">{item.domainOpted}</span>
                                            </Typography>
                                        </div>
                                    ))}
                                </DialogBody >
                                <DialogFooter>
                                    <Button className='bg-black w-auto' onClick={handleOpen}>
                                        <span className='inline'>Back To HomePage 🏠</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                            {!dpsFormData?.length > 0 && (
                                <Typography variant="sm" className="font-normal text-black opacity-80 mt-2">
                                    <b style={{ color: "red", fontWeight: "bold", backgroundColor: "white" }}>Note:</b>
                                    <span> Use your lead’s <mark>email address</mark> to check the current DPS status and the date when the DPS was filled🔍.</span>
                                </Typography>
                            )}
                            {dpsFormData?.length > 0 ? (
                                <div className="mt-1 flex flex-col sm:flex-row justify-between items-center">
                                    <Typography
                                        variant="sm"
                                        className="font-normal text-green-700 opacity-90 mt-2 text-center sm:text-left"
                                    >
                                        Successfully found the data, click to <strong
                                            onClick={() => handleOpen("md")}
                                            className="cursor-pointer text-black font-semibold"
                                        >View 👀
                                        </strong>
                                    </Typography>
                                    <button
                                        onClick={() => { setDpsFormData([]); setError(null); }}
                                        className="mt-4 sm:mt-0 border border-red-300 rounded-lg px-4 py-1.5 text-red-600 bg-white hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                                    >
                                        Clear
                                    </button>
                                </div>
                            ) : (
                                <div className="font-medium p-2 mt-2 text-sm text-red-800 rounded-lg">{error}</div>
                            )}
                        </div>
                    </div>

                    {/* Daily Payment Form */}
                    <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
                        <form
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Student Name
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <FaUserCheck className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <input
                                            type="text"
                                            placeholder='Enter Student Name'
                                            {...register("studentName", { required: true, minLength: 3, maxLength: 15 })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            autocomplete="off"
                                        />
                                    </div>
                                    {errors.studentName && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" /> Student name is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Student Personal Email
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <input
                                            placeholder='Enter Student Email'
                                            type="email"
                                            {...register("studentPersonalEmail", {
                                                required: true,
                                                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                            })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            autocomplete="off"
                                        />
                                    </div>
                                    {errors.studentPersonalEmail && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />The email is required and must match the one used during registration
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Contact Number
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <FaSquarePhone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <input
                                            placeholder='Enter Phone Number'
                                            type="tel"
                                            {...register("contactNumber", {
                                                required: true,
                                                pattern: /^[6-9]\d{9}$/,
                                            })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            autocomplete="off"
                                        />
                                    </div>
                                    {errors.contactNumber && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" /> Phone number must start with 6-9 and be 10 digits
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            WhatsApp Number
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <FaSquarePhone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <input
                                            placeholder='Enter WhatsApp Number'
                                            type="tel"
                                            {...register("whatsAppNumber", {
                                                required: true,
                                                pattern: /^[6-9]\d{9}$/,
                                            })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            autocomplete="off"
                                        />
                                    </div>
                                    {errors.whatsAppNumber && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" /> WhatsApp number must start with 6-9 and be 10 digits
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Date of Registration
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <FaRegCalendarCheck className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <input
                                            placeholder='Enter Registration Date'
                                            type="date"
                                            {...register("DateOfRegistration", { required: true })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            autocomplete="off"
                                        />
                                    </div>
                                    {errors.DateOfRegistration && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Date of Registration is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            College Name
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <FaUniversity className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <input
                                            placeholder='Enter College Name'
                                            type="text"
                                            {...register("collegeName", { required: true, minLength: 3, maxLength: 40 })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            autocomplete="off"
                                        />
                                    </div>
                                    {errors.collegeName && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />College name is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Department
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("department", { required: true })}
                                            className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                            placeholder="Select Department">
                                            <option value="">Choose department</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="MBA">MBA</option>
                                            <option value="B.Com/BBA">B.Com/BBA</option>
                                            <option value="Phar.">Phar.</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {errors.department && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Department is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Stream
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("stream", { required: true })}
                                            className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting} >
                                            <option value="">Choose Stream</option>
                                            <option value="CSE/IT">CSE/IT</option>
                                            <option value="ECE/EEE">ECE/EEE</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Civil">Civil</option>
                                            <option value="BioTech">BioTech</option>
                                            <option value="Aeronautical">Aeronautical</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {errors.stream && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Stream is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Graduation Year
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("graduationYear", { required: true })} className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting} >
                                            <option value="">Choose Graduation Year</option>
                                            <option value="1st">1st</option>
                                            <option value="2nd">2nd</option>
                                            <option value="3rd">3rd</option>
                                            <option value="4th">4th</option>
                                        </select>
                                    </div>
                                    {errors.graduationYear && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Graduation Year is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Domain Opted
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("domainOpted", { required: true })} className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}>
                                            <option value="">Choose Domain</option>
                                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                                            <option value="Machine Learning">Machine Learning</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="JAVA">JAVA</option>
                                            <option value="Cyber Security">Cyber Security</option>
                                            <option value="Amazon Web Services">Amazon Web Services</option>
                                            <option value="Python">Python</option>
                                            <option value="Android Development">Android Development</option>
                                            <option value="Stock Marketing">Stock Marketing</option>
                                            <option value="Business Analytics">Business Analytics</option>
                                            <option value="Very Large Scale Integration">Very Large Scale Integration</option>
                                            <option value="NANO Science">NANO Science</option>
                                            <option value="Bio-informatics">Bio-informatics</option>
                                            <option value="Genetic Engineering">Genetic Engineering</option>
                                            <option value="IoT-Robotics">IoT-Robotics</option>
                                            <option value="Car Designing">Car Designing</option>
                                            <option value="AutoCAD">AutoCAD</option>
                                            <option value="Hybrid & Electric Vehicles">Hybrid & Electric Vehicles</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Digital Marketing">Digital Marketing</option>
                                            <option value="Construction Planning">Construction Planning</option>
                                            <option value="Embedded Systems">Embedded Systems</option>
                                            <option value="Human Resources">Human Resources</option>
                                        </select>
                                    </div>
                                    {errors.domainOpted && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Domain is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Domain Type
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("domainType", { required: true })} className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting} >
                                            <option value="">Choose Domain Type</option>
                                            <option value="Self Learning">Self Learning</option>
                                            <option value="Self Learning with ADD ON">Self Learning with ADD ON</option>
                                            <option value="Expert Lead Program">Expert Lead Program</option>
                                            <option value="Expert Lead Program with ADD ON">Expert Lead Program with ADD ON</option>
                                            <option value="Offline">Offline</option>
                                        </select>
                                    </div>
                                    {errors.domainType && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Domain Type is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Amount Pitched
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("amountPitched", { required: true })} className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting} >
                                            <option value="">Choose Amount</option>
                                            <option value="3500">3500</option>
                                            <option value="4000">4000</option>
                                            <option value="4500">4500</option>
                                            <option value="5000">5000</option>
                                            <option value="5500">5500</option>
                                            <option value="7500">7500</option>
                                            <option value="12000-18000">12000-18000</option>
                                        </select>
                                    </div>
                                    {errors.amountPitched && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Amount is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="text">
                                        <Typography
                                            variant="medium"
                                            color="blue-gray"
                                            className="block font-medium mb-1">
                                            Amount Paid
                                        </Typography>
                                    </label>
                                    <div className="relative">
                                        <BiSolidSelectMultiple className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black" />
                                        <select {...register("amountPaid", { required: true })}
                                            className="w-full py-2.5 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Choose Amount Paid</option>
                                            <option value="1000">1000</option>
                                            <option value="1500">1500</option>
                                            <option value="3500">3500</option>
                                            <option value="4000">4000</option>
                                            <option value="4500">4500</option>
                                            <option value="5000">5000</option>
                                            <option value="5500">5500</option>
                                            <option value="7500">7500</option>
                                            <option value="Only MNC Certificate">Only MNC Certificate</option>
                                        </select>
                                    </div>
                                    {errors.amountPaid && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" />Amount Paid is required
                                        </p>
                                    )}
                                </div>
                                <div>
                                    {/* Store Employee ID and Name in hidden fields */}
                                    <input
                                        placeholder='Enter Student Name'
                                        {...register("employeeId")}
                                        type="hidden"
                                        name="employeeId"
                                        value={employeeDetails.Employee_Id}
                                    />
                                    <input
                                        placeholder='Enter Student Name'
                                        {...register("employeeName")}
                                        type="hidden"
                                        name="employeeName"
                                        value={employeeDetails.Employee_Name}
                                    />
                                </div>
                            </div>
                            <input type="submit" className={`bg-black text-white p-3 w-32 rounded-lg cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`} disabled={isSubmitting} value={isSubmitting ? "Submitting..." : "Submit"} />
                        </form>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DpsForm
