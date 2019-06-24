import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { nl2br } from '../../utils/stringUtils';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
        paddingBottom: '15px',
    },
    left: {
        width: '30%',
        display: 'table-cell',
        paddingRight: '25px',
        minHeight: '100%',
        textAlign: 'right',
        verticalAlign: 'top',
    },
    period: {
        margin: '3px 0',
        fontSize: '14px',
        lineHeight: '1.4em',
    },
    company: {
        display: 'block',
        color: '#aaa',
        margin: '0 0 4px',
        fontSize: '12px',
        lineHeight: '1.45em',
    },
    divider: {
        position: 'absolute',
        top: 0,
        left: '30%',
        bottom: 0,
        width: '1px',
        backgroundColor: '#eee',
        '&:after': {
            content: '""',
            display: 'block',
            backgroundColor: '#fff',
            border: '2px solid #0099e5',
            marginTop: '7px',
            width: '11px',
            height: '11px',
            marginLeft: '-5px',
            borderRadius: '5px',
        }
    },
    right: {
        width: '70%',
        display: 'table-cell',
        paddingLeft: '25px',
        paddingRight: '15px',
        verticalAlign: 'top',
    },
    title: {
        fontSize: '16px',
        marginBottom: '3px',
    },
    description: {
        fontSize: '0.92em',
        textAlign: 'justify',
    },
});

const TimelineItem = ({ period, company, title, description, website }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <h5 className={classes.period}>{period}</h5>
                {website
                    ? <a href={website} className={classes.company} target="_blank" rel="noopener noreferrer">{company}</a>
                    : <span className={classes.company}>{company}</span>
                }
            </div>

            <div className={classes.divider} />

            <div className={classes.right}>
                <h4 className={classes.title}>{title}</h4>

                {description && typeof description === 'string' && (
                    <p className={classes.description} dangerouslySetInnerHTML={{ __html: nl2br(description) }} />
                )}

                {description && Array.isArray(description) && (
                    <ul className={classes.description}>
                        {description.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: nl2br(item) }} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

TimelineItem.propTypes = {
    period: PropTypes.string,
    company: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    website: PropTypes.string,
};

export default TimelineItem;
