import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import { Image, Spinner } from 'react-bootstrap';

import useSongApi from "../song/songs";

export default function Carousel({props}){

    const url = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${props}?index=0&limit=8`

    const {data,loading,error} = useSongApi(url)

    const dispatch = useDispatch();

    const slider = useRef(null)

    var settings = {
      Infinite:true,
      speed:500,
      slidesToShow:6,
      slidesTocrool:1,
      autoplay:false,
      lazyload:true,
      autoplaySpeed:6000,
      arrows: false,
      prevArrow:false,
      nextArrow:false,
      responsive:[
        {
            breakpoint:1024,
            settings:{
                slidesToShow:4
            }
        },
        {
            breakpoint:600,
            settings:{
                slidesToShow:3
            }
        },
        {
            breakpoint:480,
            settings:{
                slidesToShow:2
            }
        }
      ]
    }

    if(loading)return(
        <div className="d-flex justify-content-center my-5 align-items-center">
            <Spinner animation='border' size='xl' variant='warning'/> 
        </div>
    )
    
    return(
        <>
        {error?<div>unable to fetch carousel data, kindly refresh</div>:
        <Slider ref={slider} {...settings}>
            {data.tracks.data.map((info,i)=>(
                <div key={i} className='text-white'>
                    <Image src={info.album.cover_medium} onClick={()=> dispatch(currentPlaying({music:info,album:data.tracks.data,loop:false})) } alt='' className='cimg rounded' />
                    <div className='ct'>{info.title}</div>
                    <div className='ct'>{info.artist.name}</div>
                </div>
            ))}
                
        </Slider>}
        </>
    )
}