import { FlatList, Text, VStack } from 'native-base';
import { Header } from '@screens/Home/Header';
import { MyAdsCardInfo } from '@components/MyAdsCardInfo';
import { InputFilter } from '@components/InputFilter';
import { useHome } from '@screens/Home/useHome';
import { Loading } from '@components/Loading';
import { ListProducts } from '@components/ListProducts';
export const Home = () => {
  const {products, isLoading} = useHome();
  return (
    <VStack
      px={10}
      pt={20}
      bg="gray.600"
      flexGrow={1}
    >
      <Header/>
      <VStack my={4}>
        <Text
          fontSize="md"
          fontFamily="body"
          color="gray.300"
        >
          Seus produtos anunciados para venda
        </Text>
        <MyAdsCardInfo/>
      </VStack>
      <VStack mt={4} flex={1}>
        <Text
          fontSize="sm"
          fontFamily="body"
          color="gray.300"
          mb={2}
        >
          Compre produtos variados
        </Text>
        <InputFilter/>
        {isLoading ? <Loading/> : <ListProducts products={products}/>}
      </VStack>
    </VStack>
  );
};
