import { useEffect, useRef, useState } from 'react';
import { Container,Row,Col,Image,Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { currentPlaying } from '../features/slicer';
import { Play, Pause, VolumeCross, Next, Previous, VolumeHigh, RepeateOne, Shuffle, RepeateMusic, ArrowDown2} from 'iconsax-react';

export default function Player(){

    

    const audioRef = useRef();
    const rangeRef = useRef();
    const volumeRef = useRef();
    const dispatch = useDispatch()


    const [play, setPlay] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(1)
    const [duration, setDuration] = useState(0)
    const [loopCurrent, setLoopCurrent] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [show, setShow] = useState(false)


    const song = useSelector((state)=>state.musicDetails);
  
    useEffect(()=>{
        if(song.value!==''){
            audioRef.current.src = song.value.preview;
            setPlay(true)
            audioRef.current.play()
        } 
    },[song])

    const updateDuration = () => {
        setDuration(audioRef.current.duration)
    }

    const next = () =>{

        const index = song.album.indexOf(song.value)
        const nextSong = index  + 1;

        if(nextSong > song.album.length){
            dispatch(currentPlaying({music:song.album[0],album:song.album,loop:song.isLoop}))
        }else{
            dispatch(currentPlaying({music:song.album[nextSong],album:song.album,loop:song.isLoop}))
        }
    }

    const previous = () =>{  

        const index = song.album.indexOf(song.value)
        const nextSong = index  - 1;
        

        if(nextSong < 0){
            dispatch(currentPlaying({music:song.album[0],album:song.album,loop:song.isLoop}))
        }else{
            dispatch(currentPlaying({music:song.album[nextSong],album:song.album,loop:song.isLoop}))
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
            if(shuffle){
                shf()
            }else{
                next()
            }
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

   const repeatOne = () =>{
        if(loopCurrent){
            setLoopCurrent(false)
        }else{
            setLoopCurrent(true)
        }
   }

   const shf = () =>{
    const nextSong = Math.floor(Math.random() * song.album.length+1);
    shuffleM(nextSong)
   }
   

const shuffleM = (getShffleSong) =>{
    const index = song.album.indexOf(song.value)

    if(getShffleSong === index ){
         shf()
    }else{
        dispatch(currentPlaying({music:song.album[getShffleSong],album:song.album,loop:song.isLoop}))
        console.log(getShffleSong)
    }
}

const handleShuffle = () => {
    if(shuffle){
        setShuffle(false)
    }else{
        setShuffle(true)
    }
}

const handleModal = () =>{
    setShow(true)
}  


    
    return(
        <>
            <div className="sticky-bottom bg-c text-white">
                <Container>
                    <Row className='align-items-center'>
                        <Col xs={2} md={1} onClick={handleModal}>
                            <Image src={song.value?.album?.cover_medium} alt='' className='w-100'/>
                        </Col>
                        <Col xs={5} md={2} onClick={handleModal}>
                            <span className=''>{song.value?.title}</span><br/>
                            <span>{song.value?.artist?.name}</span>
                        </Col>
                        <Col xs={4} md={6} className='p-3'>
                            <div className='d-flex justify-content-center'>

                                <span className='mx-3 d-none d-md-inline'>
                                    <Shuffle onClick={handleShuffle} color={shuffle?'#ffc107':'gray'}/>
                                </span>
                                
                                <span onClick={previous} className='mx-2'>
                                    <Previous color='#ffc107'/>
                                </span>
                                <span onClick={playPause} className='mx-2'>
                                    {play?<Pause color='#ffc107'/>:<Play color='#ffc107'/>}
                                </span>
                               
                               <span onClick={next} className='mx-2'>
                                    <Next color='#ffc107'/>
                               </span>

                               <span className='mx-3 d-none d-md-inline'>
                                    {loopCurrent?<RepeateOne onClick={repeatOne} color='#ffc107'/>:<RepeateMusic color='#ffc107' onClick={repeatOne}/>}
                               </span>
                                
                                
                            </div>
                            <div className='d-none d-md-inline'>
                                
                                <input type='range' min='0' max={duration} className='w-100' ref={rangeRef} onChange={controlMusic} value={progress}/>
                            </div>
                            
                            
                            <audio controls ref={audioRef} className='d-none' onLoadedMetadata={updateDuration} onTimeUpdate={updateProgress} loop={loopCurrent}>
                                <source src={song.value?.preview} type='audio/ogg'/>
                                <source src={song.value?.preview} type='audio/mpeg'/>
                                <source src={song.value?.preview} type='audio/mp3'/>
                            </audio>
                        </Col>
                        <Col md={3} className='d-none d-md-inline'>
                            {volume>0?<VolumeHigh color='#ffc107'/>:<VolumeCross color='#ffc107'/>}
                            <input type='range' ref={volumeRef} onChange={changeVolume} step='0.1' min='0' max='1' value={volume} className='mx-1'/>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal show={show} fullscreen={true} contentClassName='my-modal' onHide={()=>setShow(false)}>
                
                <Modal.Body>
                    <ArrowDown2 color='#ffc107' onClick={()=>setShow(false)}/>

                    <div className='mx-auto modal-inner-content my-5'>

                    <Col xs={9} md={6} className='mx-auto'>
                        <Image src={song.value?.album?.cover_big} alt='' className='w-100'/>
                    </Col>
                    <Col className='text-white text-center mx-auto my-4' xs={9} md={5}>
                        <span className=''>{song.value?.title}</span>
                        <span>{song.value?.artist?.name}</span>
                    </Col>
                    <Col className='p-3'>
                            <div className='d-flex justify-content-center'>

                                <span className='mx-3'>
                                    <Shuffle onClick={handleShuffle} color={shuffle?'#ffc107':'gray'}/>
                                </span>
                                
                                <span onClick={previous} className='mx-2'>
                                    <Previous color='#ffc107'/>
                                </span>
                                <span onClick={playPause} className='mx-2'>
                                    {play?<Pause color='#ffc107'/>:<Play color='#ffc107'/>}
                                </span>
                               
                               <span onClick={next} className='mx-2'>
                                    <Next color='#ffc107'/>
                               </span>

                               <span className='mx-2'>
                                    {loopCurrent?<RepeateOne onClick={repeatOne} color='#ffc107'/>:<RepeateMusic color='#ffc107' onClick={repeatOne}/>}
                               </span>
                                
                                
                            </div>
                            <div>
                                
                                <input type='range' min='0' max={duration} className='w-100' ref={rangeRef} onChange={controlMusic} value={progress}/>
                            </div>
                        </Col>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}