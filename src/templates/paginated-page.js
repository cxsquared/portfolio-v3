import React from 'react'
import Helmet from 'react-helmet'
import { navigate } from 'gatsby-link'
import Posts from '../components/Posts'
import Pagination from '../components/Pagination'
import Layout from '../components/layout'

class PaginatedPage extends React.PureComponent {
  _onPaginationChange(pageNumber) {
    const pathPrefix = `/${this.props.pageContext.pathPrefix}/`
    if (pageNumber === 1) {
      navigate(pathPrefix)
    } else {
      navigate(`${pathPrefix}${pageNumber}`)
    }
  }

  render() {
    const {
      group,
      index,
      pageCount,
      pathPrefix,
      additionalContext,
    } = this.props.pageContext

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
      <Layout location={this.props.location}>
        <div>
          <Helmet>
            <title>{additionalContext.category}</title>
          </Helmet>
          {posts}
          <div css={{ textAlign: 'center' }}>{paginationNav}</div>
        </div>
      </Layout>
    )
  }
}

export default PaginatedPage
