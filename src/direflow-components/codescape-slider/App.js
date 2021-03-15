import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from 'direflow-component'
import theme from '../../style/index.scss'
import Carousel from 'react-simply-carousel'
import { AxiosProvider, Get } from 'react-axios'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const TOKEN =
  'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJpYXQiOiAxNjE1ODA1NDg2LjAsICJ1c2VyX2dyb3VwcyI6IHsiMyI6ICJsZWFybmVyIiwgIjYiOiAiYXNzZXNzZWUifSwgInVzZXIiOiB7ImZpcnN0X25hbWUiOiAiMSIsICJsYXN0X25hbWUiOiAiMSIsICJyZWdpc3RyYXRpb25faWQiOiAiIiwgImVtYWlsIjogImIxQHlvcG1haWwuY29tIiwgInJlc2V0X3Bhc3N3b3JkX2tleSI6ICIiLCAicmVnaXN0cmF0aW9uX2tleSI6ICIiLCAiaWQiOiAzNH0sICJleHAiOiAxNjE1ODkxODg2LjAsICJobWFjX2tleSI6ICI0MjA1OGNkNi0xNmVmLTQwZTYtYTA3YS05M2Q2YTg1MzBjMmIifQ.vxIEnmdxzY6poZajfEU3ADtOu4Hophk8y5-cqpabR10'
const CODESCAPE_API =
  'https://dev.codeuntapped.com/jmc/flask-server/api/v1/virtualcoach/user-roles'

const SLIDER_CONFIG = {
  containerProps: {
    style: {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  forwardBtnProps: {
    children: '>',
    style: {
      width: 60,
      height: 60,
      minWidth: 60,
      alignSelf: 'center',
    },
    className: 'button is-info',
  },
  backwardBtnProps: {
    children: '<',
    style: {
      width: 60,
      height: 60,
      minWidth: 60,
      alignSelf: 'center',
    },
    className: 'button is-info',
  },
}

const axiosInstance = axios.create({
  // baseURL: '/api/',
  timeout: 2000,
  headers: { Authorization: `Bearer ${TOKEN}` },
})

const AuthError = () => {
  return (
    <div>
      <h2>Your scores are not available</h2>
      <p>If you want to get your result please follow the link below</p>
      <form
        action="https://dev.codeuntapped.com/jmc/flask-server/login/sso"
        method="get"
      >
        <input
          type="submit"
          value="Connect to Codescape"
          name="Submit"
          id="submit-button"
        />
      </form>
      `
    </div>
  )
}

const RoleScore = ({ title }) => {
  return (
    <div className="role-score">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="total">
        <div className="totalCounter">100%</div>
        <div>out of 100</div>
      </div>
    </div>
  )
}

const CategoryContainer = ({ category }) => {
  return (
    <div className="category-container">
      <div className="category-title">{category.assessment_plan.title}</div>
      <div className="category-score">
        <div className="ring">{category.assessment_plan.result}</div>
      </div>
    </div>
  )
}

const Slide = ({ role }) => {
  return (
    <div style={{ width: 640, height: 480 }}>
      <RoleScore title={role.title} />
      <div className="category-list">
        {role.categories.map((category, index) => (
          <CategoryContainer key={uuidv4()} category={category} />
        ))}
      </div>
    </div>
  )
}

const App = (props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const setActiveSlideIndexAction = (newActiveSlideIndex) => {
    setActiveSlideIndex(newActiveSlideIndex)
  }

  return (
    <Styled styles={theme}>
      <div id="codescape-container">
        <div className="role-container">
          <AxiosProvider instance={axiosInstance}>
            <Get url={CODESCAPE_API}>
              {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                  return <AuthError />
                } else if (isLoading) {
                  return <div>Loading...</div>
                } else if (response !== null) {
                  // console.log('data', response.data.data)

                  const { roles } = response.data.data
                  return (
                    <Carousel
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
                    >
                      {roles.map((role) => {
                        return <Slide key={role._id} role={role} />
                      })}
                    </Carousel>
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

RoleScore.propTypes = { title: PropTypes.string }

Slide.propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.any,
  }),
}

export default App

/* <div>
{response.data.status.code}
{'success'}
<button
  onClick={() => makeRequest({ params: { refresh: true } })}
>
  Refresh
</button>
</div> */

/* <div style={{ width: 640, height: 480 }}>
                    <img src="https://picsum.photos/640/480?random=8" alt="" />
                  </div>
                  <div style={{ width: 640, height: 480 }}>
                    <img src="https://picsum.photos/640/480?random=9" alt="" />
                  </div>
                  <div style={{ width: 640, height: 480 }}>
                    <img src="https://picsum.photos/640/480?random=10" alt="" />
                  </div> */

/* <div>
                    Something bad happened: {error.message}{' '}
                    <button
                      onClick={() => makeRequest({ params: { reload: true } })}
                    >
                      Retry
                    </button>
                  </div> */
