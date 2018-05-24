import React from 'react'
import PropTypes from 'prop-types'
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
      gridTemplateColumns: '40px auto 40px',
      gridTemplateRows: '2fr 4fr auto 1fr',

      '@media(min-width: 600px)': {
        gridTemplateColumns: '40px auto 300px 40px',
        gridTemplateRows: '2fr auto 1fr',
      },
    }}
  >
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
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
      <Header
        siteTitle={data.site.siteMetadata.title}
        backgroundColor={data.site.siteMetadata.colors.blue}
      />
    </div>
    <div
      className="about"
      css={{
        gridColumn: '1 / -1',
        gridRow: '2',

        '@media(min-width: 600px)': {
          gridColumn: '3 / span 1',
          gridRow: '2',
        },
      }}
    >
      About
    </div>
    <div
      className="content"
      css={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
        gridColumn: '2 / span 1',
        gridRow: '3',

        '@media(min-width: 600px)': {
          gridColumn: '2 / span 1',
          gridRow: '2',
        },
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

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        colors {
          blue
        }
      }
    }
  }
`
