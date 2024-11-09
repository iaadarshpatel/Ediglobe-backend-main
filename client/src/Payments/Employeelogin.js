import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employeelogin = () => {
    const navigate = useNavigate();
    const [employeeCode, setEmployeeCode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if the user is already logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/CheckPayments', { replace: true }); // Redirect to CheckPayments if already logged in
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:3003/api/auth/login', { employeeCode, password });
            console.log(response.data);

            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', true);  // Store login state in localStorage
                navigate('/CheckPayments', { replace: true });  // Redirect to /CheckPayments and replace history
            } else {
                setError('Invalid Employee Code or Password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid Employee Code or Password');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Employee Code"
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn w-100 my-2" style={{ backgroundColor: "#002347", color: "white" }}>Login</button>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Employeelogin;
