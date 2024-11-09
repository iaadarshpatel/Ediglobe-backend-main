import EmployeeAuthModel from "../models/EmployeeAuthModel.js";
import bcrypt from "bcrypt";


const employeeFetchId = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const employeeDetail = await EmployeeAuthModel.findOne({ Employee_Id: employeeId }).select("-Password");

        if (!employeeDetail) {
            return res.status(404).json({ message: 'employeeDetail not found' });
        }
        res.json(employeeDetail);
        console.log('Successfully fetched employeeDetail');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const employeeFetch = async (req, res) => {
    try {
        const employee = await EmployeeAuthModel.find().select('-Password -Phone -Personal_Email -Office_Email');
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const employeeAuth = async (req, res) => {
    const { employeeCode, password } = req.body;
    if (!employeeCode || !password) {
        return res.status(400).json({ error: 'Employee Code and Password are required' });
    }
    try {
        // Find the employee in the database
        const employee = await EmployeeAuthModel.findOne({ Employee_Id: employeeCode });
        if (!employee) {
            return res.status(401).json({ error: 'Invalid Employee Code or Password' });
        }
        // Check if the provided password matches the hashed password
        const isMatch = await bcrypt.compare(password, employee.Password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Employee Code or Password' });
        }
        // If credentials are valid, respond with success
        res.status(200).json({
            message: 'Login successful',
            Employee_Name: employee.Employee_Name,
        });
        console.log('Employee Name:', employee.Employee_Name);
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {employeeFetch, employeeFetchId, employeeAuth} 