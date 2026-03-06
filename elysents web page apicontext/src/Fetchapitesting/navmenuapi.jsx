import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export const NavMenu = () => {
  const API_URL = "https://dummyjson.com/products/category-list";
  const [menu, setMenu] = useState([]);

  const getAllMenu = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setMenu(json.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <div className="menu-bar">
      <Nav className="justify-content-center">
        <Nav.Link as={Link} to="/">
          HOME
        </Nav.Link>
         <Nav.Link as={Link} to="/cataloge">
          CATALOG
        </Nav.Link>

        {menu.map((item) => (
          <Nav.Link 
          style={{textTransform:'uppercase'}}

            key={item}
            as={Link}
            to={`/collection/${item}`} 
          >
            {item}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};