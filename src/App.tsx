import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import CoursesComponent from "./Components/Courses/CoursesComponent";
import GalleryComponent from "./Components/Gallery/GalleryComponent";
import HomeComponent from "./Components/Home/HomeComponent";
import { HomeServices } from "./Services/HomeServices";
// import LoginComponent from "./Components/login/login";
import "./App.css";
// import CurrentComponent from "./Components/currentComponent/currentcomponent";
import DraggableDialog from "./Components/login/login";
import CurrentComponent from "./Components/currentComponent/currentcomponent";
const App = () => {
  const [activeNav, setActiveNav] = useState("hm");
  return (
    <div className="App">
      <header className="App-header">
        <div className="main_title">
          <h1 className="my-title">
            Ramanujan Academy
            <span className="profile_icon">
              <DraggableDialog />              
            </span>
          </h1>
        </div>
        <div className="nav_div">
          <ul className="jb_nav">
            {HomeServices.GetNavTabs().map((tab) => (
              <li
                key={tab.id}
                id={tab.id}
                className={activeNav == tab.id ? "menu_nav_active" : "menu_nav"}
                onClick={() => {
                  setActiveNav(tab.id);
                }}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
      {(activeNav == "hm" && <HomeComponent></HomeComponent>) ||
        (activeNav == "crs" && <CoursesComponent></CoursesComponent>) ||
        (activeNav == "gl" && <GalleryComponent></GalleryComponent>) ||
        (activeNav == "abt" && <CurrentComponent></CurrentComponent>)
        }
    </div>
  );
};
export default App;
