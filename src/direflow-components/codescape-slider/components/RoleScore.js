import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { checkNan } from '../utils/helpers'
import useInterval from '../hooks/useInterval'


const RoleScore = ({ title, score }) => {
  const [counter, setCounter] = useState(0);
  const formatScore = checkNan(score)

  useInterval(() => {    
    if(counter === formatScore) {
      return
    }
    setCounter(counter + 1);
  }, 100);
  
    
  return (
    <div className="role-score">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="total">
        <div className="totalCounter">{counter}%</div>
        <div className='is-size-5'>Total Score</div>
      </div>
    </div>
  )
}

export default RoleScore

RoleScore.propTypes = { title: PropTypes.string, score: PropTypes.number }