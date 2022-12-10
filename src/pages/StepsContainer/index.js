import { Outlet } from 'react-router-dom';
import Stepper from '../../components/Stepper';

const StepsContainer = () => {
  return (
    <div className="pt-2 flex flex-col h-full">
      <Stepper className="flex" />
      <Outlet />
    </div>
  );
};

export default StepsContainer;
