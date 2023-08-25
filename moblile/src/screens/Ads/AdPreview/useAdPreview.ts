import { useEffect, useState } from 'react';
import { ProductDTO, ProductPreviewDTO } from '@dtos/ProductDTO';
import { useAuth } from '@contexts/AuthContext';
import { storagePreviewGet, storagePreviewRemove } from '@storage/storagePreviewAds';
import { ProductPreviewToProductDTO } from '@utils/productPreviewToProductDTO';
import { api } from '@services/api';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export const useAdPreview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPushing, setIsPushing] = useState(false);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [productPreview, setProductPreview] = useState<ProductPreviewDTO>({} as ProductPreviewDTO);
  const {navigate} = useNavigation<AppNavigatorRoutesProps>();
  
  const {user} = useAuth();
  
  const loadAdPreview = async () => {
    setIsLoading(true);
    const productStore = await storagePreviewGet();
    if (productStore) {
      setProduct(ProductPreviewToProductDTO(productStore, user));
      setProductPreview(productStore);
    }
    setIsLoading(false);
  };
  
  const handlePublish = async () => {
    setIsPushing(true);
    const data = {
      'name': productPreview.name,
      'description': productPreview.description,
      'is_new': productPreview.is_new,
      'price': productPreview.price,
      'accept_trade': productPreview.accept_trade,
      'payment_methods': productPreview.payment_methods
    };
    
    const adImageData = new FormData();
    
    productPreview.product_images.forEach(image => {
      const fileExtension = image.uri.split('.').pop();
      const photoFile = {
        name: `${data.name}.${fileExtension}`.replaceAll(' ', '_').toLowerCase(),
        uri: image.uri,
        type: `${image.type}/${fileExtension}`
        
      } as any;
      adImageData.append('images', photoFile);
    });
    
    
    try {
      const createdResponse = await api.post('/products', data);
      adImageData.append('product_id', createdResponse.data.id);
      await api.post('/products/images', adImageData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await storagePreviewRemove();
      navigate('bottomTabRoute', {screen: 'myAds'});
    } catch (e) {
      console.log(e);
      setIsPushing(false);
    }
    
  };
  
  
  useEffect(() => {
    loadAdPreview();
  }, []);
  
  return {
    product,
    isLoading,
    isPushing,
    handlePublish
  };
};
