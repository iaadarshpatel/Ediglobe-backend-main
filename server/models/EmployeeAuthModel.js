import mongoose from "mongoose";

// Define the EmployeeAuth model for the authentication database
const employeeAuthSchema = new mongoose.Schema({
    Employee_Id: { type: String, required: true },
    Password: { type: String, required: true },
    Employee_Name: { type: String, required: true },
    DOB: { type: String, required: true },
    Designation: { type: String, required: true },
    DOJ: { type: String },
    Personal_Email: { type: String, required: true },
    Office_Email: { type: String},
    Phone: { type: Number},
    Profile_img: {type: String}
}, { timestamps: true });

const EmployeeAuthModel = mongoose.model('employeesAuth', employeeAuthSchema);

export default EmployeeAuthModel;   