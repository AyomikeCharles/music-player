import { CloseSquare, HambergerMenu, Home2, More, Music, MusicDashboard, Radio } from 'iconsax-react'
import { useState } from 'react';
import { Col, Image, Navbar, Row } from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import Drawer from '../components/MobileDrawer';
import logo from '../res/mplogo.png'

export default function TopNav(){
    const [open, setOpen] = useState(false)
    const openDrawer = () => {
    
            setOpen(!open)
       
    }

    return(
        <>
            <Navbar bg='dark' expand='md' className='sticky-top navb px-4'>
                
                    <LinkContainer to='/'>
                        <Navbar.Brand><Image src={logo} alt=''/></Navbar.Brand>   
                    </LinkContainer>
                    <span onClick={openDrawer} className='d-inline d-md-none'>
                        <HambergerMenu color='#ffc107'/>
                    </span>                    
                
            </Navbar>

            <Drawer isOpen={open}>
                <Row className='m-4'>
                    <Col xs={10}>
                        <div><Image src={logo} alt=''/></div>
                        <div onClick={openDrawer} className='my-4'><Link style={{textDecoration:'none'}} to='/' className='text-white'> <Home2 color='#ffc107'/> Home</Link></div>
                        <div onClick={openDrawer} className='my-4'><Link style={{textDecoration:'none'}} to='/my-songs' className='text-white'> <MusicDashboard color='#ffc107'/> My Musics</Link></div>
                        <div onClick={openDrawer} className='my-4'><Link style={{textDecoration:'none'}} to='/' className='text-white'> <Radio color='#ffc107'/> Radio</Link></div>
                        <div onClick={openDrawer} className='my-4'><Link style={{textDecoration:'none'}} to='/' className='text-white'> <Music color='#ffc107'/> Music video</Link></div>
                        <div onClick={openDrawer} className='my-4'><Link style={{textDecoration:'none'}} to='/' className='text-white'> <More color='#ffc107'/> More</Link></div>
                    </Col>
                    <Col   xs={1}>
                        <CloseSquare color='#ffc107' onClick={openDrawer}/>
                    </Col>
                </Row>
            </Drawer>
        </>
    )
}