import React from 'react';

// const parseNotes = (notesString) => {
//   try {
//     return JSON.parse(notesString || "{}");
//   } catch (error) {
//     console.error('Error parsing notes JSON:', error);
//     return {};
//   }
// };

const PaymentType = ({ paymentData, isLoading }) => {
  return (
    <div>
      <h2>PaymentType</h2>
      {/* <table>
      <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Order ID</th>
                <th>Invoice ID</th>
                <th>International</th>
                <th>Method</th>
                <th>Amount Refunded</th>
                <th>Amount Transferred</th>
                <th>Refund Status</th>
                <th>Captured</th>
                <th>Wallet</th>
                <th>VPA</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Notes (Email)</th>
                <th>Notes (Full Name)</th>
                <th>Notes (Referral Code)</th>
                <th>Notes (Contact Number)</th>
                <th>Notes (WhatsApp Number)</th>
              </tr>
            </thead>
      {isLoading ? (
        <p>Loading...</p>
      ) : paymentData.length > 0 ? (
        <tbody>
          {paymentData.map(user => {
            const notes = parseNotes(user.notes);
            return (
              <tr key={user._id}>
                <td>{user.id}</td>
                <td>{user.amount}</td>
                <td>{user.currency}</td>
                <td>{user.status}</td>
                <td>{user.order_id}</td>
                <td>{user.invoice_id}</td>
                <td>{user.international}</td>
                <td>{user.method}</td>
                <td>{user.amount_refunded}</td>
                <td>{user.amount_transferred}</td>
                <td>{user.refund_status}</td>
                <td>{user.captured}</td>
                <td>{user.wallet}</td>
                <td>{user.vpa}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{notes.email}</td>
                <td>{notes.full_name}</td>
                <td>{notes.referral_code}</td>
                <td>{notes.contact_number}</td>
                <td>{notes.whatsapp_number}</td>
              </tr>
            );
          })}
         </tbody>
      ) : (
        <p>No data found.</p>
      )}
      </table> */}
       {isLoading ? (
                <p>Loading...</p>
            ) : paymentData.length > 0 ? (
                <>
                    <h3>Total payments: {paymentData.length}</h3>
                </>
            ) : (
                <p>No data found.</p>
            )}
    </div>
  );
};

export default PaymentType;
