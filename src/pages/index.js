import React from 'react'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'

const PostColumn = ({ sectionTitle, posts, gridColumn }) => {
  return (
    <div
      style={{
        margin: rhythm(1 / 4),
        flexGrow: 1,
      }}
    >
      <h1>{sectionTitle}</h1>
      {posts.map(post => {
        return (
          <div key={post.node.id}>
            <Link to={post.node.fields.slug}>
              <h2>{post.node.frontmatter.title}</h2>
              <p>{post.node.excerpt}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

const IndexPage = ({ data }) => {
  return (
    <div
      style={{
        display: 'grid',
        alignContent: 'center',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      <PostColumn
        sectionTitle="Games"
        posts={data.allMarkdownRemark.edges.filter(e => {
          const node = e.node
          if (
            node.frontmatter.category === 'released' ||
            node.frontmatter.category === 'game' ||
            node.frontmatter.category === 'gamejam'
          ) {
            return node
          }
        })}
      />
      <PostColumn
        sectionTitle="Tutorials"
        posts={data.allMarkdownRemark.edges.filter(e => {
          if (e.node.frontmatter.category === 'tutorial') {
            return e.node
          }
        })}
      />
      <PostColumn
        sectionTitle="Posts"
        posts={data.allMarkdownRemark.edges.filter(e => {
          if (e.node.frontmatter.category === 'blog') {
            return e.node
          }
        })}
      />
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            category
            imagePath
            description
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
