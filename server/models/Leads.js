import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    id: { type: String, required: true },
    employee_id: { type: String, required: true },
    student_name: { type: String, required: true, default: 'Unknown' },
    email: { type: String, required: true },
    contact1: { type: String, required: true, default: 'N/A' },
    contact2: { type: String, required: true, default: 'N/A' },
    course1: { type: String, required: true, default: 'Unknown Course' },
    state: { type: String, required: true, default: 'Unknown State' },
    degree: { type: String, required: true, default: 'Unknown Degree' },
    graduation_year: { type: String, required: true, default: 'Unknown Year' },
    college: { type: String, required: true, default: 'Unknown College' },
    status: { type: String, required: true, default: 'Pending' },
    note: { type: String, required: true,  default: 'Pending' },
  },
  {timestamps: true}
);
  
  const LeadList = mongoose.model('pgflLeads', leadSchema);
  export default LeadList;
  
