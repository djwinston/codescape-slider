import React from 'react'

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart)
  React.useEffect(() => {
    setValue(valueEnd)
    // setTimeout(() => {
    // }, 500)
  }, [valueEnd])

  return children(value)
}

export default ProgressProvider