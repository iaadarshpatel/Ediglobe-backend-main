import React, { useEffect, useState } from 'react';
import SideBar from './Roles/SideBar';
import LottieFile from './LottieFile';
import config from '../config';
import { Card, Chip, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesDetails } from '../All Components/redux/slice/employeeSlice'
import { MdEmail } from "react-icons/md";
import { FaUserCheck, FaSquarePhone, FaRegCalendarCheck } from "react-icons/fa6";
import { FaCheckCircle, FaUniversity } from "react-icons/fa";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdOutlineError } from "react-icons/md";
import axios from 'axios';

const DpsForm = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm();

    const dispatch = useDispatch();
    const allDetails = useSelector(state => state.employeesDetails);
    const { Employee_Id, Employee_Name } = allDetails.data || {};
    const [dpsFormData, setDpsFormData] = useState([]);
    const [todayDay, setTodayDay] = useState(""); 

    const [employeeDetails, setEmployeeDetails] = useState({
        Employee_Id: '',
        Employee_Name: ''
    });
    const customColor = '#000000';
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
            setTodayDay(formatDateTime());
        }
    }, [Employee_Id, Employee_Name, setValue]);

    const onSubmit = async (data) => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const formattedDate = formatDateTime();
        setTodayDay(formattedDate);
        const dataWithDate = { ...data, DateOfDpsFilled: formattedDate };
        setDpsFormData(data);
        await delay(3000);
        try {
            const token = localStorage.getItem("Access Token");
            const response = await axios.post(`${config.hostedUrl}/dpsForm/dpsFormData`, dataWithDate, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            reset();
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to update DPS data';
            alert(errorMessage);
        } finally {
            console.log("Execution of onSubmit is complete."); // Example action
            setDpsFormData([]); // Clearing form data or performing cleanup
        }
    };

    return (
        <>
            <div className="flex h-full mt-1 opacity-1">
                <LottieFile />
                <SideBar />
                <Card className="h-full w-full mx-2 opacity-1 bg-custom shadow-none">
                    <div className="mt-1 pt-3 pb-4 z-10 px-4 rounded-border bg-transparent">
                        <div className="p-3 mb-3 bg-blue-gray-50 rounded-border">
                            <Typography variant="md" color="blue-gray" className="font-bold">
                                Daily Payment Form:
                            </Typography>
                            <Typography variant="sm" color="gray" className="font-normal text-blue-gray-500">
                                This tab contains urgent leads from the Potential Google Form (PGFL). Please prioritize contacting these leads immediately and ensure that their status is updated promptly and accurately.<br />
                            </Typography>
                            <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold mb-2">
                                Employee Id: <Chip color='indigo' value={employeeDetails.Employee_Id || "Loading..."} className='text-white bg-black font-bold inline-block pt-2' /> <br />
                            </Typography>
                            <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold mb-2">
                                Employee Name: <Chip color='indigo' value={employeeDetails.Employee_Name || "Loading..."} className='text-white bg-black font-bold inline-block pt-2' /> <br />
                            </Typography>
                            <Typography variant="text" color="blue-gray" className="whitespace-nowrap font-bold">
                                Date: <Chip color='indigo' value={todayDay || "Loading..."} className='text-white bg-black font-bold inline-block pt-2' /> <br />
                            </Typography>
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
                                        <FaUserCheck className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-1 rounded-lg bg-blue-gray-50 text-black"/>
                                        <input
                                            type="text"
                                            placeholder='Enter Student Name'
                                            {...register("studentName", { required: true, minLength: 3, maxLength: 15 })}
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10"
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
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10" />
                                    </div>
                                    {errors.studentPersonalEmail && (
                                        <p className="text-red-500 text-xs mt-2 flex align-middle gap-1">
                                            <MdOutlineError className="w-4 h-4" /> Email is required
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
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10"
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
                                            className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-red-500 focus:ring-gray-900/10"
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
                                        <select {...register("department", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10"
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
                                        <select {...register("stream", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10">
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
                                        <select {...register("graduationYear", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10">
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
                                        <select {...register("domainOpted", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10">
                                            <option value="">Choose Domain</option>
                                            <option value="MERN">MERN</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="Artifical Intelligence">Artifical Intelligence</option>
                                            <option value="Cyber Security">Cyber Security</option>
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
                                        <select {...register("domainType", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10">
                                            <option value="">Choose Domain Type</option>
                                            <option value="Slef Learning">Slef Learning</option>
                                            <option value="Self Learning with ADD ON">Self Learning with ADD ON</option>
                                            <option value="Expert Lead Program">Expert Lead Program</option>
                                            <option value="Expert Lead Program with ADD ON">Expert Lead Program with ADD ON</option>
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
                                        <select {...register("amountPitched", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10">
                                            <option value="">Choose Amount</option>
                                            <option value="1000">1000</option>
                                            <option value="3500">3500</option>
                                            <option value="4000">4000</option>
                                            <option value="4500">4500</option>
                                            <option value="5000">5000</option>
                                            <option value="5500">5500</option>
                                            <option value="7500">7500</option>
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
                                        <select {...register("amountPaid", { required: true })} className="w-full py-2 pl-12 pr-3 border rounded-md border-dashed border-gray-600 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-gray-500 focus:ring-gray-900/10">
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
                            <input type="submit" className='bg-black text-white p-3 w-32 rounded-lg' disabled={isSubmitting} value={isSubmitting ? "Submitting..." : "Submit"} />
                        </form>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DpsForm
