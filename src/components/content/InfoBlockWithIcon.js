import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        textAlign: 'left',
        width: '100%',
        display: 'table',
        margin: 0,
        padding: '10px 10px 10px 0',
    },
    iconWrapper: {
        display: 'table-cell',
        width: '54px',
        paddingRight: '25px',
    },
    icon: {
        position: 'relative',
        fontSize: '42px',
        color: '#888',
    },
    textWrapper: {
        position: 'relative',
        display: 'table-cell',
        padding: 0,
        verticalAlign: 'middle',
    },
    title: {
        margin: '5px 0',
    },
    text: {
        fontSize: '0.92em',
    },
});

const InfoBlockWithIcon = ({ icon, fontawesome, title, text }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.iconWrapper}>
                {fontawesome && (
                    <Icon className={`${icon} ${classes.icon}`} />
                )}
                {!fontawesome && (
                    <Icon className={classes.icon}>{icon}</Icon>
                )}
            </div>

            <div className={classes.textWrapper}>
                <h4 className={classes.title}>{title}</h4>
                <p className={classes.text}>{text}</p>
            </div>
        </div>
    );
};

InfoBlockWithIcon.propTypes = {
    fontawesome: PropTypes.bool,
    icon: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
};

InfoBlockWithIcon.defaultProps = {
    fontawesome: false,
};

export default InfoBlockWithIcon;
