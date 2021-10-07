import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

export default function App() {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [type, setType] = useState('restaurants');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (!bounds) return;
    getPlacesData(bounds.sw, bounds.ne, type).then((data) => {
      setPlaces(data);
    });
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ width: '100%' }}
      >
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
          />
        </Grid>
      </Grid>
    </>
  );
}
