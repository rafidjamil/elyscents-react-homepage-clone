import React from 'react'

const Carticon = () => {
  return (
     <Nav.Link as={Link} to="/" > <HiOutlineShoppingBag onClick={handleShow} className="icon" /></Nav.Link>
  )
}

export default Carticon