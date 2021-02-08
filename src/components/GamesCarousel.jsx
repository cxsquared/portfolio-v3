import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Carousel } from 'react-responsive-carousel'

import './index.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

class GamesCarousel extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      width: 1200,
    }
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  _sortGames(gamesToSort) {
    const categories = {
      released: 1,
      gamejam: 1,
      game: 3,
    }

    gamesToSort.sort((g1, g2) => {
      if (g1.frontmatter.category === g2.frontmatter.category) {
        var key1 = new Date(g1.frontmatter.date)
        var key2 = new Date(g2.frontmatter.date)

        if (key1 > key2) {
          return -1
        } else if (key1 === key2) {
          return 0
        } else {
          return 1
        }
      }

      return (
        categories[g1.frontmatter.category] -
        categories[g2.frontmatter.category]
      )
    })

    return gamesToSort
  }

  render() {
    var slides = this._sortGames(this.props.games.map(g => g.node)).map(
      game => {
        return (
          <div
            key={game.id}
            css={{
              display: 'flex',
            }}
          >
            <Link to={game.fields.slug}>
              <img
                alt={`${game.frontmatter.title} screen shot`}
                src={game.frontmatter.image.publicURL}
                css={{
                  height: 'fit-content',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />
              <p className="legend">{game.frontmatter.title}</p>
            </Link>
          </div>
        )
      }
    )

    let centerSlidePercentage = 33.33
    if (this.state.width <= 1000) {
      centerSlidePercentage = 100
    }

    return (
      <div className="games">
        <h1 css={{ textAlign: 'center' }}>Games</h1>
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          centerSlidePercentage={centerSlidePercentage}
          useKeyboardArrows={true}
        >
          {slides}
        </Carousel>
      </div>
    )
  }
}

GamesCarousel.propTypes = {
  games: PropTypes.array.isRequired,
}

export default GamesCarousel
