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
    <>
      <style>{`
        /* ---- Product Page Responsive Styles ---- */

        .pp-wrapper {
          padding: 30px 20px 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Thumbnails: vertical on desktop, horizontal scroll on mobile */
        .pp-thumbnails {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-right: 12px;
        }

        .pp-thumb-img {
          width: 70px;
          height: 70px;
          min-width: 70px;
          object-fit: cover;
          cursor: pointer;
          border: 1px solid #ddd;
          border-radius: 0;
          transition: border-color 0.2s;
        }

        .pp-thumb-img:hover,
        .pp-thumb-img.active {
          border-color: #000 !important;
        }

        .pp-main-img-wrap {
          overflow: hidden;
          border: 1px solid #eee;
          flex: 1;
        }

        .pp-main-img {
          width: 100%;
          max-height: 550px;
          object-fit: contain;
          transition: transform 0.5s ease;
          cursor: zoom-in;
          display: block;
        }

        .pp-main-img:hover {
          transform: scale(1.5);
        }

        .pp-left-col {
          display: flex;
          flex-direction: row;
        }

        /* Ask a question form */
        .pp-question-form input,
        .pp-question-form textarea {
          border-radius: 0;
          box-shadow: none;
          font-size: 0.88rem;
        }

        .pp-question-form input:focus,
        .pp-question-form textarea:focus {
          outline: none;
          border-color: #212529;
          box-shadow: none;
        }

        /* ---- TABLET ---- */
        @media (max-width: 1024px) and (min-width: 769px) {
          .pp-wrapper {
            padding: 24px 16px 0;
          }

          .pp-main-img {
            max-height: 420px;
          }

          .pp-thumb-img {
            width: 60px;
            height: 60px;
            min-width: 60px;
          }
        }

        /* ---- MOBILE ---- */
        @media (max-width: 768px) {
          .pp-wrapper {
            padding: 16px 14px 0;
          }

          /* Stack image section vertically on mobile */
          .pp-left-col {
            flex-direction: column-reverse;
          }

          /* Thumbnails go horizontal below main image */
          .pp-thumbnails {
            flex-direction: row;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin-right: 0;
            margin-top: 10px;
            gap: 8px;
            padding-bottom: 4px;
          }

          .pp-thumb-img {
            width: 58px;
            height: 58px;
            min-width: 58px;
            flex-shrink: 0;
          }

          .pp-main-img-wrap {
            width: 100%;
          }

          .pp-main-img {
            max-height: 320px;
          }

          /* Disable zoom on touch screens */
          .pp-main-img:hover {
            transform: scale(1);
          }

          /* Product info section */
          .pp-info-col {
            padding-top: 20px !important;
          }

          /* Price area */
          .pp-price-area {
            flex-wrap: wrap;
            gap: 6px;
          }

          /* Promo banner */
          .pp-promo {
            font-size: 0.82rem;
          }

          /* Add to cart / buy now buttons */
          .pp-btn-group .btn {
            font-size: 0.9rem;
            padding: 13px 10px;
          }

          /* Accordion headers */
          .pp-accordion-header {
            font-size: 0.78rem;
          }

          /* Reviews */
          .pp-reviews-title {
            font-size: 1rem;
            letter-spacing: 1px;
          }
        }

        @media (max-width: 480px) {
          .pp-wrapper {
            padding: 12px 10px 0;
          }

          .pp-main-img {
            max-height: 270px;
          }

          .pp-thumb-img {
            width: 50px;
            height: 50px;
            min-width: 50px;
          }

          .pp-btn-group .btn {
            font-size: 0.82rem;
            padding: 12px 8px;
          }
        }
      `}</style>

      <div className="pp-wrapper">
        <div className="row g-4">

          {/* ===== LEFT: Images ===== */}
          <div className="col-12 col-lg-7">
            <div className="pp-left-col">

              {/* Thumbnails */}
              <div className="pp-thumbnails">
                {product.images?.slice(0, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`pp-thumb-img ${mainImage === img ? 'active' : ''}`}
                    alt={`thumb-${index}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="pp-main-img-wrap">
                <img
                  src={mainImage}
                  className="pp-main-img"
                  alt={product.title}
                />
              </div>

            </div>
          </div>

          {/* ===== RIGHT: Info ===== */}
          <div className="col-12 col-lg-5 pp-info-col">

            <h1 className="h3 fw-bold mb-2">{product.title}</h1>

            {/* Stars */}
            <div className="mb-2 d-flex align-items-center">
              <span className="text-dark">★★★★★</span>
              <small className="ms-2 text-muted">({product.reviews?.length || 0} reviews)</small>
            </div>

            {/* Price */}
            <div className="pp-price-area d-flex align-items-center mb-3">
              <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '0.95rem' }}>
                Rs. {oldPrice}
              </span>
              <span className="fw-bold h4 mb-0">Rs. {newPrice}</span>
              <span className="ms-2 text-danger small bg-light px-2 py-1">Save Rs. {saveAmount}</span>
            </div>

            {/* Promo */}
            <div className="pp-promo p-3 mb-4 border" style={{ backgroundColor: '#fdfdfd' }}>
              <p className="mb-0 small">
                🚚 <strong>Buy Any 2 Perfumes</strong> & Get <strong>FREE Delivery</strong> — Automatically Applied at Checkout.
              </p>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2 mb-4 pp-btn-group">
              <button
                onClick={() => handleBtnClick(product)}
                className="btn btn-outline-dark rounded-0 py-3 fw-bold shadow-sm"
              >
                ADD TO CART
              </button>
              <button
                className="btn btn-danger rounded-0 py-3 fw-bold shadow-sm"
                onClick={() => navigate("/checkout")}
              >
                BUY IT NOW
              </button>
            </div>

            {/* Accordions */}
            <div className="border-top">

              {/* Shipping */}
              <div
                className="d-flex justify-content-between py-3 border-bottom small fw-bold pp-accordion-header"
                data-bs-toggle="collapse"
                data-bs-target="#shippingCol"
                style={{ cursor: 'pointer', letterSpacing: '1px' }}
              >
                SHIPPING INFORMATION <span className="small">⌵</span>
              </div>
              <div className="collapse" id="shippingCol">
                <div className="py-3 border-bottom small text-muted">
                  <ul className="ps-3 mb-0">
                    <li className="mb-2">
                      <strong>What are the Delivery charges?</strong><br />
                      The delivery charges are Rs 200
                    </li>
                    <li>
                      <strong>When will my order be delivered?</strong><br />
                      Karachi: 2-3 working days.<br />
                      Outside Karachi: 3-5 working days.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ask a Question */}
              <div
                className="d-flex justify-content-between py-3 border-bottom small fw-bold pp-accordion-header"
                data-bs-toggle="collapse"
                data-bs-target="#questionCol"
                style={{ cursor: 'pointer', letterSpacing: '1px' }}
              >
                ASK A QUESTION <span className="small">⌵</span>
              </div>
              <div className="collapse" id="questionCol">
                <div className="py-3 border-bottom pp-question-form">
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
                      <button className="btn btn-dark rounded-0 px-5 fw-bold w-100">SEND</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===== REVIEWS ===== */}
        <hr className="my-5" />

        <div className="reviews-section py-4">
          <h4
            className="fw-bold mb-5 text-uppercase text-center pp-reviews-title"
            style={{ letterSpacing: '2px' }}
          >
            Customer Reviews
          </h4>
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
                        style={{ width: '40px', height: '40px', minWidth: '40px' }}
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
    </>
  );
};

export default Productpage;