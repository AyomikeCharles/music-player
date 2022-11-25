import { Container,Col,Row,Image } from 'react-bootstrap';
import awoman from '../res/img2.jpg';
import SideNav from '../components/SideNav';
import { Heart } from 'iconsax-react'
import simg from '../res/img1.jpg'
import Carousel from '../components/carousel';
import { useNavigate } from 'react-router-dom';

export default function Home({playlist}){

    const navigate = useNavigate();

    return(
        
        <>
        <div className='d-flex'>
            <SideNav/>
            <Container className='py-4'>
                <Container fluid>
                    <Row>
                        
                        <Col className="position-relative" xs={12} md={8}>
                            <div className="mainImg-overlay text-white p-4">
                                <h5 className='pb-5'>Curated Playlist</h5>
                                <h1 className='pt-5'>R {'&'} B Hits</h1>
                                <p className='wrup  mb-5'>Name of songs, Name of songs, Name of songs, Name of songs, Name of songs</p>
                                <span className='mt-5'><Image src={simg} alt='' className='simg' /> <Heart color='#ffc107'/> <span>41k Likes</span></span>
                            </div>
                            <div className='w-100'>
                                <Image src={awoman} rounded className="mainImg"/>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <h1 className="font-weight-bold text-light">Top Chart</h1>
                            <Container>
                                {playlist.map((val,i)=>(
                                    <Col key={i} className="bg-dark rounded mb-4 text-light">
                                        <Container className="p-0">
                                            <Row className="align-items-center">
                                                <Col xs={5} onClick={()=>navigate(val.link)}>
                                                    <Image src={val.image} rounded className="topChart"/>
                                                </Col>
                                                <Col xs={7} onClick={()=>navigate(val.link)}>
                                                    <div>{val.title}</div>
                                                    <div>{val.info}</div>
                                                    
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                ))}
                                
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <div className='w-100 mt-4'>
                    <div>
                        <h4 className='text-light'>New Release</h4>
                        <Carousel props='1367122365'/>
                    </div>
                    <div>
                        <h4 className='text-light'>In your area</h4>
                        <Carousel props='1440614715'/>
                    </div>
                </div>
            </Container>
            </div>
        </>
    )
}