import GoogleMapReact from 'google-map-react';
import React from 'react';
import { isMobile } from 'react-device-detect';

import { Icon, makeStyles } from '@material-ui/core';

const mapStyles = require("./map-style.json");

const useStyles = makeStyles({
    root: {
        height: isMobile ? '200px' : '400px',
        margin: '0 0 30px',
    }
});

const Map = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.MAPS_API_KEY,
                }}
                defaultZoom={12}
                defaultCenter={props.center}
                options={{ styles: mapStyles, disableDefaultUI: true, scrollwheel: false, }}
                yesIWantToUseGoogleMapApiInternals
                {...props}
            >
                <Icon
                    className="fas fa-map-marker-alt"
                    lat={props.center.lat}
                    lng={props.center.lng}
                    style={{ fontSize: '40px', color: '#0099e5' }}
                    {...props}
                />
            </GoogleMapReact>
        </div>

    );
};

export default Map;
