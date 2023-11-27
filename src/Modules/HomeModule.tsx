import CoursesComponent from "../Components/Courses/CoursesComponent";
import GalleryComponent from "../Components/Gallery/GalleryComponent";
import HomeComponent from "../Components/Home/HomeComponent";

export const components = [<HomeComponent />, <CoursesComponent />];

export const MenuTabs = [
  {
    id: 1,
    index: 0,
    name: "Home",
    path: "",
    isReqAuth: false,
    component: <HomeComponent />,
  },
  {
    id: 2,
    index: 1,
    name: "Gallery",
    path: "gallery",
    isReqAuth: false,
    component: <GalleryComponent />,
  },
  {
    id: 3,
    index: 2,
    name: "Courses",
    path: "courses",
    isReqAuth: true,
    component: <CoursesComponent />,
  },
  {
    id: 4,
    index: 3,
    name: "About",
    path: "about",
    isReqAuth: false,
    component: <HomeComponent />,
  },
  {
    id: 5,
    index: 4,
    name: "Contact",
    path: "contact",
    isReqAuth: false,
    component: <HomeComponent />,
  },
];
