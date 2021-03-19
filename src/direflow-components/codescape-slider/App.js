import React from 'react'
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from 'direflow-component'
import theme from '../../style/index.scss'
import { AxiosProvider, Get } from 'react-axios'
import { axiosInstance, CODESCAPE_API } from './config/auth'
import AuthError from './components/AuthError'
import Slide from './components/Slide'
// import { roles as mock } from './data/response.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFlip } from 'swiper';

SwiperCore.use([EffectFlip]);

const App = () => {
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
                    <Swiper
                      effect="flip"
                      spaceBetween={50}
                      slidesPerView={1}
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      {roles.map((el) => {
                        return (
                          <SwiperSlide key={el._id}>
                            <div className="slide-container">
                              <Slide role={el} />
                            </div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
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
