export const RefreshTokenTitle = 'Refresh Token Validation';
export const RefreshTokenSuccessMessage = 'Token Validation Successful';

export const getRefreshTokenErrorMessage = (err) => {
  return `Refresh Token Validation Error - ${err.error} - ${err.error_description}`;
};
