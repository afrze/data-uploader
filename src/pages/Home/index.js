import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Home = () => {
  const navigate = useNavigate();

  const navigateNext = () => {
    navigate('/steps/select');
  };

  return (
    <div className="text-center">
      <div className="px-2 py-4 sm:px-6 sm:py-2 text-center">
        <div className="w-4/4 sm: mx-auto mt-20">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
            Welcome to Deveron <br />
            <span className="text-green-900">Data Uploader</span>
          </h1>
          <p className="text-xl">
            Here you can upload your CSV data to our servers. <br />
            You can also preview and validate data before uploading.
          </p>
        </div>
      </div>

      <Button className={'text-center'} enabled handleClick={navigateNext}>
        Get Started!
      </Button>

      <a
        href="https://docs.deveronapp.com/docs/csv-data-upload"
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded block mx-auto mt-12 w-1/4"
        target="_blank"
        rel="noreferrer"
      >
        Read the Docs
      </a>
    </div>
  );
};

export default Home;
