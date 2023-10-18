import React, { useContext } from 'react';
import { NavLink , Link} from 'react-router-dom';
import { DigiContext } from '../../context/DigiContext';

const DashboardPart = () => {
  const { dashState,toggleMainDashDropdown,dropdownOpen,layoutPosition,mainDashboardRef } = useContext(DigiContext);
  const { 
    isMainDropdownOpen, 
  } = dashState;
  return (
    <li className='sidebar-item open' ref={layoutPosition.horizontal? mainDashboardRef : null}>
      <Link
        role="button"
        className={`sidebar-link-group-title has-sub ${isMainDropdownOpen ? 'show' : ''}`}
        onClick={toggleMainDashDropdown}
      >
        Dashboard
      </Link>
      <ul className={`sidebar-link-group ${layoutPosition.horizontal ? (dropdownOpen.dashboard ? 'd-block' : '') : (isMainDropdownOpen ? 'd-none' : '')}`}>       
       <li className="sidebar-dropdown-item">
          <NavLink to="/application" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-memo-pad"></i>
            </span>{' '}
            <span className="sidebar-txt">Formations</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink
            to="/AttestationsList"
            className="sidebar-link"
          >
            <span className="nav-icon">
            <i className="fa-duotone fa-download"></i>
            </span>{' '}
            <span className="sidebar-txt">Attestaions</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink
            to="/allModules"
            className="sidebar-link"
          >
            <span className="nav-icon">
              <i className="fa-light fa-layer-group"></i>
            </span>{' '}
            <span className="sidebar-txt">Modules</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink
            to="/allAttestationPdfFile"
            className="sidebar-link"
          >
            <span className="nav-icon">
              <i className="fa-light fa-folder-open"></i>
            </span>{' '}
            <span className="sidebar-txt">PDF Attestations</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink
            to="/application"
            className="sidebar-link"
          >
            <span className="nav-icon">
              <i className="fa-light fa-users"></i>
            </span>{' '}
            <span className="sidebar-txt">Users</span>
          </NavLink>
        </li>


      </ul>
    </li>
  );
};

export default DashboardPart;
