import React from 'react';
import FOOTER_PATTERN_MOBILE from './images/bg-pattern-intro-right-mobile.svg';
import FOOTER_PATTERN_DESKTOP from './images/bg-pattern-intro-right-desktop.svg';

export const Footer = ({ bgColor1, bgColor2 }) => {
  let date = new Date();
  const newDate = date.getFullYear();
  return (
    <footer>
      <div className='footer-content' style={{ background: `${bgColor2}` }}>
        <div className='wrapper'>
          {/* logo */}
          <div className='identity'>
            <div className='logo'>
              <h1>
                <a href='#'>Coloree.</a>
              </h1>
              {/* <h2>coloree.</h2> */}
            </div>
          </div>
          {/* email */}
          <div className='contact'>
            <p>
              <a href='mailto:fesoque0@gmail.com'>fesoque0@gmail.com</a>
            </p>
          </div>
          <div className='social'>
            {/* github */}
            <span>
              <a
                href='https://github.com/FesoQue'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-github fa-2x'></i>
              </a>
            </span>
            {/* twitter */}
            <span>
              <a
                href='https://www.twitter.com/q__hue'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-twitter fa-2x'></i>
              </a>
            </span>
          </div>
        </div>
        {/* patterns */}
        <img
          src={FOOTER_PATTERN_MOBILE}
          className='footer-pattern footer-pattern-m'
          alt='PATTERN'
        />
        <img
          src={FOOTER_PATTERN_DESKTOP}
          className='footer-pattern footer-pattern-d'
          alt='PATTERN'
        />
        <div className='copyright attr'>
          {/* <p>© {newDate}. All rights reserved</p> */}
          <p>
            Crafted && Designed by{' '}
            <a href='https://github.com/FesoQue'>Adefeso Q.A</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
