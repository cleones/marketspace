import { AppErro } from '@utils/AppErro';
import { useToast } from 'native-base';

export const useError = () => {
  const toast = useToast();
  const handleError = (error: any) => {
    const isAppError = error instanceof AppErro;
    toast.show({
      title: isAppError ? error.message : 'Falha inesperada tente novamente mais tarde!',
      placement: 'top',
      bgColor: 'red.500',
    });
  };
  return {handleError};
  
};
