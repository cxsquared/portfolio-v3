import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby-link'
import Icon from 'react-icons-kit'
import { angleLeft, angleRight } from 'react-icons-kit/fa'
import Colors from '../utils/Colors'

class Pagination extends React.PureComponent {
  render() {
    const linkStyle = {
      color: Colors.foreground,
      float: 'left',
      padding: '8px 16px',
      textDecoration: 'none',
      ':hover': {
        backgroundColor: Colors.selection,
      },
    }

    let pageNumbers = [this.props.totalPages - 1]
    for (let i = 1; i <= this.props.totalPages; i++) {
      let style = { ...linkStyle }
      if (i === this.props.currentPage) {
        style.backgroundColor = Colors.red
        style[':hover'] = {
          backgroundColor: Colors.red,
        }
      }
      if (i === 1) {
        pageNumbers[i - 1] = (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/${this.props.pathPrefix}/`)}
            onKeyDown={e =>
              e.key === 13 ? navigate(`/${this.props.pathPrefix}/`) : null
            }
            css={style}
          >
            {i}
          </div>
        )
      } else {
        pageNumbers[i - 1] = (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onKeyDown={e =>
              e.key === 13 ? navigate(`/${this.props.pathPrefix}/${i}`) : null
            }
            onClick={() => navigate(`/${this.props.pathPrefix}/${i}`)}
            css={style}
          >
            {i}
          </div>
        )
      }
    }

    const prevPageNumber = this.props.currentPage - 1

    let prevPage = null
    if (prevPageNumber > 0) {
      prevPage =
        prevPageNumber === 1 ? (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={e =>
              e.key === 13 ? navigate(`/${this.props.pathPrefix}/`) : null
            }
            onClick={() => navigate(`/${this.props.pathPrefix}/`)}
            css={linkStyle}
          >
            <Icon icon={angleLeft} />
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={e =>
              e.key === 13
                ? navigate(`/${this.props.pathPrefix}/${prevPageNumber}`)
                : null
            }
            onClick={() =>
              navigate(`/${this.props.pathPrefix}/${prevPageNumber}`)
            }
            css={linkStyle}
          >
            <Icon icon={angleLeft} />
          </div>
        )
    }

    const nextPageNumber = this.props.currentPage + 1

    let nextPage = null
    if (nextPageNumber <= this.props.totalPages) {
      nextPage = (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={e =>
            e.key === 13
              ? navigate(`/${this.props.pathPrefix}/${nextPageNumber}`)
              : null
          }
          onClick={() =>
            navigate(`/${this.props.pathPrefix}/${nextPageNumber}`)
          }
          css={linkStyle}
        >
          <Icon icon={angleRight} />
        </div>
      )
    }

    return (
      <div
        css={{
          display: 'inline-block',
        }}
      >
        {prevPage}
        {pageNumbers}
        {nextPage}
      </div>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pathPrefix: PropTypes.string.isRequired,
}

export default Pagination
