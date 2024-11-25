import AttendanceLogs from "../models/AttendanceLogs.js";

const attendanceLogsInsert = async (req, res) => {
    const { Employee_Id, clockInTime, clockInAddress, clockOutTime, clockOutAddress, attendanceMarkDate } = req.body;

    try {
        console.log("Inserting/updating attendance log...");
        
        if (!clockOutTime) {
            // Clock-in logic
            console.log("Clock-in request received.");
            const newLog = new AttendanceLogs({
                Employee_Id,
                clockInTime: clockInTime,
                clockInAddress,
                attendanceMarkDate,
            });
            console.log("New log created:", newLog);
            
            await newLog.save();
            return res.status(201).json({ message: "Clock-in successful", log: newLog });
        } else {
            // Clock-out logic
            console.log("Clock-out request received.");
            const updatedLog = await AttendanceLogs.findOneAndUpdate(
                { 
                    Employee_Id, 
                    clockOutTime: null, // Ensure this log hasn't already been clocked out
                    attendanceMarkDate, // Ensure the log matches the same date
                },
                {
                    $set: {
                        clockOutTime: clockOutTime,
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
