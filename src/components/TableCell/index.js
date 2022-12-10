import React from 'react';
import { StopOutlined, CheckCircleOutlined } from '@ant-design/icons';

const TableCell = ({ data, nullIf, showCheckOnly, showError }) => {
  const dataDiv = showCheckOnly ? (
    <CheckCircleOutlined className="!text-green-500" />
  ) : showError ? (
    <StopOutlined className="!text-red-500" />
  ) : (
    <div>{data}</div>
  )

  const showData = nullIf === undefined ? data !== undefined && data !== null && data !== '' : !nullIf;

  return (
    <div>
      {showData ? dataDiv : (
        <StopOutlined className="!text-gray-300" />
      )}
    </div>
  );
};

export default TableCell;
