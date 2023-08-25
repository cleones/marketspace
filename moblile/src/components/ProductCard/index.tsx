import { Box, Heading, HStack, Image, Pressable, Text } from 'native-base';
import { api } from '@services/api';
import { ProductDTO } from '@dtos/ProductDTO';
import { UserPhoto } from '@components/UserPhoto';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import noProductImage from '@assets/noProductImage.jpeg';

type Props = {
  data: ProductDTO;
  showAvatarOwner?: boolean;
}
export const ProductCard = ({data, showAvatarOwner = true}: Props) => {
  const {navigate} = useNavigation<AppNavigatorRoutesProps>();
  return (
    <Pressable position="relative" onPress={() => navigate('adDetail', {
      id: data.id,
    })}>
      <Image
        blurRadius={data.is_active ? 0 : 2}
        alt="Produto image"
        h={32}
        w={40}
        bg="gray.700"
        rounded="md"
        resizeMode="cover"
        source={
          data.product_images.length ? {
            uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}`
          } : noProductImage}
      />
      
      <Text
        fontSize="sm"
        fontFamily="body"
        color="gray.200"
      >
        {data.name}
      </Text>
      <Text
        fontSize="xs"
        fontFamily="heading"
        color="gray.200"
      >
        R$ {' '}
        <Text
          fontSize="md"
          fontFamily="heading"
          color="gray.200"
        >
          {(data.price / 100).toFixed(2).replace('.', ',')}
        </Text>
      </Text>
      <HStack alignItems="center" justifyContent={showAvatarOwner ? 'space-between' : 'flex-end'} position="absolute"
              width={40} p={2}>
        {showAvatarOwner && (
          <UserPhoto
            size={8}
            alt={'Image do do no do produto'}
            source={{
              uri: `${api.defaults.baseURL}/images/${data.user.avatar}`
            }}
            borderColor="white"
          />)}
        <Box
          px={2}
          justifyContent="center"
          alignItems="center"
          
          bg={data.is_new ? 'blue.500' : 'gray.200'}
          rounded="full"
        >
          <Text
            color="white"
            textTransform="uppercase"
            fontSize="xs"
            fontFamily="heading"
          >
            {data.is_new ? 'Novo' : 'Usado'}
          </Text>
        </Box>
      </HStack>
      {!data.is_active && (
        <Heading
          flex={1}
          textTransform="uppercase"
          color="gray.700"
          fontSize="xs"
          position="absolute"
          zIndex={100}
          bg="gray.200"
          p={1}
          width={40}
          opacity={0.8}
          
          rounded="md"
          fontFamily="heading"
          bottom={10}
        >
          Anúncio Desativado
        </Heading>
      )}
    
    </Pressable>
  );
};
