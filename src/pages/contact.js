import React from 'react'
import Contact from '../components/Contact'

const ContactPage = ({ data, location }) => {
  return (
    <div>
      <h1>I'd love to hear from you!</h1>
      <p>
        If you have any questions over a tutorial or just want to get in touch
        with me please use the form below.
      </p>
      <Contact
        submitted={/^\?s=true/.test(location.search)}
        siteUrl={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
      />
    </div>
  )
}

export default ContactPage

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
