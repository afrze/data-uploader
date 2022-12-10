import { Tooltip } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';

import TableCell from '../../../../components/TableCell';
import Button from '../../../../components/Button';
import Tag from '../../../../components/Tag';

const getColumns = (handleUpload) => [
  {
    title: 'Job Ref',
    dataIndex: 'clientReference',
    key: 'clientReference',
    align: 'left',
    sorter: (a, b) => a?.clientReference.localeCompare(b?.clientReference),
  },
  {
    title: 'Grower',
    dataIndex: 'grower',
    key: 'grower',
    align: 'left',
    sorter: (a, b) => a?.grower?.name.localeCompare(b?.grower?.name),
    render: (grower) => <TableCell data={grower?.name} />,
  },
  {
    title: 'Farm',
    dataIndex: 'field',
    key: 'field',
    align: 'left',
    sorter: (a, b) => a?.field?.farmName.localeCompare(b?.field?.farmName),
    render: (field) => <TableCell data={field?.farmName} />,
  },
  {
    title: 'Field',
    dataIndex: 'field',
    key: 'field',
    align: 'left',
    sorter: (a, b) => a?.field?.name.localeCompare(b?.field?.name),
    render: (field) => <TableCell data={field?.name} />,
  },
  {
    title: 'Agreement',
    dataIndex: 'agreementId',
    key: 'agreementId',
    align: 'left',
    sorter: (a, b) => a?.agreementId?.localeCompare(b?.agreementId),
    render: (agreementId) => <TableCell data={agreementId} />,
  },
  {
    title: '# of Points',
    dataIndex: 'samplingPoints',
    key: 'samplingPoints',
    align: 'right',
    sorter: (a, b) => a?.samplingPoints?.length - b?.samplingPoints?.length,
    render: (samplingPoints) => <TableCell data={samplingPoints.length} />,
  },
  {
    title: '',
    dataIndex: 'uploadStatus',
    key: 'uploadStatus',
    align: 'right',
    render: (uploadStatus, rowData) => {
      return (
        <div className="align-middle">
          {uploadStatus !== 'success' && (
            <Button
              disabled={uploadStatus === 'uploading' || uploadStatus === 'success'}
              handleClick={() => handleUpload(rowData)}
              className="inline-block mr-2 py-1 px-3"
            >
              {uploadStatus === 'uploading'
                ? 'Uploading...'
                : uploadStatus === 'error'
                ? 'Retry'
                : 'Upload'}
            </Button>
          )}

          {uploadStatus === 'error' ? (
            <Tooltip placement="top" title={rowData.uploadError}>
              <WarningOutlined className="!text-red-600 text-lg cursor-pointer" />
            </Tooltip>
          ) : uploadStatus === 'uploading' ? (
            <LoadingOutlined />
          ) : uploadStatus === 'success' ? (
            <>
              <Tag>{rowData.uploadedJobId}</Tag>
              <CheckCircleOutlined className="!text-green-600 text-lg ml-2" />
            </>
          ) : null}
        </div>
      );
    },
  },
];

export default getColumns;
