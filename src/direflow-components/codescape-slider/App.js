import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from 'direflow-component'
import theme from '../../style/index.scss'
import Carousel from 'react-simply-carousel'
// import { Get } from 'react-axios';

const App = (props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const setActiveSlideIndexAction = (newActiveSlideIndex) => {
    setActiveSlideIndex(newActiveSlideIndex)
  }

  const Slide = (src) => {
    return (
      <div style={{ width: 640, height: 480 }}>
        <img src="https://picsum.photos/640/480?random=3" alt="" />
      </div>
    )
  }

  const Comp = () => {
    return <div>React Developer</div>
  }

  return (
    <Styled styles={theme}>
      <div className="app">
        <div>{props.componentTitle}</div>
        <button className="button is-primary">Button</button>
        <Carousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndexAction}
          itemsToShow={1}
          itemsToScroll={1}
          speed={400}
          easing="ease-in-out"
          updateOnItemClick
          containerProps={{
            style: {
              width: '100%',
              justifyContent: 'space-between',
            },
          }}
          forwardBtnProps={{
            children: '>',
            style: {
              width: 60,
              height: 60,
              minWidth: 60,
              alignSelf: 'center'              
            },
            className: 'button is-info'
          }}
          backwardBtnProps={{
            children: '<',
            style: {
              width: 60,
              height: 60,
              minWidth: 60,
              alignSelf: 'center',
            },
            className: 'button is-info'
          }}
        >
          <div style={{ width: 640, height: 480 }}>
            <Comp />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=2" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=3" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=4" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=5" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=6" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=7" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=8" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=9" alt="" />
          </div>
          <div style={{ width: 640, height: 480 }}>
            <img src="https://picsum.photos/640/480?random=10" alt="" />
          </div>
        </Carousel>
      </div>
    </Styled>
  )
}

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
}

export default App
