import AccessControl from "../models/AccessControl.js";

const accessControlById = async (req, res) => {
    try {
        const { Employee_Id, role } = req.body;
        if (!Employee_Id || !role) {
            return res.status(400).json({ message: "Employee_Id and role are required" });
        }
        const updatedAccessControl = await AccessControl.findOneAndUpdate(
            { role }, 
            { $addToSet: { employeeIds: Employee_Id } },
            { new: true, upsert: true } // Return the updated document, and create a new one if it doesn't exist
        );
        res.status(200).json(updatedAccessControl);
    } catch (error) {
        console.error("Error updating access control:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export default accessControlById;
