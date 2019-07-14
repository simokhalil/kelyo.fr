import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    h3: {
        display: 'inline-block',
        margin: '0 0 20px',
        paddingBottom: '3px',
        marginTop: 0,
        '&:after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '2px',
            marginTop: '-1px',
            backgroundColor: '#0099e5',
        }
    },
});

const SectionTitle = ({ title }) => {

    const classes = useStyles();

    return (
        <div className="block-title">
            <h3 className={classes.h3}>
                {title}
            </h3>
        </div>
    );
}

SectionTitle.propTypes = {
    title: PropTypes.string,
};

export default SectionTitle;
