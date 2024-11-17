import moment from "moment/moment.js";
import axios from "axios";

const fetchPaymentsBatch = async (pageSize, startingAfter = null) => {
    try {
        const response = await axios.get('https://api.razorpay.com/v1/payments', {
            auth: {
                username: process.env.RAZORPAY_KEY_ID,
                password: process.env.RAZORPAY_KEY_SECRET,
            },
            params: {
                count: pageSize,
                ...(startingAfter && { starting_after: startingAfter }),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching payments from Razorpay:', error.response?.data || error.message);
        throw error;
    }
};

const paymentSearch = async (req, res) => {
    try {
        const pageSize = 100; // Define your page size
        const { searchQuery } = req.params;

        const data = await fetchPaymentsBatch(pageSize);
        if (!data.items) {
            throw new Error('Invalid response structure');
        }
        const capturedPayments = data.items.filter(payment => payment.captured); // Hold successful payments
        
        const matchedPayment = capturedPayments.find(
            (payment) =>
                payment.email === searchQuery ||
                payment.id === searchQuery ||
                payment.order_id === searchQuery ||
                payment.notes.contact_number === searchQuery
        );

        if (matchedPayment) {
            res.json(matchedPayment);
        } else {
            res.status(404).json({ error: 'No payment found for the provided details.' });
        }
    } catch (error) {
        console.error('Error in /api/payments:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
}

const paymentCount  = async (req, res) => {
    try {
        const data = await fetchPaymentsBatch(100);
        const today = moment().format('DD-MM-YYYY');
        if (!data.items) {
            throw new Error('Invalid response structure');
        }
        const capturedPayments = data.items.filter(payment => payment.captured); 

        // Filter payments captured today
        const capturedTodayPayments = capturedPayments.filter(payment => {
            if (payment.captured) { 
                const captureDate = moment(payment.created_at * 1000).format('DD-MM-YYYY');
                return captureDate === today; 
            }
            return false;
        });
        // Get the count of payments captured today
        const countTodayPayments = capturedTodayPayments.length;

        // Define sales and post-sales amounts
        const salesAmounts = [1040, 1050, 1055, 1045, 4560, 4060, 5560, 5060];
        const postSalesAmounts = [4080, 2570, 3080, 3570, 4570, 1550];

        const salesCount = capturedTodayPayments.filter(payment =>
            salesAmounts.includes(payment.amount / 100)
        ).length

        const postSalesCount = capturedTodayPayments.filter(payment =>
            postSalesAmounts.includes(payment.amount / 100)
        ).length

        res.json({
            count: countTodayPayments,
            payments: capturedTodayPayments,
            salesCount: salesCount,
            postSalesCount: postSalesCount
        });
        console.log(postSalesCount, salesCount);
        
    } catch (error) {
        console.error("Failed to fetch payments:", error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
}


export {paymentCount, paymentSearch}