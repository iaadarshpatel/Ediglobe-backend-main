import React from 'react';

const SkeletonLoader = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2 mt-1"></div>
          </td>
          <td className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
          </td>
          <td className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
          </td>
          <td className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
          </td>
          <td className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
          </td>
          <td className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SkeletonLoader;
