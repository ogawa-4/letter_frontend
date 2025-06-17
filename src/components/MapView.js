// MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapView({ letters, currentPosition }) {
  return (
    <MapContainer
      center={[35.6895, 139.6917]} // 東京駅あたり
      zoom={13}
      style={{ height: '400px', width: '100%', marginTop: '2rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

      {/* 100m以内の手紙だけマップに表示 */}
      {letters
        .filter((letter) => letter.distance != null && letter.distance <= 100)
        .map((letter) => (
          <Marker
            key={letter.id}
            position={[letter.latitude, letter.longitude]}
          >
            <Popup>
              {letter.content
                ? letter.content
                : "この手紙を読むには、もっと近くまで歩いてね。"}
            </Popup>
          </Marker>
        ))}

      {/* 現在地マーカー */}
      {currentPosition && (
        <Marker position={currentPosition}>
          <Popup>あなたの現在地</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapView;
