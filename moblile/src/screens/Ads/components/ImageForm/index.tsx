import { Center, Heading, HStack, Image, Pressable, Text, useTheme } from 'native-base';
import { Dimensions } from 'react-native';
import { Plus } from 'phosphor-react-native';
import { AdPhoto } from '@screens/Ads/context/useImageForm';
import { api } from '@services/api';

type Props = {
  adPhotoSelected?: AdPhoto[],
  handleProductImageSelect: () => Promise<void>,
  messageError?: string
  isEditing?:boolean
}
export const ImageForm = ({adPhotoSelected, handleProductImageSelect, messageError, isEditing}: Props) => {
  const width = ((Dimensions.get('window').width - 40) / 3) - 25;
  const {colors: {gray}} = useTheme();
  
  const canAddImage = (adPhotoSelected && adPhotoSelected.length < 3) || !adPhotoSelected;
  
  return (
    <>
      <Heading
        fontFamily="heading"
        fontSize="md"
        mb={2}
      >
        Images
      </Heading>
      <Text
        fontFamily="body"
        fontSize="sm"
        color="gray.300"
      >
        Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
      </Text>
      <HStack alignItems="center" mt={3} space="md">
        {adPhotoSelected?.map(photo => {
          return photo.uri ? (
            <Image
              rounded="md"
              key={photo.uri}
              w={width}
              h={width}
              source={{
                uri: photo.isNew ? photo?.uri : `${api.defaults.baseURL}/images/${photo.uri}`
              }}
              alt="Ad Image"
              resizeMode="cover"
            />
          ) : <>/</>;
        })}
        {canAddImage && (
          <Pressable w={width} h={width} rounded="md" bg="gray.500" alignItems="center" justifyContent="center"
                     onPress={handleProductImageSelect}>
            <Center>
              <Plus size={24} color={gray['400']}/>
            </Center>
          </Pressable>
        )}
      </HStack>
      {messageError && (
        <Text color="red.500" fontFamily="heading" fontSize="sm" mt={2}>
          {messageError}
        </Text>
      )}
    </>
  );
};
