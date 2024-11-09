import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    ID: { type: String },
    Amount: { type: String },
    Currency: { type: String },
    Email: { type: String },
    Contact: { type: Number },
    VPA: { type: String },
    status: { type: String, default: "captured" },
    order_id: { type: String },
    invoice_id: { type: String, default: "" },
    international: { type: Number, default: 0 },
    method: { type: String, default: "upi" },
    amount_refunded: { type: Number, default: 0 },
    amount_transferred: { type: Number, default: 0 },
    refund_status: { type: String, default: "" },
    captured: { type: Number, default: 1 },
});

const collectionName = "razorpaycollection";
// Create the model using the provided connection and specify the collection name
const createUserModel = (connection) => {
    return connection.model("razorpaycollection", userSchema, collectionName); // Correctly specify the collection name as the third parameter
};

export default createUserModel;
