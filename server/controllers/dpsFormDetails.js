import DpsFormModel from '../models/DpsFormModel.js';

const dpsFormData = async (req, res) => {
    try {
        const newDpsForm = new DpsFormModel(req.body);
        const savedData = await newDpsForm.save();
        res.status(201).json(savedData); 
        console.log("Saved data:", savedData);
    } catch (error) {
        console.error('Error saving DPS form data:', error);
        res.status(500).json({ error: 'Failed to save DPS form data' });
    }
};

const dpsFormDataById = async (req, res) => {
    const Employee_Id = req.params.id;
    try {
        const response = await DpsFormModel.find({ Employee_Id: Employee_Id })
        .sort({ updatedAt: 1 });
        res.json(response);
    } catch (error) {
        console.error('Error fetching DPS form data by ID:', error);
        res.status(500).json({ error: 'Failed to fetch DPS form data by ID' });
    }
}

export {dpsFormData, dpsFormDataById};