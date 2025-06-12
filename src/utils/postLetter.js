// utils/postLetter.js
const API_BASE_URL = 'https://letter-backend-eqrq.onrender.com';

export const postLetter = async (content, latitude, longitude, setMessage) => {
  try {
    const response = await fetch(`${API_BASE_URL}/letters/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }),
    });

    const data = await response.json();
    setMessage(data.message);
  } catch (error) {
    setMessage('手紙の送信に失敗しました');
    console.error('POSTエラー:', error);
  }
};
