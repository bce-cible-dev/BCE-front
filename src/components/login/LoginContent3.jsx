import React, { useContext, useState, useEffect } from 'react'
import Footer from '../footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { DigiContext } from '../../context/DigiContext'
import ErrorMessage from '../error/ErrorMessage'
import { useAppContext } from '../../context/appContext'

const initialState = {
  username: '',
  password: '',
}

const LoginContent3 = () => {
  const navigate = useNavigate()
  const { passwordVisible, togglePasswordVisibility, isLightTheme } =
    useContext(DigiContext)
  const [values, setValues] = useState(initialState)
  const { alertType, alertText, showAlert, setupUser, user, displayAlert } =
    useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { username, password } = values
    if (!username || !password) {
      displayAlert()
      return
    }
    const currentUser = { username, password }

    // if (isMember) {
    setupUser({
      currentUser,
      endPoint: 'login',
      alertText: 'Login Successful! Redirecting...',
    })
    // }  else {
    //  setupUser({
    //    currentUser,
    //    endPoint: 'register',
    //    alertText: 'User Created! Redirecting...',
    //  })
    //}
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/application')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <div className='main-content login-panel login-panel-3'>
      <div className='container'>
        <div className='d-flex justify-content-end'>
          <div className='login-body'>
            <div className='top d-flex justify-content-between align-items-center'>
              <div className='logo'>
                <img
                  src={`${
                    isLightTheme
                      ? 'assets/images/logo-black.png'
                      : 'assets/images/logo-big.png'
                  }`}
                  alt='Logo'
                />
              </div>
              <Link to='/'>
                <i className='fa-duotone fa-house-chimney'></i>
              </Link>
            </div>
            <div className='bottom'>
              <h3 className='panel-title'>Login</h3>
              {showAlert && (
                <ErrorMessage varient={alertType} message={alertText} />
              )}
              <form onSubmit={onSubmit}>
                <div className='input-group mb-25'>
                  <span className='input-group-text'>
                    <i className='fa-regular fa-user'></i>
                  </span>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Username or email address'
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-20'>
                  <span className='input-group-text'>
                    <i className='fa-regular fa-lock'></i>
                  </span>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className='form-control rounded-end'
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Link
                    role='button'
                    className='password-show'
                    onClick={togglePasswordVisibility}
                  >
                    <i className='fa-duotone fa-eye'></i>
                  </Link>
                </div>
                {/* <div className='d-flex justify-content-between mb-25'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='loginCheckbox'
                    />
                    <label
                      className='form-check-label text-white'
                      for='loginCheckbox'
                    >
                      Remember Me
                    </label>
                  </div>
                  <Link to='/resetPassword' className='text-white fs-14'>
                    Forgot Password?
                  </Link>
                </div> */}
                <button className='btn btn-primary w-100 login-btn'>
                  Sign in
                </button>
              </form>
              {/* <div className="other-option">
                        <p>Or continue with</p>
                        <div className="social-box d-flex justify-content-center gap-20">
                            <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link to="#"><i className="fa-brands fa-twitter"></i></Link>
                            <Link to="#"><i className="fa-brands fa-google"></i></Link>
                            <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                        </div>
                    </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LoginContent3
