import React from 'react'
import Helmet from 'react-helmet'
import { css } from 'gatsby-plugin-glamor'

import Header from '../components/header'
import 'prismjs/themes/prism-tomorrow.css'
import './index.css'

const Layout = ({ children, data }) => (
  <div
    css={{
      display: 'grid',
      gridGap: '10px',
      gridTemplateColumns: '.5fr 8fr 2fr .5fr',
      gridTemplateRows: '2fr auto 1fr',
    }}
  >
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <div
      className="header"
      style={{
        gridRow: '1',
        gridColumn: '1/-1',
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
    </div>
    <div
      className="about"
      css={{
        gridColumn: '3 / span 1',
        gridRow: '2',
        height: '600px',
      }}
    >
      About
    </div>
    <div
      className="content"
      css={{
        gridColumn: '2 / span 1',
        gridRow: '2',
      }}
    >
      {children()}
    </div>
    <div
      className="footer"
      style={{
        gridColumn: '1 / -1',
        gridRow: '-1',
      }}
    >
      Footer
    </div>
  </div>
)

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
