import PropTypes from 'prop-types';
import React from 'react';

const Skills = ({ children, title }) => (
    <div style={{ marginBottom: '40px'}}>
        {title && (
            <h4 style={{ margin: '5px 0' }}>{title}</h4>
        )}

        {children}
    </div>
);

Skills.propTypes = {
    title: PropTypes.string,
}

export default Skills;
