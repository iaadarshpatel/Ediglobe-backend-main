import mongoose from "mongoose";

const accessControlSchema = new mongoose.Schema({
    role: { type: String, required: true }, 
    employeeIds: { type: [String], required: true }, 
  }, {timestamps: true}); 

const AccessControl = mongoose.model('accessControls', accessControlSchema);

export default AccessControl;
