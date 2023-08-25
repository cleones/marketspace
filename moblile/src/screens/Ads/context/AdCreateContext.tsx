import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { ProductPreviewDTO } from '@dtos/ProductDTO';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { AdPhoto, useImageForm } from '@screens/Ads/context/useImageForm';
import { FormDataProps, userAdForm } from '@screens/Ads/context/userAdForm';
import { storagePreviewGet, storagePreviewRemove, storagePreviewSave } from '@storage/storagePreviewAds';
import { Alert } from 'react-native';
export type AdCreateContextDataProps = {
  adPhotoSelected?: AdPhoto[],
  handleProductImageSelect: () => Promise<void>,
  
  handleSubmit: UseFormHandleSubmit<FormDataProps, undefined>,
  control: Control<FormDataProps, any>,
  errors: FieldErrors<FormDataProps>,
  
  paymentMethods: string[],
  handleCheckBoxClick: (value: string) => void,
  
  handleNext: (form: FormDataProps) => Promise<void>
  handleCancelCreate: () => void
}

export const AdCreateContext = createContext<AdCreateContextDataProps>({} as AdCreateContextDataProps);

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AdCreateContextProvider = ({children}: AuthContextProviderProps) => {
  
  const [product, setProduct] = useState<ProductPreviewDTO>({} as ProductPreviewDTO);
  const {adPhotoSelected, handleProductImageSelect} = useImageForm(product.product_images);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  
  const {navigate, goBack} = useNavigation<AppNavigatorRoutesProps>();
  
  
  const loadAdPreview = async () => {
    const productStore = await storagePreviewGet();
    productStore && setProduct(productStore);
  };
  
  useEffect(() => {
    loadAdPreview();
  }, []);
  
  useEffect(() => {
    setPaymentMethods(product.payment_methods || []);
  }, [product]);
  
  
  const {
    handleSubmit,
    control,
    errors,
    setValue,
  } = userAdForm(product);
  
  const handleNext = async (data: FormDataProps) => {
    
    const product: ProductPreviewDTO = {
      name: data.title,
      description: data.description,
      is_new: data.is_new === 'new',
      price: parseInt(data.price.replace(/[^0-9,.]+/g, '')) * 100,
      accept_trade: data.accept_trade,
      product_images: data.images as AdPhoto[],
      payment_methods: data.payment_methods as string[],
    };
    await storagePreviewSave(product);
    navigate('adPreview');
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
          await storagePreviewRemove();
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
      
      handleNext,
      handleSubmit,
      control,
      errors,
      
      paymentMethods,
      handleCheckBoxClick,
      
      handleCancelCreate,
      
      
    };
  }, [adPhotoSelected, handleProductImageSelect, handleSubmit, control, errors, paymentMethods]);
  
  return (
    <AdCreateContext.Provider value={value}>
      {children}
    </AdCreateContext.Provider>
  );
};

export const useAdCreate = () => {
  return useContext(AdCreateContext);
};
