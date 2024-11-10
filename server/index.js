import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import createUserModel from "./models/Users.js";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import EmployeeAuthModel from "./models/EmployeeAuthModel.js";
import connectDb from "./config/Db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import leadsDistributionRoutes from "./routes/leadsDistributionRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import leadsRoutes from "./routes/leadsRoutes.js";
import paymentCountRoutes from "./routes/paymentCountRoutes.js"

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// Connect to MongoDB 
connectDb();

// Create the UserModel using the mongoose connection
const UserModel = createUserModel(mongoose.connection);

// Function to hash existing plain text passwords in employeesAuth collection
async function hashExistingPasswords() {
    try {
        const employees = await EmployeeAuthModel.find({});
        console.log('Hashing passwords...');
        for (let employee of employees) {
            if (employee.Password && !employee.Password.startsWith('$2b$')) { // Ensure the password is not already hashed
                const hashedPassword = await bcrypt.hash(employee.Password, 10);
                employee.Password = hashedPassword;
                await employee.save();
                console.log(`Hashed password for Employee ID: ${employee.Employee_Id}`);
            }
        }
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
}

// Call the hashExistingPasswords function to hash the passwords after connection
mongoose.connection.once('open', async () => {
    await hashExistingPasswords(); // Hash existing plain text passwords
});

app.get('/', async(req, res) => {
    res.send("Working!");
})

// Endpoint to fetch users from MongoDB database
app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find().select("-order_id"); // Fetch users excluding order_id
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//API endpoint to get payments from Razorpay
app.use('/api', paymentCountRoutes);

// Endpoint to attendance login
app.use('/api', attendanceRoutes)

// Endpoint to fetch PGFL LEADS
app.use('/api', leadsDistributionRoutes);

// Endpoint to get allPayments
app.use('/api', paymentRoutes);

// Endpoint to get employee details by Employee_Id
app.use('/api', employeesRoutes)

// New endpoint to receive leads from frontend
app.use('/api', leadsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
