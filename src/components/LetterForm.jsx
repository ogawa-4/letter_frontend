import React from 'react';

function LetterForm({
  content,
  latitude,
  longitude,
  setContent,
  setLatitude,
  setLongitude,
  postLetter,
  getLetters,
  getCurrentLocation,
}) {
  return (
    <div>
      <textarea
        placeholder="内容を入力"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        style={{ width: '100%' }}
      />
      <input
        type="text"
        placeholder="緯度"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <input
        type="text"
        placeholder="経度"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={postLetter}>手紙を残す</button>
        <button onClick={getLetters} style={{ marginLeft: '1rem' }}>
          Map更新
        </button>
        <button onClick={getCurrentLocation}>現在地を取得</button>
      </div>
    </div>
  );
}



export default LetterForm;
