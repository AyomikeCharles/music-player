import { HambergerMenu } from 'iconsax-react'
import { ClipboardClose } from 'iconsax-react';
import { useState } from 'react';
import { Navbar } from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import Drawer from '../components/MobileDrawer';

export default function TopNav(){
    const [open, setOpen] = useState(false)
    const openDrawer = () => {
    
            setOpen(!open)
       
    }

    return(
        <>
            <Navbar bg='dark' expand='md' className='navb px-4'>
                
                    <LinkContainer to='/'>
                        <Navbar.Brand>LOGO</Navbar.Brand>   
                    </LinkContainer>
                    <span onClick={openDrawer} className='d-inline d-md-none'>
                        <HambergerMenu color='#ffc107'/>
                    </span>                    
                
            </Navbar>

            <Drawer isOpen={open}><ClipboardClose color='#ffc107' onClick={openDrawer}/></Drawer>
        </>
    )
}