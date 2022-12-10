import React from 'react';
import classNames from 'classnames';

const Button = ({ disabled, className, handleClick, children }) => {
  const buttonClasses = classNames(
    'text-white font-bold py-2 px-4 rounded inline',
    {
      'bg-gray-300 hover:bg-gray-300 cursor-not-allowed focus:outline-none disabled:opacity-75 pointer-events-none':
        disabled,
    },
    { 'bg-green-900 hover:bg-green-700': !disabled },
    className,
  );

  return (
    <button className={buttonClasses} onClick={handleClick}>{children}</button>
  );
};

export default Button;
