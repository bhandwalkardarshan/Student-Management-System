import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles/navBarStyles.css'

const NavBar = () => {
    const { id } = useParams();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={`{/edit/${id}`}>Edit Student</Link>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
};

export default NavBar;
