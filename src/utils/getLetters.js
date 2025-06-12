// utils/getLetters.js
const API_BASE_URL = 'https://letter-backend-eqrq.onrender.com';

export const getLetters = async (setLetters) => {
  try {
    const response = await fetch(`${API_BASE_URL}/letters/`);
    const data = await response.json();
    setLetters(data.letters);
  } catch (error) {
    console.error('GETエラー:', error);
  }
};
