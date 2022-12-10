import React, { useMemo, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { selectJobsWithValidations } from '../../../../features/jobsSlice'
import { MainColumns, NestedColumns } from './columns';

const PreviewTable = () => {
  const [dataSource, setDataSource] = useState();
  const jobs = useSelector(selectJobsWithValidations);

  const height = window.innerHeight - 320 
  const expandedRowRender = (tableData) => {
    return (
      <div className=" w-1/3">
        <Table columns={NestedColumns} dataSource={tableData?.samplingPoints} pagination={false} />
      </div>
    );
  };

  useMemo(() => {
    const formatTableData = jobs?.map((job, i) => {
      let formatPoints = job.samplingPoints.map((rowData, i) => {
        let points = {
          ...rowData,
          key: i,
        };
        return points;
      });

      let data = {
        ...job,
        samplingPoints: formatPoints,
        key: i,
      };
      return data;
    });
    setDataSource(formatTableData);
  }, [jobs]);

  return (
    <Table
      className="components-table-demo-nested"
      columns={MainColumns}
      expandable={{ expandedRowRender }}
      dataSource={dataSource}
      rowClassName={(rowData) => {
        return rowData.samplingPoints.length ? '' : 'bg-red-100';
      }}
      pagination={{ pageSize: 100 }}
      scroll={{ x: 3600, y: height }} // To setup width and height of the table
    />
  );
};

export default PreviewTable;
