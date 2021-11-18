import React, { useState } from 'react';

export const Gradient = ({
  gradientClr1,
  gradientClr2,
  index,
  hexColors1,
  hexColors2,
  direction,
}) => {
  const [copy, setCopy] = useState(false);

  const newHexVal1 = `#${hexColors1}`;
  const newHexVal2 = `#${hexColors2}`;
  const copyVal = `background-image: linear-gradient(to ${direction}, ${newHexVal1}, ${newHexVal2});`;

  const handleValuesCopied = () => {
    navigator.clipboard.writeText(copyVal);
    setCopy(true);
  };
  setTimeout(() => {
    setCopy(false);
  }, 900);
  return (
    <>
      <div className='box-wrapper'>
        {/* gradient-box */}
        <div
          className='box'
          style={{
            backgroundImage: `linear-gradient(to ${direction}, rgb(${gradientClr1}), rgb(${gradientClr2}))`,
          }}
        ></div>
        {/* footer */}
        <div className='footer'>
          <div className='preview'>
            <div
              className='clr-preview1'
              style={{ backgroundColor: `rgb(${gradientClr1})` }}
            ></div>
            <div
              className='clr-preview2'
              style={{ backgroundColor: `rgb(${gradientClr2})` }}
            ></div>
          </div>
          {/* copy icon */}
          <span onClick={handleValuesCopied}>
            <i className='far fa-copy'></i>
          </span>
          {/* copy text */}
          {copy && <small className='copy'>copied</small>}
        </div>
        {/* rounded */}
        <div
          className='rounded'
          style={{
            backgroundImage: `linear-gradient(to ${direction}, rgb(${gradientClr1}), rgb(${gradientClr2}))`,
          }}
        ></div>
      </div>
    </>
  );
};
