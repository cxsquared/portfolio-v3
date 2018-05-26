import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import '../layouts/index.css';

class GamesCarousel extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() { 
    setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 150); 
  }

  _sortGames(gamesToSort) {
    const categories = {
      "released": 1,
      "gamejam": 2,
      "game": 3
    }

    gamesToSort.sort((g1, g2) => {
      if (g1.frontmatter.category === g2.frontmatter.category) {
        var key1 = new Date(g1.frontmatter.date);
        var key2 = new Date(g2.frontmatter.date);

        if (key1 > key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
      }

      return (categories[g1.frontmatter.category] - categories[g2.frontmatter.category]);
    });

    return gamesToSort;
  }

  render() {
    var slides = this._sortGames(this.props.games.map(g => g.node)).map((game, i) => {
        return <Slide index={i}
                      key={game.id}>
          <Link to={game.fields.slug}>
            <h3>{game.frontmatter.title}</h3>
              <Image src={game.frontmatter.image.publicURL}
                     style={{
                       objectFit: 'cover'
                     }} />
          </Link>
        </Slide>
    });

    return <div className="games">
      <h1>Games</h1>
      <CarouselProvider naturalSlideWidth={100}
                        naturalSlideHeight={125}
                        totalSlides={slides.length}
                        visibleSlides={3} >
        <Slider>
          {slides}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>;
  }
}

GamesCarousel.propTypes = {
  games: PropTypes.array.isRequired
}

export default GamesCarousel;
