import React from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { navigateTo } from 'gatsby-link';
import { slide as Menu } from 'react-burger-menu';
import Colors from '../utils/Colors';
import logo from '../assets/logo.svg';
import Icon from 'react-icons-kit';
import { search, navicon } from 'react-icons-kit/fa';
import { rhythm } from '../utils/typography';
import { css } from 'gatsby-plugin-glamor';

const menuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '12px',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: Colors.foreground 
  },
  bmMenu: {
    background: Colors.currentLine,
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: 0,
    left: 0
  },
  bmMenuWrap: {
    top: 0
  }
};

class Header extends React.PureComponent{ 
  constructor(props){
    super(props);

    this.state = {
      width: 1200,
      menuOpen: false
    }
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

  _navLinkClicked(target) {
    this.setState({
      menuOpen: false
    });
    navigateTo(target);
  }

  _onMenuChange(state) {
    this.setState({menuOpen: state.isOpen})
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

    const searchInput = <div style={{ display: 'flex' }}>
      <input type="text" 
        placeholder="Search"
        css={{
          border: '0',
          width: '100%',
          outline: '0',
          borderBottom: `1px solid ${Colors.currentLine}`,
          background: 'transparent',
          ':focus': {
            outline: 'none'
      }}} />
      <Icon icon={search} />
    </div>;

    const navLinkStyle={
      color: 'black',
      fontSize: rhythm(.75),
      ':hover': {
        color: Colors.red
      }
    };

    const navBarLinkStyle={
      color: Colors.foreground,
      fontSize: rhythm(1),
      ':hover': {
        color: Colors.red
      }
    }

    let nav = <nav style={{
        display: 'inline-block',
        flex: '1',
        height: '50px' }}>
      <ul style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0' }}>
        {this._buildNavLink(<Link to={"/"} css={navLinkStyle}>Home</Link>)}
        {this._buildNavLink(<Link to={"/games/"} css={navLinkStyle}>Games</Link>)}
        {this._buildNavLink(<Link to={"/tutorials/"} css={navLinkStyle}>Tutorials</Link>)}
        {this._buildNavLink(<Link to={"/blog/"} css={navLinkStyle}>Blog</Link>, "", { marginRight: 'auto' })}
        {this._buildNavLink(searchInput, "", { width: '23%' })}
      </ul>
    </nav>;
    if (this.state.width <= 1000) {
      nav = <Menu right={true}
                  styles={menuStyles}
                  isOpen={this.state.menuOpen}
                  onStateChange={this._onMenuChange.bind(this)}
                  customBurgerIcon={<Icon icon={navicon} size={32} />}>
          <div css={navBarLinkStyle} onClick={() => this._navLinkClicked("/")}>Home</div>
          <div css={navBarLinkStyle} onClick={() => this._navLinkClicked("/games/")}>Games</div>
          <div css={navBarLinkStyle} onClick={() => this._navLinkClicked("/tutorials/")}>Tutorials</div>
          <div css={navBarLinkStyle} onClick={() => this._navLinkClicked("/blog/")}>Blog</div>
          {searchInput}
        </Menu>;
    }

    return <div style={{
      margin: '0 auto',
      padding: '.50rem 1.0875rem',
      background: Colors.blue,
      display: 'grid',
      gridTemplateColumns: '1fr 8fr 2fr 1fr' }} >
      <div style={{
        gridColumn:' 2 / span 2' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap' }}>
          {logoTitle}
          {nav}
        </div>
      </div>
    </div>;
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header;
