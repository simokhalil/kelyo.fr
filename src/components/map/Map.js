import GoogleMapReact from 'google-map-react';
import React from 'react';

import { Icon } from '@material-ui/core';

const mapStyles = require("./map-style.json");

const Map = ({ children, ...props }) => {

    return (
        <div style={{ height: '400px', margin: '0 0 30px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyCPlh6wxElx2eEzm9y93YIpXlPvXCuCfm0',
                }}
                defaultZoom={12}
                defaultCenter={props.center}
                options={{ styles: mapStyles, disableDefaultUI: true }}
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
