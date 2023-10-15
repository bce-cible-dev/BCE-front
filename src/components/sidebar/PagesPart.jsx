import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { DigiContext } from '../../context/DigiContext';

const PagesPart = () => {
  const {
    pagesState,
    toggleMainPagesDropdown,
    toggleSubPagesDropdown,
    toggleAuthentication,
    toggleError,
    toggleUser,
    layoutPosition,
    dropdownOpen,
    mainPagesRef,
    isExpanded,
    isNavExpanded,
    isSmallScreen,
  } = useContext(DigiContext);
  const { 
    isMainDropdownOpen, 
    isSubDropdownOpen, 
    authentication, 
    error,
  } = pagesState;
  const handleSubNavLinkClick = () => {
    if (!isSubDropdownOpen) {
      toggleSubPagesDropdown(); // Open the sub-dropdown
    }
  };
  return (
    <li className="sidebar-item" ref={isExpanded || isNavExpanded.isSmall || layoutPosition.horizontal || (layoutPosition.twoColumn && isExpanded) || (layoutPosition.twoColumn && isSmallScreen) ? mainPagesRef : null}>
      <Link
        role="button"
        className={`sidebar-link-group-title has-sub ${isMainDropdownOpen ? 'show' : ''}`}
        onClick={toggleMainPagesDropdown}
      >
        Administaration
      </Link>
      <ul className={`sidebar-link-group ${layoutPosition.horizontal ? (dropdownOpen.pages ? 'd-block' : '') : (isMainDropdownOpen ? 'd-none' : '')}`}>       
        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${authentication ? 'show' : ''}`}
            onClick={toggleAuthentication}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt">Authentication</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${authentication ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/login" className="sidebar-link">
                Login
              </NavLink>
            </li>
          
            <li className="sidebar-dropdown-item">
              <NavLink to="/resetPassword" className="sidebar-link">
                Reset Password
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/updatePassword" className="sidebar-link">
                Update Password
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/loginStatus" className="sidebar-link">
                Login Status
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${error ? 'show' : ''}`}
            onClick={toggleError}
          >
            <span className="nav-icon">
              <i className="fa-light fa-triangle-exclamation"></i>
            </span>{' '}
            <span className="sidebar-txt">Error</span>
          </Link>
          <ul className={`sidebar-dropdown-menu ${error ? 'd-block' : ''}`}>
            <li className="sidebar-dropdown-item">
              <NavLink to="/error400" className="sidebar-link">
                Error 400
              </NavLink>
            </li>
         
          </ul>
        </li>
   
        <li className="sidebar-dropdown-item">
          <NavLink to="/profile" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-light fa-user"></i>
            </span>{' '}
            <span className="sidebar-txt"> Profile</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink to="/editProfile" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-light fa-user"></i>
            </span>{' '}
            <span className="sidebar-txt">  Edit Profile</span>
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default PagesPart;
