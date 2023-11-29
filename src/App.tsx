import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FireAuthRequired from "./Authentications/firebase/Context/FireAuthRequired";
import { FireBaseAuthContext } from "./Authentications/firebase/Context/firebase-auth-context";
import HomeComponent from "./Components/Home/HomeComponent";
import { MenuTabs, components } from "./Modules/HomeModule";

const App = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(FireBaseAuthContext);
  const defaultRoute = MenuTabs.find((tab) => tab.index == 0);
  const [activeTab, setActiveTab] = useState(defaultRoute?.index);
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="main_title">
          <h1 className="my-title">
            Ramanujan Academy
            <span className="profile_icon">
              {currentUser ? (
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                  {currentUser?.email
                    ? currentUser?.email.slice(0, 1).toLocaleUpperCase()
                    : "N"}
                </Avatar>
              ) : (
                ""
              )}
            </span>
          </h1>
        </div>
        <div className="nav_div">
          <ul className="jb_nav">
            {MenuTabs.map((tab) => (
              <li>
                <NavLink
                  id={"Nav_" + tab.id}
                  to={tab.to}
                  className={
                    activeTab == tab.index
                      ? "menu_nav menu_nav_active"
                      : "menu_nav"
                  }
                  onClick={() => {
                    if (!currentUser) {
                      //if Log out Add code
                      setActiveTab(0);
                    } else setActiveTab(tab.index);
                  }}
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
            {currentUser ? (
              <li onClick={handleSignOut}>
                <PowerSettingsNewIcon />
              </li>
            ) : (
              <li
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </li>
            )}
          </ul>
        </div>
      </header>
      <Routes>
        {components.map((item) =>
          item.isReqAuth ? (
            <Route
              path={item.path}
              element={<FireAuthRequired>{item.component}</FireAuthRequired>}
            ></Route>
          ) : (
            <Route path={item.path} element={item.component}></Route>
          )
        )}
        <Route path="*" element={<HomeComponent />} />
      </Routes>
    </div>
  );
};
export default App;
