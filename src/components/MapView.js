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

      {/* 15m以内 → 内容表示 */}
      {letters
        .filter((letter) => letter.distance != null && letter.distance <= 15)
        .map((letter) => (
          <Marker
            key={`within15-${letter.id}`}
            position={[letter.latitude, letter.longitude]}
          >
            <Popup>{letter.content}</Popup>
          </Marker>
        ))}

      {/* 15m〜100m → 内容なし（ピンだけ） */}
      {letters
        .filter(
          (letter) =>
            letter.distance != null &&
            letter.distance > 15 &&
            letter.distance <= 1000
        )
        .map((letter) => (
          <Marker
            key={`within100-${letter.id}`}
            position={[letter.latitude, letter.longitude]}
          >
            <Popup>この手紙を読むには、もっと近くまで歩いてね。</Popup>
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

