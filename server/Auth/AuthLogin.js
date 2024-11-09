import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Create a new router instance
const router = express.Router();

// Define the EmployeeAuth schema and model
const employeeAuthSchema = new mongoose.Schema({
    Employee_Id: { type: String, required: true },
    Password: { type: String, required: true },
});

const EmployeeAuthModel = mongoose.model('employeesAuth', employeeAuthSchema);

// Route to handle login
router.post('/api/auth/login', async (req, res) => {
    const { employeeCode, password } = req.body;

    try {
        // Find employee by Employee_Id
        const employee = await EmployeeAuthModel.findOne({ Employee_Id: employeeCode });

        if (!employee) {
            return res.status(401).json({ error: 'Invalid Employee Code or Password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, employee.Password);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid Employee Code or Password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

export default router;
