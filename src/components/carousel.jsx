// import { useRef } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useDispatch } from 'react-redux';
// import { currentPlaying } from '../features/slicer';

// export default function Carousel({props}){

//     const dispatch = useDispatch();

//     const slider = useRef(null)

//     var settings = {
//       Infinite:true,
//       speed:500,
//       centerMode:true,
//       centerPadding:'60px',
//       slidesToShow:5,
//       slidesTocrool:1,
//       autoplay:false,
//       lazyload:true,
//       autoplaySpeed:6000,
//       arrows: false,
//       prevArrow:false,
//       nextArrow:false,
//       responsive:[
//         {
//             breakpoint:1024,
//             settings:{
//                 slidesToShow:3
//             }
//         },
//         {
//             breakpoint:600,
//             settings:{
//                 slidesToShow:2
//             }
//         },
//         {
//             breakpoint:480,
//             settings:{
//                 slidesToShow:1
//             }
//         }
//       ]
//     }
    
//     return(
//         <>
        
//         <Slider ref={slider} {...settings}>
//             {props.map((info,i)=>(
//                 <div key={i}>
//                     <img src={info.thumbnail} onClick={()=> dispatch(currentPlaying(info)) } alt='' className='cimg' />
//                 </div>
//             ))}
                
//         </Slider>
//         </>
//     )
// }