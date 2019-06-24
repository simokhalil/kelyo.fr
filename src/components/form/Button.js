import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        display: 'inline-block',
        position: 'relative',
        padding: '0.8em 2em',
        marginBottom: '.25em',
        fontSize: '1em',
        fontFamily: 'Poppins, Robotto, sans-serif',
        lineHeight: '1.2',
        border: 0,
        outline: 0,
        border: '2px solid #0099e5',
        color: '#222',
        textShadow: 'none',
        backgroundColor: 'transparent',
        borderRadius: 0,
        WebkitTransition: 'all 0.3s ease-in-out',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#0099e5',
            color: '#fff',
        }
    },
});

const Button = ({ children, href, ...props }) => {
    const classes = useStyles();

    return href
        ? <a href={href} className={classes.button}>{children}</a>
        : <button {...props} className={classes.button}>{children}</button>;
}

Button.propTypes = {
    children: PropTypes.any,
    href: PropTypes.string,
}

export default Button;
