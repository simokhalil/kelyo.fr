import PropTypes from 'prop-types';
import React from 'react';

import { Grid } from '@material-ui/core';

const Row = ({ children, spacing }) => (
    <Grid container spacing={spacing}>
        {children}
    </Grid>
);

Row.propTypes = {
    children: PropTypes.any,
    spacing: PropTypes.number,
};

Row.defaultProps = {
    spacing: 0,
};

export default Row;