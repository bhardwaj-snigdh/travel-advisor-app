import GoogleMapReact from 'google-map-react';

import useStyles from './styles';

export default function Map({ coordinates, setCoordinates, setBounds }) {
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ sw: e.bounds.sw, ne: e.bounds.ne });
        }}
        onChildClick={() => {}}
      ></GoogleMapReact>
    </div>
  );
}
