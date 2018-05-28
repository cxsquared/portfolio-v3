import React from 'react'
import ReactDisqusThread from 'react-disqus-thread'
import Colors from '../utils/Colors'
import { rhythm } from '../utils/typography'

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

  const header = (
    <header
      style={{
        marginBottom: rhythm(1),
      }}
    >
      <h1
        style={{
          marginBottom: 0,
          color: Colors.foreground,
        }}
      >
        {post.frontmatter.title}
      </h1>
      <time
        dateTime={post.frontmatter.date}
        style={{
          fontSize: rhythm(1 / 2),
          color: Colors.comment,
        }}
      >
        {new Date(post.frontmatter.date).toDateString()}
      </time>
    </header>
  )

  return (
    <div>
      {header}
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
        date
        title
        comments
        image {
          publicURL
        }
      }
    }
  }
`
