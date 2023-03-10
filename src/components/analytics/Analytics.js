import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
function Analytics({ open }) {
	const location = useLocation();
    const [title, setTitle] = useState(location.pathname)
	return (
		<div>
			<main id="main" className="main" >
				<section className="section" style={{ minHeight: "480px" }}>
					<div className="d-flex align-items-center justify-content-between">
						<nav>
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to='/dashboard' >
										<i className="bi bi-house-fill"></i> Home
									</Link>
								</li>
								<li className="breadcrumb-item active">Analytics</li>
							</ol>
						</nav>
					</div>
					<div className="row py-3">
						<div className="col-lg-3">
							<div className="mb-3">
								<label for="" className="form-label">Select Chart Type</label>
								<select className="form-select" aria-label="Select Chart">
									<option value="1">Week-wise Opportunities</option>
									<option value="2">Company-wise Opportunities</option>
									<option value="3">Company-wise Opportunities/Selections</option>
								</select>
							</div>
						</div>
						<div className="col-lg-3">
							<label for="" className="form-label">Start Date</label>
							<input type="datetime-local" className="form-control" />
						</div>
						<div className="col-lg-3">
							<label for="" className="form-label">End Date</label>
							<input type="datetime-local" className="form-control" />
						</div>
						<div className="col-lg-3">
							<div className="d-grid gap-2 col-6 mx-auto">
								<button type="button" className="btn btn-primary">Submit</button>
							</div>
						</div>
					</div>
					<div className="row py-3">
						<div className="col-lg-12">
							<div className="card card shadow-sm">
								<div className="more">
									<a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
									<ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
										<li><a className="dropdown-item" href="#">Week-wise Opportunities</a></li>
										<li><a className="dropdown-item" href="#">Company-wise Opportunities</a></li>
										<li><a className="dropdown-item" href="#">Company-wise Opportunities/Selections</a></li>
									</ul>
								</div>
								<div className="card-body">
									<h3 className="card-title">Week-wise Opportunities</h3>
									<div className="">
										Chart comes here.
										<p className="card-text placeholder-glow">
											<span className="placeholder col-12"></span></p>
									</div>
								</div>
								<div className="card-footer">
									<a href="#" className="link-sm" style={{ float: "right" }}>View more</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default Analytics
