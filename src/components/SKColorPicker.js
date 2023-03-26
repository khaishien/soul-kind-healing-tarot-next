import { Box, useTheme } from '@chakra-ui/react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

const SKColorPicker = ({ defaultColor, onChange }) => {
  const [color, setColor] = useColor('hex', defaultColor);
  const theme = useTheme();

  return (
    <Box>
      <ColorPicker
        width={250}
        color={color}
        onChange={(val) => {
          setColor(val);
          onChange(val.hex);
        }}
        hideHSV
        dark={theme?.config?.initialColorMode === 'dark'}
      />
    </Box>
  );
};

export default SKColorPicker;
