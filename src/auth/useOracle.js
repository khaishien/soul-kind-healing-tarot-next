import { useToast } from '@chakra-ui/react';
import { getDatabase, ref, child, get } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebaseConfig';

const useOracle = () => {
  const toast = useToast();
  const [data, setData] = useState([]);

  const _init = async () => {
    const dbRef = ref(getDatabase(firebaseApp));
    get(child(dbRef, `17PZW-eAnD6O1dGXrJCGQ2y_60m5bV_dgt7TE_EAS0xU`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { oracle } = snapshot.val();
          setData(_.compact(oracle));
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        setData([]);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 2500,
          isClosable: true
        });
      });
  };

  useEffect(() => {
    _init();
  }, []);

  return { oracleData: data };
};

export default useOracle;
