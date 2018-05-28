/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              excerpt(pruneLength: 400)
              frontmatter {
                title
                image {
                  publicURL
                }
                description
                date
                category
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      // games paginated index
      createPaginatedPages({
        edges: result.data.allMarkdownRemark.edges.filter(e =>
          ['game', 'gamejam', 'released'].includes(e.node.frontmatter.category)
        ),
        createPage: createPage,
        pageTemplate: 'src/templates/paginated-page.js',
        pathPrefix: 'games',
        pageLength: 10,
        context: {
          category: 'Games',
        },
      })

      // tutorials paginated index
      createPaginatedPages({
        edges: result.data.allMarkdownRemark.edges.filter(e =>
          ['tutorial'].includes(e.node.frontmatter.category)
        ),
        createPage: createPage,
        pageTemplate: 'src/templates/paginated-page.js',
        pathPrefix: 'tutorials',
        pageLength: 10,
        context: {
          category: 'Tutorials',
        },
      })

      // blog paginated index
      createPaginatedPages({
        edges: result.data.allMarkdownRemark.edges.filter(e =>
          ['blog'].includes(e.node.frontmatter.category)
        ),
        createPage: createPage,
        pageTemplate: 'src/templates/paginated-page.js',
        pathPrefix: 'blog',
        pageLength: 10,
        context: {
          category: 'Blog',
        },
      })

      // all posts
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
