import React from 'react'
import Helmet from 'react-helmet'
import Contact from '../components/Contact'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'

const ContactPage = ({ location }) => {
  return (
    <StaticQuery
      query={graphql`
        query ContactQuery {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `}
      render={data => (
        <Layout location={location}>
          <div>
            <Helmet>
              <title>Contact</title>
            </Helmet>
            <h1>I'd love to hear from you!</h1>
            <p>
              If you have any questions over a tutorial or just want to get in
              touch with me please use the form below.
            </p>
            <Contact
              submitted={/^\?s=true/.test(location.search)}
              siteUrl={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
            />
          </div>
        </Layout>
      )}
    />
  )
}

export default ContactPage
