import React from "react";
import classNames from 'classnames';

const Input = (props) => {
  const { className, ...propsWithoutClasses } = props;
  const inputClasses = classNames(
    'form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:outline-none',
    {
      'text-gray-700 bg-gray-200 border-gray-300 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-600':
        props.disabled,
    },
    {
      'text-gray-700 bg-white border-gray-300 focus:text-gray-700 focus:bg-white focus:border-green-600':
        !props.disabled,
    },
    className,
  );

  return <input className={inputClasses} {...propsWithoutClasses} />;
};

export default Input;
