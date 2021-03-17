import React from 'react'
import PropTypes from 'prop-types'

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

export default RoleScore

RoleScore.propTypes = { title: PropTypes.string, score: PropTypes.number }