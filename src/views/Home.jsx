import { Container,Col,Row,Image } from 'react-bootstrap';
import awoman from '../res/img2.jpg';
import SideNav from '../components/SideNav';
// import Carousel from '../components/carousel';
// import songsData from '../song/songsdata';
import { useNavigate } from 'react-router-dom';

export default function Home(){

    const topChart = [
        {pic: awoman, textOne:'Top Song', textTwo:'Rema',textThree:'03:47', link:'/topsong'},
        {pic: awoman, textOne:'Popular Song', textTwo:'Rema',textThree:'03:47', link:'/popularsong'},
        {pic: awoman, textOne:'Best Song', textTwo:'Rema',textThree:'03:47', link:'/bestsong'},
    ]

    const navigate = useNavigate();

    return(
        
        <>
            <SideNav/>
            <Container className='py-4'>
                <Container fluid>
                    <Row>
                        
                        <Col className="position-relative" xs={12} md={8}>
                            <div className="mainImg-overlay">
                                this is a text
                            </div>
                            <div className='w-100'>
                                <Image src={awoman} rounded className="mainImg"/>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <h1 className="font-weight-bold text-light">Top Chart</h1>
                            <Container>
                                {topChart.map((val,i)=>(
                                    <Col key={i} className="bg-dark rounded mb-4 text-light">
                                        <Container className="p-0">
                                            <Row className="align-items-center">
                                                <Col xs={4} onClick={()=>navigate(val.link)}>
                                                    <Image src={val.pic} rounded className="topChart"/>
                                                </Col>
                                                <Col xs={4} onClick={()=>navigate(val.link)}>
                                                    <span>{val.textOne}</span><br/>
                                                    <span>{val.textTwo}</span><br/>
                                                    <span>{val.textThree}</span>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                ))}
                                
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <div className='w-100'>
                    <div>
                        {/* <h4 className='text-light'>New Release</h4>
                        <Carousel props={songsData.collections}/>
                    </div>
                    <div>
                        <h4 className='text-light'>In your area</h4>
                        <Carousel props={songsData.Chart}/> */}
                    </div>
                </div>
            </Container>
        </>
    )
}