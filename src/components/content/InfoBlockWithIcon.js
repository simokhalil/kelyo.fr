import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        textAlign: 'justify',
    },
});

const InfoBlockWithIcon = ({ icon, title, text }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.iconWrapper}>
                <FontAwesomeIcon icon={icon} className={classes.icon} />
            </div>

            <div className={classes.textWrapper}>
                <h4 className={classes.title}>{title}</h4>
                <p className={classes.text}>{text}</p>
            </div>
        </div>
    );
};

InfoBlockWithIcon.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    title: PropTypes.string,
    text: PropTypes.string,
};

export default InfoBlockWithIcon;
