import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useLocation} from 'react-router-dom';
 import {titles} from '../../Redux/Action'


function Sidebar({open}) {

    const dispat=useDispatch()
   const titlechange=(value)=>{
   dispat(titles(value))
   }
    return (
        <div>
            <aside id="sidebar" className={open?'sidebar collapse':'sidebar'}>
                <ul className="nav flex-column" id="sidebar-nav">
                   
                {/* <li className="nav-item">
                        <a className="nav-link" aria-current="page">
                        <Link to="/dashboard"><i className="bi bi-grid-fill" ></i><span onClick={()=>titlechange("Dashboard")}>Dashboard</span> 
                        </Link>
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page">
                       <Link to="/dsr"> <i className="bi bi-grid-fill" ></i><span onClick={()=>titlechange("Dashboard")}>DSR</span> </Link>
                        
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" aria-current="page">
                        <Link to="/summary"><i className="bi bi-grid-fill" ></i><span onClick={()=>titlechange("Dashboard")}>Summary</span> 
                        </Link>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#menu-item1" data-bs-toggle="collapse"> <i className="bi bi-person-workspace"></i><span >RRF</span><i className="bi bi-chevron-down ms-auto"></i> </a>
                        <ul id="menu-item1" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/new_rrf"><i className="bi bi-circle"></i><span onClick={()=>titlechange("Create New RRF")}>Create New RRF</span></Link>
                            </li>
                            <li>
                                <Link to="/list_comp"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("RRF List")}>RRF List</span></Link>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#menu-item2" data-bs-toggle="collapse"> <i className="bi bi-person-workspace"></i><span>Resource</span><i className="bi bi-chevron-down ms-auto"></i> </a>
                        <ul id="menu-item2" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/create_new_profile"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("Create New Profile")}>Create New Profile</span> </Link>
                            </li>
                            <li>
                                <Link to="/hiring_list"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("Hiring List")}>Hiring List</span> </Link>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#menu-item3" data-bs-toggle="collapse"> <i className="bi bi-person-workspace"></i><span>Tag</span><i className="bi bi-chevron-down ms-auto"></i> </a>
                        <ul id="menu-item3" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                            <Link to="/tag_resource"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("Tag Resource")}>Tag Resource</span> </Link>
                            </li>
                            <li>
                            <Link to="/tag_list"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("Tag List")}>Tag List</span> </Link>
                            </li>

                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#menu-item4" data-bs-toggle="collapse"> <i className="bi bi-person-workspace"></i><span>PMO</span><i className="bi bi-chevron-down ms-auto"></i> </a>
                        <ul id="menu-item4" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                            <Link to="/pmo_resource"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("Pmo Resource")}>PMO Resource</span> </Link>
                            </li>
                            <li>
                            <Link to="/pmo_list"> <i className="bi bi-circle"></i><span onClick={()=>titlechange("Pmo List")}>PMO List</span> </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#menu-item5" data-bs-toggle="collapse"> <i className="bi bi-person-workspace"></i><span>Schedule Interview</span><i className="bi bi-chevron-down ms-auto"></i> </a>
                        <ul id="menu-item5" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                          <li>
                          <Link to="/schedule_interview"><i className="bi bi-circle"></i><span onClick={()=>titlechange("Schedule Interview")}>Schedule Interview</span> </Link>
                          </li>
                          <li>
                            <Link to="/schedule_interview_list"><i className="bi bi-circle"></i><span onClick={()=>titlechange("Schedule Interview List")}>Schedule Interview List</span></Link>
                            </li>
                            <li>
                            <Link to="/schedule_interview_page"><i className="bi bi-circle"></i><span onClick={()=>titlechange("Schedule Interview Page")}>Schedule Interview Page</span></Link>
                          </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page">
                        <Link to="/"><i class="bi bi-bar-chart-line-fill"></i><span onClick={()=>titlechange("Analytics")}>Analytics</span></Link>
                        </a>
                    </li> */}
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar