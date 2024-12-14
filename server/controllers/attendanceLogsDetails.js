import AttendanceLogs from "../models/AttendanceLogs.js";

const attendanceLogsInsert = async (req, res) => {
    const { employeeId, clockInTime, clockInAddress, clockOutTime, clockOutAddress, attendanceMarkDate, clockInLatitude, clockInLongitude, clockOutLatitude, clockOutLongitude } = req.body;
    try {
        if (!clockOutTime) {
            const newLog = new AttendanceLogs({
                Employee_Id: employeeId,
                clockInTime,
                clockInLatitude,
                clockInLongitude,
                clockInAddress,
                attendanceMarkDate,
            });
            
            await newLog.save();
            return res.status(201).json({ message: "Clock-in successful", log: newLog });
        } else {
            // Clock-out logic
            console.log("Clock-out request received.");
            const updatedLog = await AttendanceLogs.findOneAndUpdate(
                { 
                    Employee_Id: employeeId,
                    clockOutTime: null,
                    clockOutAddress: null,
                    clockOutLatitude: null,
                    clockOutLongitude: null,
                    attendanceMarkDate,
                },
                {
                    $set: {
                        clockOutTime,
                        clockOutLatitude,
                        clockOutLongitude,
                        clockOutAddress,
                    },
                },
                { new: true }
            );
            if (updatedLog) {
                return res.status(200).json({ message: "Clock-out successful", log: updatedLog });
            } else {
                return res.status(404).json({ error: "No active clock-in log found for this employee. Please clock in first." });
            }
        }
    } catch (error) {
        console.error("Error inserting/updating attendance log:", error);
        return res.status(500).json({ error: "Failed to insert/update attendance log", details: error.message });
    }
};

export default attendanceLogsInsert;
