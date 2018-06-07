import React from 'react'
import Fuse from 'fuse.js'
import Helmet from 'react-helmet'
import Posts from '../components/Posts'

class Search extends React.PureComponent {
  constructor(props) {
    super(props)

    const options = {
      shouldSort: true,
      threshold: 0.6,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      location: 0,
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
    if (!/^\?s=.+$/.test(query)) {
      return ''
    }

    return decodeURI(query.replace(/^\?s=/, ''))
  }

  render() {
    const postsFound = this._searchForPosts(this._getSearchString());

    let posts = <h3>No Search results found :(</h3>;
    if( postsFound.length > 0) {
	    posts = <Posts
        sectionTitle="Search"
        posts={postsFound}
        includeImages={true}
      />
    }

    return (
      <div>
        <Helmet>
	  <title>
	    Search
	  </title>
	</Helmet>
        {posts}
      </div>
    );
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
