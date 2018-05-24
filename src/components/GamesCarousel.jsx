import React from 'react';
import Link from 'gatsby-link';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../layouts/index.css';

const GamesCarousel = ({ games }) => {
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

    return <div>
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
                    src={game.node.frontmatter.imageURL}
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

export default GamesCarousel;