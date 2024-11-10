import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getPGFL = async (req, res) => {
    try {
        const response = await axios.get(process.env.PGFL_API_URL);
        const pgfl = response.data; // Assuming the API returns the desired data structure
        res.json(pgfl);
    } catch (error) {
        console.error('Error fetching PGFL records:', error);
        res.status(500).json({ error: 'Failed to fetch PGFL records' });
    }
}

export default getPGFL;