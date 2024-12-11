import Attendance from "../models/AttendanceLogs.js";

const allAttendanceLogs = async (req, res) => {
    try {
        const response = await Attendance.find();
        res.json(response);
    } catch (error) {
        console.error('Error fetching attendance logs:', error);
        res.status(500).json({ error: 'Failed to fetch attendance logs' });
    }
};

const allAttendanceLogsFetchById = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const response = await Attendance.find({ Employee_Id: employeeId })
            .sort({ updatedAt: 1 }); // Sorting by updatedAt in ascending order
        if (response.length === 0) {
            return res.status(404).json({ error: 'Attendance log not found' });
        }
        res.json(response);
    } catch (error) {
        console.error('Error fetching attendance logs by ID:', error);
        res.status(500).json({ error: 'Failed to fetch attendance logs by ID' });
    }
};



export { allAttendanceLogs, allAttendanceLogsFetchById };