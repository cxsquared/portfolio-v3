import React from 'react';
import Colors from '../utils/Colors';
import Icon from 'react-icons-kit';
import { arrowUp } from 'react-icons-kit/fa';
import PropTypes from 'prop-types';

class Toc extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            mobile: false
        }
    }

    handleScroll (){
        const collapse = window.scrollY > 300;
        this.setState({ collapse });
    }

    handleDimensions() {
        const isMobile = window.innerWidth <= 1000;
        this.setState({ mobile: isMobile });
    }
    
    componentDidMount() {
        this.handleScroll();
        this.handleScrollHandle = this.handleScroll.bind(this)
        window.addEventListener('scroll', this.handleScrollHandle);        

        this.handleDimensions();
        this.handleDimensionsHandle = this.handleDimensions.bind(this);
        window.addEventListener('resize', this.handleDimensionsHandle);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollHandle);
        window.removeEventListener('resize', this.handleDimensionsHandle);
    }

    render() {
        let toTop = null; 
        if (this.state.collapse) {
            const tocIcon = <div style={{
                color: Colors.foreground,
                textAlign: 'center'
            }}>
                <Icon icon={arrowUp} size={24} />
            </div>;
            toTop = <button onClick={() => {
                window.scrollTo(0, 0);
            }}
                            style={{
                                position: 'fixed',
                                width: '24px',
                                height: '30px',
                                left: '12px',
                                top: '12px',
                                background: 'transparent',
                                border: 'none',
                                padding: '0',
                                margin: '0' }}>
                {tocIcon}
            </button>;                        
        }

        let toc = null;
        if (this.props.toc !== '') {
            let tocStyle = {
                    margin: 0,
                    display: 'inline',
                    float: 'right',
                    marginLeft: '10px',
                    padding: '5px 15px 5px 15px',
                    background: Colors.selection,
                    borderRadius: '10px',
                    border: `1px solid ${Colors.comment}`
                };

            if (this.state.mobile) {
                tocStyle.display = 'block';
                tocStyle.float = 'none';
            }

            toc = <div style={tocStyle}>
                <h3>Contents</h3>
                <div dangerouslySetInnerHTML={{__html: this.props.toc}}
                 css={{
                    '& ul': {
                        marginLeft: '20px',
                    },
                    '& a': {
                        color: Colors.red,
                        ":hover": {
                            color: Colors.foreground
                        }
                    }
                 }} />
            </div> 
        }

        return <div>
            {toTop}
            {toc}            
        </div>
    }
}

Toc.propTypes = {
    toc: PropTypes.string.isRequired
}

export default Toc;