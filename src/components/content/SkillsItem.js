import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontSize: '13px',
        lineHeight: '1.1em',
        position: 'relative',
        float: 'left',
        margin: '0 0 4px',
    },
    value: {
        fontSize: '11px',
        lineHeight: '1.1em',
        position: 'relative',
        float: 'right',
        margin: '0 0 4px',
        color: '#aaa',
        WebkitTransition: 'all 2s ease-in -out',
        transition: 'all 2s ease-in -out',
    },
    progress: {
        position: 'relative',
        backgroundColor: 'transparent',
        border: '1px solid #0099e5',
        WebkitBorderRadius: '8px',
        borderRadius: '8px',
        height: '10px',
        marginBottom: '15px',
        width: '100%',
    },
    progressValue: {
        backgroundColor: '#0099e5',
        border: '2px solid #fff',
        borderRadius: '9px',
        height: '8px',
        padding: 0,
        WebkitTransition: 'all 2s ease-in -out',
        transition: 'all 2s ease-in -out',
    },
});

const SkillsItem = ({ title, value }) => {

    const classes = useStyles();

    return (
        <div>
            <div className="clearfix">
                <h4 className={classes.title}>{title}</h4>
                <div className={classes.value}>{value}%</div>
            </div>

            <div className={classes.progress}>
                <div className={classes.progressValue} style={{ width: `${value}%`}} />
            </div>
        </div>
    );
}

SkillsItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
};

export default SkillsItem;
