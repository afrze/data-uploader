import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';

import { combineJobsAndPoints } from '../../../helpers';
import { setJobs } from '../../../features/jobsSlice';

import InputFile from '../../../components/InputFile';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

const FileSelect = () => {
  const [rawJobs, setRawJobs] = useState(null);
  const [rawPoints, setRawPoints] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setJobs(combineJobsAndPoints(rawJobs, rawPoints)));
    navigate('/steps/preview');
  };

  const parseJobs = (e) => {
    Papa.parse(e, {
      header: true,
      complete: (results) => {
        setRawJobs(results.data);
      },
    });
  };

  const parsePoints = (e) => {
    Papa.parse(e, {
      header: true,
      complete: (results) => {
        setRawPoints(results.data);
      },
    });
  };

  return (
    <>
      <section className="flex-1 mx-5 my-6">
        <div className="flex mx-4 my-8 flex-wrap justify-center gap-32 ">
          <div>
            <InputFile label="Jobs CSV File" handleData={parseJobs} />
            {rawJobs ? <Tag>{rawJobs.length} jobs found</Tag> : null}
          </div>
          <div>
            <InputFile label="Points CSV File" handleData={parsePoints} />
            {rawPoints ? <Tag>{rawPoints?.length} points found</Tag> : null}
          </div>
        </div>
      </section>

      <footer className="flex justify-between">
        <a
          href="https://docs.deveronapp.com/docs/csv-data-upload"
          className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
          target="_blank"
          rel="noreferrer"
        >
          Read the Docs
        </a>

        <Button disabled={!rawJobs?.length || !rawPoints?.length} handleClick={handleClick}>
          Next
        </Button>
      </footer>
    </>
  );
};

export default FileSelect;
