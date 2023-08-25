import AsyncStorage from '@react-native-async-storage/async-storage';
import { PREVIEW_STORAGE } from '@storage/storageConfig';
import { ProductPreviewDTO } from '@dtos/ProductDTO';


export const storagePreviewSave = async (product: ProductPreviewDTO) => {
  await AsyncStorage.setItem(PREVIEW_STORAGE, JSON.stringify(product));
};

export const storagePreviewGet = async () => {
  const storage = await AsyncStorage.getItem(PREVIEW_STORAGE);
  
  
  return storage ? JSON.parse(storage) as ProductPreviewDTO : null;
};

export const storagePreviewRemove = async () => {
  await AsyncStorage.removeItem(PREVIEW_STORAGE);
};
