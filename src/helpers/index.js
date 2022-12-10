import Papa from 'papaparse';
import { notification } from 'antd';

import * as geolib from 'geolib';

export const processCsv = (text) => {
  const headers = text.slice(0, text.indexOf('\n')).split(',');
  const rows = text.slice(text.indexOf('\n') + 1).split('\n');
  const newArray = rows.map((row) => {
    const values = row.split(',');
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
    return eachObject;
  });
  return newArray;
};

const getArea = (geoJsonString) => {
  var geoJson = {};
  try {
    geoJson = JSON.parse(geoJsonString);
  } catch {
    return 0;
  }
  geoJson = JSON.parse(geoJsonString);
  var area = 0;
  // convert to array of lng, lat arrays
  geoJson?.features?.forEach((feature) => {
    let polygon = extractPolygon(feature);
    if (polygon && polygon.length > 0) {
      area += geolib.getAreaOfPolygon(polygon);
    }
  });
  // convert to acres
  area = area * 0.000247105;
  return area;
};

const extractPolygon = (feature) => {
  if (feature.geometry.type === 'Polygon') {
    return feature.geometry.coordinates[0];
  } else if (feature.geometry.type === 'MultiPolygon') {
    return feature.geometry.coordinates[0][0];
  }
};

export const convertCsvDataToPoint = (pointRow) => {
  return {
    key: pointRow.clientReference?.trim(),
    clientReference: pointRow.clientReference?.trim(),
    jobClientReference: pointRow.jobClientReference?.trim(),
    pointLocation: {
      latitude: pointRow['pointLocation.latitude']?.trim(),
      longitude: pointRow['pointLocation.longitude']?.trim(),
    },
    type: pointRow.type?.trim(),
    testPackages: pointRow.testPackages?.trim(),
    depthInCms: pointRow.depthInCms?.trim(),
    startingDepthInCms: pointRow.startingDepthInCms?.trim(),
    coreDiameterInInches: pointRow.coreDiameterInInches?.trim(),
    labNotes: pointRow.labNotes?.trim(),
    groupId: pointRow?.groupId ? pointRow.groupId.trim() : pointRow?.clientReference?.trim(),
    groupBackupOrder: pointRow?.groupBackupOrder ? pointRow?.groupBackupOrder.trim() : 0,
  };
};

export const convertCsvDataToJob = (dataRow) => {

  let boundary = dataRow['field.boundary'] || dataRow['field.boundary.fileName']

  return {
    key: dataRow.clientReference?.trim(),
    clientReference: dataRow.clientReference?.trim(),
    jobType: dataRow.jobType?.trim() || 'Soil',
    jobSubType: dataRow.jobSubType?.trim() || 'Carbon Project',
    cropName: dataRow.cropName?.trim(),
    harvestDate: dataRow.harvestDate?.trim(),
    notes: dataRow.notes?.trim(),
    targetWindow: {
      startDate: dataRow['targetWindow.startDate']?.trim(),
      endDate: dataRow['targetWindow.endDate']?.trim(),
    },
    grower: {
      name: dataRow['grower.name']?.trim(),
      phone: dataRow['grower.phone']?.trim(),
      email: dataRow['grower.email']?.trim(),
    },
    field: {
      name: dataRow['field.name']?.trim(),
      farmName: dataRow['field.farmName']?.trim(),
      location: {
        latitude: dataRow['field.location.latitude']?.trim(),
        longitude: dataRow['field.location.longitude']?.trim(),
      },
      boundary: boundary?.trim(),
      acres: getArea(boundary),
    },
    labId: dataRow.labId?.trim(),
    agreementId: dataRow.agreementId?.trim(),
    collectionYear: dataRow.collectionYear?.trim(),
    uploadError: null,
    uploadStatus: null,
    uploadedJobId: null,
    samplingPoints: [],
  };
};

export const papaParse = (data) => {
  const parsedData = Papa.parse(data, {
    header: true,
    complete: (results) => {
      return results.data;
    },
  });
  return parsedData;
};

export const combineJobsAndPoints = (jobs, points) => {
  let formattedPoints = points?.map((data) => convertCsvDataToPoint(data));

  const jobsWithPoints = jobs?.map((dataRow) => {
    let job = convertCsvDataToJob(dataRow);

    job.samplingPoints = job?.samplingPoints.concat(
      formattedPoints?.filter((point) => point.jobClientReference === dataRow.clientReference),
    );
    return job;
  });
  return jobsWithPoints;
};

export const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isValidJSON = (job) => {
  try {
    JSON.parse(job.field.boundary)
    return true
  } catch(err) {
    return false
  }
}
