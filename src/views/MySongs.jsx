import { useState } from "react";
import songsData from "../song/songsdata";
import { Button, Container,Image,Col,Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import { Heart } from "iconsax-react";
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
            <SideNav/>
            <Container className="mt-4">
                <div className="d-flex justify-content-center">
                    <Button variant={display==='collections'?'warning':'dark'} onClick={()=>show('collections')} className="m-1">My Collection</Button>
                    <Button variant={display==='likes'?'warning':'dark'} onClick={()=>show('likes')} className="m-1">My Likes</Button>
                </div>
                {display==='collections'?
                <div className="mt-5">
                    <Row className="justify-content-center">
                        {songsData.myCollection.map((value,i)=>(
                            <Col key={i} xs={12} md={6} lg={4} onClick={()=>navigate(`/${value.abLink}`)}>
                                <Image src={value.coverImg} rounded className="w-100 h-100"/>
                            </Col>
                        ))}
                    </Row>
                </div>:
                 <div className="mt-5 text-white">
                    {songsData.myLikes.length!==0?<Button variant='dark' className='my-1' onClick={()=> dispatch(currentPlaying({music:songsData.myLikes[0],album:songsData.myLikes,loop:true})) }>Play all</Button>:null}
                    <Row className="justify-content-center">
                        {songsData.myLikes.map((info,i)=>(
                            <Col key={i} xs={12} className='my-3 bg-dark rounded w-100 p-2' onClick={()=> dispatch(currentPlaying({music:info,album:songsData.myLikes,loop:false})) }>
                            <Row className="align-items-center">
                                <Col  xs={3}>
                                <Image src={info.thumbnail} alt='' className='ccimg mx-1'/>
                                <Heart className='d-none d-md-inline'/>
                                </Col>
                                <Col xs={6} md={5} className='d-md-flex d-inline justify-content-center artistName'>
                                    {info.title} - {info.artist}
                                </Col>
                                <Col xs={1}>
                                    3.23
                                </Col>
                            </Row>
                        </Col>
                        ))}
                    </Row>
                </div>
                }
            </Container>
            
        </>
    )
}