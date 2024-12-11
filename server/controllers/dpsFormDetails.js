import DpsFormModel from '../models/DpsFormModel.js';

const dpsFormData = async (req, res) => {
    try {
        const newDpsForm = new DpsFormModel(req.body);
        const savedData = await newDpsForm.save();
        res.status(201).json(savedData);
    } catch (error) {
        console.error('Error saving DPS form data:', error);
        res.status(500).json({ error: 'Failed to save DPS form data' });
    }
};

const dpsFormDataById = async (req, res) => {
    const studentEmail = req.params.id;
    try {
        const response = await DpsFormModel.find({ studentPersonalEmail: studentEmail })
            .sort({ updatedAt: 1 });
        res.json(response);
        console.log(response);
    } catch (error) {
        console.error('Error fetching DPS form data by ID:', error);
        res.status(500).json({ error: 'Failed to fetch DPS form data by ID' });
    }
}

export { dpsFormData, dpsFormDataById };