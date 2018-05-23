import React from 'react'
import Link from 'gatsby-link'
import PostsColumn from '../components/PostsColumn'
import GamesCarousel from '../components/GamesCarousel'

import { rhythm } from '../utils/typography'

const IndexPage = ({ data }) => {
  const games = data.allMarkdownRemark.edges.filter(e => {
    const node = e.node
    if (
      node.frontmatter.category === 'released' ||
      node.frontmatter.category === 'game' ||
      node.frontmatter.category === 'gamejam'
    ) {
      return node
    }
  })

  games.forEach(e => {
    e.node.frontmatter.imageURL = data.allFile.edges.find(
      e2 => e2.node.base === e.node.frontmatter.image
    ).node.publicURL
  })

  return (
    <div>
      <GamesCarousel games={games} />
      <PostsColumn
        sectionTitle="Posts"
        posts={data.allMarkdownRemark.edges.filter(e => {
          if (
            e.node.frontmatter.category === 'blog' ||
            e.node.frontmatter.category === 'tutorial'
          ) {
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
    allFile {
      edges {
        node {
          publicURL
          base
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            category
            image
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
