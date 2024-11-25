import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    Employee_Id: { type: String, required: true },
    clockInTime: { type: Date, required: true },
    clockInAddress: { type: String, required: true },
    clockOutTime: { type: Date, default: null },
    clockOutAddress: { type: String, default: null },
    attendanceMarkDate: { type: String, required: true },
});

const AttendanceLogs = mongoose.model('attendanceLogs', attendanceSchema);

export default AttendanceLogs;   