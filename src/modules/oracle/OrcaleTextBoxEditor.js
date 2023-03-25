import {
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const OrcaleTextBoxEditor = ({
  data,
  onUpdate,
  onCancel,
  onDelete,
  onMoveTop
}) => {
  const [_title, setTitle] = useState(data?.title);
  const [_desc, setDesc] = useState(data?.desc);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDesc(data.desc);
    }
  }, [data]);
  return (
    <Stack>
      <Heading>{data?.type}</Heading>
      <Text>Title</Text>
      <Input
        label='Title'
        id='title'
        value={_title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <Text>Desc</Text>
      <Textarea
        minHeight={'200px'}
        label='Title'
        id='desc'
        value={_desc}
        onChange={(e) => {
          setDesc(e.currentTarget.value);
        }}
      />
      <Stack>
        <Button
          colorScheme='teal'
          onClick={() =>
            onUpdate({
              title: _title,
              desc: _desc
            })
          }
        >
          Save
        </Button>
        {data.type === 'TEXT' && (
          <Button colorScheme={'red'} onClick={() => onDelete()}>
            Delete
          </Button>
        )}
        <Button variant='outline' onClick={() => onCancel()}>
          Cancel
        </Button>{' '}
        <Button colorScheme={'teal'} onClick={() => onMoveTop()}>
          Move Top
        </Button>
      </Stack>
    </Stack>
  );
};

export default OrcaleTextBoxEditor;
