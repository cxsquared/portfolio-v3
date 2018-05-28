import React from 'react';
import Link from 'gatsby-link';
import Colors from '../utils/Colors';
import SocialMediaLinks from './SocialMediaLinks';

class About extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const author = <div>
            <h3>The musings and creations of Cody Claborn</h3>
            <p>
                Hi! I'm a programmer currently living in Indiana. 
                I'm passionate about video games, music, and how programming intersetcs the two. 
                Here are the projects I've worked on along with tutorials and other various blog posts.{' '}
                <Link to="/about/"
                  css={{
                    color: Colors.red,
                    ':hover': {
                        color: Colors.foreground
                    }}}>
                    More about me
                </Link>
            </p>
        </div>;

        const socialMedia = <div style={{ width: '60%' }}>
            <h4>Get in touch</h4>
            <SocialMediaLinks size={32} iconStyle={{ color: Colors.blue }} /> 
        </div>

        const music = <div>
            <h4>Music</h4>
            <iframe width="100%" 
                    height="450" 
                    style={{ border: 'none' }}
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/7355881&color=%23cc6666&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" />
        </div>;

        return <div
        className="about"
        css={{
            gridColumn: '3 / span 1',
            gridRow: '2 / span 1',
            padding: '8px',
            borderLeft: `2px solid ${Colors.blue}`,
            borderRadius: '20px 5px 5px 20px',
            background: Colors.currentLine ,
            '@media all and (max-width: 1000px)': {
                gridColumn: '2 / span 2',
                gridRow: '3',
                border: `2px solid ${Colors.blue}`,
                borderRadius: '20px 20px 20px 20px',
            }}}>
            {author}
            {socialMedia}
            {music}
        </div>;
    }
}

export default About;
