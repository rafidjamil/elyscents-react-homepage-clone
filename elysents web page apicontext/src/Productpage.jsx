import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import OpenCartModal from './helpers/OpenCartModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    <div className="container mt-5">
      <div className="row">



        <div className="col-md-7 d-flex">
          <div className="thumbnails d-flex flex-column me-3">
            {product.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                className={`img-thumbnail mb-2 ${mainImage === img ? 'border-dark' : ''}`}
                alt="thumb"
                style={{ width: '80px', cursor: 'pointer', objectFit: 'cover', height: '80px' }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="main-product-image text-center w-100 overflow-hidden border">
            <img
              src={mainImage}
              className="img-fluid custom-zoom"
              alt={product.title}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>


        <div className="col-md-5">
          <h1 className="h3 fw-bold">{product.title}</h1>

          <div className="mb-2">
            <span className="text-dark">★★★★★</span>
            <small className="ms-2 text-muted">{product.reviews?.length || 0} reviews</small>
          </div>

          <div className="price-area mb-3">
            <span className="text-decoration-line-through text-muted me-2">Rs. {oldPrice}</span>
            <span className="fw-bold h5">Rs. {newPrice}</span>
            <span className="ms-2 text-danger small">Save Rs. {saveAmount}</span>
          </div>

          <div className="promo-banner p-3 mb-4 bg-light border">
            <p className="mb-0 small">
              🚚 <strong>Buy Any 2 Perfumes</strong> & Get <strong>FREE Delivery</strong> — Automatically Applied at Checkout.
            </p>
          </div>

          <div className="d-grid gap-2 mb-4">
            <button onClick={() => handleBtnClick(product)} className="btn btn-outline-dark rounded-0 py-3 fw-bold">ADD TO CART</button>
            <button className="btn btn-danger rounded-0 py-3 fw-bold" onClick={() => navigate("/checkout")}>BUY IT NOW</button>
          </div>


          <div className="border-top">

            <div
              className="d-flex justify-content-between py-3 border-bottom small fw-bold"
              data-bs-toggle="collapse"
              data-bs-target="#shippingCol"
              style={{ cursor: 'pointer', letterSpacing: '1px' }}
            >
              SHIPPING INFORMATION <span>⌵</span>
            </div>
            <div className="collapse" id="shippingCol">
              <div className="py-3 border-bottom small">
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
              ASK A QUESTION <span>⌵</span>
            </div>
            <div className="collapse" id="questionCol">
              <div className="py-3 border-bottom">
                <div className="row g-2">
                  <div className="col-6">
                    <label className="small text-uppercase fw-bold" style={{ fontSize: '10px' }}>Name</label>
                    <input type="text" className="form-control rounded-0" />
                  </div>
                  <div className="col-6">
                    <label className="small text-uppercase fw-bold" style={{ fontSize: '10px' }}>Email</label>
                    <input type="email" className="form-control rounded-0" />
                  </div>
                  <div className="col-12 mt-2">
                    <label className="small text-uppercase fw-bold" style={{ fontSize: '10px' }}>Message</label>
                    <textarea className="form-control rounded-0" rows="3"></textarea>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <button className="btn btn-dark rounded-0 px-5 fw-bold">SEND</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="row mb-5">

      </div>

      <hr />


      <div className="reviews-section py-5">
        <h4 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '2px', display: 'block', textAlign: 'center' }}>Customer Reviews</h4>

        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((rev, index) => (
            <div key={index} className="review-item mb-4 pb-4 border-bottom">

              <div className="mb-2">
                {renderStars(Math.round(rev.rating))}
              </div>


              <div className="d-flex align-items-center mb-2">
                <div
                  className="bg-light d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '35px', height: '35px' }}
                >
                  <i className="bi bi-person text-secondary"></i>

                  <span style={{ fontSize: '12px' }}>👤</span>
                </div>
                <span className="fw-bold small">{rev.reviewerName}</span>
              </div>

              <p className="text-muted mb-0" style={{ fontSize: '15px' }}>
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-muted">No reviews yet for this product.</p>
        )}
      </div>


    </div>
  );
};

export default Productpage;