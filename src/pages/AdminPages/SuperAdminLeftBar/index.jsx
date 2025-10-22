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
                <li className={location.pathname.startsWith("/admin/musteri")  ? "sidebar__menu-item active" : "sidebar__menu-item"}>
                    <span className="sidebar__menu-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M4.8125 7.21875C4.8125 6.58057 5.06601 5.96853 5.51727 5.51727C5.96853 5.06602 6.58057 4.8125 7.21875 4.8125C7.85693 4.8125 8.46897 5.06602 8.92023 5.51727C9.37148 5.96853 9.625 6.58057 9.625 7.21875C9.625 7.85693 9.37148 8.46897 8.92023 8.92023C8.46897 9.37148 7.85693 9.625 7.21875 9.625C6.58057 9.625 5.96853 9.37148 5.51727 8.92023C5.06601 8.46897 4.8125 7.85693 4.8125 7.21875ZM7.21875 3.4375C6.2159 3.4375 5.25412 3.83588 4.545 4.545C3.83588 5.25412 3.4375 6.2159 3.4375 7.21875C3.4375 8.2216 3.83588 9.18338 4.545 9.8925C5.25412 10.6016 6.2159 11 7.21875 11C8.2216 11 9.18338 10.6016 9.8925 9.8925C10.6016 9.18338 11 8.2216 11 7.21875C11 6.2159 10.6016 5.25412 9.8925 4.545C9.18338 3.83588 8.2216 3.4375 7.21875 3.4375ZM14.4375 8.25C14.4375 7.88533 14.5824 7.53559 14.8402 7.27773C15.0981 7.01987 15.4478 6.875 15.8125 6.875C16.1772 6.875 16.5269 7.01987 16.7848 7.27773C17.0426 7.53559 17.1875 7.88533 17.1875 8.25C17.1875 8.61467 17.0426 8.96441 16.7848 9.22227C16.5269 9.48013 16.1772 9.625 15.8125 9.625C15.4478 9.625 15.0981 9.48013 14.8402 9.22227C14.5824 8.96441 14.4375 8.61467 14.4375 8.25ZM15.8125 5.5C15.0832 5.5 14.3837 5.78973 13.868 6.30546C13.3522 6.82118 13.0625 7.52065 13.0625 8.25C13.0625 8.97935 13.3522 9.67882 13.868 10.1945C14.3837 10.7103 15.0832 11 15.8125 11C16.5418 11 17.2413 10.7103 17.757 10.1945C18.2728 9.67882 18.5625 8.97935 18.5625 8.25C18.5625 7.52065 18.2728 6.82118 17.757 6.30546C17.2413 5.78973 16.5418 5.5 15.8125 5.5ZM1.375 14.4375C1.375 13.8905 1.5923 13.3659 1.97909 12.9791C2.36589 12.5923 2.89049 12.375 3.4375 12.375H11C11.547 12.375 12.0716 12.5923 12.4584 12.9791C12.8452 13.3659 13.0625 13.8905 13.0625 14.4375V14.5929C13.0609 14.657 13.0563 14.721 13.0487 14.7847C13.035 14.9036 13.0096 15.0652 12.9594 15.2563C12.8266 15.7603 12.593 16.232 12.2726 16.643C11.4682 17.6756 9.955 18.5625 7.21875 18.5625C4.4825 18.5625 2.97 17.6756 2.16494 16.643C1.84426 16.2321 1.61037 15.7603 1.47744 15.2563C1.42529 15.054 1.39169 14.8474 1.37706 14.6389L1.37569 14.5929V14.5771L1.375 14.5716V14.4375ZM2.75 14.5599V14.5681C2.75 14.58 2.75206 14.6016 2.75619 14.6328C2.76306 14.6946 2.7775 14.7909 2.80844 14.9105C2.87031 15.1497 2.99612 15.4729 3.24912 15.7981C3.73381 16.4196 4.79875 17.1875 7.21875 17.1875C9.63875 17.1875 10.7044 16.4196 11.1884 15.7987C11.3934 15.5354 11.5431 15.2332 11.6284 14.9105C11.6577 14.7982 11.6775 14.6837 11.6875 14.5681L11.6882 14.5599V14.4375C11.6882 14.2552 11.6158 14.0803 11.4868 13.9514C11.3579 13.8224 11.183 13.75 11.0007 13.75H3.4375C3.25516 13.75 3.0803 13.8224 2.95136 13.9514C2.82243 14.0803 2.75 14.2552 2.75 14.4375V14.5599ZM13.3904 16.8383C14.0298 17.0555 14.8252 17.1875 15.8125 17.1875C18.0132 17.1875 19.2637 16.5323 19.9464 15.7266C20.2785 15.3347 20.4483 14.9373 20.5342 14.6321C20.5805 14.4684 20.6102 14.3005 20.6229 14.1309L20.6236 14.1061L20.6243 14.091V14.0649C20.6244 13.843 20.5808 13.6233 20.4959 13.4182C20.4111 13.2132 20.2867 13.0269 20.1298 12.87C19.9729 12.7131 19.7867 12.5886 19.5817 12.5036C19.3767 12.4187 19.157 12.375 18.9351 12.375H13.3052C13.6489 12.7593 13.8985 13.2296 14.0167 13.75H18.9351C19.107 13.75 19.2459 13.8868 19.25 14.0566L19.2472 14.0869C19.239 14.1449 19.2271 14.2023 19.2115 14.2587C19.1689 14.41 19.0809 14.6217 18.8973 14.8383C18.5487 15.2501 17.7368 15.8125 15.8125 15.8125C15.0116 15.8125 14.4038 15.7149 13.9418 15.5719C13.8199 16.0183 13.6342 16.4448 13.3904 16.8383Z" fill="black"/>
</svg>
                    </span> <NavLink to={'/admin/musteri'} className="link">
                    Müştəri
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