import React from 'react'
import Link from 'gatsby-link'
import { navigateTo } from 'gatsby-link'
import Posts from '../components/Posts'
import Pagination from '../components/Pagination'

class PaginatedPage extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  _onPaginationChange(pageNumber) {
    console.log(`pageNumber:${pageNumber}`)
    const pathPrefix = `/${this.props.pathContext.pathPrefix}/`
    if (pageNumber === 1) {
      navigateTo(pathPrefix)
    } else {
      navigateTo(`${pathPrefix}${pageNumber}`)
    }
  }

  render() {
    const {
      group,
      index,
      first,
      last,
      pageCount,
      pathPrefix,
      additionalContext,
    } = this.props.pathContext
    console.log(`pathContext:${JSON.stringify(this.props.pathContext)}`)

    let paginationNav = null
    if (pageCount > 1) {
      paginationNav = (
        <Pagination
          currentPage={index}
          totalPages={pageCount}
          pathPrefix={pathPrefix}
        />
      )
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <h1>{additionalContext.category}</h1>
        {group.map(({ node }) => (
          <div key={node.id} className="blogListing">
            <div className="date">{node.frontmatter.date}</div>
            <Link className="blogUrl" to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
            <div>{node.excerpt}</div>
          </div>
        ))}
        {paginationNav}
      </div>
    )
  }
}

export default PaginatedPage
