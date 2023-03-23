import React, { useEffect } from 'react';
import router from 'next/router';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

const auth = getAuth(firebaseApp);
const withAuth = (Component) => (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push('/login');
      }
    });
  }, []);

  return (
    <div>
      <Component {...props} />
    </div>
  );
};

export default withAuth;
