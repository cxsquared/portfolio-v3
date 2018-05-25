import React from 'react'
import Link from 'gatsby-link'
import Posts from '../components/Posts'
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

  return (
    <div className="content-sections">
      <GamesCarousel games={games} />
      <Posts
        sectionTitle="What's New"
        posts={data.allMarkdownRemark.edges
          .filter(e => {
            if (
              e.node.frontmatter.category === 'blog' ||
              e.node.frontmatter.category === 'tutorial'
            ) {
              return e.node
            }
          })
          .slice(0, 4)}
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
