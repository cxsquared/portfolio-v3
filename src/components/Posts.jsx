import React from 'react'
import Link from 'gatsby-link'
import { css } from 'gatsby-plugin-glamor'
import Colors from '../utils/Colors';
import { rhythm  } from '../utils/typography'

const Posts = ({ sectionTitle, posts, gridColumn }) => {
  return (
    <div className="posts">
      <h1 style={{
        textAlign: "center"
      }}>{sectionTitle}</h1>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
        {posts.map((post, i) => {
          const postLink = post.node.fields.slug;
          return (
            <div key={post.node.id} 
                 className="post" 
                 css={{
                    padding: '10px',
                    flex: '1 1 50%',
                    '@media (max-width: 1000px)': {
                      flex: '1 1 100%'
                    }
                  }}>
                <header>
                    <time dateTime={post.node.frontmatter.date}
                          style={{
                            fontSize: rhythm (1/2)
                          }}
                    >
                      <Link to={postLink}
                            css={{
                              color: Colors.comment,
                              ':hover': {
                                color: Colors.red
                              }
                            }}>
                        {new Date(post.node.frontmatter.date).toDateString()}
                      </Link>
                    </time>
                    <h3 style={{
                      marginTop: rhythm(1/4)
                    }}>
                      <Link to={postLink}
                            css={{
                              color: Colors.foreground,
                              ':hover': {
                                  color: Colors.red
                              }}}>
                        {post.node.frontmatter.title}
                      </Link>
                    </h3>
                </header>
                <p>
                  {post.node.excerpt}
                  <span style={{
                    display: 'block'
                  }}>
                    <Link to={postLink}
                          css={{
                            color: Colors.red,
                            ':hover': {
                              color: Colors.foreground
                            }}}>
                      Read More
                    </Link>
                  </span>
                </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Posts 
