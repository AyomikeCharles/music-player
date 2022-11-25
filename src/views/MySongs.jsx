import { useState } from "react";
import { Button, Container,Image,Col,Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import mySongsData from "../song/mySongData";
import SideNav from "../components/SideNav";

export default function MySongs(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [display, setDisplay] = useState('collections');

    const show = (val) =>{
        setDisplay(val)
    }

    return(
        <>
        <div className='d-flex'>
            <SideNav/>
            <Container className="mt-4">
                <div className="d-flex justify-content-center">
                    <Button variant={display==='collections'?'warning':'dark'} onClick={()=>show('collections')} className="m-1">My Collection</Button>
                    <Button variant={display==='likes'?'warning':'dark'} onClick={()=>show('likes')} className="m-1">My Likes</Button>
                </div>
                {display==='collections'?
                <div className="mt-5">
                    <Row className="justify-content-center">
                        {mySongsData.myCollection.map((value,i)=>(
                            <Col key={i} xs={12} md={6} lg={4} xl={2} className='p-3' onClick={()=>navigate(`/${value.abLink}`)}>
                                <Image src={value.coverImg} rounded className="w-100 h-100"/>
                            </Col>
                        ))}
                    </Row>
                </div>:
                 <div className="mt-5 text-white">
                    {mySongsData.myLikes.length!==0?<Button variant='dark' className='my-1' onClick={()=> dispatch(currentPlaying({music:mySongsData.myLikes[0],album:mySongsData.myLikes,loop:true})) }>Play all</Button>:null}
                    <div className="justify-content-center">
                        {mySongsData.myLikes.map((info,i)=>{
                            const minutes = Math.floor(info.duration / 60);
                            const seconds = info.duration % 60;
                            return(
                            <Col key={i} xs={12} className='my-3 crs rounded w-100 p-1' onClick={()=> dispatch(currentPlaying({music:info,album:mySongsData.myLikes,loop:false})) }>
                            <Row className="align-items-center">
                                <Col  xs={3}>
                                <Image src={info.album.cover_medium} alt='' className='ccimg'/>
                                </Col>
                                <Col xs={6} md={5} className='d-md-flex d-inline justify-content-center artistName'>
                                    {info.title} - {info.artist.name}
                                </Col>
                                <Col xs={3} md={2}>
                                {`${minutes} : ${seconds}`}
                                </Col>
                            </Row>
                        </Col>
                        )})}
                    </div>
                </div>
                }
            </Container>
            </div>
        </>
    )
}