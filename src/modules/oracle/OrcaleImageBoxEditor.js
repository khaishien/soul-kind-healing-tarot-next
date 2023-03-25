import { Button, Heading, Stack } from '@chakra-ui/react';

const OrcaleImageBoxEditor = ({ data, onCancel, onDelete, onMoveTop }) => {
  return (
    <Stack>
      <Heading>{data?.type}</Heading>
      <Stack>
        <Button colorScheme={'red'} onClick={() => onDelete()}>
          Delete
        </Button>
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
