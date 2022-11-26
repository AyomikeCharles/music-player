import error from '../res/error404.png';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SideNav from '../components/SideNav'

export default function Error(){
    return(
        <>
            <div className='d-flex'>
            <SideNav/>
                    <div className='error-width mx-auto'>
                        <div className="d-flex justify-content-center">
                            <Image src={error} alt='' className='mx-auto eimgw'/>
                        </div>
                        <h6 className='text-white text-center'>the page you are looking for is either under construction or unavilable</h6>
                        <div className="d-flex justify-content-center mb-5 mt-3">
                            <Button className variant='dark'><Link to='/' style={{textDecoration:'none',color:'white'}}>Return to home</Link></Button>
                        </div>
                    </div>
            </div>
        </>
    )
}