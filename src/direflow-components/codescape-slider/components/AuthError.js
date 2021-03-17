import React from 'react'

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

export default AuthError
