import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai'; 
import '../App.css';

const ThankYou = () => {
 
 

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="text-center p-5 shadow-sm rounded-4 bg-white border" style={{ maxWidth: '500px' }}>
        <AiFillCheckCircle size={80} color="#28a745" className="mb-4" />
        
        <h1 className="fw-bold mb-3" style={{ letterSpacing: '-1px' }}>Thank You!</h1>
       
        
       

        <div className="d-grid gap-2">
          <Link to="/">
            <Button variant="dark" className="w-100 py-3 rounded-1 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
              Continue Shopping
            </Button>
            </Link>
        </div>
      </div>
    </Container>
  );
};

export default ThankYou;