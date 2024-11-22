import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    Employee_Id: { type: String, required: true },
    clockIn: { type: String, required: true },
    clockInAddress: { type: String, required: true },
    clockOut: { type: String, required: true },
    clockOutAddress: { type: String, required: true },
    attendanceMarkDate: { type: String, required: true },
}, { timestamps: true });

const AttendanceLogs = mongoose.model('attendanceLogs', attendanceSchema);

export default AttendanceLogs;   