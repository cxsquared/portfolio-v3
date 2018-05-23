import React from 'react'
import Link from 'gatsby-link'

const PostsColumn = ({ sectionTitle, posts, gridColumn }) => {
  return (
    <div>
      <h1>{sectionTitle}</h1>
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

export default PostsColumn
