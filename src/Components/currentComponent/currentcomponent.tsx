import './currentcomponent.css'
export default function CurrentComponent(){
    return(
        <>
         <div className="container-fluid">
          <div className="currentcourse_title">
            {/* <h4>Welcome to </h4> */}
          </div>
          <div className="row mt-3">
            <div className="col-md-8">
              <div><video controls width={'100%'}/></div>
              <p>Video full description</p>
            </div>
            <div className="col-md-4">
              <div className='courses_list'>
              {
                [1,2,3,4,5,6,7,8,9,10].map((item) => (
                   <CourseList key={item}/> 
                ))}
              </div>
            </div>
          </div>
         </div>
        </>
    )
}

function CourseList(){
    return(
        <>
         <div className="row mb-3">
           <div className="col-md-6">
            <div className="course_list">
              <img src="" alt="" />
            </div>
           </div>
           <div className="col-md-6">
            <h5 className="course_list_item">list</h5>
            <div className='row'>
              <div className='col-md-8'></div>
            </div>
           </div>
         </div>
        </>
    )
}