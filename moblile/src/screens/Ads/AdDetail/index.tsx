import { Box, ScrollView, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { Header } from '@screens/Ads/AdDetail/Header';
import { Loading } from '@components/Loading';

import { useAdDetail } from '@screens/Ads/AdDetail/useAdDetail';

import { Menu } from '@screens/Ads/AdDetail/Menu';
import { OwnerActions } from '@screens/Ads/AdDetail/OwnerActions';
import { ProductCarousel } from '@components/ProductCarousel';
import { ProductInfo } from '@components/ProductInfo';

type RouteParams = {
  id: string;
}
export const AdDetail = () => {
  const {params} = useRoute();
  const {id} = params as RouteParams;
  const {product, isLoading, iAmOwner} = useAdDetail(id);
  
  return (
    <VStack pt={20} bg="gray.600" h="full">
      <Header showEditButton={iAmOwner} adId={id}/>
      {isLoading ? <Loading/> : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductCarousel product={product}/>
            <Box px={10} mt={4}>
              <ProductInfo product={product}/>
            </Box>
          </ScrollView>
          {iAmOwner ?
            (
              <Box px={10} mt={2} pb={8}>
                <OwnerActions isActive={product.is_active} adsId={product.id}/>
              </Box>
            )
            :
            <Menu price={product.price} ownerTel={product.user.tel}/>}
        </>
      
      )}
    
    </VStack>
  );
};
