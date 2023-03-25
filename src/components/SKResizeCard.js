import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Rnd } from 'react-rnd';

const SKResizeCard = ({ data, color, onClick, isSelected }) => {
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);

  //   const _setX = (val) => {
  //     if (val >= 0 && val + width <= max) {
  //       setX(val);
  //     }
  //   };
  //   const _setY = (val) => {
  //     if (val >= 0 && val + height <= max) {
  //       console.log('##val', val);
  //       console.log('##height', height);
  //       console.log('##max', max);
  //       setY(val);
  //     }
  //   };

  const _renderContent = () => {
    switch (data.type) {
      default:
        return null;
      case 'PAST':
      case 'PRESENT':
      case 'FUTURE':
      case 'TEXT':
        return (
          <CardBody>
            <Stack>
              <Heading size='md' style={{ whiteSpace: 'pre-line' }}>
                {data.title}
              </Heading>
              <Text style={{ whiteSpace: 'pre-line' }}>{data.desc}</Text>
            </Stack>
          </CardBody>
        );
      case 'IMAGE':
        return (
          <CardBody p={0}>
            <Image
              borderRadius={10}
              style={{ pointerEvents: 'none' }}
              alt={data.type}
              boxSize='100%'
              objectFit='cover'
              src={URL.createObjectURL(data.image)}
            />
          </CardBody>
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
      <Card
        bg={color}
        borderWidth={isSelected ? 2 : 0}
        borderColor={isSelected ? 'red' : null}
      >
        {_renderContent()}
      </Card>
    </Rnd>
  );
};

export default SKResizeCard;
