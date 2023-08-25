import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig';


type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
}

export const storageAuthTokenSave = async (token: string, refresh_token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({token, refresh_token}));
};

export const storageAuthTokenGet = async () => {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  
  
  return storage ? JSON.parse(storage) as StorageAuthTokenProps : null;
};

export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
