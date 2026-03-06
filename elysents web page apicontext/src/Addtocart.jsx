import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import './App.css';

function CartModal() {
  const [show, setShow] = useState(false);
  const { cart, updateQuantity, removeFromCart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();
  const { hash } = location;

  const subtotal = cart.reduce((total, t) => total + (t.price * t.quantity), 0);

  const handleClose = () => {
    setShow(false);
    navigate(location.pathname + location.search, { replace: true });
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const parsedHash = hash.replace('#', '');
    if (parsedHash === "addToCart") {
      handleShow();
    }
  }, [hash]);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: '400px' }}
      >
        <Offcanvas.Header closeButton className="border-bottom py-4 px-4">
          <Offcanvas.Title className="fw-bold" style={{ letterSpacing: '2px', fontSize: '1.2rem' }}>
            CART
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="px-4 pt-4">
          {cart.length === 0 ? (
            <p className="text-center mt-5">Your cart is empty.</p>
          ) : (
            cart.map((t) => (
            
              <div key={t.id} className="d-flex align-items-start mb-4 pb-3 border-bottom position-relative">

               
                <button
                  onClick={() => removeFromCart(t.id)}
                  className="position-absolute"
                  style={{
                    top: '-5px',
                    right: '0',
                    border: 'none',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    zIndex: '1',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>

                <div className="flex-shrink-0 border p-1">
                  <img
                    src={t.thumbnail || t.images?.[0]}
                    alt={t.title}
                    width="75"
                    height="95"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="flex-grow-1 ms-3">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1 fw-bold" style={{ fontSize: '0.85rem', lineHeight: '1.4', paddingRight: '25px' }}>
                      {t.title}
                    </h6>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center border" style={{ height: '32px' }}>
                      <button className="btn btn-sm border-0 px-2 shadow-none" onClick={() => updateQuantity(t.id, -1)}>-</button>
                      <span className="px-2 small">{t.quantity}</span>
                      <button className="btn btn-sm border-0 px-2 shadow-none" onClick={() => updateQuantity(t.id, 1)}>+</button>
                    </div>
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                      Rs.{(t.price * t.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </Offcanvas.Body>

        {cart.length > 0 && (
          <div className="p-4 border-top">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-uppercase fw-bold" style={{ letterSpacing: '1.5px', fontSize: '0.8rem' }}>Subtotal</span>
              <span className="fw-bold">Rs.{subtotal.toLocaleString()}.00</span>
            </div>

            <p className="text-center text-muted mb-4 px-3" style={{ fontSize: '0.72rem', lineHeight: '1.5' }}>
              Shipping, taxes, and discount codes calculated at checkout.
            </p>

            <Link to="/checkout" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleClose}
                variant="dark"
                className="w-100 rounded-0 py-3 fw-bold text-uppercase"
                style={{ backgroundColor: 'black', border: 'none', letterSpacing: '2px', fontSize: '0.9rem' }}
              >
                Check Out
              </Button>
            </Link>
          </div>
        )}
      </Offcanvas>
    </>
  );
}

export default CartModal;