import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { navigateTo } from 'gatsby-link';
import Icon from 'react-icons-kit';
import { angleLeft, angleRight, angleDoubleLeft, angleDoubleRight } from 'react-icons-kit/fa';
import Colors from '../utils/Colors';

class Pagination extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const linkStyle = {
            color: Colors.foreground,
            float: 'left',
            padding: '8px 16px',
            textDecoration: 'none',
            ':hover': {
                backgroundColor: Colors.selection
            }
        }

        let pageNumbers = [this.props.totalPages-1];
        for (let i = 1; i <= this.props.totalPages; i++) {
            let style = {...linkStyle};
            if (i === this.props.currentPage) {
                style.backgroundColor = Colors.red;
                style[':hover'] = {
                    backgroundColor: Colors.red
                }
            }
            if (i === 1){
                pageNumbers[i-1] = <div key={i} onClick={() => navigateTo(`/${this.props.pathPrefix}/`)} css={style}>{i}</div>;
            } else {
                pageNumbers[i-1] = <div key={i} onClick={() => navigateTo(`/${this.props.pathPrefix}/${i}`)} css={style}>{i}</div>;
            }
        }

        const prevPageNumber = this.props.currentPage - 1;

        let prevPage = null;
        if (prevPageNumber > 0) {
            prevPage =  prevPageNumber === 1 
                ? <div onClick={() => navigateTo(`/${this.props.pathPrefix}/`)} css={linkStyle}>
                    <Icon icon={angleLeft} />
                  </div> 
                : <div onClick={() => navigateTo(`/${this.props.pathPrefix}/${prevPageNumber}`)} css={linkStyle}>
                    <Icon icon={angleLeft} /> 
                  </div>;
        }

        const nextPageNumber = this.props.currentPage + 1;

        let nextPage = null;
        if (nextPageNumber <= this.props.totalPages) {
            nextPage = <div onClick={() => navigateTo(`/${this.props.pathPrefix}/${nextPageNumber}`)} css={linkStyle}>
                <Icon icon={angleRight} />
            </div>;
        }

        return <div style={{
            display: 'inline-block'
        }}>
            {prevPage}
            {pageNumbers}
            {nextPage}
        </div>;
    }
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pathPrefix: PropTypes.string.isRequired
}

export default Pagination;