import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const allPayments = async (req, res) => {
    const employeeId = req.params.id;
    try {   
        const response = await axios.get(process.env.ALL_PAYMENTS_API_URL);
        const allPayments = response.data;

        // Filter payments for the specific employee ID
        const employeePayments = allPayments.filter(payment => payment.Employee_Id === employeeId);
        const monthlyCount = employeePayments.reduce((acc, payment) => {
            const month = payment.Month;
            acc["All"] = (acc["All"] || 0) + 1;
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        const totalMonths = Object.keys(monthlyCount);
        
        
        // Include the count in the response
        res.json({
            paymentCount: employeePayments.length,
            monthlyCount: monthlyCount,
            payments: employeePayments,
            totalMonths: totalMonths,
        });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching payments data." });
    }
}

export default allPayments  