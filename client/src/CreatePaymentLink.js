import React, { useState } from 'react';
import axios from 'axios';

const CreatePaymentLink = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [email, setEmail] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    try {
      const response = await axios.post('/api/create-payment-page', {
        title,
        description,
        amount: parseInt(amount) * 100, // Amount in paise
        currency,
        callback_url: callbackUrl,
        email,
      });

      setMessage(`Payment page created successfully! Page ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error creating payment page:', error.response ? error.response.data : error.message);
      setMessage('Failed to create payment page');
    }
  };

  return (
    <div>
      <h2>Create Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Currency:</label>
          <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Callback URL:</label>
          <input type="url" value={callbackUrl} onChange={(e) => setCallbackUrl(e.target.value)} />
        </div>
        <button type="submit">Create Payment Page</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePaymentLink;
