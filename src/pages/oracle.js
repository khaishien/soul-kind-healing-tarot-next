import withAuth from '@/auth/withAuth';
import { SKHeader } from '@/components';
import { Flex, Text, SimpleGrid } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import useOracle from '@/auth/useOracle';
import OrcaleStateColumn from '@/modules/oracle/OrcaleStateColumn';
import OrcaleTemplator from '@/modules/oracle/OrcaleTemplator';
import OracleSection from '@/modules/oracle/OrcaleSection';

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
          <OracleSection
            sections={[
              {
                title: 'Selector',
                content: (
                  <SimpleGrid
                    spacing='12'
                    w={'100%'}
                    justify='center'
                    columns={{ sm: 1, md: 3 }}
                  >
                    <OrcaleStateColumn title={'Past'} oracleData={oracleData} />

                    <OrcaleStateColumn
                      title={'Present'}
                      oracleData={oracleData}
                    />

                    <OrcaleStateColumn
                      title={'Future'}
                      oracleData={oracleData}
                    />
                  </SimpleGrid>
                )
              },
              {
                title: 'Templator',
                content: (
                  <OrcaleTemplator
                    reading={{
                      past: {
                        id: 1,
                        desc: '12313h4jh1 j3h4h13h4j h1jh34j hj1h34jk hj1h34jk hj1h34jkh k1jh34jh j1h34jhj1kh34kjh1kjh34kjh1kj3h4kjh13h4jkj1h34kjh1kj3h'
                      },
                      present: { id: 4, desc: '456' },
                      future: { id: 53, desc: '789' }
                    }}
                  />
                )
              }
            ]}
          />
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Oracle);
