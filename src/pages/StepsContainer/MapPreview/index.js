import React from 'react'
import JobsMap from './JobsMap';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectValidJobsForMap } from '../../../features/jobsSlice';

const MapPreview = () => {
  const navigate = useNavigate();
  const validJobs = useSelector(selectValidJobsForMap);

  return (
    <>
      <section className="flex-1 mx-5 my-6">
        <JobsMap jobs={validJobs} />
      </section>

      <footer className="flex justify-between mt-5">
        <Button handleClick={() => navigate('/steps/preview')}>Back</Button>
        <Button handleClick={() => navigate('/steps/authenticate')}>Next</Button>
      </footer>
    </>
  );
}

export default MapPreview
