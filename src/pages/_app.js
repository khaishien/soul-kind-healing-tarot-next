import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import theme from '@/styles/theme';
import ConfirmProvider from '@/hooks/useConfirm/ConfirmProvider';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ConfirmProvider>
        <Component {...pageProps} />
      </ConfirmProvider>
    </ChakraProvider>
  );
}
