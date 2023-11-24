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
  GetGallery: () => {
    debugger;
    return apiService.get("movies/family");
  },
  GetDemos: () => {
    return apiService.get("movies/classic");
  },
  GetCourses: () => {
    //action-adventure
    //classic
    //comedy,drama,horror,family,mystery,scifi-fantasy,western
    return apiService.get("movies/animation");
  },
};
