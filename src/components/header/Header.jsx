import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DigiContext } from '../../context/DigiContext'

import HeaderProfile from './HeaderProfile'
import { useAppContext } from '../../context/appContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Header = () => {
    const {authFetch} = useAppContext();
    const MySwal = withReactContent(Swal)
  const handleButtonClick = (alertType) => {
    switch (alertType) {
      case 'saError':
        MySwal.fire({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonClass: "btn btn-sm btn-primary",
          buttonsStyling: !1,
          
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
              closeButton: 'btn btn-sm btn-icon btn-danger',
          },
      })
        break;
        case 'saPosition':
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Supprimé avec succès",
            showConfirmButton: !1,
            timer: 8000,
            showCloseButton: !0,
            closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
            customClass: {
                closeButton: 'btn btn-sm btn-icon btn-danger',
            },
            
        })
       
          break;
        case 'saWarning':
          MySwal.fire({
            title: "Es-tu sûr?",
            text: "Vous ne pourrez pas revenir en arrière !!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-sm btn-danger",
            cancelButtonClass: "btn btn-sm btn-info",
            confirmButtonText: "Oui, supprimez-Tous !",
            buttonsStyling: false,
            showCloseButton: true,
            closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
            customClass: {
              closeButton: 'btn btn-sm btn-icon btn-danger',
            },
          }).then(async function(t) { // Notice the async keyword here
            if (t.value) {
              await clearAll(); // Wait for the clearAll function to complete
           
              
            }
          })
          break;
     }
      }
  const clearAll = async () => {
    try {
      const response = await authFetch.post(`/api/clear/allentities`);
      
      if (response.status === 200) {
          const data = response.data;
          handleButtonClick('saPosition');
          window.location.reload( );
          console.log(data); // Handle the received data or other logic.
      }
  } catch (error) {
    handleButtonClick('saPosition');
    window.location.reload( );
      console.error("Erreur lors de l'appel à l'API:", error.response ? error.response.data : error.message);
  }
  };
    const {
        isExpanded, 
        toggleNav, 
        isFullscreen, 
        handleFullscreen, 
        isLightTheme, 
        handleLightThemeToggle,
        handleSettingsToggle,
        isNavExpanded,
        toggleSidebar,
        isSmallScreen,
        ref,
        mobileHeaderBtn,
        handleMobileHeaderBtn,
    } = useContext(DigiContext)
  return (
    <div
        className={`header ${
            isNavExpanded.isSmall && !isExpanded ? 'expanded' : isExpanded && isNavExpanded.reset ? 'expanded' : ''
        } ${
            isNavExpanded.reset && isExpanded ? 'reset' : ''
        } ${
            mobileHeaderBtn ? 'expanded-in-mobile':''
        } ${
            isNavExpanded.hoverOpen && isNavExpanded.hover ? 'expanded':''
        }
        `}
    >
        <div className="row g-0 align-items-center">
            <div className="col-xxl-6 col-xl-5 col-4 d-flex align-items-center gap-20">
                <div className="main-logo d-lg-block d-none">
                    <div className="logo-big">
                        <Link to="/">
                            <img src={`${isLightTheme? "assets/images/logo-black.png":"assets/images/logo-big.png"}`} alt="Logo"/>
                        </Link>
                    </div>
                    <div className="logo-small">
                        <Link to="/">
                            <img src="assets/images/logo-small.png" alt="Logo"/>
                        </Link>
                    </div>
                </div>
                <div className="nav-close-btn" ref={ref}>
                    {isSmallScreen ? (
                    <button className='small' onClick={toggleSidebar}>
                        <i className="fa-light fa-bars-sort"></i>
                    </button>
                    ) : (
                    <button onClick={toggleNav} >
                        <i className="fa-light fa-bars-sort"></i>
                    </button>
                    )}
                </div>
                <button className='btn btn-sm btn-danger'   onClick={() => handleButtonClick('saWarning')}>
                <i className='fa-light fa-trash me-2'></i>
                Clear All
              </button>
                <Link to="/allAttestationPdfFile" target="_blank" className="btn btn-sm btn-primary site-view-btn"><i className="fa-light fa-eye me-1"></i> <span>View all Attestations</span></Link>
            </div>
            <div className="col-4 d-lg-none">
                {isLightTheme ? <div className="mobile-logo">
                    <Link to="/">
                        <img src="assets/images/logo-black.png" alt="Logo"/>
                    </Link>
                </div> : <div className="mobile-logo">
                    <Link to="/">
                        <img src="assets/images/logo-big.png" alt="Logo"/>
                    </Link>
                </div>}
            </div>
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-4">
                <div className="header-right-btns d-flex justify-content-end align-items-center">
                    <div className={`header-collapse-group ${mobileHeaderBtn? 'd-block':''}`}>
                        <div className="header-right-btns d-flex justify-content-end align-items-center p-0">
                            <form className="header-form">
                                <input type="search" name="search" placeholder="Search..." required/>
                                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </form>
                            <div className="header-right-btns d-flex justify-content-end align-items-center p-0">
                               
                             
                            
                                <button className="header-btn fullscreen-btn" id="btnFullscreen" onClick={handleFullscreen}>
                                    <i className={`fa-light ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                                </button>                                
                                <button className="header-btn theme-color-btn" onClick={handleLightThemeToggle}>
                                    <i className={`fa-light ${isLightTheme ? 'fa-cloud-moon' : 'fa-sun-bright'}`}></i>
                                </button>                            
                                </div>
                        </div>
                    </div>
                    <button className="header-btn header-collapse-group-btn d-lg-none" onClick={handleMobileHeaderBtn}><i className="fa-light fa-ellipsis-vertical"></i></button>
                    <button className="header-btn theme-settings-btn d-lg-none" onClick={handleSettingsToggle}>
                        <i className='fa-light fa-gear'></i>
                    </button>                    
                    <HeaderProfile/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header