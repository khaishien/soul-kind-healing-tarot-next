import styles from '@/styles/Home.module.css';
import { SKHeader } from '@/components';
import { Flex, Text } from '@chakra-ui/react';
import withAuth from '@/auth/withAuth';

function OracleTempalator() {
  return (
    <>
      <SKHeader />
      <main className={styles.main}>
        <Flex
          flex='1'
          borderRadius={8}
          direction='column'
          align='center'
          justify='flex-start'
        >
          <Text fontSize='2xl'>Oracle Templator</Text>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(OracleTempalator);
