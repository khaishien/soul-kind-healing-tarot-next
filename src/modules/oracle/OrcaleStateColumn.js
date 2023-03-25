import useConfirm from '@/hooks/useConfirm';
import {
  Button,
  Select,
  Text,
  Textarea,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const OrcaleStateColumn = ({ title, oracleData }) => {
  const confirm = useConfirm();
  const toast = useToast();
  const [stateSelector, setStateSelector] = useState('');
  const [langSelector, setLangSelector] = useState('EN');
  const [positionSelector, setPositionSelector] = useState('^');

  const [reading, setReading] = useState('');
  const [staticReading, setStaticReading] = useState('');

  const _updateReading = () => {
    if (
      stateSelector.length > 0 &&
      langSelector.length > 0 &&
      positionSelector.length > 0
    ) {
      const _obj = oracleData[Number(stateSelector) - 1];
      const _key = `${positionSelector} (${langSelector})`;

      const _reading = _obj[_key];
      setStaticReading(_reading);
    }
  };

  useEffect(() => {
    _updateReading();
  }, [stateSelector, langSelector, positionSelector]);

  const _onCopyClipboard = () => {
    navigator.clipboard.writeText(reading);
    toast({
      position: 'top',
      title: 'Copied to clipboard',
      status: 'success',
      duration: 2500,
      isClosable: false
    });
  };

  const _renderOracleSelector = () => {
    return oracleData.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {`[${item.id}] ${item.Name}`}
        </option>
      );
    });
  };

  return (
    <VStack align='center' spacing={8} minW='100%'>
      <Text fontSize='xl'>{title}</Text>
      <Select
        variant='filled'
        placeholder='Select Card'
        value={stateSelector}
        onChange={(e) => {
          const val = e.currentTarget.value;
          setStateSelector(val);
        }}
      >
        {_renderOracleSelector()}
      </Select>

      <Select
        variant='filled'
        placeholder='Select Language'
        value={langSelector}
        onChange={(e) => {
          const val = e.currentTarget.value;
          setLangSelector(val);
        }}
      >
        <option value={'CN'}>CN</option>
        <option value={'EN'}>EN</option>
      </Select>

      <Select
        variant='filled'
        placeholder='Select Position'
        value={positionSelector}
        onChange={(e) => {
          const val = e.currentTarget.value;
          setPositionSelector(val);
        }}
      >
        <option value={'^'}>⬆️</option>
        <option value={'v'}>⬇️</option>
      </Select>

      <Textarea
        variant='filled'
        placeholder={title}
        minH={'400px'}
        value={staticReading}
        isDisabled
      />

      <Button
        colorScheme='teal'
        w={'100%'}
        onClick={() => {
          confirm({
            title: 'Are you sure?',
            desc: 'Are you sure you want to clone reading?',
            positiveText: 'OK',
            negativeText: 'Cancel',
            onPositive: () => {
              setReading(staticReading);
            }
          });
        }}
      >
        Clone
      </Button>

      <Textarea
        variant='filled'
        placeholder={title}
        minH={'400px'}
        value={reading}
        onChange={(e) => {
          const val = e.currentTarget.value;
          setReading(val);
        }}
      />
      <Button colorScheme='blue' w={'100%'} onClick={_onCopyClipboard}>
        Copy to clipboard
      </Button>
    </VStack>
  );
};

export default OrcaleStateColumn;
