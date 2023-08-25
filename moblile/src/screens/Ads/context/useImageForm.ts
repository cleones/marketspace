import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

export type AdPhoto = {
  uri: string;
  type: "image" | "video" | undefined;
  isNew: boolean;
}
export const useImageForm = (storageAdPhotoSelected?:AdPhoto[]) => {
  const [adPhotoSelected, setAdPhotoSelected] = useState<AdPhoto[]>( []);
  
  useEffect(() => {
    setAdPhotoSelected(storageAdPhotoSelected || [])
  }, [storageAdPhotoSelected]);
  const handleProductImageSelect = async () => {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      
      if (photo.canceled) {
        return;
      }
      if (photo.assets[0].uri) {
        const newImage = {
          uri: photo.assets[0].uri,
          type: photo.assets[0].type,
          isNew: true
          
        };
        setAdPhotoSelected(old =>  [...old, newImage]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  return {
    adPhotoSelected,
    handleProductImageSelect
  };
};
