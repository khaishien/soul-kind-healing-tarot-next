import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const login = async ({ email, password }) => {
    try {
      const auth = getAuth(firebaseApp);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;

      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      router.replace('/login');
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;

      throw new Error(errorMessage);
    }
  };

  const mapUserData = async (user) => {
    const { uid, email } = user;
    const token = await user.getIdToken(true);
    return {
      id: uid,
      email,
      token
    };
  };
  useEffect(() => {
    const cancelAuthListener = getAuth().onIdTokenChanged(async (userToken) => {
      if (userToken) {
        const userData = await mapUserData(userToken);
        //   setUserCookie(userData);
        setUser(userData);
        router.replace('/');
      } else {
        //   removeUserCookie();
        setUser();
      }
    });

    // const userFromCookie = getUserFromCookie();
    // if (!userFromCookie) {
    //   return;
    // }
    // setUser(userFromCookie);
    return () => cancelAuthListener;
  }, []);

  return { user, logout, login };
};

export { useUser };
