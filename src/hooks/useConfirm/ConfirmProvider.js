import { useState, useCallback, Fragment, useRef, useEffect } from 'react';
import ConfirmContext from './ConfirmContext';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

const ConfirmProvider = ({ children }) => {
  const cancelRef = useRef();
  const [options, setOptions] = useState({});
  const [isOpen, setOpen] = useState(false);

  const confirm = useCallback((otherProps) => {
    setOptions(otherProps || {});
  }, []);

  const handleClose = useCallback(() => {
    setOptions({});
  }, []);

  const handleCancel = useCallback(() => {
    Promise.resolve(options.onNegative && options.onNegative()).finally(() => {
      handleClose();
    });
  }, [options, handleClose]);

  const handleConfirm = useCallback(() => {
    Promise.resolve(
      options.onPositive && options.onPositive(options.params)
    ).finally(() => {
      handleClose();
    });

    //   resolve && resolve(params);
    //   handleClose();
  }, [options, handleClose]);

  useEffect(() => {
    if (Object.keys(options).length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [options]);

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {options.title}
            </AlertDialogHeader>

            <AlertDialogBody>{options.desc}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme='green'
                ref={cancelRef}
                onClick={handleConfirm}
              >
                OK
              </Button>
              <Button colorScheme='red' onClick={handleCancel} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
};

export default ConfirmProvider;
