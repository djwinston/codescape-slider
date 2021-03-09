import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from '../../style/index.scss';
import Slider from "react-slick";

const SimpleSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

const App = (props) => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  };

  const renderSampleList = props.sampleList.map((sample) => (
    <div key={sample} className='sample-text'>
      → {sample}
    </div>
  ));

  return (<>
    <Styled styles={styles}>
    {/* <SimpleSlider/> */}
      <div className='app'>
        <div className='top'>
          <div className='header-image' />
        </div>
        <div className='bottom'>
          <div className='header-title'>{props.componentTitle}</div>
          <div>{renderSampleList}</div>
          <button className='button is-primary is-light' onClick={handleClick}>
            Click me!
          </button>
        </div>
      </div>
    </Styled>
    </>
  );
};

App.defaultProps = {
  componentTitle: 'Codescape Slider',
  sampleList: [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
  ],
}

App.propTypes = {
  componentTitle: PropTypes.string,
  sampleList: PropTypes.array,
};

export default App;
