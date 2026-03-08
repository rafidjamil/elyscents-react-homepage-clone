import React, { useState } from 'react';

import { Container, Card, Button } from 'react-bootstrap';

import { useProducts } from './ProductContext';

import { Link } from 'react-router-dom';

import OpenCartModal from './helpers/OpenCartModal';

import './App.css';

import { useCart } from './CartContext';



export const CategorySection = ({ categoryTitle, categoryName }) => {

    const { allProducts, loading } = useProducts();

    // const [cart, setCart] = useState([]);

   

    // const addToCart = (product) => {

    //     setCart([...cart, product]);

    // };

    const { addToCart } = useCart();

   

    const addToCartNow = OpenCartModal();

    const handleBtnClick = (t) => {

        addToCart(t);

        addToCartNow();

    };



    if (loading) return <div className="text-center my-5"><p>Loading Products...</p></div>;



    const categoryProducts = allProducts

        .filter(p => p.category === categoryName)

        .slice(0, 10);



    return (

        <div className="category-section mb-5 mt-5">

            <h2 className="text-center text-uppercase mb-4 fw-bold" style={{ letterSpacing: '2px' }}>

                {categoryTitle}

            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>

                {categoryProducts.map((t) => (

                    <Card key={t.id} style={{ width: '18rem', border: 'none' }} className="text-center product-card-container">

                        <Link to={`/product/${t.id}`} style={{ textDecoration: 'none' }}>

                            <div className="image-wrapper" style={{ height: '300px', backgroundColor: '#f8f8f8', cursor: 'pointer' }}>

                                <img

                                    src={t.thumbnail}

                                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '15px' }}

                                    alt={t.title}

                                />

                            </div>

                        </Link>

                        <Card.Body>

                            <Card.Title style={{ fontSize: '1rem', textTransform: 'uppercase' }}>{t.title}</Card.Title>

                            <p className="fw-bold">Rs. {t.price}</p>

                            <Button

                                variant="dark"

                                className="w-100 rounded-0"

                                onClick={() => handleBtnClick(t)}

                            >

                                Add to Cart

                            </Button>

                        </Card.Body>

                    </Card>

                ))}

            </div>

        </div>

    );

};



const HeroBanner = () => {

    return (

        <>

            <div className='hero-img'>

                <img src='https://elyscents.pk/cdn/shop/files/facebook_cover_3.jpg?v=1766830584&width=1920' alt="hero" />

            </div>

            <div className="newyear-banner">

                <Container>

                    <p>🎉 NEW YEAR SPECIAL: BUY 1 GET 2ND AT HALF PRICE 🎉</p>

                    <p className='p1'>

                        Limited time — <strong>Dec 27 to 3rd Jan.</strong> Don’t miss the New Year Deal! 💥

                    </p>

                </Container>

            </div>

        </>

    );

};



const Home = () => {

    return (

        <>

            <HeroBanner />

            <Container>

                <CategorySection categoryTitle="Beauty & Cosmetics" categoryName="beauty" />

                <CategorySection categoryTitle="Luxury Fragrances" categoryName="fragrances" />

                <CategorySection categoryTitle="Home Decoration" categoryName="home-decoration" />

            </Container>

        </>

    );

};



export default Home;