import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Steps } from 'antd';

const { Step } = Steps;
const Stepper = () => {
  const location = useLocation();
  const [stepperStage, setStepperStage] = useState('0');

  useEffect(() => {
    switch (location.pathname) {
      case '/steps/select':
        return setStepperStage(0);
      case '/steps/preview':
        return setStepperStage(1);
      case '/steps/map':
        return setStepperStage(2)
      case '/steps/authenticate':
        return setStepperStage(3);
      case '/steps/upload':
        return setStepperStage(4);
      default:
        return setStepperStage(0);
    }
  }, [location.pathname]);

  return (
    <Steps progressDot current={stepperStage}>
      <Step title="Select Files" />
      <Step title="Preview Data" />
      <Step title="Preview Map"/>
      <Step title="Authenticate" />
      <Step title="Upload" />
    </Steps>
  );
};

export default Stepper;