import React, { useState } from 'react'
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from 'direflow-component'
import theme from '../../style/index.scss'
import Carousel from 'react-simply-carousel'
import { AxiosProvider, Get } from 'react-axios'
import { SLIDER_CONFIG } from './config/slider'
import { axiosInstance, CODESCAPE_API } from './config/auth'
import AuthError from './components/AuthError'
import Slide from './components/Slide'
import AwesomeSlider from 'react-awesome-slider'
import {roles as mock} from './data/response.js'

const App = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const setActiveSlideIndexAction = (newActiveSlideIndex) => {
    setActiveSlideIndex(newActiveSlideIndex)
  }
// console.log('>>>>', mock);

  return (
    <Styled styles={theme}>
      <div id="codescape-container">
        <div className="role-container">
          <AxiosProvider instance={axiosInstance}>
            <Get url={CODESCAPE_API}>
              {(error, response, isLoading /* , makeRequest, axios */) => {
                if (error) {
                  return <AuthError />
                } else if (isLoading) {
                  return <div>Loading...</div>
                } else if (response !== null) {
                  // console.log('data', response.data.data.roles)

                  const { roles } = response.data.data

                  return (
                    <Carousel
                      className="carousel"
                      activeSlideIndex={activeSlideIndex}
                      onRequestChange={setActiveSlideIndexAction}
                      itemsToShow={1}
                      itemsToScroll={1}
                      speed={400}
                      easing="ease-in-out"
                      updateOnItemClick
                      containerProps={SLIDER_CONFIG.containerProps}
                      forwardBtnProps={SLIDER_CONFIG.forwardBtnProps}
                      backwardBtnProps={SLIDER_CONFIG.backwardBtnProps}
                      // responsiveProps={SLIDER_CONFIG.responsive}
                    >
                      {roles.map((role) => {
                        return <Slide key={role._id} role={role} />
                      })}
                    </Carousel>
                    // <AwesomeSlider>
                    //   {roles.map((role) => {
                    //     return <Slide key={role._id} role={role} />
                    //   })}  
                    //   <div>100</div>                   
                    // </AwesomeSlider>
                  )
                }
                return <div>Default message before request is made.</div>
              }}
            </Get>
          </AxiosProvider>
        </div>
      </div>
    </Styled>
  )
}

export default App
