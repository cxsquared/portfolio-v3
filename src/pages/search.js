import React from 'react'
import Fuse from 'fuse.js'
import Posts from '../components/Posts'

class Search extends React.PureComponent {
  constructor(props) {
    super(props)

    const options = {
      keys: [
        {
          name: 'node.frontmatter.title',
          weight: 0.5,
        },
        {
          name: 'node.frontmatter.category',
          weight: 0.2,
        },
        {
          name: 'node.frontmatter.tags',
          weight: 0.2,
        },
        {
          name: 'node.frontmatter.date',
          weight: 0.1,
        },
      ],
    }

    this._fuse = new Fuse(this.props.data.allMarkdownRemark.edges, options)
  }

  _searchForPosts(search) {
    return this._fuse.search(search).slice(0, 10)
  }

  _getSearchString() {
    const query = this.props.location.search
    if (!/^\?s=[\w]+$/.test(query)) {
      return ''
    }

    return query.replace(/^\?s=/, '')
  }

  render() {
    return (
      <Posts
        sectionTitle="Search"
        posts={this._searchForPosts(this._getSearchString())}
        includeImages={true}
      />
    )
  }
}

export default Search

export const query = graphql`
  query SearchQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            category
            tags
            image {
              publicURL
            }
            description
            date
          }
          fields {
            slug
          }
          excerpt(pruneLength: 400)
        }
      }
    }
  }
`
