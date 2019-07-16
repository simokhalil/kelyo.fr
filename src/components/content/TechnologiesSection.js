import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  icon: {
    fontSize: '54px',
    lineHeight: '90px',
  },
});

const TechnologiesSection = ({ colored }) => {
  const classes = useStyles();
  const devIconColoredClass = colored ? 'colored' : '';

  return (
    <div className={classes.container}>
      <i className={`devicon-javascript-plain ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-typescript-plain ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-webpack-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-react-original-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-nodejs-plain ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-express-original-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-mongodb-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-angularjs-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-git-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-bootstrap-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-html5-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-css3-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-sass-original ${devIconColoredClass} ${classes.icon}`} />
      <i className={`devicon-docker-plain-wordmark ${devIconColoredClass} ${classes.icon}`} />
    </div>
  );
};

export default TechnologiesSection;
