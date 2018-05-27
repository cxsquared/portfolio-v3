import React from 'react'
import Helmet from 'react-helmet'
import { css } from 'gatsby-plugin-glamor'

import Header from '../components/header'
import About from '../components/About'

import 'prismjs/themes/prism-tomorrow.css'
import './index.css'

class Layout extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      width: 1200,
    }
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  render() {
    return (
      <div
        css={{
          display: 'grid',
          gridGap: '15px',
          gridTemplateColumns: '1fr 8fr 2fr 1fr',
          gridTemplateRows: '2fr auto auto 1fr',
        }}
      >
        <Helmet
          title={this.props.data.site.siteMetadata.title}
          meta={[{ name: 'keywords', content: 'sample, something' }]}
        />
        <div
          className="header"
          style={{
            gridRow: '1',
            gridColumn: '1/-1',
          }}
        >
          <Header siteTitle={this.props.data.site.siteMetadata.title} />
        </div>
        <About />
        <div
          className="content"
          css={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 2',
            '@media all and (max-width: 1000px)': {
              gridColumn: '2 / span 2',
              gridRow: '2',
            },
          }}
        >
          {this.props.children()}
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
  }
}

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
