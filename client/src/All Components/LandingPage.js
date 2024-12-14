import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EmailEditor = () => {
  const [emailContent, setEmailContent] = useState('');
  const [content, setContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleSendEmail = () => {
    if (!recipientEmail || !emailSubject || !emailContent) {
      alert('Please fill in all fields');
      return;
    }

    // Replace this with your email-sending logic/API call
    console.log('Sending email:');
    console.log('To:', recipientEmail);
    console.log('Subject:', emailSubject);
    console.log('Content:', emailContent);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Compose Email</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">Recipient Email:</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="Enter recipient email"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Subject:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Email Content:</label>
        <CKEditor
        editor={ClassicEditor}
        data="<p>Type your content here!</p>"
        onChange={(event, editor) => {
          const data = editor?.getData();
          setContent(data);
        }}
      />
        <div>
        <h3>Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
    </div>
  );
};

export default EmailEditor;
