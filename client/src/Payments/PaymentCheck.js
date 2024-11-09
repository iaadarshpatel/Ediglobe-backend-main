import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const PaymentCheck = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cache, setCache] = useState({});
  const [disabled, setDisabled] = useState(false); // New state for disabling the button
  const navigate = useNavigate();

  const storeInCache = (data) => {
    const identifiers = [
      data.id,
      data.order_id,
      data.email,
    ];

    setCache((prevCache) => {
      const newCache = { ...prevCache };
      identifiers.forEach((id) => {
        if (id) {
          newCache[id] = data;
        }
      });
      return newCache;
    });
  };

  const getUserData = async (query) => {
    if (cache[query]) {
      setResult(cache[query]);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3003/api/payments/${query}`
      );
      if (response.data) {
        setResult(response.data);
        storeInCache(response.data);
        setError(null);
      } else {
        setResult(null);
        setError("No payment found for the provided details.");
      }
    } catch (err) {
      setResult(null);
      setError("Please enter valid details.");
    } finally {
      setIsLoading(false);

      // Set timeout to disable the button after 2 seconds
      setTimeout(() => {
        setDisabled(true);
      }, 2000);
    }
  };

  const handleCheck = () => {
    setIsLoading(true);
    setDisabled(false); // Ensure button is enabled before making the request
    getUserData(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    setResult(null);
    setError(null);
    setDisabled(false); // Re-enable the button when clearing the search
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        navigate('/Employeelogin', { replace: true });  // Redirect to Employeelogin if not logged in and replace history
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');  // Clear Employeelogin state
    navigate('/Employeelogin', { replace: true });  // Redirect to Employeelogin and replace history
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            <div className="text-center my-4">
              <h2>Check Current Payments</h2>
              <p className="text-muted">
                <b>Note:</b> Enter payment ID, order ID or Email.
              </p>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter details"
                  disabled={isLoading}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn me-2"
                  onClick={handleCheck}
                  disabled={disabled || isLoading} // Disable if either isLoading or disabled is true
                  style={{ backgroundColor: "#002347", color: "white" }}
                >
                  {isLoading ? (
                    <Hourglass
                      visible={true}
                      height="15"
                      width="15"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={['white']}
                    />
                  ) : (
                    "Check"
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleClear}
                  disabled={isLoading}
                >
                  Clear
                </button>
              </div>
            </div>
            {result && (
              <div className="card mt-4">
                <div className="card-body">
                  <h3 className="card-title">Payment Details</h3>
                  <p>
                    <strong>Payment ID:</strong> {result.id}
                  </p>
                  <p>
                    <strong>Amount:</strong> {result.amount / 100}
                  </p>
                  <p>
                    <strong>Currency:</strong> {result.currency}
                  </p>
                  <p>
                    <strong>Status:</strong><b style={{color: "#00C000"}}> {result.status}</b>
                  </p>
                  <p>
                    <strong>Order ID:</strong> {result.order_id}
                  </p>
                  <p>
                    <strong>Method:</strong> {result.method}
                  </p>
                  <p>
                    <strong>Email:</strong> {result.email}
                  </p>
                </div>
              </div>
            )}
            {error && <div className="alert alert-danger mt-4">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheck;
