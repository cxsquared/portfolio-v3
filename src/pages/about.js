import React from 'react'
import SocialMediaLinks from '../components/SocialMediaLinks'
import me from '../assets/me.jpg'

class About extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>About Me</h1>
        <img
          src={me}
          alt="Picture of Cody Claborn with a doggo."
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
          and hobbiest game developer. My main focus is in audio programming and
          how audio can be made better for video games. My background is in
          Music Technology with a BS in Music Technology from IUPUI. If you want
          to talk video games, programming, music, or 3D printing feel free to
          get in touch with the form bellow. Or you can contact me on{' '}
          <a href="https://twitter.com/cxsquared">Twitter</a>
        </p>
      </div>
    )
  }
}

export default About
