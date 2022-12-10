import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { getHost } from '../../constants/environments';
import { isValidJSON } from '../../helpers';

const initialState = {
  jobs: [],
  uploading: false,
};

export const uploadToSalesforce = createAsyncThunk(
  'JobsSlice/uploadToSalesforce',
  async (job, { dispatch, getState }) => {
    const { authStore } = getState();
    const token = authStore.accessToken;

    dispatch(
      updateJob({
        ...job,
        uploadStatus: 'uploading',
        uploadError: null,
      }),
    );

    const url = getHost(authStore.env) + '/services/apexrest/1.0/jobs/';
    return axios({
      method: 'POST',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(job),
    })
      .then((res) => {
        dispatch(
          updateJob({
            ...job,
            uploadStatus: 'success',
            uploadError: null,
            uploadedJobId: res.data.jobId,
          }),
        );
      })
      .catch((err) => {
        const errorMessage = err.response.data[0].message;
        console.error('Failed Job Upload: ', errorMessage);

        dispatch(
          updateJob({
            ...job,
            uploadStatus: 'error',
            uploadError: errorMessage,
          }),
        );
      });
  },
);

export const JobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, { payload }) => {
      state.jobs = payload;
    },
    updateJob: (state, { payload }) => {
      state.jobs = [
        payload,
        ...state.jobs.filter((job) => job.key !== payload.key),
      ];
    },
    resetJobs: (state) => {
      state.jobs = [];
    },
  },
  extraReducers: {
    [uploadToSalesforce.pending]: (state) => {
      state.uploading = true;
    },
    [uploadToSalesforce.fulfilled]: (state) => {
      state.uploading = false;
    },
    [uploadToSalesforce.rejected]: (state) => {
      state.uploading = false;
    },
  },
});

export const { setJobs, updateJob, resetJobs } = JobsSlice.actions;

export default JobsSlice.reducer;

// Memoized Value
export const selectSortedJobs = (state) => [...state.jobStore.jobs].sort((a, b) => a.key.localeCompare(b.key))

export const selectJobsWithValidations = createSelector(
  selectSortedJobs,
  (sortedJobs) => {
    return sortedJobs.map((job) => {
      return { ...job, field: { ...job.field, geoJSONValid: isValidJSON(job) } };
    })
  },
);

export const selectValidJobsForMap = createSelector(
  selectJobsWithValidations,
  (jobsWithValidations) =>
    jobsWithValidations.filter((job) => job.field.boundary && job.field.geoJSONValid),
);
