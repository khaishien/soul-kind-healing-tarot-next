import { Button, Container, useColorMode, useToast } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import withAuth from '@/auth/withAuth';
import { SKHeader } from '@/components';
import { useUser } from '@/auth/useUser';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Home() {
  const toast = useToast();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useUser();
  const [isLoading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 2500,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SKHeader />
      <main className={styles.main}>
        <Container centerContent>
          <p>Soul Kind Healing</p>
          <p>Welcome ~ {user?.email}</p>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Button
            isLoading={isLoading}
            mt={4}
            colorScheme='blue'
            onClick={() => {
              router.replace('/oracle');
            }}
          >
            oracle
          </Button>

          <Button
            isLoading={isLoading}
            mt={4}
            colorScheme='teal'
            onClick={onLogout}
          >
            Logout
          </Button>
        </Container>
      </main>
    </>
  );
}

export default withAuth(Home);
