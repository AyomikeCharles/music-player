import { useEffect, useRef, useState } from 'react';
import { Container,Row,Col,Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import { Play, Pause, Volume, VolumeCross, Next, Previous } from 'iconsax-react';

export default function Player(){

    

    const audioRef = useRef();
    const rangeRef = useRef();
    const volumeRef = useRef();
    const dispatch = useDispatch()


    const [play, setPlay] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(1)


    const song = useSelector((state)=>state.musicDetails);
  
    useEffect(()=>{
        audioRef.current.src = song.value.audio
        setPlay(true)
        audioRef.current.play()
    },[song])

    const next = () =>{
        const nextSong = song.value.id  + 1;

        if(nextSong > song.album.length){
            dispatch(currentPlaying({music:song.album[0],album:song.album}))
        }else{
            dispatch(currentPlaying({music:song.album[nextSong-1],album:song.album}))
        }
    }

    const previous = () =>{
        const nextSong = song.value.id  - 1;

        if(nextSong === 0 ){
            dispatch(currentPlaying({music:song.album[0],album:song.album}))
        }else{
            dispatch(currentPlaying({music:song.album[nextSong-1],album:song.album}))
        }
    }

    const playPause = () =>{
        if(play===true){
            setPlay(!play);
            audioRef.current.pause();
        }else{
            setPlay(true);
            audioRef.current.play();
        }
    }

    const updateProgress = () =>{
        if(play){
            setProgress(audioRef.current.currentTime)
        }

        if(song.isLoop){
            loopFun()
        }
    }

    const loopFun = () => {
        if(audioRef.current.currentTime === audioRef.current.duration){
            next();
        }
    }

    const controlMusic = () =>{
        const update = rangeRef.current.value
        audioRef.current.currentTime = update
        setProgress(audioRef.current.currentTime)
    }

   const changeVolume = () =>{
    const newVolume = volumeRef.current.value;
    audioRef.current.volume = newVolume;
    setVolume(audioRef.current.volume)
   }

    
    return(
        <>
            <div className="sticky-bottom bg-c text-white">
                <Container>
                    <Row className='align-items-center'>
                    <Col xs={2} md={1}>
                            <Image src={song.value.thumbnail} alt='' className='w-100'/>
                        </Col>
                        <Col xs={5} md={2}>
                            <span className=''>{song.value.title}</span><br/>
                            <span>{song.value.artist}</span>
                        </Col>
                        <Col xs={4} md={6} className='p-3'>
                            <div className='d-flex justify-content-center'>
                                
                                <span onClick={previous}>
                                    <Previous/>
                                </span>
                                <span onClick={playPause} className='mx-1'>
                                    {play?<Pause/>:<Play/>}
                                </span>
                               
                               <span onClick={next}>
                                    <Next/>
                               </span>
                                
                                
                            </div>
                            <div className='d-none d-md-inline'>
                                
                                <input type='range' min='0' max='300' className='w-100' ref={rangeRef} onChange={controlMusic} value={progress}/>
                            </div>
                            
                            
                            <audio controls ref={audioRef} className='d-none' onTimeUpdate={updateProgress} >
                                <source src={song.value.audio} type='audio/ogg'/>
                                <source src={song.value.audio} type='audio/mpeg'/>
                                <source src={song.value.audio} type='audio/mp3'/>
                            </audio>
                        </Col>
                        <Col md={3} className='d-none d-md-inline'>
                            <Volume/>
                            <input type='range' ref={volumeRef} onChange={changeVolume} step='0.1' min='0' max='1' value={volume}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}