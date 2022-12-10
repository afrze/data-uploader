import React from 'react';

const InputFile = ({ label, handleData, value }) => {
  return (
    <div className="mb-3 w-96">
      <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700 text-lg">
        {label}
      </label>
      <input
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
          bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
          ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600"
        type="file"
        accept=".csv"
        id="formFile"
        value={value}
        onChange={(e) => handleData(e.target.files[0])}
      />
    </div>
  );
};

export default InputFile;
