/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateBabelConfig = ({ actions }) => {
  if (process.env.NODE_ENV !== 'development') {
    actions.setBabelPlugin({
      name: '@babel/plugin-transform-regenerator',
      options: {},
    })
    actions.setBabelPlugin({
      name: '@babel/plugin-transform-runtime',
      options: {},
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
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

      // Redirecting links from my old Jekyll v2 portfolio website
      const redirectUrls = [
        {
          f: `/tutorial/making-a-basic-fmod-audio-engine-in-c.html`,
          t: '/tutorials/making-a-basic-fmod-audio-engine-in-c/',
        },
        {
          f: `/tutorial/Unreal4-NPC-Dialogue-System.html`,
          t: '/tutorials/unreal4-npc-dialogue-system/',
        },
        {
          f: `/tutorial/unreal4-npc-dialogue-system.html`,
          t: '/tutorials/unreal4-npc-dialogue-system/',
        },
        {
          f: `/tutorial/Setting-Up-Xcode-and-Visual-Studio-for-FMOD-Development.html`,
          t:
            '/tutorials/setting-up-xcode-and-visual-studio-for-fmod-development/',
        },
        {
          f: `/tutorial/setting-up-xcode-and-visual-studio-for-fmod-development.html`,
          t:
            '/tutorials/setting-up-xcode-and-visual-studio-for-fmod-development/',
        },
        { f: `/tutorial/`, t: '/tutorials/' },
        {
          f: `/tutorial/scheduling-posts-with-jekyll.html`,
          t: '/tutorials/scheduling-posts-with-jekyll/',
        },
        {
          f: `/tutorial/creating-a-visual-novel-in-unity.html`,
          t: '/tutorials/creating-a-visual-novel-in-unity/',
        },
        {
          f: `/blog/global-game-jam-2017-a-failed-postmortem.html`,
          t: '/blog/global-game-jam-2017-a-failed-postmortem/',
        },
        {
          f: `/blog/a-quick-guide-to-game-jams.html`,
          t: '/blog/a-quick-guide-to-game-jams/',
        },
        {
          f: `/blog/Weekly-3D-Print-Hamilton-Statue.html`,
          t: '/blog/weekly-3d-print-hamilton-statue/',
        },
        {
          f: `/blog/weekly-3d-print-cobra-fan-mount.html`,
          t: '/blog/weekly-3d-print-cobra-fan-mount/',
        },
        {
          f: `/blog/A-Year-Of-3D-Printing.html`,
          t: '/blog/a-year-of-3d-printing/',
        },
        {
          f: `/spooky/`,
          t: '/games/spooky/',
        },
      ]

      redirectUrls.forEach(({ f, t }) => {
        createRedirect({
          fromPath: f,
          redirectInBrowser: true,
          toPath: t,
          isPermanent: true,
        })
      })

      resolve()
    })
  })
}
