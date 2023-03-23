import withAuth from '@/auth/withAuth';
import { SKHeader } from '@/components';
import { Flex, Text, SimpleGrid } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import useOracle from '@/auth/useOracle';
import OrcaleStateColumn from '@/modules/oracle/OrcaleStateColumn';

function Oracle() {
  const { oracleData } = useOracle();

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
          <Text fontSize='2xl'>Oracle</Text>
          <SimpleGrid
            spacing='12'
            w={'100%'}
            justify='center'
            columns={{ sm: 1, md: 3 }}
          >
            <OrcaleStateColumn title={'Past'} oracleData={oracleData} />

            <OrcaleStateColumn title={'Present'} oracleData={oracleData} />

            <OrcaleStateColumn title={'Future'} oracleData={oracleData} />
          </SimpleGrid>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Oracle);
