import React from 'react'
import Posts from '../components/Posts'
import GamesCarousel from '../components/GamesCarousel'
import Layout from '../components/layout'
import { StaticQuery, graphql } from 'gatsby'

const IndexPage = ({ location }) => {
  const games = data =>
    data.allMarkdownRemark.edges.filter(e => {
      const node = e.node
      if (
        node.frontmatter.category === 'released' ||
        node.frontmatter.category === 'game' ||
        node.frontmatter.category === 'gamejam'
      ) {
        return node
      }

      return null
    })

  return (
    <StaticQuery
      query={graphql`
        query IndexQuery {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
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
      `}
      render={data => (
        <Layout location={location}>
          <div className="content-sections">
            <GamesCarousel games={games(data)} />
            <Posts
              sectionTitle="Latest Posts"
              posts={data.allMarkdownRemark.edges
                .filter(e => {
                  if (
                    e.node.frontmatter.category === 'blog' ||
                    e.node.frontmatter.category === 'tutorial'
                  ) {
                    return e.node
                  }

                  return null
                })
                .slice(0, 8)}
            />
          </div>
        </Layout>
      )}
    />
  )
}

export default IndexPage
