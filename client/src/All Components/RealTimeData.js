import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import LoginToastMessage from './LoginToastMessage';

const fetcher = url => axios.get(url).then(res => res.data);

const RealTimeData = () => {
  const { data, error } = useSWR(
    'https://script.google.com/macros/s/AKfycbxdDyMSUlLPRPtoBNSri1US3Vko2LXxDJOOlMNTf2BACyGcggPYm_CfFuDcOCtn5XQiag/exec?action=getUsers', 
    fetcher, 
    {
      refreshInterval: 4000, // Re-fetch every 4 seconds
    }
  );
  console.log(data);
  

  const [prevData, setPrevData] = useState([]);

  useEffect(() => {
    if (data) {
      if (prevData.length > 0 && data.length !== prevData.length) {
        <LoginToastMessage/>
        alert('Data has been updated!');
      }
      setPrevData(data);
    }
  }, [data, prevData]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  // Check if data is an array
  const itemCount = Array.isArray(data) ? data.length : 0;

  return (
    <div>
      <div className="scrollable-container">
        <h1>Real-Time Data with SWR</h1>
        <p>Data Count: {itemCount}</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default RealTimeData;
