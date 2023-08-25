import { Heading, HStack, Text, useTheme, VStack } from 'native-base';
import { ArrowRight, Tag } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { useMyAds } from '@hooks/useMyAds';
import { useNavigation } from '@react-navigation/native';
import { BottomTabRoutesProps } from '@routes/bottom.tab.routes';

export const MyAdsCardInfo = () => {
  const {colors} = useTheme();
  const {products} = useMyAds('ACTIVE');
  const {navigate} = useNavigation<BottomTabRoutesProps>();
  return (
    <TouchableOpacity onPress={() => navigate('myAds')}>
      <HStack alignItems="center" px={3} py={4} bg="blue.50" rounded={'md'} mt={2}>
        <Tag color={colors.blue['500']} size={22}/>
        <VStack ml={2} flex={1}>
          <Heading
            fontSize="lg"
            fontFamily="heading"
            color="gray.200"
          >
            {products.length}
          </Heading>
          <Text
            fontSize="sm"
            fontFamily="body"
            color="gray.200"
          >
            anúncios ativos
          </Text>
        </VStack>
        <HStack alignItems="center">
          <Text
            fontSize="sm"
            fontFamily="heading"
            color="blue.500"
            mr={1}
          >
            Meus anúncios
          </Text>
          <ArrowRight size={16} color={colors.blue['500']}/>
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};
