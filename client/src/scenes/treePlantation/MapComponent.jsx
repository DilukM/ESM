import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Grid, Typography, Card, CardContent, CardHeader, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Custom marker icon setup
const locationIcon = new L.Icon({
  iconUrl: require('../../assets/placeholder.png'), // Replace with your icon path
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // optional shadow
  shadowSize: [41, 41], // size of the shadow
  shadowAnchor: [12, 41] // point of the shadow which will correspond to marker's location
});

const MapComponent = () => {
  const [suitableAreas, setSuitableAreas] = useState([]);
  const mapRef = useRef();
  const navigate = useNavigate();

  const sriLankaBounds = {
    northEast: { lat: 9.8313, lng: 81.8813 },
    southWest: { lat: 5.9167, lng: 79.6520 }
  };

  const coastalBuffer = 0.05;

  const isValidLandArea = (lat, lng) => {
    return (
      lat >= sriLankaBounds.southWest.lat + coastalBuffer &&
      lat <= sriLankaBounds.northEast.lat - coastalBuffer &&
      lng >= sriLankaBounds.southWest.lng + coastalBuffer &&
      lng <= sriLankaBounds.northEast.lng - coastalBuffer
    );
  };

  const getMapboxAddressDetails = async (lat, lng) => {
    const accessToken = 'pk.eyJ1IjoibWFkdWRhcmEiLCJhIjoiY2x6dGh5bjVrMWF4czJrcHdndWs5ODY4eSJ9.kBCdCzV6qZGOETyIwUIlYg';
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`, {
        params: {
          access_token: accessToken,
          limit: 1
        }
      });

      if (response.data.features.length > 0) {
        const place = response.data.features[0];

        const province = place.context?.find(c => c.id.startsWith('region') || c.id.startsWith('province'))?.text || 'N/A';
        const district = place.context?.find(c => c.id.startsWith('district'))?.text || place.context?.find(c => c.id.startsWith('borough'))?.text || 'N/A';
        const city = place.context?.find(c => c.id.startsWith('place') || c.id.startsWith('locality') || c.id.startsWith('neighborhood'))?.text || 'N/A';

        return { province, district, city };
      } else {
        return { province: 'N/A', district: 'N/A', city: 'N/A' };
      }
    } catch (error) {
      console.error('Error fetching Mapbox address details:', error);
      return { province: 'N/A', district: 'N/A', city: 'N/A' };
    }
  };

  const getOpenCageAddressDetails = async (lat, lng) => {
    const apiKey = '81e3eb2f40704eddb7e5c62c3db0ee34';
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: `${lat}+${lng}`,
          key: apiKey
        }
      });

      if (response.data.results.length > 0) {
        const result = response.data.results[0];
        const components = result.components;

        const province = components.state || 'N/A';
        const district = components.county || components.suburb || 'N/A';
        const city = components.city || components.town || components.village || 'N/A';

        return { province, district, city };
      } else {
        return { province: 'N/A', district: 'N/A', city: 'N/A' };
      }
    } catch (error) {
      console.error('Error fetching OpenCage address details:', error);
      return { province: 'N/A', district: 'N/A', city: 'N/A' };
    }
  };

  const getAddressDetails = async (lat, lng) => {
    let details = await getMapboxAddressDetails(lat, lng);

    if (details.province === 'N/A' || details.district === 'N/A' || details.city === 'N/A') {
      details = await getOpenCageAddressDetails(lat, lng);
    }

    return details;
  };

  const findSuitableAreas = async () => {
    const map = mapRef.current;
    if (!map) return;

    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    const newSuitableAreas = [];
    for (let i = 0; i < 10; i++) {
      const lat = Math.random() * (northEast.lat - southWest.lat) + southWest.lat;
      const lng = Math.random() * (northEast.lng - southWest.lng) + southWest.lng;

      if (!isValidLandArea(lat, lng)) continue;

      const addressDetails = await getAddressDetails(lat, lng);

      newSuitableAreas.push({
        position: [lat, lng],
        reason: "Open Space Detected",
        ...addressDetails
      });
    }

    setSuitableAreas(newSuitableAreas);
  };

  useEffect(() => {
    findSuitableAreas();
  }, []);

  return (
    <div>
      <MapContainer
        center={[7.873054, 80.771797]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFkdWRhcmEiLCJhIjoiY2x6dGh5bjVrMWF4czJrcHdndWs5ODY4eSJ9.kBCdCzV6qZGOETyIwUIlYg`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        />

        {suitableAreas.map((area, index) => (
          <Circle
            key={index}
            center={area.position}
            radius={100}
            color="green"
            fillColor="green"
            fillOpacity={0.5}
          >
            <Marker position={area.position} icon={locationIcon}>
              <Tooltip>{area.reason}</Tooltip>
            </Marker>
          </Circle>
        ))}
      </MapContainer>

      <button onClick={findSuitableAreas}>Search Again</button>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {suitableAreas.map((area, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardHeader
                title={`Location: ${area.position[0].toFixed(4)}, ${area.position[1].toFixed(4)}`}
                subheader={`Reason: ${area.reason}`}
              />
              <CardContent>
                <Typography variant="body2">
                  Province: {area.province}
                </Typography>
                <Typography variant="body2">
                  District: {area.district}
                </Typography>
                <Typography variant="body2">
                  City/Town/Village: {area.city}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/create-program?lat=${area.position[0]}&lng=${area.position[1]}`)}
                >
                  Create Program
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MapComponent;
