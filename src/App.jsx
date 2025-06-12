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
import Header from './Header';
import Header from './components/Header';



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

  //手紙送信の関数
  //fetchを用いて、POSTリクエストを送信、レスポンスをmessageに格納
  const postLetter = async () => {
    const response = await fetch(`${API_BASE_URL}/letters/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, latitude: parseFloat(latitude), longitude: parseFloat(longitude) }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  //すべての手紙取得の関数
  const getLetters = async () => {
    const response = await fetch(`${API_BASE_URL}/letters/`);
    const data = await response.json();
    setLetters(data.letters);
  };

  //現在位置を取得して、自動で緯度経度を入力する関数
  //Geolocation APIを使用して、現在地の緯度経度を取得+mapにマーカーを表示
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat.toString());
        setLongitude(lon.toString());
        setCurrentPosition([lat, lon]); // ← ここで現在地を保存
      },
      (error) => {
        console.error("位置情報の取得に失敗:", error);
        setMessage("位置情報の取得に失敗");
      }
    );
  } else {
    setMessage("このブラウザは位置情報に対応していません");
  }
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
        postLetter={postLetter}
        getLetters={getLetters}
        getCurrentLocation={getCurrentLocation}
      />
      <Message message={message} />
      <MapView letters={letters} currentPosition={currentPosition} />
    </div>
  );
}

export default App;
