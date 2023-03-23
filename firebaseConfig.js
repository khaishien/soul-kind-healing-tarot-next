import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDygbNMBmy43EpOiIia9fVxYz7-TLg14LA',
  authDomain: 'soul-kind-healing-tarot.firebaseapp.com',
  projectId: 'soul-kind-healing-tarot',
  storageBucket: 'soul-kind-healing-tarot.appspot.com',
  messagingSenderId: '556718332743',
  appId: '1:556718332743:web:5283462df8ca5e1ee80a62',
  measurementId: 'G-S9PCP07M3V',
  databaseURL:
    'https://soul-kind-healing-tarot-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

let firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
