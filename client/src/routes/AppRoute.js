import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CheckPayments from '../All Components/CheckPayments';
import AllPayments from '../All Components/AllPayments';
import Employeelogin from '../All Components/Employeelogin';
import LoginToastMessage from '../All Components/LoginToastMessage';
import Attendance from '../All Components/AttendanceDetails/Attendance';
import LeadsDistribution from '../All Components/LeadsDistribution';
import Notification from '../All Components/Notification';
import LeadGen from '../All Components/LeadGen';
import Page404 from '../All Components/Page404';
import DisplayProfile from '../All Components/Profile/DisplayProfile';
import TeamTree from '../All Components/Team Structure/Tree';
import TeamStructure from '../All Components/Team Structure/TeamStructure';
import DPS from '../All Components/DpsForm';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../All Components/Roles/AdminDashboard';
import AccessControl from '../All Components/Admin Access/AccessControl';
import LeadAssign from '../All Components/Admin Access/LeadAssign';
import LetsOnboard from '../All Components/Admin Access/LetsOnboard';
import PostNotify from '../All Components/Admin Access/PostNotify';
import SideBar from '../All Components/Roles/SideBar';

const AppRoute = () => {
    const userRole = "Admin";

    return (
        <BrowserRouter>
            <Routes>
                {/* Sales Routes */}
                <Route
                    path="/" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <CheckPayments />
                        </ProtectedRoute>} />
                <Route
                    path="/Employeelogin" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <Employeelogin />
                        </ProtectedRoute>} />
                <Route
                    path="/CheckPayments" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <CheckPayments />
                        </ProtectedRoute>} />
                <Route
                    path="/AllPayments" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <AllPayments />
                        </ProtectedRoute>} />
                <Route
                    path="/AllPayments" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <LoginToastMessage />
                        </ProtectedRoute>} />
                <Route
                    path="/Attendance" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <Attendance />
                        </ProtectedRoute>} />
                <Route
                    path="/LeadsDistribution" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <LeadsDistribution />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/Notification" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <Notification />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/leadgen" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <LeadGen />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/profile" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <DisplayProfile />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/team" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <TeamTree />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/teamStructure" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <TeamStructure />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/DPS" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Sales"]}>
                            <DPS />
                        </ProtectedRoute>
                    } />


                {/* Admin Routes */}
                <Route
                    path="/AdminDashboard" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>} />
                <Route
                    path="/leadsassign" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <LeadAssign />
                        </ProtectedRoute>} />
                <Route
                    path="/accesscontrol" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <AccessControl />
                        </ProtectedRoute>} />
                <Route
                    path="/postnotification" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <PostNotify />
                        </ProtectedRoute>} />
                <Route
                    path="/onboard" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <LetsOnboard />
                        </ProtectedRoute>} />
                <Route
                    path="/AdminDashboard" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>} />
                <Route
                    path="/" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <CheckPayments />
                        </ProtectedRoute>} />
                <Route
                    path="/Employeelogin" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <Employeelogin />
                        </ProtectedRoute>} />
                <Route
                    path="/CheckPayments" element={
                        <ProtectedRoute role={userRole} allowedRoles={["Admin"]}>
                            <CheckPayments />
                        </ProtectedRoute>} />

                {/* Fallback Route */}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;
