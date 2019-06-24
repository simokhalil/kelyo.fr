import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        textAlign: 'center',
        width: '100%',
        display: 'block',
        margin: 0,
        background: '#fff',
        padding: '20px 10px 15px',
        border: '1px solid #eee',
        WebkitBoxShadow: 'none',
        boxShadow: 'none',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        WebkitTransition: 'all 0.2s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
            WebkitTransform: 'translateY(-5px)',
            boxShadow: '0 12px 17px rgba(0, 0, 0, 0.12)',
            WebkitBoxShadow: '0 12px 17px rgba(0, 0, 0, 0.12)',
        },
    },
    icon: {
        position: 'relative',
        fontSize: '40px',
        color: '#b5b5b5',
    },
    label: {
        fontSize: '16px',
        marginTop: '10px',
    },
});

const InfoBlockRaise = ({ icon, fontawesome, label }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {fontawesome && (
                <Icon className={`${icon} ${classes.icon}`} />
            )}
            {!fontawesome && (
                <Icon className={classes.icon}>{icon}</Icon>
            )}

            <h4 className={classes.label}>{label}</h4>
        </div>
    );
}

InfoBlockRaise.prototype = {
    fontawesome: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
};

InfoBlockRaise.defaultProps = {
    fontawesome: false,
};

export default InfoBlockRaise;
