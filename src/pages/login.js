import { Container, useToast } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import Header from '@/components/SKHeader';
import { useUser } from '@/auth/useUser';
import { SKForm, SKTextField } from '@/components';
import * as Yup from 'yup';

function Login() {
  const toast = useToast();
  const { login } = useUser();

  const _onLogin = async (values) => {
    try {
      await login(values);
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 2500,
        isClosable: true
      });
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required')
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container
          centerContent
          maxW='350px'
          p={8}
          borderRadius={10}
          bg='purple.600'
          color='white'
        >
          <SKForm
            onSubmit={_onLogin}
            validationSchema={validationSchema}
            submitText={'Login'}
            initialValues={{
              email: '',
              password: ''
            }}
          >
            <SKTextField type={'email'} name={'email'} label={'Email'} />
            <SKTextField
              type={'password'}
              name={'password'}
              label={'Password'}
            />
          </SKForm>
        </Container>
      </main>
    </>
  );
}

export default Login;
