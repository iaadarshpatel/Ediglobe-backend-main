import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreatePaymentLink from '../CreatePaymentLink';
import PaymentCheck from '../Payments/PaymentCheck';
import CheckPayments from '../All Components/CheckPayments';
import AllPayments from '../All Components/AllPayments';
import Employeelogin from '../All Components/Employeelogin';
import LoginToastMessage from '../All Components/LoginToastMessage';
import Attendance from '../All Components/AttendanceDetails/Attendance';
import LeadsDistribution from '../All Components/LeadsDistribution';
import Notification from '../All Components/Notification';
import LeadGen from '../All Components/LeadGen';
import Page404 from '../All Components/Page404';
import ProfileSection from '../All Components/Profile/ProfileSection';
import DisplayProfile from '../All Components/Profile/DisplayProfile';
import TeamTree from '../All Components/Team Structure/Tree';
import TeamStructure from '../All Components/Team Structure/TeamStructure';
import Landing from '../All Components/LandingPage';

const AppRoute = () => {

    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/PaymentCheck" element={<PaymentCheck />} />
                    <Route path="/CreatePaymentLink" element={<CreatePaymentLink />} />
                    <Route path="/Employeelogin" element={<Employeelogin />} />
                    <Route path="/Dummy" element={<Employeelogin />} />
                    <Route path="/" element={<CheckPayments />} />
                    <Route path="/CheckPayments" element={<CheckPayments />} />
                    <Route path="/AllPayments" element={<AllPayments />} />
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
                    <Route path="/Landing" element={<Landing />} />
                </Routes>
            </BrowserRouter>
    );
};

export default AppRoute;
