import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import OpenCartModal from './helpers/OpenCartModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Productpage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const addToCartNow = OpenCartModal();

  const handleBtnClick = (item) => {
    addToCart(item);
    addToCartNow();
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);
        setLoading(false);
      });
  }, [id]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? '#000' : '#ccc', fontSize: '18px' }}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  const oldPrice = product.price;
  const saveAmount = ((oldPrice * product.discountPercentage) / 100).toFixed(2);
  const newPrice = (oldPrice - saveAmount).toFixed(2);

  return (
    <div className="container mt-5 px-3 px-md-0">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="d-flex flex-column-reverse flex-lg-row">
            <div 
                className="thumbnails d-flex flex-row flex-lg-column mt-3 mt-lg-0 me-lg-3 overflow-auto"
                style={{ gap: '10px' }}
            >
              {product.images?.slice(0, 4).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`img-thumbnail ${mainImage === img ? 'border-dark' : ''}`}
                  alt="thumb"
                  style={{ 
                    width: '70px', 
                    height: '70px', 
                    minWidth: '70px', 
                    cursor: 'pointer', 
                    objectFit: 'cover',
                    borderRadius: '0'
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="main-product-image text-center w-100 overflow-hidden border">
              <img
                src={mainImage}
                className="img-fluid custom-zoom w-100"
                alt={product.title}
                style={{ maxHeight: '550px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <h1 className="h3 fw-bold">{product.title}</h1>

          <div className="mb-2 d-flex align-items-center">
            <span className="text-dark">★★★★★</span>
            <small className="ms-2 text-muted">({product.reviews?.length || 0} reviews)</small>
          </div>

          <div className="price-area mb-3 d-flex align-items-center flex-wrap">
            <span className="text-decoration-line-through text-muted me-2">Rs. {oldPrice}</span>
            <span className="fw-bold h4 mb-0">Rs. {newPrice}</span>
            <span className="ms-2 text-danger small bg-light px-2 py-1">Save Rs. {saveAmount}</span>
          </div>

          <div className="promo-banner p-3 mb-4 border" style={{ backgroundColor: '#fdfdfd' }}>
            <p className="mb-0 small">
              🚚 <strong>Buy Any 2 Perfumes</strong> & Get <strong>FREE Delivery</strong> — Automatically Applied at Checkout.
            </p>
          </div>

          <div className="d-grid gap-2 mb-4">
            <button onClick={() => handleBtnClick(product)} className="btn btn-outline-dark rounded-0 py-3 fw-bold shadow-sm">ADD TO CART</button>
            <button className="btn btn-danger rounded-0 py-3 fw-bold shadow-sm" onClick={() => navigate("/checkout")}>BUY IT NOW</button>
          </div>

          <div className="border-top">
            <div
              className="d-flex justify-content-between py-3 border-bottom small fw-bold"
              data-bs-toggle="collapse"
              data-bs-target="#shippingCol"
              style={{ cursor: 'pointer', letterSpacing: '1px' }}
            >
              SHIPPING INFORMATION <span className="small">⌵</span>
            </div>
            <div className="collapse" id="shippingCol">
              <div className="py-3 border-bottom small text-muted">
                <ul className="ps-3 mb-0">
                  <li className="mb-2"><strong>What are the Delivery charges?</strong><br />The delivery charges are Rs 200</li>
                  <li><strong>When will my order be delivered?</strong><br />Karachi: 2-3 working days.<br />Outside Karachi: 3-5 working days.</li>
                </ul>
              </div>
            </div>

            <div
              className="d-flex justify-content-between py-3 border-bottom small fw-bold"
              data-bs-toggle="collapse"
              data-bs-target="#questionCol"
              style={{ cursor: 'pointer', letterSpacing: '1px' }}
            >
              ASK A QUESTION <span className="small">⌵</span>
            </div>
            <div className="collapse" id="questionCol">
              <div className="py-3 border-bottom">
                <div className="row g-2">
                  <div className="col-6">
                    <label className="small text-uppercase fw-bold mb-1" style={{ fontSize: '10px' }}>Name</label>
                    <input type="text" className="form-control rounded-0 shadow-none" />
                  </div>
                  <div className="col-6">
                    <label className="small text-uppercase fw-bold mb-1" style={{ fontSize: '10px' }}>Email</label>
                    <input type="email" className="form-control rounded-0 shadow-none" />
                  </div>
                  <div className="col-12 mt-2">
                    <label className="small text-uppercase fw-bold mb-1" style={{ fontSize: '10px' }}>Message</label>
                    <textarea className="form-control rounded-0 shadow-none" rows="3"></textarea>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <button className="btn btn-dark rounded-0 px-5 fw-bold w-100 w-md-auto">SEND</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="reviews-section py-4">
        <h4 className="fw-bold mb-5 text-uppercase text-center" style={{ letterSpacing: '2px' }}>Customer Reviews</h4>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, index) => (
                <div key={index} className="review-item mb-4 pb-4 border-bottom">
                  <div className="mb-2">
                    {renderStars(Math.round(rev.rating))}
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div
                      className="bg-light d-flex align-items-center justify-content-center rounded-circle me-2 border"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <span style={{ fontSize: '14px' }}>👤</span>
                    </div>
                    <div>
                        <div className="fw-bold small">{rev.reviewerName}</div>
                        <div className="text-muted" style={{ fontSize: '10px' }}>Verified Buyer</div>
                    </div>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted text-center">No reviews yet for this product.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;