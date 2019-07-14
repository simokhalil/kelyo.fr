import React from 'react';

const TechnologiesSection = ({ colored }) => {

  const devIconColoredClass = colored ? 'colored' : '';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <i
        className={`devicon-javascript-plain ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-typescript-plain ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-webpack-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-react-original-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-nodejs-plain ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-express-original-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-mongodb-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-angularjs-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-git-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-bootstrap-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-html5-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-css3-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-sass-original ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
      <i
        className={`devicon-docker-plain-wordmark ${devIconColoredClass}`}
        style={{ fontSize: '54px' }}
      />
    </div>
  );
};

export default TechnologiesSection;
