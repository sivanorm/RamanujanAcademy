import Course from "../Components/CourseModule/Course";
import CoursesComponent from "../Components/Courses/CoursesComponent";
import GalleryComponent from "../Components/Gallery/GalleryComponent";
import ImageUpload from "../Components/Gallery/ImageUpload";
import HomeComponent from "../Components/Home/HomeComponent";
import SignUp from "../Components/Signup/Signup";
import LogIn from "../Components/login/login";

export const components = [
  { path: "/", isReqAuth: false, component: <HomeComponent /> },
  { path: "gallery", isReqAuth: true, component: <GalleryComponent /> },
  { path: "imageupload", isReqAuth: true, component: <ImageUpload /> },
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
    name: "Upload",
    to: "imageupload",
  },
  {
    id: 4,
    index: 3,
    name: "Courses",
    to: "courses",
  },
  {
    id: 5,
    index: 4,
    name: "About",
    to: "about",
  },
  {
    id: 6,
    index: 5,
    name: "Contact",
    to: "contact",
  },
];
