import { Button, Stack, Text } from '@chakra-ui/react';

const OrcaleImageBoxEditor = ({ data, onCancel, onDelete, onMoveTop }) => {
  return (
    <Stack>
      <Text as='b' fontSize={'xl'}>
        {data?.type}
      </Text>
      <Stack>
        {data?.type === 'IMAGE' && (
          <Button colorScheme={'red'} onClick={() => onDelete()}>
            Delete
          </Button>
        )}
        <Button variant='outline' onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button colorScheme={'teal'} onClick={() => onMoveTop()}>
          Move Top
        </Button>
      </Stack>
    </Stack>
  );
};

export default OrcaleImageBoxEditor;
