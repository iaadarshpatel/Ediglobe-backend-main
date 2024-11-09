import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ShowPayments from '../ShowPayments';
import PaymentType from '../Payments/PaymentType';
import CreatePaymentLink from '../CreatePaymentLink';
import PaymentCheck from '../Payments/PaymentCheck';
import Employeelogin from '../Payments/Employeelogin';
import CheckPayments from '../All Components/CheckPayments';
import PendingPayment from '../All Components/PendingPayment';
import AllPayments from '../All Components/AllPayments';
import Dummy from '../All Components/Dummy';
import RealTimeData from '../All Components/RealTimeData';
import LoginToastMessage from '../All Components/LoginToastMessage';
import Attendance from '../All Components/Attendance';
import LeadsDistribution from '../All Components/LeadsDistribution';
import Notification from '../All Components/Notification';
import LeadGen from '../All Components/LeadGen';
import Page404 from '../All Components/Page404';
import ProfileSection from '../All Components/Profile/ProfileSection';
import DisplayProfile from '../All Components/Profile/DisplayProfile';
import TeamTree from '../All Components/Team Structure/Tree';
import TeamStructure from '../All Components/Team Structure/TeamStructure';

const AppRoute = () => {
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [err, setErr] = useState(null);
    const [errOnline, setErrOnline] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setErrOnline(null);
            try {
                const response = await axios.get("http://localhost:3003/getUsers");
                if (Array.isArray(response.data)) {
                    setFetchedUsers(response.data);
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (error) {
                setErrOnline(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/ShowPayments" element={<ShowPayments paymentData={fetchedUsers} />} />
                    <Route path="/PaymentCheck" element={<PaymentCheck />} />
                    <Route path="/CreatePaymentLink" element={<CreatePaymentLink />} />
                    <Route path="/PaymentType" element={<PaymentType paymentData={fetchedUsers} isLoading={isLoading} />} />
                    <Route path="/Employeelogin" element={<Dummy />} />
                    <Route path="/" element={<CheckPayments />} />
                    <Route path="/CheckPayments" element={<CheckPayments />} />
                    <Route path="/PendingPayment" element={<PendingPayment />} />
                    <Route path="/AllPayments" element={<AllPayments />} />
                    <Route path="/Dummy" element={<Dummy />} />
                    <Route path="/RealTimeData" element={<RealTimeData />} />
                    <Route path="/LoginToastMessage" element={<LoginToastMessage />} />
                    <Route path="/Attendance" element={<Attendance />} />
                    <Route path="/LeadsDistribution" element={<LeadsDistribution />} />
                    <Route path="/Notification" element={<Notification />} />
                    <Route path="/leadgen" element={<LeadGen />} />
                    <Route path="/page404" element={<Page404 />} />
                    <Route path="/profilesection" element={<ProfileSection />} />
                    <Route path="/profile" element={<DisplayProfile />} />
                    <Route path="/team" element={<TeamTree />} />
                    <Route path="/teamStructure" element={<TeamStructure />} />
                </Routes>
                {err && <div className="error">Error: {err}</div>}
            </BrowserRouter>
    );
};

export default AppRoute;
