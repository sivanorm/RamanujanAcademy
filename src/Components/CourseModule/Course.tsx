import "./Course.css";
import SkeletonComp from "../skeleton/skeleton";
import { HomeServices } from "../../Services/Home/HomeServices";
import { useState, useEffect } from 'react'
import { Rating } from "@mui/material";
import Comments from "../comments/comments";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';

export default function CurrentComponent() {
  const handleClick = ()=>{

  }
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const result = await HomeServices.GetGallery();
        setdata(result);
        console.log(result)
        setLoading(false);
      }catch(error){
        console.error(error)
      }
    };
    fetchData();
  })
  return (
    <>
      <div className="container-fluid">
        <div className="currentcourse_title">{/* <h4>Welcome to </h4> */}</div>
        <div className="row mt-3">
          <div className="col-md-8">
            <div>
              <video controls width={"100%"} />
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9">
                  <p>Video full description</p>
                </div>
                <div className="col-md-3 py-2 d-flex justify-content-around">
                   <ThumbUpIcon/>
                   <ThumbDownIcon/>
                   <StarIcon/>
                </div>
              </div>
            </div>
            <Comments/>
          </div>
          <div className="col-md-4">
            <div className="courses_list">
              {loading
               ?
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <SkeletonComp key={item} />
                ))
                :data?.map((pr: any) => (
                  
                  <div className="container-flid mb-2" key={pr?.id} onClick={handleClick}>
                    <div className="row cc_list container-fluid">
                      <div className="col-md-6" style={{padding:'8px', paddingLeft:'0px'}}>
                        <div className="cc_thumbnail_div">
                          <img src={pr?.posterURL} alt=""/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{paddingTop: '15px'}}>
                          {/* <div className="avatar_div">
                            <Avatar sx={{ backgroundColor: "#ff4500" }}>K</Avatar>
                          </div>
                          <div className="rating_div"> */}
                            {/* <p className="course_title">{pr.title}</p> */}
                            <p>{pr.title}</p>
                            <Rating name="hover-feedback" className="cc_rating"/>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                    {/* <img src={pro?.posterURL} /> */}
                  </div>
                  
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function CourseList() {
//   return (
//     <>
//       <div className="row mb-3">
//         <div className="col-md-6">
//           <div className="course_list">
//             <img src="" alt="" />
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h5 className="course_list_item">list</h5>
//           <div className="row">
//             <div className="col-md-8"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
