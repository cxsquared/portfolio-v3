import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import Colors from '../utils/Colors'
import { rhythm } from '../utils/typography'
import Seo from '../components/Seo'
import { graphql, withPrefix } from 'gatsby'
import Layout from '../components/layout'
import { isMobile } from 'react-device-detect'

export default ({ data, location }) => {
  const post = data.markdownRemark
  const slug = location.pathname

  let comments = null
  if (post.frontmatter.comments) {
    comments = (
      <DiscussionEmbed
        shortname={data.site.siteMetadata.disqus.shortname}
        config={{
          identifier: post.id,
          title: post.title,
          url: `${data.site.siteMetadata.siteUrl}${slug}`,
        }}
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

  let game = ''
  if (post.frontmatter.game_link) {
    let divider = (
      <hr style={{ color: 'grey', backgroundColor: 'grey', height: '2px' }} />
    )
    if (isMobile) {
      game = [
        <p>
          This game is not designed to work on mobile. If you still want to give
          it a shot go to{' '}
          <a href={withPrefix(post.frontmatter.game_link)}>
            {withPrefix(post.frontmatter.game_link)}
          </a>
          .
        </p>,
        divider,
      ]
    } else {
      game = [
        <iframe
          title={post.frontmatter.title}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          src={withPrefix(post.frontmatter.game_link)}
        />,
        divider,
      ]
    }
  }

  return (
    <Layout location={location}>
      <div>
        <Seo
          key={`seo-${post.id}`}
          postImage={postImage}
          postData={post}
          isBlogPost
          postUrl={`${data.site.siteMetadata.siteUrl}${slug}`}
        />
        {header}
        {game}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {comments}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query GameQuery($slug: String!) {
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
        game_link
        game_type
        toc
        image {
          publicURL
        }
      }
    }
  }
`
