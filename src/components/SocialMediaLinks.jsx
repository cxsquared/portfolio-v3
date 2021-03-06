import React from 'react'
import PropTypes from 'prop-types'

import { withBaseIcon } from 'react-icons-kit'
import { twitter, github, linkedin } from 'react-icons-kit/fa'

class SocialMediaLinks extends React.PureComponent {
  render() {
    const StyledIcon = withBaseIcon({ size: this.props.size })

    const twitterLink = (
      <a
        href="https://twitter.com/cxsquared"
        target="_blank"
        rel="noreferrer"
        css={{
          flex: 1,
          ...this.props.iconStyle,
        }}
      >
        <StyledIcon icon={twitter} />
      </a>
    )

    const githubLink = (
      <a
        href="https://github.com/cxsquared"
        target="_blank"
        rel="noreferrer"
        css={{
          flex: 1,
          ...this.props.iconStyle,
        }}
      >
        <StyledIcon icon={github} />
      </a>
    )

    const linkedinLink = (
      <a
        href="https://www.linkedin.com/in/cxsquared/"
        target="_blank"
        rel="noreferrer"
        css={{
          flex: 1,
          ...this.props.iconStyle,
        }}
      >
        <StyledIcon icon={linkedin} />
      </a>
    )

    return (
      <div
        css={{
          ...this.props.style,
          textAlign: 'center',
          display: 'flex',
        }}
      >
        {githubLink}
        {twitterLink}
        {linkedinLink}
      </div>
    )
  }
}

SocialMediaLinks.propTypes = {
  size: PropTypes.number.isRequired,
}

export default SocialMediaLinks
