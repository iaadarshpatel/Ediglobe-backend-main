import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    Employee_Id: { type: String, required: true },
    clockInTime: { type: String, required: true },
    clockInAddress: { type: String, required: true },
    clockOutTime: { type: String, default: null },
    clockOutAddress: { type: String, default: null },
    clockInLatitude: { type: String, required: true },
    clockInLongitude: { type: String, required: true },
    clockOutLatitude: { type: String },
    clockOutLongitude: { type: String },
    attendanceMarkDate: { type: String, required: true },
}, { timestamps: true });  

const AttendanceLogs = mongoose.model('attendanceLogs', attendanceSchema);

export default AttendanceLogs;
