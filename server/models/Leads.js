import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    id: { type: String, required: true },
    employee_id: { type: String, required: true },
    student_name: { type: String, required: true, default: 'Unknown' },
    email: { type: String, required: true },
    contact: { type: String, required: true, default: 'N/A' },
    course: { type: String, required: true, default: 'Unknown Course' },
    year: { type: String, required: true, default: 2020 },
    college: { type: String, required: true, default: 'Unknown College' },
    status: { type: String, required: true, default: 'Pending' },
  },
  {timestamps: true}
);
  
  const LeadList = mongoose.model('pgflLeads', leadSchema);
  export default LeadList;
  
