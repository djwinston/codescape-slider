import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  /* EventContext, */ Styled /* , useExternalSource */,
} from 'direflow-component'
import theme from '../../style/index.scss'
import Carousel from 'react-simply-carousel'
import { AxiosProvider, Get } from 'react-axios'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Cookies from 'js-cookie'

const COOKIE_TOKEN = Cookies.get('Codescape_Token')

const TOKEN =
  'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJvcmlnX2lhdCI6IDE2MTU5MDA2ODkuMCwgInVzZXJfZ3JvdXBzIjogeyIzIjogImxlYXJuZXIiLCAiNiI6ICJhc3Nlc3NlZSJ9LCAiaG1hY19rZXkiOiAiOWIxNWUyNTUtY2JjOC00N2M1LWFjOTYtNmE0Njg3ODg4NDMxIiwgInVzZXIiOiB7ImZpcnN0X25hbWUiOiAiMSIsICJsYXN0X25hbWUiOiAiMSIsICJyZWdpc3RyYXRpb25faWQiOiAiIiwgImVtYWlsIjogImIxQHlvcG1haWwuY29tIiwgInJlc2V0X3Bhc3N3b3JkX2tleSI6ICIiLCAicmVnaXN0cmF0aW9uX2tleSI6ICIiLCAiaWQiOiAzNH0sICJleHAiOiAxNjE1OTAxODgxLjAsICJpYXQiOiAxNjE1OTAxNTgxLjB9.sg0_HWtpRYicCrRSPjcaoWlk5xPX5LrsPjzrRawVkyA'
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
  responsive: [{minWidth: 768, maxWidth: 992, itemsToShow: 3}, {maxWidth: 767, itemsToShow: 1}]
}

const axiosInstance = axios.create({
  // baseURL: '/api/',
  timeout: 2000,
  headers: { Authorization: `Bearer ${TOKEN /* || COOKIE_TOKEN */}` },
})

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart)
  React.useEffect(() => {
    setValue(valueEnd)
    // setTimeout(() => {
    // }, 500)
  }, [valueEnd])

  return children(value)
}

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

const RoleScore = ({ title, score }) => {
  return (
    <div className="role-score">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="total">
        <div className="totalCounter">{score}%</div>
        <div>out of 100</div>
      </div>
    </div>
  )
}

const CategoryContainer = ({ category }) => {
  const { title, result } = category.assessment_plan
  const formatResult = Math.round(result)
  return (
    <div className="category-container">
      <div className="category-title">{title}</div>
      <div className="category-score">
        <div className="ring">
          <ProgressProvider valueStart={0} valueEnd={formatResult}>
            {(value) => (
              <CircularProgressbar
                viewBox="0 0 170 170"
                value={value}
                text={`${formatResult}%`}
                styles={buildStyles({ pathTransitionDuration: 1.5 })}
              />
            )}
          </ProgressProvider>
        </div>
      </div>
    </div>
  )
}

const Slide = ({ role }) => {
  let totalScore = 0
  role.categories.forEach((cat) => {
    const { result } = cat.assessment_plan
    totalScore += result
  })

  return (
    <div className="slide" style={{ width: 'max(50%, 1100px)', height: 'auto' }}>
      <RoleScore title={role.title} score={Math.round(totalScore)} />
      <div className="category-list">
        {role.categories.map((category) => (
          <CategoryContainer key={uuidv4()} category={category} />
        ))}
      </div>
    </div>
  )
}

const App = (/* props */) => {
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

RoleScore.propTypes = { title: PropTypes.string, score: PropTypes.number }

Slide.propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.object,
  }),
}

CategoryContainer.propTypes = {
  category: PropTypes.object,
}

export default App

// App.defaultProps = {
//   componentTitle: 'Codescape Slider',
//   sampleList: [
//     'Create with React',
//     'Build as Web Component',
//     'Use it anywhere!',
//   ],
// }

// App.propTypes = {
//   componentTitle: PropTypes.string,
//   sampleList: PropTypes.array,
// }
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
