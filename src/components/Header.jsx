import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { navigate } from 'gatsby-link'
import { slide as Menu } from 'react-burger-menu'
import Colors from '../utils/Colors'
import logo from '../assets/logo.svg'
import Icon from 'react-icons-kit'
import { search, navicon } from 'react-icons-kit/fa'
import { scale } from '../utils/typography'

const menuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '12px',
    top: '12px',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: Colors.foreground,
  },
  bmMenu: {
    background: Colors.currentLine,
    padding: '2.5em 1.5em 0',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: 0,
    left: 0,
  },
  bmMenuWrap: {
    top: 0,
  },
  bmItem: {
    fontSize: scale(2),
  },
}

class Header extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      width: 1200,
      menuOpen: false,
      searchQuery: '',
    }
  }

  _buildNavLink(children, flexAmount, extraStyle) {
    return (
      <li
        css={{
          listStyleType: 'none',
          textAlign: 'center',
          padding: '10px',
          boxSizing: 'border-box',
          flex: flexAmount,
          marginBottom: '0',
          ...extraStyle,
        }}
      >
        {children}
      </li>
    )
  }

  _navLinkClicked(target) {
    this.setState({
      menuOpen: false,
    })
    navigate(target)
  }

  _handleKeyDown(e, target) {
    e.preventDefault()

    if (e.keyCode === 13) {
      this._navLinkClicked(target)
    }
  }

  _onMenuChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  _onSearchEnter() {
    const search = this.state.searchQuery
    this.setState({
      searchQuery: '',
      menuOpen: false,
    })
    navigate(`/search/?s=${search}`)
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth })
  }

  componentDidMount() {
    this.updateDimensions()
    this.updateDimensionsHandle = this.updateDimensions.bind(this)
    window.addEventListener('resize', this.updateDimensionsHandle)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensionsHandle)
  }

  render() {
    const logoTitle = (
      <h1
        css={{
          margin: 0,
          padding: 0,
          border: 'none',
          alignSelf: 'center',
          borderRight: `1px solid ${Colors.currentLine}`,
          paddingRight: '5px',
          paddingBottom: `calc(0.40625rem - 1px)`,
          textAlign: 'center',
        }}
      >
        <Link
          to="/"
          css={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <img
            alt="Sound Waves with a blue Gradient. The site logo"
            src={logo}
            css={{
              display: 'inline',
              width: '30px',
              height: '30px',
              margin: '0',
              marginRight: '3px',
              objectFit: 'cover',
              verticalAlign: '-3px',
            }}
          />
          <span
            css={{
              fontSize: scale(1),
            }}
          >
            {this.props.siteTitle.toUpperCase()}
          </span>
        </Link>
      </h1>
    )

    const searchStyle = {
      border: '0',
      width: '100%',
      outline: '0',
      borderBottom: `1px solid ${Colors.currentLine}`,
      background: 'transparent',
      ':focus': {
        outline: 'none',
      },
    }

    if (this.state.width <= 1000) {
      searchStyle.borderBottom = `1px solid ${Colors.foreground}`
      searchStyle.color = Colors.foreground
    }

    const searchInput = (
      <div css={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Search"
          onChange={e =>
            this.setState({
              searchQuery: e.target.value,
            })
          }
          value={this.state.searchQuery}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this._onSearchEnter()
            }
          }}
          css={searchStyle}
        />
        <button
          onClick={() => this._onSearchEnter()}
          css={{
            background: 'transparent',
            border: 'none',
            color: Colors.foreground,
            ':hover': {
              color: Colors.red,
            },
          }}
        >
          <Icon icon={search} />
        </button>
      </div>
    )

    const navLinkStyle = {
      color: 'black',
      fontSize: scale(2),
      ':hover': {
        color: Colors.red,
      },
    }

    const navBarLinkStyle = {
      color: Colors.foreground,
      fontSize: scale(2),
      ':hover': {
        color: Colors.red,
      },
    }

    let nav = (
      <nav
        css={{
          display: 'inline-block',
          flex: '1',
          height: '50px',
        }}
      >
        <ul
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0',
          }}
        >
          {this._buildNavLink(
            <Link to={'/'} css={navLinkStyle}>
              Home
            </Link>
          )}
          {this._buildNavLink(
            <Link to={'/games/'} css={navLinkStyle}>
              Games
            </Link>
          )}
          {this._buildNavLink(
            <Link to={'/tutorials/'} css={navLinkStyle}>
              Tutorials
            </Link>
          )}
          {this._buildNavLink(
            <Link to={'/blog/'} css={navLinkStyle}>
              Blog
            </Link>,
            '',
            { marginRight: 'auto' }
          )}
          {this._buildNavLink(searchInput, '', { width: '23%' })}
        </ul>
      </nav>
    )
    if (this.state.width <= 1000) {
      nav = (
        <Menu
          right={true}
          styles={menuStyles}
          isOpen={this.state.menuOpen}
          onStateChange={this._onMenuChange.bind(this)}
          customBurgerIcon={<Icon icon={navicon} size={32} />}
        >
          <div
            role="link"
            tabIndex={0}
            css={navBarLinkStyle}
            onClick={() => this._navLinkClicked('/')}
            onKeyDown={e => this._handleKeyDown(e, '/')}
          >
            Home
          </div>
          <div
            role="link"
            tabIndex={0}
            css={navBarLinkStyle}
            onClick={() => this._navLinkClicked('/games/')}
            onKeyDown={e => this._handleKeyDown(e, '/games/')}
          >
            Games
          </div>
          <div
            role="link"
            tabIndex={0}
            css={navBarLinkStyle}
            onClick={() => this._navLinkClicked('/tutorials/')}
            onKeyDown={e => this._handleKeyDown(e, '/tutorials/')}
          >
            Tutorials
          </div>
          <div
            role="link"
            tabIndex={0}
            css={navBarLinkStyle}
            onClick={() => this._navLinkClicked('/blog/')}
            onKeyDown={e => this._handleKeyDown(e, '/blog/')}
          >
            Blog
          </div>
          {searchInput}
        </Menu>
      )
    }

    return (
      <div
        css={{
          margin: '0 auto',
          padding: '.50rem 1.0875rem',
          background: Colors.blue,
          display: 'grid',
          gridTemplateColumns: '1fr 8fr 2fr 1fr',
        }}
      >
        <div
          css={{
            gridColumn: ' 2 / span 2',
          }}
        >
          <div
            css={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {logoTitle}
            {nav}
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header
