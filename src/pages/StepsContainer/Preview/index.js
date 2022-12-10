import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PreviewTable from './PreviewTable';
import Button from '../../../components/Button';
import { selectJobsWithValidations } from '../../../features/jobsSlice';

const Preview = () => {
  const navigate = useNavigate();

  const tableDataAfterValidatingGeoJSON = useSelector(selectJobsWithValidations);

  const navigateBack = () => {
    navigate('/steps/select');
  };

  const navigateNext = () => {
    navigate('/steps/map');
  };

  return (
    <>
      <section className="flex-1 mx-5 my-6">
        <PreviewTable {...{ tableDataAfterValidatingGeoJSON }} />
      </section>

      <footer className="flex justify-between">
        <Button handleClick={navigateBack}>
          Back
        </Button>
        <Button handleClick={navigateNext}>
          Next
        </Button>
      </footer>
    </>
  );
};

export default Preview;
