import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { useCart } from './CartContext';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // 1. Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: ''
  });

  
  const subtotal = cart.reduce((total, t) => total + (t.price * t.quantity), 0);
  const shipping = 200;
  const total = subtotal + shipping;

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleCompleteOrder = (e) => {
    e.preventDefault();
      
      
    const { email, firstName, lastName, address, city, phone } = formData;
    if (email && firstName && lastName && address && city && phone) {
    
      clearCart(); 
     navigate("/Thankyou");
    } else {
      alert("Fill the form first");
    }
  };

  return (
    <Container className="checkout-container py-5">
      <Form onSubmit={handleCompleteOrder}> {/* Form tag wrap kiya */}
        <Row className="flex-column-reverse flex-md-row">
          
          <Col md={7} className="pe-md-5 border-end">
            <section className="mb-5">
              <h5 className="fw-bold">Contact</h5>
              <Form.Control 
                name="email" 
                onChange={handleChange} 
                type="text" 
                placeholder="Email or mobile phone number" 
                className="py-2 mb-2" 
                required 
              />
            </section>

            <section className="mb-5">
              <h5 className="fw-bold mb-3">Delivery</h5>
              <Row className="mb-3">
                <Col>
                  <Form.Control name="firstName" onChange={handleChange} placeholder="First name" className="py-2" required />
                </Col>
                <Col>
                  <Form.Control name="lastName" onChange={handleChange} placeholder="Last name" className="py-2" required />
                </Col>
              </Row>

              <Form.Control name="address" onChange={handleChange} placeholder="Address" className="py-2 mb-3" required />
              
              <Row className="mb-3">
                <Col>
                  <Form.Control name="city" onChange={handleChange} placeholder="City" className="py-2" required />
                </Col>
                <Col>
                  <Form.Control placeholder="Postal code (optional)" className="py-2" />
                </Col>
              </Row>

              <Form.Control name="phone" onChange={handleChange} placeholder="Phone" className="py-2 mb-3" required />
            </section>

            <Button type="submit" variant="dark" className="w-100 py-3 fw-bold mb-5 rounded-1">
              Complete order
            </Button>
          </Col>

          
          <Col md={5} className="ps-md-5 py-4 py-md-0 bg-summary shadow-sm">
            <div className="sticky-top pt-2">
              {cart.map((t) => (
                <div key={t.id} className="d-flex align-items-center mb-4">
                  <div className="position-relative border rounded p-1 me-3 bg-white">
                    <img src={t.thumbnail} alt={t.title} width="60" height="60" style={{objectFit: 'cover'}} />
                    <Badge bg="secondary" pill className="position-absolute translate-middle top-0 start-100">{t.quantity}</Badge>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0 small fw-bold">{t.title}</h6>
                    <small className="text-muted">Qty: {t.quantity}</small>
                  </div>
                  <span className="small fw-bold">Rs {(t.price * t.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between small mb-2">
                  <span>Subtotal</span>
                  <span className="fw-bold">Rs {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="d-flex justify-content-between small mb-4">
                  <span>Shipping</span>
                  <span className="fw-bold">Rs {shipping.toLocaleString()}.00</span>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <h5 className="fw-bold">Total</h5>
                  <span className="h4 fw-bold">Rs {total.toLocaleString()}.00</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;