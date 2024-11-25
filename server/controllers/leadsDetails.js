import LeadList from "../models/Leads.js";

const fetchLeadsDetails = async (req, res) => {
    console.log('Fetching leads...');
    try {
        const leads = await LeadList.find(); // Fetch all leads from the database
        res.json(leads); // Send the leads back in the response
    } catch (err) {
        console.error('Error fetching leads:', err);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
}

const updateLeadsDetails = async (req, res) => {
    const leadData = req.body;
    // Validate leadData
    if (!Array.isArray(leadData) || leadData.length === 0 || !leadData.every(lead => lead.id)) {
        return res.status(400).json({ error: 'Lead data is required and must have an id' });
    }
    try {
        // You can now remove the connection part since it's already connected
        console.log('Using existing leads database connection');

        // Map through the lead data and update
        const promises = leadData.map(async (lead) => {
            return LeadList.updateOne(
                { id: lead.id }, // Use your unique identifier
                { $set: lead }, // Update with new data
                { upsert: true } // Create if not exists
            );
        });

        // Wait for all updates to complete
        await Promise.all(promises);
        console.log('Leads inserted/updated successfully');

        res.status(200).json({ message: 'Leads inserted/updated successfully' });
    } catch (error) {
        console.error('Error inserting/updating lead:', error);
        res.status(500).json({ error: 'Failed to insert/update lead' });
    }
}

export { fetchLeadsDetails, updateLeadsDetails };