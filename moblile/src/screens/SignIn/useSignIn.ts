import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@contexts/AuthContext';
import { useState } from 'react';
import { useToast } from 'native-base';
import { AppErro } from '@utils/AppErro';

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

type FormDataProps = yup.InferType<typeof signInSchema>;


export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {navigate} = useNavigation<AuthNavigatorRoutesProps>();
  const {signIn} = useAuth();
  
  const toast = useToast();
  
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
    
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  const handleCreateNewAccount = () => {
    navigate('signUp');
  };
  const handleSignIn = async ({email, password}: FormDataProps) => {
    try {
      setIsLoading(true)
      await signIn(email, password);
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppErro;
      toast.show({
        title: isAppError ? error.message : 'Não foi possível entrar tente mais tarde',
        placement: 'top',
        bgColor: 'red.500',
      });
      setIsLoading(false)
    }
  };
  
  return {
    handleCreateNewAccount,
    handleSignIn,
    handleSubmit,
    control,
    errors,
    isLoading
  };
  
};
