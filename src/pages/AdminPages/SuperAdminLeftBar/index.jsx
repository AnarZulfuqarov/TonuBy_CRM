import './index.scss';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {MdLogout} from "react-icons/md";
import {usePopup} from "../../../components/Popup/PopupContext.jsx";

const SuperAdminLeftBar = () => {
    const location = useLocation();
    const [productsOpen, setProductsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [accounterOpen, setAccounterOpen] = useState(false);

    const showPopup = usePopup()
    const toggleProducts = () => setProductsOpen(o => !o);
    const toggleAccounter = () => setAccounterOpen(o => !o);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Bütün cookies sil
        document.cookie.split(";").forEach(cookie => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        });
        localStorage.setItem('auth-change', Date.now());
        showPopup("Sistemdən çıxış edildi", "Hesabdan uğurla çıxış etdiniz.", "success")
        navigate('/');
    };
    return (
        <aside className="sidebar">
            <ul className="sidebar__menu">
                <li className={location.pathname.startsWith("/admin/companies")  ? "sidebar__menu-item active" : "sidebar__menu-item"}>
                    <span className="sidebar__menu-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M10.5 6H9.5C9.22386 6 9 6.22386 9 6.5V7.5C9 7.77614 9.22386 8 9.5 8H10.5C10.7761 8 11 7.77614 11 7.5V6.5C11 6.22386 10.7761 6 10.5 6Z" fill="black"/>
  <path d="M14.5 6H13.5C13.2239 6 13 6.22386 13 6.5V7.5C13 7.77614 13.2239 8 13.5 8H14.5C14.7761 8 15 7.77614 15 7.5V6.5C15 6.22386 14.7761 6 14.5 6Z" fill="black"/>
  <path d="M10.5 9.5H9.5C9.22386 9.5 9 9.72386 9 10V11C9 11.2761 9.22386 11.5 9.5 11.5H10.5C10.7761 11.5 11 11.2761 11 11V10C11 9.72386 10.7761 9.5 10.5 9.5Z" fill="black"/>
  <path d="M14.5 9.5H13.5C13.2239 9.5 13 9.72386 13 10V11C13 11.2761 13.2239 11.5 13.5 11.5H14.5C14.7761 11.5 15 11.2761 15 11V10C15 9.72386 14.7761 9.5 14.5 9.5Z" fill="black"/>
  <path d="M10.5 13H9.5C9.22386 13 9 13.2239 9 13.5V14.5C9 14.7761 9.22386 15 9.5 15H10.5C10.7761 15 11 14.7761 11 14.5V13.5C11 13.2239 10.7761 13 10.5 13Z" fill="black"/>
  <path d="M14.5 13H13.5C13.2239 13 13 13.2239 13 13.5V14.5C13 14.7761 13.2239 15 13.5 15H14.5C14.7761 15 15 14.7761 15 14.5V13.5C15 13.2239 14.7761 13 14.5 13Z" fill="black"/>
  <path d="M18.25 19.25H17.75V4C17.7474 3.80189 17.6676 3.61263 17.5275 3.47253C17.3874 3.33244 17.1981 3.25259 17 3.25H7C6.80189 3.25259 6.61263 3.33244 6.47253 3.47253C6.33244 3.61263 6.25259 3.80189 6.25 4V19.25H5.75C5.55109 19.25 5.36032 19.329 5.21967 19.4697C5.07902 19.6103 5 19.8011 5 20C5 20.1989 5.07902 20.3897 5.21967 20.5303C5.36032 20.671 5.55109 20.75 5.75 20.75H18.25C18.4489 20.75 18.6397 20.671 18.7803 20.5303C18.921 20.3897 19 20.1989 19 20C19 19.8011 18.921 19.6103 18.7803 19.4697C18.6397 19.329 18.4489 19.25 18.25 19.25ZM16.25 19.25H11V17C11 16.8674 10.9473 16.7402 10.8536 16.6464C10.7598 16.5527 10.6326 16.5 10.5 16.5H9.5C9.36739 16.5 9.24021 16.5527 9.14645 16.6464C9.05268 16.7402 9 16.8674 9 17V19.25H7.75V4.75H16.25V19.25Z" fill="black"/>
</svg>
                    </span> <NavLink to={'/admin/companies'} className="link">
                    Şirkətlər
                </NavLink>
                </li>

                <li>
                    <div className={`sidebar__menu-item sidebar__dropdown
            ${productsOpen ? "open" : ""}
            ${location.pathname.startsWith("/admin/emeliyyat") ? "active" : ""}
          `}
                         onClick={toggleProducts}
                         ref={dropdownRef}>
              <span className="sidebar__menu-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_397_489)">
    <path
        d="M14.4375 0.0214844L22 3.80273V12.2354L20.625 11.5479V5.33887L15.125 8.08887V10.8604L13.75 11.5479V8.08887L8.25 5.33887V7.77734L6.875 7.08984V3.80273L14.4375 0.0214844ZM14.4375 6.89648L16.3389 5.94043L11.3652 3.09375L9.09863 4.23242L14.4375 6.89648ZM17.8213 5.20996L19.7764 4.23242L14.4375 1.55762L12.8369 2.36328L17.8213 5.20996ZM12.375 12.2354L11 12.9229V12.9121L6.875 14.9746V19.8623L11 17.7891V19.3359L6.1875 21.7422L0 18.6377V11.376L6.1875 8.28223L12.375 11.376V12.2354ZM5.5 19.8623V14.9746L1.375 12.9121V17.7891L5.5 19.8623ZM6.1875 13.7822L10.1514 11.8057L6.1875 9.81836L2.22363 11.8057L6.1875 13.7822ZM12.375 13.7715L17.1875 11.3652L22 13.7715V19.4326L17.1875 21.8389L12.375 19.4326V13.7715ZM16.5 19.959V16.6826L13.75 15.3076V18.584L16.5 19.959ZM20.625 18.584V15.3076L17.875 16.6826V19.959L20.625 18.584ZM17.1875 15.4902L19.7764 14.1904L17.1875 12.9014L14.5986 14.1904L17.1875 15.4902Z"
        fill="#252525"/>
  </g>
  <defs>
    <clipPath id="clip0_397_489">
      <rect width="22" height="22" fill="white"/>
    </clipPath>
  </defs>
</svg>
                </span>
                        <span className="sidebar__dropdown-title">
            Əməliyyat
          </span>
                        <span className="sidebar__dropdown-arrow">
            {productsOpen
                ? <svg width="12" height="12" /* aşağı ok */>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 6" fill="none">
                        <path d="M1 0.999999L6 6L11 1" stroke="#7C7C7C" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </svg>
                : <svg width="12" height="12" /* sağ ok */>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 6" fill="none">
                        <path d="M1 0.999999L6 6L11 1" stroke="#7C7C7C" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </svg>
            }
          </span>
                    </div>
                    {productsOpen && (
                        <ul className="sidebar__submenu">
                            <li>
                                <NavLink
                                    to="/admin/emeliyyat/kassa-e"
                                    className={({isActive}) =>
                                        isActive ? "sidebar__submenu-item active" : "sidebar__submenu-item"
                                    }
                                >
                                    Kassa əməliyyatı
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/emeliyyat/borc-e"
                                    className={({isActive}) =>
                                        isActive ? "sidebar__submenu-item active" : "sidebar__submenu-item"
                                    }
                                >
                                    Borc əməliyyatı
                                </NavLink>
                            </li>

                        </ul>
                    )}
                </li>

                <li>
                    <div className={`sidebar__menu-item sidebar__dropdown
            ${accounterOpen ? "open" : ""}
            ${location.pathname.startsWith("/admin/hesabat") ? "active" : ""}
          `}
                         onClick={toggleAccounter}
                         ref={dropdownRef}>
              <span className="sidebar__menu-icon">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_397_489)">
    <path
        d="M14.4375 0.0214844L22 3.80273V12.2354L20.625 11.5479V5.33887L15.125 8.08887V10.8604L13.75 11.5479V8.08887L8.25 5.33887V7.77734L6.875 7.08984V3.80273L14.4375 0.0214844ZM14.4375 6.89648L16.3389 5.94043L11.3652 3.09375L9.09863 4.23242L14.4375 6.89648ZM17.8213 5.20996L19.7764 4.23242L14.4375 1.55762L12.8369 2.36328L17.8213 5.20996ZM12.375 12.2354L11 12.9229V12.9121L6.875 14.9746V19.8623L11 17.7891V19.3359L6.1875 21.7422L0 18.6377V11.376L6.1875 8.28223L12.375 11.376V12.2354ZM5.5 19.8623V14.9746L1.375 12.9121V17.7891L5.5 19.8623ZM6.1875 13.7822L10.1514 11.8057L6.1875 9.81836L2.22363 11.8057L6.1875 13.7822ZM12.375 13.7715L17.1875 11.3652L22 13.7715V19.4326L17.1875 21.8389L12.375 19.4326V13.7715ZM16.5 19.959V16.6826L13.75 15.3076V18.584L16.5 19.959ZM20.625 18.584V15.3076L17.875 16.6826V19.959L20.625 18.584ZM17.1875 15.4902L19.7764 14.1904L17.1875 12.9014L14.5986 14.1904L17.1875 15.4902Z"
        fill="#252525"/>
  </g>
  <defs>
    <clipPath id="clip0_397_489">
      <rect width="22" height="22" fill="white"/>
    </clipPath>
  </defs>
