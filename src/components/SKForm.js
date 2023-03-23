import { Button, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

const SKForm = ({
  validationSchema,
  submitText,
  onSubmit,
  initialValues,
  children
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          onSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {(props) => {
        return (
          <Form>
            <VStack spacing={4} align='stretch' mb={10}>
              {children}
            </VStack>
            <VStack spacing={4} align='stretch'>
              <Button
                mt={4}
                colorScheme='teal'
                isDisabled={!props.isValid}
                isLoading={props.isSubmitting}
                type='submit'
              >
                {submitText || 'Submit'}
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SKForm;
