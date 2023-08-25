import { Box, ScrollView, VStack } from 'native-base';
import { Header } from '@screens/Ads/AdPreview/Header';
import { useAdPreview } from '@screens/Ads/AdPreview/useAdPreview';
import { Loading } from '@components/Loading';
import { ProductCarousel } from '@components/ProductCarousel';
import { ProductInfo } from '@components/ProductInfo';
import { Menu } from '@screens/Ads/AdPreview/Menu';

export const AdPreview = () => {
  const {product, isLoading} = useAdPreview();
  
  return (
    <VStack bg="gray.600" h="full">
      <Header/>
      {isLoading ? <Loading/> : (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductCarousel
            product={product}
            isPreview
          />
          <Box px={10} mt={4}>
            <ProductInfo product={product}/>
          </Box>
        </ScrollView>
          <Menu />
        </>
      )}
    </VStack>
  );
};
