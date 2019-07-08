import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

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
            <OutboundLink key={index} className={classes.link} href={profile.url} target="_blank" rel="noopener" aria-label={profile.network} title={profile.network}>
              {profile.network === 'email'
                ? <FontAwesomeIcon icon={['far', 'envelope']} className={classes.icon} />
                : <FontAwesomeIcon icon={['fab', profile.network]} className={classes.icon} />
              }
            </OutboundLink>
          ))}
        </div>
    );
}

SocialLinks.propTypes = {
    profiles: PropTypes.array,
};

export default SocialLinks;
