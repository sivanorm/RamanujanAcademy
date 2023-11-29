import Course from "../Components/CourseModule/Course";
import CoursesComponent from "../Components/Courses/CoursesComponent";
import GalleryComponent from "../Components/Gallery/GalleryComponent";
import HomeComponent from "../Components/Home/HomeComponent";
import SignUp from "../Components/Signup/Signup";
import LogIn from "../Components/login/login";

export const components = [
  { path: "/", isReqAuth: false, component: <HomeComponent /> },
  { path: "gallery", isReqAuth: true, component: <GalleryComponent /> },
  { path: "courses", isReqAuth: true, component: <CoursesComponent /> },
  { path: "course", isReqAuth: true, component: <Course /> },
  { path: "login", isReqAuth: false, component: <LogIn /> },
  { path: "signup", isReqAuth: false, component: <SignUp /> },
];

export const MenuTabs = [
  {
    id: 1,
    index: 0,
    name: "Home",
    to: "/",
  },
  {
    id: 2,
    index: 1,
    name: "Gallery",
    to: "gallery",
  },
  {
    id: 3,
    index: 2,
    name: "Courses",
    to: "courses",
  },
  {
    id: 4,
    index: 3,
    name: "About",
    to: "about",
  },
  {
    id: 5,
    index: 4,
    name: "Contact",
    to: "contact",
  },
];
