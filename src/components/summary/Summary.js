import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DownloadTableExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
function Summary() {
  const [info, setInfo] = useState([]);
  const [posts, setposts] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [arr, setArr] = useState([]);
  const data = useSelector((state) => state.display.api);
  console.log(data, "iam 22");
  const [api, setApi] = useState(data);
  const [projectNamesget, setProjectNameget] = useState([]);
  const [tabledata, setTabledata] = useState([]);
  const [Search, setSearch] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [currentpage, setcurrentpage] = useState(1);
  const [postsperpage, setpostsperpage] = useState(10);
  const [summarycount, setsummaryCount] = useState(0);
  const totalpages = Math.ceil(tabledata.length / postsperpage);
  const pages = [...Array(totalpages + 1).keys()].slice(1);
  const indexofLastpage = currentpage * postsperpage;
  const indexofFirstPage = indexofLastpage - postsperpage;
  const prevhandle = () => {
    if (currentpage !== 1) {
      setcurrentpage(currentpage - 1);
    }
  };
  const nexthandle = () => {
    if (currentpage !== totalpages) {
      setcurrentpage(currentpage + 1);
    }
  };
  const visibleposts = tabledata.slice(indexofFirstPage, indexofLastpage);
  const tableRef = useRef(null);
  const filtered = !Search
    ? visibleposts
    : tabledata.filter((person) => {
        return (
          String(person.index).toLowerCase().includes(Search.toLowerCase()) ||
          person.ename.toLowerCase().includes(Search.toLowerCase()) ||
          String(person.eligiblity)
            .toLowerCase()
            .includes(Search.toLowerCase()) ||
          String(person.bill).toLowerCase().includes(Search.toLowerCase())
        );
      });
  useEffect(() => {
    let val = new Date();
    val = val.getFullYear();
    setArr([val - 1, val, val + 1, val + 2]);

    axios
      .get(`${api}dailystatus/getProjects`)
      .then((resp) => setProjectNameget(resp.data));
    axios
      .get(`${api}dailystatus/fetchSummaryOpt`)
      .then((resp) => setTabledata(resp.data));
  }, []);
  console.log(tabledata);

  // arr.push(val1)
  //    setArr([val-1,val,val+1,val+2])

  console.log(projectName, typeof projectName);
  console.log(month, typeof month);
  console.log(year, typeof year);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      projectName.length > 0 &&
      String(month).length > 0 &&
      String(year).length > 0
    ) {
      setShow(true);
      let obj = {
        projectName: projectName,
        month: month,
        year: year,
      };
      console.log(obj);
      console.log(month, "iam sravani");
      // http://192.168.3.156:8888/dailystatus/fetchSummaryOpt
      axios
        .post(`${api}dailystatus/fetchSummaryOpt`, obj)
        .then((resp) => setTabledata(resp.data));
    } else {
      setsummaryCount(1);
      console.log(projectName, typeof projectName);
      console.log(month, typeof month);
      console.log(year, typeof year);
    }
  };
  const exportPDF = () => {
    console.log("jjjjjjjjjjj");
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [
      ["Index", "Employee Name", "Eligibity Hrs", "Billable Hrs"],
    ];
    const data = filtered.map((elt) => [
      elt.index,
      elt.ename,
      elt.eligiblity,
      elt.bill,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const csvReport = {
    data: filtered,
    headers: [
      { label: "Index", key: "index" },
      { label: "EmployeeName", key: "ename" },
      { label: "Eligible Hrs", key: "eligiblity" },
      { label: "Billable Hrs", key: "bill" },
    ],
    filename: "Summary-Report.csv",
  };
  const Print = () => {
    console.log("print");
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      <main id="main" className="main">
        <section className="section" style={{ minHeight: "480px" }}>
          <div class="row">
            <div className="col-lg-6 col-md-6 col-6 text-start  ">
              <h4>Summary</h4>
            </div>
            <div className="col-lg-6 col-md-6 col-6 text-end">
              <a href="#">
                <i className="bi bi-house-fill"></i>
                Home{" "}
              </a>{" "}
              /Summary
            </div>
            <form>
              <div className="row py-3 mb-5">
                <div className="col-lg-3">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Defalt select example"
                      value={projectName}
                      style={
                        summarycount == 1 && projectName.length == 0
                          ? { border: "solid red 1px" }
                          : null
                      }
                      onChange={(e) => setProjectName(e.target.value)}
                    >
                      <option>Select Project</option>
                      {projectNamesget.map((e) => (
                        <option value={e}>{e}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Defalt select example"
                      value={year}
                      style={
                        summarycount == 1 && String(year).length == 0
                          ? { border: "solid red 1px" }
                          : null
                      }
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option>Select Year</option>
                      {arr.map((e) => (
                        <option value={e}>{e}</option>
                      ))}
                      {/* <option>1</option> */}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Defalt select example"
                      style={
                        summarycount == 1 && String(month).length == 0
                          ? { border: "solid red 1px" }
                          : null
                      }
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option>Select Month</option>
                      <option value="1">Jan</option>
                      <option value="2">Feb</option>
                      <option value="3">Mar</option>
                      <option value="4">Apr</option>
                      <option value="5">May</option>
                      <option value="6">Jun</option>
                      <option value="7">Jul</option>
                      <option value="8">Aug</option>
                      <option value="9">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="mb-3">
                    <div class="d-grid gap-2 col-6">
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <form>
                <div className="row py-3 mb-5">
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <input
                        type="Search"
                        className="form-control"
                        placeholder="search"
                        value={Search}
                        onChange={handleSearch}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4" style={{ textAlign: "right" }}>
                    <CSVLink {...csvReport}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary me-md-2 "
                      >
                        CSV
                      </button>
                    </CSVLink>
                    <DownloadTableExcel
                      filename="users table"
                      sheet="users"
                      currentTableRef={tableRef.current}
                    >
                      <button
                        type="button"
                        class="btn btn-outline-secondary me-md-2"
                      >
                        Excel
                      </button>
                    </DownloadTableExcel>
                    <button
                      type="button"
                      class="btn btn-outline-secondary me-md-2"
                      onClick={exportPDF}
                    >
                      PDF
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary me-md-2"
                      onClick={Print}
                    >
                      Print
                    </button>
                  </div>
                  <div class="col-lg-2">
                    Show
                    <select
                      className="btn btn-outline-secondary"
                      aria-label="Default select example"
                      onChange={(e) => setpostsperpage(e.target.value)}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div id="printablediv">
                    <table class="table" ref={tableRef}>
                      <thead>
                        <tr class="table-primary">
                          <th scope="col">Sl.No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Eligible Hrs</th>
                          <th scope="col">Billable Hrs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((e, i) => (
                          <tr key={i}>
                            <td>{e.index}</td>
                            <td>{e.ename}</td>
                            <td>{e.eligiblity}</td>
                            <td>{e.bill}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="row py-3 mb-2">
                      <div className="col-lg-6 text-start">
                        <p>Showing 0 to 0 of 0 entries</p>
                      </div>
                      <div className="col-lg-6">
                        <nav
                          aria-label="..."
                          style={{ paddingBottom: "120px" }}
                        >
                          <ul className="pagination">
                            <li className="page-item ">
                              <span
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={prevhandle}
                              >
                                Previous
                              </span>
                            </li>
                            {pages.map((e, i) => (
                              <li className="page-item">
                                <a
                                  className="page-link"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setcurrentpage(e)}
                                >{` ${e}`}</a>
                              </li>
                            ))}
                            <li className="page-item">
                              <a
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={nexthandle}
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer  text-end">
              <a href="#">View all</a>
            </div>
          </div>
          <div>
            <Modal show={show}>
              <Modal.Body>Submitted Successfully</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Summary;
