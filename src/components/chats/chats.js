import React from "react";
import { Link } from "react-router-dom";

function Chats() {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="nav flex-column" id="sidebar-nav">
          {/* <li className="nav-item">
            <a className="nav-link" aria-current="page" href="index.html">
              <i className="bi bi-grid-fill"></i>
              Dashboard
            </a>
            <Link to="/dashboard"> <i className="bi bi-circle"></i><span>Dashboard</span></Link>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="charts.html">
              {/* <i className="bi bi-bar-chart-line-fill"></i>
                            Analytics */}
              <Link to="/schedule_interview">
                <i className="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#menu-item4"
              data-bs-toggle="collapse"
              href="#"
            >
              {" "}
              <i className="bi bi-person-workspace"></i>
              <span>RRF</span>
              <i className="bi bi-chevron-down ms-auto"></i>{" "}
            </a>
            <ul
              id="menu-item4"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/new_rrf">
                  {" "}
                  <i className="bi bi-circle"></i>
                  <span>Create New RRF</span>
                </Link>
              </li>
              <li>
                <Link to="/list_comp">
                  <i className="bi bi-circle"></i>
                  <span>RRF List</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#menu-item2"
              data-bs-toggle="collapse"
              href="#"
            >
              {" "}
              <i className="bi bi-person-workspace"></i>
              <span>Resource</span>
              <i className="bi bi-chevron-down ms-auto"></i>{" "}
            </a>
            <ul
              id="menu-item2"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/create_new_profile">
                  <i className="bi bi-circle"></i>
                  <span>Create New Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/hiring_list">
                  <i className="bi bi-circle"></i>
                  <span>Hiring List</span>
                </Link>{" "}
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#menu-item3"
              data-bs-toggle="collapse"
              href="#"
            >
              {" "}
              <i className="bi bi-person-workspace"></i>
              <span>Tag</span>
              <i className="bi bi-chevron-down ms-auto"></i>{" "}
            </a>
            <ul
              id="menu-item3"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/tag_resource">
                  <i className="bi bi-circle"></i>
                  <span>Tag Resource</span>
                </Link>
              </li>
              <li>
                <Link to="/tag_list">
                  <i className="bi bi-circle"></i>
                  <span>Tag List</span>
                </Link>{" "}
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="charts.html">
              {/* <i className="bi bi-bar-chart-line-fill"></i>
                            Analytics */}
              <Link to="/analytics">
                <i className="bi bi-circle"></i>
                <span>Analytics</span>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="charts.html">
              {/* <i className="bi bi-bar-chart-line-fill"></i>
                            Analytics */}
              <Link to="/schedule_interview">
                <i className="bi bi-person"></i>
                <span>Schedule Interview</span>
              </Link>
            </a>
          </li>
        </ul>
      </aside>
      <main id="main" className="main">
        <section className="section" style={{ minHeight: "480px" }}>
          <div className="d-flex align-items-center justify-content-between">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to='/dashboard'>
                    <i className="bi bi-house-fill"></i> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active"> Analytics</li>
              </ol>
            </nav>
          </div>
          <div className="row py-3">
            <div className="col-lg-3">
              <div className="mb-3">
                <label className="form-label">Select Chart Type</label>
                <select className="form-select" aria-label="Select Chart">
                  <option value="1">Week-wise Opportunities</option>
                  <option value="2">Company-wise Opportunities</option>
                  <option value="3">
                    Company-wise Opportunities/Selections
                  </option>
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <label className="form-label">Start Date</label>
              <input type="datetime-local" className="form-control" />
            </div>
            <div className="col-lg-3">
              <label className="form-label">End Date</label>
              <input type="datetime-local" className="form-control" />
            </div>
            <div className="col-lg-3">
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="button" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="row py-3">
            <div className="col-lg-12">
              <div className="card card shadow-sm">
                <div className="more">
                  <a className="icon" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li>
                      <a className="dropdown-item">Week-wise Opportunities</a>
                    </li>
                    <li>
                      <a className="dropdown-item">Company-wise Opportunities</a>
                    </li>
                    <li>
                      <a className="dropdown-item">
                        Company-wise Opportunities/Selections
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Week-wise Opportunities</h3>
                  <div className="">
                    Chart comes here.
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-12"></span>
                    </p>
                  </div>
                </div>
                <div className="card-footer">
                  <a className="link-sm" style={{ float: "right" }}>
                    View more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Chats;
