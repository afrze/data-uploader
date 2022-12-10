import { StopOutlined } from '@ant-design/icons';
import TableCell from '../../../../components/TableCell';

export const MainColumns = [
  {
    title: 'Job Ref',
    dataIndex: 'clientReference',
    key: 'clientReference',
    align: 'left',
    sorter: (a, b) => a?.clientReference.localeCompare(b?.clientReference),
  },
  {
    title: 'Job Type',
    dataIndex: 'jobType',
    key: 'jobType',
    align: 'left',
    sorter: (a, b) => a?.jobSubType.localeCompare(b?.jobSubType),
  },
  {
    title: 'Job Sub-Type',
    dataIndex: 'jobSubType',
    key: 'jobSubType',
    align: 'left',
    sorter: (a, b) => a?.jobSubType.localeCompare(b?.jobSubType),
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
    title: 'Crop Name',
    dataIndex: 'cropName',
    key: 'cropName',
    sorter: (a, b) => a?.cropName.localeCompare(b?.cropName),
    align: 'left',
    render: (cropName) => <TableCell data={cropName} />,
  },
  {
    title: 'Harvest Date',
    dataIndex: 'harvestDate',
    key: 'harvestDate',
    align: 'left',
    sorter: (a, b) => a?.harvestDate.localeCompare(b?.harvestDate),
    render: (harvestDate) => <TableCell data={harvestDate} />,
  },
  {
    title: 'Target Window',
    dataIndex: 'targetWindow',
    key: 'targetWindow',
    align: 'left',
    sorter: (a, b) => a?.targetWindow?.startDate.localeCompare(b?.targetWindow?.startDate),
    render: (targetWindow) => (
      <TableCell
        data={targetWindow?.startDate + ' - ' + targetWindow?.endDate}
        nullIf={!targetWindow?.startDate && !targetWindow?.endDate}
      />
    ),
  },
  {
    title: 'Grower Name',
    dataIndex: 'grower',
    key: 'grower',
    align: 'left',
    sorter: (a, b) => a?.grower?.name.localeCompare(b?.grower?.name),
    render: (grower) => <TableCell data={grower?.name} />,
  },
  {
    title: 'Grower Phone',
    dataIndex: 'grower',
    key: 'grower',
    align: 'left',
    sorter: (a, b) => a?.grower?.phone.localeCompare(b?.grower?.phone),
    render: (grower) => <TableCell data={grower?.phone} />,
  },
  {
    title: 'Grower Email',
    dataIndex: 'grower',
    key: 'grower',
    align: 'left',
    sorter: (a, b) => a?.grower?.email.localeCompare(b?.grower?.email),
    render: (grower) => <TableCell data={grower?.email} />,
  },
  {
    title: 'Field Name',
    dataIndex: 'field',
    key: 'field',
    align: 'left',
    sorter: (a, b) => a?.field?.name.localeCompare(b?.field?.name),
    render: (field) => <TableCell data={field?.name} />,
  },
  {
    title: 'Farm Name',
    dataIndex: 'field',
    key: 'field',
    align: 'left',
    sorter: (a, b) => a?.field?.farmName.localeCompare(b?.field?.farmName),
    render: (field) => <TableCell data={field?.farmName} />,
  },
  {
    title: 'Location',
    dataIndex: 'field',
    key: 'field',
    align: 'left',
    width: '200px',
    render: (field) => {
      return (
        <div>
          {field?.location?.latitude === '' || field?.location?.longitude === '' ? (
            <StopOutlined className="!text-gray-300" />
          ) : (
            <a
              href={`https://maps.google.com/?t=k&q=${field?.location?.latitude},${field?.location?.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              {`${Number(field?.location?.latitude).toFixed(6)}`},{' '}
              {`${Number(field?.location?.longitude).toFixed(6)}`}
            </a>
          )}
        </div>
      );
    },
  },
  {
    title: 'Boundary',
    dataIndex: 'field',
    key: 'field',
    align: 'center',
    render: (field) => {
      return field.geoJSONValid ? (
        <TableCell data={field?.boundary} showCheckOnly />
      ) : (
        <TableCell data={field?.boundary} showError />
      );
    },
  },
  {
    title: 'Area',
    dataIndex: 'field',
    key: 'field',
    align: 'right',
    sorter: (a, b) => a?.field?.acres - b?.field?.acres,
    render: (field) => (
      <TableCell data={`${Number(field?.acres).toFixed(2)} acres`} nullIf={!field?.acres} />
    ),
  },
  {
    title: 'Lab Id',
    dataIndex: 'labId',
    key: 'labId',
    align: 'left',
    sorter: (a, b) => a?.labId.localeCompare(b?.labId),
    render: (labId) => <TableCell data={labId} />,
  },
  {
    title: 'Agreement Id',
    dataIndex: 'agreementId',
    key: 'agreementId',
    align: 'left',
    sorter: (a, b) => a?.agreementId.localeCompare(b?.agreementId),
    render: (agreementId) => <TableCell data={agreementId} />,
  },
  {
    title: 'Coll. Year',
    dataIndex: 'collectionYear',
    key: 'collectionYear',
    align: 'left',
    sorter: (a, b) => a?.collectionYear.localeCompare(b?.collectionYear),
    render: (collectionYear) => <TableCell data={collectionYear} />,
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    align: 'left',
    sorter: (a, b) => a?.notes.localeCompare(b?.notes),
    render: (notes) => <TableCell data={notes} />,
  },
];

export const NestedColumns = [
  {
    title: 'Point Ref',
    dataIndex: 'clientReference',
    key: 'clientReference',
    align: 'left',
    render: (clientReference) => <TableCell data={clientReference} />,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'left',
    render: (type) => <TableCell data={type} />,
    onCell: (rowData) => {
      return {
        className: rowData.type !== 'Bulk' && rowData.type !== 'SOC' ? 'bg-red-100' : '',
      };
    },
  },
  {
    title: 'Test Packages',
    dataIndex: 'testPackages',
    key: 'testPackages',
    align: 'left',
    render: (testPackages) => <TableCell data={testPackages} />,
  },
  {
    title: 'Location',
    dataIndex: 'pointLocation',
    key: 'pointLocation',
    align: 'left',
    render: (pointLocation) => {
      return (
        <a
          href={`https://maps.google.com/?q=${pointLocation.latitude},${pointLocation.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          {`${Number(pointLocation.latitude).toFixed(6)}`},{' '}
          {`${Number(pointLocation.longitude).toFixed(6)}`}
        </a>
      );
    },
  },
  {
    title: 'Depth Range (cms)',
    dataIndex: 'startingDepthInCms',
    key: 'startingDepthInCms',
    align: 'right',
    render: (_, rowData) => {
      return rowData.startingDepthInCms && rowData.depthInCms ? (
        <div>
          {`${Number(rowData.startingDepthInCms).toFixed(0)}`}
          {' - '}
          {`${(Number(rowData.startingDepthInCms) + Number(rowData.depthInCms)).toFixed(0)}`}
        </div>
      ) : (
        <StopOutlined className="!text-gray-300" />
      );
    },
  },
  {
    title: 'Core Diameter (inches)',
    dataIndex: 'coreDiameterInInches',
    key: 'coreDiameterInInches',
    align: 'right',
    render: (coreDiameterInInches) => <TableCell data={coreDiameterInInches} />,
  },
  {
    title: 'Lab Notes',
    dataIndex: 'labNotes',
    key: 'labNotes',
    align: 'left',
    render: (labNotes) => <TableCell data={labNotes} />,
  },
  {
    title: 'Group',
    dataIndex: 'groupId',
    key: 'groupId',
    align: 'left',
    render: (groupId) => <TableCell data={groupId} />,
  },
  {
    title: 'Group Order',
    dataIndex: 'groupBackupOrder',
    key: 'groupBackupOrder',
    align: 'right',
    render: (groupBackupOrder) => <TableCell data={groupBackupOrder} />,
  },
];
