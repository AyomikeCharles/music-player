import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import SideNav from '../components/SideNav'
import { Heart,MusicPlay, PlayAdd } from 'iconsax-react'
import { useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import { useEffect, useState, useRef } from "react";
import mySongsData from "../song/mySongData";

import useSongApi from "../song/songs";

export default function Collections({playListId,writeup,link,cover}){

    const url = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playListId}?index=0&limit=10`

    const {data,loading,error} = useSongApi(url)

    const [InCollection, setInCollection] = useState(false)
    const [like, setLike] = useState(false)

    const dispatch = useDispatch();
    const mainDiv = useRef()

   

    const addToCollection = () => {

        if(mySongsData.myCollection.some(alb => alb.id===playListId)){

            const index = mySongsData.myCollection.indexOf({id:playListId,coverImg:data.picture_big,abLink:link})
            mySongsData.myCollection.splice(index,1)
            setInCollection(false)

          
        }else{
            mySongsData.myCollection.push({id:playListId,coverImg:data.picture_big,abLink:link})
            setInCollection(true)
        }
    }


    const addToLikes = (song) => {

        if(mySongsData.myLikes.includes(song)){
            const indexl = mySongsData.myLikes.indexOf(song)
            mySongsData.myLikes.splice(indexl,1)

        }else{
            mySongsData.myLikes.push(song)
        }
    }

    const likeAlbum = () => {

        if(like===true){
            setLike(false)

        }else{
            setLike(true)
        }

    }

    useEffect(()=>{

        if(mySongsData.myCollection.some(alb => alb.id===playListId)){

            setInCollection(true)

        }else{
     
         setInCollection(false)
        }

    },[])


   

    if(loading)return(
        <div className="d-flex justify-content-center my-5 align-items-center">
            <Spinner animation='border' size='xl' variant='warning'/> 
        </div>
    )

  
  
    return(
        <>
        <div className="d-flex collectionStyle" style={{backgroundImage:`url(${cover}`}} ref={mainDiv}>                 
             <SideNav/>
             {error? <div className="d-flex justify-content-center mx-auto w-50 my-5 align-items-center text-white">unable to fetch data at this time,kindly refresh</div>:
                    
                    <Container className="py-4">
                        <div className="d-block d-md-flex">
                            <Col xs={12} md={6} lg={4} xl={3}>
                                <Image src={data.picture_big} alt='' className='cimg rounded'/>
                            </Col>
                            <Col xs={12} md={6} lg={5} xl={4} className='p-2 text-white'>
                                <h3>{data.title}</h3>
                                <div className='cwriteup text-justify'>{writeup}</div>
                                <div className="mb-1"><span>{data.tracks.data.length} songs </span> - <span> 18 hrs+</span></div>
                                <Button variant='dark' className='m-1'  onClick={()=> dispatch(currentPlaying({music:data.tracks.data[0],album:data.tracks.data,loop:true})) }><MusicPlay color="#ffc107" size='20'/> Play all</Button> 
                                <Button variant='dark' className='m-1' onClick={addToCollection} ><PlayAdd color="#ffc107" size='20'/> {InCollection?'Remove from collection': 'Add to collection'}</Button> 
                                <Button variant='dark' className='m-1' ><Heart onClick={likeAlbum} color='#ffc107' variant={like? 'Bold': 'Linear'} /></Button>  
                            </Col>
                        </div>
                        <div className='text-white mt-4'>
                            {data.tracks.data.map((info,i)=>{

                                const minutes = Math.floor(info.duration / 60);
                                const seconds = info.duration % 60;

                                return(
                                <Col key={i} xs={12} className='my-3 rounded w-100 p-1 crs'>
                                    <Row className="align-items-center">
                                        <Col  xs={4} md={4} lg={3}>
                                        <Image src={info.album.cover_medium} alt='' className='ccimg mx-1' onClick={()=> dispatch(currentPlaying({music:info,album:data.tracks.data,loop:false})) }/>
                                        <Heart size='20'  onClick={()=>addToLikes(info)}/>
                                        </Col>
                                        <Col xs={5} md={5} className='d-md-flex d-inline justify-content-center artistName' onClick={()=> dispatch(currentPlaying({music:info,album:data.tracks.data,loop:false})) }>
                                            {info.title} - {info.artist.name}
                                        </Col>
                                        <Col xs={3} md={2} onClick={()=> dispatch(currentPlaying({music:info,album:data.tracks.data,loop:false})) }>
                                            {`${minutes} : ${seconds}`}
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                            )}

                        </div>
                    </Container>
                    }
        </div>
        </>
    )
}