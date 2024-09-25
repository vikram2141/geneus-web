import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow
  } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className='bg-dark bg-gradient text-center text-white text-lg-left mb-0'>
      <MDBContainer className='p-2'>
        <MDBRow>
          <MDBCol lg='3' md='6' className='mb-1 mb-md-0'>
            <h5 className='text-white fs-5'>Geneus Solutions</h5>

            <ul className='list-unstyled mb-0 fs-12 fw-lighter ml-0'>
              <li>
                Provides the best contents for learning in an affordable price.
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-1 mb-md-0 mt-2'>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-white fs-6'>
                  Terms
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-1 mb-md-0 mt-2'>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-white fs-6'>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-1 mb-md-0 mt-2'>
            <h6 className='mb-0 fs-6'>&copy;2023 Geneus Solutions</h6> 
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
}

export default Footer;
