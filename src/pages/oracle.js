import withAuth from '@/auth/withAuth';
import { SKHeader } from '@/components';
import { Flex, Text, SimpleGrid } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import useOracle from '@/auth/useOracle';
import OrcaleStateColumn from '@/modules/oracle/OrcaleStateColumn';
import OrcaleTemplator from '@/modules/oracle/OrcaleTemplator';
import OracleSection from '@/modules/oracle/OrcaleSection';
import { useState } from 'react';
import _ from 'lodash';

function Oracle() {
  const { oracleData } = useOracle();

  const [past, setPast] = useState(null);
  const [present, setPresent] = useState(null);
  const [future, setFuture] = useState(null);

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
            sections={_.compact([
              {
                title: 'Selector',
                content: (
                  <SimpleGrid
                    spacing='12'
                    w={'100%'}
                    justify='center'
                    columns={{ sm: 1, md: 3 }}
                  >
                    <OrcaleStateColumn
                      title={'Past'}
                      oracleData={oracleData}
                      onChange={(val) => {
                        setPast(val);
                      }}
                    />

                    <OrcaleStateColumn
                      title={'Present'}
                      oracleData={oracleData}
                      onChange={(val) => {
                        setPresent(val);
                      }}
                    />

                    <OrcaleStateColumn
                      title={'Future'}
                      oracleData={oracleData}
                      onChange={(val) => {
                        setFuture(val);
                      }}
                    />
                  </SimpleGrid>
                )
              },
              past && present && future
                ? {
                    title: 'Templator',
                    content: (
                      <OrcaleTemplator
                        reading={{
                          past,
                          present,
                          future
                        }}
                      />
                    )
                  }
                : null
            ])}
          />
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Oracle);
