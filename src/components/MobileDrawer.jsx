import { useEffect } from 'react';
export default function Drawer({isOpen,children}){
    useEffect(()=>{
       
    },[isOpen])
    const drawerOpen = {
           left:'0',
           top:'0', 
    }

    const drawerClose = {
        left:'-1000px',
        top:'0',
 }
    return(
        <>
            <div className="drawer d-block d-md-none" style={isOpen?drawerOpen:drawerClose}>
                {children}
            </div>
        </>
    )
}