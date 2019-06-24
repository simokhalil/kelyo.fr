import PropTypes from 'prop-types';
import React from 'react';

import { Grid } from '@material-ui/core';

const Col = ({ children, ...props }) => (
    <Grid item {...props}>
        {children}
    </Grid>
);

Col.propTypes = {
    children: PropTypes.any,
};

export default Col;