import { useState, useEffect } from 'react';
import { Gradient } from './Gradient';
import { Footer } from './Footer';
import Values from 'values.js';
import BG_PATTERN_R from './images/bg-pattern-intro-right-mobile.svg';
import BG_PATTERN_L from './images/bg-pattern-intro-left-mobile.svg';
import BG_PATTERN_R_XL from './images/bg-pattern-intro-right-desktop.svg';
import BG_PATTERN_L_XL from './images/bg-pattern-intro-left-desktop.svg';

const App = () => {
  const [color1, setColor1] = useState('#de3fb7');
  const [color2, setColor2] = useState('#713cc3');
  const [clrList1, setClrList1] = useState(new Values('#de3fb7').all(12));
  const [clrList2, setClrList2] = useState(new Values('#713cc3').all(12));
  const [direction, setDirection] = useState('bottom');
  const [copy, setCopy] = useState(false);
  const [error, setError] = useState('');
  const [mergedColors, setMergedColors] = useState([]);
  const [scrollY, setScrollY] = useState('');
  const [size, setSize] = useState('');

  //  color 1
  const handleColor1 = (e) => {
    const colorValue = e.target.value;
    setColor1(colorValue);
  };
  // color 2
  const handleColor2 = (e) => {
    const colorValue = e.target.value;
    setColor2(colorValue);
  };
  // handle different Directions
  const handleDirections = (e) => {
    const value = e.target.value;
    setDirection(value);
  };
  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (color1 && color2) {
        let gradColor1 = new Values(`${color1}`).all(12);
        let gradColor2 = new Values(`${color2}`).all(12);
        setClrList1(gradColor1);
        setClrList2(gradColor2);
        handleColors();
      }
      // show error if one of the input is blank
      if ((color1 && !color2) || (!color1 && color2) || (!color1 && !color2)) {
        setError('inputs cannot be blank 😞');
      }
    } catch (error) {
      console.log(error);
      setError('Unable to parse color value 😞');
    }
    //
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  //this functions merge the two colors arrays
  const handleColors = () => {
    let colors = [];
    for (let i = 0; i < clrList1.length; i++) {
      colors[i] = [clrList1[i], clrList2[i]];
      setMergedColors(colors);
    }
  };
  // copy cssCode
  const copyCSS = () => {
    const cssCode = `background-image: linear-gradient(to ${direction}, ${color1}, ${color2});`;
    navigator.clipboard.writeText(cssCode);
    setCopy(true);
  };
  // reset copy to initial state
  setTimeout(() => {
    setCopy(false);
  }, 3000);
  //check vertical scroll
  const checkScroll = () => {
    setScrollY(window.scrollY);
  };
  const checkSize = () => [setSize(window.innerWidth)];

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkSize);
    handleColors();
    // cleanup
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkSize);
    };
  }, [color1, color2, direction]);

  const scrollValue = Math.floor(scrollY);

  return (
    <>
      <main>
        <header
          id='header'
          style={{
            backgroundImage: `linear-gradient(to ${direction}, ${color1}, ${color2})`,
          }}
        >
          <div className='wrapper'>
            <div className='content'>
              {/* logo */}
              <div className='identity'>
                <div className='logo'>
                  <h1>
                    <a href='#'>Coloree.</a>
                  </h1>
                  {/* <h2>coloree.</h2> */}
                </div>
                <p className='tagline'>express your unique mood</p>
              </div>
              {/* form */}
              <form onSubmit={handleSubmit}>
                {error && <p className='err'>{error}</p>}
                <div className='form-group'>
                  <div className='d-flex'>
                    <div className='form-control form-c1'>
                      <input
                        type='text'
                        name='gradient-color1'
                        className='grad-clr1'
                        value={color1}
                        onChange={handleColor1}
                        placeholder='#8a2be2'
                      />
                    </div>
                    {/* select orientation/direction */}
                    <div className='orientation'>
                      <select name='directions' onChange={handleDirections}>
                        <option value='top'>Top</option>
                        <option value='right'>Right</option>
                        <option value='left'>Left</option>
                        <option selected value='bottom'>
                          Bottom
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className='form-control'>
                    <input
                      type='text'
                      name='gradient-color2'
                      className='grad-clr2'
                      value={color2}
                      onChange={handleColor2}
                      placeholder='#dc143c'
                    />
                  </div>
                  <button type='submit'>Generate 🚀 </button>
                </div>
              </form>
            </div>
          </div>
          {/* css code */}
          <div className='css-code'>
            <div className='code wrapper'>
              <p>CSS Code:</p>
              <code>
                background-image: linear-gradient(to {direction}, {color1},{' '}
                {color2}
                );
              </code>
              {/* copy */}
              <div className='copy-css'>
                {copy ? (
                  <small>💚 </small>
                ) : (
                  <span onClick={copyCSS}>
                    <i className='fas fa-copy'></i>
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* pattern dot */}
          <div className='pattern-dot'>
            {/* mobile */}
            <img
              src={BG_PATTERN_R}
              alt='pattern'
              className='footer-pattern right-pattern-m'
            />
            <img
              src={BG_PATTERN_L}
              alt='pattern'
              className='footer-pattern left-pattern-m'
            />
            {/* desktop */}
            <img
              src={BG_PATTERN_R_XL}
              alt='pattern'
              className='pattern right-pattern-d'
            />
            <img
              src={BG_PATTERN_L_XL}
              alt='pattern'
              className='pattern left-pattern-d'
            />
          </div>
        </header>
        {/* gradient component */}
        {/* display gradient palletes */}
        <section className='gradients-section'>
          <div className='boxes wrapper'>
            {mergedColors.map((colors, index) => {
              const firstSets = colors[0];
              const hexColors1 = colors[0].hex;
              const secondSets = colors[1];
              const hexColors2 = colors[1].hex;
              // fist object properties
              const { rgb, alpha, weight } = firstSets;
              const bgVal1 = rgb.join(',');
              // second object properties
              const rgb2 = secondSets.rgb;
              const alpha2 = secondSets.alpha;
              const weight2 = secondSets.weight;
              const bgVal2 = rgb2.join(',');
              return (
                <Gradient
                  key={index}
                  gradientClr1={bgVal1}
                  gradientClr2={bgVal2}
                  index={index}
                  hexColors1={hexColors1}
                  hexColors2={hexColors2}
                  direction={direction}
                />
              );
            })}
          </div>
        </section>
        {/* back to top */}
        {size === '900' || size > '900' ? (
          <div className='to-top'>
            <div
              className={
                scrollValue > 1200 ? 'arrow-up show-arrow' : 'arrow-up'
              }
              style={{ background: `${color1}` }}
            >
              <span>
                <a href='#header'>
                  <i className='fas fa-arrow-up'></i>
                </a>
              </span>
            </div>
          </div>
        ) : (
          <div className='to-top'>
            <div
              className={
                scrollValue > 1800 ? 'arrow-up show-arrow' : 'arrow-up'
              }
              style={{ background: `${color1}` }}
            >
              <span>
                <a href='#header'>
                  <i className='fas fa-arrow-up'></i>
                </a>
              </span>
            </div>
          </div>
        )}
      </main>
      {/* footer component */}
      <Footer bgColor1={color1} bgColor2={color2} />
    </>
  );
};

export default App;
