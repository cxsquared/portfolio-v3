import React from 'react'
import Link from 'gatsby-link'

const PostColumn = ({ sectionTitle, posts }) => {
  console.log(`Generating posts for ${sectionTitle}`)
  console.log({ posts })
  return (
    <div>
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
  console.log(data)
  return (
    <div>
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
