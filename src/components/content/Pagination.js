import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core';

import Row from './Row';
import Col from './Col';

const useStyles = makeStyles({
    pagination: {
        textAlign: 'center',
    },
    arrowContainer: {
        display: 'inline-block',
        padding: 0,
        margin: '0 10px',
        backgroundColor: '#fafafa',
        height: '40px',
        width: '40px',
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: '18px',
        cursor: 'pointer',
        border: '1px solid #e5e5e5',
        color: '#666',
        WebkitTransition: 'all 0.3s ease-in-out',
        transition: 'all 0.3s ease-in-out',
        WebkitBoxShadow: '0 0 4px 0 rgba(0, 0, 0, .1)',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, .1)',

        '&:hover, &.active': {
            backgroundColor: '#0099e5',
            color: '#fff',
        },
    },
});

const Pagination = ({ currentPage, numPages }) => {
    const classes = useStyles();

    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 <= 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`;
    const nextPage = `/blog/${(currentPage + 1).toString()}`;

    if (numPages <= 1) {
        return null;
    }

    return (
        <Row>
            <Col xs={12}>
                <div className={classes.pagination}>
                    {!isFirst && (
                        <Link to={prevPage} rel="prev">
                            <div className={classes.arrowContainer}>
                                <FontAwesomeIcon icon={["fas", "chevron-left"]} />
                            </div>
                        </Link>
                    )}

                    {Array.from({ length: numPages }, (_, i) => (
                        <Link key={`pagination-number${i + 1}`} to={`/blog/${i === 0 ? "" : i + 1}`}>
                            <div className={`${classes.arrowContainer} ${currentPage - 1 === i ? 'active' : ''}`}>
                                {i + 1}
                            </div>
                        </Link>
                    ))}

                    {!isLast && (
                        <Link to={nextPage} rel="next">
                            <div className={classes.arrowContainer}>
                                <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                            </div>
                        </Link>
                    )}
                </div>
            </Col>
        </Row>
    )
}

export default Pagination;
