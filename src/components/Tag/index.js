import React from 'react';

const Tag = ({ title, children }) => {

  return (
    <div className='text-green-600 bg-green-100 border-2 border-green-200 inline text-xs py-1 px-2 rounded' title={title}>
      {children}
    </div>
  );
};

export default Tag;
