import { useCallback, useState } from 'react';
import { ProductDTO } from '@dtos/ProductDTO';
import { api } from '@services/api';
import { useError } from '@hooks/useError';
import { useFocusEffect } from '@react-navigation/native';

export type Filter = 'ALL' | 'ACTIVE' | 'INACTIVE';

export const useMyAds = (filter?: Filter) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {handleError} = useError();
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const {data} = await api.get('/users/products');
      setProducts(data);
    } catch (e) {
      handleError(e);
    }
    finally {
      setIsLoading(false)
    }
  };
  
  useFocusEffect(useCallback(() => {
    fetchProducts();
  }, []));
  
  const productsFiltered = () => {
    if (!filter || filter === 'ALL')
      return products;
    return products.filter(product => {
      return filter === 'ACTIVE' ? product.is_active : !product.is_active;
    });
  };
  
  return {
    products: productsFiltered(),
    isLoading
  }
};
