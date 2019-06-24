import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2px',
    width: '28px',
    height: '28px',
    color: '#888',
    backgroundColor: '#eee',
    '&:hover': {
      backgroundColor: '#0099e5',
      color: '#fff',
    },
  },
  icon: {
    color: 'inherit',
    fontSize: '14px',
    lineHeight: '28px',
    width: 'auto',
    height: 'auto',
  },
});

const SocialLinks = ({ profiles }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          {profiles.map((profile, index) => (
            <a className={classes.link} href={profile.url} target="_blank">
              {profile.network === 'email'
                ? <Icon className={`far fa-envelope ${classes.icon} `} />
                : <Icon className={`fab fa-${profile.network} ${classes.icon}`} />
              }
            </a>
          ))}
        </div>
    );
}

SocialLinks.propTypes = {
    profiles: PropTypes.array,
};

export default SocialLinks;
