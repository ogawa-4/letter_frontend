// MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapView({ letters, currentPosition }) {
  return (
    <MapContainer
      center={[35.6895, 139.6917]}
      zoom={13}
      style={{ height: '400px', width: '100%', marginTop: '2rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      {letters.map((letter) => (
        <Marker key={letter.id} position={[letter.latitude, letter.longitude]}>
          <Popup>{letter.content}</Popup>
        </Marker>
      ))}
      {currentPosition && (
        <Marker position={currentPosition}>
          <Popup>あなたの現在地</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapView;
