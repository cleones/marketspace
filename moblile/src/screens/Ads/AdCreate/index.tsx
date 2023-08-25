import { Box, ScrollView, VStack } from 'native-base';
import { AdsHeader } from '@components/AdsHeader';
import { AdCreateContextProvider } from '../context/AdCreateContext';

import { Menu } from './Menu';
import { AdCreateForms } from './AdCreateForms';


export const AdCreate = () => {
  
  return (
    <VStack flex={1} bg="gray.600" h="full">
      <Box px={10} mt={20}>
        <AdsHeader title="Criar anúncio"/>
      </Box>
      
      <AdCreateContextProvider>
        <ScrollView showsVerticalScrollIndicator={false} pb={20}>
          <AdCreateForms/>
        </ScrollView>
        <Menu/>
      </AdCreateContextProvider>
    </VStack>
  
  );
};
