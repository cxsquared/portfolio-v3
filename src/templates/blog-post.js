import React from 'react'
import ReactDisqusThread from 'react-disqus-thread'

export default ({ data, location }) => {
  const post = data.markdownRemark

  let comments = null
  if (post.frontmatter.comments) {
    comments = (
      <ReactDisqusThread
        shortname={data.site.siteMetadata.disqus.shortname}
        identifier={post.id}
        title={post.title}
        url={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
      />
    )
  }

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {comments}
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        disqus {
          shortname
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents
      frontmatter {
        title
        comments
        image {
          publicURL
        }
      }
    }
  }
`
