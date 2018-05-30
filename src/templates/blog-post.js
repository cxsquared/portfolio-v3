import React from 'react'
import ReactDisqusThread from 'react-disqus-thread'
import Colors from '../utils/Colors'
import { rhythm } from '../utils/typography'
import Seo from '../components/Seo'

export default ({ data, location }) => {
  const post = data.markdownRemark
  const slug = location.pathname

  let comments = null
  if (post.frontmatter.comments) {
    comments = (
      <ReactDisqusThread
        shortname={data.site.siteMetadata.disqus.shortname}
        identifier={post.id}
        title={post.title}
        url={`${data.site.siteMetadata.siteUrl}${slug}`}
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

  let postImage = ''
  if (post.frontmatter.image) {
    postImage = post.frontmatter.image.publicURL
  }

  return (
    <div>
      <Seo
        key={`seo-${post.id}`}
        postImage={postImage}
        postData={post}
        isBlogPost
        postUrl={`${data.site.siteMetadata.siteUrl}${slug}`}
      />
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
      excerpt
      frontmatter {
        date
        title
        description
        comments
        image {
          publicURL
        }
      }
    }
  }
`
