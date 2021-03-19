import React from 'react'

const AuthError = () => {
  return (
    <section className="hero is-small is-warning">
      <div className="hero-body">
        <p className="title">Your scores are not available</p>
        <p className="subtitle is-size-6">
          If you want to get your result please follow the link below
        </p>
        <form
          action="https://dev.codeuntapped.com/jmc/flask-server/login/sso"
          method="get"
        >
          <input
            type="submit"
            value="Connect to Codescape"
            name="Submit"
            id="submit-button"
            className="button is- is-rounded"
          />
        </form>
      </div>
    </section>
  )
}

export default AuthError
