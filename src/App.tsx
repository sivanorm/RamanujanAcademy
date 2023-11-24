import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import CoursesComponent from "./Components/Courses/CoursesComponent";
import { HomeServices } from "./Services/HomeServices";
import HomeComponent from "./Components/Home/HomeComponent";
import GalleryComponent from "./Components/Gallery/GalleryComponent";
const App = () => {
  const [activeNav, setActiveNav] = useState("hm");
  return (
    <div className="App">
      <header className="App-header">
        <div className="main_title">
          <h1 className="my-title">Ramanujan Academy</h1>
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
        (activeNav == "gl" && <GalleryComponent></GalleryComponent>)}
    </div>
  );
};
export default App;
