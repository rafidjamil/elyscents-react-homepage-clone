import { Card, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OpenCartModal from "../helpers/OpenCartModal";
import { useNavigate } from "react-router-dom";




const ProductCard = ({ beforePrice, price, Mainimg, Hoverimg }) => {
const addToCartNow = OpenCartModal();
 const navigate = useNavigate();


  return (
    <>
      <Card
        style={{ width: '18rem', border: 'none' }}
        className="text-center product-card-container"
      >
        <div className="position-relative overflow-hidden">
          <Badge
            bg="dark"
            className="position-absolute end-0 m-2 rounded-0 px-3 py-2"
            style={{ zIndex: 10 }}
          >
            Sale
          </Badge>

          <div className="image-wrapper" style={{ position: 'relative', height: '350px' }}   onClick={() => navigate("/product-page")}>
            <img
              src={Mainimg}

              alt="Perfume"
              className="img-fluid p-3 main-img"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <img
              src={Hoverimg}
              alt="Perfume Hover"
              className="img-fluid p-3 hover-img"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'none' }}
            />
          </div>
        </div>

        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title
            className="fw-normal mb-1"
            style={{ letterSpacing: '2px', fontSize: '1.2rem', color: '#000' }}
          >
            ROYAL OUD
          </Card.Title>

          <div className="mb-3">
            <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '0.9rem' }}>
              Rs. {beforePrice}
            </span>
            <span className="fw-normal" style={{ fontSize: '1rem' }}>
              Rs. {price}
            </span>
            <span className="ms-2" style={{ color: '#d00', fontSize: '0.9rem' }}>
              Save Rs.201.00
            </span>
          </div>

          <Button variant="dark" className="w-100 rounded-0 py-2 text-uppercase"
            onClick={() => addToCartNow()}
            style={{ backgroundColor: 'black', border: 'none', fontWeight: '500', letterSpacing: '1px' }}
          >
            Add to cart
          </Button>

        </Card.Body>

        <style>
          {`
          .product-card-container:hover .main-img {
            display: none !important;
          }
            .product-card-container{
            width: 23% !important;
           
            justify-content:center;
            }
          .product-card-container:hover .hover-img {
            display: block !important;
          }
        `}
        </style>
      </Card>
    </>
  );
};

export default ProductCard;