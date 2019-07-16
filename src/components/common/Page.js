import PropTypes from 'prop-types';
import React from 'react';
import { isMobileOnly } from "react-device-detect";

import { makeStyles } from '@material-ui/core/styles';

import Footer from '../footer';

const useStyles = makeStyles({
    page: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        minWidth: '100%',
        minHeight: '100%',
        paddingLeft: isMobileOnly ? 0 : '15px',
        margin: '0 auto',
        top: 0,
        left: 0,
        right: 0,
        overflowX: 'hidden',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
    },
});

const Page = ({ children }) => {

    const classes = useStyles();

    return (
        <section className={classes.page}>
            {children}

            <Footer />
        </section>
    );
}

Page.propTypes = {
    children: PropTypes.any,
};

export default Page;
