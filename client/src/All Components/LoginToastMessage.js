import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => {
    toast.success('Logged in successfully!', {
        duration: 5000,
        style: {
            border: '1px solid #2ec946',
            padding: '16px',
            color: '#2ec946',
        },
        iconTheme: {
            primary: '#2ec946',
            secondary: '#f0fff4',
        },
    });
};

const LoginToastMessage = () => {
    useEffect(() => {
        // Check if the toast has been shown in localStorage
        const isToastShown = localStorage.getItem('toastShown');

        if (!isToastShown) {
            notify();
            // Set the flag in localStorage so it doesn't show again
            localStorage.setItem('toastShown', 'true');
        }
    }, []);

    return (
        <div>
            <Toaster position="right-bottom" reverseOrder={true} />
        </div>
    );
};

export default LoginToastMessage;
