import React from 'react';
import Link from 'gatsby-link';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../layouts/index.css';

class GamesCarousel extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() { 
    setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 150); 
  }

  render() {

    return <div className="game-section"
                style={{
                  backgroundColor: '#b5bd68',
                  textAlign: 'center',
                  color: '#969896',
                  height: '360px'
                }}>
      <h2 style={{
        marginTop: 0
      }}>Games</h2>
      <div className="game-carousel">
        GamesCarousel
      </div>
    </div>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive:[
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    const categories = {
      "released": 1,
      "gamejam": 2,
      "game": 3
    }
    
    const games = this.props.games;

    games.sort((g1, g2) => {
      if (g1.node.frontmatter.category === g2.node.frontmatter.category) {
        var key1 = new Date(g1.node.frontmatter.date);
        var key2 = new Date(g2.node.frontmatter.date);

        if (key1 > key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
      }

      return (categories[g1.node.frontmatter.category] - categories[g2.node.frontmatter.category]);
    })

    return <div className="games">
      <h1>Games</h1>
      <Slider {...settings}>
          {games.map(game => {
              return <div
                className="game"
                key={game.node.id}
              >
                <Link to={game.node.fields.slug}>
                  <h3>{game.node.frontmatter.title}</h3>
                    <img
                    src={game.node.frontmatter.image.publicURL}
                    style={{
                      width: 'fit-content',
                      alignSelf: 'center',
                      objectFit: 'cover'
                    }}/> 
                </Link>
              </div>;
          })}
      </Slider>
    </div>;
  }
}

GamesCarousel.propTypes = {
  games: PropTypes.array.isRequired
}

export default GamesCarousel;
