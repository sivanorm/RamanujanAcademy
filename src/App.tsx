import "bootstrap/dist/css/bootstrap.min.css";
import { MenuTabs } from "./Modules/HomeModule";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import DraggableDialog from "./Components/login/login";
import { useEffect, useState } from "react";
import FireAuthRequired from "./Authentications/firebase/Context/FireAuthRequired";
import { signInUser } from "./Authentications/firebase/firebase";
const App = () => {
  const defaultRoute = MenuTabs.find((tab) => tab.index == 0);
  const [activeTab, setActiveTab] = useState(defaultRoute?.index);
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        // Send the email and password to firebase
        debugger;
        const userCredential = await signInUser(
          "sivanormsoft@gmail.com",
          "Prasanth@24"
        );
        if (userCredential) alert("Login Successfully");
        else alert("invalid Credentials");
      } catch (error: any) {
        alert("User Sign In Failed due to Error");
      }
    };
    handleSubmit();
  }, []);
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
            {MenuTabs.map((tab) => (
              <li>
                <NavLink
                  id={"Nav_" + tab.id}
                  to={tab.path}
                  className={
                    activeTab == tab.index
                      ? "menu_nav menu_nav_active"
                      : "menu_nav"
                  }
                  onClick={() => {
                    setActiveTab(tab.index);
                  }}
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Routes>
        {MenuTabs.map((tab) =>
          tab.isReqAuth ? (
            <FireAuthRequired>
              <Route path={tab.path} element={tab.component}></Route>
            </FireAuthRequired>
          ) : (
            <Route path={tab.path} element={tab.component}></Route>
          )
        )}
        <Route
          path="*"
          element={defaultRoute ? defaultRoute.component : null}
        />
      </Routes>
    </div>
  );
};
export default App;
