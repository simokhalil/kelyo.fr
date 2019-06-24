import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    section: {
        position: 'relative',
        height: 'auto',
        width: '100%',
        minWidth: '100%',
        // minHeight: '100%',
        padding: '50px 70px 70px',
        backgroundColor: '#fff',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
    },
    fullWidth: {
        minHeight: 0,
        padding: 0,
    },
});

const Section = ({ children, fullWidth }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.section} ${fullWidth && classes.fullWidth}`}>
            {children}
        </div>
    );
}

Section.propTypes = {
    children: PropTypes.any,
    fullWidth: PropTypes.bool,
};

Section.defaultProps = {
    fullWidth: false,
};

export default Section;
