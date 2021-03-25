import React from "react";
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from "direflow-component";
import theme from "../../style/index.scss";
import { AxiosProvider, Get } from "react-axios";
import { axiosInstance, CODESCAPE_API } from "./config/auth";
import AuthError from "./components/AuthError";
import Slide from "./components/Slide";
// import { roles as mock } from './data/response.js'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFlip, Navigation, Pagination } from "swiper";
import Loader from "./components/Loader";

SwiperCore.use([EffectFlip, Navigation, Pagination]);

const App = () => {
  
  return (
    <Styled styles={theme}>
      <div id="codescape-container">
        <div className="role-container">
          <AxiosProvider instance={axiosInstance}>
            <Get url={CODESCAPE_API}>
              {(error, response, isLoading /* , makeRequest, axios */) => {
                if (error) {
                  return <AuthError />;
                } else if (isLoading) {
                  return (
                    <div>
                      <Loader />
                    </div>
                  );
                } else if (response !== null) {                  

                  const { roles } = response.data.data;

                  return (
                    <Swiper
                      navigation
                      pagination={{ clickable: true }}
                      effect="flip"
                      spaceBetween={50}
                      slidesPerView={1}
                      onSlideChange={() => {}}
                      onSwiper={(/* swiper */) => {}}
                    >
                      {roles.map((el) => {
                        return (
                          <SwiperSlide key={el._id}>
                            <div className="slide-container">
                              <Slide role={el} />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  );
                }
                return <div>Default message before request is made.</div>;
              }}
            </Get>
          </AxiosProvider>
        </div>
      </div>
    </Styled>
  );
};

export default App;
