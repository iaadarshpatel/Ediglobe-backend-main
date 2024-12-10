import mongoose from "mongoose";

const dpsFormSchema = new mongoose.Schema({
    Employee_Id: { type: String},
    Employee_Name: { type: String},
    studentName: { type: String, required: true },
    studentPersonalEmail: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    whatsAppNumber: { type: Number, required: true },
    DateOfRegistration: { type: String, required: true },
    collegeName: { type: String, required: true },
    department: { type: String, required: true },
    stream: { type: String, required: true },
    graduationYear: { type: String, required: true },
    domainOpted: { type: String, required: true },
    domainType: { type: String, required: true },
    amountPitched: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    DateOfDpsFilled: { type: String},
}, { timestamps: true });

const DpsFormModel = mongoose.model('dpsForms', dpsFormSchema);

export default DpsFormModel;   