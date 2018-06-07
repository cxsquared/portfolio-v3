import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
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

    const posts = (
      <Posts
        sectionTitle={additionalContext.category}
        posts={group}
        includeImages={true}
      />
    )

    return (
      <div>
      	<Helmet>
	  <title>
	    {additionalContext.category}
	  </title>
	</Helmet>
        {posts}
        <div style={{ textAlign: 'center' }}>{paginationNav}</div>
      </div>
    )
  }
}

export default PaginatedPage
