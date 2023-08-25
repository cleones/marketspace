import { Box, ScrollView, VStack } from 'native-base';
import { AdsHeader } from '@components/AdsHeader';
import { useRoute } from '@react-navigation/native';
import { AdEditContextProvider } from '@screens/Ads/context/AdEditContext';
import { AdEditForms } from '@screens/Ads/AdEdit/AdEditForms';
import { Menu } from '@screens/Ads/AdEdit/Menu';

type RouteParams = {
  id: string;
}
export const AdEdit = () => {
  
  const {params} = useRoute();
  const {id} = params as RouteParams;
  
  return (
    <VStack flex={1} bg="gray.600" h="full">
      <Box px={10} mt={20}>
        <AdsHeader title="Editar anúncio"/>
      </Box>
      
      <AdEditContextProvider id={id}>
        <ScrollView showsVerticalScrollIndicator={false} pb={20}>
          <AdEditForms/>
        </ScrollView>
        <Menu/>
      
      </AdEditContextProvider>
    </VStack>
  
  );
};
