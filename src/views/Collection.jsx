import { Button, Col, Container, Image, Row } from "react-bootstrap";
import SideNav from '../components/SideNav'
import { Heart } from 'iconsax-react'
import { useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import { useEffect, useState } from "react";
import songsData from "../song/songsdata";

export default function Collections({songs,cover,link,name,writeup}){
    const dispatch = useDispatch();
    const [InCollection, setInCollection] = useState(false)
    const [like, setLike] = useState(false)


    useEffect(()=>{
        document.body.classList.add('collectionStyle');
        document.body.style.backgroundImage = `url(${cover})`;

        return()=>{
            document.body.classList.remove('collectionStyle');
            document.body.style.backgroundImage = null;
        }
    },[])
   
    const addToCollection = () => {

        if(songsData.myCollection.some(alb => alb.albumName===name)){

            const index = songsData.myCollection.indexOf({albumName:name,coverImg:cover,abLink:link,musics:songs})
            songsData.myCollection.splice(index,1)
            setInCollection(false)

        }else{
         songsData.myCollection.push({albumName:name,coverImg:cover,abLink:link,musics:songs})
         setInCollection(true)
        }

    }

    const addToLikes = (songName) => {

        if(songsData.myLikes.includes(songName)){
            const indexl = songsData.myLikes.indexOf(songName)
            songsData.myCollection.splice(indexl,1)
            setLike(false)

        }else{
            songsData.myLikes.push(songName)
            setLike(true)
        }

    }
  
    return(
        <>
            <SideNav/>
                <Container className="py-4">
                    <div className="d-block d-md-flex">
                        <Col xs={12} md={6} lg={4}>
                            <Image src={cover} alt='' className='cimg rounded'/>
                        </Col>
                        <Col xs={12} md={6} lg={6} className='p-2 text-white'>
                            <h3>{name}</h3>
                            <div className='cwriteup text-justify'>{writeup}</div>
                            <div className="mb-1"><span>{songs.length} songs </span> - <span> 18 hrs+</span></div>
                            <Button variant='dark' className='my-1' onClick={()=> dispatch(currentPlaying({music:songs[0],album:songs,loop:true})) }>Play all</Button> <Button variant='dark' className='my-1' onClick={addToCollection}>{InCollection?'Remove from collection': 'Add to collection'}</Button> <Button variant='dark' className='my-1'><Heart/></Button>  
                        </Col>
                    </div>
                    <div className='text-white mt-4'>
                        {songs.map((info,i)=>(
                            <Col key={i} xs={12} className='my-3 bg-dark rounded w-100 p-2' onClick={()=> dispatch(currentPlaying({music:info,album:songs,loop:false})) }>
                                <Row className="align-items-center">
                                    <Col  xs={3}>
                                    <Image src={info.thumbnail} alt='' className='ccimg mx-1'/>
                                    <Heart className='d-none d-md-inline' onClick={()=>addToLikes(info)}/>
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

                    </div>
                </Container>
            
        </>
    )
}