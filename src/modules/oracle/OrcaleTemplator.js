import { SKModal, SKResizeCard } from '@/components';
import { atLeastOneSec } from '@/utils/PromiseUtils';
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useToast
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import OrcaleImageBoxEditor from './OrcaleImageBoxEditor';
import OrcaleTextBoxEditor from './OrcaleTextBoxEditor';

const OrcaleTemplator = ({ reading }) => {
  const toast = useToast({
    position: 'top'
  });
  const boxRef = useRef();

  const { past, present, future } = reading;

  const max = 1240;

  const [width, setWidth] = useState(max * 0.7);
  const [height, setHeight] = useState(max * 0.7);

  const [isImageUploaderOpen, setImageUplaoderOpen] = useState(false);
  const [isGenerateLoading, setGenerateLoading] = useState(false);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(null);
  const [boxes, setBoxes] = useState([]);

  const _refreshReadingBox = () => {
    const _arr = [
      {
        id: _.now(),
        type: 'PAST',
        title: 'Past',
        desc: past.desc,
        color: '#4A5568'
      },
      {
        id: _.now(),
        type: 'PAST_IMAGE',
        position: past.position,
        image: `/card/${past.id}.jpg`,
        color: '#4A5568'
      },
      {
        id: _.now(),
        type: 'PRESENT',
        title: 'Present',
        desc: present.desc,
        color: '#38B2AC'
      },
      {
        id: _.now(),
        type: 'PRESENT_IMAGE',
        position: present.position,
        image: `/card/${present.id}.jpg`,
        color: '#4A5568'
      },
      {
        id: _.now(),
        type: 'FUTURE',
        title: 'Future',
        desc: future.desc,
        color: '#ED64A6'
      },
      {
        id: _.now(),
        type: 'FUTURE_IMAGE',
        position: future.position,
        image: `/card/${future.id}.jpg`,
        color: '#4A5568'
      }
    ];

    const toBeFilterType = [
      'PAST',
      'PAST_IMAGE',
      'PRESENT',
      'PRESENT_IMAGE',
      'FUTURE',
      'FUTURE_IMAGE'
    ];

    const _others = boxes.filter((box) => {
      return !toBeFilterType.includes(box.type);
    });

    setBoxes(_.concat(_arr, _others));
  };

  useEffect(() => {
    _refreshReadingBox();
  }, [reading]);

  const _onAddText = () => {
    setBoxes(
      _.concat(boxes, {
        id: _.now(),
        type: 'TEXT',
        title: 'title A',
        desc: 'content B',
        color: '#4299E1'
      })
    );
  };

  const _onAddImage = (imageUrl) => {
    setImageUplaoderOpen(false);
    console.log('##imageUrl', imageUrl);
    setBoxes(
      _.concat(boxes, {
        id: _.now(),
        type: 'IMAGE',
        title: 'title A',
        image: imageUrl,
        color: '#9F7AEA'
      })
    );
  };

  const onGenerateImage = async () => {
    try {
      setGenerateLoading(true);

      setCurrentSelectedIndex(null);
      await atLeastOneSec();
      const input = document.getElementById('orcale');
      html2canvas(input, {
        width: width,
        height: height,
        scale: 1,
        x: 0,
        y: 0
      }).then((canvas) => {
        var a = document.createElement('a');

        a.href = canvas.toDataURL('image/png');
        a.download = 'download.jpg';
        a.click();
      });
    } catch (err) {
      toast({
        position: 'top',
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 2500,
        isClosable: true
      });
    } finally {
      setGenerateLoading(false);
    }
  };
  const onGeneratePdf = async () => {
    try {
      setGenerateLoading(true);
      setCurrentSelectedIndex(null);
      await atLeastOneSec();
      const input = document.getElementById('orcale');
      html2canvas(input, {
        width: width,
        height: height,
        scale: 1,
        x: 0,
        y: 0
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // const pdf = new jsPDF('p', 'pt', [595.28, 841.89]);
        const pdf = new jsPDF({
          orientation: 'l', // landscape
          unit: 'pt', // points, pixels won't work properly
          format: [canvas.width, canvas.height] // set needed dimensions for any element
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('download.pdf');
      });
    } catch (err) {
      toast({
        position: 'top',
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 2500,
        isClosable: true
      });
    } finally {
      setGenerateLoading(false);
    }
  };

  const _onSelectBox = (index) => {
    setCurrentSelectedIndex(index);
  };

  const _renderAddButton = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <Button colorScheme='green'>Add</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button colorScheme='teal' onClick={_onAddText}>
                Text
              </Button>
              <Button colorScheme='blue'>Signature</Button>
              <Button
                colorScheme='purple'
                onClick={() => setImageUplaoderOpen(true)}
              >
                Image
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  const _renderBoxEditor = () => {
    if (currentSelectedIndex != null && boxes[currentSelectedIndex] != null) {
      const _box = boxes[currentSelectedIndex];

      const _onDelete = () => {
        const arr = _.filter(boxes, (i) => i.id !== _box.id);
        setBoxes(arr);
      };

      const _onMoveTop = () => {
        const arr = boxes.splice(currentSelectedIndex, 1);
        const newArr = _.concat(boxes, arr);
        setBoxes(newArr);
      };

      const _onCancel = () => setCurrentSelectedIndex(null);

      switch (_box.type) {
        default:
          return null;

        case 'PAST_IMAGE':
        case 'PRESENT_IMAGE':
        case 'FUTURE_IMAGE':
        case 'IMAGE':
          return (
            <OrcaleImageBoxEditor
              data={_box}
              onCancel={_onCancel}
              onDelete={_onDelete}
              onMoveTop={_onMoveTop}
            />
          );
        case 'PAST':
        case 'PRESENT':
        case 'FUTURE':
        case 'TEXT':
          return (
            <OrcaleTextBoxEditor
              data={_box}
              onUpdate={(val) => {
                _box.title = val.title;
                _box.desc = val.desc;
                _box.color = val.color;
                setBoxes([...boxes]);
                setCurrentSelectedIndex(null);
              }}
              onCancel={_onCancel}
              onDelete={_onDelete}
              onMoveTop={_onMoveTop}
            />
          );
      }
    }
  };

  return (
    <Flex flex={1}>
      <Box pr={4} minWidth={265}>
        <Stack>
          {_renderAddButton()}
          <Divider size={'lg'} />
          <Button
            colorScheme='red'
            onClick={() => onGeneratePdf()}
            isLoading={isGenerateLoading}
          >
            Generate Pdf
          </Button>
          <Button
            colorScheme='purple'
            onClick={() => onGenerateImage()}
            isLoading={isGenerateLoading}
          >
            Generate Image
          </Button>

          <Divider size={'lg'} />
          {_renderBoxEditor()}
        </Stack>
      </Box>
      <Flex flex={1} justify='center'>
        <AspectRatio
          ratio={1}
          ref={boxRef}
          position={'relative'}
          height={max}
          width={max}
          bg={'gray.100'}
          borderRadius={'20px'}
        >
          <Rnd
            id={'orcale'}
            bounds={'parent'}
            disableDragging={true}
            enableResizing={{
              top: false,
              right: true,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: true,
              bottomLeft: false,
              topLEft: false
            }}
            maxWidth={max}
            maxHeight={max}
            style={{ backgroundColor: 'gray', borderRadius: '10px' }}
            onResize={(e, direction, ref) => {
              setHeight(ref.offsetHeight);
              setWidth(ref.offsetWidth);
            }}
            size={{ width, height }}
          >
            {boxes.map((box, index) => (
              <SKResizeCard
                isSelected={currentSelectedIndex === index}
                onClick={() => _onSelectBox(index)}
                key={index}
                data={box}
                max={max}
                color={box.color}
              />
            ))}
          </Rnd>
        </AspectRatio>
      </Flex>
      <SKModal
        isOpen={isImageUploaderOpen}
        onClose={() => setImageUplaoderOpen(false)}
      >
        <input
          accept='image/*'
          type='file'
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              _onAddImage(e.target.files[0]);
            }
          }}
        />
      </SKModal>
    </Flex>
  );
};

export default OrcaleTemplator;
