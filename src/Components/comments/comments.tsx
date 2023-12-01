import './comments.css';
import { Avatar } from '@mui/material';

export default function Comments(){
    return (
        <div className='comments_div'>
        <div style={{width:'5%'}}>
          <Avatar sx={{ backgroundColor: "#ff4500" }} style={{width:'30px', height:'30px', fontSize:'15px'}}>K</Avatar>
        </div> 
        <div style={{width:'95%'}}>
          <p className='comment_from bold'> Comment From</p>
          <p className='comment_description'>This is comment description</p>
        </div> 
      </div>
    )
}