import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

export default function App() {
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100vw' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}
