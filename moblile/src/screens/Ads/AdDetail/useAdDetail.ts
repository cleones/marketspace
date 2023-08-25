import { useEffect, useState } from 'react';
import { ProductDTO } from '@dtos/ProductDTO';
import { api } from '@services/api';
import { useError } from '@hooks/useError';
import { useAuth } from '@contexts/AuthContext';

export const useAdDetail = (id: string) => {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoading, setIsLoading] = useState(true);
  
  const {user} = useAuth();
  const {handleError} = useError();
  
  useEffect(() => {
    setIsLoading(true);
    api.get(`/products/${id}`)
      .then(({data}) => setProduct(data))
      .catch(e => handleError(e))
      .finally(() => setIsLoading(false));
  }, [id]);
  
  return {
    product,
    isLoading,
    iAmOwner: product?.user_id === user.id
  };
};
