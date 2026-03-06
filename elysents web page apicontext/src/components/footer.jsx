import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#E5E4D7', padding: '60px 0 20px 0', fontFamily: 'serif', color: '#333' }}>
      <Container fluid className="px-5">
        <Row className="gy-4">
          
          <Col lg={3} md={6}>
             
            <img src='https://elyscents.pk/cdn/shop/files/logo_size.png?v=1703577106&width=320' className='logo-text'/>
          
          </Col>

          <Col lg={2} md={6}>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem', lineHeight: '2' }}>
              <li>Return & Exchange Policy</li>
              <li>Track Order</li>
              <li>Search</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Blog</li>
              <li>Refund Policy</li>
              <li>Terms of Service</li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-uppercase mb-4" style={{ letterSpacing: '2px', fontWeight: '600' }}>Sign up and save</h6>
            <p style={{ fontSize: '0.9rem', marginBottom: '30px' }}>
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="position-relative border-bottom border-dark pb-2 mb-4 d-flex align-items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ 
                  border: 'none', 
                  background: 'transparent', 
                  width: '100%', 
                  outline: 'none',
                  fontSize: '0.9rem'
                }} 
              />
              <FaEnvelope />
            </div>
            <div className="d-flex gap-3 fs-5">
              <FaInstagram />
              <FaFacebookF />
              <FaYoutube />
              <FaTiktok />
            </div>
          </Col>

          <Col lg={4} md={6}>
            <h6 className="text-uppercase mb-4" style={{ letterSpacing: '2px', fontWeight: '600' }}>Talk to us</h6>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p className="mb-3"><strong>Chat With Us</strong><br />Monday – Saturday: 10am-10pm PST</p>
              
              <p className="mb-3">Address: A219 block 3 KDA Market Gulshan e Iqbal Near Flourish Salon Karachi</p>
              
              <p className="mb-3">Address: Shop no A219, 2nd Floor At Ocean Mall</p>
              
              <p className="mb-3">Address : <strong>Kiosk No.:</strong> FF-01 , Phase 1, First Floor NorthWalk Mall Karachi</p>
              
              <p className="mb-3">UAE Address: 248,0,LOOTAH BLDG 0 Diera DXB</p>
              
              <p className="mb-0">WhatsApp us: 03268124613</p>
              <p className="mb-3">Phone: 03012546333</p>
              
              <p>Customer Support: helloelyscents@gmail.com</p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 pt-4 border-top border-secondary border-opacity-10 text-center">
          <Col>
            <p className="mb-1" style={{ fontSize: '0.8rem' }}>© 2026 Elyscents</p>
            <p style={{ fontSize: '0.8rem' }}>Powered by Shopify</p>
          </Col>
        </Row>
      </Container>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        padding: '10px',
        color: 'white',
        fontSize: '30px',
        display: 'flex',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <FaWhatsapp />
      </div>
    </footer>
  );
};

export default Footer;