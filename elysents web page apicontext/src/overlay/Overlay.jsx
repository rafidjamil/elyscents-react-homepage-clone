import React, { useEffect, useState } from 'react';
import { Container, Form, Card } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation, useNavigate, Link } from 'react-router-dom'; 

function SearchModal() {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [results, setResults] = useState([]); 

  const [debouncingTerm , setDebouncingTerm] = useState(searchTerm);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncingTerm(searchTerm);
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  
  useEffect(() => {
   
    if (debouncingTerm.trim() !== '') {
      fetchData(debouncingTerm);
    } else {
      setResults([]); 
    }
  }, [debouncingTerm]); 

  const fetchData = async (query) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setResults(data.products || []); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setSearchTerm(''); 
    navigate(location.pathname); 
  };

  useEffect(() => {
    setShow(location.hash === "#search");
  }, [location.hash]);

  if (!show) return null;

  return (
    <div className="search-overlay" onClick={handleClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999 }}>
      <Container className="d-flex flex-column align-items-center pt-5">
        
        <div className="d-flex align-items-center w-100 mb-4" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
          <div className="bg-white border border-dark d-flex flex-grow-1 p-2">
            <Form.Control
              placeholder="Search products..."
              className="border-0 shadow-none"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch size={25} className="mt-1" />
          </div>
          <IoCloseOutline size={35} className="ms-3 text-white" onClick={handleClose} style={{cursor:'pointer'}} />
        </div>

        <div className="w-100" style={{ maxWidth: '800px', maxHeight: '70vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
          {results.length > 0 ? (
            results.map(item => (
              <Link to={`/product/${item.id}`} key={item.id} onClick={handleClose} style={{ textDecoration: 'none' }}>
                <Card className="mb-2 p-2 border-0 shadow-sm" style={{cursor:'pointer'}}>
                  <div className="d-flex align-items-center">
                    <img src={item.thumbnail} alt="" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    <div className="ms-3 text-dark">
                      <h6 className="mb-0">{item.title}</h6>
                      <small className="text-muted">Rs. {item.price}</small>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            searchTerm && <p className="text-white">No products found.</p>
          )}
        </div>

      </Container>
    </div>
  );
}

export default SearchModal;