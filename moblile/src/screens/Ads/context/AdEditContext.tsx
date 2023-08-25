import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { ProductPreviewDTO } from '@dtos/ProductDTO';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { AdPhoto, useImageForm } from '@screens/Ads/context/useImageForm';
import { FormDataProps, userAdForm } from '@screens/Ads/context/userAdForm';
import { Alert } from 'react-native';
import { api } from '@services/api';
import { productDTOToProductPreview } from '@utils/productDTOToProductPreview';
import { useError } from '@hooks/useError';

export type AdEditContextDataProps = {
  adPhotoSelected?: AdPhoto[],
  handleProductImageSelect: () => Promise<void>,
  
  handleSubmit: UseFormHandleSubmit<FormDataProps, undefined>,
  control: Control<FormDataProps, any>,
  errors: FieldErrors<FormDataProps>,
  
  paymentMethods: string[],
  handleCheckBoxClick: (value: string) => void,
  
  handleUpdate: (form: FormDataProps) => Promise<void>
  handleCancelCreate: () => void
}

export const AdEditContext = createContext<AdEditContextDataProps>({} as AdEditContextDataProps);

type AuthContextProviderProps = {
  children: ReactNode;
  id: string;
}
export const AdEditContextProvider = ({children, id}: AuthContextProviderProps) => {
  
  const [product, setProduct] = useState<ProductPreviewDTO>({} as ProductPreviewDTO);
  const {adPhotoSelected, handleProductImageSelect} = useImageForm(product.product_images);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const {handleError} = useError();
  
  
  const {navigate, goBack} = useNavigation<AppNavigatorRoutesProps>();
  
  const loadAd = async (adId: string) => {
    const {data} = await api.get(`/products/${adId}`);
    const productPreview = productDTOToProductPreview(data);
    setPaymentMethods(productPreview.payment_methods || []);
    setProduct(productPreview);
  };
  
  useEffect(() => {
    loadAd(id);
  }, [id]);
  
  const {
    handleSubmit,
    control,
    errors,
    setValue,
  } = userAdForm(product);
  
  const handleUpdate = async (dataForm: FormDataProps) => {
    
    setIsUpdating(true);
    const data = {
      'name': dataForm.title,
      'description': dataForm.description,
      'is_new': dataForm.is_new == 'new',
      'price': parseInt(dataForm.price.replace(/[^0-9,.]+/g, '')) * 100,
      'accept_trade': dataForm.accept_trade,
      'payment_methods': dataForm.payment_methods
    };
    
    const adImageData = new FormData();
    let hasNewImage = false;
    dataForm.images.forEach(image => {
      if (image.isNew) {
        hasNewImage = true;
        const fileExtension = image.uri?.split('.').pop();
        const photoFile = {
          name: `${data.name}.${fileExtension}`.replaceAll(' ', '_').toLowerCase(),
          uri: image.uri,
          type: `${image.type}/${fileExtension}`
          
        } as any;
        adImageData.append('images', photoFile);
      }
    });
    
    try {
      const createdResponse = await api.put(`/products/${id}`, data);
      if (hasNewImage) {
        adImageData.append('product_id', id);
        await api.post('/products/images', adImageData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      navigate('bottomTabRoute', {screen: 'myAds'});
    } catch (e) {
      handleError(e);
      setIsUpdating(false);
    }
    
  };
  
  
  const handleCheckBoxClick = (value: string) => {
    setPaymentMethods(old => {
      return old.includes(value) ? old.filter(method => method !== value) : [...old, value];
    });
  };
  
  const handleCancelCreate = () => {
    Alert.alert('Cancelar', 'Deseja cancelar a críação do anúncio', [
      {text: 'Não', style: 'cancel'},
      {
        text: 'Sim', onPress: async () => {
          goBack();
        }
      }
    ]);
  };
  
  useEffect(() => {
    setValue('images', adPhotoSelected || []);
    setValue('payment_methods', paymentMethods);
  }, [adPhotoSelected, paymentMethods]);
  
  
  const value = useMemo(() => {
    return {
      adPhotoSelected,
      handleProductImageSelect,
      
      handleUpdate,
      handleSubmit,
      control,
      errors,
      
      paymentMethods,
      handleCheckBoxClick,
      
      handleCancelCreate,
      
      
    };
  }, [adPhotoSelected, handleProductImageSelect, handleSubmit, control, errors, paymentMethods]);
  
  return (
    <AdEditContext.Provider value={value}>
      {children}
    </AdEditContext.Provider>
  );
};

export const useAdEdit = () => {
  return useContext(AdEditContext);
};
