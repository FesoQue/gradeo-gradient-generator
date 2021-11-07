import { useState, useEffect } from 'react';
import Values from 'values.js';

const App = () => {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [clrList1, setClrList1] = useState(new Values('#8a2be2').all(20));
  const [clrList2, setClrList2] = useState(new Values('#dc143c').all(20));

  const [mergedColors, setMergedColors] = useState([]);

  // color field 1
  const handleColor1 = (e) => {
    const colorValue = e.target.value;
    setColor1(colorValue);
  };
  // color field 2
  const handleColor2 = (e) => {
    const colorValue = e.target.value;
    setColor2(colorValue);
  };
  // on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (color1 && color2) {
        let gradColor1 = new Values(`#${color1}`).all(20);
        let gradColor2 = new Values(`#${color2}`).all(20);
        setClrList1(gradColor1);
        setClrList2(gradColor2);
      }
    } catch (error) {
      console.log(error);
    }
    setColor1('');
    setColor2('');
  };

  const handleColors = () => {
    let colors = [];
    for (let i = 0; i < clrList1.length; i++) {
      colors[i] = clrList1[i] + ' ' + clrList2[i];
      setMergedColors(colors);
    }
  };

  useEffect(() => {
    handleColors();
  }, []);
  // check console for data values
  console.log(clrList1); // first color data
  console.log(clrList2); // second color data

  mergedColors.forEach((clrs) => {
    // console.log(clrs);
  });
  return (
    <div className='wrapper' onSubmit={handleSubmit}>
      <form>
        <div className='form-group'>
          <div className='form-control'>
            <input
              type='text'
              name='gradient-color1'
              className='grad-clr1'
              value={color1}
              onChange={handleColor1}
              placeholder='e.g: #8a2be2'
            />
          </div>
          <div className='form-control'>
            <input
              type='text'
              name='gradient-color2'
              className='grad-clr2'
              value={color2}
              onChange={handleColor2}
              placeholder='e.g: #dc143c'
            />
          </div>
          <button type='submit'>generate</button>
        </div>
      </form>
      <div>
        {/* display gradient palletes */}
        <section className='colors'></section>
      </div>
    </div>
  );
};

export default App;
