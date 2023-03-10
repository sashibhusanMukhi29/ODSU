import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';



function Header({data}) {

    const titledata=useSelector(state=>state.display)
    const location = useLocation();
    const [title,setTitle]=useState(location.pathname)
    return (
        <div>
            <header className="header fixed-top d-flex align-items-center header-scrolled">
                <Link to="/dashboard" className="d-flex align-items-center col-md-2 mb-2 mb-md-0 text-dark text-decoration-none justify-content-start">
                    <img src="assets/img/logo.png" style={{ maxHeight: "44px" }} />
                </Link>
                <i className="bi bi-list toggle-sidebar-btn sidetoggle" onClick={data}></i>
                <h5>IT Services Project Report</h5>
                {/* <img src="" style={{ maxHeight: "44px" }} alt='Ojas Hiring Approval Management System'/> */}
                {/* <div className="pagetitle d-flex align-items-center justify-content-between">
                    <h3 className="headingtop">{location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)}</h3>
                </div> */}
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center user-link">
                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle"> <i className="bi bi-search"></i> </a>
                        </li>

                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown" aria-expanded="true">
                                <img src="assets/img/avatar.png" alt="Profile" className="rounded-circle" /><span className="d-none d-md-block dropdown-toggle ps-2">User Name</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" style={{ position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate(-45px, 38px)" }} data-popper-placement="bottom-end">
                                <li className="dropdown-header">
                                    <h6>User Name</h6>
                                    <span>Designation</span>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center"> 
                                    {/* <i className="bi bi-person"></i> <span>Profile</span> */}
                                    <Link to="/profile"><i className="bi bi-person"></i><span>Profile</span></Link>
                                     </a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center cursor"> <i className="bi bi-box-arrow-right"></i> <span>Sign Out</span> </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
            
        </div>
    )
}


export default Header;