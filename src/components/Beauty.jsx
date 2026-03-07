import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCart } from "../CartContext";
import OpenCartModal from "../helpers/OpenCartModal";


const Beauty = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const addToCartNow = OpenCartModal();
  const handleBtnClick = (t) => {
    addToCart(t);
    addToCartNow();
  };


  const getAllProduct = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const json = await res.json();

      const withCategory = json.products.map((p) => ({
        ...p,
        categoryName: category,
      }));

      setProducts(withCategory);
    } catch (error) {
      console.log(error);
    }
  };
  //   useEffect(() => {
  //   console.log("Category Changed:", category);
  // }, [category]);
  // useEffect(() => {
  //   console.log("Beauty Mounted");

  //   return () => {
  //     console.log("Beauty Unmounted");
  //   };
  // }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getAllProduct = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`,
          {
             cache: "no-store"
          }
        );

        const json = await res.json();

        const withCategory = json.products.map((p) => ({
          ...p,
          categoryName: category,
        }));

        setProducts(withCategory);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Previous API call aborted");
        } else {
          console.log(error);
        }
      }
    };

    getAllProduct();

    // 👇 Cleanup function – jab category change ho ya component unmount ho
    return () => {
      controller.abort();
    };

  }, [category]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "50px",
        padding: "20px"
      }}
    >
      {products.map((t) => (
        <Card
          key={t.id}
          style={{ width: "18rem", border: "none" }}
          className="text-center product-card-container"
        >
          <div className="position-relative overflow-hidden">
            <Badge
              bg="dark"
              className="position-absolute end-0 m-2 rounded-0 px-3 py-2"
            >
              {t.categoryName}
            </Badge>
            <Link to={`/product-page/${t.id}`}></Link>
            <div
              className="image-wrapper"
              style={{ height: "350px", cursor: "pointer" }}
              onClick={() => navigate(`/product/${t.id}`)}
            >
              <img
                src={t.thumbnail}
                alt={t.title}
                className="img-fluid p-3"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <Link />
          </div>

          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>{t.title}</Card.Title>

            <div className="mb-3">
              <span>Rs. {t.price}</span>
            </div>

            <Button variant="dark" className="w-100" onClick={() => handleBtnClick(t)}>
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Beauty;