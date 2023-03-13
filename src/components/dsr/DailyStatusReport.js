import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";
import CopyToClipboard from "react-copy-to-clipboard";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CsvDownloader from "react-csv-downloader";
// import { Document } from "react-pdf";
import { CSVLink } from "react-csv";
function DailyStatusReport() {
  const { quill, quillRef } = useQuill();
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);
  const [empName, setEmpName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dsrDate, setDsrDate] = useState("");
  const [hrs, setHrs] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [copyText, setCopyText] = useState("");
  const [search, setSearch] = useState();
  const [message, setMessage] = useState();
  const value = useSelector((state) => state.display.api);
  const [api, setApi] = useState(value);
  const [show, setShow] = useState(false);
  const [currentpage, setcurrentpage] = useState(1);
  const [postsperpage, setpostsperpage] = useState(10);
  const [submitcount, setsubmitCount] = useState(0);
  const totalpages = Math.ceil(info.length / postsperpage);
  const pages = [...Array(totalpages + 1).keys()].slice(1);
  const indexofLastpage = currentpage * postsperpage;
  const indexofFirstPage = indexofLastpage - postsperpage;
  const [employee, setEmployee] = useState([])
  const [project, setProject] = useState([])
  useEffect(() => {
    getEmployee();
    getProjects();
  }, []
  )
  const getEmployee =  () => {
    const result =  axios.get("http://localhost:3001/employee").then(res => setEmployee(res.data))

    
    // setEmployee(result.data)
  }

  const getProjects =  () => {
    const result =  axios.get("http://localhost:3001/project").then(res => setProject(res.data))

    
    // setEmployee(result.data)
  }

  const handleClose = () => setShow(false);
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
  const visibleposts = info.slice(indexofFirstPage, indexofLastpage);
  const tableRef = useRef(null);
  const filtered = !search
    ? visibleposts
    : info.filter((person) => {
      return (
        person.empName.toLowerCase().includes(search.toLowerCase()) ||
        person.project.toLowerCase().includes(search.toLowerCase()) ||
        person.hrsWorked.toLowerCase().includes(search.toLowerCase()) ||
        person.dSRReport.toLowerCase().includes(search.toLowerCase())
      );
    });

  let str1 = "";

  const getname = (e1, para) => {
    if (para == "empname") {
      if (e1.match("^[a-zA-Z ]*$") != null) {
        setEmpName(e1);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(empName, projectName, dsrDate, hrs, taskDescription);
    if (
      empName.length > 0 &&
      projectName.length > 0 &&
      dsrDate.length > 0 &&
      hrs.length > 0 &&
      taskDescription.length > 0
    ) {
      setShow(true);
      const obj = {
        empName: empName,
        projectName: projectName,
        dsrDate: dsrDate,
        hrs: hrs,
        taskDescription: taskDescription,
      };
      console.log(obj);
      axios.post("http://localhost:3001/employee", obj).then((resp) => {
        if (resp.status == 200) {
          console.log(resp.data[0].msg, "iam 77 line");
          setMessage(resp.data[0].msg);
        }
       
        setInfo(resp.data);

        axios.get("http://localhost:3001/employee").then((resp) => {
          setInfo(resp.data);

        });
      });
      setEmpName("");
      setProjectName("");
      setDsrDate("");
      setHrs("");
      setTaskDescription("");
    } else {
      setsubmitCount(1);
    }
  };
  const gethours = (e1, para) => {

    if (para == "hours") {
      if (e1.length <= 5) {
        setHrs(e1.match('^[0-9:]+$'));
      }
    }

  };

  console.log(dsrDate, "iam dsrdate");
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        let val = quillRef.current.firstChild.innerHTML;
        val = val.split("<p>").join("").split("</p>").join("");
        console.log(val);
        // console.log(quillRef.getText())

        setTaskDescription(val);
      });
    }
  }, [quill]);

  const csvReport = {
    data: filtered,
    headers: [
      { label: "Employee Name", key: "empName" },
      { label: "Project Name", key: "project" },
      { label: "Hours Worked", key: "hrsWorked" },
      { label: "task Description", key: "dSRReport" },
    ],
    filename: "DSR-Report.csv",
  };

  useEffect(() => {
    axios.get(`${api}dailystatus/fetchdsr`).then((resp) => {
      setInfo(resp.data);
      // console.log(Object.keys(resp.data[0]));
      // setHeaders()
    });
    axios
      .get(`${api}dailystatus/getProjects`)
      .then((resp) => setProjectNameget(resp.data));
  }, []);
  console.log(info);
  const [projectNamesget, setProjectNameget] = useState([]);
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [
      ["EmployeeName", "ProjectName", "Houers-Worked", "Task-Description"],
    ];
    const data = filtered.map((elt) => [
      elt.empName,
      elt.project,
      elt.hrsWorked,
      elt.dSRReport,
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

  // btnCopyTable.addEventListener('click', () => copyEl(elTable));
  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  console.log(message, "iam 182 line");
  return (
    <div>

      <main id="main" className="">
        <section className="col-md-12" style={{ minHeight: "480px" }}>
          <div className="d-flex align-items-center justify-content-between">
            <h4>Daily Status Reports(DSR)</h4>
          </div>
          <form>
            <div className="row">
              <div className="col-lg-3">
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee name"
                    required
                    autoComplete="off"
                    value={empName}

                    style={
                      submitcount == 1 && empName.length == 0
                      
                        ? { border: "solid red 1px" }
                        : null
                    }
                    onChange={(e) => {
                      getname(e.target.value, "empname");
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mb-2">
                  <select
                    className="form-select"
                    aria-label="Defalt select example"
                    value={projectName}
                    style={
                      submitcount == 1 && projectName.length == 0
                        ? { border: "solid red 1px" }
                        : null
                    }
                    onChange={(e) => setProjectName(e.target.value)}
                  >
                   {
                    project &&
                    project.map((value)=>
                    <option>{value.project_name}</option>)
                   }
                   
                  </select>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mb-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e)=>{handleSubmit(e)}}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2">
                <div className="mb-2">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date"
                    required
                    autoComplete="off"
                    value={dsrDate}
                    style={
                      submitcount == 1 && dsrDate.length == 0
                        ? { border: "solid red 1px" }
                        : null
                    }
                    onChange={(e) => setDsrDate(e.target.value)}
                  />{" "}
                </div>
              </div>
              <div className="col-lg-2">
                <div className="mb-2">
                  <label className="form-label">Hours Worked</label>
                  <input
                    type="/^[a-zA-Z\s]*$/"
                    className="form-control"
                    placeholder="eg:04:10"
                    required
                    autoComplete="off"
                    value={hrs}
                    style={
                      submitcount == 1 && hrs.length == 0
                        ? { border: "solid red 1px" }
                        : null
                    }
                    onChange={(e) => {
                      gethours(e.target.value, "hours");
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div className=" form-group">
                  <div className="desc">Task Description</div>
                  <div
                    className="quill-editor-default"
                    style={
                      submitcount == 1 && taskDescription.length == 0
                        ? { border: "solid red 1px" }
                        : null
                    }
                  >
                    <div>
                      <div>
                      <div ref={quillRef} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="row py-5">
            <div className="col-md-12">
              <div className="card mb-2">
                <div className="card-body">
                  <form>
                    <div className="row py-3 mb-5">
                      <div className="col-lg-6">
                        <div className="mb-2">
                          <input
                            type="Search"
                            className="form-control"
                            placeholder="search"
                            required
                            autoComplete="off"
                            value={search}
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4" style={{ textAlign: "right" }}>
                        <CSVLink {...csvReport}>
                          <button
                            type="button"
                            className="btn btn-outline-secondary me-md-2 "
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
                            className="btn btn-outline-secondary me-md-2"
                          >
                            Excel
                          </button>
                        </DownloadTableExcel>
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-md-2"
                          onClick={exportPDF}
                        >
                          PDF
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-md-2"
                          onClick={Print}
                        >
                          Print
                        </button>
                      </div>
                      <div className="col-lg-2">
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
                        <table className="table table-hover table-striper"    ref={tableRef} style={{border:'1px solid '}}>
                          <thead>
                            <tr  >
                              <th >EmployeeName</th>
                              <th > ProjectName </th>
                              <th > Hours</th>
                              <th > TaskDescription</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              employee.map((e, i) =>
                                <tr key={i}>
                                  <th>{e.empName}</th>
                                  <th >{e.projectName}</th>
                                  <th >{e.hrs}</th>
                                  <th >{e.taskDescription}</th>
                                </tr>

                              )

                            }
                          </tbody>
                        </table>
                        {/* <hr className="mt-4 mb-4" /> */}
                        {[
                          ...Array(
                            Math.ceil(
                              (!search ? info.length : filtered.length) /
                              postsperpage
                            ) + 1
                          ).keys(),
                        ].slice(1).length > 1 ? (
                          <nav
                            aria-label="..."
                            style={{ paddingBottom: "250px" }}
                          >

                            <ul className="pagination">

                              <li className="page-item ">

                                <span
                                  className={`page-link ${currentpage <= 1 && "disabled"
                                    }`}
                                  style={{ cursor: "pointer" }}
                                  onClick={prevhandle}
                                >
                                  Previous

                                </span>

                              </li>

                              {[
                                ...Array(
                                  Math.ceil(
                                    (!search ? info.length : filtered.length) /
                                    postsperpage
                                  ) + 1
                                ).keys(),
                              ]
                                .slice(1)
                                .map((e, i) => (
                                  <li className="page-item" key={i}>

                                    <a
                                      className={`page-link ${currentpage === e && "disabled"
                                        }`}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => setcurrentpage(e)}
                                    >{` ${e}`}</a>

                                  </li>
                                ))}

                              <li className="page-item">

                                <a
                                  className={`page-link ${currentpage ===
                                    [
                                      ...Array(
                                        Math.ceil(
                                          (!search
                                            ? info.length
                                            : filtered.length) / postsperpage
                                        ) + 1
                                      ).keys(),
                                    ].slice(1).length && "disabled"
                                    }`}
                                  style={{ cursor: "pointer" }}
                                  onClick={nexthandle}
                                >
                                  Next

                                </a>

                              </li>

                            </ul>

                          </nav>
                        ) : (
                          <div style={{ paddingBottom: "100px" }}></div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer  text-end">
                  <a href="#">View all</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal show={show}>
              <Modal.Body>{message}</Modal.Body>
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

export default DailyStatusReport;
