import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { format, parse, parseISO, isValid } from 'date-fns';

const ShowPayments = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setErr(null);

      try {
        const response = await axios.get("http://localhost:3003/getUsers");
        if (Array.isArray(response.data)) {
          setFetchedUsers(response.data);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  },[]);

  const parseNotes = (notesString) => {
    try {
      return JSON.parse(notesString || "{}");
    } catch (error) {
      console.error('Error parsing notes JSON:', error);
      return {};
    }
  };

  const formatDate = (dateString) => {
    let parsedDate = parseISO(dateString);
    if (!isValid(parsedDate)) {
      const customFormat = 'dd/MM/yyyy HH:mm:ss';
      parsedDate = parse(dateString, customFormat, new Date());
    }
    return isValid(parsedDate) ? format(parsedDate, 'd MMMM yyyy h:mm a') : dateString;
  };


  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {err && <p>Error: {err}</p>}
      {!isLoading && !err && fetchedUsers.length > 0 && (
        <>
        <div>Hello</div>
          <table>
            <thead>
              <tr>
                <th>Created At</th>
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
            <tbody>
              {fetchedUsers.map(user => {
                const notes = parseNotes(user.notes);
                return (
                  <tr key={user._id}>
                    <td>{formatDate(user.created_at)}</td>
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
          </table>
        </>
      )}
      {!isLoading && !err && fetchedUsers.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default ShowPayments;