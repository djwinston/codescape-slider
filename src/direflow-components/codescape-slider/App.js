import React from 'react'
import PropTypes from 'prop-types'
import { /* EventContext, */ Styled, useExternalSource } from 'direflow-component'
import theme from '../../style/index.scss'
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js'

const App = (props) => {

  const hasLoaded = useExternalSource('https://code.jquery.com/jquery-3.3.1.slim.min.js');
  if (!hasLoaded) {
    return null;
  } else {console.log(hasLoaded);
  }
  // const dispatch = useContext(EventContext);

  // const handleClick = () => {
  //   const event = new Event('my-event');
  //   dispatch(event);
  // };

  // const renderSampleList = props.sampleList.map((sample) => (
  //   <div key={sample} className='sample-text'>
  //     → {sample}
  //   </div>
  // ));
  // Initialize all elements with carousel class.

  // Initialize all div with carousel class
  const options = {
    slidesToScroll: 1,
    slidesToShow: 4,
  }
  const doc = document.querySelector('.carousel')
  var carousels = bulmaCarousel.attach('.carousel', options)
  console.log(carousels, doc)

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', (state) => {
      console.log(state)
    })
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('.carousel')
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state)
    })
  }
  return (
    <Styled styles={theme}>
      <div className="app">
        <div>{props.componentTitle}</div>
        <button className="button is-primary">Button</button>
        <section className="section slider">
          <div className="container">
            <div id="carousel-demo" className="carousel">
              <div className="item-1">xxx</div>
              <div className="item-2">xxx</div>
              <div className="item-3">xxx</div>
            </div>
          </div>
        </section>
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
