import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

export default function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (!bounds) return;
    setIsLoading(true);
    getPlacesData(bounds.sw, bounds.ne, type).then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [bounds, type]);

  useEffect(() => {
    setFilteredPlaces(places.filter((place) => place.rating > ratings));
  }, [ratings]);

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
          <List
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            isLoading={isLoading}
            type={type}
            setType={setType}
            ratings={ratings}
            setRatings={setRatings}
          />
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
