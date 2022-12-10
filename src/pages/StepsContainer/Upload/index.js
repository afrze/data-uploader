import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sleep } from '../../../helpers';
import { uploadToSalesforce, selectSortedJobs } from '../../../features/jobsSlice';

import Button from '../../../components/Button';
import UploadTable from './UploadTable';

const Upload = () => {
  const { uploading } = useSelector((state) => state.jobStore);
  const jobs = useSelector(selectSortedJobs);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUploadAll = async () => {
    const unSuccessfulJobs = jobs.filter((job) => job.uploadStatus !== 'success');
    for (const job of unSuccessfulJobs) {
      await dispatch(uploadToSalesforce(job));
      await sleep(500);
    }
  };

  return (
    <>
      <section className="flex-1 mx-5 my-6 h-full">
        <UploadTable />
      </section>

      <footer className="flex justify-between">
        <Button disabled={uploading} handleClick={() => navigate('/steps/authenticate')}>
          Back
        </Button>

        <Button disabled={uploading} handleClick={handleUploadAll}>
          Upload All
        </Button>
      </footer>
    </>
  );
};

export default Upload;
