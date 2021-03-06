import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Colors from '../utils/Colors'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import About from './About'
import SocialMediaLinks from './SocialMediaLinks'

import './index.css'
import 'prismjs/themes/prism-tomorrow.css'

class Layout extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      width: 1200,
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <div
            css={{
              display: 'grid',
              gridGap: '15px',
              gridTemplateColumns: '1fr 8fr 2fr 1fr',
              gridTemplateRows: '2fr auto auto 1fr',
            }}
          >
            <Helmet
              defaultTitle={data.site.siteMetadata.title}
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            >
              <meta name="twitter:site" content="@cxsquared" />
              <meta name="og:type" content="website" />
              <meta
                name="og:site_name"
                content={data.site.siteMetadata.title}
              />
              <link
                rel="canonical"
                href={`${data.site.siteMetadata.siteUrl}${this.props.location.pathname}`}
              />
              <html lang="en" />
            </Helmet>
            <div
              className="header"
              style={{
                gridRow: '1',
                gridColumn: '1/-1',
              }}
            >
              <Header siteTitle={data.site.siteMetadata.title} />
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
              {this.props.children}
            </div>
            <div
              style={{
                gridColumn: '1 / -1',
                gridRow: '-1',
                display: 'flex',
                background: Colors.blue,
              }}
            >
              <div
                style={{ flex: '1', textAlign: 'start', marginLeft: '20px' }}
              >
                <SocialMediaLinks
                  size={32}
                  style={{ width: '30%', minWidth: '150px' }}
                  iconStyle={{
                    color: Colors.background,
                    ':hover': { color: Colors.red },
                  }}
                />
              </div>
              <div
                style={{
                  flex: '1',
                  textAlign: 'center',
                  color: Colors.background,
                }}
              >
                <p>© {new Date().getFullYear()}, Cody Claborn</p>
              </div>
              <div style={{ flex: '1', textAlign: 'end', marginRight: '20px' }}>
                <Link
                  css={{
                    color: Colors.background,
                    ':hover': {
                      color: Colors.red,
                    },
                    fontSize: '20px',
                  }}
                  to="/contact/"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        )}
      />
    )
  }
}

export default Layout
