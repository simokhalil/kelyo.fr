import PropTypes from 'prop-types';
import React from 'react';
import { isMobile } from 'react-device-detect';

import { makeStyles } from '@material-ui/core/styles';

import { nl2br } from '../../utils/stringUtils';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        display: isMobile ? 'block' : 'table',
        tableLayout: 'fixed',
        width: '100%',
        paddingBottom: '15px',
    },
    left: {
        width: isMobile ? '100%' : '30%',
        display: isMobile ? 'block' : 'table-cell',
        paddingRight: '25px',
        paddingLeft: isMobile ? '25px' : undefined,
        minHeight: '100%',
        textAlign: isMobile ? 'left' : 'right',
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
        left: isMobile ? 0 : '30%',
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
        width: isMobile ? '100%' : '70%',
        display: isMobile ? 'block' : 'table-cell',
        paddingLeft: '25px',
        paddingRight: isMobile ? 0 : '15px',
        verticalAlign: 'top',
    },
    title: {
        fontSize: '16px',
        marginBottom: '3px',
    },
    description: {
        fontSize: '0.92em',
        textAlign: 'justify',
        paddingLeft: isMobile ? '10px' : '40px',
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
