import React, { useState } from "react";
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ProgressProvider from "./ProgressProvider";
import { checkNan } from "../utils/helpers";
import useInterval from "../hooks/useInterval";

const CategoryContainer = ({ category }) => {
  const [counter, setCounter] = useState(0);
  const { title, result } = category.assessment_plan;
  const roundResult = Math.round(result);
  const formatResult = checkNan(roundResult);

  useInterval(() => {    
    if(counter === formatResult) {
      return
    }
    setCounter(counter + 1);
  }, 80);
  

  return (
    <div className="category-container">
      <div className="category-title">{title}</div>
      <div className="category-score">
        <div className="ring">
          <ProgressProvider valueStart={0} valueEnd={formatResult}>
            {() => (
              <CircularProgressbar
                viewBox="0 0 170 170"
                value={counter}
                text={`${counter}%`}
                styles={buildStyles({ pathTransitionDuration: 1.5 })}
              />
            )}
          </ProgressProvider>
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;

CategoryContainer.propTypes = {
  category: PropTypes.object,
};
