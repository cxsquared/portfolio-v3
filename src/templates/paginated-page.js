import React from 'react'
import Link from 'gatsby-link'

export default ({ data, pathContext }) => {
  const { group, index, first, last, pageCount } = pathContext
  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <div>
      <h4>{pageCount} Posts</h4>

      {group.map(({ node }) => (
        <div key={node.id} className="blogListing">
          <div className="date">{node.frontmatter.date}</div>
          <Link className="blogUrl" to={node.fields.slug}>
            {node.frontmatter.title}
          </Link>
          <div>{node.excerpt}</div>
        </div>
      ))}
      <div className="previousLink" />
      <div className="nextLink" />
    </div>
  )
}
