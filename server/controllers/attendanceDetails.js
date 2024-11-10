import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const attendanceDetails = async (req, res) => {
    try {
        const response = await axios.get(process.env.ATTENDANCE_API_URL);
        const attendanceRecords = response.data;
        res.json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
}

export default attendanceDetails