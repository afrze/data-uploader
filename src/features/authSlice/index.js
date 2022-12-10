import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getClientId, getHost } from '../../constants/environments';
import {
  getRefreshTokenErrorMessage,
  RefreshTokenSuccessMessage,
  RefreshTokenTitle,
} from '../../constants/terms';
import { openNotificationWithIcon } from '../../helpers';

const initialState = {
  env: '##prd', // '##prd' or '##dev' or '##stg'
  accessToken: '',
  loading: false,
};

export const getAccessToken = createAsyncThunk(
  'AuthSlice/getAccessToken',
  async (refreshToken, { getState }) => {
    const state = getState().authStore;
    const url = getHost(state.env) + '/services/oauth2/token';
    const clientId = getClientId(state.env);
    const form = new FormData();

    form.append('client_id', clientId);
    form.append('grant_type', 'refresh_token');
    form.append('refresh_token', refreshToken);

    return axios({
      method: 'POST',
      url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: form,
    })
      .then((res) => {
        openNotificationWithIcon('success', RefreshTokenTitle, RefreshTokenSuccessMessage);
        return res.data;
      })
      .catch((err) => {
        openNotificationWithIcon(
          'error',
          RefreshTokenTitle,
          getRefreshTokenErrorMessage(err.response.data),
        );
      });
  },
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEnvironment: (state, { payload }) => {
      state.env = payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = '';
    },
  },
  extraReducers: {
    [getAccessToken.pending]: (state) => {
      state.loading = true;
    },
    [getAccessToken.fulfilled]: (state, { payload }) => {
      state.accessToken = payload?.access_token ?? '';
      state.loading = false;
    },
    [getAccessToken.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setEnvironment, clearAccessToken } = AuthSlice.actions;
export default AuthSlice.reducer;
