import { Observable } from "rxjs";
import apiService from "./Services";
export const HomeServices = {
  GetNavTabs: () => {
    return [
      { name: "Home", id: "hm" },
      { name: "Gallery", id: "gl" },
      { name: "Courses", id: "crs" },
      { name: "About", id: "abt" },
      { name: "Contact", id: "cnt" },
      { name: "Others", id: "others" },
      { name: "Others", id: "Prasanth" },
    ];
  },
  GetDemos: () => {
    return [
      { demoname: "Demo 1", demoid: "hm" },
      { demoname: "Demo 2", demoid: "gl" },
      { demoname: "Demo 3", demoid: "crs2" },
      { demoname: "Demo 4", demoid: "abt2" },
    ];
  },
  GetCourses: () => {
    return apiService.get("movies/animation");
  },
};
