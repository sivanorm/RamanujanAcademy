import apiService from "../Services";

export const HomeServices = {
  GetGallery: () => {
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
