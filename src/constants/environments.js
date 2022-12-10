export const getHost = (env) => {
  if (env === '##dev') {
    return 'https://deveron--devsandbox.sandbox.my.site.com/clients';
  }

  if (env === '##stg') {
    return 'https://stage-clients.deveronapp.com';
  }

  return 'https://clients.deveronapp.com';
}

export const getClientId = (env) => {
  // looks like this is the same for all environments
  return '3MVG9szVa2RxsqBbxGNR1jnn.ILxCw3XDR5c1KdQ7nWr3ly760eFFzffv9ToydCociBRswA_qHZu9CSvUGQsU';
};
