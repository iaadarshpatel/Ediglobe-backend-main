import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import createUserModel from "./models/Users.js";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import connectDb from "./config/Db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import leadsDistributionRoutes from "./routes/leadsDistributionRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import leadsRoutes from "./routes/leadsRoutes.js";
import paymentCountRoutes from "./routes/paymentCountRoutes.js"
import attendanceLogsRoutes from "./routes/attendanceLogsRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

connectDb();

// Create the UserModel using the mongoose connection
const UserModel = createUserModel(mongoose.connection);

app.get('/', async(req, res) => {
    res.send("Working!");
})

//API endpoint to get payments from Razorpay
app.use('/paymentCount', paymentCountRoutes);

// Endpoint to attendance login
app.use('/attendanceDetails', attendanceRoutes)

// Endpoint to fetch PGFL LEADS
app.use('/leadsDistribute', leadsDistributionRoutes);

// New endpoint to receive leads from frontend
app.use('/leads', leadsRoutes);

// Endpoint to get allPayments
app.use('/payment', paymentRoutes);

// Endpoint to get employee details by Employee_Id
app.use('/employee', employeesRoutes)

// Endpoint to get employee attendance by Employee_Id
app.use('/logs', attendanceLogsRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
