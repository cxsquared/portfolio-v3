import React from 'react'
import Link from 'gatsby-link'
import Colors from '../utils/Colors';
import logo from '../assets/logo.svg';

const Header = ({ siteTitle, backgroundColor }) => (
    <div
      style={{
        margin: '0 auto',
        padding: '.50rem 1.0875rem',
        background: Colors.blue
      }}
    >
      <h1 style={{ 
        margin: 0,
        padding: 0,
        border: 'none'
      }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
        <img src={logo}
             style={{
               display: 'inline',
               width: '50px',
               height: '50px',
               margin: '0',
               objectFit: 'cover'
             }}/>
          <span style={{ verticalAlign: '16px' }}>{siteTitle.toUpperCase()}</span>
        </Link>
      </h1>
    </div>
)

export default Header
