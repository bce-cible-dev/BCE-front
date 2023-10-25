import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { DigiContext } from '../../context/DigiContext';
import { useAppContext } from '../../context/appContext'
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
  const {logoutUser } = useAppContext()
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
       Manager
      </Link>
      <ul className={`sidebar-link-group ${layoutPosition.horizontal ? (dropdownOpen.pages ? 'd-block' : '') : (isMainDropdownOpen ? 'd-none' : '')}`}>       
    
     {/* <li className="sidebar-dropdown-item">
          <NavLink to="/application" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-light fa-user-cog"></i>
            </span>{' '}
            <span className="sidebar-txt"> Administrateurs</span>
          </NavLink>
        </li> */}
        {/* <li className="sidebar-dropdown-item">
          <NavLink to="/application" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-compass-drafting"></i>
            </span>{' '}
            <span className="sidebar-txt"> Update Password</span>
          </NavLink>
        </li> */}
        <li className="sidebar-dropdown-item">
          <NavLink onClick={logoutUser} className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-arrow-right-from-bracket"></i>
            </span>{' '}
            <span className="sidebar-txt"> logout</span>
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default PagesPart;
