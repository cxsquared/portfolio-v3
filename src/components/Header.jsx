import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle, backgroundColor }) => (
    <div
      style={{
        margin: '0 auto',
        padding: '1.45rem 1.0875rem',
        background: backgroundColor
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
)

export default Header
