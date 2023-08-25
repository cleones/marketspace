import { api } from '@services/api';
import { useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useState } from 'react';
import { useError } from '@hooks/useError';

export const useOwnerActions = () => {
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const toast = useToast();
  const {handleError} = useError();
  const {navigate} = useNavigation<AppNavigatorRoutesProps>();
  
  
  const handlerActiveAds = async (id: string, isActive: boolean) => {
    
    setIsUpdating(true);
    try {
      await api.patch(`/products/${id}`, {is_active: !isActive});
      toast.show({
        title: 'Anúncio atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
      });
      navigate('bottomTabRoute', {screen: 'myAds'});
    } catch (error) {
      handleError(error);
      setIsUpdating(false);
    }
  };
  const handlerRemoveAds = async (id: string) => {
    
    setIsDeleting(true);
    try {
      await api.delete(`/products/${id}`);
      toast.show({
        title: 'Anúncio removido com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
      });
      navigate('bottomTabRoute', {screen: 'myAds'});
    } catch (error) {
      handleError(error);
      setIsDeleting(false);
    }
  };
  
  return {
    isUpdating,
    isDeleting,
    
    handlerActiveAds,
    handlerRemoveAds
  };
  
};
