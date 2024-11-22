import AttendanceLogs from "../models/AttendanceLogs.js";


// Insert attendance log for clock-in and clock-out
const attendanceLogsInsert = async (req, res) => {
    const { Employee_Id, clockIn, clockInAddress, clockOut, clockOutAddress, attendanceMarkDate } = req.body;
    console.log("Received attendance log data:", req.body);
    
    try {
        // If clockOut is not provided, it's a clock-in action
        if (!clockOut) {
            const newLog = new AttendanceLogs({
                Employee_Id,
                clockInTime: clockIn, 
                clockOutTime: null, // Null as clock-out time will be updated later
                attendanceMarkDate: attendanceMarkDate || new Date().toISOString().split("T")[0], // Use provided date or default to today
                clockInAddress // Address when clocking in
            });

            await newLog.save();
            return res.status(201).json({ message: "Clock-in successful", log: newLog });
        } else {
            // If clockOut is provided, update the existing clock-in log with clock-out time
            const updatedLog = await AttendanceLogs.findOneAndUpdate(
                { Employee_Id, clockOutTime: null }, // Find the latest clock-in log without clock-out
                { 
                    $set: { 
                        clockOutTime: clockOut, // Update with clock-out time
                        clockOutAddress // Update clock-out address
                    }
                },
                { new: true } // Return the updated document
            );

            if (updatedLog) {
                return res.status(200).json({ message: "Clock-out successful", log: updatedLog });
            } else {
                return res.status(404).json({ error: "No active clock-in log found for this employee" });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed to insert/update attendance log", details: error.message });
    }
};


export default attendanceLogsInsert ;
