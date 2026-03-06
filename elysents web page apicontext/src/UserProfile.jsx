import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom'

const UserProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); 
    navigate('/login');
  };

  if (!user) {
    return <Container className="py-5">Please login to view this page.</Container>;
  }

  return (
    <Container className="py-5" style={{ minHeight: '60vh', position: 'relative' }}>
      {/* Logout Button in Right Corner */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <h2>My Account</h2>
        <Link to={"/"}><Button variant="outline-danger" onClick={handleLogout}>
          Logout

        </Button>
        </Link>
      </div>

      <div className="user-details-card p-4 border rounded bg-light">
        <h4>Welcome, {user.name}!</h4>
        {/* <p className="text-muted">Email: {user.email}</p>
        <p className="text-muted">Account ID: {user.id}</p> */}
        
        <div className="mt-4">
          <h5>Order History</h5>
          <p className="small text-muted">You haven't placed any orders yet.</p>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;