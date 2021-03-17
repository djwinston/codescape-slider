import React/* , { useState } */ from 'react'
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from 'direflow-component'
import theme from '../../style/index.scss'
// import Carousel from 'react-simply-carousel'
import { AxiosProvider, Get } from 'react-axios'
// import { SLIDER_CONFIG } from './config/slider'
import { axiosInstance, CODESCAPE_API } from './config/auth'
import AuthError from './components/AuthError'
import Slide from './components/Slide'
import AwesomeSlider from 'react-awesome-slider'
import { roles as mock } from './data/response.js'

const App = () => {
  // const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // const setActiveSlideIndexAction = (newActiveSlideIndex) => {
  //   setActiveSlideIndex(newActiveSlideIndex)
  // }
  // console.log('>>>>', mock);

  return (
    <Styled styles={theme}>
      <div id="codescape-container">
        <div className="role-container">
          <AwesomeSlider bullets={false}>
            {mock.map(el =>{ 
              return <div className="slide-container" key={el._id}><Slide role={el}/></div>
            })}                        
          </AwesomeSlider>
        </div>
      </div>
    </Styled>
  )
}

export default App
