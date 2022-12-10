import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

import { getAccessToken, clearAccessToken, setEnvironment } from '../../../features/authSlice';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

const Authenticate = () => {
  const [inputValue, setInputValue] = useState('');
  const authStore = useSelector((state) => state.authStore);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isChangingEnvironment = (value) => {
    return value === '##dev' || value === '##stg' || value === '##prd';
  };

  const buttonDisplay = authStore.loading
    ? 'Authenticating...'
    : (isChangingEnvironment(inputValue) ? 'Change Environment' : 'Authenticate');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleButtonClick = () => {
    if (isChangingEnvironment(inputValue)) {
      setInputValue('');
      dispatch(setEnvironment(inputValue));
    } else {
      dispatch(getAccessToken(inputValue));
    }
  };

  const resetEnv = () => {
    dispatch(setEnvironment('##prd'));
    dispatch(clearAccessToken());
    setInputValue('');
  };

  return (
    <>
      <section className="flex-1 mx-5 my-6 flex-wrap justify-center flex-col">
        <div className="flex flex-col justify-center content-center h-full">
          <div className="flex flex-row justify-center">
            <div className="w-2/5">
              {(authStore.env === '##stg' || authStore.env === '##dev') && (
                <div className="py-1.5 mb-2 text-sm">
                  <Tag title="Current Environment">{authStore.env}</Tag>
                  <Button className="inline-block ml-2 py-1 px-3 bg-red-600 hover:bg-red-500" handleClick={resetEnv}>
                    Reset
                  </Button>
                </div>
              )}

              <div className="flex justify-center gap-2">
                <Input
                  value={inputValue}
                  placeholder="Refresh Token"
                  disabled={authStore.accessToken !== ''}
                  onChange={handleInputChange}
                />

                {authStore.accessToken !== '' ? (
                  <CheckCircleOutlined className="!text-green-600 text-4xl leading-4 inline-block align-middle" />
                ) : (
                  <Button handleClick={handleButtonClick}>{buttonDisplay}</Button>
                )}
              </div>

              <div className="py-1.5 mb-2 text-sm">
                <a
                  href="https://docs.deveronapp.com/reference/oauth-20"
                  target="_blank"
                  rel="noreferrer"
                >
                  Where do I get this from?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex justify-between">
        <Button handleClick={() => navigate('/steps/map')}>
          Back
        </Button>
        <Button disabled={!authStore.accessToken} handleClick={() => navigate('/steps/upload')}>
          Next
        </Button>
      </footer>
    </>
  );
};

export default Authenticate;
