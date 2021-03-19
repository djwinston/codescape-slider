import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import ProgressProvider from './ProgressProvider'
import { checkNan } from '../utils/helpers'

const CategoryContainer = ({ category }) => {
  const { title, result } = category.assessment_plan
  const roundResult = Math.round(result)
  const formatResult =  checkNan(roundResult)
  
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

export default CategoryContainer

CategoryContainer.propTypes = {
  category: PropTypes.object,
}
