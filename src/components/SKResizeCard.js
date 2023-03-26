import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Rnd } from 'react-rnd';

const SKResizeCard = ({ data, onClick, isSelected }) => {
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);

  const _renderContent = () => {
    switch (data.type) {
      default:
        return null;
      case 'PAST':
      case 'PRESENT':
      case 'FUTURE':
      case 'TEXT':
        return (
          <Stack p={5}>
            <Text fontSize='lg' as='b' color='black'>
              {data.title}
            </Text>
            {data.desc?.length > 0 && <Text color='black'>{data.desc}</Text>}
          </Stack>
        );
      case 'PAST_IMAGE':
      case 'PRESENT_IMAGE':
      case 'FUTURE_IMAGE':
        return (
          <Image
            borderRadius={10}
            style={{
              pointerEvents: 'none',
              transform: `rotate(${data.position === '^' ? '0deg' : '180deg'})`
            }}
            alt={data.type}
            boxSize='100%'
            objectFit='cover'
            src={data.image}
          />
        );
      case 'IMAGE':
        return (
          <Image
            borderRadius={10}
            style={{ pointerEvents: 'none' }}
            alt={data.type}
            boxSize='100%'
            objectFit='cover'
            src={URL.createObjectURL(data.image)}
          />
        );
    }
  };

  return (
    <Rnd
      onClick={onClick}
      bounds={'parent'}
      minWidth={150}
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onResize={(e, direction, ref, delta, position) => {
        setHeight(ref.offsetHeight);
        setWidth(ref.offsetWidth);
        setX(position.x);
        setY(position.y);
      }}
    >
      <Box
        backgroundColor={data?.color}
        borderRadius={10}
        borderWidth={isSelected ? 2 : 0}
        borderColor={isSelected ? 'red' : null}
      >
        {_renderContent()}
      </Box>
    </Rnd>
  );
};

export default SKResizeCard;
