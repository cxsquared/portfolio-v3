import React from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import Colors from '../utils/Colors';
import logo from '../assets/logo.svg';
import { rhythm } from '../utils/typography';
import { css } from 'gatsby-plugin-glamor';

class Header extends React.PureComponent{ 
  constructor(props){
    super(props);
  }

  _buildNavLink(children, flexAmount, extraStyle) {
    return <li css={{
        listStyleType: 'none',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        flex: flexAmount,
        marginBottom: '0',
        ...extraStyle }}>
        {children}
    </li>;
  }

  render() {
    const logoTitle =<h1 style={{ 
      margin: 0,
      padding: 0,
      border: 'none',
      alignSelf: 'center',
      borderRight: `1px solid ${Colors.currentLine}`,
      paddingRight: '5px' }}>
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
      <img src={logo}
          style={{
            display: 'inline',
            width: '30px',
            height: '30px',
            margin: '0',
            objectFit: 'cover',
            verticalAlign: '-6px'
          }}/>
        <span style={{ 
          fontSize: rhythm(1) }}>
          {this.props.siteTitle.toUpperCase()}
        </span>
      </Link>
    </h1>;

    const search = <input type="text" 
                          placeholder="Search"
                          css={{
                            border: '0',
                            width: '100%',
                            outline: '0',
                            borderBottom: `1px solid ${Colors.currentLine}`,
                            background: 'transparent',
                            ':focus': {
                              outline: 'none'
                            }}} />;

    const navLinkStyle={
      color: 'black',
      fontSize: rhythm(.75),
      ':hover': {
        color: Colors.red
      }
    };

    return <div style={{
      margin: '0 auto',
      padding: '.50rem 1.0875rem',
      background: Colors.blue,
      display: 'grid',
      gridTemplateColumns: '1fr 8fr 2fr 1fr' }} >
      <div style={{
        gridColumn:' 2 / span 2' }}>
        <div style={{
          display: 'flex' }}>
          {logoTitle}
          <nav style={{
            display: 'inline-block',
            flex: '1',
            height: '50px' }}>
            <ul style={{
              display: 'flex',
              margin: '0' }}>
              {this._buildNavLink(<Link to={"/games/"} css={navLinkStyle}>Games</Link>)}
              {this._buildNavLink(<Link to={"/tutorials/"} css={navLinkStyle}>Tutorials</Link>)}
              {this._buildNavLink(<Link to={"/blog/"} css={navLinkStyle}>Blog</Link>, "", { marginRight: 'auto' })}
              {this._buildNavLink(search, "", { width: '23%' })}
            </ul>
          </nav>
        </div>
      </div>
    </div>;
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header;
