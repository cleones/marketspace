import { Dimensions } from 'react-native';
import { Box, Heading, Image } from 'native-base';
import Carousel from 'react-native-reanimated-carousel';

import { api } from '@services/api';
import noProductImage from '@assets/noProductImage.jpeg';


type Props = {
  product: {
    is_active: boolean;
    product_images: { path: string }[]
  };
  isPreview?: boolean;
}
export const ProductCarousel = ({product, isPreview = false}: Props) => {
  const width = Dimensions.get('window').width;
  return (
    <Box
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      
      {!product.is_active && (
        <Heading
          flex={1}
          textTransform="uppercase"
          color="gray.700"
          fontSize="sm"
          position="absolute"
          zIndex={100}
          bg="gray.200"
          p={1}
          w={240}
          textAlign="center"
          opacity={0.8}
          rounded="md"
          fontFamily="heading"
        >
          Anúncio Desativado
        </Heading>
      )}
      {
        product.product_images.length === 0 ? (
          <Image
            blurRadius={product.is_active ? 0 : 2}
            w="full"
            h={80}
            source={noProductImage}
            alt="Ad Image"
            resizeMode="cover"
          />
        ) : (
          <Carousel
            // autoPlay
            // loop
            width={width}
            height={320}
            data={product.product_images}
            scrollAnimationDuration={1500}
            renderItem={({item}) => (
              <Image
                blurRadius={product.is_active ? 0 : 2}
                w="full"
                h={80}
                source={{
                  uri: isPreview ? item.path : `${api.defaults.baseURL}/images/${item.path}`,
                }}
                alt="Ad Image"
                resizeMode="cover"
              />
            )}
          />
        )
      }
    
    </Box>
  );
};
