import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { Home2 } from 'iconsax-react'
import { Briefcase } from 'iconsax-react'

export default function SideNav(){

 
    return(
        
        <Nav className='flex-column mt-5 p-4 pt-0 d-none d-md-block'>
          <div className='bg-dark mb-5 rounded'>
            <LinkContainer to='/' className="mb-4">
              <Nav.Link><Home2/></Nav.Link>
            </LinkContainer>

            <LinkContainer to='/my-songs' className="mb-4">
              <Nav.Link><Briefcase/></Nav.Link>
            </LinkContainer>

            <LinkContainer to='/' className="mb-4">
              <Nav.Link><Briefcase/></Nav.Link>
            </LinkContainer>

            <LinkContainer to='/' className="mb-4">
              <Nav.Link><Briefcase/></Nav.Link>
            </LinkContainer>
            
            <LinkContainer to='/' className="mb-4">
              <Nav.Link><Home2/></Nav.Link>
            </LinkContainer>

            <LinkContainer to='/' className="mb-4">
              <Nav.Link><Briefcase/></Nav.Link>
            </LinkContainer>

          </div>
        </Nav>
    )
}