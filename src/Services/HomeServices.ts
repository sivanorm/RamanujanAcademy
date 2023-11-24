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
    const courses = [
      { crsname: "Course 1", crsid: "hm" },
      { crsname: "Course 2", crsid: "gl" },
      { crsname: "Course 3", crsid: "crs" },
      { crsname: "Course 4", crsid: "abt" },
      { crsname: "Course 5", crsid: "cnt" },
      { crsname: "Course 6", crsid: "crs1" },
      { crsname: "Course 7", crsid: "abt1" },
      { crsname: "Course 8", crsid: "cnt1" },
    ];
    var data = apiService.get("movies/animation");
    debugger;
    return courses;
  },
};
