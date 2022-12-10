import React from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import getColumns from './columns';
import { selectSortedJobs, uploadToSalesforce } from '../../../../features/jobsSlice';

const UploadTable = () => {
  const jobs = useSelector(selectSortedJobs);
  const dispatch = useDispatch();

  const handleUpload = (job) => {
    dispatch(uploadToSalesforce(job))
  }

  return (
    <Table
      columns={getColumns(handleUpload)}
      dataSource={jobs}
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export default UploadTable;