</svg>
                </span>
                        <span className="sidebar__dropdown-title">
            Hesabat
          </span>
                        <span className="sidebar__dropdown-arrow">
            {accounterOpen
                ? <svg width="12" height="12" /* aşağı ok */>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 6" fill="none">
                        <path d="M1 0.999999L6 6L11 1" stroke="#7C7C7C" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </svg>
                : <svg width="12" height="12" /* sağ ok */>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 6" fill="none">
                        <path d="M1 0.999999L6 6L11 1" stroke="#7C7C7C" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </svg>
            }
          </span>
                    </div>
                    {accounterOpen && (
                        <ul className="sidebar__submenu">
                            <li>
                                <NavLink
                                    to="/admin/hesabat/kassa-h"
                                    className={({isActive}) =>
                                        isActive ? "sidebar__submenu-item active" : "sidebar__submenu-item"
                                    }
                                >
                                    Kassa hesabatı
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/hesabat/borc-h"
                                    className={({isActive}) =>
                                        isActive ? "sidebar__submenu-item active" : "sidebar__submenu-item"
                                    }
                                >
                                    Borc hesabatı
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
            <div>
                <button className={"logOut"} onClick={handleLogout}>
                    <MdLogout style={{
                        fontSize: "18px",
                    }}/>
                    <div>Çıxış et</div>
                </button>
            </div>
        </aside>
    )
        ;
};

export default SuperAdminLeftBar;