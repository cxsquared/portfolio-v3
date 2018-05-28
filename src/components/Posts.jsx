import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import { css } from 'gatsby-plugin-glamor';
import Colors from '../utils/Colors';
import { rhythm  } from '../utils/typography';

class Posts extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { sectionTitle, posts } = this.props; 

    const formattedPosts = posts.map(({node}, i) => {
            const postLink = node.fields.slug;
            let image = null;
            if (this.props.includeImages && node.frontmatter.image) {
              image = <Link to={postLink}>
                <img src={node.frontmatter.image.publicURL} 
                           style={{
                             objectFit: 'cover',
                             width: '40%',
                             float: 'right',
                             padding: '5px'
                           }}/>
              </Link>
            }
            return (
              <div key={node.id} 
                  className="post" 
                  css={{
                      padding: '10px',
                      flex: '1 1 50%',
                      '@media (max-width: 1000px)': {
                        flex: '1 1 100%'
                      }
                    }}>
                  <header>
                      <time dateTime={node.frontmatter.date}
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
                          {new Date(node.frontmatter.date).toDateString()}
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
                          {node.frontmatter.title}
                        </Link>
                      </h3>
                  </header>
                  <p>
                    {image}
                    {node.excerpt}
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
          });

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
          {formattedPosts}          
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  includeImages: PropTypes.bool
}

export default Posts;
