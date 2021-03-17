import React from 'react'
import PropTypes from 'prop-types'
import RoleScore from './RoleScore'
import CategoryContainer from './CategoryContainer'
import { v4 as uuidv4 } from 'uuid'


const Slide = ({ role }) => {
  let totalScore = 0
  role.categories.forEach((cat) => {
    const { result } = cat.assessment_plan
    totalScore += result
  })

  return (
    <div
      className="slide"
      // style={{ width: 'max(50%, 1100px)', height: 'auto' }}
    >
      <RoleScore title={role.title} score={Math.round(totalScore)} />
      <div className="category-list">
        {role.categories.map((category) => (
          <CategoryContainer key={uuidv4()} category={category} />
        ))}
      </div>
    </div>
  )
}

export default Slide

Slide.propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.array,
  }),
}