import { useCallback, useState } from 'react';
import { ProductDTO } from '@dtos/ProductDTO';
import { api } from '@services/api';
import { useFocusEffect } from '@react-navigation/native';

export const useHome = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProducts = () => {
    setIsLoading(true);
    api.get('/products').then(({data}) => {
      setProducts(data);
    }).finally(() => {
      setIsLoading(false);
    });
  };
  useFocusEffect(useCallback(() => {
    fetchProducts();
  }, []));
  
  return {
    products,
    isLoading
  };
};
