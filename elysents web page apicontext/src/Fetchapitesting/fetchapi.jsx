import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from "react-router-dom";
import OpenCartModal from "../helpers/OpenCartModal";
import { Card, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';    

import '../App.css'
import { useCart } from '../CartContext';
// import OpenCartModal from "../helpers/OpenCartModal";


export const ProductCards = () => {
  const { addToCart } = useCart();
    const addToCartNow = OpenCartModal();
  const handleBtnClick = (t) => {
      addToCart(t); 
      addToCartNow(); 
    };

  const API_URL = "https://dummyjson.com/products?limit=104";
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setProducts(json.products); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
        <div  style={{display:'flex',flexWrap:'wrap', justifyContent:'center',gap:'50px' }}>
    <>
      {products.map((t, i) => (  
        <Card
          key={t.id}
          style={{ width: '18rem', border: 'none'  }}
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
            <Link to={`/product/${t.id}`}><Link/>
            <div
            
              className="image-wrapper"
              style={{ position: 'relative', height: '350px' }}
             
            >
              <img
                src={t.thumbnail}    
                alt={t.title}
                className="img-fluid p-3 main-img"
                style={{
              
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
            </Link>
          </div>

          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>{t.title}</Card.Title>

            <div className="mb-3">
              <span className="fw-normal">
                Rs. {t.price}
              </span>
            </div>

               
            <Button
              variant="dark"
              className="w-100"
              onClick={() => handleBtnClick(t)}
             
            >
              Add to cart
            </Button>
           
          </Card.Body>
        </Card>
      ))}
    </>
      </div>
  );
};

