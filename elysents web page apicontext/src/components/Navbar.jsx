import React, { useState, useEffect } from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CiUser, CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoLogInSharp } from "react-icons/io5"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom'; 
import OpenSearchModal from '../helpers/OpenseatchModal';
import OpenCartModal from '../helpers/OpenCartModal';
import '../App.css'
import { NavMenu } from '../Fetchapitesting/navmenuapi';



export const Carticon = (props) => {
    return (
        <>
            <HiOutlineShoppingBag onClick={props.addToCartNow} className="icon" />
        </>
    )
}
export const Searchicon = (props) => {
    return (
        <>
            <CiSearch onClick={props.searchNow} className="icon" />
        </>
    )
}


const navbar = () => {
    
    const addToCartNow = OpenCartModal();
    const searchNow = OpenSearchModal();
    const [user, setUser] = useState(null);
    const location = useLocation();
    
        useEffect(() => {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            setUser(loggedInUser);
        }, [location]);
        return (
        <>
           
            <div> <Navbar bg="light" className="main-navbar">
                <Container fluid className="nav-container">


                    <div className="nav-left">
                        <Searchicon searchNow={searchNow} />
                    </div>


                    <div className="nav-center">
                        <Link to="/"> <img src='https://elyscents.pk/cdn/shop/files/logo_size.png?v=1703577106&width=320' className='logo-text' /></Link>
                    </div>


                    <div className="nav-right">
                        {user ? (

                            <Link to="/user"><IoLogInSharp className="icon" /></Link>
                        ) : (

                            <Link to="/login"><CiUser className="icon" /></Link>
                        )}
                        <Carticon addToCartNow={addToCartNow} />
                    </div>


                </Container>
            </Navbar>


                <NavMenu/>
            </div>
        </>

    )
}

export default navbar