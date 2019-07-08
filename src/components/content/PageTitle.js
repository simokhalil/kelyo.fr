import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginBottom: '40px',
    },
    title: {
        fontSize: '30px',
        margin: '0 0 8px',
        lineHeight: '1.5em',
        '&:after': {
            content: '""',
            display: 'block',
            width: '100%',
            marginTop: '5px',
            height: '2px',
            backgroundColor: '#eeeeee',
            opacity: 1,
        },
    },
    description: {
        display: 'block',
        margin: 0,
        color: '#666',
        fontSize: '14px',
        fontWeight: '400',
        textAlign: 'right',
    },
});

const PageTitle = ({ title, description }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{title}</h1>
            <h5 className={classes.description}>{description}</h5>
        </div>
    );
}

PageTitle.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};

export default PageTitle;
