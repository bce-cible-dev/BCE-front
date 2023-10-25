import { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { DigiContext } from '../../context/DigiContext'
import { useAppContext } from '../../context/appContext'

const HeaderProfile = () => {
  const {
    isProfileSidebarOpen,
    handleProfileDropdownCheckboxChange,
    handleProfileSidebarCheckboxChange,
  } = useContext(DigiContext)
  const profileDropdownRef = useRef(null)

  const { user, logoutUser } = useAppContext()

  // Effect to add event listener when the component mounts
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        handleProfileDropdownCheckboxChange()
      }
    }

    if (isProfileSidebarOpen.dropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileSidebarOpen.dropdown, handleProfileDropdownCheckboxChange])
  return (
    <div className='header-btn-box' ref={profileDropdownRef}>
      <div className='profile-btn-wrapper'>
        <button
          className={`profile-btn ${
            isProfileSidebarOpen.dropdown ? 'show' : ''
          }`}
          id='profileDropdown'
          onClick={
            isProfileSidebarOpen.sidebar
              ? handleProfileSidebarCheckboxChange
              : handleProfileDropdownCheckboxChange
          }
        >
          <img src='assets/images/admin.png' alt='image' />
        </button>
        {isProfileSidebarOpen.dropdown ? (
          <ul
            className={`dropdown-menu ${
              isProfileSidebarOpen.dropdown ? 'show' : ''
            }`}
            aria-labelledby='profileDropdown'
          >
            <li>
              <div className='dropdown-txt text-center'>
                <p className='mb-0'>{user.username}</p>
                <span className='d-block'>{user.email}</span>
                <div className='d-flex justify-content-center'>
                  {/* ... your other code ... */}
                </div>
              </div>
            </li>
            {/* ... your other list items ... */}
            <li>
              <Link className='dropdown-item' onClick={logoutUser}>
                <span className='dropdown-icon'>
                  <i className='fa-regular fa-arrow-right-from-bracket'></i>
                </span>{' '}
                Logout
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default HeaderProfile
