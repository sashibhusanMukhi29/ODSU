import "./App.css";
import Header from "./components/header/header";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar/sidebar";
// import Chats from "./components/chats/chats";
import Footer from "./components/footer/footer";
// import NewRrf from "./components/rrf/newRRF";
// import listRrf from "./components/rrf/listRrf";
// import listRrf from "./components/rrf/listRrf";
// import CreatenewProfile from "./components/resource/CreatenewProfile";
// import HiringList from "./components/resource/HiringList";
// import TagResource from "./components/Tag/TagResource";
// import TagList from "./components/Tag/TagList";

// import Analytics from "./components/analytics/Analytics";
// import Profile from "./components/user/Profile";
// import ScheduleInterview from "./components/scheduleinterview/ScheduleInterview";
import { useState } from "react";
import Summary from "./components/summary/Summary";
import DailyStatusReport from "./components/dsr/DailyStatusReport";
import Table from "./components/Table";
// import ListrrfComp from "./components/rrf/ListrrfComp";
// import PmoResource from "./components/pmo/PmoResource";
// import PmoList from "./components/pmo/PmoList";
// import ScheduleInterviewPage from "./components/scheduleinterview/ScheduleInterviewPage";
// import ScheduleInterviewList from "./components/scheduleinterview/ScheduleInterviewList";
// import Interview1 from "./components/scheduleinterview/Interview1";
// import Interview2 from "./components/scheduleinterview/Interview2";
// import Interview3 from "./components/scheduleinterview/Interview3";
// import HiringManager from "./components/scheduleinterview/HiringManager";
// import HR from "./components/scheduleinterview/HR";


function App() {
  const[open,setOpen]=useState(false)
  const clickShow = () => {
    open? document.body.classList.remove("nav-collapse"): document.body.classList.add("nav-collapse");
    setOpen(!open); 
  };

  return (
    <div className="App">
  {/* <Table/>  */}
    {/* <Example/> */}
      <Header data={clickShow}/>
      <Sidebar open={open} />
      <Routes>
            <Route exact path="/summary"element={<Summary/>}/>
            <Route exact path="/dsr"element={<DailyStatusReport/>}/>
            
        {/* <Route exact path="/new_rrf" element={<NewRrf/>} />
        <Route exact path="/list_comp" element={<ListrrfComp/>}></Route>
        <Route exact path="/create_new_profile" element={<CreatenewProfile/>}/>
        <Route exact path="/hiring_list" element={<HiringList/>}></Route>
        <Route exact path="/tag_resource" element={<TagResource/>}></Route>
        <Route exact path="/tag_list" element={<TagList/>}></Route>
        <Route exact path="/pmo_resource" element={<PmoResource/>}/>
        <Route exact path="/pmo_list" element={<PmoList/>}/>
        <Route exact path="/" element={<Analytics/>} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/interview1" element={<Interview1/>}/>
        <Route exact path="/interview2" element={<Interview2/>}/>
        <Route exact path="/interview3" element={<Interview3/>}/>
        <Route exact path="/hiringmanager" element={<HiringManager/>}/>
        <Route exact path="/hr" element={<HR/>}/>
        <Route exact path="/schedule_interview" element={<ScheduleInterview/>}/>
        <Route exact path="/schedule_interview_page" element={<ScheduleInterviewPage/>}/>
        <Route exact path="/schedule_interview_list" element={<ScheduleInterviewList/>}/> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
