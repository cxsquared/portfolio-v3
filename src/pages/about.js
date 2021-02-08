import React from 'react'
import Helmet from 'react-helmet'
import Contact from '../components/Contact'
import me from '../assets/me.jpg'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

class About extends React.PureComponent {
  render() {
    const about = (
      <div>
        <h1>About Me</h1>
        <img
          src={me}
          alt="Cody Claborn with a doggo."
          style={{
            width: '15%',
            height: '15%',
            float: 'left',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        <p
          style={{
            marginTop: '48px',
          }}
        >
          Since you've stumbled upon this site I'll tell you a little about
          myself. My name is Cody Claborn. Currently I'm a full time programmer
          and hobbyist game developer. My main focus is in audio programming and
          how audio can be made better for video games. My background is in
          Music Technology with a BS in Music Technology from IUPUI. If you want
          to talk video games, programming, music, or 3D printing feel free to
          get in touch with the form bellow. Or you can contact me on{' '}
          <a href="https://twitter.com/cxsquared">Twitter</a>
        </p>
      </div>
    )

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet>
            <title>About</title>
          </Helmet>
          {about}
          <Contact
            submitted={/^\?s=true/.test(this.props.location.search)}
            siteUrl={`${this.props.data.site.siteMetadata.siteUrl}${this.props.location.pathname}`}
          />
        </div>
      </Layout>
    )
  }
}

export default About

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
