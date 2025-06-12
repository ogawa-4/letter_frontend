//置き手紙システムのフロントエンド
//Reactを用いて、入力内容をFastAPIにPOSTし、保存された手紙をすべてGETして表示する 

import React, { useState } from 'react';
import './App.css'; // ← ここでCSS読み込み！
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapView from './components/MapView';
import Message from './components/Message';
import LetterForm from './components/LetterForm';
import Header from './components/Header';
import { getCurrentLocation } from './utils/getCurrentLocation';
import { postLetter } from './utils/postLetter';
import { getLetters } from './utils/getLetters';


const API_BASE_URL = 'https://letter-backend-eqrq.onrender.com';

// Leaflet のマーカーの見た目を修正（画像が表示されない対策）
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function App() {
  const [content, setContent] = useState(''); //手紙の内容
  const [latitude, setLatitude] = useState(''); //緯度（入力は文字列として受け取る）
  const [longitude, setLongitude] = useState(''); //経度
  const [message, setMessage] = useState(''); //サーバから帰ってきたメッセージ
  const [letters, setLetters] = useState([]); //手紙の一覧
  const [currentPosition, setCurrentPosition] = useState(null); // ←現在地のマーカー用

  const handlePostLetter = async () => {
    const result = await postLetter(content, latitude, longitude);
    setMessage(result.message);
  };

  const handleGetCurrentLocation = () => {
    getCurrentLocation(setLatitude, setLongitude, setCurrentPosition, setMessage);
  };


  // 手紙一覧取得
  const handleGetLetters = async () => {
    const data = await getLetters();
    setLetters(data.letters);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Header />
      <LetterForm
        content={content}
        latitude={latitude}
        longitude={longitude}
        setContent={setContent}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        postLetter={handlePostLetter}
        getLetters={handleGetLetters}
        getCurrentLocation={handleGetCurrentLocation}
      />
      <Message message={message} />
      <MapView letters={letters} currentPosition={currentPosition} />
    </div>
  );
}

export default App;
