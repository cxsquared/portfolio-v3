import React from 'react'
import Link from 'gatsby-link'
import { css } from 'gatsby-plugin-glamor'

const Posts = ({ sectionTitle, posts, gridColumn }) => {
  return (
    <div
    css={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 2fr 2fr',

      '@media(min-width: 600px)': {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 2fr 2fr',
      },
    }}>
      <h1
      style={{
        gridRow: '1',
        gridColumn: '1 / -1'
      }}>{sectionTitle}</h1>
      {posts.map((post, i) => {
        return (
          <div key={post.node.id} className="post">
            <Link to={post.node.fields.slug}>
              <h3>{post.node.frontmatter.title}</h3>
              <p style={{}}>{post.node.excerpt}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Posts 
